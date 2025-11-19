-- ============================================
-- BIZOFORCE UNIFIED DASHBOARD DATABASE SCHEMA
-- ============================================
-- Database: bizoforce_newdashboard
-- Purpose: Master unified database for dashboard
-- Server: 72.167.148.100
-- Created: 2025

-- ============================================
-- DROP EXISTING TABLES (CAREFUL!)
-- ============================================
-- Uncomment to reset database
-- DROP TABLE IF EXISTS platform_sync_log;
-- DROP TABLE IF EXISTS user_sessions;
-- DROP TABLE IF EXISTS company_users;
-- DROP TABLE IF EXISTS unified_companies;
-- DROP TABLE IF EXISTS unified_users;

-- ============================================
-- TABLE: unified_users
-- ============================================
-- Master user table with references to all platforms
CREATE TABLE IF NOT EXISTS unified_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Basic Info
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) DEFAULT NULL, -- NULL for Google-only users
  google_id VARCHAR(255) DEFAULT NULL UNIQUE,
  
  -- Profile
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  profile_photo VARCHAR(500) DEFAULT NULL,
  
  -- User Type
  user_type ENUM('company', 'individual') NOT NULL DEFAULT 'individual',
  
  -- Platform IDs (Foreign Keys to other platforms)
  bizoforce_user_id INT DEFAULT NULL, -- wp_users.ID in Bizoforce
  giglancer_user_id INT DEFAULT NULL, -- users.id in Giglancer
  screenly_user_id INT DEFAULT NULL, -- users.id in Screenly
  work_user_id INT DEFAULT NULL, -- users.id in Work.Bizoforce
  
  -- Status
  is_active BOOLEAN DEFAULT 1,
  email_verified BOOLEAN DEFAULT 0,
  onboarding_complete BOOLEAN DEFAULT 0,
  
  -- Migration Tracking
  migrated_from ENUM('bizoforce', 'giglancer', 'screenly', 'work', 'new') DEFAULT 'new',
  migration_date DATETIME DEFAULT NULL,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at DATETIME DEFAULT NULL,
  
  INDEX idx_email (email),
  INDEX idx_google_id (google_id),
  INDEX idx_user_type (user_type),
  INDEX idx_bizoforce_user (bizoforce_user_id),
  INDEX idx_giglancer_user (giglancer_user_id),
  INDEX idx_screenly_user (screenly_user_id),
  INDEX idx_work_user (work_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: unified_companies
-- ============================================
-- Master company table
CREATE TABLE IF NOT EXISTS unified_companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Company Info
  company_name VARCHAR(255) NOT NULL,
  company_slug VARCHAR(255) NOT NULL UNIQUE,
  company_email VARCHAR(255) DEFAULT NULL,
  company_phone VARCHAR(20) DEFAULT NULL,
  company_logo VARCHAR(500) DEFAULT NULL,
  company_website VARCHAR(255) DEFAULT NULL,
  
  -- Address
  address_line1 VARCHAR(255) DEFAULT NULL,
  address_line2 VARCHAR(255) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  state VARCHAR(100) DEFAULT NULL,
  country VARCHAR(100) DEFAULT NULL,
  postal_code VARCHAR(20) DEFAULT NULL,
  
  -- Subscription
  subscription_plan ENUM('free', 'basic', 'professional', 'enterprise') DEFAULT 'free',
  subscription_status ENUM('active', 'inactive', 'trial', 'suspended') DEFAULT 'trial',
  subscription_start_date DATE DEFAULT NULL,
  subscription_end_date DATE DEFAULT NULL,
  
  -- Platform IDs
  bizoforce_company_id INT DEFAULT NULL, -- Bizoforce marketplace vendor ID
  work_company_id INT DEFAULT NULL, -- Work.Bizoforce company ID
  
  -- Status
  is_active BOOLEAN DEFAULT 1,
  is_verified BOOLEAN DEFAULT 0,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_company_slug (company_slug),
  INDEX idx_company_email (company_email),
  INDEX idx_subscription_status (subscription_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: company_users
-- ============================================
-- Association table: Links users to companies with roles
CREATE TABLE IF NOT EXISTS company_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  
  -- Role in Company
  role ENUM(
    'company_admin',
    'hr',
    'team_lead',
    'team_member',
    'finance',
    'vendor'
  ) NOT NULL DEFAULT 'team_member',
  
  -- Employment Details
  job_title VARCHAR(100) DEFAULT NULL,
  department VARCHAR(100) DEFAULT NULL,
  hourly_rate DECIMAL(10,2) DEFAULT NULL,
  employment_type ENUM('full-time', 'part-time', 'contract', 'freelance') DEFAULT 'full-time',
  
  -- Status
  is_active BOOLEAN DEFAULT 1,
  invited_by INT DEFAULT NULL, -- user_id of inviter
  invitation_accepted BOOLEAN DEFAULT 0,
  
  -- Timestamps
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  left_at DATETIME DEFAULT NULL,
  
  FOREIGN KEY (company_id) REFERENCES unified_companies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  FOREIGN KEY (invited_by) REFERENCES unified_users(id) ON DELETE SET NULL,
  
  UNIQUE KEY unique_company_user (company_id, user_id),
  INDEX idx_company (company_id),
  INDEX idx_user (user_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: user_sessions
-- ============================================
-- Track user login sessions (optional)
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL, -- Hashed JWT for revocation
  
  -- Session Info
  ip_address VARCHAR(45) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  device_type ENUM('desktop', 'mobile', 'tablet', 'other') DEFAULT 'other',
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  last_activity_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  
  INDEX idx_user (user_id),
  INDEX idx_token_hash (token_hash),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: platform_sync_log
-- ============================================
-- Track data synchronization between platforms
CREATE TABLE IF NOT EXISTS platform_sync_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Sync Details
  platform ENUM('bizoforce', 'giglancer', 'screenly', 'work') NOT NULL,
  sync_type ENUM('user', 'company', 'job', 'project', 'product', 'order') NOT NULL,
  sync_action ENUM('create', 'update', 'delete') NOT NULL,
  
  -- Record IDs
  unified_record_id INT DEFAULT NULL,
  platform_record_id INT DEFAULT NULL,
  
  -- Status
  status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
  error_message TEXT DEFAULT NULL,
  
  -- Timestamps
  synced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_platform (platform),
  INDEX idx_sync_type (sync_type),
  INDEX idx_status (status),
  INDEX idx_unified_record (unified_record_id),
  INDEX idx_platform_record (platform_record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Sample Company Admin User
-- INSERT INTO unified_users (
--   email, first_name, last_name, user_type, 
--   is_active, email_verified, onboarding_complete
-- ) VALUES (
--   'admin@bizoforce.com', 'Admin', 'User', 'company', 
--   1, 1, 1
-- );

-- Sample Company
-- INSERT INTO unified_companies (
--   company_name, company_slug, company_email, 
--   subscription_plan, subscription_status, is_active
-- ) VALUES (
--   'Bizoforce Demo Company', 'bizoforce-demo', 'demo@bizoforce.com',
--   'professional', 'active', 1
-- );

-- Link Admin to Company
-- INSERT INTO company_users (
--   company_id, user_id, role, is_active, invitation_accepted
-- ) VALUES (
--   1, 1, 'company_admin', 1, 1
-- );

-- ============================================
-- UTILITY QUERIES
-- ============================================

-- Get user with company details
-- SELECT 
--   u.id, u.email, u.first_name, u.last_name, u.user_type,
--   c.company_name, cu.role, cu.job_title
-- FROM unified_users u
-- LEFT JOIN company_users cu ON u.id = cu.user_id
-- LEFT JOIN unified_companies c ON cu.company_id = c.id
-- WHERE u.email = 'admin@bizoforce.com';

-- Get all users in a company
-- SELECT 
--   u.id, u.email, u.first_name, u.last_name,
--   cu.role, cu.job_title, cu.is_active
-- FROM unified_users u
-- INNER JOIN company_users cu ON u.id = cu.user_id
-- WHERE cu.company_id = 1
-- ORDER BY cu.role, u.first_name;

-- ============================================
-- END OF SCHEMA
-- ============================================
