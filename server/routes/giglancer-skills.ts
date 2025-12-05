/**
 * Giglancer Skills Routes
 * Fetches skills from Giglancer database
 */

import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { giglancerPool } from "../db.js";

const router = Router();

/**
 * GET /api/giglancer/skills
 * Get all active skills from Giglancer database
 * Optional query params:
 * - search: Filter skills by name (case-insensitive)
 * - limit: Limit number of results (default: 50)
 */
router.get("/skills", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const search = req.query.search as string || "";
    const limit = parseInt(req.query.limit as string) || 50;

    console.log(`🔍 Searching skills with query: "${search}", limit: ${limit}`);

    let query = `
      SELECT
        id,
        name,
        slug,
        project_count,
        user_count,
        active_job_count,
        job_count
      FROM skills
      WHERE is_active = 1
    `;

    const params: any[] = [];

    // Add search filter if provided
    if (search) {
      query += ` AND name LIKE ?`;
      params.push(`${search}%`);
    }

    // Order by popularity (user_count + project_count)
    query += ` ORDER BY (user_count + project_count) DESC, name ASC LIMIT ${limit}`;

    const [skills] = await giglancerPool.execute(query, params);

    console.log(`✅ Found ${(skills as any[]).length} skills`);

    // Format the skills data
    const formattedSkills = (skills as any[]).map((skill) => ({
      id: skill.id,
      name: skill.name,
      slug: skill.slug,
      projectCount: skill.project_count || 0,
      userCount: skill.user_count || 0,
      activeJobCount: skill.active_job_count || 0,
      jobCount: skill.job_count || 0,
    }));

    res.json({
      success: true,
      data: formattedSkills,
    });
  } catch (error: any) {
    console.error("❌ Error fetching Giglancer skills:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Skills table not available",
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
      message: error.message || "Failed to fetch skills",
    });
  }
});

/**
 * GET /api/giglancer/skills/popular
 * Get most popular skills (top 20 by user_count + project_count)
 */
router.get("/skills/popular", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    console.log(`⭐ Fetching popular skills`);

    const [skills] = await giglancerPool.execute(
      `SELECT
        id,
        name,
        slug,
        project_count,
        user_count,
        active_job_count,
        job_count
      FROM skills
      WHERE is_active = 1
      ORDER BY (user_count + project_count) DESC
      LIMIT 20`
    );

    console.log(`✅ Found ${(skills as any[]).length} popular skills`);

    const formattedSkills = (skills as any[]).map((skill) => ({
      id: skill.id,
      name: skill.name,
      slug: skill.slug,
      projectCount: skill.project_count || 0,
      userCount: skill.user_count || 0,
      activeJobCount: skill.active_job_count || 0,
      jobCount: skill.job_count || 0,
    }));

    res.json({
      success: true,
      data: formattedSkills,
    });
  } catch (error: any) {
    console.error("❌ Error fetching popular skills:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch popular skills",
    });
  }
});

/**
 * GET /api/giglancer/project-ranges
 * Get all active project salary ranges from Giglancer database
 */
router.get("/project-ranges", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    console.log(`💰 Fetching active project ranges`);

    const [ranges] = await giglancerPool.execute(
      `SELECT
        id,
        name,
        min_amount,
        max_amount,
        project_count,
        active_project_count
      FROM project_ranges
      WHERE is_active = 1
      ORDER BY min_amount ASC`
    );

    console.log(`✅ Found ${(ranges as any[]).length} active project ranges`);

    // Format the ranges data
    const formattedRanges = (ranges as any[]).map((range) => ({
      id: range.id,
      name: range.name,
      minAmount: range.min_amount || 0,
      maxAmount: range.max_amount || 0,
      projectCount: range.project_count || 0,
      activeProjectCount: range.active_project_count || 0,
    }));

    res.json({
      success: true,
      data: formattedRanges,
    });
  } catch (error: any) {
    console.error("❌ Error fetching project ranges:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Project ranges table not available",
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
      message: error.message || "Failed to fetch project ranges",
    });
  }
});

/**
 * GET /api/giglancer/project-statuses
 * Get all active project statuses from Giglancer database
 */
router.get("/project-statuses", authenticate, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    console.log(`📊 Fetching active project statuses`);

    const [statuses] = await giglancerPool.execute(
      `SELECT
        id,
        name,
        project_count
      FROM project_statuses
      WHERE is_active = 1
      ORDER BY id ASC`
    );

    console.log(`✅ Found ${(statuses as any[]).length} active project statuses`);

    // Format the statuses data
    const formattedStatuses = (statuses as any[]).map((status) => ({
      id: status.id,
      name: status.name,
      projectCount: status.project_count || 0,
    }));

    res.json({
      success: true,
      data: formattedStatuses,
    });
  } catch (error: any) {
    console.error("❌ Error fetching project statuses:", error);

    // Handle missing tables gracefully
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table does not exist: ${error.sqlMessage}`);
      return res.json({
        success: true,
        message: "Project statuses table not available",
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
      message: error.message || "Failed to fetch project statuses",
    });
  }
});

export default router;