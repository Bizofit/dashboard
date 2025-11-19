-- ============================================
-- MIGRATION: Update unified_users table for multi-platform user migration
-- Date: November 18, 2025
-- Purpose: Add fields to support merging users from 4 platforms
-- ============================================

-- Add platform-specific user ID columns for linking
ALTER TABLE unified_users
ADD COLUMN IF NOT EXISTS bizoforce_user_id BIGINT NULL COMMENT 'WordPress user ID from Bizoforce',
ADD COLUMN IF NOT EXISTS giglancer_user_id BIGINT NULL COMMENT 'User ID from Giglancer',
ADD COLUMN IF NOT EXISTS screenly_user_id INT NULL COMMENT 'User ID from Screenly (PostgreSQL)',
ADD COLUMN IF NOT EXISTS work_user_id INT NULL COMMENT 'User ID from Work.Bizoforce';

-- Add migration tracking fields
ALTER TABLE unified_users
ADD COLUMN IF NOT EXISTS needsRoleSelection BOOLEAN DEFAULT FALSE COMMENT 'User needs to select role on next login',
ADD COLUMN IF NOT EXISTS pendingCompanyCreation BOOLEAN DEFAULT FALSE COMMENT 'User needs to create company',
ADD COLUMN IF NOT EXISTS migrationSource VARCHAR(50) NULL COMMENT 'Primary platform this user came from',
ADD COLUMN IF NOT EXISTS migrationDate TIMESTAMP NULL COMMENT 'When user was migrated',
ADD COLUMN IF NOT EXISTS lastLogin TIMESTAMP NULL COMMENT 'Most recent login across all platforms';

-- Add profile completeness tracking
ALTER TABLE unified_users
ADD COLUMN IF NOT EXISTS profileScore INT DEFAULT 0 COMMENT 'Profile completeness (0-100)',
ADD COLUMN IF NOT EXISTS isActive BOOLEAN DEFAULT TRUE COMMENT 'Account active status',
ADD COLUMN IF NOT EXISTS isEmailConfirmed BOOLEAN DEFAULT FALSE COMMENT 'Email verification status';

-- Add activity metrics (aggregated from all platforms)
ALTER TABLE unified_users
ADD COLUMN IF NOT EXISTS totalProjects INT DEFAULT 0 COMMENT 'Total projects posted (employer)',
ADD COLUMN IF NOT EXISTS totalJobApplications INT DEFAULT 0 COMMENT 'Total job applications (job seeker)',
ADD COLUMN IF NOT EXISTS totalBids INT DEFAULT 0 COMMENT 'Total bids placed (freelancer)',
ADD COLUMN IF NOT EXISTS totalTimesheets INT DEFAULT 0 COMMENT 'Total timesheet entries (employee)';

-- Create indexes for faster lookups during migration
CREATE INDEX IF NOT EXISTS idx_bizoforce_user ON unified_users(bizoforce_user_id);
CREATE INDEX IF NOT EXISTS idx_giglancer_user ON unified_users(giglancer_user_id);
CREATE INDEX IF NOT EXISTS idx_screenly_user ON unified_users(screenly_user_id);
CREATE INDEX IF NOT EXISTS idx_work_user ON unified_users(work_user_id);
CREATE INDEX IF NOT EXISTS idx_email_lookup ON unified_users(email);
CREATE INDEX IF NOT EXISTS idx_migration_source ON unified_users(migrationSource);

-- ============================================
-- Migration Log Table (Track all migration operations)
-- ============================================
CREATE TABLE IF NOT EXISTS user_migration_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unified_user_id INT NOT NULL,
  platform VARCHAR(50) NOT NULL COMMENT 'bizoforce, giglancer, screenly, work',
  platform_user_id BIGINT NOT NULL,
  platform_email VARCHAR(255) NOT NULL,
  action VARCHAR(50) NOT NULL COMMENT 'created, merged, skipped, failed',
  role_detected VARCHAR(50) NULL COMMENT 'Role assigned during migration',
  activity_data JSON NULL COMMENT 'Activity metrics from platform',
  conflicts JSON NULL COMMENT 'Data conflicts found during merge',
  notes TEXT NULL,
  migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (unified_user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_platform_lookup (platform, platform_user_id),
  INDEX idx_migration_date (migrated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Audit trail for user migration from legacy platforms';

-- ============================================
-- Email Deduplication Table (Track duplicate emails)
-- ============================================
CREATE TABLE IF NOT EXISTS email_duplicates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  platform_count INT NOT NULL COMMENT 'Number of platforms this email appears on',
  platforms JSON NOT NULL COMMENT 'List of platforms: [{platform, user_id, created_at}]',
  unified_user_id INT NULL COMMENT 'Final merged user ID',
  resolution_status ENUM('pending', 'auto_merged', 'manual_review', 'resolved') DEFAULT 'pending',
  resolution_notes TEXT NULL,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (unified_user_id) REFERENCES unified_users(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_status (resolution_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Track and resolve duplicate emails across platforms';

-- ============================================
-- Migration Statistics Table (Track progress)
-- ============================================
CREATE TABLE IF NOT EXISTS migration_statistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  migration_batch VARCHAR(100) NOT NULL COMMENT 'Batch identifier (e.g., bizoforce_batch_1)',
  platform VARCHAR(50) NOT NULL,
  total_users INT NOT NULL,
  users_migrated INT DEFAULT 0,
  users_merged INT DEFAULT 0,
  users_skipped INT DEFAULT 0,
  users_failed INT DEFAULT 0,
  duplicates_found INT DEFAULT 0,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP NULL,
  duration_seconds INT NULL,
  status ENUM('running', 'completed', 'failed', 'paused') DEFAULT 'running',
  error_log TEXT NULL,
  INDEX idx_batch (migration_batch),
  INDEX idx_platform (platform),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Track migration progress and statistics';

-- ============================================
-- User Role Mapping Table (For ambiguous cases)
-- ============================================
CREATE TABLE IF NOT EXISTS user_role_suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unified_user_id INT NOT NULL,
  suggested_role VARCHAR(50) NOT NULL COMMENT 'company or individual',
  confidence_score DECIMAL(5,2) NOT NULL COMMENT 'Confidence level (0.00-100.00)',
  reasoning JSON NOT NULL COMMENT 'Why this role was suggested',
  activity_summary JSON NULL COMMENT 'Activity metrics used for decision',
  user_selected_role VARCHAR(50) NULL COMMENT 'Role user actually chose',
  selected_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (unified_user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user (unified_user_id),
  INDEX idx_confidence (confidence_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Store AI-suggested roles for users with ambiguous activity';

-- ============================================
-- COMMENTS
-- ============================================
-- This migration prepares the unified_users table to handle:
-- 1. Merging 281,951 users from 4 platforms
-- 2. Tracking platform-specific user IDs for data sync
-- 3. Logging all migration operations for audit
-- 4. Handling email duplicates intelligently
-- 5. Tracking migration progress in real-time
-- 6. Supporting role selection prompts for ambiguous users
