import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { unifiedDB } from '../db.js';
import { userRoles } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-this';

// ============================================================================
// GOOGLE OAUTH - INITIATE
// ============================================================================
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// ============================================================================
// GOOGLE OAUTH - CALLBACK
// ============================================================================
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user as any;

      if (!user) {
        return res.redirect('/login?error=auth_failed');
      }

      // Get user roles
      const roles = await unifiedDB
        .select()
        .from(userRoles)
        .where(eq(userRoles.userId, user.id));

      // Generate JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          googleId: user.googleId,
          roles: roles,
          authProvider: user.authProvider,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Redirect to frontend with token
      const isProduction = process.env.NODE_ENV === 'production';
      const frontendUrl = isProduction 
        ? (process.env.FRONTEND_PRODUCTION_URL || 'https://dashboard.bizoforce.com')
        : 'http://localhost:3006';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('❌ Google callback error:', error);
      res.redirect('/login?error=callback_failed');
    }
  }
);

// ============================================================================
// LOGOUT
// ============================================================================
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
});

export default router;
