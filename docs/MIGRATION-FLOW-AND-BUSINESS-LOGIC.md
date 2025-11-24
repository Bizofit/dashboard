# Migration Flow and Business Logic Documentation

## Overview

This document describes the complete user migration flow, business logic, and system architecture for the Bizoforce Unified Dashboard. It serves as the definitive reference for understanding how the system works.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Migration Flow](#migration-flow)
3. [Platform Priority System](#platform-priority-system)
4. [Role Detection Logic](#role-detection-logic)
5. [Database Operations](#database-operations)
6. [Error Handling](#error-handling)
7. [Business Rules](#business-rules)

---

## System Architecture

### Database Topology

```
┌─────────────────────────────────────────────────────────────┐
│                     UNIFIED DATABASE                         │
│                 (bizoforce_newdashboard)                     │
│                                                               │
│  ┌─────────────────┐     ┌──────────────────┐              │
│  │ unified_users   │────▶│   user_roles     │              │
│  │ (Master Registry│     │ (Multi-role)     │              │
│  │  + Platform IDs)│     │                  │              │
│  └─────────────────┘     └──────────────────┘              │
│           │                                                  │
│           │ Platform Foreign Keys:                          │
│           ├─ bizoforce_user_id → wp_users.ID               │
│           ├─ giglancer_user_id → users.id                   │
│           ├─ screenly_user_id → users.id                    │
│           └─ work_user_id → users.id                        │
└─────────────────────────────────────────────────────────────┘
            │           │           │            │
            ▼           ▼           ▼            ▼
  ┌─────────────┐ ┌───────────┐ ┌─────────┐ ┌─────────┐
  │  Bizoforce  │ │ Giglancer │ │ Screenly│ │  Work   │
  │   (MySQL)   │ │  (MySQL)  │ │ (Postgres)│(MySQL)  │
  │ 198K users  │ │ 82K users │ │ 24 users│ │1.1K users│
  │  wp_users   │ │   users   │ │  users  │ │ users   │
  └─────────────┘ └───────────┘ └─────────┘ └─────────┘
```

### User Data Flow

```
User Email (Primary Identifier)
        │
        ├─▶ Check if exists in unified_users
        │   ├─ YES: Check if has roles in user_roles
        │   │       ├─ YES: Return existing user (skip migration)
        │   │       └─ NO:  Continue to platform detection
        │   └─ NO:  Continue to platform detection
        │
        ├─▶ Platform Detection (Priority Order: 1→2→3→4)
        │   ├─ 1. Work.Bizoforce    → company_admin
        │   ├─ 2. Screenly          → company_admin (if company_name)
        │   ├─ 3. Bizoforce         → vendor/company_admin (if shop/listings)
        │   └─ 4. Giglancer         → hr/company_admin or freelancer
        │
        ├─▶ Role Determination
        │   └─ Combine roles from all platforms (deduplicated)
        │
        ├─▶ User Creation/Update
        │   ├─ New user: INSERT INTO unified_users
        │   └─ Existing: UPDATE platform IDs
        │
        └─▶ Role Assignment
            └─ INSERT INTO user_roles (one row per role)
```

---

## Migration Flow

### High-Level Process

```
START Migration
    │
    ├─▶ Fetch all unique emails from 4 platforms
    │   ├─ Work: SELECT DISTINCT email FROM users
    │   ├─ Screenly: SELECT DISTINCT email FROM users
    │   ├─ Bizoforce: SELECT DISTINCT user_email FROM wp_users
    │   └─ Giglancer: SELECT DISTINCT email FROM users
    │
    ├─▶ Deduplicate emails (convert to lowercase, Set data structure)
    │   Total unique emails: ~280,000
    │
    ├─▶ For each email:
    │   ├─ Call migrateUserWithSmartDetection(email)
    │   │   ├─ Check existing user + roles
    │   │   ├─ Platform detection (4 queries)
    │   │   ├─ Role determination (business logic)
    │   │   ├─ User creation/update
    │   │   └─ Role insertion
    │   │
    │   └─ Log progress every 100 users
    │
    └─▶ END Migration
        └─ Return statistics: migrated, skipped, errors
```

### Detailed Migration Function Flow

```typescript
// Function: migrateUserWithSmartDetection(email: string)

1. Check Existing User with Roles
   ├─ Query: SELECT * FROM unified_users WHERE email = ?
   ├─ If found:
   │   ├─ Query: SELECT * FROM user_roles WHERE user_id = ?
   │   └─ If has roles: RETURN early (already migrated)
   └─ Continue if no user OR user exists without roles

2. Platform Detection (Parallel Queries)
   ├─ checkWorkPresence(email)
   │   └─ Query: SELECT u.id, ed.company_id, c.company_name
   │             FROM users u
   │             LEFT JOIN employee_details ed ON u.id = ed.user_id
   │             LEFT JOIN companies c ON ed.company_id = c.id
   │             WHERE u.email = ?
   │
   ├─ checkScreenlyPresence(email)
   │   └─ Query: SELECT id, company_name, company_id
   │             FROM users
   │             WHERE email = $1 AND company_name IS NOT NULL
   │
   ├─ checkBizoforcePresence(email)
   │   ├─ Query 1: SELECT ID FROM wp_users WHERE user_email = ?
   │   ├─ Query 2: SELECT meta_value FROM wp_usermeta
   │   │           WHERE user_id = ? AND meta_key = 'pv_shop_name'
   │   ├─ Query 3: SELECT meta_value FROM wp_usermeta
   │   │           WHERE user_id = ? AND meta_key = 'wp_capabilities'
   │   └─ Query 4: SELECT post_title FROM wp_posts
   │               WHERE post_author = ? AND post_type = 'wpbdp_listing'
   │
   └─ checkGiglancerPresence(email)
       └─ Query: SELECT id, role_id, project_count, bid_count,
                        job_count, job_apply_count
                 FROM users WHERE email = ?

3. Determine Roles (Business Logic)
   ├─ Priority 1: Work found → ['company_admin']
   ├─ Priority 2: Screenly found + company_name → ['company_admin']
   ├─ Priority 3: Bizoforce found + (vendor OR listings) → ['vendor', 'company_admin']
   └─ Priority 4: Giglancer found
       ├─ If project_count > bid_count → ['hr', 'company_admin']
       └─ If bid_count > project_count → ['freelancer']

4. Create or Update User
   ├─ If NOT existing:
   │   └─ INSERT INTO unified_users (email, password_hash, first_name, last_name,
   │                                  bizoforce_user_id, giglancer_user_id,
   │                                  screenly_user_id, work_user_id)
   └─ If existing:
       └─ UPDATE unified_users
           SET bizoforce_user_id = ?, giglancer_user_id = ?,
               screenly_user_id = ?, work_user_id = ?
           WHERE id = ?

5. Insert Roles
   ├─ For each role in determined roles:
   │   └─ INSERT INTO user_roles (user_id, role, platform,
   │                               is_primary, is_active, source_platform)
   └─ Set is_primary = TRUE for first role (primaryRole)

6. Return MigrationResult
   └─ { success, userId, email, roles, primaryRole, needsRoleSelection,
        platformsFound, message }
```

---

## Platform Priority System

### Why Priority Matters

Users can exist in multiple platforms with different roles. The priority system ensures consistent role assignment based on business value and user intent.

### Priority Levels

**Priority 1: Bizoforce (★★★★★ HIGHEST)**

- **Reason**: Company directory listings are most valuable business data
- **Business Logic**:
  - **PRIORITY CHECK**:
    a) **First**: Check if user has company listings (directory listings) → `company_admin`
    b) **If no listings**: Check if user is vendor (shop/products) → `vendor` + `company_admin`
  - NOTE: Company listings take priority over vendor status
- **Role Assignment**:
  - Company listings → `company_admin`
  - Vendors with shop → `vendor` + `company_admin`
  - Regular subscribers → NO ROLE (correctly skipped)
- **Detection**:
  - Check `wp_posts.post_type = 'wpbdp_listing'` (directory listing) FIRST
  - Check `wp_usermeta.pv_shop_name` (vendor shop)
  - Check `wp_usermeta._wcfm_vendor = 'yes'` (WCFM vendor)
- **Business Value**: ★★★★★ (Company listings = highest value, marketplace revenue)

**Priority 2: Work.Bizoforce (★★★★☆)**

- **Reason**: Active company management platform
- **Business Logic**: Users here are actively managing projects/teams
- **Role Assignment**: ALL Work users → `company_admin`
- **Detection**: Check if user has `company_id` associated
- **Business Value**: ★★★★☆ (High engagement, paying customers)

**Priority 3: Screenly (★★★☆☆)**

- **Reason**: AI screening platform for companies
- **Business Logic**: Users with company profiles are hiring managers
- **Role Assignment**: Users with `company_name` → `company_admin`
- **Detection**: Check `company_name IS NOT NULL AND company_name != ''`
- **Business Value**: ★★★☆☆ (Active hiring, subscription customers)

**Priority 4: Giglancer (★★☆☆☆ Lowest)**

- **Reason**: Job marketplace (freelancers + employers)
- **Business Logic**: Activity analysis to determine employer vs freelancer
- **Role Assignment**:
  - `project_count > bid_count` → `hr` + `company_admin` (employer)
  - `bid_count > project_count` → `freelancer`
  - Equal counts → Ambiguous (may need selection)
- **Detection**: Use pre-counted columns (no separate queries)
- **Business Value**: ★★☆☆☆ (Job postings, talent acquisition)

### Priority Resolution Examples

**Example 1: User in Work + Bizoforce**

```
Detection:
- Work: Found (company_id = 5)
- Bizoforce: Found (has vendor shop)

Result:
- Roles: ['company_admin', 'vendor']
- Primary Role: 'company_admin' (Work takes priority)
- Platforms: ['work', 'bizoforce']
```

**Example 2: User in Screenly + Giglancer**

```
Detection:
- Screenly: Found (company_name = 'TechCorp')
- Giglancer: Found (posted 20 projects, 5 bids)

Result:
- Roles: ['company_admin', 'hr']
- Primary Role: 'company_admin' (Screenly takes priority)
- Platforms: ['screenly', 'giglancer']
```

**Example 3: User only in Giglancer (Freelancer)**

```
Detection:
- Giglancer: Found (posted 2 projects, 50 bids)

Result:
- Roles: ['freelancer']
- Primary Role: 'freelancer'
- Platforms: ['giglancer']
```

**Example 4: User in Bizoforce (Subscriber, No Business Activity)**

```
Detection:
- Bizoforce: Found (subscriber, no shop, no listings)

Result:
- Roles: [] (empty - correctly gets NO role)
- Skipped: User not migrated
- Reason: "User not found in any platform" (no business activity)
```

---

## Role Detection Logic

### Role Types

```typescript
type UserRole =
  | "company_admin" // Full company management access
  | "hr" // Hiring, job postings, candidate screening
  | "team_lead" // Project management, team assignments
  | "team_member" // Timesheet logging, project participation
  | "finance" // Invoicing, payments, revenue tracking
  | "vendor" // Product listings, marketplace sales
  | "resource_provider" // Talent pool contribution
  | "freelancer"; // Job applications, project bids
```

### Detection Rules by Platform

#### Work.Bizoforce

```typescript
if (workData.found && workData.companyId !== null) {
  roles.push("company_admin");
  // Rationale: All Work users are managing companies/projects
}
```

#### Screenly

```typescript
if (
  screenlyData.found &&
  screenlyData.companyName &&
  screenlyData.companyName !== ""
) {
  if (!roles.includes("company_admin")) {
    roles.push("company_admin");
  }
  // Rationale: Company profile indicates hiring/screening authority
}
```

#### Bizoforce

```typescript
if (bizoforceData.found) {
  // Check admin role
  if (bizoforceData.isAdmin) {
    if (!roles.includes("company_admin")) {
      roles.push("company_admin");
    }
  }

  // Check vendor status
  if (bizoforceData.isVendor || bizoforceData.hasDirectoryListing) {
    if (!roles.includes("vendor")) {
      roles.push("vendor");
    }
    if (!roles.includes("company_admin")) {
      roles.push("company_admin");
    }
    // Rationale: Vendors are business owners selling products/services
  }

  // If regular subscriber (no shop, no listings), skip
  if (
    !bizoforceData.isVendor &&
    !bizoforceData.hasDirectoryListing &&
    !bizoforceData.isAdmin
  ) {
    // NO ROLE ASSIGNED (correctly)
  }
}
```

#### Giglancer

```typescript
if (giglancerData.found) {
  const postedProjects = giglancerData.postedProjects || 0;
  const submittedBids = giglancerData.submittedBids || 0;
  const postedJobs = giglancerData.postedJobs || 0;
  const jobApplications = giglancerData.jobApplications || 0;

  // Calculate employer vs freelancer activity
  const employerActivity = postedProjects + postedJobs;
  const freelancerActivity = submittedBids + jobApplications;

  if (employerActivity > freelancerActivity) {
    // Employer: More posting than bidding
    if (!roles.includes("hr")) {
      roles.push("hr");
    }
    if (!roles.includes("company_admin")) {
      roles.push("company_admin");
    }
    // Rationale: Posting jobs/projects indicates hiring authority
  } else if (freelancerActivity > employerActivity) {
    // Freelancer: More bidding than posting
    roles.push("freelancer");
    // Rationale: Bidding on jobs indicates talent seeking work
  }
  // If equal, ambiguous - may need user selection (future feature)
}
```

### Primary Role Selection

```typescript
// Priority order for primary role
if (roles.includes("company_admin")) {
  primaryRole = "company_admin"; // Highest priority
} else if (roles.includes("vendor")) {
  primaryRole = "vendor";
} else if (roles.includes("hr")) {
  primaryRole = "hr";
} else if (roles.includes("freelancer")) {
  primaryRole = "freelancer";
} else {
  primaryRole = roles[0] || ""; // Fallback to first role
}
```

---

## Database Operations

### Query Patterns

#### MySQL Queries (Work, Bizoforce, Giglancer, Unified)

```sql
-- Use ? placeholders
SELECT * FROM users WHERE email = ?

-- Work database (note: 'name' not 'first_name/last_name')
SELECT id, company_id, name, email, status
FROM users
WHERE email = ?
LIMIT 1

-- Bizoforce (note: uppercase 'ID', 'user_email')
SELECT ID, user_email, display_name
FROM wp_users
WHERE user_email = ?
LIMIT 1

-- Giglancer (note: 'role_id' not 'account_type', use pre-counted columns)
SELECT id, role_id, project_count, bid_count, job_count, job_apply_count
FROM users
WHERE email = ?
LIMIT 1

-- Unified database (note: 'role' not 'role_type')
SELECT user_id, role, platform, is_primary
FROM user_roles
WHERE user_id = ?
```

#### PostgreSQL Queries (Screenly Only)

```sql
-- Use $1, $2, $3 placeholders (NOT ?)
SELECT id, email, first_name, last_name, company_name
FROM users
WHERE email = $1
LIMIT 1
```

### Common Mistakes to Avoid

❌ **WRONG**:

```sql
-- Giglancer
SELECT account_type FROM users WHERE email = ?  -- Column is 'role_id' not 'account_type'

-- Unified
SELECT role_type FROM user_roles WHERE user_id = ?  -- Column is 'role' not 'role_type'

-- Work
SELECT first_name, last_name FROM users WHERE email = ?  -- Column is 'name' (full name)

-- Bizoforce
SELECT id FROM wp_users WHERE user_email = ?  -- Primary key is 'ID' (uppercase)

-- Screenly (PostgreSQL)
SELECT * FROM users WHERE email = ?  -- Must use $1 placeholder
```

✅ **CORRECT**:

```sql
-- Giglancer
SELECT role_id FROM users WHERE email = ?

-- Unified
SELECT role FROM user_roles WHERE user_id = ?

-- Work
SELECT name FROM users WHERE email = ?

-- Bizoforce
SELECT ID FROM wp_users WHERE user_email = ?

-- Screenly (PostgreSQL)
SELECT * FROM users WHERE email = $1
```

---

## Error Handling

### Migration Error Types

1. **Platform Connection Errors**

   - Database unreachable
   - Credentials invalid
   - Network timeout

2. **Data Integrity Errors**

   - Duplicate email across platforms
   - Missing required fields
   - Invalid foreign keys

3. **Query Errors**

   - Wrong column names (ER_BAD_FIELD_ERROR)
   - Wrong placeholder syntax (PostgreSQL $1 vs MySQL ?)
   - Table not found

4. **Business Logic Errors**
   - Unable to determine role
   - Ambiguous role assignment
   - Platform data inconsistency

### Error Handling Strategy

```typescript
try {
  // Migration logic
  const result = await migrateUserWithSmartDetection(email);

  if (result.success) {
    migrated++;
  } else {
    errors++;
    console.error(`❌ Failed to migrate ${email}: ${result.message}`);
  }
} catch (error) {
  errors++;
  console.error(`❌ Exception migrating ${email}:`, error);

  // Log to migration_errors table (future)
  // await logMigrationError(email, error);
}
```

### Retry Logic

For transient errors (network timeouts, deadlocks):

```typescript
async function migrateWithRetry(email: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await migrateUserWithSmartDetection(email);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      console.log(`Retry ${attempt}/${maxRetries} for ${email}`);
      await sleep(1000 * attempt); // Exponential backoff
    }
  }
}
```

---

## Business Rules

### User Migration Rules

1. **Email is Primary Identifier**

   - All email comparisons are case-insensitive
   - Emails converted to lowercase before comparison
   - Duplicate emails across platforms are consolidated

2. **Platform ID Preservation**

   - Original platform user IDs are preserved as foreign keys
   - Enables bidirectional lookups (unified ↔ platform)
   - Required for data aggregation across platforms

3. **Role Assignment Rules**

   - Users must have business activity to get roles
   - Regular subscribers (no shop, no projects) get NO role
   - Multiple roles allowed (vendor + company_admin common)
   - Primary role used for default dashboard redirect

4. **Idempotency**

   - Re-running migration on same user is safe
   - Existing users with roles are skipped
   - Existing users without roles get role assignment
   - No duplicate role insertions

5. **Data Consistency**
   - Transaction boundaries for user + role creation
   - Rollback on error (future: wrap in transaction)
   - Audit trail via created_at timestamps

### Business Value Metrics

**Lead Generation**:

- Freelancers → Talent pool for companies to search
- Job seekers → Candidate pipeline for AI screening
- Metric: Total talent pool size, skills coverage

**Sales Enablement**:

- Vendors → Product/service marketplace
- Company listings → Business directory
- Metric: Active vendors, product listings, transactions

**Talent Acquisition Speed**:

- Work users → Active hiring companies
- Screenly users → AI screening pipeline
- Metric: Time-to-hire reduction, interview scheduling

**Project Efficiency**:

- Work users → Timesheet tracking, invoicing
- Team members → Billable hours logged
- Metric: Project profitability, invoice automation

---

## Migration Performance

### Current Statistics (November 24, 2025)

- **Total Unique Emails**: ~280,000
- **Total Users Migrated**: 23,899 (8.5%)
- **Users with Roles**: 15,769 (66% of migrated)
- **Users WITHOUT Roles**: 8,130 (34% - correctly skipped subscribers)
- **Migration Speed**: ~100-200 users/minute
- **Estimated Completion**: 20-40 hours (full migration)

### Performance Optimization

1. **Batch Processing**

   - Fetch all emails upfront (avoid repeated queries)
   - Process in batches of 100 users
   - Log progress every 100 users

2. **Query Optimization**

   - Use pre-counted columns (Giglancer: project_count, bid_count)
   - Avoid separate COUNT(\*) queries
   - Index on email columns (all platforms)

3. **Connection Pooling**

   - Reuse database connections
   - Pool size: 10 connections per database
   - Prevents connection exhaustion

4. **Error Resilience**
   - Catch and log errors per user
   - Continue processing on error (don't abort entire migration)
   - Retry transient errors with exponential backoff

---

## Testing Checklist

Before deploying migration changes:

- [ ] Verify all column names match schema (DATABASE-FIELD-REFERENCE.md)
- [ ] Test Work user detection (company_id association)
- [ ] Test Screenly user detection (company_name check)
- [ ] Test Bizoforce vendor detection (shop + listings)
- [ ] Test Giglancer role logic (projects vs bids)
- [ ] Test existing user with roles (should skip)
- [ ] Test existing user without roles (should assign)
- [ ] Test user not in any platform (should skip)
- [ ] Test user in multiple platforms (priority order)
- [ ] Verify role deduplication (no duplicate roles)
- [ ] Check primary role selection logic
- [ ] Test PostgreSQL $1 placeholders (Screenly)
- [ ] Test MySQL ? placeholders (others)
- [ ] Verify transaction rollback on error
- [ ] Check migration statistics accuracy

---

## Future Enhancements

1. **Role Selection Popup**

   - For ambiguous cases (Giglancer equal counts)
   - User chooses primary role on first login
   - Stored in user_roles table

2. **Migration Audit Log**

   - Table: `migration_log`
   - Track: email, timestamp, source platforms, roles assigned, status
   - Enable rollback and debugging

3. **Incremental Migration**

   - Cron job to migrate new users daily
   - Detect new signups across platforms
   - Auto-migrate on first login attempt

4. **Data Validation**

   - Pre-migration data quality checks
   - Identify duplicate emails across platforms
   - Flag inconsistent data (same email, different names)

5. **Performance Monitoring**
   - Track migration speed (users/minute)
   - Alert on errors above threshold
   - Dashboard for migration progress

---

_Last Updated: November 24, 2025_  
_This document is the definitive reference for migration logic and business rules._
