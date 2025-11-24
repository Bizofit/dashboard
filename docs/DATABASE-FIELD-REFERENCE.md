# Database Field Reference Guide

## Critical Information for Development

**ALWAYS refer to this document before writing database queries!**

This document maps exact table and column names across all 5 databases to prevent field reference errors.

---

## 1. UNIFIED DATABASE (MySQL)

**Database**: `bizoforce_newdashboard`  
**Type**: MySQL  
**Purpose**: Master user registry, authentication, roles

### Table: `unified_users`

```sql
CREATE TABLE unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),

  -- Google OAuth
  google_id VARCHAR(255) UNIQUE,
  google_profile_picture VARCHAR(500),
  auth_provider ENUM('local', 'google', 'hybrid') DEFAULT 'local',

  -- User details
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),

  -- Platform foreign keys
  bizoforce_user_id INT,           -- Links to wp_users.ID
  giglancer_user_id BIGINT,        -- Links to users.id
  screenly_user_id INT,            -- Links to users.id
  work_user_id INT,                -- Links to users.id

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);
```

### Table: `user_roles`

```sql
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,                    -- FK to unified_users.id
  role VARCHAR(50) NOT NULL,               -- IMPORTANT: Column is 'role' NOT 'role_type'
  platform VARCHAR(50),                    -- 'unified', 'bizoforce', 'giglancer', 'screenly', 'work'
  company_id INT,
  is_primary BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  source_platform VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Valid Role Values**:

- `company_admin`
- `hr`
- `team_lead`
- `team_member`
- `finance`
- `vendor`
- `resource_provider`
- `freelancer`

### Table: `company_users`

```sql
CREATE TABLE company_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  role ENUM('company_admin','hr','team_lead','team_member','finance','vendor'),
  job_title VARCHAR(100),
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. WORK.BIZOFORCE DATABASE (MySQL)

**Database**: `bizoforce_work`  
**Type**: MySQL  
**Purpose**: Project management, timesheets, invoicing  
**Users**: 1,113+ (all get `company_admin` role)

### Table: `users`

```sql
-- Column names in Work database
id                    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
company_id            INT UNSIGNED              -- Company assignment
name                  VARCHAR(191) NOT NULL     -- Full name (NOT first_name/last_name)
email                 VARCHAR(191) NOT NULL UNIQUE
password              VARCHAR(191) NOT NULL
remember_token        VARCHAR(100)
image                 VARCHAR(191)
mobile                VARCHAR(191)
gender                ENUM('male','female','others') DEFAULT 'male'
locale                VARCHAR(191) DEFAULT 'en'
status                ENUM('active','deactive') DEFAULT 'active'
login                 ENUM('enable','disable') DEFAULT 'enable'
onesignal_player_id   TEXT
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

**Migration Logic**:

- ALL Work users → `company_admin` role (highest priority)
- Use `name` field (NOT first_name/last_name separately)
- Check `company_id IS NOT NULL` for company association

---

## 3. SCREENLY DATABASE (PostgreSQL)

**Database**: `bizoforce_screenly`  
**Type**: PostgreSQL  
**Purpose**: AI candidate screening  
**Users**: 24 users

### Table: `users`

```sql
-- Column names in Screenly database (PostgreSQL)
id                                INTEGER PRIMARY KEY
google_id                         VARCHAR
email                             VARCHAR NOT NULL
first_name                        VARCHAR
last_name                         VARCHAR
display_name                      VARCHAR
profile_image_url                 VARCHAR
is_active                         BOOLEAN DEFAULT TRUE
last_login_at                     TIMESTAMP
created_at                        TIMESTAMP DEFAULT NOW()
updated_at                        TIMESTAMP DEFAULT NOW()
password_hash                     VARCHAR
stripe_customer_id                VARCHAR
stripe_subscription_id            VARCHAR
subscription_plan                 VARCHAR DEFAULT 'free'
subscription_status               VARCHAR DEFAULT 'active'
subscription_current_period_end   TIMESTAMP
subscription_cancel_at_period_end BOOLEAN DEFAULT FALSE
usage_count                       INTEGER DEFAULT 0
company_name                      VARCHAR              -- KEY FIELD for role detection
```

**Migration Logic**:

- Check `company_name IS NOT NULL AND company_name != ''`
- If has company_name → `company_admin` role
- PostgreSQL uses `$1, $2, $3` placeholders (NOT `?`)

---

## 4. BIZOFORCE DATABASE (MySQL)

**Database**: `BizoforceGodaddyOct292025`  
**Type**: MySQL  
**Purpose**: WordPress/WooCommerce marketplace  
**Users**: 198,000+ users

### Table: `wp_users`

```sql
-- Column names in Bizoforce database
ID                    BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT  -- UPPERCASE 'ID'
user_login            VARCHAR(60) NOT NULL
user_pass             VARCHAR(255) NOT NULL
user_nicename         VARCHAR(50) NOT NULL
user_email            VARCHAR(100) NOT NULL      -- Email field
user_url              VARCHAR(100)
user_registered       DATETIME NOT NULL
user_activation_key   VARCHAR(255)
user_status           INT DEFAULT 0
display_name          VARCHAR(250) NOT NULL      -- Display name
signup_step           ENUM(...)
signup_progress       VARCHAR(8)
```

### Table: `wp_usermeta`

```sql
-- User metadata (roles stored here)
umeta_id    BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT
user_id     BIGINT UNSIGNED NOT NULL     -- FK to wp_users.ID
meta_key    VARCHAR(255)                 -- Key names below
meta_value  LONGTEXT                     -- Serialized PHP data
```

**Important Meta Keys**:

- `wp_capabilities` - User roles (serialized: `a:1:{s:13:"administrator";b:1;}`)
- `_wcfm_vendor` - Vendor status (`yes` = vendor)
- `pv_shop_name` - Vendor shop name
- `_wcfm_membership_id` - Vendor membership

### Vendor Detection Logic

```sql
-- Check if user is vendor (3 methods)
-- Method 1: Check vendor shop name
SELECT user_id FROM wp_usermeta
WHERE meta_key = 'pv_shop_name'
AND meta_value IS NOT NULL
AND meta_value != ''
AND user_id = ?

