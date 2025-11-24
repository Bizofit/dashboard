# UNIFIED Database Schema

**Database Type:** mysql
**Total Tables:** 12
**Generated:** 11/22/2025, 12:50:32 PM

---

## Table of Contents

1. [company_users](#company-users)
2. [email_duplicates](#email-duplicates)
3. [migration_statistics](#migration-statistics)
4. [platform_sync_log](#platform-sync-log)
5. [role_permissions](#role-permissions)
6. [unified_companies](#unified-companies)
7. [unified_users](#unified-users)
8. [user_migration_log](#user-migration-log)
9. [user_role_history](#user-role-history)
10. [user_roles](#user-roles)
11. [user_sessions](#user-sessions)
12. [user_with_roles](#user-with-roles)

---

## company_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `company_id` | int | NO | NULL | MUL |  |
| `user_id` | int | NO | NULL | MUL |  |
| `role` | enum('company_admin','hr','team_lead','team_member','finance','vendor') | NO | team_member | MUL |  |
| `job_title` | varchar(100) | YES | NULL |  |  |
| `department` | varchar(100) | YES | NULL |  |  |
| `hourly_rate` | decimal(10,2) | YES | NULL |  |  |
| `employment_type` | enum('full-time','part-time','contract','freelance') | YES | full-time |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |
| `invited_by` | int | YES | NULL | MUL |  |
| `invitation_accepted` | tinyint(1) | YES | 0 |  |  |
| `joined_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `left_at` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_company | company_id | NO | BTREE |
| idx_role | role | NO | BTREE |
| idx_user | user_id | NO | BTREE |
| invited_by | invited_by | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_company_user | company_id | YES | BTREE |
| unique_company_user | user_id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| company_users_ibfk_1 | company_id | unified_companies.id |
| company_users_ibfk_2 | user_id | unified_users.id |
| company_users_ibfk_3 | invited_by | unified_users.id |

---

## email_duplicates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | NO | NULL | MUL |  |
| `platform_count` | int | NO | NULL |  |  |
| `platforms` | json | NO | NULL |  |  |
| `unified_user_id` | int | YES | NULL |  |  |
| `resolution_status` | enum('pending','auto_merged','manual_review','resolved') | YES | pending | MUL |  |
| `resolution_notes` | text | YES | NULL |  |  |
| `detected_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `resolved_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_email | email | NO | BTREE |
| idx_status | resolution_status | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## migration_statistics

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `migration_batch` | varchar(100) | NO | NULL | MUL |  |
| `platform` | varchar(50) | NO | NULL | MUL |  |
| `total_users` | int | NO | NULL |  |  |
| `users_migrated` | int | YES | 0 |  |  |
| `users_merged` | int | YES | 0 |  |  |
| `users_skipped` | int | YES | 0 |  |  |
| `users_failed` | int | YES | 0 |  |  |
| `duplicates_found` | int | YES | 0 |  |  |
| `start_time` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `end_time` | timestamp | YES | NULL |  |  |
| `duration_seconds` | int | YES | NULL |  |  |
| `status` | enum('running','completed','failed','paused') | YES | running | MUL |  |
| `error_log` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_batch | migration_batch | NO | BTREE |
| idx_platform | platform | NO | BTREE |
| idx_status | status | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## platform_sync_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `platform` | enum('bizoforce','giglancer','screenly','work') | NO | NULL | MUL |  |
| `sync_type` | enum('user','company','job','project','product','order') | NO | NULL | MUL |  |
| `sync_action` | enum('create','update','delete') | NO | NULL |  |  |
| `unified_record_id` | int | YES | NULL | MUL |  |
| `platform_record_id` | int | YES | NULL | MUL |  |
| `status` | enum('pending','success','failed') | YES | pending | MUL |  |
| `error_message` | text | YES | NULL |  |  |
| `synced_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_platform | platform | NO | BTREE |
| idx_platform_record | platform_record_id | NO | BTREE |
| idx_status | status | NO | BTREE |
| idx_sync_type | sync_type | NO | BTREE |
| idx_unified_record | unified_record_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## role_permissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `role` | varchar(50) | NO | NULL | MUL |  |
| `permission` | varchar(100) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_role | role | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_role_permission | role | YES | BTREE |
| unique_role_permission | permission | YES | BTREE |

---

## unified_companies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `company_name` | varchar(255) | NO | NULL |  |  |
| `company_slug` | varchar(255) | NO | NULL | UNI |  |
| `company_email` | varchar(255) | YES | NULL | MUL |  |
| `company_phone` | varchar(20) | YES | NULL |  |  |
| `company_logo` | varchar(500) | YES | NULL |  |  |
| `company_website` | varchar(255) | YES | NULL |  |  |
| `address_line1` | varchar(255) | YES | NULL |  |  |
| `address_line2` | varchar(255) | YES | NULL |  |  |
| `city` | varchar(100) | YES | NULL |  |  |
| `state` | varchar(100) | YES | NULL |  |  |
| `country` | varchar(100) | YES | NULL |  |  |
| `postal_code` | varchar(20) | YES | NULL |  |  |
| `subscription_plan` | enum('free','basic','professional','enterprise') | YES | free |  |  |
| `subscription_status` | enum('active','inactive','trial','suspended') | YES | trial | MUL |  |
| `subscription_start_date` | date | YES | NULL |  |  |
| `subscription_end_date` | date | YES | NULL |  |  |
| `bizoforce_company_id` | int | YES | NULL |  |  |
| `work_company_id` | int | YES | NULL |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |
| `is_verified` | tinyint(1) | YES | 0 |  |  |
| `created_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| company_slug | company_slug | YES | BTREE |
| idx_company_email | company_email | NO | BTREE |
| idx_company_slug | company_slug | NO | BTREE |
| idx_subscription_status | subscription_status | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## unified_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | NO | NULL | UNI |  |
| `password_hash` | varchar(255) | YES | NULL |  |  |
| `google_id` | varchar(255) | YES | NULL | UNI |  |
| `google_profile_picture` | varchar(500) | YES | NULL |  |  |
| `auth_provider` | enum('local','google','hybrid') | YES | local |  |  |
| `first_name` | varchar(100) | NO | NULL |  |  |
| `last_name` | varchar(100) | NO | NULL |  |  |
| `phone` | varchar(20) | YES | NULL |  |  |
| `profile_photo` | varchar(500) | YES | NULL |  |  |
| `user_type` | enum('company','individual') | NO | individual | MUL |  |
| `current_role` | varchar(50) | YES | NULL |  |  |
| `current_company_id` | int | YES | NULL |  |  |
| `bizoforce_user_id` | int | YES | NULL | MUL |  |
| `giglancer_user_id` | int | YES | NULL | MUL |  |
| `screenly_user_id` | int | YES | NULL | MUL |  |
| `work_user_id` | int | YES | NULL | MUL |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |
| `email_verified` | tinyint(1) | YES | 0 |  |  |
| `onboarding_complete` | tinyint(1) | YES | 0 |  |  |
| `migrated_from` | enum('bizoforce','giglancer','screenly','work','new') | YES | new |  |  |
| `migration_date` | datetime | YES | NULL |  |  |
| `created_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `last_login_at` | datetime | YES | NULL |  |  |
| `needsRoleSelection` | tinyint(1) | YES | 0 |  |  |
| `pendingCompanyCreation` | tinyint(1) | YES | 0 |  |  |
| `migrationSource` | varchar(50) | YES | NULL | MUL |  |
| `migrationDate` | timestamp | YES | NULL |  |  |
| `lastLogin` | timestamp | YES | NULL |  |  |
| `profileScore` | int | YES | 0 |  |  |
| `isActive` | tinyint(1) | YES | 1 |  |  |
| `isEmailConfirmed` | tinyint(1) | YES | 0 |  |  |
| `totalProjects` | int | YES | 0 |  |  |
| `totalJobApplications` | int | YES | 0 |  |  |
| `totalBids` | int | YES | 0 |  |  |
| `totalTimesheets` | int | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | YES | BTREE |
| google_id | google_id | YES | BTREE |
| idx_bizoforce_user | bizoforce_user_id | NO | BTREE |
| idx_email | email | NO | BTREE |
| idx_giglancer_user | giglancer_user_id | NO | BTREE |
| idx_google_id | google_id | NO | BTREE |
| idx_migration_source | migrationSource | NO | BTREE |
| idx_screenly_user | screenly_user_id | NO | BTREE |
| idx_user_type | user_type | NO | BTREE |
| idx_work_user | work_user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## user_migration_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `unified_user_id` | int | NO | NULL |  |  |
| `platform` | varchar(50) | NO | NULL | MUL |  |
| `platform_user_id` | bigint | NO | NULL |  |  |
| `platform_email` | varchar(255) | NO | NULL |  |  |
| `action` | varchar(50) | NO | NULL |  |  |
| `role_detected` | varchar(50) | YES | NULL |  |  |
| `activity_data` | json | YES | NULL |  |  |
| `conflicts` | json | YES | NULL |  |  |
| `notes` | text | YES | NULL |  |  |
| `migrated_at` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_migration_date | migrated_at | NO | BTREE |
| idx_platform_lookup | platform | NO | BTREE |
| idx_platform_lookup | platform_user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## user_role_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `role` | varchar(50) | NO | NULL | MUL |  |
| `company_id` | int | YES | NULL |  |  |
| `action` | varchar(20) | NO | NULL |  |  |
| `ip_address` | varchar(45) | YES | NULL |  |  |
| `user_agent` | varchar(255) | YES | NULL |  |  |
| `timestamp` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_role_history | role | NO | BTREE |
| idx_role_history | timestamp | NO | BTREE |
| idx_user_history | user_id | NO | BTREE |
| idx_user_history | timestamp | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| user_role_history_ibfk_1 | user_id | unified_users.id |

---

## user_roles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `role` | varchar(50) | NO | NULL |  |  |
| `company_id` | int | YES | NULL | MUL |  |
| `is_primary` | tinyint(1) | YES | 0 |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |
| `source_platform` | varchar(50) | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `last_used_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_active_roles | user_id | NO | BTREE |
| idx_active_roles | is_active | NO | BTREE |
| idx_company_roles | company_id | NO | BTREE |
| idx_company_roles | role | NO | BTREE |
| idx_user_roles | user_id | NO | BTREE |
| idx_user_roles | role | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_user_role_company | user_id | YES | BTREE |
| unique_user_role_company | role | YES | BTREE |
| unique_user_role_company | company_id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| user_roles_ibfk_1 | user_id | unified_users.id |

---

## user_sessions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `token_hash` | varchar(255) | NO | NULL | MUL |  |
| `ip_address` | varchar(45) | YES | NULL |  |  |
| `user_agent` | text | YES | NULL |  |  |
| `device_type` | enum('desktop','mobile','tablet','other') | YES | other |  |  |
| `created_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `expires_at` | datetime | NO | NULL | MUL |  |
| `last_activity_at` | datetime | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_expires_at | expires_at | NO | BTREE |
| idx_token_hash | token_hash | NO | BTREE |
| idx_user | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| user_sessions_ibfk_1 | user_id | unified_users.id |

---

## user_with_roles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | 0 |  |  |
| `email` | varchar(255) | NO | NULL |  |  |
| `first_name` | varchar(100) | NO | NULL |  |  |
| `last_name` | varchar(100) | NO | NULL |  |  |
| `user_type` | enum('company','individual') | NO | individual |  |  |
| `current_role` | varchar(50) | YES | NULL |  |  |
| `current_company_id` | int | YES | NULL |  |  |
| `available_roles` | text | YES | NULL |  |  |
| `role_count` | bigint | NO | 0 |  |  |

---

