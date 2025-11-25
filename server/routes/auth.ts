import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { unifiedDB, unifiedPool } from "../db.js";
import { unifiedUsers, userRoles, companies } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import { authenticate } from "../auth/middleware.js";
import { companyAggregationService } from "../services/company-aggregation-service.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-change-this";

// ============================================================================
// REGISTER
// ============================================================================
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const existingUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    await unifiedDB.insert(unifiedUsers).values({
      email,
      passwordHash,
      firstName,
      lastName,
      authProvider: "local",
    });

    // Fetch the created user
    const newUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    const newUser = newUsers[0];

    // Create default role
    await unifiedDB.insert(userRoles).values({
      userId: newUser.id,
      role: "job_seeker",
      isPrimary: true,
    });

    // Get user with roles
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, newUser.id));

    // Generate JWT
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        roles: roles,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          roles: roles,
        },
      },
    });
  } catch (error: any) {
    console.error("❌ Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// LOGIN
// ============================================================================
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const users = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Check if user has password (not OAuth-only user)
    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Please login with Google",
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    await unifiedDB
      .update(unifiedUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(unifiedUsers.id, user.id));

    // Get user roles
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roles: roles,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          googleProfilePicture: user.googleProfilePicture,
          roles: roles,
        },
      },
    });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// GET PROFILE - Enhanced with Comprehensive Platform Data
