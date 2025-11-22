/**
 * Authentication Middleware
 * Handles JWT authentication and role-based authorization
 */

const authService = require('../services/auth-service');

/**
 * Authenticate middleware - Verifies JWT token
 * Attaches user data to req.user
 */
async function authenticate(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify token
    const decoded = authService.verifyToken(token);
    
    // Get user data
    const user = await authService.getUserById(decoded.userId);
    
    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }
    
    // Attach user to request
    req.user = user;
    req.token = token;
    
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
}

/**
 * Optional authentication - Doesn't fail if no token
 * Useful for public endpoints that are personalized when authenticated
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = authService.verifyToken(token);
      const user = await authService.getUserById(decoded.userId);
      
      if (user && user.is_active) {
        req.user = user;
        req.token = token;
      }
    }
    
    next();
    
  } catch (error) {
    // Silently continue without user
    next();
  }
}

/**
 * Authorize middleware - Checks if user has required role(s)
 * Usage: authorize('company_admin', 'hr')
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    // Check if user has any of the allowed roles
    const userRoles = req.user.roles.map(r => r.type);
    const hasRole = allowedRoles.some(role => userRoles.includes(role));
    
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        required: allowedRoles,
        current: userRoles
      });
    }
    
    next();
  };
}

/**
 * Check if user belongs to a specific company
 */
function authorizeCompany(companyIdParam = 'companyId') {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    const companyId = parseInt(req.params[companyIdParam] || req.body.companyId);
    
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Company ID is required'
      });
    }
    
    // Check if user has a role in this company
    const hasCompanyRole = req.user.roles.some(r => r.companyId === companyId);
    
    if (!hasCompanyRole) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this company'
      });
    }
    
    next();
  };
}

/**
 * Validate request body fields
 */
function validateBody(requiredFields) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        fields: missingFields
      });
    }
    
    next();
  };
}

module.exports = {
  authenticate,
  optionalAuth,
  authorize,
  authorizeCompany,
  validateBody
};
