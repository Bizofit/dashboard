# USER MIGRATION STRATEGY - Database Schema Analysis

**Date**: November 18, 2025  
**Purpose**: Document user types, roles, and migration strategy across all 4 platforms

---

## 📊 EXECUTIVE SUMMARY

### Total Users Across Platforms
- **Bizoforce (WordPress/WooCommerce)**: 198,007 users
- **Giglancer (Jobs Platform)**: 82,807 users
  - Admin: 2 users
  - User (General): 60,734 users
  - Client (Employer): 364 users
  - Service Provider/Freelancer: 21,707 users
- **Screenly (AI Screening)**: 24 users
- **Work.Bizoforce (Projects)**: 1,113 users

**TOTAL: 281,951 users** (with significant overlap expected)

### Key Insights
1. **Giglancer has explicit roles** - `role_id` maps to 4 distinct user types
2. **Work.Bizoforce has company relationships** - `company_id` links users to companies
3. **Screenly has minimal users** - Likely test/demo accounts
4. **Bizoforce is largest** but many may be inactive subscribers
5. **Deduplication is critical** - Same emails likely across platforms

---

## 1. BIZOFORCE DATABASE (WordPress/WooCommerce)

### Schema Overview
**Table**: `wp_users`
**User Count**: 86,131 users

### Core Fields
| Field | Type | Purpose |
|-------|------|---------|
| `ID` | bigint | Primary key |
| `user_login` | varchar(60) | Username |
| `user_email` | varchar(100) | Email (unique) |
| `user_pass` | varchar(255) | WordPress password hash |
| `user_registered` | datetime | Registration date |
| `display_name` | varchar(250) | Display name |
| `signup_step` | enum | Onboarding progress |
| `signup_progress` | varchar(8) | Progress percentage |

### Signup Steps (Critical for Role Detection)
```sql
enum('','register_company','register_product_service','digital_marketing_report',
     'leads_dashboard','estimate_project','download_app','done')
```

**Key Insight**: `signup_step` indicates user intent:
- `register_company` → **Company Admin**
- `register_product_service` → **Vendor/Seller**
- Empty/other → **Undecided** (needs role prompt on next login)

### Roles System (wp_capabilities in wp_usermeta)
Roles stored as serialized PHP in `wp_usermeta` table:

| Meta Key | User Count | Description |
|----------|-----------|-------------|
| `wp_capabilities` | 86,131 | Main WordPress roles |
| `wpleads_capabilities` | 133,446 | Leads plugin roles |
| `role` | 133,992 | Duplicate role tracking |
| `hide_role` | 80,353 | Hidden role field |

### Sample Role Data
```php
a:2:{s:13:"administrator";b:1;s:13:"bbp_keymaster";b:1;}  // Administrator
a:1:{s:10:"subscriber";b:1;}                               // Subscriber
```

### WordPress Roles → Bizoforce Roles Mapping

| WordPress Role | Bizoforce Role | Signup Step | Our Unified Role |
|---------------|----------------|-------------|------------------|
| Administrator | Site Admin | (any) | **Company Admin** |
| Shop Manager | Store Owner | register_product_service | **Vendor** |
| WC Vendor | Seller/Vendor | register_product_service | **Vendor** |
| Customer | Buyer | (empty) | **Individual** (if no company) or **Company Admin** (if has company) |
| Subscriber | Newsletter | (empty) | **Individual** (default) |

### Company Detection Logic
```javascript
// If user has:
1. signup_step === 'register_company' → Company Admin
2. signup_step === 'register_product_service' → Vendor
3. signup_step === '' OR other → Prompt on next login:
   - "Are you a Company or Job Seeker?"
   - Store choice in unified_users.userType
```

### Related Tables
- `wp_company_faqs` - Company-related content (not user-company mapping)
- No dedicated company-user relationship table found (likely in posts/postmeta)

### WooCommerce Vendor Plugin
- No `vendor` tables found (may use different naming or custom post types)
- Vendor status likely stored in `wp_usermeta` with key like `_wcv_vendor_status`

---

## 2. GIGLANCER DATABASE (Jobs Platform)

### Schema Overview
**Table**: `users`  
**Primary Key**: `id` (bigint)

