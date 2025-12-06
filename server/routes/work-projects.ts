import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { workPool } from "../db.js";

const router = Router();

// ============================================================================
// GET USER PROJECTS FROM WORK.BIZOFORCE
// ============================================================================
router.get("/user-projects", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Get user's workUserId from unified database
    const { unifiedPool } = await import("../db.js");
    const [userRows] = await unifiedPool.execute(
      `SELECT work_user_id FROM unified_users WHERE id = ?`,
      [userId]
    );

    if ((userRows as any[]).length === 0 || !(userRows as any[])[0].work_user_id) {
      return res.json({
        success: true,
        data: [],
        message: "User not linked to Work.Bizoforce platform",
      });
    }

    const workUserId = (userRows as any[])[0].work_user_id;
    console.log(`🔍 Fetching projects for Work user ID: ${workUserId}`);

    // Query projects where user is a member
    try {
      const [projects] = await workPool.execute(
        `SELECT
          p.id,
          p.project_name,
          p.project_summary,
          p.start_date,
          p.deadline,
          p.completion_percent,
          p.client_id,
          p.company_id,
          p.category_id,
          p.project_budget,
          p.hours_allocated,
          p.feedback,
          p.created_at,
          p.updated_at,
          pm.hourly_rate,
          c.name as client_name,
          comp.company_name
        FROM projects p
        INNER JOIN project_members pm ON p.id = pm.project_id
        LEFT JOIN client_details c ON p.client_id = c.id
        LEFT JOIN companies comp ON p.company_id = comp.id
        WHERE pm.user_id = ?
        ORDER BY p.created_at DESC`,
        [workUserId]
      );

      const formattedProjects = (projects as any[]).map((project) => ({
        id: project.id.toString(),
        name: project.project_name,
        description: project.project_summary || "",
        status: project.completion_percent >= 100 ? "completed" :
                project.completion_percent > 0 ? "active" : "paused",
        budget: project.project_budget,
        deadline: project.deadline,
        progress: project.completion_percent || 0,
        teamSize: null, // Would need separate query to count team members
        platform: "work",
        startDate: project.start_date,
        clientName: project.client_name,
        companyName: project.company_name,
        companyId: project.company_id,
        categoryId: project.category_id,
        hoursAllocated: project.hours_allocated,
        clientFeedback: project.feedback,
        hourlyRate: project.hourly_rate,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      }));

      console.log(`✅ Found ${formattedProjects.length} projects for Work user ${workUserId}`);

      res.json({
        success: true,
        data: formattedProjects,
        metadata: {
          total: formattedProjects.length,
          workUserId: workUserId,
          platform: "work",
        },
      });
    } catch (error: any) {
      // Handle case where tables don't exist
      if (error.code === "ER_NO_SUCH_TABLE") {
        console.error(`❌ Table does not exist in Work database: ${error.sqlMessage}`);
        return res.json({
          success: true,
          data: [],
          message: "Projects data not available",
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error("❌ Error fetching Work projects:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// GET PROJECT DETAILS
// ============================================================================
router.get("/user-projects/:projectId", authenticate, async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.userId;

    // Get user's workUserId
    const { unifiedPool } = await import("../db.js");
    const [userRows] = await unifiedPool.execute(
      `SELECT work_user_id FROM unified_users WHERE id = ?`,
      [userId]
    );

    if ((userRows as any[]).length === 0 || !(userRows as any[])[0].work_user_id) {
      return res.status(403).json({
        success: false,
        message: "User not linked to Work.Bizoforce platform",
      });
    }

    const workUserId = (userRows as any[])[0].work_user_id;

    try {
      // Verify user is a member of this project
      const [memberCheck] = await workPool.execute(
        `SELECT id FROM project_members WHERE project_id = ? AND user_id = ?`,
        [projectId, workUserId]
      );

      if ((memberCheck as any[]).length === 0) {
        return res.status(403).json({
          success: false,
          message: "Access denied to this project",
        });
      }

      // Get project details
      const [projectRows] = await workPool.execute(
        `SELECT
          p.*,
          c.name as client_name,
          c.email as client_email,
          comp.company_name,
          u.name as project_admin_name
        FROM projects p
        LEFT JOIN client_details c ON p.client_id = c.id
        LEFT JOIN companies comp ON p.company_id = comp.id
        LEFT JOIN users u ON p.project_admin = u.id
        WHERE p.id = ?`,
        [projectId]
      );

      if ((projectRows as any[]).length === 0) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      const project = (projectRows as any[])[0];

      // Get team members
      const [members] = await workPool.execute(
        `SELECT
          u.id, u.name, u.email, pm.hourly_rate
        FROM project_members pm
        INNER JOIN users u ON pm.user_id = u.id
        WHERE pm.project_id = ?`,
        [projectId]
      );

      res.json({
        success: true,
        data: {
          id: project.id,
          name: project.project_name,
          categoryId: project.category_id,
          startDate: project.start_date,
          deadline: project.deadline,
          manualTimelog: project.manual_timelog,
          description: project.project_summary,
          notes: project.notes,
          progress: project.completion_percent || 0,
          calculateTaskProgress: project.calculate_task_progress,
          clientId: project.client_id,
          clientName: project.client_name,
          clientEmail: project.client_email,
          clientFeedback: project.client_feedback,
          readOnlyMode: project.read_only_mode,
          projectBudget: project.project_budget,
          currencyId: project.currency_id,
          hoursAllocated: project.hours_allocated,
          status: project.status,
          companyName: project.company_name,
          companyId: project.company_id,
          projectAdminName: project.project_admin_name,
          projectAdmin: project.project_admin,
          teamMembers: members,
          platform: "work",
          createdAt: project.created_at,
          updatedAt: project.updated_at,
        },
      });
    } catch (error: any) {
      if (error.code === "ER_NO_SUCH_TABLE") {
        return res.status(404).json({
          success: false,
          message: "Projects data not available",
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error("❌ Error fetching project details:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/work/project-categories
 * Get all project categories for dropdown
 */
router.get("/project-categories", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    console.log(`📂 Fetching project categories`);

    const [categories] = await workPool.execute(
      `SELECT
        id,
        category_name,
        company_id
      FROM project_category
      ORDER BY category_name ASC`
    );

    console.log(`✅ Found ${(categories as any[]).length} project categories`);

    // Format the categories data
    const formattedCategories = (categories as any[]).map((category: any) => ({
      id: category.id,
      name: category.category_name,
      companyId: category.company_id,
    }));

    res.json({
      success: true,
      data: formattedCategories,
    });
  } catch (error: any) {
    console.error("❌ Error fetching project categories:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Project categories table not available",
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
      message: error.message || "Failed to fetch project categories",
    });
  }
});

/**
 * POST /api/work/projects
 * Create a new project in Work database
 */
router.post("/projects", authenticate, async (req: Request, res: Response) => {
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
    const company_id = workUser?.company_id;

    const {
      project_name,
      category_id,
      start_date,
      deadline,
      project_summary,
      notes,
      client_id,
      project_budget,
      currency_id,
      hours_allocated,
      status,
      allow_manual_time_log,
    } = req.body;

    // Validate required fields
    if (!project_name || !start_date) {
      return res.status(400).json({
        success: false,
        message: "Project name and start date are required",
      });
    }

    console.log(`📝 Creating new project: ${project_name} for user ${workUserId}`);

    // Insert project into Work database
    const [result] = await workPool.execute(
      `INSERT INTO projects (
        company_id,
        project_name,
        project_summary,
        project_admin,
        start_date,
        deadline,
        notes,
        category_id,
        client_id,
        project_budget,
        currency_id,
        hours_allocated,
        status,
        manual_timelog,
        completion_percent,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`,
      [
        company_id || null,
        project_name,
        project_summary || null,
        workUserId, // project_admin
        start_date,
        deadline || null,
        notes || null,
        category_id || null,
        client_id || null,
        project_budget || null,
        currency_id || null,
        hours_allocated || null,
        status || 'not started',
        allow_manual_time_log ? 'enable' : 'disable',
      ]
    );

    const projectId = (result as any).insertId;

    console.log(`✅ Project created successfully with ID: ${projectId}`);

    // Add the project creator as a project member
    const defaultHourlyRate = 0.00; // Default hourly rate
    await workPool.execute(
      `INSERT INTO project_members (
        company_id,
        user_id,
        project_id,
        hourly_rate,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        company_id || null,
        workUserId,
        projectId,
        defaultHourlyRate,
      ]
    );

    console.log(`✅ Added user ${workUserId} as project member`);

    res.json({
      success: true,
      message: "Project created successfully",
      data: {
        id: projectId,
        project_name,
        start_date,
        deadline,
        status: status || 'not started',
      },
    });
  } catch (error: any) {
    console.error("❌ Error creating project:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.status(500).json({
        success: false,
        message: "Projects table not available",
      });
    }

    if (error.code === "ER_BAD_FIELD_ERROR") {
      console.error(`❌ Field does not exist: ${error.sqlMessage}`);
      return res.status(500).json({
        success: false,
        message: "Database schema mismatch",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create project",
    });
  }
});

/**
 * PUT /api/work/projects/:projectId
 * Update an existing project in Work database
 */
router.put("/projects/:projectId", authenticate, async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
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

    // Verify user has access to this project (is a member)
    const [memberCheck] = await workPool.execute(
      "SELECT id FROM project_members WHERE project_id = ? AND user_id = ?",
      [projectId, workUserId]
    );

    if ((memberCheck as any[]).length === 0) {
      return res.status(403).json({
        success: false,
        message: "Access denied to this project",
      });
    }

    const {
      project_name,
      category_id,
      start_date,
      deadline,
      project_summary,
      notes,
      client_id,
      project_budget,
      currency_id,
      hours_allocated,
      status,
      allow_manual_time_log,
      completion_percent,
      calculate_progress_through_tasks,
      client_feedback,
      read_only_mode,
    } = req.body;

    // Validate required fields
    if (!project_name || !start_date) {
      return res.status(400).json({
        success: false,
        message: "Project name and start date are required",
      });
    }

    console.log(`📝 Updating project ${projectId}: ${project_name}`);

    // Build dynamic UPDATE query
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    updateFields.push("project_name = ?");
    updateValues.push(project_name);

    updateFields.push("start_date = ?");
    updateValues.push(start_date);

    if (deadline !== undefined) {
      updateFields.push("deadline = ?");
      updateValues.push(deadline || null);
    }

    if (project_summary !== undefined) {
      updateFields.push("project_summary = ?");
      updateValues.push(project_summary || null);
    }

    if (notes !== undefined) {
      updateFields.push("notes = ?");
      updateValues.push(notes || null);
    }

    if (category_id !== undefined) {
      updateFields.push("category_id = ?");
      updateValues.push(category_id || null);
    }

    if (client_id !== undefined) {
      updateFields.push("client_id = ?");
      updateValues.push(client_id || null);
    }

    if (project_budget !== undefined) {
      updateFields.push("project_budget = ?");
      updateValues.push(project_budget || null);
    }

    if (currency_id !== undefined) {
      updateFields.push("currency_id = ?");
      updateValues.push(currency_id || null);
    }

    if (hours_allocated !== undefined) {
      updateFields.push("hours_allocated = ?");
      updateValues.push(hours_allocated || null);
    }

    if (status !== undefined) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }

    if (allow_manual_time_log !== undefined) {
      updateFields.push("manual_timelog = ?");
      updateValues.push(allow_manual_time_log ? "enable" : "disable");
    }

    if (completion_percent !== undefined) {
      updateFields.push("completion_percent = ?");
      updateValues.push(completion_percent || 0);
    }

    if (calculate_progress_through_tasks !== undefined) {
      updateFields.push("calculate_task_progress = ?");
      updateValues.push(calculate_progress_through_tasks ? "true" : "false");
    }

    if (client_feedback !== undefined) {
      updateFields.push("feedback = ?");
      updateValues.push(client_feedback || null);
    }

    updateFields.push("updated_at = NOW()");

    // Add projectId to values array for WHERE clause
    updateValues.push(projectId);

    // Execute UPDATE query
    await workPool.execute(
      `UPDATE projects SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    console.log(`✅ Project ${projectId} updated successfully`);

    res.json({
      success: true,
      message: "Project updated successfully",
      data: {
        id: projectId,
        project_name,
        start_date,
        deadline,
        status,
      },
    });
  } catch (error: any) {
    console.error("❌ Error updating project:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.status(500).json({
        success: false,
        message: "Projects table not available",
      });
    }

    if (error.code === "ER_BAD_FIELD_ERROR") {
      console.error(`❌ Field does not exist: ${error.sqlMessage}`);
      return res.status(500).json({
        success: false,
        message: "Database schema mismatch",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update project",
    });
  }
});

export default router;
