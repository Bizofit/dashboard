/**
 * Authentication Routes
 * Handles traditional email/password authentication
 */

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const { authenticate, validateBody } = require('../middleware/auth-middleware');

/**
 * POST /api/auth/register
 * Register new user with email/password
 */
router.post('/register', validateBody(['email', 'password']), async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    const result = await authService.register({
      email,
      password,
      firstName,
      lastName,
      phone
    });
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
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
 * POST /api/auth/login
 * Login with email/password
 */
router.post('/login', validateBody(['email', 'password']), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login(email, password);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/auth/profile
 * Get current user profile (requires authentication)
 */
router.get('/profile', authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      data: { user: req.user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }
    
    const result = await authService.refreshToken(token);
    
    res.json({
      success: true,
      message: 'Token refreshed',
      data: result
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password (requires authentication)
 */
router.post('/change-password', authenticate, validateBody(['currentPassword', 'newPassword']), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const result = await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );
    
    res.json({
      success: true,
      message: result.message
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // But we can log the event or invalidate sessions if needed
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
