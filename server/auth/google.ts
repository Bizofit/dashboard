import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { unifiedDB } from '../db.js';
import { unifiedUsers, userRoles } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';

export function configureGoogleAuth() {
  const isProduction = process.env.NODE_ENV === 'production';
  const callbackURL = isProduction 
    ? (process.env.GOOGLE_REDIRECT_URI_PRODUCTION || 'https://dashboard.bizoforce.com/api/auth/google/callback')
    : (process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3006/api/auth/google/callback');

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

          if (!email) {
            return done(new Error('No email found in Google profile'));
          }

          // Check if user exists
          const existingUsers = await unifiedDB
            .select()
            .from(unifiedUsers)
            .where(eq(unifiedUsers.email, email))
            .limit(1);

          let user = existingUsers[0];

          if (user) {
            // Update Google ID if not set
            if (!user.googleId) {
              await unifiedDB
                .update(unifiedUsers)
                .set({
                  googleId,
                  googleProfilePicture: profile.photos?.[0]?.value,
                  authProvider: 'hybrid',
                  lastLoginAt: new Date(),
                })
                .where(eq(unifiedUsers.id, user.id));

              user = { ...user, googleId, authProvider: 'hybrid' as const };
            } else {
              // Just update last login
              await unifiedDB
                .update(unifiedUsers)
                .set({ lastLoginAt: new Date() })
                .where(eq(unifiedUsers.id, user.id));
            }
          } else {
            // Create new user
            await unifiedDB.insert(unifiedUsers).values({
              email,
              googleId,
              googleProfilePicture: profile.photos?.[0]?.value,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              authProvider: 'google',
              lastLoginAt: new Date(),
            });

            // Fetch the created user
            const newUsers = await unifiedDB
              .select()
              .from(unifiedUsers)
              .where(eq(unifiedUsers.email, email))
              .limit(1);

            user = newUsers[0];

            // Create default role
            await unifiedDB.insert(userRoles).values({
              userId: user.id,
              roleType: 'job_seeker',
              isPrimary: true,
            });
          }

          return done(null, user);
        } catch (error) {
          console.error('❌ Google auth error:', error);
          return done(error as Error);
        }
      }
    )
  );

  // Serialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user
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
