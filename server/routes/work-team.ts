import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { workPool } from "../db.js";

const router = Router();

/**
 * GET /api/work/team
 * Get all employees from the same company as the logged-in user
 */
router.get("/team", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Get work_user_id from unified_users table
    const { unifiedPool } = await import("../db.js");
    const [userRows] = await unifiedPool.execute(
      "SELECT work_user_id FROM unified_users WHERE id = ?",
      [userId]
    );
    const unifiedUser = (userRows as any[])[0];
    const workUserId = unifiedUser?.work_user_id;

    if (!workUserId) {
      return res.status(400).json({
        success: false,
        message: "User has no Work.Bizoforce account",
      });
    }

    // Get company_id from Work database users table
    const [workUserRows] = await workPool.execute(
      "SELECT company_id FROM users WHERE id = ?",
      [workUserId]
    );
    const workUser = (workUserRows as any[])[0];
    const companyId = workUser?.company_id;

    if (!companyId) {
      return res.json({
        success: true,
        data: [],
        message: "User has no company association",
      });
    }

    console.log(`👥 Fetching team members for company ID: ${companyId}`);

    try {
      // Get all users from the same company with their roles and designations
      const [employees] = await workPool.execute(
        `SELECT
          u.id,
          u.name,
          u.email,
          u.mobile,
          u.status,
          u.created_at,
          r.name as role_name,
          r.display_name as role_display_name,
          d.name as designation_name,
          ed.employee_id,
          ed.joining_date
        FROM users u
        LEFT JOIN role_user ru ON u.id = ru.user_id
        LEFT JOIN roles r ON ru.role_id = r.id
        LEFT JOIN employee_details ed ON u.id = ed.user_id
        LEFT JOIN designations d ON ed.designation_id = d.id
        WHERE u.company_id = ?
        GROUP BY u.id
        ORDER BY u.created_at DESC`,
        [companyId]
      );

      const formattedEmployees = (employees as any[]).map((employee: any) => ({
        id: employee.id.toString(),
        name: employee.name || "N/A",
        email: employee.email || "N/A",
        mobile: employee.mobile || "N/A",
        role: employee.role_display_name || employee.role_name || "Employee",
        designation: employee.designation_name || "N/A",
        employeeId: employee.employee_id || "N/A",
        status: employee.status || "active",
        isActive: employee.status === "active",
        joinDate: employee.joining_date || employee.created_at,
      }));

      console.log(`✅ Found ${formattedEmployees.length} team members for company ${companyId}`);

      res.json({
        success: true,
        data: formattedEmployees,
        metadata: {
          total: formattedEmployees.length,
          companyId: companyId,
        },
      });
    } catch (error: any) {
      if (error.code === "ER_NO_SUCH_TABLE") {
        console.error(`❌ Table does not exist: ${error.sqlMessage}`);
        return res.json({
          success: true,
          message: "Team data not available",
          data: [],
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error("❌ Error fetching team members:", error);

    if (error.code === "ER_BAD_FIELD_ERROR") {
      console.error(`❌ Field does not exist: ${error.sqlMessage}`);
      return res.status(500).json({
        success: false,
        message: "Database schema mismatch",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch team members",
    });
  }
});

export default router;
