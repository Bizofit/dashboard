// UNIFIED Database TypeScript Interfaces
// Generated: 11/22/2025, 12:50:32 PM
// Database Type: mysql
// Total Tables: 12

export interface CompanyUsers {
  id: number;
  company_id: number;
  user_id: number;
  role: string;
  job_title?: string;
  department?: string;
  hourly_rate?: number;
  employment_type?: string;
  is_active?: number;
  invited_by?: number;
  invitation_accepted?: number;
  joined_at?: Date | string;
  left_at?: Date | string;
}

export interface EmailDuplicates {
  id: number;
  email: string;
  platform_count: number;
  platforms: any;
  unified_user_id?: number;
  resolution_status?: string;
  resolution_notes?: string;
  detected_at?: Date | string;
  resolved_at?: Date | string;
}

export interface MigrationStatistics {
  id: number;
  migration_batch: string;
  platform: string;
  total_users: number;
  users_migrated?: number;
  users_merged?: number;
  users_skipped?: number;
  users_failed?: number;
  duplicates_found?: number;
  start_time?: Date | string;
  end_time?: Date | string;
  duration_seconds?: number;
  status?: string;
  error_log?: string;
}

export interface PlatformSyncLog {
  id: number;
  platform: string;
  sync_type: string;
  sync_action: string;
  unified_record_id?: number;
  platform_record_id?: number;
  status?: string;
  error_message?: string;
  synced_at?: Date | string;
}

export interface RolePermissions {
  id: number;
  role: string;
  permission: string;
  description?: string;
  created_at?: Date | string;
}

export interface UnifiedCompanies {
  id: number;
  company_name: string;
  company_slug: string;
  company_email?: string;
  company_phone?: string;
  company_logo?: string;
  company_website?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  subscription_plan?: string;
  subscription_status?: string;
  subscription_start_date?: Date | string;
  subscription_end_date?: Date | string;
  bizoforce_company_id?: number;
  work_company_id?: number;
  is_active?: number;
  is_verified?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface UnifiedUsers {
  id: number;
  email: string;
  password_hash?: string;
  google_id?: string;
  google_profile_picture?: string;
  auth_provider?: string;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_photo?: string;
  user_type: string;
  current_role?: string;
  current_company_id?: number;
  bizoforce_user_id?: number;
  giglancer_user_id?: number;
  screenly_user_id?: number;
  work_user_id?: number;
  is_active?: number;
  email_verified?: number;
  onboarding_complete?: number;
  migrated_from?: string;
  migration_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  last_login_at?: Date | string;
  needsRoleSelection?: number;
  pendingCompanyCreation?: number;
  migrationSource?: string;
  migrationDate?: Date | string;
  lastLogin?: Date | string;
  profileScore?: number;
  isActive?: number;
  isEmailConfirmed?: number;
  totalProjects?: number;
  totalJobApplications?: number;
  totalBids?: number;
  totalTimesheets?: number;
}

export interface UserMigrationLog {
  id: number;
  unified_user_id: number;
  platform: string;
  platform_user_id: number;
  platform_email: string;
  action: string;
  role_detected?: string;
  activity_data?: any;
  conflicts?: any;
  notes?: string;
  migrated_at?: Date | string;
}

export interface UserRoleHistory {
  id: number;
  user_id: number;
  role: string;
  company_id?: number;
  action: string;
  ip_address?: string;
  user_agent?: string;
  timestamp?: Date | string;
}

export interface UserRoles {
  id: number;
  user_id: number;
  role: string;
  company_id?: number;
  is_primary?: number;
  is_active?: number;
  source_platform?: string;
  created_at?: Date | string;
  last_used_at?: Date | string;
}

export interface UserSessions {
  id: number;
  user_id: number;
  token_hash: string;
  ip_address?: string;
  user_agent?: string;
  device_type?: string;
  created_at?: Date | string;
  expires_at: Date | string;
  last_activity_at?: Date | string;
}

export interface UserWithRoles {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  current_role?: string;
  current_company_id?: number;
  available_roles?: string;
  role_count: number;
}

