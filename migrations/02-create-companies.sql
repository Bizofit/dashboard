-- ============================================
-- Migration: 02 - Create Companies Table
-- ============================================
-- Companies can have multiple team members with different roles
-- ============================================

CREATE TABLE IF NOT EXISTS companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Company Details
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  industry VARCHAR(100),
  company_size ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'),
  
  -- Contact Information
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  
  -- Address
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  
  -- Branding
  logo_url VARCHAR(500),
  banner_url VARCHAR(500),
  
  -- Business Details
  tax_id VARCHAR(100),
  registration_number VARCHAR(100),
  
  -- Subscription/Billing
  subscription_plan ENUM('free', 'starter', 'professional', 'enterprise') DEFAULT 'free',
  subscription_status ENUM('active', 'trial', 'expired', 'cancelled') DEFAULT 'trial',
  subscription_start_date DATE,
  subscription_end_date DATE,
  
  -- Legacy Platform IDs
  bizoforce_company_id INT,
  screenly_company_id INT,
  work_company_id INT,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_slug (slug),
  INDEX idx_is_active (is_active),
  INDEX idx_subscription_status (subscription_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