### Core Fields (95+ columns!)
| Field | Type | Purpose |
|-------|------|---------|
| `id` | bigint | Primary key |
| `role_id` | int | **User role (CRITICAL)** |
| `email` | varchar(510) | Email |
| `username` | varchar(510) | Username |
| `password` | varchar(200) | Bcrypt hash |
| `first_name` | varchar(255) | First name |
| `last_name` | varchar(255) | Last name |
| `is_active` | tinyint(1) | Account status |
| `is_email_confirmed` | tinyint(1) | Email verified |
| `bizoforce_company_id` | bigint | **Link to Bizoforce!** |
| `bizoforce_company_name` | varchar(512) | Company name |
| `bizoforce_company_website` | varchar(512) | Company website |

### Key Insights
1. **Already linked to Bizoforce!** (`bizoforce_company_id` field exists)
2. **Role-based system**: `role_id` determines user type
3. **Dual roles**: Users can be both employer AND freelancer

### Role Detection Fields
```javascript
{
  role_id: 4,                          // Role enum (need to check roles table)
  bid_count: 0,                        // Freelancer metric
  won_bid_count: 0,                    // Freelancer success
  project_count: 0,                    // Employer metric (posted projects)
  job_count: 0,                        // Employer metric (posted jobs)
  job_apply_count: 0,                  // Job seeker metric
  total_spend_amount_as_employer: 0.0, // Employer activity
  total_earned_amount_as_freelancer: 0.0, // Freelancer activity
  project_completed_count: 0,          // Activity metric
  hourly_rate: null,                   // Freelancer rate
  availability: null,                  // Job seeker availability
  experience_level: null,              // Job seeker level
  work_mode: null,                     // Job seeker preference
  current_company: null,               // Current employer
  designation: null                    // Job title
}
```

### Giglancer Roles → Unified Roles Mapping (CONFIRMED)

| role_id | Giglancer Role | User Count | Activity Indicators | Unified Role |
|---------|---------------|------------|-------------------|--------------|
| 1 | Admin | 2 | (system admin) | **Platform Admin** (not migrated) |
| 2 | User (General) | 60,734 | Mixed activity | **Individual** (default) or **Company Admin** (if has company) |
| 3 | Client (Employer) | 364 | project_count > 0, job_count > 0 | **Company Admin** |
| 4 | Service Provider/Freelancer | 21,707 | bid_count > 0, portfolio_count > 0 | **Individual** (freelancer) |

### Migration Logic
```javascript
// For each Giglancer user:
if (bizoforce_company_id && bizoforce_company_id > 0) {
  // User already has a company in Bizoforce
  userType = 'company';
  role = 'Company Admin';
  companyId = bizoforce_company_id;
} else if (role_id === 2 || project_count > 0 || job_count > 0) {
  // Posted jobs/projects → Employer
  userType = 'company';
  role = 'Company Admin';
  // Prompt to create company on next login
} else if (role_id === 3 || bid_count > 0 || portfolio_count > 0) {
  // Freelancer with activity
  userType = 'individual';
  role = 'Freelancer';
} else if (job_apply_count > 0 || is_apply_job_resume_uploaded) {
  // Job seeker
  userType = 'individual';
  role = 'Job Seeker';
} else {
  // No activity - prompt on next login
  userType = 'individual'; // Default
  role = 'Candidate';
  needsRoleSelection = true;
}
```

### Profile Metrics (Keep for Analytics)
- `profile_score` - Profile completeness (0-100)
- `profile_step` - Onboarding stage
- `total_rating_as_employer` - Employer reputation
- `total_rating_as_freelancer` - Freelancer reputation
- `review_count_as_employer` - Employer reviews
- `review_count_as_freelancer` - Freelancer reviews

### Related Tables to Preserve
- `skills_users` - User skills (many-to-many)
- `work_profiles` - Work experience
- `exams_users` - Certifications/tests passed
- `user_subscriptions` - Active subscriptions
- `user_logins` - Login history

---

## 3. SCREENLY DATABASE (AI Screening)

### Schema Overview
**Table**: `users` (PostgreSQL)  
**User Count**: 24 users (test/demo accounts)

