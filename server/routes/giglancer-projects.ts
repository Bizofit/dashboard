/**
 * Giglancer Projects Routes
 * Fetches projects from Giglancer database for the logged-in user
 */

import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { giglancerPool } from "../db.js";

const router = Router();

/**
 * GET /api/giglancer/projects
 * Get all projects for the logged-in user from Giglancer database
 */
router.get("/projects", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get giglancer_user_id from the authenticated user
    const giglancerUserId = user.giglancer_user_id;

    if (!giglancerUserId) {
      return res.json({
        success: true,
        message: "User has no Giglancer account",
        data: [],
      });
    }

    console.log(`📋 Fetching Giglancer projects for user_id: ${giglancerUserId}`);

    // Query projects from Giglancer database
    // According to schema, projects table has user_id column
    const [projects] = await giglancerPool.execute(
      `SELECT 
        p.id,
        p.name as title,
        p.description,
        p.employment_type,
        p.work_mode,
        p.job_location as location,
        p.years_of_exp,
        p.hiring_org,
        p.is_active,
        p.is_featured,
        p.is_urgent,
        p.bid_duration,
        p.created_at,
        p.updated_at,
        ps.name as status,
        pr.name as budget_range
      FROM projects p
      LEFT JOIN project_statuses ps ON p.project_status_id = ps.id
      LEFT JOIN project_ranges pr ON p.project_range_id = pr.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC`,
      [giglancerUserId]
    );

    console.log(`✅ Found ${(projects as any[]).length} projects for Giglancer user ${giglancerUserId}`);

    // Format the projects data
    const formattedProjects = (projects as any[]).map((project) => ({
      id: `giglancer_${project.id}`,
      title: project.title || "Untitled Project",
      description: project.description || "",
      location: project.location || "Remote",
      employment_type: project.employment_type || "contract",
      work_mode: project.work_mode || "remote",
      years_of_exp: project.years_of_exp || 0,
      hiring_org: project.hiring_org || "",
      status: project.is_active ? "open" : "closed",
      budget_range: project.budget_range || "Not specified",
      is_featured: project.is_featured || false,
      is_urgent: project.is_urgent || false,
      bid_duration: project.bid_duration || 0,
      platform: "giglancer",
      postedAt: project.created_at,
      updatedAt: project.updated_at,
    }));

    res.json({
      success: true,
      data: formattedProjects,
    });
  } catch (error: any) {
    console.error("❌ Error fetching Giglancer projects:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Projects table not available",
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
      message: error.message || "Failed to fetch projects",
    });
  }
});

/**
 * GET /api/giglancer/projects/:id
 * Get a specific project by ID
 */
router.get("/projects/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const giglancerUserId = user.giglancer_user_id;

    if (!giglancerUserId) {
      return res.status(404).json({
        success: false,
        message: "User has no Giglancer account",
      });
    }

    // Extract numeric ID from "giglancer_123" format
    const projectId = req.params.id.replace("giglancer_", "");

    console.log(`📋 Fetching Giglancer project ${projectId} for user_id: ${giglancerUserId}`);

    const [projects] = await giglancerPool.execute(
      `SELECT 
        p.*,
        ps.name as status_name,
        pr.name as budget_range
      FROM projects p
      LEFT JOIN project_statuses ps ON p.project_status_id = ps.id
      LEFT JOIN project_ranges pr ON p.project_range_id = pr.id
      WHERE p.id = ? AND p.user_id = ?
      LIMIT 1`,
      [projectId, giglancerUserId]
    );

    if (!(projects as any[]).length) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const project = (projects as any[])[0];

    res.json({
      success: true,
      data: {
        id: `giglancer_${project.id}`,
        title: project.name,
        description: project.description,
        location: project.job_location,
        employment_type: project.employment_type,
        work_mode: project.work_mode,
        years_of_exp: project.years_of_exp,
        hiring_org: project.hiring_org,
        status: project.is_active ? "open" : "closed",
        budget_range: project.budget_range,
        is_featured: project.is_featured,
        is_urgent: project.is_urgent,
        bid_duration: project.bid_duration,
        platform: "giglancer",
        postedAt: project.created_at,
        updatedAt: project.updated_at,
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching Giglancer project:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch project",
    });
  }
});

export default router;
