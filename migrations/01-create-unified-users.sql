-- ============================================
-- Migration: 01 - Create Unified Users Table
-- ============================================
-- Creates the master users table with support for:
-- - Traditional email/password auth
-- - Google OAuth integration
-- - Multi-platform user ID references
-- ============================================

CREATE TABLE IF NOT EXISTS unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Basic Authentication
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),  -- NULL for OAuth-only users
  
  -- Google OAuth Fields
  google_id VARCHAR(255) UNIQUE,
  google_profile_picture VARCHAR(500),
  auth_provider ENUM('local', 'google', 'hybrid') DEFAULT 'local',
  
  -- User Profile
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_picture VARCHAR(500),
  
  -- Legacy Platform IDs (for data aggregation)
  bizoforce_user_id INT,      -- References wp_users.ID in Bizoforce
  giglancer_user_id INT,       -- References users.id in Giglancer
  screenly_user_id INT,        -- References users.id in Screenly
  work_user_id INT,            -- References users.id in Work.Bizoforce
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE,
  is_email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL,
  
  -- Indexes for performance
  INDEX idx_email (email),
  INDEX idx_google_id (google_id),
  INDEX idx_auth_provider (auth_provider),
  INDEX idx_bizoforce_user_id (bizoforce_user_id),
  INDEX idx_giglancer_user_id (giglancer_user_id),
  INDEX idx_screenly_user_id (screenly_user_id),
  INDEX idx_work_user_id (work_user_id),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
