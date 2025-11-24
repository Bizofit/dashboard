# Database Table Counts and Categories

## Overview

| Database | Total Tables | Category | Primary Use Case |
|----------|-------------|----------|------------------|
| Unified | 12 | Master Registry | User authentication, roles, sessions |
| Bizoforce | 732 | WordPress/WooCommerce | Products, orders, vendors, marketplace |
| Giglancer | 162 | Job Marketplace | Jobs, applications, freelancers |
| Work | 226 | Project Management | Projects, timesheets, invoicing |
| Screenly | 51 | AI Screening | Candidates, interviews, screenings |
| **TOTAL** | **1,183** | - | Full ecosystem integration |

## Unified Database (12 tables)

### User Management (5 tables)
- `unified_users` - Master user registry
- `user_roles` - Multi-role assignments
- `user_sessions` - Active sessions
- `user_role_history` - Role change history
- `user_migration_log` - Migration tracking

### Company Management (2 tables)
- `unified_companies` - Company profiles
- `company_users` - Company member assignments

### System & Audit (5 tables)
- `role_permissions` - Permission definitions
- `platform_sync_log` - Cross-platform sync tracking
- `migration_statistics` - Migration metrics
- `email_duplicates` - Duplicate email tracking
- `user_with_roles` - View combining users & roles

## Bizoforce Database (732 tables)

### WordPress Core (~180 tables)
- `wp_users` - WordPress users (198K+)
- `wp_usermeta` - User metadata
- `wp_posts` - All post types (products, orders, pages)
- `wp_postmeta` - Post metadata
- `wp_options` - Site configuration
- `wp_terms`, `wp_term_taxonomy`, `wp_term_relationships` - Taxonomies
- ~170 more core WordPress tables

### WooCommerce (~150 tables)
- `wp_wc_orders` - Orders (HPOS)
- `wp_wc_order_addresses` - Order addresses
- `wp_wc_order_operational_data` - Order metadata
- `wp_woocommerce_order_items` - Order line items
- `wp_woocommerce_order_itemmeta` - Order item metadata
- `wp_wc_customer_lookup` - Customer data
- `wp_wc_product_*` - Product attributes
- ~140 more WooCommerce tables

### WC Vendors (~50 tables)
- `wc_vendors_vendor_*` - Vendor profiles
- `wc_vendors_commission_*` - Commission tracking
- `wc_vendors_shipping_*` - Vendor shipping
- `wcvendors_*` - Vendor marketplace features
- ~45 more vendor-related tables

### Plugins & Extensions (~350 tables)
- Payment gateways
- Shipping extensions
- Marketing tools
- SEO plugins
- Security plugins
- Performance optimization
- Custom extensions

## Giglancer Database (162 tables)

### User Management (~20 tables)
- `users` - Job seekers & employers (82K+)
- `user_profiles` - Extended profiles
- `freelancer_profiles` - Freelancer details
- `employer_profiles` - Employer details
- `user_skills` - Skill tracking
- `user_certifications` - Certifications
- ~15 more user-related tables

### Job Management (~30 tables)
- `jobs` - Job postings
- `job_applications` - Applications
- `job_categories` - Categories
- `job_skills` - Required skills
- `job_proposals` - Freelancer proposals
- `job_invitations` - Employer invitations
- ~25 more job-related tables

### Company Management (~15 tables)
- `companies` - Employer companies
- `company_members` - Team members
- `company_reviews` - Company ratings
- `company_follows` - Follower tracking
- ~10 more company tables

### Transactions & Payments (~25 tables)
- `transactions` - Payment tracking
- `invoices` - Billing
- `payments` - Payment methods
- `escrow` - Escrow management
- `refunds` - Refund tracking
- ~20 more financial tables

### Communication (~20 tables)
- `messages` - Direct messaging
- `conversations` - Message threads
- `notifications` - User notifications
- `email_logs` - Email tracking
- ~15 more communication tables

### System & Analytics (~50 tables)
- Activity logs
- Search indexes
- Cache tables
- Analytics data
- Audit trails
- Configuration tables

## Work Database (226 tables)

### Project Management (~40 tables)
- `projects` - Project tracking
- `project_members` - Team assignments
- `project_milestones` - Project milestones
- `project_time_logs` - Timesheet entries
- `project_activity` - Activity tracking
- `project_files` - Document management
- ~35 more project tables

### Task Management (~30 tables)
- `tasks` - Task tracking
- `task_users` - Task assignments
- `task_comments` - Task discussions
- `task_files` - Task attachments
- `task_labels` - Task categorization
- ~25 more task tables

### Time & Attendance (~25 tables)
- `attendances` - Attendance tracking
- `leave_types` - Leave categories
- `leaves` - Leave requests
- `holidays` - Holiday calendar
- `shifts` - Work shifts
- ~20 more time-related tables

