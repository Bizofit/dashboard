/**
 * Google OAuth Routes
 * Handles Google OAuth 2.0 authentication flow
 */

const express = require('express');
const router = express.Router();
const googleOAuthService = require('../services/google-oauth-service');

/**
 * GET /api/google-auth/url
 * Get Google OAuth authorization URL
 */
router.get('/url', (req, res) => {
  try {
    const authUrl = googleOAuthService.getAuthUrl();
    
    res.json({
      success: true,
      data: { url: authUrl }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/google-auth/callback
 * Handle OAuth callback from Google
 * Frontend will redirect here with authorization code
 */
router.get('/callback', async (req, res) => {
  try {
    const { code, error } = req.query;
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'OAuth authorization failed',
        error
      });
    }
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }
    
    const result = await googleOAuthService.handleGoogleAuth(code);
    
    // In production, redirect to frontend with token
    // For now, return JSON response
    res.json({
      success: true,
      message: 'Google authentication successful',
      data: result
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/google-auth/callback
 * Alternative: Handle OAuth callback via POST (for SPA)
 */
router.post('/callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }
    
    const result = await googleOAuthService.handleGoogleAuth(code);
    
    res.json({
      success: true,
      message: 'Google authentication successful',
      data: result
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
