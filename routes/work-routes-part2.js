const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth-middleware');
const workService = require('../services/work-service');

/**
 * Work API Routes - Part 2
 * Time Logs, Invoices, Clients, Teams, Reports
 */

// ============================================
// TIME LOGS (TIMESHEETS)
// ============================================

/**
 * @swagger
 * /api/work/timelogs:
 *   get:
 *     tags: [Time Logs]
 *     summary: Get all time logs
 *     description: Retrieve time logs with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: approved
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filter by approval status
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter to date (YYYY-MM-DD)
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
router.get('/timelogs', authenticate, async (req, res) => {
  try {
    const { user_id, project_id, approved, start_date, end_date } = req.query;
    const timeLogs = await workService.getAllTimeLogs({ user_id, project_id, approved, start_date, end_date });

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
 * /api/work/timelogs/{id}:
 *   get:
 *     tags: [Time Logs]
 *     summary: Get time log by ID
 *     description: Retrieve single time log details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time log ID
 *     responses:
 *       200:
 *         description: Time log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TimeLog'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/timelogs/:id', authenticate, async (req, res) => {
  try {
    const timeLog = await workService.getTimeLogById(req.params.id);

    res.json({
      success: true,
      data: timeLog
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
 * /api/work/timelogs/project/{projectId}:
 *   get:
 *     tags: [Time Logs]
 *     summary: Get project time logs
 *     description: Retrieve all time logs for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
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
router.get('/timelogs/project/:projectId', authenticate, async (req, res) => {
  try {
    const timeLogs = await workService.getProjectTimeLogs(req.params.projectId);

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
 * /api/work/timelogs/user/{userId}:
 *   get:
 *     tags: [Time Logs]
 *     summary: Get user time logs
 *     description: Retrieve time logs for a specific user with date filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
router.get('/timelogs/user/:userId', authenticate, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const timeLogs = await workService.getUserTimeLogs(req.params.userId, { start_date, end_date });

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
 * /api/work/timelogs/pending-approval:
 *   get:
 *     tags: [Time Logs]
 *     summary: Get pending time logs
 *     description: Retrieve all time logs awaiting approval (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending time logs retrieved successfully
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
 *                     $ref: '#/components/schemas/TimeLog'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/timelogs/pending-approval', authenticate, async (req, res) => {
  try {
    const timeLogs = await workService.getPendingTimeLogs();

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
 * /api/work/timelogs:
 *   post:
 *     tags: [Time Logs]
 *     summary: Create time log (clock in)
 *     description: Start time tracking for a project/task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - start_time
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 10
 *               task_id:
 *                 type: integer
 *                 example: 50
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-13T09:00:00Z
 *               memo:
 *                 type: string
 *                 example: Working on login feature
 *     responses:
 *       201:
 *         description: Time log created successfully
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
 *                   example: Time log created successfully
 *                 data:
 *                   $ref: '#/components/schemas/TimeLog'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/timelogs', authenticate, async (req, res) => {
  try {
    const timeLog = await workService.createTimeLog(req.body);

    res.status(201).json({
      success: true,
      message: 'Time log created successfully',
      data: timeLog
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
 * /api/work/timelogs/{id}:
 *   put:
 *     tags: [Time Logs]
 *     summary: Update time log (clock out)
 *     description: Update time log details, typically for clock out
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-13T17:30:00Z
 *               memo:
 *                 type: string
 *                 example: Completed login feature
 *     responses:
 *       200:
 *         description: Time log updated successfully
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
 *                   example: Time log updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/TimeLog'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/timelogs/:id', authenticate, async (req, res) => {
  try {
    const timeLog = await workService.updateTimeLog(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Time log updated successfully',
      data: timeLog
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
 * /api/work/timelogs/{id}/approve:
 *   put:
 *     tags: [Time Logs]
 *     summary: Approve timesheet
 *     description: Approve time log for billing (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time log ID
 *     responses:
 *       200:
 *         description: Time log approved successfully
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
 *                   example: Time log approved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1002
 *                     approved:
 *                       type: integer
 *                       example: 1
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/timelogs/:id/approve', authenticate, async (req, res) => {
  try {
    const result = await workService.approveTimeLog(req.params.id);

    res.json({
      success: true,
      message: 'Time log approved successfully',
      data: result
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
 * /api/work/timelogs/{id}/reject:
 *   put:
 *     tags: [Time Logs]
 *     summary: Reject timesheet
 *     description: Reject time log (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time log ID
 *     responses:
 *       200:
 *         description: Time log rejected successfully
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
 *                   example: Time log rejected
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/timelogs/:id/reject', authenticate, async (req, res) => {
  try {
    const result = await workService.rejectTimeLog(req.params.id);

    res.json({
      success: true,
      message: 'Time log rejected',
      data: result
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
 * /api/work/timelogs/{id}:
 *   delete:
 *     tags: [Time Logs]
 *     summary: Delete time log
 *     description: Delete a time log entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time log ID
 *     responses:
 *       200:
 *         description: Time log deleted successfully
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
 *                   example: Time log deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/timelogs/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteTimeLog(req.params.id);

    res.json({
      success: true,
      message: 'Time log deleted successfully',
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
// INVOICES
// ============================================

/**
 * @swagger
 * /api/work/invoices:
 *   get:
 *     tags: [Invoices]
 *     summary: Get all invoices
 *     description: Retrieve invoices with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: client_id
 *         schema:
 *           type: integer
 *         description: Filter by client ID
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [unpaid, paid, partial, cancelled]
 *         description: Filter by payment status
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
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
 *                     $ref: '#/components/schemas/Invoice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/invoices', authenticate, async (req, res) => {
  try {
    const { client_id, project_id, status } = req.query;
    const invoices = await workService.getAllInvoices({ client_id, project_id, status });

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
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
 * /api/work/invoices/{id}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get invoice by ID
 *     description: Retrieve single invoice details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/invoices/:id', authenticate, async (req, res) => {
  try {
    const invoice = await workService.getInvoiceById(req.params.id);

    res.json({
      success: true,
      data: invoice
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
 * /api/work/invoices/client/{clientId}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get client invoices
 *     description: Retrieve all invoices for a specific client
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
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
 *                     $ref: '#/components/schemas/Invoice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/invoices/client/:clientId', authenticate, async (req, res) => {
  try {
    const invoices = await workService.getClientInvoices(req.params.clientId);

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
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
 * /api/work/invoices/project/{projectId}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get project invoices
 *     description: Retrieve all invoices for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
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
 *                     $ref: '#/components/schemas/Invoice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/invoices/project/:projectId', authenticate, async (req, res) => {
  try {
    const invoices = await workService.getAllInvoices({ project_id: req.params.projectId });

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
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
 * /api/work/invoices:
 *   post:
 *     tags: [Invoices]
 *     summary: Create invoice
 *     description: Create a new invoice manually (Finance/Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - client_id
 *               - subtotal
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 10
 *               client_id:
 *                 type: integer
 *                 example: 5
 *               subtotal:
 *                 type: number
 *                 example: 5000.00
 *               tax:
 *                 type: number
 *                 example: 500.00
 *               total:
 *                 type: number
 *                 example: 5500.00
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-28
 *               notes:
 *                 type: string
 *                 example: Monthly development invoice
 *     responses:
 *       201:
 *         description: Invoice created successfully
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
 *                   example: Invoice created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/invoices', authenticate, async (req, res) => {
  try {
    const invoice = await workService.createInvoice(req.body);

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice
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
 * /api/work/invoices/generate-from-timelogs:
 *   post:
 *     tags: [Invoices]
 *     summary: Generate invoice from approved hours
 *     description: Auto-generate invoice from approved time logs (Finance/Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - client_id
 *               - start_date
 *               - end_date
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 10
 *               client_id:
 *                 type: integer
 *                 example: 5
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-31
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-02-28
 *               tax_rate:
 *                 type: number
 *                 example: 10
 *                 description: Tax rate percentage
 *     responses:
 *       201:
 *         description: Invoice generated successfully
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
 *                   example: Invoice generated from time logs successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     invoice_number:
 *                       type: string
 *                       example: INV-2025-002
 *                     total_hours:
 *                       type: number
 *                       example: 160.5
 *                     subtotal:
 *                       type: number
 *                       example: 8025.00
 *                     tax:
 *                       type: number
 *                       example: 802.50
 *                     total:
 *                       type: number
 *                       example: 8827.50
 *                     time_logs_count:
 *                       type: integer
 *                       example: 45
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/invoices/generate-from-timelogs', authenticate, async (req, res) => {
  try {
    const invoice = await workService.generateInvoiceFromTimeLogs(req.body);

    res.status(201).json({
      success: true,
      message: 'Invoice generated from time logs successfully',
      data: invoice
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
 * /api/work/invoices/{id}:
 *   put:
 *     tags: [Invoices]
 *     summary: Update invoice
 *     description: Update invoice details (Finance/Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               total:
 *                 type: number
 *               due_date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
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
 *                   example: Invoice updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/invoices/:id', authenticate, async (req, res) => {
  try {
    const invoice = await workService.updateInvoice(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice
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
 * /api/work/invoices/{id}/status:
 *   put:
 *     tags: [Invoices]
 *     summary: Update invoice status
 *     description: Update invoice payment status (Finance/Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Invoice ID
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
 *                 example: paid
 *                 description: New invoice status (pending, paid, overdue, cancelled)
 *     responses:
 *       200:
 *         description: Invoice status updated successfully
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
 *                   example: Invoice status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/invoices/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await workService.updateInvoiceStatus(req.params.id, status);

    res.json({
      success: true,
      message: 'Invoice status updated successfully',
      data: invoice
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
 * /api/work/invoices/{id}:
 *   delete:
 *     tags: [Invoices]
 *     summary: Delete invoice
 *     description: Delete an invoice (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
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
 *                   example: Invoice deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/invoices/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteInvoice(req.params.id);

    res.json({
      success: true,
      message: 'Invoice deleted successfully',
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
// CLIENTS
// ============================================

/**
 * @swagger
 * /api/work/clients:
 *   get:
 *     tags: [Clients]
 *     summary: Get all clients
 *     description: Retrieve all clients with optional search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name
 *     responses:
 *       200:
 *         description: Clients retrieved successfully
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
 *                     $ref: '#/components/schemas/Client'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/clients', authenticate, async (req, res) => {
  try {
    const { search } = req.query;
    const clients = await workService.getAllClients({ search });

    res.json({
      success: true,
      count: clients.length,
      data: clients
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
 * /api/work/clients/{id}:
 *   get:
 *     tags: [Clients]
 *     summary: Get client by ID
 *     description: Retrieve single client details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/clients/:id', authenticate, async (req, res) => {
  try {
    const client = await workService.getClientById(req.params.id);

    res.json({
      success: true,
      data: client
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
 * /api/work/clients/{id}/projects:
 *   get:
 *     tags: [Clients]
 *     summary: Get client projects
 *     description: Retrieve all projects for a specific client
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
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
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/clients/:id/projects', authenticate, async (req, res) => {
  try {
    const projects = await workService.getClientProjects(req.params.id);

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
 * /api/work/clients/{id}/invoices:
 *   get:
 *     tags: [Clients]
 *     summary: Get client invoices
 *     description: Retrieve all invoices for a specific client
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
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
 *                     $ref: '#/components/schemas/Invoice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/clients/:id/invoices', authenticate, async (req, res) => {
  try {
    const invoices = await workService.getClientInvoices(req.params.id);

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
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
 * /api/work/clients/{id}/contacts:
 *   get:
 *     tags: [Clients]
 *     summary: Get client contacts
 *     description: Retrieve all contacts for a specific client
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
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
router.get('/clients/:id/contacts', authenticate, async (req, res) => {
  try {
    const contacts = await workService.getClientContacts(req.params.id);

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
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
 * /api/work/clients/{id}/documents:
 *   get:
 *     tags: [Clients]
 *     summary: Get client documents
 *     description: Retrieve all documents for a specific client
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Documents retrieved successfully
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
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/clients/:id/documents', authenticate, async (req, res) => {
  try {
    const documents = await workService.getClientDocuments(req.params.id);

    res.json({
      success: true,
      count: documents.length,
      data: documents
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
 * /api/work/clients:
 *   post:
 *     tags: [Clients]
 *     summary: Create client
 *     description: Create a new client (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_name
 *               - email
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Acme Corporation
 *               name:
 *                 type: string
 *                 example: John Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@acme.com
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: https://acme.com
 *               mobile:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       201:
 *         description: Client created successfully
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
 *                   example: Client created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/clients', authenticate, async (req, res) => {
  try {
    const client = await workService.createClient(req.body);

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
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
 * /api/work/clients/{id}:
 *   put:
 *     tags: [Clients]
 *     summary: Update client
 *     description: Update client details (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               website:
 *                 type: string
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
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
 *                   example: Client updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/clients/:id', authenticate, async (req, res) => {
  try {
    const client = await workService.updateClient(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
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
 * /api/work/clients/{id}:
 *   delete:
 *     tags: [Clients]
 *     summary: Delete client
 *     description: Delete a client (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client deleted successfully
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
 *                   example: Client deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/clients/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteClient(req.params.id);

    res.json({
      success: true,
      message: 'Client deleted successfully',
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
// TEAMS
// ============================================

/**
 * @swagger
 * /api/work/teams:
 *   get:
 *     tags: [Teams]
 *     summary: Get all teams
 *     description: Retrieve all teams in the organization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
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
 *                     $ref: '#/components/schemas/Team'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/teams', authenticate, async (req, res) => {
  try {
    const teams = await workService.getAllTeams();

    res.json({
      success: true,
      count: teams.length,
      data: teams
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
 * /api/work/teams/{id}:
 *   get:
 *     tags: [Teams]
 *     summary: Get team by ID
 *     description: Retrieve single team details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/teams/:id', authenticate, async (req, res) => {
  try {
    const team = await workService.getTeamById(req.params.id);

    res.json({
      success: true,
      data: team
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
 * /api/work/teams/{id}/members:
 *   get:
 *     tags: [Teams]
 *     summary: Get team members
 *     description: Retrieve all members of a specific team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
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
 *                   example: 6
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/teams/:id/members', authenticate, async (req, res) => {
  try {
    const members = await workService.getTeamMembers(req.params.id);

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
 * /api/work/teams/{id}/projects:
 *   get:
 *     tags: [Teams]
 *     summary: Get team projects
 *     description: Retrieve all projects assigned to a team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team projects retrieved successfully
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
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/teams/:id/projects', authenticate, async (req, res) => {
  try {
    const projects = await workService.getTeamProjects(req.params.id);

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
 * /api/work/teams:
 *   post:
 *     tags: [Teams]
 *     summary: Create team
 *     description: Create a new team (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team_name
 *             properties:
 *               team_name:
 *                 type: string
 *                 example: Development Team
 *               description:
 *                 type: string
 *                 example: Full-stack development team
 *     responses:
 *       201:
 *         description: Team created successfully
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
 *                   example: Team created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/teams', authenticate, async (req, res) => {
  try {
    const team = await workService.createTeam(req.body);

    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: team
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
 * /api/work/teams/{id}:
 *   put:
 *     tags: [Teams]
 *     summary: Update team
 *     description: Update team details (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
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
 *                   example: Team updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/teams/:id', authenticate, async (req, res) => {
  try {
    const team = await workService.updateTeam(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Team updated successfully',
      data: team
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
 * /api/work/teams/{id}:
 *   delete:
 *     tags: [Teams]
 *     summary: Delete team
 *     description: Delete a team (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
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
 *                   example: Team deleted successfully
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/teams/:id', authenticate, async (req, res) => {
  try {
    const result = await workService.deleteTeam(req.params.id);

    res.json({
      success: true,
      message: 'Team deleted successfully',
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
// EARNINGS & REPORTS
// ============================================

/**
 * @swagger
 * /api/work/earnings/user/{userId}:
 *   get:
 *     tags: [Reports]
 *     summary: Get user earnings
 *     description: Calculate total earnings for a user with optional date filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *         description: Earnings retrieved successfully
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
 *                     total_hours:
 *                       type: number
 *                       example: 160.5
 *                     total_earnings:
 *                       type: number
 *                       example: 8025.00
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/earnings/user/:userId', authenticate, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const earnings = await workService.getUserEarnings(req.params.userId, { start_date, end_date });

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

/**
 * @swagger
 * /api/work/earnings/project/{projectId}:
 *   get:
 *     tags: [Reports]
 *     summary: Get project earnings
 *     description: Calculate total earnings for a specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Earnings retrieved successfully
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
 *                     project_id:
 *                       type: integer
 *                       example: 10
 *                     total_hours:
 *                       type: number
 *                       example: 320.0
 *                     total_cost:
 *                       type: number
 *                       example: 16000.00
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/earnings/project/:projectId', authenticate, async (req, res) => {
  try {
    const earnings = await workService.getProjectEarnings(req.params.projectId);

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

/**
 * @swagger
 * /api/work/reports/timesheet:
 *   get:
 *     tags: [Reports]
 *     summary: Get timesheet reports
 *     description: Generate detailed timesheet report (Admin/Team Lead/Finance only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *         description: Filter by project ID
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Report start date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Report end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Timesheet report generated successfully
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
 *                   example: 100
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_name:
 *                         type: string
 *                         example: John Doe
 *                       project_name:
 *                         type: string
 *                         example: Website Redesign
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2025-01-13
 *                       hours:
 *                         type: number
 *                         example: 8.0
 *                       approved:
 *                         type: integer
 *                         example: 1
 *                       earnings:
 *                         type: number
 *                         example: 400.00
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/reports/timesheet', authenticate, async (req, res) => {
  try {
    const { user_id, project_id, start_date, end_date } = req.query;
    const report = await workService.getTimesheetReport({ user_id, project_id, start_date, end_date });

    res.json({
      success: true,
      count: report.length,
      data: report
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
 * /api/work/reports/project-profitability:
 *   get:
 *     tags: [Reports]
 *     summary: Get project profitability report
 *     description: Calculate profit margins for all projects (Admin/Finance only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profitability report generated successfully
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
 *                     type: object
 *                     properties:
 *                       project_id:
 *                         type: integer
 *                         example: 10
 *                       project_name:
 *                         type: string
 *                         example: Website Redesign
 *                       budget:
 *                         type: number
 *                         example: 50000.00
 *                       total_cost:
 *                         type: number
 *                         example: 35000.00
 *                       total_paid:
 *                         type: number
 *                         example: 40000.00
 *                       profit:
 *                         type: number
 *                         example: 5000.00
 *                       profit_margin:
 *                         type: number
 *                         example: 12.5
 *                         description: Profit margin percentage
 *                       status:
 *                         type: string
 *                         example: profitable
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/reports/project-profitability', authenticate, async (req, res) => {
  try {
    const report = await workService.getProjectProfitabilityReport();

    res.json({
      success: true,
      count: report.length,
      data: report
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
 * /api/work/reports/user-productivity:
 *   get:
 *     tags: [Reports]
 *     summary: Get user productivity stats
 *     description: Retrieve productivity statistics for users (Admin/Team Lead only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for stats (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for stats (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Productivity stats retrieved successfully
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
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 42
 *                       user_name:
 *                         type: string
 *                         example: John Doe
 *                       total_hours:
 *                         type: number
 *                         example: 160.0
 *                       tasks_completed:
 *                         type: integer
 *                         example: 25
 *                       productivity_score:
 *                         type: number
 *                         example: 8.5
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/reports/user-productivity', authenticate, async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.query;
    const stats = await workService.getUserProductivityStats({ user_id, start_date, end_date });

    res.json({
      success: true,
      count: stats.length,
      data: stats
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