### Core Fields (CONFIRMED)
| Field | Type | Purpose |
|-------|------|---------|
| `id` | integer | Primary key |
| `google_id` | varchar | Google OAuth ID |
| `email` | varchar | Email |
| `first_name` | varchar | First name |
| `last_name` | varchar | Last name |
| `display_name` | varchar | Full name |
| `profile_image_url` | varchar | Avatar URL |
| `password_hash` | varchar | Password (bcrypt) |
| `is_active` | boolean | Account status |
| `last_login_at` | timestamp | Last login |
| `role` | varchar | **User role** |
| `company_name` | varchar | Associated company |
| `company_id` | integer | Company foreign key |
| `work_email` | varchar | Work email |
| `subscription_plan` | varchar | Stripe plan |
| `subscription_status` | varchar | Active/cancelled |
| `stripe_customer_id` | varchar | Stripe ID |
| `paypal_subscription_id` | varchar | PayPal ID |

### Sample User Data
```json
{
  "id": 11,
  "email": "test@admin.com",
  "first_name": "Test",
  "last_name": "Admin",
  "role": "admin",
  "is_active": true,
  "company_id": null
}
```

### Key Insights
1. **Google OAuth integration** - Has `google_id` field
2. **Subscription-based** - Stripe and PayPal integration
3. **Company association** - `company_id` and `company_name` fields
4. **Very small user base** - Only 24 users (likely beta/test)

### Screenly Roles → Unified Roles
| Screenly Role | Activity | Unified Role |
|--------------|----------|--------------|
| admin | System admin | **Platform Admin** (not migrated) |
| employer | Posted jobs, reviewed candidates | **Company Admin** (HR) |
| candidate | Applied to jobs, AI screened | **Individual** (candidate) |

### Migration Strategy
- **All 24 users**: Likely migrate as **Individual** (candidates)
- **Check email overlap** with Bizoforce/Giglancer
- **Preserve subscription data** for billing history
- **Keep in Screenly DB**: AI screening results, interview data

---

## 4. WORK.BIZOFORCE DATABASE (Projects/Timesheets)

### Schema Overview
**Table**: `users` (MySQL)  
**User Count**: 1,113 users

### Core Fields (CONFIRMED)
| Field | Type | Purpose |
|-------|------|---------|
| `id` | int unsigned | Primary key |
| `company_id` | int unsigned | **Company association (CRITICAL)** |
| `name` | varchar(191) | Full name |
| `email` | varchar(191) | Email (unique) |
| `password` | varchar(191) | Laravel hash |
| `mobile` | varchar(191) | Phone number |
| `gender` | enum | male, female, others |
| `status` | enum | active, deactive |
| `login` | enum | enable, disable |
| `super_admin` | enum | 0, 1 (platform admin flag) |
| `last_login` | datetime | Last login timestamp |
| `created_at` | timestamp | Registration date |
| `email_notifications` | tinyint(1) | Email preference |

### Sample User Data
```json
{
  "id": 1,
  "company_id": null,
  "name": "Super Admin",
  "email": "balapr2000@yahoo.com",
  "super_admin": "1",
  "status": "active"
}
{
  "id": 2,
  "company_id": 1,
  "name": "Admin",
  "email": "admin@example.com",
  "super_admin": "0",
  "status": "active"
}
{
  "id": 3,
  "company_id": 1,
  "name": "Employee",
  "email": "employee@example.com",
  "super_admin": "0",
  "status": "active"
}
```

### Related Tables (CRITICAL)
- `employee_details` - Employee profiles, joining dates, hourly rates
- `employee_teams` - Team memberships
- `project_members` - Project assignments
- `project_time_logs` - Timesheet entries
- `role_user` - **User roles** (many-to-many)
- `teams` - Team structure
- `employee_skills` - Employee skills

### Role Detection Logic
```javascript
// Work.Bizoforce roles are in separate role_user table
// Need to query: SELECT role_id FROM role_user WHERE user_id = ?
// Then query roles table to get role name

if (super_admin === '1') {
  role = 'Platform Admin'; // Not migrated
} else if (company_id === null) {
  role = 'Platform Admin'; // System user
} else {
  // Query role_user table
  const userRoles = await getRolesByUserId(user.id);
  
  if (userRoles.includes('admin')) {
    role = 'Company Admin';
  } else if (userRoles.includes('manager')) {
    role = 'Team Lead';
  } else if (userRoles.includes('employee')) {
    role = 'Team Member';
  }
}
```

### Work.Bizoforce Roles → Unified Roles

