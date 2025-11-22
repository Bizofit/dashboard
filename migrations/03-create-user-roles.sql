-- ============================================
-- Migration: 03 - Create Multi-Role System
-- ============================================
-- Users can have multiple roles across different contexts:
-- - Company Admin, HR, Team Lead, Team Member
-- - Finance, Vendor, Resource Provider
-- - Job Seeker, Freelancer
-- ============================================

CREATE TABLE IF NOT EXISTS user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- User and Company Context
  user_id INT NOT NULL,
  company_id INT NULL,  -- NULL for individual roles (freelancer, job seeker)
  
  -- Role Details
  role_type ENUM(
    'company_admin',
    'hr',
    'team_lead',
    'team_member',
    'finance',
    'vendor',
    'resource_provider',
    'job_seeker',
    'freelancer'
  ) NOT NULL,
  
  -- Platform Context (where this role originated)
  platform VARCHAR(50),  -- 'bizoforce', 'giglancer', 'screenly', 'work', 'unified'
  
  -- Role Status
  is_primary BOOLEAN DEFAULT FALSE,  -- Primary role for UI navigation
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Permissions (JSON string for extensibility)
  permissions JSON,  -- e.g., {"can_post_jobs": true, "can_approve_timesheets": true}
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign Keys
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_company_id (company_id),
  INDEX idx_role_type (role_type),
  INDEX idx_platform (platform),
  INDEX idx_is_primary (is_primary),
  INDEX idx_is_active (is_active),
  
  -- Unique constraint: One primary role per user
  UNIQUE KEY unique_primary_role (user_id, is_primary, company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
