const logger = require('../config/logger');

/**
 * Request logging middleware
 * Logs every incoming request with method, URL, IP, and user info
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request
  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    userId: req.user?.userId || 'anonymous',
    userEmail: req.user?.email || 'N/A'
  });

  // Capture response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - startTime;
    
    logger.info('Response sent', {
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.userId || 'anonymous'
    });
    
    originalSend.call(this, data);
  };

  next();
};

/**
 * Action logging middleware
 * Logs specific user actions (create, update, delete operations)
 */
const actionLogger = (action) => {
  return (req, res, next) => {
    logger.info(`Action: ${action}`, {
      userId: req.user?.userId,
      userEmail: req.user?.email,
      userType: req.user?.userType,
      action: action,
      ip: req.ip || req.connection.remoteAddress,
      data: {
        body: req.body,
        params: req.params,
        query: req.query
      }
    });
    next();
  };
};

/**
 * Error logging middleware
 * Logs all errors with stack trace
 */
const errorLogger = (err, req, res, next) => {
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || req.connection.remoteAddress,
    userId: req.user?.userId || 'anonymous',
    userAgent: req.get('user-agent')
  });

  next(err);
};

/**
 * Database query logger
 */
const dbLogger = (operation, table, query, params = []) => {
  logger.debug('Database operation', {
    operation,
    table,
    query: query.substring(0, 200), // Truncate long queries
    params: params.length > 0 ? params : 'none'
  });
};

/**
 * Authentication event logger
 */
const authLogger = (event, userId, email, success, reason = '') => {
  logger.info('Authentication event', {
    event,
    userId,
    email,
    success,
    reason,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  requestLogger,
  actionLogger,
  errorLogger,
  dbLogger,
  authLogger
};
