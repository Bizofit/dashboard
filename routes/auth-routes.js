const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const passport = require('../config/passport');
const {
  register,
  login,
  loginWithGoogle,
  getUserById
} = require('../services/auth-service');
const { authenticate } = require('../middleware/auth-middleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('userType').isIn(['company', 'individual'])
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, userType, phone } = req.body;

    // Register user
    const user = await register({
      email,
      password,
      firstName,
      lastName,
      userType,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login with email and password
 * @access  Public
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Login user
    const result = await login(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

/**
 * @route   POST /api/auth/google
 * @desc    Login with Google OAuth
 * @access  Public
 */
router.post('/google', async (req, res) => {
  try {
    const { googleProfile } = req.body;

    if (!googleProfile || !googleProfile.id || !googleProfile.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google profile data'
      });
    }

    // Login with Google
    const result = await loginWithGoogle(googleProfile);

    res.json({
      success: true,
      message: 'Google login successful',
      data: result
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Google login failed'
    });
  }
});

/**
 * @route   GET /api/auth/google
 * @desc    Initiate Google OAuth flow
 * @access  Public
 */
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
  }),
  (req, res) => {
    try {
      // req.user contains the result from loginWithGoogle
      const { user, token } = req.user;

      // Redirect to frontend with token
      const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=callback_failed`);
    }
  }
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to get user profile'
    });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
router.post('/logout', authenticate, (req, res) => {
  // In a stateless JWT system, logout is handled client-side by removing the token
  // If you need server-side logout, implement token blacklisting
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', authenticate, (req, res) => {
  try {
    const { generateToken } = require('../services/auth-service');

    // Generate new token with existing user data
    const token = generateToken({
      userId: req.user.userId,
      email: req.user.email,
      userType: req.user.userType,
      platforms: req.user.platforms
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: { token }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Token refresh failed'
    });
  }
});

module.exports = router;
