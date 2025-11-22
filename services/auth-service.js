/**
 * Authentication Service
 * Handles user registration, login, JWT generation/verification
 * Supports both traditional and Google OAuth authentication
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { unifiedDB } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 10;

class AuthService {
  
  /**
   * Register new user with email/password
   */
  async register({ email, password, firstName, lastName, phone }) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Check if user already exists
      const [existingUsers] = await unifiedDB.query(
        'SELECT id, email FROM unified_users WHERE email = ?',
        [email]
      );
      
      if (existingUsers.length > 0) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      
      // Insert new user
      const [result] = await unifiedDB.query(
        `INSERT INTO unified_users 
        (email, password_hash, first_name, last_name, phone, auth_provider, is_active) 
        VALUES (?, ?, ?, ?, ?, 'local', TRUE)`,
        [email, passwordHash, firstName, lastName, phone]
      );
      
      const userId = result.insertId;
      
      // Create default role (job_seeker for individual users)
      await unifiedDB.query(
        `INSERT INTO user_roles 
        (user_id, role_type, platform, is_primary, is_active) 
        VALUES (?, 'job_seeker', 'unified', TRUE, TRUE)`,
        [userId]
      );
      
      // Generate JWT
      const token = this.generateToken({ userId, email, authProvider: 'local' });
      
      // Get user with roles
      const user = await this.getUserById(userId);
      
      return {
        token,
        user
      };
      
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Login with email/password
   */
  async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Find user
      const [users] = await unifiedDB.query(
        `SELECT id, email, password_hash, auth_provider, is_active 
        FROM unified_users 
        WHERE email = ?`,
        [email]
      );
      
      if (users.length === 0) {
        throw new Error('Invalid email or password');
      }
      
      const user = users[0];
      
      // Check if account is active
      if (!user.is_active) {
        throw new Error('Account is deactivated');
      }
      
      // Check if user has password (not OAuth-only)
      if (!user.password_hash) {
        throw new Error('This account uses Google login. Please sign in with Google.');
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      
      // Update last login
      await unifiedDB.query(
        'UPDATE unified_users SET last_login_at = NOW() WHERE id = ?',
        [user.id]
      );
      
      // Generate JWT
      const token = this.generateToken({ 
        userId: user.id, 
        email: user.email,
        authProvider: user.auth_provider
      });
      
      // Get full user data with roles
      const userData = await this.getUserById(user.id);
      
      return {
        token,
        user: userData
      };
      
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Generate JWT token
   */
  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
  
  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
  
  /**
   * Get user by ID with roles
   */
  async getUserById(userId) {
    const [users] = await unifiedDB.query(
      `SELECT 
        id, email, first_name, last_name, phone,
        google_id, google_profile_picture, auth_provider,
        bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id,
        is_active, is_email_verified, last_login_at, created_at
      FROM unified_users 
      WHERE id = ?`,
      [userId]
    );
    
    if (users.length === 0) {
      throw new Error('User not found');
    }
    
    const user = users[0];
    
    // Get user roles
    const [roles] = await unifiedDB.query(
      `SELECT 
        id, role_type, platform, company_id, is_primary, is_active, permissions
      FROM user_roles 
      WHERE user_id = ? AND is_active = TRUE
      ORDER BY is_primary DESC, created_at ASC`,
      [userId]
    );
    
    // Find primary role
    const primaryRole = roles.find(r => r.is_primary) || roles[0] || null;
    
    return {
      ...user,
      roles: roles.map(r => ({
        id: r.id,
        type: r.role_type,
        platform: r.platform,
        companyId: r.company_id,
        isPrimary: r.is_primary,
        permissions: r.permissions ? JSON.parse(r.permissions) : null
      })),
      primaryRole: primaryRole ? primaryRole.role_type : null
    };
  }
  
  /**
   * Refresh token
   */
  async refreshToken(oldToken) {
    try {
      const decoded = this.verifyToken(oldToken);
      const user = await this.getUserById(decoded.userId);
      
      if (!user.is_active) {
        throw new Error('Account is deactivated');
      }
      
      const newToken = this.generateToken({
        userId: user.id,
        email: user.email,
        authProvider: user.auth_provider
      });
      
      return { token: newToken, user };
      
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get user
      const [users] = await unifiedDB.query(
        'SELECT password_hash FROM unified_users WHERE id = ?',
        [userId]
      );
      
      if (users.length === 0) {
        throw new Error('User not found');
      }
      
      const user = users[0];
      
      if (!user.password_hash) {
        throw new Error('Cannot change password for OAuth-only accounts');
      }
      
      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password_hash);
      
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }
      
      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      
      // Update password
      await unifiedDB.query(
        'UPDATE unified_users SET password_hash = ?, updated_at = NOW() WHERE id = ?',
        [newPasswordHash, userId]
      );
      
      return { message: 'Password changed successfully' };
      
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