// ============================================================================
router.get("/profile", authenticate, async (req: any, res: Response) => {
  try {
    // CRITICAL: Use ONLY JWT token userId, never session data
    const userId = req.user.userId;

    console.log(
      `🔍 Profile API - JWT userId: ${userId}, JWT email: ${req.user.email}`
    );
    
    // Get comprehensive platform data using sync service
    const platformIdSyncService = await import('../../services/platform-id-sync-service.js');
    const platformData = await platformIdSyncService.default.getUserPlatformData(userId);

    console.log(`✅ Enhanced Profile - Platform Data:`, JSON.stringify(platformData, null, 2));

    const users = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.id, userId))
      .limit(1);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    console.log("🔍 Profile API - All roles:", JSON.stringify(roles, null, 2));

    // Get company information if user has company
    let companyInfo = null;
    const primaryRole = roles.find((r) => r.isPrimary);
    console.log(
      "🔍 Profile API - Primary Role:",
      JSON.stringify(primaryRole, null, 2)
    );

    if (primaryRole?.companyId) {
      console.log(
        "🔍 Profile API - Looking up company ID:",
        primaryRole.companyId
      );
      const companyRows = await unifiedDB
        .select()
        .from(companies)
        .where(eq(companies.id, primaryRole.companyId))
        .limit(1);

      console.log("🔍 Profile API - Company rows found:", companyRows.length);

      if (companyRows.length > 0) {
        companyInfo = {
          id: companyRows[0].id,
          name: companyRows[0].name,
          platform: primaryRole.sourcePlatform,
        };
        console.log("🔍 Profile API - Company Info:", companyInfo);
      }
    } else {
      console.log("🔍 Profile API - No company ID on primary role");
    }

    const responseData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      googleProfilePicture: user.googleProfilePicture,
      authProvider: user.authProvider,
      roles: roles,
      company: companyInfo,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      // Enhanced Platform Data
      platformData: platformData,
      // Legacy platform IDs (for backward compatibility)
      bizoforceUserId: user.bizoforceUserId,
      giglancerUserId: user.giglancerUserId,
      screenlyUserId: user.screenlyUserId,
      workUserId: user.workUserId,
    };

    console.log(
      "🔍 Enhanced Profile API - Complete Response:",
      JSON.stringify(responseData, null, 2)
    );

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    console.error("❌ Profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// SELECT ROLE (For new users with no platform data)
// ============================================================================
router.post(
  "/select-role",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
      const userId = (req as any).user.userId;

      if (!role || !["company", "individual"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role. Must be 'company' or 'individual'",
        });
      }

      // Delete existing roles
      await unifiedDB.delete(userRoles).where(eq(userRoles.userId, userId));

      // Assign appropriate role based on selection
      if (role === "company") {
        // Company gets company_admin as primary role
        await unifiedDB.insert(userRoles).values({
          userId,
          role: "company_admin",
          isPrimary: true,
        });
      } else {
        // Individual gets job_seeker as primary role
        await unifiedDB.insert(userRoles).values({
          userId,
          role: "job_seeker",
          isPrimary: true,
        });
      }

      res.json({
        success: true,
        message: "Role selected successfully",
        data: {
          role: role === "company" ? "company_admin" : "job_seeker",
        },
      });
    } catch (error: any) {
      console.error("❌ Select role error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ============================================================================
// USER COMPANIES - Multi-Database Aggregation
// ============================================================================
router.get(
  "/user-companies",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;

      console.log(`📋 Fetching companies for user ID: ${userId}`);
      console.log(`🔍 Full user object:`, (req as any).user);

      // First check if userId is valid
      if (!userId || userId === undefined) {
        return res.status(400).json({
          success: false,
          message: "User ID not found in token",
          debug: { userObject: (req as any).user },
        });
      }

      // Use the new CompanyAggregationService to get companies from all platforms
      const companies = await companyAggregationService.getUserCompanies(
        userId
      );

      console.log(
        `✅ Total companies found across all platforms: ${companies.length}`
      );

      // Convert to format expected by frontend
      const formattedCompanies = companies.map((company) => ({
        id: company.originalId,
        name: company.name,
        description: company.description,
        logo: null, // Legacy platforms might not have logos
        website: null,
        industry: company.metadata?.industry || null,
        size: null,
        user_role: company.role, // Normalized role
        platform: company.platform,
        is_primary: company.isPrimary ? 1 : 0,
        role_id: company.metadata?.roleId || null,
        // Additional metadata for debugging
        source: company.source,
        original_role: company.originalRole,
        company_id: company.id, // Unique ID across platforms
      }));

      res.json({
        success: true,
        data: formattedCompanies,
        metadata: {
          total_companies: companies.length,
          platforms_checked: [
            "unified",
            "bizoforce",
            "giglancer",
            "screenly",
            "work",
          ],
          user_id: userId,
        },
      });
    } catch (error: any) {
      console.error("❌ User companies aggregation error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ============================================================================
// DEBUG: USER COMPANIES ACROSS ALL PLATFORMS
// ============================================================================
router.get(
  "/debug/user/:userId/companies",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const numericUserId = parseInt(userId);

      console.log(`🔍 Debug: Checking companies for user ${numericUserId}`);

      // Get user's platform IDs
      const [userRows] = await unifiedPool.execute(
        `SELECT 
          id, email, 
          bizoforce_user_id, giglancer_user_id, 
          screenly_user_id, work_user_id 
        FROM unified_users 
        WHERE id = ?`,
        [numericUserId]
      );

      if ((userRows as any[]).length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found in unified database",
        });
      }

      const user = (userRows as any[])[0];

      // Use the aggregation service to get detailed debug info
      const companies = await companyAggregationService.getUserCompanies(
        numericUserId
      );

      res.json({
        success: true,
        debug: {
          user: user,
          companies: companies,
          summary: {
            total_companies: companies.length,
            platforms_with_companies: [
              ...new Set(companies.map((c) => c.platform)),
            ],
            roles_found: [...new Set(companies.map((c) => c.role))],
            primary_company: companies.find((c) => c.isPrimary)?.name || "None",
          },
        },
      });
    } catch (error: any) {
      console.error("❌ Debug companies error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ============================================================================
// SWITCH COMPANY
// ============================================================================
router.post(
  "/switch-company",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { companyId, roleId } = req.body;
      const userId = (req as any).user.userId || (req as any).user.id;

      console.log(
        `🔄 Switch company request: companyId=${companyId}, roleId=${roleId}, userId=${userId}`
      );

      if (!companyId || !roleId) {
        return res.status(400).json({
          success: false,
          message: "Company ID and Role ID are required",
        });
      }

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID not found in token",
        });
      }

      // Verify user has access to this company/role
      const [roleCheckRows] = await unifiedPool.execute(
        `
      SELECT id FROM user_roles 
      WHERE id = ? AND user_id = ? AND company_id = ? AND is_active = TRUE
    `,
        [roleId, userId, companyId]
      );

      if (!(roleCheckRows as any[]).length) {
        return res.status(403).json({
          success: false,
          message: "Access denied to this company",
        });
      }

      // Set all user roles to non-primary
      await unifiedPool.execute(
        `
      UPDATE user_roles 
      SET is_primary = FALSE, last_used_at = NOW()
      WHERE user_id = ?
    `,
        [userId]
      );

      // Set the selected role as primary
      await unifiedPool.execute(
        `
      UPDATE user_roles 
      SET is_primary = TRUE, last_used_at = NOW()
      WHERE id = ? AND user_id = ?
    `,
        [roleId, userId]
      );

      console.log(
        `🔄 User ${userId} switched to company ${companyId} (role ${roleId})`
      );

      res.json({
        success: true,
        message: "Company switched successfully",
      });
    } catch (error: any) {
      console.error("❌ Switch company error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