-- Method 2: Check WCFM vendor status
SELECT user_id FROM wp_usermeta
WHERE meta_key = '_wcfm_vendor'
AND meta_value = 'yes'
AND user_id = ?

-- Method 3: Check directory listings
SELECT COUNT(*) as count FROM wp_posts
WHERE post_type = 'wpcm_locations'
AND post_status = 'publish'
AND post_author = ?
```

**Migration Logic**:

- If vendor shop OR `_wcfm_vendor='yes'` → `vendor` + `company_admin` role
- If has directory listing (post_type='wpcm_locations') → `vendor` + `company_admin` role
- Regular subscribers (no shop, no listings) → NO ROLE (correctly skipped)

---

## 5. GIGLANCER DATABASE (MySQL)

**Database**: `bizoforce_giglancer`  
**Type**: MySQL  
**Purpose**: Job marketplace, freelancer platform  
**Users**: 82,000+ users

### Table: `users`

```sql
-- Column names in Giglancer database
id                              BIGINT PRIMARY KEY AUTO_INCREMENT
created_at                      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at                      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
role_id                         INT NOT NULL DEFAULT 2           -- Role identifier (NOT account_type)
username                        VARCHAR(510) NOT NULL
email                           VARCHAR(510) NOT NULL
password                        VARCHAR(200) NOT NULL
bid_count                       BIGINT DEFAULT 0                 -- Pre-counted bids submitted
won_bid_count                   BIGINT DEFAULT 0
user_login_count                BIGINT DEFAULT 0
project_count                   BIGINT DEFAULT 0                 -- Pre-counted projects posted
project_flag_count              BIGINT DEFAULT 0
job_flag_count                  BIGINT DEFAULT 0
quote_service_flag_count        BIGINT DEFAULT 0
portfolio_flag_count            BIGINT DEFAULT 0
available_wallet_amount         DOUBLE DEFAULT 0
ip_id                           BIGINT
last_login_ip_id                BIGINT
last_logged_in_time             TIMESTAMP
is_agree_terms_conditions       TINYINT(1) DEFAULT 0
is_active                       TINYINT(1) DEFAULT 0
is_email_confirmed              TINYINT(1) DEFAULT 0
total_amount_withdrawn          DOUBLE DEFAULT 0
job_count                       BIGINT DEFAULT 0                 -- Pre-counted jobs posted
job_apply_count                 BIGINT DEFAULT 0                 -- Pre-counted job applications
portfolio_count                 BIGINT DEFAULT 0
portfolio_favorite_count        BIGINT DEFAULT 0
quote_service_count             BIGINT DEFAULT 0
quote_request_count             BIGINT DEFAULT 0
quote_bid_count                 BIGINT DEFAULT 0
exams_user_count                INT DEFAULT 0
exams_user_passed_count         INT DEFAULT 0
```

**CRITICAL**: The column is `role_id` NOT `account_type`!

**Migration Logic**:

```javascript
// Use pre-counted columns (NO separate queries needed!)
const postedProjects = user.project_count || 0;
const submittedBids = user.bid_count || 0;
const postedJobs = user.job_count || 0;
const jobApplications = user.job_apply_count || 0;

