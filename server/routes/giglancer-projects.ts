/**
 * Giglancer Projects Routes
 * Fetches projects from Giglancer database for the logged-in user
 */

import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { giglancerPool, unifiedPool } from "../db.js";

const router = Router();

/**
 * GET /api/giglancer/projects
 * Get all projects for the logged-in user from Giglancer database
 */
router.get("/projects", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get giglancer_user_id from unified_users table
    const [userRows] = await unifiedPool.execute(
      "SELECT giglancer_user_id FROM unified_users WHERE id = ?",
      [user.userId]
    );
    const unifiedUser = (userRows as any[])[0];
    const giglancerUserId = unifiedUser?.giglancer_user_id;

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
router.get("/projects/:id", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get giglancer_user_id from unified_users table
    const [userRows] = await unifiedPool.execute(
      "SELECT giglancer_user_id FROM unified_users WHERE id = ?",
      [user.userId]
    );
    const unifiedUser = (userRows as any[])[0];
    const giglancerUserId = unifiedUser?.giglancer_user_id;

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

    // Fetch applications (bids) for this project
    const [bids] = await giglancerPool.execute(
      `SELECT
        b.id,
        b.user_id,
        b.amount,
        b.description,
        b.years_of_exp,
        b.created_at as applied_date,
        u.first_name,
        u.last_name,
        u.email,
        bs.name as bid_status_name
      FROM bids b
      JOIN users u ON b.user_id = u.id
      LEFT JOIN bid_statuses bs ON b.bid_status_id = bs.id
      WHERE b.project_id = ?
      ORDER BY b.created_at DESC`,
      [projectId]
    );

    // Format applications data
    const applications = (bids as any[]).map((bid) => ({
      id: bid.id,
      candidate: {
        name: `${bid.first_name || ""} ${bid.last_name || ""}`.trim() || bid.email.split("@")[0],
        email: bid.email,
      },
      appliedDate: bid.applied_date,
      aiScore: Math.floor(Math.random() * 30) + 70, // Mock AI score 70-100
      status: bid.bid_status_name || "Pending",
    }));

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
      applications: applications,
    });
  } catch (error: any) {
    console.error("❌ Error fetching Giglancer project:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch project",
    });
  }
});

/**
 * POST /api/giglancer/projects
 * Create a new project in Giglancer database
 */
router.post("/projects", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get giglancer_user_id from unified_users table
    const [userRows] = await unifiedPool.execute(
      "SELECT giglancer_user_id FROM unified_users WHERE id = ?",
      [user.userId]
    );
    const unifiedUser = (userRows as any[])[0];
    const giglancerUserId = unifiedUser?.giglancer_user_id;

    if (!giglancerUserId) {
      return res.status(400).json({
        success: false,
        message: "User has no Giglancer account. Please link your Giglancer account first.",
      });
    }

    // Extract job data from request body
    const {
      title,
      description,
      location,
      salary,
      employment_type,
      work_mode,
      years_of_exp,
      experience_range,
      hiring_org,
      status,
      is_featured,
      is_urgent,
      bid_duration,
      requirements,
      technical_skills,
      skill_ids,
      job_seo_title,
      job_seo_description,
    } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    console.log(`📝 Creating Giglancer project for user_id: ${giglancerUserId}`);

    // Format requirements with additional details
    let formattedRequirements = description;
    if (requirements || technical_skills) {
      formattedRequirements += "\n\nRequirements:";
      if (requirements) formattedRequirements += `\n${requirements}`;
      if (technical_skills) formattedRequirements += `\n\nTechnical Skills: ${technical_skills}`;
    }

    // Insert project into Giglancer database
    const [result] = await giglancerPool.execute(
      `INSERT INTO projects (
        user_id,
        name,
        description,
        job_location,
        employment_type,
        work_mode,
        years_of_exp,
        hiring_org,
        is_active,
        is_featured,
        is_urgent,
        bid_duration,
        seo_title,
        seo_description,
        additional_descriptions,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        giglancerUserId,
        title,
        formattedRequirements,
        location || "Remote",
        employment_type || "contract",
        work_mode || "remote",
        years_of_exp || 0,
        hiring_org || "",
        status === "open" ? 1 : 0,
        is_featured || false,
        is_urgent || false,
        bid_duration || 30,
        job_seo_title || title,
        job_seo_description || description?.substring(0, 160),
        salary ? `Salary Range: ${salary}` : null,
      ]
    );

    const insertId = (result as any).insertId;

    console.log(`✅ Created Giglancer project with ID: ${insertId}`);

    // Link skills to project in skills_projects table
    if (skill_ids && Array.isArray(skill_ids) && skill_ids.length > 0) {
      console.log(`🔗 Linking ${skill_ids.length} skills to project ${insertId}`);

      try {
        const skillInsertPromises = skill_ids.map((skillId: number) =>
          giglancerPool.execute(
            `INSERT INTO skills_projects (project_id, skill_id, created_at, updated_at)
             VALUES (?, ?, NOW(), NOW())
             ON DUPLICATE KEY UPDATE updated_at = NOW()`,
            [insertId, skillId]
          )
        );

        await Promise.all(skillInsertPromises);
        console.log(`✅ Successfully linked skills to project`);
      } catch (skillError) {
        console.error(`⚠️ Error linking skills to project:`, skillError);
        // Don't fail the entire request if skills linking fails
      }
    }

    // Fetch the newly created project
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
        p.updated_at
      FROM projects p
      WHERE p.id = ?
      LIMIT 1`,
      [insertId]
    );

    const project = (projects as any[])[0];

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: {
        id: `giglancer_${project.id}`,
        title: project.title,
        description: project.description,
        location: project.location || "Remote",
        employment_type: project.employment_type || "contract",
        work_mode: project.work_mode || "remote",
        years_of_exp: project.years_of_exp || 0,
        hiring_org: project.hiring_org || "",
        status: project.is_active ? "open" : "closed",
        is_featured: project.is_featured || false,
        is_urgent: project.is_urgent || false,
        bid_duration: project.bid_duration || 0,
        platform: "giglancer",
        postedAt: project.created_at,
        updatedAt: project.updated_at,
      },
    });
  } catch (error: any) {
    console.error("❌ Error creating Giglancer project:", error);

    // Handle database errors
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

export default router;
