const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const { authenticate } = require('../middleware/auth-middleware');

/**
 * Frontend Logs Route
 * Receives logs from frontend applications
 */

// POST /api/logs - Receive frontend logs
router.post('/logs', authenticate, async (req, res) => {
  try {
    const { logs } = req.body;
    
    if (!logs || !Array.isArray(logs)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid logs format. Expected array of log entries.'
      });
    }

    // Process each log entry
    logs.forEach(log => {
      const logLevel = log.level || 'info';
      const message = `[FRONTEND] ${log.message}`;
      
      const metadata = {
        sessionId: log.sessionId,
        user: log.user,
        page: log.page,
        browser: log.browser,
        timestamp: log.timestamp,
        ...log
      };

      // Log based on level
      switch (logLevel) {
        case 'error':
          logger.error(message, metadata);
          break;
        case 'warning':
          logger.warn(message, metadata);
          break;
        case 'action':
          logger.info(message, { ...metadata, type: 'user-action' });
          break;
        default:
          logger.info(message, metadata);
      }
    });

    res.json({
      success: true,
      message: `Received ${logs.length} log entries`,
      count: logs.length
    });

  } catch (error) {
    logger.error('Failed to process frontend logs', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to process logs'
    });
  }
});

// GET /api/logs - Retrieve recent logs (admin only)
router.get('/logs', authenticate, async (req, res) => {
  try {
    const { limit = 100, level, startDate, endDate } = req.query;
    
    // This is a placeholder - in production, you'd read from log files or database
    res.json({
      success: true,
      message: 'Log retrieval endpoint - To be implemented',
      info: 'Check logs/ directory for log files'
    });

  } catch (error) {
    logger.error('Failed to retrieve logs', { error: error.message });
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve logs'
    });
  }
});

module.exports = router;
