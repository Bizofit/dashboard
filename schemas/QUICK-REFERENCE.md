# Quick Schema Reference Guide

Quick lookup for the most commonly used tables when building APIs.

## 🔍 Quick Find

### Authentication & Users

```typescript
// Unified DB
unified_users; // Master user registry
user_roles; // Multi-role assignments
oauth_tokens; // OAuth refresh tokens
sessions; // Session storage

// Bizoforce (WordPress)
wp_users; // WordPress users (198K+)
wp_usermeta; // User roles & metadata
```

### Companies

```typescript
// Unified DB
companies; // Company profiles

// Screenly
companies; // Company accounts with subscription info

// Giglancer
companies; // Employer companies
```

### Jobs & Hiring

```typescript
// Giglancer
jobs; // Job postings
job_applications; // Applications
job_categories; // Job categories
freelancer_profiles; // Freelancer details

// Screenly
candidates; // Job candidates
screenings; // AI screening results
interviews; // Interview schedules
```

### Products & Sales

```typescript
// Bizoforce (WordPress/WooCommerce)
wp_posts              // Products (post_type = 'product')
wp_postmeta           // Product metadata (_price, _stock, etc.)
wp_woocommerce_orders // Orders
wp_woocommerce_order_items // Order line items
wc_vendors_*          // Vendor-specific tables
```

### Projects & Timesheets

```typescript
// Work.Bizoforce
projects; // Project management
project_time_logs; // Timesheet entries
project_members; // Team assignments
invoices; // Billing
attendances; // Attendance tracking
```

## 📋 Common Query Patterns

### Get User with All Roles

```typescript
import { UnifiedUsers, UserRoles } from "@/schemas/unified-types";

const [users] = await unifiedDB.query<UnifiedUsers[]>(
  `SELECT u.*, ur.role, ur.platform, ur.company_id
   FROM unified_users u
   LEFT JOIN user_roles ur ON u.id = ur.user_id
   WHERE u.email = ?`,
  [email]
);
```

### Get WooCommerce Sales Stats

```typescript
import { WpPosts } from "@/schemas/bizoforce-types";

const [stats] = await bizoforceDB.query(
  `SELECT 
    COUNT(DISTINCT ID) as total_orders,
    SUM(CAST(meta_total.meta_value AS DECIMAL(10,2))) as total_sales
   FROM wp_posts orders
   LEFT JOIN wp_postmeta meta_total 
     ON orders.ID = meta_total.post_id 
     AND meta_total.meta_key = '_order_total'
   WHERE orders.post_type = 'shop_order'
   AND orders.post_status IN ('wc-completed', 'wc-processing')`
);
```

### Get Active Jobs

```typescript
import { Jobs } from "@/schemas/giglancer-types";

const [jobs] = await giglancerDB.query<Jobs[]>(
  `SELECT * FROM jobs 
   WHERE status = 'active' 
   AND deadline > NOW()
   ORDER BY created_at DESC
   LIMIT 10`
);
```

### Get Project Timesheets

```typescript
import { ProjectTimeLogs } from "@/schemas/work-types";

const [timesheets] = await workDB.query<ProjectTimeLogs[]>(
  `SELECT ptl.*, p.project_name, u.name as user_name
   FROM project_time_logs ptl
   JOIN projects p ON ptl.project_id = p.id
   JOIN users u ON ptl.user_id = u.id
   WHERE p.company_id = ?
   AND ptl.start_time >= ?
   ORDER BY ptl.start_time DESC`,
  [companyId, startDate]
);
```

## 🎯 Table Name Mappings

### Common Mistakes to Avoid

| ❌ Wrong           | ✅ Correct                          | Database         |
| ------------------ | ----------------------------------- | ---------------- |
| `roles`            | `user_roles`                        | Unified          |
| `role_name`        | `role`                              | Unified (column) |
| `users` (multiple) | Check context!                      | All databases    |
| `orders`           | `wp_posts` (post_type='shop_order') | Bizoforce        |
| `products`         | `wp_posts` (post_type='product')    | Bizoforce        |
| `job_applications` | May not exist in all schemas        | Giglancer        |

## 📊 Column Name Quick Reference

### unified_users

```typescript
id; // Primary key
email; // Unique email
password_hash; // bcrypt hash (nullable for OAuth)
google_id; // Google OAuth ID
first_name, last_name; // User names
bizoforce_user_id; // FK to wp_users.ID
giglancer_user_id; // FK to giglancer users.id
screenly_user_id; // FK to screenly users.id
work_user_id; // FK to work users.id
auth_provider; // 'local', 'google', 'hybrid'
created_at, updated_at;
```

### user_roles

```typescript
id; // Primary key
user_id; // FK to unified_users.id
role; // 'company_admin', 'hr', 'vendor', etc.
platform; // 'bizoforce', 'giglancer', 'screenly', 'work'
company_id; // FK to companies.id
is_primary; // Boolean flag for primary role
created_at;
```

### wp_users (Bizoforce)

```typescript
ID; // Primary key
user_login; // Username
user_email; // Email
user_registered; // Registration date
display_name; // Display name
```

### jobs (Giglancer)

```typescript
id; // Primary key
title; // Job title
description; // Job description
user_id; // FK to users.id (employer)
category_id; // FK to job_categories.id
budget_min, budget_max;
deadline; // Application deadline
status; // 'active', 'closed', 'filled'
created_at, updated_at;
```

### projects (Work)

```typescript
id; // Primary key
project_name; // Project name
company_id; // FK to companies.id
start_date, deadline;
budget; // Project budget
status; // 'active', 'completed', etc.
created_at, updated_at;
```

## 🔗 Foreign Key Relationships

```
unified_users
  ├─> user_roles (user_id)
  ├─> oauth_tokens (user_id)
  ├─> sessions (user_id)
  ├─> wp_users (bizoforce_user_id -> ID)
  ├─> giglancer.users (giglancer_user_id -> id)
  ├─> screenly.users (screenly_user_id -> id)
  └─> work.users (work_user_id -> id)

user_roles
  ├─> unified_users (user_id)
  └─> companies (company_id)

companies
  ├─> user_roles (company_id)
  └─> projects (company_id)
```

## 💡 Pro Tips

1. **Always join with unified_users first** when querying across databases
2. **Use schema files to verify column names** before writing queries
3. **Check indexes** in markdown docs for query optimization
4. **PostgreSQL uses different syntax**: Use `$1, $2` instead of `?` for Screenly
5. **WordPress post types are critical**: Filter by `post_type` and `post_status`
6. **Vendor tables use custom prefix**: Look for `wc_vendors_*` or `wcvendors_*`

## 🚀 API Development Workflow

1. **Check schema**: Open relevant `*-schema.md` file
2. **Import types**: Use `*-types.ts` for TypeScript interfaces
3. **Write query**: Reference column names from schema
4. **Test query**: Use direct database connection first
5. **Add to API**: Create route handler with proper types
6. **Validate**: Test with real data

---

**Quick Links:**

- [Full Unified Schema](./unified-schema.md)
- [Bizoforce Schema](./bizoforce-schema.md) (732 tables)
- [Giglancer Schema](./giglancer-schema.md) (162 tables)
- [Work Schema](./work-schema.md) (226 tables)
- [Screenly Schema](./screenly-schema.md) (51 tables)
- [Main README](./README.md)
