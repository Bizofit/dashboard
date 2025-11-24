import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate, authorize } from "../auth/middleware.js";
import {
  migrateUser,
  type MigrationProgress,
} from "../services/migration-service.js";
import {
  migrateUserWithSmartDetection,
  migrateAllPlatformUsers,
} from "../services/smart-migration.js";

const router = Router();

// Store active migration sessions
const activeMigrations = new Map<string, MigrationProgress[]>();

// ============================================================================
// START MIGRATION (for Google OAuth flow)
// ============================================================================
router.post("/start", async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, googleId } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const sessionId = `${email}-${Date.now()}`;
    const progressUpdates: MigrationProgress[] = [];

    // Store progress updates
    activeMigrations.set(sessionId, progressUpdates);

    // Run migration with progress tracking
    const result = await migrateUser(
      email,
      firstName,
      lastName,
      googleId,
      (progress) => {
        progressUpdates.push(progress);
      }
    );

    // Clean up session after 5 minutes
    setTimeout(() => {
      activeMigrations.delete(sessionId);
    }, 5 * 60 * 1000);

    res.json({
      success: true,
      data: {
        sessionId,
        result,
        progress: progressUpdates,
      },
    });
  } catch (error) {
    console.error("Migration start error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Migration failed",
    });
  }
});

// ============================================================================
// GET MIGRATION PROGRESS
// ============================================================================
router.get("/progress/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const progress = activeMigrations.get(sessionId) || [];

    res.json({
      success: true,
      data: {
        progress,
        complete:
          progress.length > 0 && progress[progress.length - 1].progress === 100,
      },
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get progress",
    });
  }
});

// ============================================================================
// CHECK USER STATUS (before login)
// ============================================================================
router.post("/check-user", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Just run a quick check without full migration
    const result = await migrateUser(email, null, null, null);

    res.json({
      success: true,
      data: {
        exists: true,
        hasCompany: result.hasCompany,
        companyName: result.companyName,
        primaryRole: result.primaryRole,
        roles: result.roles,
      },
    });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check user status",
    });
  }
});

// ============================================================================
// SMART MIGRATION ENDPOINTS
// ============================================================================

// Migrate single user with smart detection (admin only)
router.post(
  "/smart-migrate",
  authenticate,
  authorize("company_admin"),
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const result = await migrateUserWithSmartDetection(email);

      res.json({
        success: result.success,
        data: result,
        message: result.success
          ? `User ${email} migrated successfully`
          : result.error,
      });
    } catch (error) {
      console.error("Smart migration error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to migrate user",
      });
    }
  }
);

// Migrate all users from all platforms (admin only)
router.post(
  "/migrate-all",
  authenticate,
  authorize("company_admin"),
  async (req: Request, res: Response) => {
    try {
      // Start migration in background
      res.json({
        success: true,
        message: "Starting migration from all platforms...",
      });

      // Run migration asynchronously
      migrateAllPlatformUsers()
        .then((stats) => {
          console.log("Migration from all platforms completed:", stats);
        })
        .catch((error) => {
          console.error("Migration from all platforms failed:", error);
        });
    } catch (error) {
      console.error("Platform migration error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to start platform migration",
      });
    }
  }
);

export default router;
