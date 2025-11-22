import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { unifiedDB } from '../db.js';
import { unifiedUsers, userRoles } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';
import { authenticate } from '../auth/middleware.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-this';

// ============================================================================
// REGISTER
// ============================================================================
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Check if user exists
    const existingUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    await unifiedDB.insert(unifiedUsers).values({
      email,
      passwordHash,
      firstName,
      lastName,
      authProvider: 'local',
    });

    // Fetch the created user
    const newUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    const newUser = newUsers[0];

    // Create default role
    await unifiedDB.insert(userRoles).values({
      userId: newUser.id,
      roleType: 'job_seeker',
      isPrimary: true,
    });

    // Get user with roles
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, newUser.id));

    // Generate JWT
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        roles: roles,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          roles: roles,
        },
      },
    });
  } catch (error: any) {
    console.error('❌ Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// LOGIN
// ============================================================================
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user
    const users = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = users[0];

    // Check if user has password (not OAuth-only user)
    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Please login with Google',
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login
    await unifiedDB
      .update(unifiedUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(unifiedUsers.id, user.id));

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
        roles: roles,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          googleProfilePicture: user.googleProfilePicture,
          roles: roles,
        },
      },
    });
  } catch (error: any) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// GET PROFILE
// ============================================================================
router.get('/profile', authenticate, async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const users = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.id, userId))
      .limit(1);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const user = users[0];
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        googleProfilePicture: user.googleProfilePicture,
        authProvider: user.authProvider,
        roles: roles,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error: any) {
    console.error('❌ Profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
