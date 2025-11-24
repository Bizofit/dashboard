import { Router } from "express";
import { authenticate, authorize } from "../auth/middleware.js";
import {
  migrateUserWithSmartDetection,
  migrateAllPlatformUsers,
} from "../services/smart-migration.js";

const router = Router();

/**
 * POST /api/migration/migrate-user
 * Migrate a single user with smart role detection
 */
router.post(
  "/migrate-user",
  authenticate,
  authorize("company_admin"),
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      console.log(`🔄 Manual migration requested for: ${email}`);

      const result = await migrateUserWithSmartDetection(email);

      res.json({
        success: result.success,
        data: result,
        message: result.message,
      });
    } catch (error) {
      console.error("Error in migrate-user endpoint:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Migration failed",
      });
    }
  }
);

/**
 * POST /api/migration/migrate-all
 * Migrate all users from all platforms (ADMIN ONLY)
 */
router.post(
  "/migrate-all",
  authenticate,
  authorize("company_admin"),
  async (req, res) => {
    try {
      console.log(`🚀 Full platform migration triggered by user ${req.user?.userId}`);

      // Run migration
      const result = await migrateAllPlatformUsers();

      res.json({
        success: true,
        data: result,
        message: `Migration complete: ${result.migrated} users migrated`,
      });
    } catch (error) {
      console.error("Error in migrate-all endpoint:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Migration failed",
      });
    }
  }
);

/**
 * POST /api/migration/remigrate-existing
 * Re-migrate existing users who have no roles
 */
router.post(
  "/remigrate-existing",
  authenticate,
  authorize("company_admin"),
  async (req, res) => {
    try {
      // This endpoint can be used to fix users who were migrated but have no roles
      res.json({
        success: false,
        message: "Not implemented yet",
      });
    } catch (error) {
      console.error("Error in remigrate-existing endpoint:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Remigration failed",
      });
    }
  }
);

export default router;