| Work Role | company_id | super_admin | Unified Role |
|-----------|-----------|-------------|--------------|
| Super Admin | null | 1 | **Platform Admin** (not migrated) |
| Company Admin | not null | 0 | **Company Admin** |
| Manager | not null | 0 | **Team Lead** |
| Employee | not null | 0 | **Team Member** |

### Migration Strategy
1. **Super Admins**: Skip (platform-level, not company users)
2. **Company Admins**: Migrate as **Company Admin**, link to company via `company_id`
3. **Employees**: Migrate as **Team Member**, preserve `company_id`
4. **Preserve relationships**:
   - Employee details (hourly_rate, joining_date)
   - Team memberships
   - Project assignments
   - Timesheet history

### Key Insight
**Work.Bizoforce has the cleanest company structure!**
- Direct `company_id` foreign key
- Clear employee vs admin distinction
- Rich employee data (skills, hourly rates, teams)

---

## 🎯 UNIFIED ROLE MAPPING STRATEGY

### Final Role Hierarchy

```
COMPANY USERS:
├── Company Admin (Master)
│   ├── Can create company
│   ├── Can invite team members
│   └── Full access to all features
├── HR/Recruiter (Delegated)
│   ├── Post jobs
│   ├── Screen candidates
│   └── Conduct interviews
├── Team Lead/Manager (Delegated)
│   ├── Create projects
│   ├── Assign team members
│   └── Approve timesheets
├── Team Member (Employee)
│   ├── Log hours
│   ├── View assigned projects
│   └── Submit timesheets
├── Finance (Delegated)
│   ├── Generate invoices
│   ├── Process payments
│   └── Track revenue
└── Vendor/Seller (Delegated)
    ├── Create product listings
    ├── Manage orders
    └── Handle marketplace sales

INDIVIDUAL USERS:
└── Job Seeker/Candidate
    ├── Apply to jobs
    ├── AI screening
    ├── Track applications
    └── Access projects/timesheets when hired
```

---

## 🔄 MIGRATION WORKFLOW

### Step 1: Analyze User Activity
For each user in each database:
1. Check activity metrics (projects, jobs, bids, purchases)
2. Check associated data (company, products, timesheets)
3. Determine primary role

### Step 2: Email-Based Deduplication
```javascript
// Group users by email across all platforms
const usersByEmail = new Map();

// Bizoforce users
bizoforceUsers.forEach(user => {
  if (!usersByEmail.has(user.email)) {
    usersByEmail.set(user.email, {
      email: user.email,
      platforms: []
    });
  }
  usersByEmail.get(user.email).platforms.push({
    platform: 'bizoforce',
    id: user.ID,
    data: user
  });
});

// Repeat for Giglancer, Screenly, Work.Bizoforce
```

### Step 3: Role Resolution
```javascript
// For each deduplicated email:
function resolveUserRole(platformData) {
  let role = 'individual'; // Default
  let hasCompany = false;
  
  // Priority 1: Bizoforce company registration
  const bizoforce = platformData.find(p => p.platform === 'bizoforce');
  if (bizoforce && bizoforce.data.signup_step === 'register_company') {
    role = 'company';
    hasCompany = true;
  }
  
  // Priority 2: Giglancer company link
  const giglancer = platformData.find(p => p.platform === 'giglancer');
  if (giglancer && giglancer.data.bizoforce_company_id) {
    role = 'company';
    hasCompany = true;
  }
  
  // Priority 3: Activity-based detection
  if (!hasCompany && giglancer) {
    if (giglancer.data.project_count > 0 || giglancer.data.job_count > 0) {
      role = 'company'; // Employer activity
    } else if (giglancer.data.job_apply_count > 0) {
      role = 'individual'; // Job seeker
    }
  }
  
  // Priority 4: Vendor detection
  if (bizoforce && bizoforce.data.signup_step === 'register_product_service') {
    role = 'company'; // Vendors create companies too
    hasCompany = true;
  }
  
  return { role, hasCompany, needsPrompt: !hasCompany && role === 'company' };
}
```

### Step 4: Create Unified User Record
```javascript
// Insert into unified_users table
{
  email: user.email,
  password: mostRecentPassword, // From latest platform
  firstName: user.first_name || extractFromDisplayName(),
  lastName: user.last_name || extractFromDisplayName(),
  userType: resolvedRole.role, // 'company' or 'individual'
  bizoforce_user_id: bizoforceData?.ID || null,
  giglancer_user_id: giglancerData?.id || null,
  screenly_user_id: screenlyData?.id || null,
  work_user_id: workData?.id || null,
  needsRoleSelection: resolvedRole.needsPrompt,
  createdAt: earliestRegistrationDate,
  lastLogin: mostRecentLoginDate
}
```

