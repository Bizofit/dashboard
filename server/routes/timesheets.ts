/**
 * Timesheets Routes
 * Fetches time logs from Work.Bizoforce database for the logged-in user
 */

import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { workPool } from "../db.js";

const router = Router();

/**
 * GET /api/timesheets
 * Get all time logs for the logged-in user from Work database
 */
router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get work_user_id from the authenticated user
    const workUserId = user.work_user_id;

    if (!workUserId) {
      return res.json({
        success: true,
        message: "User has no Work.Bizoforce account",
        data: [],
      });
    }

    console.log(`📋 Fetching timesheets for work user_id: ${workUserId}`);

    // Query project_time_logs from Work database
    const [timeLogs] = await workPool.execute(
      `SELECT 
        ptl.id,
        ptl.project_id,
        ptl.task_id,
        ptl.user_id,
        ptl.start_time,
        ptl.end_time,
        ptl.memo as description,
        ptl.total_hours,
        ptl.total_minutes,
        ptl.hourly_rate,
        ptl.earnings,
        ptl.approved,
        ptl.approved_by,
        ptl.created_at,
        ptl.updated_at,
        p.project_name,
        t.heading as task_name,
        u.name as employee_name,
        approver.name as approved_by_name
      FROM project_time_logs ptl
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      LEFT JOIN users u ON ptl.user_id = u.id
      LEFT JOIN users approver ON ptl.approved_by = approver.id
      WHERE ptl.user_id = ?
      ORDER BY ptl.start_time DESC`,
      [workUserId]
    );

    console.log(`✅ Found ${(timeLogs as any[]).length} time logs for Work user ${workUserId}`);

    // Format the timesheets data
    const formattedTimesheets = (timeLogs as any[]).map((log) => {
      // Calculate hours from total_hours and total_minutes
      const hours = parseFloat(log.total_hours || "0");
      const minutes = parseFloat(log.total_minutes || "0");
      const totalHours = hours + (minutes / 60);

      return {
        id: `work_${log.id}`,
        employeeName: log.employee_name || "Unknown",
        projectName: log.project_name || "No Project",
        taskName: log.task_name || "",
        date: log.start_time,
        startTime: log.start_time,
        endTime: log.end_time,
        hours: parseFloat(totalHours.toFixed(2)),
        description: log.description || "",
        hourlyRate: log.hourly_rate || 0,
        earnings: log.earnings || 0,
        status: log.approved ? "approved" : "pending",
        approvedBy: log.approved_by_name || null,
        platform: "work",
        createdAt: log.created_at,
        updatedAt: log.updated_at,
      };
    });

    res.json({
      success: true,
      data: formattedTimesheets,
    });
  } catch (error: any) {
    console.error("❌ Error fetching timesheets:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Time logs table not available",
        data: [],
      });
    }

    if (error.code === "ER_BAD_FIELD_ERROR") {
      console.error(`❌ Field does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Database schema mismatch",
        data: [],
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch timesheets",
    });
  }
});

/**
 * GET /api/timesheets/:id
 * Get a specific time log by ID
 */
router.get("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const workUserId = user.work_user_id;

    if (!workUserId) {
      return res.status(404).json({
        success: false,
        message: "User has no Work.Bizoforce account",
      });
    }

    // Extract numeric ID from "work_123" format
    const timeLogId = req.params.id.replace("work_", "");

    console.log(`📋 Fetching timesheet ${timeLogId} for user_id: ${workUserId}`);

    const [timeLogs] = await workPool.execute(
      `SELECT 
        ptl.*,
        p.project_name,
        t.heading as task_name,
        u.name as employee_name,
        approver.name as approved_by_name
      FROM project_time_logs ptl
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      LEFT JOIN users u ON ptl.user_id = u.id
      LEFT JOIN users approver ON ptl.approved_by = approver.id
      WHERE ptl.id = ? AND ptl.user_id = ?
      LIMIT 1`,
      [timeLogId, workUserId]
    );

    if (!(timeLogs as any[]).length) {
      return res.status(404).json({
        success: false,
        message: "Time log not found",
      });
    }

    const log = (timeLogs as any[])[0];
    const hours = parseFloat(log.total_hours || "0");
    const minutes = parseFloat(log.total_minutes || "0");
    const totalHours = hours + (minutes / 60);

    res.json({
      success: true,
      data: {
        id: `work_${log.id}`,
        employeeName: log.employee_name,
        projectName: log.project_name,
        taskName: log.task_name,
        date: log.start_time,
        startTime: log.start_time,
        endTime: log.end_time,
        hours: parseFloat(totalHours.toFixed(2)),
        description: log.memo,
        hourlyRate: log.hourly_rate,
        earnings: log.earnings,
        status: log.approved ? "approved" : "pending",
        approvedBy: log.approved_by_name,
        platform: "work",
        createdAt: log.created_at,
        updatedAt: log.updated_at,
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching timesheet:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch timesheet",
    });
  }
});

/**
 * GET /api/timesheets/stats
 * Get timesheet statistics for the logged-in user
 */
router.get("/stats/summary", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const workUserId = user.work_user_id;

    if (!workUserId) {
      return res.json({
        success: true,
        data: {
          totalHours: 0,
          totalEarnings: 0,
          pendingHours: 0,
          approvedHours: 0,
        },
      });
    }

    const [stats] = await workPool.execute(
      `SELECT 
        COUNT(*) as total_entries,
        SUM(CAST(total_hours AS DECIMAL(10,2)) + (CAST(total_minutes AS DECIMAL(10,2)) / 60)) as total_hours,
        SUM(earnings) as total_earnings,
        SUM(CASE WHEN approved = 0 THEN CAST(total_hours AS DECIMAL(10,2)) + (CAST(total_minutes AS DECIMAL(10,2)) / 60) ELSE 0 END) as pending_hours,
        SUM(CASE WHEN approved = 1 THEN CAST(total_hours AS DECIMAL(10,2)) + (CAST(total_minutes AS DECIMAL(10,2)) / 60) ELSE 0 END) as approved_hours
      FROM project_time_logs
      WHERE user_id = ?`,
      [workUserId]
    );

    const result = (stats as any[])[0];

    res.json({
      success: true,
      data: {
        totalEntries: parseInt(result.total_entries || "0"),
        totalHours: parseFloat((result.total_hours || 0).toFixed(2)),
        totalEarnings: parseFloat((result.total_earnings || 0).toFixed(2)),
        pendingHours: parseFloat((result.pending_hours || 0).toFixed(2)),
        approvedHours: parseFloat((result.approved_hours || 0).toFixed(2)),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching timesheet stats:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch statistics",
    });
  }
});

export default router;
