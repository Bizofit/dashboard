import { Router } from 'express';
import type { Request, Response } from 'express';
import { authenticate, authorize } from '../auth/middleware.js';
import { unifiedDB } from '../db.js';
import { unifiedUsers, userRoles } from '../../shared/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

// ============================================================================
// GET ALL USERS (Admin only)
// ============================================================================
router.get('/', authenticate, authorize('company_admin'), async (_req: Request, res: Response) => {
  try {
    const users = await unifiedDB.select().from(unifiedUsers);

    res.json({
      success: true,
      data: users.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        authProvider: u.authProvider,
        createdAt: u.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('❌ Get users error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================================================================
// GET USER BY ID
// ============================================================================
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

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
        ...user,
        passwordHash: undefined, // Don't send password hash
        roles,
      },
    });
  } catch (error: any) {
    console.error('❌ Get user error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