// Determine role
if (postedProjects > submittedBids || postedJobs > jobApplications) {
  // Employer - posted more than applied
  roles = ["hr", "company_admin"];
} else {
  // Freelancer - applied more than posted
  roles = ["freelancer"];
}
```

---

## Common Migration Errors to Avoid

### ❌ Wrong Field Names

```javascript
// WRONG - These fields don't exist!
SELECT account_type FROM users  // Giglancer uses 'role_id' not 'account_type'
SELECT role_type FROM user_roles  // Column is 'role' not 'role_type'
SELECT first_name FROM users  // Work uses 'name' not 'first_name'
```

### ✅ Correct Field Names

```javascript
// CORRECT
SELECT role_id FROM users  // Giglancer
SELECT role FROM user_roles  // Unified
SELECT name FROM users  // Work
SELECT first_name FROM users  // Screenly (has both first_name and last_name)
```

### ❌ Wrong Primary Key

```javascript
// WRONG
SELECT id FROM wp_users  // Primary key is 'ID' (uppercase)
```

### ✅ Correct Primary Key

```javascript
// CORRECT
SELECT ID FROM wp_users  // Bizoforce uses uppercase 'ID'
```

### ❌ Wrong Placeholder Syntax

```javascript
// WRONG - PostgreSQL doesn't use '?'
screenlyPool.execute("SELECT * FROM users WHERE id = ?", [userId]);
```

### ✅ Correct Placeholder Syntax

```javascript
// CORRECT - PostgreSQL uses $1, $2, $3
screenlyPool.query("SELECT * FROM users WHERE id = $1", [userId]);

// MySQL uses ?
workPool.execute("SELECT * FROM users WHERE id = ?", [userId]);
```

---

## Platform Priority for Role Detection

When user exists in multiple platforms, detect roles in this order:

1. **Bizoforce** (★★★★★ HIGHEST PRIORITY)

   - **PRIORITY CHECK**:
     a) **First**: Check company listings (directory listings) → `company_admin`
     b) **If no listings**: Check vendor status (shop/products) → `vendor` + `company_admin`
   - NOTE: Company listings take priority over vendor status
   - Check methods: `wp_posts.post_type = 'wpbdp_listing'`, `pv_shop_name`, `_wcfm_vendor`

2. **Work.Bizoforce** (★★★★☆)

   - All users → `company_admin`
   - Check: `company_id IS NOT NULL`

3. **Screenly** (★★★☆☆)

   - Check: `company_name IS NOT NULL AND company_name != ''`
   - Role: `company_admin`

4. **Giglancer** (★★☆☆☆ Lowest Priority)
   - Check: `project_count > bid_count` OR `job_count > job_apply_count`
   - Role: `hr` + `company_admin` (employer) OR `freelancer`

---

## Query Patterns by Platform

### Work Database Queries

```javascript
// Get user by email
const [rows] = await workPool.execute(
  "SELECT id, company_id, name, email, status FROM users WHERE email = ? LIMIT 1",
  [email]
);

// Check company association
const hasCompany = rows[0].company_id !== null;
```

### Screenly Database Queries

```javascript
// PostgreSQL - use $1 placeholder
const result = await screenlyPool.query(
  "SELECT id, email, first_name, last_name, company_name FROM users WHERE email = $1 LIMIT 1",
  [email]
);

// Check company admin
const hasCompany =
  result.rows[0]?.company_name && result.rows[0].company_name !== "";
