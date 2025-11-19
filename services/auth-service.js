const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { unifiedDB } = require('../config/database');

/**
 * Authentication Service
 * Handles user registration, login, JWT token generation
 */

const SALT_ROUNDS = 10;

/**
 * Register a new user in unified database
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Created user object
 */
async function register(userData) {
  const { email, password, firstName, lastName, userType, phone, googleId } = userData;

  try {
    // Check if user already exists
    const [existing] = await unifiedDB.query(
      'SELECT id FROM unified_users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Hash password (if provided - not needed for Google OAuth)
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Insert user into unified database
    const [result] = await unifiedDB.query(
      `INSERT INTO unified_users 
       (email, password_hash, google_id, first_name, last_name, user_type, phone, 
        is_active, email_verified, onboarding_complete, migrated_from, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 0, 'new', NOW(), NOW())`,
      [email, passwordHash, googleId || null, firstName, lastName, userType, phone || null, googleId ? 1 : 0]
    );

    const userId = result.insertId;

    // Return user data (without password hash)
    return {
      id: userId,
      email,
      firstName,
      lastName,
      userType,
      phone,
      googleId
    };

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data with JWT token
 */
async function login(email, password) {
  try {
    // Find user by email
    const [users] = await unifiedDB.query(
      `SELECT id, email, password_hash, first_name, last_name, user_type, 
              bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id,
              is_active, email_verified
       FROM unified_users 
       WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = users[0];

    // Check if user is active
    if (!user.is_active) {
      throw new Error('Account is disabled');
    }

    // Verify password
    if (!user.password_hash) {
      throw new Error('Please use Google login for this account');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await unifiedDB.query(
      'UPDATE unified_users SET last_login_at = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.user_type,
      platforms: {
        bizoforce: user.bizoforce_user_id,
        giglancer: user.giglancer_user_id,
        screenly: user.screenly_user_id,
        work: user.work_user_id
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type
      },
      token
    };

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Login user with Google OAuth
 * @param {Object} googleProfile - Google user profile
 * @returns {Promise<Object>} - User data with JWT token
 */
async function loginWithGoogle(googleProfile) {
  const { id: googleId, email, given_name, family_name } = googleProfile;

  try {
    // Check if user exists
    const [users] = await unifiedDB.query(
      `SELECT id, email, first_name, last_name, user_type,
              bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id
       FROM unified_users 
       WHERE google_id = ? OR email = ?`,
      [googleId, email]
    );

    let user;

    if (users.length === 0) {
      // New user - register
      user = await register({
        email,
        firstName: given_name,
        lastName: family_name,
        userType: 'individual', // Default for new Google users
        googleId
      });
    } else {
      user = users[0];

      // Update google_id if not set
      if (!user.google_id) {
        await unifiedDB.query(
          'UPDATE unified_users SET google_id = ?, email_verified = 1 WHERE id = ?',
          [googleId, user.id]
        );
      }

      // Update last login
      await unifiedDB.query(
        'UPDATE unified_users SET last_login_at = NOW() WHERE id = ?',
        [user.id]
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email || email,
      userType: user.user_type || user.userType,
      platforms: {
        bizoforce: user.bizoforce_user_id,
        giglancer: user.giglancer_user_id,
        screenly: user.screenly_user_id,
        work: user.work_user_id
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email || email,
        firstName: user.first_name || user.firstName,
        lastName: user.last_name || user.lastName,
        userType: user.user_type || user.userType
      },
      token
    };

  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}

/**
 * Generate JWT token
 * @param {Object} payload - Token payload
 * @returns {string} - JWT token
 */
function generateToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object} - Decoded token payload
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Get user by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} - User data
 */
async function getUserById(userId) {
  try {
    const [users] = await unifiedDB.query(
      `SELECT id, email, first_name, last_name, user_type, phone, profile_photo,
              is_active, email_verified, onboarding_complete, created_at
       FROM unified_users 
       WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      throw new Error('User not found');
    }

    return users[0];
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
}

module.exports = {
  register,
  login,
  loginWithGoogle,
  generateToken,
  verifyToken,
  getUserById
};
