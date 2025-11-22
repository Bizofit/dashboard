/**
 * Google OAuth Service
 * Handles Google OAuth 2.0 authentication flow
 * Includes user migration from legacy platforms
 */

const axios = require('axios');
const { unifiedDB, bizoforceDB, giglancerDB, screenlyDB, workDB } = require('../config/database');
const authService = require('./auth-service');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

class GoogleOAuthService {
  
  /**
   * Get Google OAuth authorization URL
   */
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];
    
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  
  /**
   * Exchange authorization code for tokens
   */
  async getTokensFromCode(code) {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to exchange authorization code: ' + error.message);
    }
  }
  
  /**
   * Get user profile from Google
   */
  async getUserProfile(accessToken) {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile: ' + error.message);
    }
  }
  
  /**
   * Handle Google OAuth login/registration
   */
  async handleGoogleAuth(code) {
    try {
      // 1. Exchange code for tokens
      const tokens = await this.getTokensFromCode(code);
      
      // 2. Get user profile from Google
      const googleProfile = await this.getUserProfile(tokens.access_token);
      
      // 3. Check if user exists in unified DB
      let user = await this.findUserByGoogleId(googleProfile.id);
      
      if (!user) {
        // Check by email
        user = await this.findUserByEmail(googleProfile.email);
        
        if (user) {
          // Link Google account to existing user
          await this.linkGoogleAccount(user.id, googleProfile, tokens);
        } else {
          // Search legacy databases and migrate or create new user
          user = await this.migrateOrCreateUser(googleProfile, tokens);
        }
      } else {
        // Update last login and tokens
        await this.updateUserLogin(user.id, tokens);
      }
      
      // 4. Generate JWT
      const jwtToken = authService.generateToken({
        userId: user.id,
        email: user.email,
        authProvider: user.auth_provider
      });
      
      // 5. Get full user data with roles
      const userData = await authService.getUserById(user.id);
      
      return {
        token: jwtToken,
        user: userData
      };
      
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Find user by Google ID
   */
  async findUserByGoogleId(googleId) {
    const [users] = await unifiedDB.query(
      'SELECT * FROM unified_users WHERE google_id = ?',
      [googleId]
    );
    return users[0] || null;
  }
  
  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    const [users] = await unifiedDB.query(
      'SELECT * FROM unified_users WHERE email = ?',
      [email]
    );
    return users[0] || null;
  }
  
  /**
   * Link Google account to existing user
   */
  async linkGoogleAccount(userId, googleProfile, tokens) {
    await unifiedDB.query(
      `UPDATE unified_users 
      SET google_id = ?, 
          google_profile_picture = ?,
          auth_provider = IF(password_hash IS NULL, 'google', 'hybrid'),
          last_login_at = NOW(),
          updated_at = NOW()
      WHERE id = ?`,
      [googleProfile.id, googleProfile.picture, userId]
    );
    
    // Store OAuth tokens
    await this.storeOAuthTokens(userId, tokens);
  }
  
  /**
   * Migrate user from legacy platforms or create new user
   */
  async migrateOrCreateUser(googleProfile, tokens) {
    const email = googleProfile.email;
    
    // Search all legacy platforms
    const legacyUsers = await this.searchLegacyDatabases(email);
    
    let userId;
    
    if (legacyUsers.found) {
      // Migrate user from legacy platform
      const [result] = await unifiedDB.query(
        `INSERT INTO unified_users 
        (email, google_id, google_profile_picture, auth_provider, 
         first_name, last_name, 
         bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id,
         is_active, last_login_at) 
        VALUES (?, ?, ?, 'google', ?, ?, ?, ?, ?, ?, TRUE, NOW())`,
        [
          email,
          googleProfile.id,
          googleProfile.picture,
          googleProfile.given_name || '',
          googleProfile.family_name || '',
          legacyUsers.bizoforce?.id || null,
          legacyUsers.giglancer?.id || null,
          legacyUsers.screenly?.id || null,
          legacyUsers.work?.id || null
        ]
      );
      userId = result.insertId;
      
      // Detect and create roles from legacy platforms
      await this.detectAndCreateRoles(userId, legacyUsers);
      
    } else {
      // Create brand new user
      const [result] = await unifiedDB.query(
        `INSERT INTO unified_users 
        (email, google_id, google_profile_picture, auth_provider, 
         first_name, last_name, is_active, last_login_at) 
        VALUES (?, ?, ?, 'google', ?, ?, TRUE, NOW())`,
        [
          email,
          googleProfile.id,
          googleProfile.picture,
          googleProfile.given_name || '',
          googleProfile.family_name || ''
        ]
      );
      userId = result.insertId;
      
      // Create default role
      await unifiedDB.query(
        `INSERT INTO user_roles 
        (user_id, role_type, platform, is_primary, is_active) 
        VALUES (?, 'job_seeker', 'unified', TRUE, TRUE)`,
        [userId]
      );
    }
    
    // Store OAuth tokens
    await this.storeOAuthTokens(userId, tokens);
    
    // Return user
    return { id: userId, email, auth_provider: 'google' };
  }
  
  /**
   * Search legacy databases for user by email
   */
  async searchLegacyDatabases(email) {
    const result = { found: false };
    
    try {
      // Search Bizoforce (WordPress)
      const [bizoforceUsers] = await bizoforceDB.query(
        'SELECT ID as id, user_login, user_email, user_registered FROM wp_users WHERE user_email = ?',
        [email]
      );
      if (bizoforceUsers.length > 0) {
        result.bizoforce = bizoforceUsers[0];
        result.found = true;
      }
    } catch (error) {
      console.error('Bizoforce search error:', error.message);
    }
    
    try {
      // Search Giglancer
      const [giglancerUsers] = await giglancerDB.query(
        'SELECT id, email, account_type, created_at FROM users WHERE email = ?',
        [email]
      );
      if (giglancerUsers.length > 0) {
        result.giglancer = giglancerUsers[0];
        result.found = true;
      }
    } catch (error) {
      console.error('Giglancer search error:', error.message);
    }
    
    try {
      // Search Screenly (PostgreSQL)
      const screenlyResult = await screenlyDB.query(
        'SELECT id, email, role, created_at FROM users WHERE email = $1',
        [email]
      );
      if (screenlyResult.rows.length > 0) {
        result.screenly = screenlyResult.rows[0];
        result.found = true;
      }
    } catch (error) {
      console.error('Screenly search error:', error.message);
    }
    
    try {
      // Search Work.Bizoforce
      const [workUsers] = await workDB.query(
        'SELECT id, email, role, created_at FROM users WHERE email = ?',
        [email]
      );
      if (workUsers.length > 0) {
        result.work = workUsers[0];
        result.found = true;
      }
    } catch (error) {
      console.error('Work.Bizoforce search error:', error.message);
    }
    
    return result;
  }
  
  /**
   * Detect roles from legacy platforms and create in unified DB
   */
  async detectAndCreateRoles(userId, legacyUsers) {
    const roles = [];
    
    // Bizoforce - Vendor role
    if (legacyUsers.bizoforce) {
      try {
        const [vendorCheck] = await bizoforceDB.query(
          `SELECT COUNT(*) as count FROM wp_posts 
          WHERE post_type = 'product' AND post_author = ? AND post_status = 'publish'`,
          [legacyUsers.bizoforce.id]
        );
        if (vendorCheck[0].count > 0) {
          roles.push({ type: 'vendor', platform: 'bizoforce' });
        }
      } catch (error) {
        console.error('Bizoforce role detection error:', error.message);
      }
    }
    
    // Giglancer - Freelancer or Company role
    if (legacyUsers.giglancer) {
      const accountType = legacyUsers.giglancer.account_type;
      if (accountType === 'freelancer') {
        roles.push({ type: 'freelancer', platform: 'giglancer' });
      } else if (accountType === 'employer') {
        roles.push({ type: 'company_admin', platform: 'giglancer' });
      }
    }
    
    // Screenly - Use role from database
    if (legacyUsers.screenly) {
      const role = legacyUsers.screenly.role;
      if (role) {
        roles.push({ type: role, platform: 'screenly' });
      }
    }
    
    // Work.Bizoforce - Use role from database
    if (legacyUsers.work) {
      const role = legacyUsers.work.role;
      if (role) {
        roles.push({ type: role, platform: 'work' });
      }
    }
    
    // Insert roles (first one is primary)
    for (let i = 0; i < roles.length; i++) {
      await unifiedDB.query(
        `INSERT INTO user_roles 
        (user_id, role_type, platform, is_primary, is_active) 
        VALUES (?, ?, ?, ?, TRUE)`,
        [userId, roles[i].type, roles[i].platform, i === 0]
      );
    }
    
    // If no roles found, create default
    if (roles.length === 0) {
      await unifiedDB.query(
        `INSERT INTO user_roles 
        (user_id, role_type, platform, is_primary, is_active) 
        VALUES (?, 'job_seeker', 'unified', TRUE, TRUE)`,
        [userId]
      );
    }
  }
  
  /**
   * Store OAuth tokens
   */
  async storeOAuthTokens(userId, tokens) {
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
    
    await unifiedDB.query(
      `INSERT INTO oauth_tokens 
      (user_id, provider, access_token, refresh_token, token_type, token_expires_at, scopes, provider_user_id) 
      VALUES (?, 'google', ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        access_token = VALUES(access_token),
        refresh_token = COALESCE(VALUES(refresh_token), refresh_token),
        token_expires_at = VALUES(token_expires_at),
        updated_at = NOW()`,
      [
        userId,
        tokens.access_token,
        tokens.refresh_token || null,
        tokens.token_type || 'Bearer',
        expiresAt,
        tokens.scope || 'email,profile',
        null  // We'll set this when we have the Google profile
      ]
    );
  }
  
  /**
   * Update user last login
   */
  async updateUserLogin(userId, tokens) {
    await unifiedDB.query(
      'UPDATE unified_users SET last_login_at = NOW() WHERE id = ?',
      [userId]
    );
    
    // Update OAuth tokens
    await this.storeOAuthTokens(userId, tokens);
  }
}

module.exports = new GoogleOAuthService();