```

### Bizoforce Database Queries

```javascript
// Get user (note uppercase ID)
const [userRows] = await bizoforcePool.execute(
  "SELECT ID, user_email, display_name FROM wp_users WHERE user_email = ? LIMIT 1",
  [email]
);

// Check vendor shop
const [shopRows] = await bizoforcePool.execute(
  'SELECT meta_value FROM wp_usermeta WHERE user_id = ? AND meta_key = "pv_shop_name"',
  [userRows[0].ID]
);

const hasShop = shopRows[0]?.meta_value && shopRows[0].meta_value !== "";
```

### Giglancer Database Queries

```javascript
// Use pre-counted columns!
const [userRows] = await giglancerPool.execute(
  "SELECT id, role_id, project_count, bid_count, job_count, job_apply_count FROM users WHERE email = ? LIMIT 1",
  [email]
);

const user = userRows[0];
const postedProjects = user.project_count || 0;
const submittedBids = user.bid_count || 0;

// Determine if employer or freelancer
const isEmployer = postedProjects > submittedBids;
```

---

## Type Safety with TypeScript

### Define Platform-Specific Types

```typescript
// Work user type
interface WorkUser {
  id: number;
  company_id: number | null;
  name: string; // NOT first_name/last_name
  email: string;
  status: "active" | "deactive";
}

// Screenly user type (PostgreSQL)
interface ScreenlyUser {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null; // Key for role detection
}

// Bizoforce user type
interface BizoforceUser {
  ID: number; // UPPERCASE
  user_email: string;
  display_name: string;
}

// Giglancer user type
interface GiglancerUser {
  id: number;
  role_id: number; // NOT account_type
  email: string;
  project_count: number; // Pre-counted
  bid_count: number; // Pre-counted
  job_count: number; // Pre-counted
  job_apply_count: number; // Pre-counted
}
```

---

## Migration Function Template

```typescript
async function migrateUser(email: string) {
  // 1. Check if exists with roles
  const existing = await checkExistingUserWithRoles(email);
  if (existing && existing.roles.length > 0) {
    return existing; // Skip if already migrated
  }

  // 2. Detect across platforms (priority order)
  const workData = await checkWorkPresence(email);
  const screenlyData = await checkScreenlyPresence(email);
  const bizoforceData = await checkBizoforcePresence(email);
  const giglancerData = await checkGiglancerPresence(email);

  // 3. Determine roles
  const roles = [];

  if (workData.found && workData.companyId) {
    roles.push("company_admin");
  }

  if (screenlyData.found && screenlyData.companyName) {
    if (!roles.includes("company_admin")) roles.push("company_admin");
  }

  if (
    bizoforceData.found &&
    (bizoforceData.isVendor || bizoforceData.hasDirectoryListing)
  ) {
    roles.push("vendor");
    if (!roles.includes("company_admin")) roles.push("company_admin");
  }

  if (giglancerData.found) {
    if (giglancerData.postedProjects > giglancerData.submittedBids) {
      if (!roles.includes("hr")) roles.push("hr");
      if (!roles.includes("company_admin")) roles.push("company_admin");
    } else {
      roles.push("freelancer");
    }
  }

  // 4. Create or update user
  if (!existing) {
    // Insert new user
    await createUnifiedUser(email, {
      workUserId: workData.userId,
      screenlyUserId: screenlyData.userId,
      bizoforceUserId: bizoforceData.userId,
      giglancerUserId: giglancerData.userId,
    });
  } else {
    // Update platform IDs
    await updateUnifiedUser(existing.id, {
      workUserId: workData.userId,
      screenlyUserId: screenlyData.userId,
      bizoforceUserId: bizoforceData.userId,
      giglancerUserId: giglancerData.userId,
    });
  }

  // 5. Insert roles
  for (const role of roles) {
    await insertUserRole(userId, role, primaryPlatform);
  }
}
```

---

## Testing Checklist

Before deploying migration code:

- [ ] Verify all column names match schema exactly
- [ ] Use correct placeholder syntax (? for MySQL, $1 for PostgreSQL)
- [ ] Check uppercase/lowercase (wp_users.ID not id)
- [ ] Test with sample users from each platform
- [ ] Verify role assignment logic matches priority
- [ ] Confirm existing users with roles are skipped
- [ ] Check that users without business activity get no role

---

_Last Updated: November 24, 2025_  
_Always reference this document before writing database queries!_
