import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { unifiedDB } from "../db.js";
import { unifiedUsers } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import { migrateUser } from "../services/migration-service.js";

export function configureGoogleAuth() {
  const isProduction = process.env.NODE_ENV === "production";
  const callbackURL = isProduction
    ? process.env.GOOGLE_REDIRECT_URI_PRODUCTION ||
      "https://dashboard.bizoforce.com/api/auth/google/callback"
    : process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:3006/api/auth/google/callback";

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: callbackURL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;
          const firstName = profile.name?.givenName || null;
          const lastName = profile.name?.familyName || null;

          if (!email) {
            return done(new Error("No email found in Google profile"));
          }

          console.log(
            `🔍 Google OAuth Profile: ${email} (Google ID: ${googleId})`
          );

          // Check if user already exists in unified database
          console.log(
            `🔍 Checking if user exists in unified database: ${email}`
          );
          const existingUsers = await unifiedDB
            .select()
            .from(unifiedUsers)
            .where(eq(unifiedUsers.email, email))
            .limit(1);

          let migrationResult;

          if (existingUsers.length > 0) {
            // User already migrated, skip migration
            const existingUser = existingUsers[0];
            console.log(
              `✅ User already exists (ID: ${existingUser.id}), skipping migration`
            );

            // Update Google ID if not set
            if (!existingUser.googleId && googleId) {
              await unifiedDB
                .update(unifiedUsers)
                .set({ googleId: googleId, lastLoginAt: new Date() })
                .where(eq(unifiedUsers.id, existingUser.id));
              console.log(`📝 Updated Google ID for user ${existingUser.id}`);
            } else {
              // Just update last login
              await unifiedDB
                .update(unifiedUsers)
                .set({ lastLoginAt: new Date() })
                .where(eq(unifiedUsers.id, existingUser.id));
            }

            // Create mock migration result for existing user
            migrationResult = {
              userId: existingUser.id,
              email: existingUser.email,
              isNewUser: false,
              isTrulyNewUser: false,
              platformIds: {
                bizoforceId: existingUser.bizoforceUserId,
                giglancerId: existingUser.giglancerUserId,
                screenlyId: existingUser.screenlyUserId,
                workId: existingUser.workUserId,
              },
              hasCompany: true, // Will be determined from roles
              hasProducts: false,
              hasProjects: false,
              roles: [], // Will be fetched separately
              primaryRole: "vendor", // Default, will be updated from roles
              migrationComplete: true,
            };

            console.log(`📋 Using existing user data for ${email}`);
          } else {
            // New user, run full migration
            console.log(`🔍 Starting migration for new user: ${email}`);
            migrationResult = await migrateUser(
              email,
              firstName,
              lastName,
              googleId,
              (progress) => {
                console.log(
                  `📊 Migration progress: ${progress.progress}% - ${progress.message}`
                );
              }
            );

            console.log(`✅ Migration complete for ${email}:`, {
              userId: migrationResult.userId,
              hasCompany: migrationResult.hasCompany,
              roles: migrationResult.roles,
              primaryRole: migrationResult.primaryRole,
              companyName: migrationResult.companyName,
            });
          }

          // Fetch the migrated user
          const users = await unifiedDB
            .select()
            .from(unifiedUsers)
            .where(eq(unifiedUsers.id, migrationResult.userId))
            .limit(1);

          const user = users[0];

          // Attach migration info for frontend
          (user as any).migrationInfo = {
            isNewUser: migrationResult.isNewUser,
            isTrulyNewUser: migrationResult.isTrulyNewUser,
            hasCompany: migrationResult.hasCompany,
            companyName: migrationResult.companyName,
            hasProducts: migrationResult.hasProducts,
            hasProjects: migrationResult.hasProjects,
            roles: migrationResult.roles,
            primaryRole: migrationResult.primaryRole,
          };

          return done(null, user);
        } catch (error) {
          console.error("❌ Google auth error:", error);
          return done(error as Error);
        }
      }
    )
  );

  // NOTE: SerializeUser and DeserializeUser are NOT used
  // We're using JWT tokens instead of passport sessions
  // These are kept here only for backward compatibility
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const users = await unifiedDB
        .select()
        .from(unifiedUsers)
        .where(eq(unifiedUsers.id, id))
        .limit(1);

      done(null, users[0] || null);
    } catch (error) {
      done(error);
    }
  });
}