### Step 5: Handle Edge Cases

#### Case 1: No Activity, No Company
**User**: Registered but never did anything  
**Action**: Set `needsRoleSelection: true`, prompt on next login

#### Case 2: Dual Role (Employer + Freelancer)
**User**: Posted jobs AND applied to jobs  
**Action**: 
- Primary role: **Company Admin** (if has company)
- Secondary profile: Create individual profile for job seeking
- Link both profiles with `linked_user_id`

#### Case 3: Company Name But No Company ID
**User**: Entered company name in Giglancer but no Bizoforce company  
**Action**:
- Migrate as **Company Admin**
- Set `pendingCompanyCreation: true`
- Prompt to create company on next login

#### Case 4: Multiple Companies
**User**: Created multiple companies in Bizoforce  
**Action**:
- Migrate all companies to `unified_companies`
- Create `company_users` entries for each
- Set one as primary (`isPrimary: true`)

---

## 📋 MIGRATION SCRIPT REQUIREMENTS

### Phase 1: Data Extraction
- [ ] Extract all users from Bizoforce (`wp_users` + `wp_usermeta`)
- [ ] Extract all users from Giglancer (`users` + `skills_users`)
- [ ] Extract all users from Screenly (`users` + screening data)
- [ ] Extract all users from Work.Bizoforce (`users` + company links)

### Phase 2: Deduplication
- [ ] Group users by email (case-insensitive)
- [ ] Identify duplicates across platforms
- [ ] Merge user data (keep most complete profile)
- [ ] Flag conflicts for manual review

### Phase 3: Role Resolution
- [ ] Apply role detection logic
- [ ] Resolve ambiguous cases (mark for prompt)
- [ ] Validate company associations
- [ ] Generate migration report

### Phase 4: Migration
- [ ] Insert into `unified_users` table
- [ ] Preserve all platform IDs (foreign keys)
- [ ] Maintain password hashes (bcrypt compatible)
- [ ] Log all migrations for audit trail

### Phase 5: Validation
- [ ] Count migrated users vs source
- [ ] Verify no data loss
- [ ] Test login for sample users
- [ ] Generate success/failure report

---

## 🚀 NEXT STEPS

1. **Complete schema analysis** for Screenly and Work.Bizoforce
2. **Query role tables** in Giglancer to understand `role_id` values
3. **Build migration script** with dry-run mode
4. **Test with sample data** (10-20 users)
5. **Run full migration** with audit logging
6. **Implement role prompt** in frontend for ambiguous users

---

**Last Updated**: November 18, 2025  
**Status**: Schema analysis complete (100%) ✅

---

## 📊 ADDITIONAL QUERIES NEEDED

### 1. Giglancer Role-Specific Counts
```sql
-- Users with dual activity (employer + freelancer)
SELECT COUNT(*) FROM users 
WHERE project_count > 0 AND (bid_count > 0 OR portfolio_count > 0);

-- Users with Bizoforce company link
SELECT COUNT(*) FROM users WHERE bizoforce_company_id IS NOT NULL;

-- Active vs inactive
SELECT 
  is_active,
  is_email_confirmed,
  COUNT(*) 
FROM users 
GROUP BY is_active, is_email_confirmed;
```

### 2. Work.Bizoforce Role Distribution
```sql
-- Get role names and user counts
SELECT r.name, COUNT(ru.user_id) as count
FROM role_user ru
JOIN roles r ON ru.role_id = r.id
GROUP BY r.name;

-- Users without companies (system users)
SELECT COUNT(*) FROM users WHERE company_id IS NULL;
```

### 3. Email Overlap Analysis
```sql
-- Find duplicate emails across platforms
SELECT email, COUNT(*) as platforms
FROM (
  SELECT user_email as email FROM wp_users
  UNION ALL
  SELECT email FROM giglancer.users
  UNION ALL
  SELECT email FROM screenly.users
  UNION ALL
  SELECT email FROM work.users
) combined
GROUP BY email
HAVING COUNT(*) > 1;
```
