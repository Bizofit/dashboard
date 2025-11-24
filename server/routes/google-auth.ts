import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { unifiedDB } from "../db.js";
import { userRoles } from "../../shared/schema.js";
import { eq } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-change-this";

// ============================================================================
// GOOGLE OAUTH - INITIATE
// ============================================================================
router.get("/google", (req, res, next) => {
  // Check if prompt parameter is passed (for account switching)
  const prompt = req.query.prompt;
  const authOptions: any = {
    scope: ["profile", "email"],
  };

  // Force account chooser if prompt=select_account
  if (prompt === "select_account") {
    authOptions.prompt = "select_account";
  }

  passport.authenticate("google", authOptions)(req, res, next);
});

// ============================================================================
// GOOGLE OAUTH - CALLBACK
// ============================================================================
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login?error=auth_failed",
  }),
  async (req, res) => {
    try {
      const user = req.user as any;

      console.log(`🔐 OAuth Callback - User from Passport:`, {
        id: user?.id,
        email: user?.email,
        googleId: user?.googleId,
      });

      if (!user) {
        return res.redirect("/login?error=auth_failed");
      }

      // CRITICAL: Destroy any existing session completely
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("❌ Session destroy error:", err);
          }
        });
      }

      // Clear all session cookies
      res.clearCookie("connect.sid");
      res.clearCookie("connect.sid", { path: "/" });

      try {
        // Check if user needs Giglancer consent
        const migrationInfo = (user as any).migrationInfo;
        const requiresConsent =
          migrationInfo?.requiresGiglancerConsent || false;
        const isNewUser = migrationInfo?.isNewUser || false;
        const isTrulyNewUser = migrationInfo?.isTrulyNewUser || false;

        // Use migration results for roles (more accurate than database query)
        let roles = [];
        let primaryRole = "job_seeker";

        if (migrationInfo) {
          // Use roles from migration result
          roles = migrationInfo.roles || ["job_seeker"];
          primaryRole = migrationInfo.primaryRole || roles[0] || "job_seeker";
        } else {
          // Fallback: Get user roles from database
          const dbRoles = await unifiedDB
            .select()
            .from(userRoles)
            .where(eq(userRoles.userId, user.id));

          roles = dbRoles.map((r) => r.role);
          primaryRole =
            dbRoles.find((r) => r.isPrimary)?.role ||
            dbRoles[0]?.role ||
            "job_seeker";
        }

        console.log(
          `✅ Session regenerated for user ${user.email}, role: ${primaryRole}`
        );

        // Generate JWT
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            googleId: user.googleId,
            roles: roles,
            primaryRole: primaryRole,
            authProvider: user.authProvider,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Prepare migration data for frontend
        const migrationData = {
          hasCompany: migrationInfo?.hasCompany || false,
          roles: roles,
          primaryRole: primaryRole,
          companyName: migrationInfo?.companyName || null,
        };

        // Redirect to frontend with token and migration info
        const isProduction = process.env.NODE_ENV === "production";
        const frontendUrl = isProduction
          ? process.env.FRONTEND_PRODUCTION_URL ||
            "https://dashboard.bizoforce.com"
          : "http://localhost:3006";

        // Build redirect URL with migration parameters
        // Always show migration progress to demonstrate database checking
        const params = new URLSearchParams({
          token,
          ...(user.email && { email: user.email }),
          showMigration: "true", // Always show migration popup
          migration: encodeURIComponent(JSON.stringify(migrationData)), // Pass actual migration data
          ...(isNewUser && { newUser: "true" }),
          ...(isTrulyNewUser && { trulyNewUser: "true" }),
          ...(requiresConsent && { consent: "giglancer" }),
        });

        const redirectUrl = `${frontendUrl}/auth/callback?${params.toString()}`;

        console.log(`✅ Redirecting to: ${redirectUrl}`);
        console.log(
          `✅ Token generated for user ID: ${user.id}, email: ${user.email}`
        );

        res.redirect(redirectUrl);
      } catch (callbackError) {
        console.error("❌ Google callback processing error:", callbackError);
        res.redirect("/login?error=callback_failed");
      }
    } catch (error) {
      console.error("❌ Google callback error:", error);
      res.redirect("/login?error=callback_failed");
    }
  }
);

// ============================================================================
// LOGOUT
// ============================================================================
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    // Destroy the session
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        console.error("Session destroy error:", destroyErr);
      }

      // Clear the session cookie
      res.clearCookie("connect.sid");

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});

export default router;
