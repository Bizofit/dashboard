-- ============================================
-- Migration: 04 - Create OAuth Tokens Table
-- ============================================
-- Stores OAuth tokens for Google (and future providers)
-- Allows token refresh and session management
-- ============================================

CREATE TABLE IF NOT EXISTS oauth_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- User Reference
  user_id INT NOT NULL,
  
  -- OAuth Provider
  provider ENUM('google', 'facebook', 'microsoft', 'linkedin') NOT NULL,
  
  -- Token Data
  access_token TEXT,
  refresh_token TEXT,
  token_type VARCHAR(50) DEFAULT 'Bearer',
  
  -- Token Expiration
  token_expires_at TIMESTAMP NULL,
  
  -- OAuth Scopes
  scopes TEXT,  -- Comma-separated list
  
  -- Provider-specific Data
  provider_user_id VARCHAR(255),  -- Google ID, etc.
  provider_data JSON,  -- Additional provider-specific information
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP NULL,
  
  -- Foreign Keys
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_provider (provider),
  INDEX idx_provider_user_id (provider_user_id),
  INDEX idx_token_expires_at (token_expires_at),
  
  -- Unique constraint: One token per user per provider
  UNIQUE KEY unique_user_provider (user_id, provider)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
