/**
 * Authentication Routes
 * Handles traditional email/password authentication with platform sync
 * Last updated: 2025-11-25 - Enhanced with comprehensive platform data
 */

const express = require("express");
const router = express.Router();
const authService = require("../services/auth-service");
const { authenticate, validateBody } = require("../middleware/auth-middleware");

/**
 * POST /api/auth/register
 * Register new user with email/password
 */
router.post(
  "/register",
  validateBody(["email", "password"]),
  async (req, res) => {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/**
 * POST /api/auth/login
 * Login with email/password
 */
router.post("/login", validateBody(["email", "password"]), async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/auth/profile
 * Get current user profile (requires authentication)
 * Returns comprehensive platform IDs: company_id, listing_id, product counts
 */
router.get("/profile", authenticate, async (req, res) => {
  try {
    // Set no-cache headers to prevent caching
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    console.log(`📋 Profile API called for user ${req.user.email}:`);
    console.log(`   Primary Role: ${req.user.primaryRole}`);
    console.log(`   Roles Count: ${req.user.roles?.length || 0}`);
    console.log(`   Bizoforce User ID: ${req.user.bizoforce_user_id}`);
    console.log(`   Giglancer User ID: ${req.user.giglancer_user_id}`);
    console.log(`   Work User ID: ${req.user.work_user_id}`);
    console.log(`   Screenly User ID: ${req.user.screenly_user_id}`);

    // Get comprehensive platform data using sync service
    const platformIdSync = require('../services/platform-id-sync-service');
    const platformData = await platformIdSync.getUserPlatformData(req.user.id);

    console.log(`✅ Final platformData:`, JSON.stringify(platformData, null, 2));

    res.json({
      success: true,
      data: {
        ...req.user,
        platformData,
      },
    });
  } catch (error) {
    console.error('Profile API error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post("/refresh", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const result = await authService.refreshToken(token);

    res.json({
      success: true,
      message: "Token refreshed",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password (requires authentication)
 */
router.post(
  "/change-password",
  authenticate,
  validateBody(["currentPassword", "newPassword"]),
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const result = await authService.changePassword(
        req.user.id,
        currentPassword,
        newPassword
      );

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post("/logout", authenticate, async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // But we can log the event or invalidate sessions if needed

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/auth/user-companies
 * Get all companies associated with the current user
 */
router.get("/user-companies", authenticate, async (req, res) => {
  try {
    const { unifiedDB } = require("../config/database");

    // Get all companies for the user through their roles
    const [companies] = await unifiedDB.query(
      `
      SELECT DISTINCT 
        c.id,
        c.name,
        c.description,
        c.logo,
        c.website,
        c.industry,
        c.size,
        ur.role as user_role,
        ur.platform,
        ur.source_platform,
        ur.is_primary,
        ur.id as role_id
      FROM companies c
      INNER JOIN user_roles ur ON c.id = ur.company_id
      WHERE ur.user_id = ? AND ur.is_active = TRUE
      ORDER BY ur.is_primary DESC, c.name ASC
    `,
      [req.user.id]
    );

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/switch-company
 * Switch to a different company (updates primary role)
 */
router.post("/switch-company", authenticate, async (req, res) => {
  try {
    const { companyId, roleId } = req.body;
    const { unifiedDB } = require("../config/database");

    if (!companyId || !roleId) {
      return res.status(400).json({
        success: false,
        message: "Company ID and Role ID are required",
      });
    }

    // Verify user has access to this company/role
    const [roleCheck] = await unifiedDB.query(
      `
      SELECT id FROM user_roles 
      WHERE id = ? AND user_id = ? AND company_id = ? AND is_active = TRUE
    `,
      [roleId, req.user.id, companyId]
    );

    if (roleCheck.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Access denied to this company",
      });
    }

    // Set all user roles to non-primary
    await unifiedDB.query(
      `
      UPDATE user_roles 
      SET is_primary = FALSE, last_used_at = NOW()
      WHERE user_id = ?
    `,
      [req.user.id]
    );

    // Set the selected role as primary
    await unifiedDB.query(
      `
      UPDATE user_roles 
      SET is_primary = TRUE, last_used_at = NOW()
      WHERE id = ? AND user_id = ?
    `,
      [roleId, req.user.id]
    );

    // Get updated user data
    const updatedUser = await authService.getUserById(req.user.id);

    res.json({
      success: true,
      message: "Company switched successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
