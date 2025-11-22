-- ============================================
-- Migration: 05 - Create Sessions Table
-- ============================================
-- Tracks user sessions for security and analytics
-- ============================================

CREATE TABLE IF NOT EXISTS user_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- User Reference
  user_id INT NOT NULL,
  
  -- Session Data
  session_token VARCHAR(255) UNIQUE NOT NULL,
  refresh_token VARCHAR(255) UNIQUE,
  
  -- Device/Browser Information
  ip_address VARCHAR(45),  -- IPv6 compatible
  user_agent TEXT,
  device_type VARCHAR(50),  -- 'desktop', 'mobile', 'tablet'
  browser VARCHAR(100),
  os VARCHAR(100),
  
  -- Session Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  
  -- Foreign Keys
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_session_token (session_token),
  INDEX idx_refresh_token (refresh_token),
  INDEX idx_is_active (is_active),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