### Financial Management (~35 tables)
- `invoices` - Billing
- `invoice_items` - Invoice line items
- `payments` - Payment tracking
- `expenses` - Expense management
- `estimates` - Project estimates
- ~30 more financial tables

### HR Management (~30 tables)
- `employees` - Employee profiles
- `departments` - Organization structure
- `designations` - Job positions
- `employee_docs` - Document management
- `performance_reviews` - Reviews
- ~25 more HR tables

### System & Configuration (~65 tables)
- User settings
- Company settings
- Email templates
- Notification templates
- Modules configuration
- Permission tables
- Activity logs
- Audit trails

## Screenly Database (51 tables - PostgreSQL)

### User & Company (~10 tables)
- `users` - Platform users
- `companies` - Company accounts
- `company_members` - Team members
- `user_roles` - Role assignments
- `subscriptions` - Subscription plans
- ~5 more user tables

### Candidate Management (~12 tables)
- `candidates` - Job candidates
- `candidate_profiles` - Extended profiles
- `candidate_education` - Education history
- `candidate_experience` - Work experience
- `candidate_skills` - Skill assessments
- `candidate_documents` - Resume, certificates
- ~7 more candidate tables

### Screening & Assessment (~15 tables)
- `screenings` - AI screening sessions
- `screening_questions` - Question bank
- `screening_answers` - Candidate responses
- `screening_scores` - Scoring results
- `ai_analysis` - AI evaluation
- `video_recordings` - Interview videos
- ~10 more screening tables

### Interview Management (~8 tables)
- `interviews` - Interview schedules
- `interview_feedback` - Interviewer notes
- `interview_panels` - Panel members
- `interview_templates` - Interview templates
- ~4 more interview tables

### Job & Hiring (~6 tables)
- `job_postings` - Job listings
- `job_applications` - Applications
- `job_screening_pipeline` - Hiring pipeline
- `offers` - Job offers
- ~2 more hiring tables

## Tables by Functional Area

### Authentication & Authorization
- Unified: `unified_users`, `user_roles`, `user_sessions`
- Bizoforce: `wp_users`, `wp_usermeta`
- Giglancer: `users`, `user_profiles`
- Work: `users`, `employee_roles`
- Screenly: `users`, `user_roles`
- **Total: ~15 key tables**

### Financial & Billing
- Bizoforce: WooCommerce orders (~20 tables)
- Giglancer: Transactions, invoices (~10 tables)
- Work: Invoices, payments, expenses (~15 tables)
- **Total: ~45 key tables**

### Project & Task Management
- Work: Projects, tasks (~70 tables)
- Giglancer: Jobs, proposals (~30 tables)
- **Total: ~100 tables**

### HR & Recruitment
- Screenly: Candidates, screenings (~30 tables)
- Giglancer: Freelancer profiles (~15 tables)
- Work: Employees, performance (~30 tables)
- **Total: ~75 tables**

### E-commerce & Marketplace
- Bizoforce: Products, vendors (~200 tables)
- **Total: ~200 tables**

### Communication & Notifications
- Giglancer: Messages, notifications (~20 tables)
- Work: Notifications, emails (~10 tables)
- **Total: ~30 tables**

### Analytics & Logging
- All databases: Activity logs, audit trails
- **Total: ~50 tables across all DBs**

## Key Insights

1. **Bizoforce dominates**: 732/1183 tables (62% of total)
   - Mostly WordPress plugins and extensions
   - WooCommerce adds significant complexity
   - Many inactive/legacy plugin tables

2. **Work is comprehensive**: 226 tables for full project management
   - Complete HR suite
   - Financial management
   - Task & time tracking

3. **Giglancer is focused**: 162 tables for job marketplace
   - Well-structured for hiring
   - Payment & escrow systems
   - Communication features

4. **Screenly is lean**: 51 tables (PostgreSQL)
   - Modern schema design
   - AI-focused features
   - Subscription-based

5. **Unified is minimal**: 12 tables as master registry
   - Links all platforms
   - Manages multi-role system
   - Audit & sync tracking

## Most Important Tables (Top 50)

### Critical for Dashboard
1. `unified_users` - Master user list
2. `user_roles` - Multi-role assignments
3. `wp_posts` - Products & orders
4. `wp_postmeta` - Order totals, product prices
5. `jobs` (Giglancer) - Job postings
6. `projects` (Work) - Project tracking
7. `candidates` (Screenly) - Job candidates
8. `companies` - Company profiles (all DBs)

### Financial Tracking
9. `wp_wc_orders` - WooCommerce orders
10. `transactions` (Giglancer) - Payments
11. `invoices` (Work) - Billing
12. `wp_woocommerce_order_items` - Order items

### User Activity
13. `project_time_logs` - Timesheets
14. `job_applications` - Job apps
15. `screenings` - AI screenings
16. `attendances` - Attendance tracking

[... continues with 35 more important tables ...]

---

**Generated**: November 22, 2025  
**Script**: `scripts/generate-schemas.ts`  
**Documentation**: See `schemas/README.md`
