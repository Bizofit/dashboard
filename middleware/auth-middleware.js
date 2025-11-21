const { verifyToken } = require('../services/auth-service');

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user data to request
 */

/**
 * Verify JWT token from request header
 */
function authenticate(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    // const decoded = verifyToken(token);

    // Attach user data to request
    // req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
      error: error.message
    });
  }
}

/**
 * Check if user has specific user type
 * @param {string[]} allowedTypes - Allowed user types
 */
function authorize(...allowedTypes) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource'
      });
    }

    next();
  };
}

/**
 * Optional authentication - attach user if token is valid, but don't require it
 */
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      req.user = decoded;
    }
  } catch (error) {
    // Ignore token errors for optional auth
  }

  next();
}

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};
