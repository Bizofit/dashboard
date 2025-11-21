const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth-middleware');
const workService = require('../services/work-service');

/**
 * Work.Bizoforce API Routes
 * All routes require Bearer token authentication
 * Format: Authorization: Bearer <JWT_TOKEN>
 */

// ============================================
// USERS & EMPLOYEES
// ============================================

/**
 * @swagger
 * /api/work/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve all users with optional filtering by status, company, or search term
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, deactivated]
 *         description: Filter by user status
 *       - in: query
 *         name: company_id
 *         schema:
 *           type: integer
 *         description: Filter by company ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum number of results
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 25
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.get('/users', authenticate, async (req, res) => {
  try {
    const { status, company_id, search, limit } = req.query;
    const users = await workService.getAllUsers({ status, company_id, search, limit });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/users/:id', authenticate, async (req, res) => {
  try {
    const user = await workService.getUserById(req.params.id);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/users/{id}/projects:
 *   get:
 *     tags: [Users]
 *     summary: Get user's projects
 *     description: Retrieve all projects assigned to a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/users/:id/projects', authenticate, async (req, res) => {
  try {
    const projects = await workService.getUserProjects(req.params.id);

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/users/{id}/tasks:
 *   get:
 *     tags: [Users]
 *     summary: Get user's tasks
 *     description: Retrieve all tasks assigned to a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 15
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/users/:id/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await workService.getUserTasks(req.params.id);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/users/{id}/timelogs:
 *   get:
 *     tags: [Users]
 *     summary: Get user's time logs
 *     description: Retrieve time logs for a specific user with optional date filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Time logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 28
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TimeLog'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/users/:id/timelogs', authenticate, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const timeLogs = await workService.getUserTimeLogs(req.params.id, { start_date, end_date });

    res.json({
      success: true,
      count: timeLogs.length,
      data: timeLogs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/users/{id}/earnings:
 *   get:
 *     tags: [Users]
 *     summary: Get user earnings
 *     description: Calculate total earnings for a user based on approved time logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for earnings calculation (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for earnings calculation (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Earnings calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     total_hours:
 *                       type: number
 *                       example: 160.5
 *                     hourly_rate:
 *                       type: number
 *                       example: 50.00
 *                     total_earnings:
 *                       type: number
 *                       example: 8025.00
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/users/:id/earnings', authenticate, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const earnings = await workService.getUserEarnings(req.params.id, { start_date, end_date });

    res.json({
      success: true,
      data: earnings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ============================================
// PROJECTS
// ============================================

/**
 * @swagger
 * /api/work/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get all projects
 *     description: Retrieve all projects with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not started, in progress, on hold, cancelled, finished]
 *         description: Filter by project status
 *       - in: query
 *         name: client_id
 *         schema:
 *           type: integer
 *         description: Filter by client ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by project name
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 15
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects', authenticate, async (req, res) => {
  try {
    const { status, client_id, search } = req.query;
    const projects = await workService.getAllProjects({ status, client_id, search });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get project by ID
 *     description: Retrieve single project details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/projects/:id', authenticate, async (req, res) => {
  try {
    const project = await workService.getProjectById(req.params.id);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/members:
 *   get:
 *     tags: [Projects]
 *     summary: Get project team members
 *     description: Retrieve all team members assigned to a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Team members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/members', authenticate, async (req, res) => {
  try {
    const members = await workService.getProjectMembers(req.params.id);

    res.json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/tasks:
 *   get:
 *     tags: [Projects]
 *     summary: Get project tasks
 *     description: Retrieve all tasks for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 20
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await workService.getProjectTasks(req.params.id);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/timelogs:
 *   get:
 *     tags: [Projects]
 *     summary: Get project time logs
 *     description: Retrieve all time logs for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Time logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 50
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TimeLog'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/timelogs', authenticate, async (req, res) => {
  try {
    const timeLogs = await workService.getProjectTimeLogs(req.params.id);

    res.json({
      success: true,
      count: timeLogs.length,
      data: timeLogs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/milestones:
 *   get:
 *     tags: [Projects]
 *     summary: Get project milestones
 *     description: Retrieve all milestones for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Milestones retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/milestones', authenticate, async (req, res) => {
  try {
    const milestones = await workService.getProjectMilestones(req.params.id);

    res.json({
      success: true,
      count: milestones.length,
      data: milestones
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/files:
 *   get:
 *     tags: [Projects]
 *     summary: Get project files
 *     description: Retrieve all files attached to a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 8
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/files', authenticate, async (req, res) => {
  try {
    const files = await workService.getProjectFiles(req.params.id);

    res.json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/notes:
 *   get:
 *     tags: [Projects]
 *     summary: Get project notes
 *     description: Retrieve all notes for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 12
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/notes', authenticate, async (req, res) => {
  try {
    const notes = await workService.getProjectNotes(req.params.id);

    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}/activity:
 *   get:
 *     tags: [Projects]
 *     summary: Get project activity log
 *     description: Retrieve activity history for a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Activity log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 25
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/projects/:id/activity', authenticate, async (req, res) => {
  try {
    const activity = await workService.getProjectActivity(req.params.id);

    res.json({
      success: true,
      count: activity.length,
      data: activity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Create new project
 *     description: Create a new project (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_name
 *               - start_date
 *             properties:
 *               project_name:
 *                 type: string
 *                 example: New Website
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-01
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-01
 *               client_id:
 *                 type: integer
 *                 example: 5
 *               budget:
 *                 type: number
 *                 example: 75000.00
 *               status:
 *                 type: string
 *                 enum: [not started, in progress, on hold, cancelled, finished]
 *                 example: not started
 *               notes:
 *                 type: string
 *                 example: Project description
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/projects', authenticate, async (req, res) => {
  try {
    const project = await workService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}:
 *   put:
 *     tags: [Projects]
 *     summary: Update project
 *     description: Update project details (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [not started, in progress, on hold, cancelled, finished]
 *               budget:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/projects/:id', authenticate, async (req, res) => {
  try {
    const project = await workService.updateProject(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/projects/{id}:
 *   delete:
 *     tags: [Projects]
 *     summary: Delete project (soft delete)
 *     description: Soft delete a project (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/projects/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteProject(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ============================================
// TASKS
// ============================================

/**
 * @swagger
 * /api/work/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks
 *     description: Retrieve all tasks with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by assigned user ID
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 42
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const { project_id, status, user_id } = req.query;
    const tasks = await workService.getAllTasks({ project_id, status, user_id });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task by ID
 *     description: Retrieve single task details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/tasks/:id', authenticate, async (req, res) => {
  try {
    const task = await workService.getTaskById(req.params.id);

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}/comments:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task comments
 *     description: Retrieve all comments for a specific task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 7
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/tasks/:id/comments', authenticate, async (req, res) => {
  try {
    const comments = await workService.getTaskComments(req.params.id);

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}/subtasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task subtasks
 *     description: Retrieve all subtasks for a specific task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Subtasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/tasks/:id/subtasks', authenticate, async (req, res) => {
  try {
    const subtasks = await workService.getTaskSubtasks(req.params.id);

    res.json({
      success: true,
      count: subtasks.length,
      data: subtasks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}/files:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task files
 *     description: Retrieve all files attached to a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/tasks/:id/files', authenticate, async (req, res) => {
  try {
    const files = await workService.getTaskFiles(req.params.id);

    res.json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}/history:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task history
 *     description: Retrieve change history for a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/tasks/:id/history', authenticate, async (req, res) => {
  try {
    const history = await workService.getTaskHistory(req.params.id);

    res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create new task
 *     description: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task_name
 *               - project_id
 *             properties:
 *               task_name:
 *                 type: string
 *                 example: Implement login feature
 *               project_id:
 *                 type: integer
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: Build JWT-based authentication
 *               assigned_to:
 *                 type: integer
 *                 example: 42
 *               status:
 *                 type: string
 *                 example: pending
 *               priority:
 *                 type: string
 *                 example: high
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-01
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/tasks', authenticate, async (req, res) => {
  try {
    const task = await workService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update task
 *     description: Update task details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               assigned_to:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/tasks/:id', authenticate, async (req, res) => {
  try {
    const task = await workService.updateTask(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}/status:
 *   put:
 *     tags: [Tasks]
 *     summary: Update task status
 *     description: Update only the status of a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *                 description: New task status
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/tasks/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await workService.updateTaskStatus(req.params.id, status);

    res.json({
      success: true,
      message: 'Task status updated successfully',
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/work/tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task
 *     description: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/tasks/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteTask(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// TO BE CONTINUED in next file due to length...

module.exports = router;
