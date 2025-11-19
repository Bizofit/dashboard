-- Migration: Add Multi-Role Support
-- Date: November 18, 2025
-- Purpose: Enable users to have multiple roles across different contexts

-- ============================================
-- 1. USER ROLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_id INT NULL,
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  source_platform VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  
  INDEX idx_user_roles (user_id, role),
  INDEX idx_company_roles (company_id, role),
  INDEX idx_active_roles (user_id, is_active),
  
  UNIQUE KEY unique_user_role_company (user_id, role, company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. USER ROLE HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_role_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_id INT NULL,
  action VARCHAR(20) NOT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent VARCHAR(255) NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  
  INDEX idx_user_history (user_id, timestamp),
  INDEX idx_role_history (role, timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. ROLE PERMISSIONS TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  permission VARCHAR(100) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_role_permission (role, permission),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. INSERT DEFAULT ROLE PERMISSIONS
-- ============================================
INSERT INTO role_permissions (role, permission, description) VALUES
-- Company Admin
('company_admin', 'create_company', 'Create and manage company profile'),
('company_admin', 'manage_users', 'Invite and manage team members'),
('company_admin', 'post_jobs', 'Create and manage job postings'),
('company_admin', 'view_candidates', 'View and screen candidates'),
('company_admin', 'create_projects', 'Create and assign projects'),
('company_admin', 'approve_timesheets', 'Approve employee timesheets'),
('company_admin', 'generate_invoices', 'Generate and send invoices'),
('company_admin', 'view_analytics', 'View company analytics and reports'),
('company_admin', 'manage_subscriptions', 'Manage subscription and billing'),

-- Vendor
('vendor', 'create_products', 'Create and list products/services'),
('vendor', 'manage_orders', 'Manage customer orders'),
('vendor', 'view_sales', 'View sales reports and analytics'),
('vendor', 'manage_inventory', 'Manage product inventory'),
('vendor', 'respond_to_reviews', 'Respond to customer reviews'),

-- HR
('hr', 'post_jobs', 'Create and manage job postings'),
('hr', 'view_candidates', 'View and screen candidates'),
('hr', 'conduct_interviews', 'Schedule and conduct interviews'),
('hr', 'send_offers', 'Send job offers to candidates'),
('hr', 'onboard_employees', 'Onboard new hires'),

-- Team Lead
('team_lead', 'create_projects', 'Create and manage projects'),
('team_lead', 'assign_tasks', 'Assign tasks to team members'),
('team_lead', 'approve_timesheets', 'Approve team member timesheets'),
('team_lead', 'view_team_reports', 'View team performance reports'),

-- Team Member
('team_member', 'view_assigned_projects', 'View assigned projects and tasks'),
('team_member', 'log_hours', 'Log work hours'),
('team_member', 'submit_timesheets', 'Submit timesheets for approval'),
('team_member', 'view_personal_earnings', 'View personal earnings and payments'),

-- Freelancer
('freelancer', 'browse_jobs', 'Browse available jobs and projects'),
('freelancer', 'submit_proposals', 'Submit proposals and bids'),
('freelancer', 'view_active_projects', 'View active project engagements'),
('freelancer', 'log_hours', 'Log work hours for projects'),
('freelancer', 'view_earnings', 'View earnings and payment history'),
('freelancer', 'update_portfolio', 'Update portfolio and skills'),

-- Job Seeker
('job_seeker', 'browse_jobs', 'Browse job openings'),
('job_seeker', 'apply_to_jobs', 'Apply to job postings'),
('job_seeker', 'upload_resume', 'Upload and manage resume'),
('job_seeker', 'take_ai_screening', 'Complete AI screening interviews'),
('job_seeker', 'view_application_status', 'View job application status');

-- ============================================
-- 5. ADD COLUMN TO TRACK CURRENT ROLE
-- ============================================
ALTER TABLE unified_users 
ADD COLUMN current_role VARCHAR(50) NULL AFTER user_type,
ADD COLUMN current_company_id INT NULL AFTER current_role;

-- ============================================
-- 6. CREATE VIEW FOR USER WITH ROLES
-- ============================================
CREATE OR REPLACE VIEW user_with_roles AS
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.user_type,
  u.current_role,
  u.current_company_id,
  GROUP_CONCAT(
    DISTINCT ur.role 
    ORDER BY ur.is_primary DESC, ur.role 
    SEPARATOR ','
  ) as available_roles,
  COUNT(DISTINCT ur.id) as role_count
FROM unified_users u
LEFT JOIN user_roles ur ON u.id = ur.user_id AND ur.is_active = true
GROUP BY u.id;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
