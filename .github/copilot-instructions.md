# Bizoforce Unified Dashboard - Full Stack Application

## 🔴 STOP! READ THIS FIRST - DATABASE SAFETY CHECKLIST

**Before writing ANY database code, complete this checklist:**

- [ ] ✅ Opened `.env` file and verified database credentials
- [ ] ✅ Opened `schemas/[database]-schema.json` and verified table name exists
- [ ] ✅ Verified EXACT field names from schema (case-sensitive)
- [ ] ✅ Added try-catch block with error handling
- [ ] ✅ Return safe defaults ([], 0, null) on errors, never crash

**Why This Matters:**

- Wrong credentials = Connection failure
- Wrong table name = `ER_NO_SUCH_TABLE` error
- Wrong field name = `ER_BAD_FIELD_ERROR` error
- No error handling = Application crash

**Common Errors in Logs:**

```
❌ Unknown column 'account_type' → Should be 'role_id' (Giglancer)
❌ Table 'job_applications' doesn't exist → Check schema file
❌ Table 'timesheets' doesn't exist → Check schema file
```

---

## 🚨 CRITICAL RULES - MUST FOLLOW EVERY TIME

### Rule #1: ALWAYS Verify Database Credentials from .env File

**Before ANY database connection or query:**

1. ✅ Open `.env` file and check the EXACT credentials
2. ✅ Verify host, user, password, and database name
3. ✅ Never assume or use cached credentials
4. ❌ Never hardcode credentials
5. ❌ Never guess database names

### Rule #2: ALWAYS Verify Table and Field Names from Database Schema

**Before writing ANY SQL query:**

1. ✅ Check `schemas/` directory for the specific database schema
2. ✅ Verify table name exists in that database
3. ✅ Verify field names match EXACTLY (case-sensitive)
4. ✅ Check data types and constraints
5. ❌ Never assume field names from other databases
6. ❌ Never use common names without verification

**Schema Files Location:**

- `schemas/unified-schema.json` - Unified database tables
- `schemas/bizoforce-schema.json` - Bizoforce (WordPress) tables
- `schemas/giglancer-schema.json` - Giglancer tables
- `schemas/screenly-schema.json` - Screenly tables
- `schemas/work-schema.json` - Work.Bizoforce tables

### Rule #3: ALWAYS Handle Missing Tables/Fields Gracefully

**When querying legacy databases:**

1. ✅ Wrap queries in try-catch blocks
2. ✅ Return empty results ([], 0, null) on table/field errors
3. ✅ Log errors for debugging
4. ❌ Never let table/field errors crash the application
5. ❌ Never assume all tables exist in all environments

---

## 📋 MANDATORY WORKFLOW FOR DATABASE OPERATIONS

**THIS WORKFLOW MUST BE FOLLOWED FOR EVERY DATABASE QUERY - NO EXCEPTIONS!**

### Step 1: Verify Database Credentials (ALWAYS)

```bash
# 1. Open .env file
cat .env | grep -E "DB_HOST|DB_USER|DB_PASS|DB_NAME"

# 2. Confirm exact values:
# - UNIFIED_DB_HOST, UNIFIED_DB_USER, UNIFIED_DB_PASS, UNIFIED_DB_NAME
# - BIZOFORCE_DB_HOST, BIZOFORCE_DB_USER, BIZOFORCE_DB_PASS, BIZOFORCE_DB_NAME
# - GIGLANCER_DB_HOST, GIGLANCER_DB_USER, GIGLANCER_DB_PASS, GIGLANCER_DB_NAME
# - SCREENLY_DB_HOST, SCREENLY_DB_USER, SCREENLY_DB_PASS, SCREENLY_DB_NAME
# - WORK_DB_HOST, WORK_DB_USER, WORK_DB_PASS, WORK_DB_NAME
```

### Step 2: Check Schema Files (ALWAYS)

```bash
# 1. Open appropriate schema file from schemas/ directory
cat schemas/giglancer-schema.json  # Example for Giglancer

# 2. Verify table exists
# 3. Verify EXACT field names (case-sensitive)
# 4. Check data types
```

### Step 3: Verify Table/Field Exists in Live Database (RECOMMENDED)

```bash
# Example: Check Giglancer users table
mysql -h [HOST] -u [USER] -p'[PASSWORD]' [DATABASE] -e "DESCRIBE users;"

# Example: Check if table exists
mysql -h [HOST] -u [USER] -p'[PASSWORD]' [DATABASE] -e "SHOW TABLES LIKE 'users';"
```

### Step 4: Write Query with Error Handling (MANDATORY)

```typescript
// ✅ CORRECT: Always wrap in try-catch
try {
  const [rows] = await giglancerPool.execute(
    "SELECT id, email, role_id FROM users WHERE email = ?", // Verified field names
    [email]
  );
  return rows[0] || null;
} catch (error) {
  console.error("Error querying Giglancer users:", error);
  // Return safe default, don't crash
  return null;
}
```

### Step 5: Log Errors for Missing Tables/Fields (MANDATORY)

```typescript
// ✅ CORRECT: Log detailed error info
catch (error: any) {
  if (error.code === 'ER_NO_SUCH_TABLE') {
    console.error(`❌ Table does not exist: ${error.sqlMessage}`);
    console.error(`📋 Check schema file and database for correct table name`);
  }
  if (error.code === 'ER_BAD_FIELD_ERROR') {
    console.error(`❌ Field does not exist: ${error.sqlMessage}`);
    console.error(`📋 Check schema file for correct field name`);
  }
  return safeDefault; // [], 0, null, {}
}
```

**⚠️ VIOLATION OF THIS WORKFLOW WILL CAUSE PRODUCTION FAILURES!**

---

## ⚠️ CRITICAL: Database Field Reference

**ALWAYS CHECK THIS SECTION BEFORE WRITING DATABASE QUERIES!**

This project uses 5 different databases with different schemas. Field name errors cause production failures.

### Quick Reference: Common Field Name Mistakes

| ❌ WRONG                | ✅ CORRECT            | Database              |
| ----------------------- | --------------------- | --------------------- |
| `account_type`          | `role_id`             | Giglancer             |
| `role_type`             | `role`                | Unified (user_roles)  |
| `first_name, last_name` | `name`                | Work                  |
| `id`                    | `ID` (uppercase)      | Bizoforce (wp_users)  |
| `?` placeholders        | `$1, $2` placeholders | Screenly (PostgreSQL) |

### Database-Specific Column Names

**Work.Bizoforce (MySQL)**:

- Table: `users`
- Columns: `id`, `company_id`, `name` (NOT first_name/last_name), `email`, `status`

**Screenly (PostgreSQL)**:

- Table: `users`
- Columns: `id`, `email`, `first_name`, `last_name`, `company_name` (key for detection)
- **Use `$1, $2, $3` placeholders, NOT `?`**

**Bizoforce (MySQL)**:

- Table: `wp_users`
- Columns: `ID` (UPPERCASE), `user_email`, `display_name`, `user_pass`
- Table: `wp_usermeta` - metadata with `user_id`, `meta_key`, `meta_value`

**Giglancer (MySQL)**:

- Table: `users`
- Columns: `id`, `email`, `role_id` (NOT account_type), `project_count`, `bid_count`, `job_count`, `job_apply_count`
- **Use pre-counted columns, don't query separately!**

**Unified (MySQL)**:

- Table: `user_roles`
- Columns: `id`, `user_id`, `role` (NOT role_type), `platform`, `is_primary`

📖 **Full Reference**: See `docs/DATABASE-FIELD-REFERENCE.md` for complete documentation

---

## 🎯 CRITICAL PATTERNS (Read Before Coding!)

### API Response Format Convention

**ALWAYS use this format for API responses**:

```typescript
// Success Response
{
  success: true,
  message?: string,
  data: T
}

// Error Response
{
  success: false,
  message: string,
  error?: string
}

// HTTP Status Codes:
// 200: Success
// 400: Bad request (validation errors)
// 401: Unauthorized (missing/invalid JWT token)
// 403: Forbidden (insufficient role)
// 404: Not found
// 500: Server error
```

### Multi-Role Patterns

**CRITICAL**: Users can have MULTIPLE roles simultaneously. NEVER assume single role!

```typescript
// ❌ WRONG - Assumes single role
const userRole = user.role;

// ✅ CORRECT - Handle multiple roles
const roles = await unifiedDB
  .select()
  .from(userRoles)
  .where(eq(userRoles.userId, userId));

const primaryRole = roles.find((r) => r.isPrimary)?.role || roles[0]?.role;
const hasRole = (roleName: string) => roles.some((r) => r.role === roleName);

// Check if user has specific role
if (hasRole("company_admin") || hasRole("hr")) {
  // Allow access
}
```

### Data Source Rules (CRITICAL!)

**Users**: Fetched from unified DB + legacy platforms (for migration only)  
**All Other Data**: Fetch ONLY from source platform database

```typescript
// ✅ CORRECT: Fetch data from source database
// Products → Bizoforce (WooCommerce)
const [products] = await bizoforcePool.execute(
  'SELECT * FROM wp_posts WHERE post_type = "product" AND post_author = ?',
  [bizoforceUserId]
);

// Jobs → Giglancer
const [jobs] = await giglancerPool.execute(
  "SELECT * FROM jobs WHERE user_id = ?",
  [giglancerUserId]
);

// Projects → Work.Bizoforce
const [projects] = await workPool.execute(
  "SELECT * FROM projects WHERE company_id = ?",
  [companyId]
);

// Screenings → Screenly (PostgreSQL)
const screenings = await screenlyPool.query(
  "SELECT * FROM screenings WHERE company_id = $1",
  [companyId]
);

// ❌ WRONG: Don't create duplicate data in unified DB
// Don't store products/jobs/projects in unified DB
// They live in their source platforms only
```

### Company Aggregation Pattern

**Use the aggregation service for company data**:

```typescript
// ✅ CORRECT: Use service layer
import { companyAggregationService } from "../services/company-aggregation-service";

const companies = await companyAggregationService.getUserCompanies(userId);
const details = await companyAggregationService.getCompanyDetails(
  companyId,
  userId
);

// ❌ WRONG: Don't query databases directly for companies
// The service handles deduplication and aggregation
```

### Role-Based Routing (Frontend)

```typescript
// ✅ CORRECT: Simple role-based redirect
const individualRoles = ["job_seeker", "freelancer"];
const companyRoles = ["company_admin", "hr", "team_lead", "finance", "vendor"];

if (individualRoles.includes(primaryRole)) {
  setLocation("/individual-dashboard");
} else if (companyRoles.includes(primaryRole)) {
  setLocation("/dashboard");
}

// ❌ WRONG: Don't use complex nested conditionals
// Keep routing logic simple and maintainable
```

### Migration Check Pattern

```typescript
// ✅ CORRECT: Always check if user has roles before re-migrating
const existingUsers = await unifiedDB
  .select()
  .from(unifiedUsers)
  .where(eq(unifiedUsers.email, email))
  .limit(1);

if (existingUsers.length > 0) {
  const existingRoles = await unifiedDB
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, existingUsers[0].id));

  if (existingRoles.length > 0) {
    return; // User already migrated, skip
  }
  // User exists but has no roles, continue to assign roles
}

// ❌ WRONG: Don't skip the role check
// This causes users to be created without roles
```

### Platform Priority (NEVER CHANGE)

```typescript
// Migration priority order (business-value-driven):
// 1. Bizoforce (★★★★★) - HIGHEST PRIORITY:
//    a) First: Check if user has company listings (directory listings)
//    b) If no listings: Check if user is vendor (shop/products)
//    → company_admin + vendor (if applicable)
//    NOTE: Bizoforce listings take priority over vendor status
// 2. Work.Bizoforce (★★★★☆) - ALL users → company_admin
// 3. Screenly (★★★☆☆) - company_name check → company_admin
// 4. Giglancer (★★☆☆☆) - project_count vs bid_count → hr/freelancer

// Higher priority platforms set the primary role
// But all roles from all platforms are preserved
```

### Authentication Pattern

```typescript
// Backend: Protect routes
router.get(
  "/endpoint",
  authenticate, // Verify JWT token
  authorize("company_admin", "hr"), // Check roles
  handler
);

// Frontend: Include JWT in requests
const token = localStorage.getItem("token");
if (!token) {
  setLocation("/login");
  return;
}

fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Read-Only Legacy Databases

```typescript
// ⚠️ IMPORTANT: Legacy databases are READ-ONLY
// Can ONLY read from: Bizoforce, Giglancer, Screenly, Work
// Can ONLY write to: Unified DB

// ✅ CORRECT: Read from legacy, write to unified
const [jobs] = await giglancerPool.execute(
  "SELECT * FROM jobs WHERE user_id = ?",
  [giglancerUserId]
);

// Store reference in unified if needed
await unifiedDB.insert(jobReferences).values({
  userId,
  giglancerJobId: jobs[0].id,
  platform: "giglancer",
});

// ❌ WRONG: Never write to legacy databases
// await giglancerPool.execute('INSERT INTO jobs ...');  // DON'T DO THIS
```

### Database Query Safety

```typescript
// ✅ CORRECT: Use parameterized queries
const [rows] = await workPool.execute("SELECT * FROM users WHERE email = ?", [
  email,
]);

// PostgreSQL (Screenly) uses $1, $2
const result = await screenlyPool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

// ❌ WRONG: Never use string concatenation
// const query = `SELECT * FROM users WHERE email = '${email}'`;  // SQL injection!
```

---

## Project Overview

Unified authentication and data aggregation platform for the Bizoforce ecosystem, consolidating **5 separate databases** (1 unified + 4 legacy platforms) into a modern React + TypeScript full-stack application. This is an **active migration project** - users exist across multiple platforms and need consolidated access.

## Technology Stack

### Backend

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js 4.x
- **Database ORM**: Drizzle ORM (MySQL + PostgreSQL support)
- **Authentication**: Passport.js + Google OAuth 2.0 + JWT
- **Security**: Helmet, CORS, Rate Limiting, bcrypt
- **Build Tools**: tsx (development), esbuild (production)
- **Session Store**: connect-pg-simple (PostgreSQL-backed sessions)

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6.x
- **Routing**: Wouter (lightweight React router)
- **UI Framework**: Tailwind CSS + Radix UI components
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Databases

- **Unified DB**: MySQL (master user registry with Drizzle ORM schema)
- **Bizoforce**: MySQL (WordPress/WooCommerce - 198K+ users, 565 tables)
- **Giglancer**: MySQL (Job marketplace - 82K+ users, 162 tables)
- **Screenly**: PostgreSQL (AI screening platform - 24 users, 50 tables)
- **Work.Bizoforce**: MySQL (Project/timesheet management - 1.1K users, 226 tables)

### Architecture Highlights

- **Single Port**: Port 3006 serves both frontend and backend
- **TypeScript**: Full end-to-end type safety
- **Drizzle ORM**: Type-safe database queries with schema validation
- **Unified Vite Dev Server**: HMR for frontend, tsx hot-reload for backend
- **Environment-Based**: Development vs Production configurations

## Business Goals & Revenue Strategy

**Primary Mission**: Generate revenue by providing businesses with measurable value through:

1. **More Leads** - Aggregate job seekers, candidates, and freelancers into a unified talent pool that companies can access
2. **More Sales** - Marketplace for products/services where vendors can reach buyers across the ecosystem
3. **Faster Talent Acquisition** - AI-powered screening (Screenly) + unified candidate pipeline reduces time-to-hire
4. **Better Project Management** - Integrated timesheets, project tracking, and billing streamlines operations

### Revenue Drivers

- **Subscription Plans** - Companies pay for access to talent pool, advanced features, and higher limits
- **Marketplace Commissions** - Transaction fees on product/service sales through Bizoforce marketplace
- **Job Posting Fees** - Premium job listings with wider reach and AI screening
- **Talent Pool Access** - Companies pay to search and hire from consolidated candidate database
- **Project Management Tools** - Subscription tiers for timesheet, invoicing, and team management features

### Development Alignment

All features must demonstrate clear business value:

- **Lead Generation**: Build robust candidate profiles, skills tagging, availability tracking
- **Sales Enablement**: Product listings, vendor profiles, transaction tracking, reviews
- **Talent Acquisition Speed**: AI screening automation, candidate pipeline, interview scheduling
- **Project Efficiency**: Time tracking, approval workflows, automated invoicing, resource allocation

**Key Metric**: Reduce client's time-to-hire by 50%, increase sales conversion by 30%, improve project profitability by 40%

## Architecture

### Multi-Database System

The system connects to **5 databases simultaneously**:

- **Unified DB** (MySQL): `bizoforce_newdashboard` - Master user registry with Drizzle ORM schema
- **Bizoforce** (MySQL): WordPress/WooCommerce platform (198K+ users, 565 tables)
- **Giglancer** (MySQL): Job marketplace (82K+ users, 162 tables)
- **Screenly** (PostgreSQL): AI screening platform (24 users, 50 tables)
- **Work.Bizoforce** (MySQL): Project/timesheet management (1.1K users, 226 tables)

All databases are on remote server `72.167.148.100`. Connection pools managed in `server/db.ts` using Drizzle ORM.

### User Migration Pattern

Users migrate from legacy platforms to unified DB while **preserving platform-specific IDs**:

```typescript
// Drizzle ORM schema (shared/schema.ts)
export const unifiedUsers = mysqlTable("unified_users", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  googleId: varchar("google_id", { length: 255 }).unique(),
  bizoforceUserId: int("bizoforce_user_id"), // References wp_users.ID
  giglancerUserId: int("giglancer_user_id"), // References users.id in Giglancer
  screenlyUserId: int("screenly_user_id"), // References users.id in Screenly
  workUserId: int("work_user_id"), // References users.id in Work.Bizoforce
  authProvider: mysqlEnum("auth_provider", ["local", "google", "hybrid"]),
  // ... other fields
});
```

### Multi-Role System

Users can have **multiple roles across contexts** (see `shared/schema.ts` and `migrations/03-create-user-roles.sql`):

- Same user can be: Company Admin, Vendor, Freelancer, Team Member
- `user_roles` table with `is_primary` flag for role switching
- Example: User can be Vendor (Bizoforce) + Freelancer (Giglancer) + Company Admin (Screenly)

```typescript
// Drizzle ORM schema (shared/schema.ts)
export const userRoles = mysqlTable("user_roles", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  roleType: mysqlEnum("role_type", [
    "company_admin",
    "hr",
    "team_lead",
    "team_member",
    "finance",
    "vendor",
    "resource_provider",
    "job_seeker",
    "freelancer",
  ]).notNull(),
  platform: varchar("platform", { length: 50 }),
  companyId: int("company_id"),
  isPrimary: boolean("is_primary").default(false),
});
```

## Development Workflows

### Essential Commands

```bash
# Start dev server with TypeScript hot-reload (port 3006)
npm run dev

# Build for production (frontend + backend)
npm run build:prod

# Build server only (faster for backend-only changes)
npm run build:server

# Start production server
npm start

# TypeScript type checking
npm run check

# Generate Drizzle migrations from schema
npm run db:generate

# Push schema to database (development)
npm run db:push

# Run migrations (production)
npm run db:migrate

# Test database connections
npm test

# Generate database schemas (all 5 databases)
npm run generate-schemas
```

### Production Deployment Commands (Run as ROOT)

```bash
# Quick deploy: Build server and restart PM2
cd /home/bizoforce/public_html/dashboard && npm run build:server && sudo /usr/local/bin/pm2 restart dashboard

# Check for errors in logs
sudo /usr/local/bin/pm2 logs dashboard --lines 10 --nostream 2>&1 | grep -E "error|ERROR|Error" | tail -5

# Save PM2 config and verify server status
sudo /usr/local/bin/pm2 save && sudo /usr/local/bin/pm2 logs dashboard --lines 5 --nostream 2>&1 | tail -10

# Full PM2 management
sudo /usr/local/bin/pm2 list                    # List all processes
sudo /usr/local/bin/pm2 restart dashboard      # Restart dashboard
sudo /usr/local/bin/pm2 stop dashboard         # Stop dashboard
sudo /usr/local/bin/pm2 delete dashboard       # Delete dashboard process
sudo /usr/local/bin/pm2 logs dashboard         # Stream logs (real-time)
sudo /usr/local/bin/pm2 logs dashboard --err   # Error logs only

# Start fresh dashboard instance
cd /home/bizoforce/public_html/dashboard && sudo /usr/local/bin/pm2 start dist/index.js --name dashboard --update-env
```

### Troubleshooting Commands

```bash
# Check what's running on port 3006
sudo netstat -tlnp | grep :3006

# Find dashboard processes
ps aux | grep "dashboard/dist/index.js" | grep -v grep

# Check root PM2 daemon
ps aux | grep "PM2.*root" | head -3

# Kill stuck process on port 3006
sudo fuser -k 3006/tcp

# Test login endpoint
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test123"}'

# Check database connections
mysql -h 72.167.148.100 -u bizoforce_newdashboard -p'i&B4{NKC~!6cLC*r' bizoforce_newdashboard -e "SHOW TABLES;"
```

````

### Migration Workflow
1. Update Drizzle schema in `shared/schema.ts`
2. Generate migration: `npm run db:generate`
3. Review generated SQL in `migrations/` directory
4. Apply migration: `npm run db:migrate`
5. Alternatively, push directly to dev DB: `npm run db:push`

## Code Patterns

### Database Queries with Drizzle ORM
Use typed database connections from `server/db.ts`:
```typescript
import { unifiedDB, bizoforceDB, giglancerDB } from '../db';
import { unifiedUsers, userRoles } from '../../shared/schema';
import { eq } from 'drizzle-orm';

// Type-safe queries with Drizzle
const users = await unifiedDB
  .select()
  .from(unifiedUsers)
  .where(eq(unifiedUsers.email, email))
  .limit(1);

const user = users[0]; // Fully typed!

// Insert with type safety
await unifiedDB.insert(unifiedUsers).values({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  authProvider: 'local',
});

// Join queries
const usersWithRoles = await unifiedDB
  .select()
  .from(unifiedUsers)
  .leftJoin(userRoles, eq(unifiedUsers.id, userRoles.userId));
````

**PostgreSQL (Screenly only)**: Uses node-postgres pool:

```typescript
import { screenlyDB, screenlyPool } from "../db";

// Drizzle queries work the same
const result = await screenlyDB.select().from(someTable);

// Raw queries if needed
const client = await screenlyPool.connect();
const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
client.release();
```

[email]
);

````

### Authentication Flow
JWT-based auth with 7-day expiration (see `server/routes/auth.ts`):
1. Register/Login → Generate JWT with `{ userId, email, roles, primary_role, auth_provider }`
2. Frontend sends: `Authorization: Bearer <token>`
3. Middleware `authenticate()` verifies and attaches `req.user` (typed as `AuthUser`)
4. Optional: `authorize('company_admin', 'hr')` restricts by role type

### Protected Routes Pattern
```typescript
import { Router } from 'express';
import { authenticate, authorize, optionalAuth } from '../auth/middleware';

const router = Router();

// Require authentication
router.get('/profile', authenticate, handler);

// Restrict by role type
router.post('/jobs', authenticate, authorize('company_admin', 'hr'), handler);

// Optional auth (public but personalized)
router.get('/listings', optionalAuth, handler);
````

### Error Handling Convention

Routes throw errors, Express error handler catches:

```typescript
// In route (server/routes/auth.ts)
import { Request, Response } from "express";

if (!user) throw new Error("User not found");

// Express error handler
try {
  const result = await someAsyncOperation();
  res.json({ success: true, data: result });
} catch (error) {
  res.status(400).json({
    success: false,
    message: error instanceof Error ? error.message : "Unknown error",
  });
}
```

## Key Files & Their Roles

- **`server/index.ts`**: Express app, security middleware (Helmet, CORS, rate limiting), route registration, Vite dev server integration
- **`server/db.ts`**: All 5 database connections with Drizzle ORM, `testConnections()` and `closeConnections()` helpers
- **`server/routes/auth.ts`**: Email/password authentication endpoints (register, login, profile)
- **`server/routes/google-auth.ts`**: Google OAuth 2.0 callback routes (/google, /google/callback, /logout)
- **`server/auth/middleware.ts`**: JWT `authenticate`, `authorize`, `optionalAuth` middlewares with TypeScript typing
- **`server/auth/google.ts`**: Passport.js Google OAuth strategy configuration
- **`shared/schema.ts`**: Drizzle ORM schema definitions (unifiedUsers, userRoles, oauthTokens, companies)
- **`client/src/App.tsx`**: React app with Wouter routing and React Query provider
- **`client/src/pages/*.tsx`**: React TypeScript pages (Login, Dashboard, AuthCallback)
- **`migrations/*.sql`**: Drizzle-generated database schema changes (run via `npm run db:migrate`)
- **`docs/GOOGLE-OAUTH-FLOW-DIAGRAM.md`**: Complete Google OAuth authentication flow diagram
- **`docs/MULTI-ROLE-MANAGEMENT.md`**: Detailed multi-role architecture strategy
- **`docs/USER-MIGRATION-STRATEGY.md`**: Analysis of user tables across all 4 legacy platforms

## Testing Strategy

### Database Connection Tests

Run `npm test` to verify all 5 database connections:

- Tests defined in `package.json` scripts
- Uses `server/db.ts` `testConnections()` helper
- Verifies: Unified DB, Bizoforce, Giglancer, Screenly, Work.Bizoforce
- Queries sample data and checks table structures

### API Testing with Permanent Token

**PERMANENT TEST TOKEN** (Never Expires):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdHVzZXJAcGVybWFuZW50LnRva2VuIiwicm9sZXMiOlt7ImlkIjo3Mywicm9sZVR5cGUiOiJjb21wYW55X2FkbWluIiwicGxhdGZvcm0iOiJ1bmlmaWVkIiwiY29tcGFueUlkIjoxLCJpc1ByaW1hcnkiOnRydWV9XSwicHJpbWFyeV9yb2xlIjoiY29tcGFueV9hZG1pbiIsImF1dGhfcHJvdmlkZXIiOiJsb2NhbCIsInRlc3RpbmciOnRydWUsImlhdCI6MTc2Mzk3MzM5OX0.VDYRTqr9TQpzuf4HzeHgTmaRQY_uv_sY0A85D6k2haE
```

**Token Details**:

- User: `testuser@permanent.token` (ID: 1)
- Role: `company_admin` on `unified` platform
- Company: `unified_1` (clickstraight)
- **Never Expires** - No `exp` claim in JWT payload
- For development and testing only
- JWT_SECRET: `bizoforce-local-dev-secret-key-change-in-production-min-64-chars`

**Example API Calls**:

```bash
# Test company list
curl -X GET "http://localhost:3006/api/companies" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdHVzZXIxNzYzNDc5NTAwMTc4QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImlkIjo3Mywicm9sZVR5cGUiOiJjb21wYW55X2FkbWluIiwicGxhdGZvcm0iOiJ1bmlmaWVkIiwiY29tcGFueUlkIjoxLCJpc1ByaW1hcnkiOnRydWV9XSwicHJpbWFyeV9yb2xlIjoiY29tcGFueV9hZG1pbiIsImF1dGhfcHJvdmlkZXIiOiJsb2NhbCIsInRlc3RpbmciOnRydWUsImlhdCI6MTc2Mzk3MDg0MX0.wppgII-id2pALgifXLIxHRkLbTHXM4aQ8bhQxPoho-8"

# Test company details
curl -X GET "http://localhost:3006/api/companies/unified_1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdHVzZXIxNzYzNDc5NTAwMTc4QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImlkIjo3Mywicm9sZVR5cGUiOiJjb21wYW55X2FkbWluIiwicGxhdGZvcm0iOiJ1bmlmaWVkIiwiY29tcGFueUlkIjoxLCJpc1ByaW1hcnkiOnRydWV9XSwicHJpbWFyeV9yb2xlIjoiY29tcGFueV9hZG1pbiIsImF1dGhfcHJvdmlkZXIiOiJsb2NhbCIsInRlc3RpbmciOnRydWUsImlhdCI6MTc2Mzk3MDg0MX0.wppgII-id2pALgifXLIxHRkLbTHXM4aQ8bhQxPoho-8"

# Test employees endpoint
curl -X GET "http://localhost:3006/api/companies/unified_1/employees" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdHVzZXIxNzYzNDc5NTAwMTc4QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImlkIjo3Mywicm9sZVR5cGUiOiJjb21wYW55X2FkbWluIiwicGxhdGZvcm0iOiJ1bmlmaWVkIiwiY29tcGFueUlkIjoxLCJpc1ByaW1hcnkiOnRydWV9XSwicHJpbWFyeV9yb2xlIjoiY29tcGFueV9hZG1pbiIsImF1dGhfcHJvdmlkZXIiOiJsb2NhbCIsInRlc3RpbmciOnRydWUsImlhdCI6MTc2Mzk3MDg0MX0.wppgII-id2pALgifXLIxHRkLbTHXM4aQ8bhQxPoho-8"
```

### Frontend Development

Vite dev server with HMR:

- Run `npm run dev` for full-stack development
- Frontend accessible at `http://localhost:3006`
- API routes proxied to backend
- TypeScript type checking in watch mode

## Security Configurations

- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Secret**: `JWT_SECRET` in `.env` (7-day expiration, configurable)
- **Rate Limiting**: 100 requests per 15 minutes on `/api/*` routes (with trust proxy support)
- **CORS**: Configured for environment-based origins (development: localhost:3006, production: dashboard.bizoforce.com)
- **Helmet**: Security headers enabled by default
- **Session Store**: PostgreSQL-backed sessions with connect-pg-simple
- **OAuth Security**: CSRF protection via state parameter in Google OAuth flow

## Environment Variables

Required in `.env` (30+ variables total):

```
# Server Configuration
PORT=3006
NODE_ENV=development
JWT_SECRET=your-secure-secret-key
FRONTEND_URL=http://localhost:3006
FRONTEND_PRODUCTION_URL=https://dashboard.bizoforce.com

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3006/api/auth/google/callback
GOOGLE_REDIRECT_URI_PRODUCTION=https://dashboard.bizoforce.com/api/auth/google/callback

# Unified DB (MySQL)
UNIFIED_DB_HOST=72.167.148.100
UNIFIED_DB_USER=...
UNIFIED_DB_PASS=...
UNIFIED_DB_NAME=bizoforce_newdashboard

# + 4 more database sets (BIZOFORCE_*, GIGLANCER_*, SCREENLY_*, WORK_*)
```

## Common Issues & Troubleshooting

### Issue: "Unknown column 'role_type' in 'field list'"

**Cause**: Old server process running with outdated schema  
**Solution**:

```bash
# 1. Check if old root process is running
ps aux | grep "dashboard/dist/index.js" | grep root

# 2. Delete old PM2 process and start new one
sudo /usr/local/bin/pm2 delete dashboard
cd /home/bizoforce/public_html/dashboard
sudo /usr/local/bin/pm2 start dist/index.js --name dashboard --update-env

# 3. Save configuration
sudo /usr/local/bin/pm2 save
```

### Issue: "relation 'IDX_session_expire' already exists"

**Cause**: Session table configuration mismatch  
**Solution**: Update `server/index.ts`:

```typescript
store: new PgSession({
  pool: screenlyPool,
  tableName: "sessions", // Use 'sessions' not 'session'
  createTableIfMissing: false, // Table exists, don't recreate
});
```

### Issue: Login returns 500 Internal Server Error

**Checklist**:

1. Check database schema matches code (especially `user_roles` table)
2. Verify all 5 databases are accessible
3. Check PM2 logs: `sudo /usr/local/bin/pm2 logs dashboard --err`
4. Test database connection: `npm test`
5. Restart server with latest code: `npm run build:server && sudo /usr/local/bin/pm2 restart dashboard`

### Issue: Port 3006 already in use

**Solution**:

```bash
# Find process on port 3006
sudo netstat -tlnp | grep :3006

# Kill process
sudo fuser -k 3006/tcp

# Or kill specific PID
sudo kill <PID>
```

### Issue: PM2 process keeps restarting (high restart count)

**Cause**: Application crashes on startup  
**Solution**:

```bash
# Check error logs
sudo /usr/local/bin/pm2 logs dashboard --err --lines 50

# Delete and recreate with updated env
sudo /usr/local/bin/pm2 delete dashboard
cd /home/bizoforce/public_html/dashboard
sudo /usr/local/bin/pm2 start dist/index.js --name dashboard --update-env
```

## Important Constraints

1. **Server runs as ROOT** - Use `sudo /usr/local/bin/pm2` for all PM2 commands
2. **Always rebuild before restart** - Run `npm run build:server` before `pm2 restart`
3. **PostgreSQL uses `$1, $2` placeholders** - MySQL uses `?`
4. **Migrations are sequential** - Prefix with `01-`, `02-`, etc.
5. **User IDs are preserved** - Always maintain platform-specific foreign keys
6. **Email is primary identifier** - Used for deduplication across platforms
7. **Multi-role requires context** - Include `company_id` when querying roles
8. **Schema field names** - Database uses `role` not `role_type`, `sessions` not `session`

## Technology Stack

### Backend

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js 4.21.2
- **Database ORM**: Drizzle ORM 0.39.3 (MySQL + PostgreSQL support)
- **Database Drivers**: mysql2 2.3.3, pg 8.13.1
- **Authentication**: Passport.js + Google OAuth 2.0 + JWT
- **Security**: Helmet, CORS, Rate Limiting, bcrypt
- **Build Tools**: tsx (development), esbuild (production)
- **Session Store**: connect-pg-simple (PostgreSQL-backed sessions)

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6.x
- **Routing**: Wouter (lightweight React router)
- **UI Framework**: Tailwind CSS + Radix UI components
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Databases

- **Unified DB**: MySQL (master user registry with Drizzle ORM schema)
- **Bizoforce**: MySQL (WordPress/WooCommerce - 198K+ users, 565 tables)
- **Giglancer**: MySQL (Job marketplace - 82K+ users, 162 tables)
- **Screenly**: PostgreSQL (AI screening platform - 24 users, 50 tables)
- **Work.Bizoforce**: MySQL (Project/timesheet management - 1.1K users, 226 tables)

### Architecture Highlights

- **Single Port**: Port 3006 serves both frontend and backend
- **TypeScript**: Full end-to-end type safety
- **Drizzle ORM**: Type-safe database queries with schema validation
- **Unified Vite Dev Server**: HMR for frontend, tsx hot-reload for backend
- **Environment-Based**: Development vs Production configurations

## Frontend Development Guidelines

When building the React frontend in `client/`:

1. Use Tailwind CSS utility classes (no custom CSS files)
2. Create reusable components (Button, Card, Modal, Table, etc.)
3. Implement responsive design (mobile-first approach)
4. Use Wouter for navigation
5. Axios interceptors for JWT token handling
6. React Query for server state management

## Next Development Areas

See `PROJECT-TODO.md` for full roadmap. Current priorities:

- User migration scripts for all 4 platforms
- WooCommerce product aggregation
- Job listing endpoints (Giglancer + Screenly)
- Dashboard analytics endpoints
- Frontend React app setup with Vite + Tailwind CSS

## User Roles & Authorization

### Multi-Role System

Users can have **multiple roles across contexts** (see `migrations/03-add-multi-role-support.sql`):

- Same user can be: Company Admin, Vendor, Freelancer, Team Member
- `user_roles` table with `is_primary` flag for role switching
- Example: User can be Vendor (Bizoforce) + Freelancer (Giglancer) + Company Admin (Screenly)

### Company Roles (7 Total)

1. **Company Admin** - Full system access, can delegate to others
2. **HR** - Post jobs, screen candidates, conduct interviews, manage hiring
3. **Team Lead** - Create/manage projects, assign teams, approve timesheets
4. **Team Member** - Log hours, view assigned projects, track earnings
5. **Finance** - Generate invoices, process payments, track revenue
6. **Vendor** - Create/manage product listings, handle marketplace sales
7. **Resource Provider** - Push candidates to marketplace as virtual resources

### Individual Role

**Job Seeker/Candidate** - Apply to jobs, AI screening, track applications, access projects/timesheets when hired

### Role-Based API Authorization

```typescript
// Protect endpoints by role
router.post("/jobs", authenticate, authorize("company_admin", "hr"), createJob);
router.get(
  "/earnings",
  authenticate,
  authorize("team_member", "finance"),
  getEarnings
);
```

### 1. **Company Creation Flow**

```
Company Admin:
1. Create company profile (companies.html)
2. Add team members (users-roles.html)
3. Assign roles to members
4. Set hourly rates for billing
5. Configure integrations (settings.html)
```

### 2. **Product Listing Flow**

```
Vendor:
1. Navigate to products-services.html
2. Click "Add Product/Service"
3. Fill product details (name, category, price, description)
4. Upload product image
5. Set availability and vendor info
6. Publish to marketplace
```

### 3. **Hiring Flow**

```
HR/Recruiter:
1. Post job (jobs.html → "Post Job" modal)
2. Candidates apply (applications come in)
3. AI screening filters candidates
4. Review pipeline (job-detail.html)
5. Schedule interviews
6. Extend offer
7. Candidate accepts → becomes team member
8. Auto-create project assignment
```

### 4. **Project & Timesheet Flow**

```
Team Lead:
1. Create project (projects.html)
2. Assign team members
3. Set project budget and timeline

Team Member:
1. View assigned projects (my-projects.html)
2. Log hours (my-timesheets.html)
3. Submit timesheet for approval

Team Lead:
4. Review timesheets (timesheets.html)
5. Approve/reject entries

Finance:
6. Generate invoice from approved hours
7. Track payment status (invoices.html)
```

### 5. **Billing Flow**

```
Finance:
1. Review approved timesheets (timesheets.html)
2. Calculate: Hours × Hourly Rate = Amount
3. Generate invoice (invoices.html)
4. Send to client
5. Track payment status
6. Record revenue (earnings.html)
```

### 6. **Talent Pool Flow**

```
Company Admin:
1. Build internal talent pool (talent-pool.html)
2. Tag candidates with skills
3. Push candidates to Giglancer marketplace
4. Another company hires candidate
5. Auto-create project for external placement
6. Track commission/revenue
```

### 7. **Individual User Flow**

```
Candidate:
1. Sign up / Login (React login page - select "Individual User")
2. Redirected to profile dashboard (landing page for individuals)
3. Create/update profile
4. Upload resume and portfolio
5. Search jobs (job search feature)
6. Apply to jobs
7. Complete AI screening
8. Attend interviews
9. Receive and accept offer
10. Get project assignment → projects view
11. Log hours → timesheets view
12. Track earnings → earnings view
```

## React Component Guidelines

### Component Structure

Create reusable components in `client/src/components/`:

- `Button.tsx` - Reusable button with variants (primary, secondary, danger, success)
- `Card.tsx` - Stats cards and content cards
- `Modal.tsx` - Modal dialogs for forms and actions
- `Table.tsx` - Data tables with sorting and filtering
- `Sidebar.tsx` - Navigation sidebar
- `Header.tsx` - Top navigation bar

### Tailwind CSS Patterns

Use utility classes for styling:

```tsx
// Stats Card Example
<div className="bg-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
  <div className="text-4xl font-bold">{value}</div>
  <div className="text-blue-100 mt-2">{label}</div>
</div>

// Button Example
<button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
  {children}
</button>
```

### State Management

Use React Context for global state:

```tsx
// AuthContext.tsx
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Development Best Practices

1. **Always use todo lists** - Track progress for all tasks
2. **API Response Format** - Consistent `{ success, message, data }` structure
3. **Error Handling** - Services throw, routes catch and format
4. **JWT Authentication** - All protected routes use `authenticate` middleware
5. **Role-Based Access** - Use `authorize()` middleware for role restrictions
6. **Database Queries** - Use Drizzle ORM from `server/db.ts`
7. **Frontend Styling** - Tailwind CSS utility classes only, no custom CSS
8. **Component Reusability** - Build shared components in `client/src/components/`

---

_Last Updated: November 18, 2025_
_Bizoforce Unified Dashboard v1.0_

# Bizoforce Unified Dashboard - Google OAuth Authentication Flow

## Overview

This document describes the complete authentication flow for the Bizoforce Unified Dashboard, integrating Google OAuth 2.0 with the existing multi-database, multi-role system spanning 5 platforms.

---

## 🔐 Complete Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            USER INITIATES LOGIN                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │   Frontend Login Page   │
                        │  (React Component)      │
                        └─────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
        ┌───────────────────────┐         ┌───────────────────────┐
        │  "Login with Google"  │         │   Traditional Login (only for invited company emplyee)  │
        │       Button          │         │  (Email + Password)   │
        └───────────────────────┘         └───────────────────────┘
                    │                                   │
                    │                                   │
                    ▼                                   ▼


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         GOOGLE OAUTH 2.0 FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────────┘

    Frontend                    Backend API              Google OAuth         Database
        │                           │                          │                  │
        │ 1. Click "Login with      │                          │                  │
        │    Google"                │                          │                  │
        ├──────────────────────────>│                          │                  │
        │                           │                          │                  │
        │ 2. GET /api/auth/google   │                          │                  │
        │                           │                          │                  │
        │                           │ 3. Redirect to Google    │                  │
        │                           │    with OAuth params     │                  │
        │                           ├─────────────────────────>│                  │
        │                           │    client_id             │                  │
        │                           │    redirect_uri          │                  │
        │                           │    scope (profile,email) │                  │
        │<──────────────────────────┤                          │                  │
        │                           │                          │                  │
        │ 4. Redirected to Google   │                          │                  │
        │    Login Page             │                          │                  │
        ├───────────────────────────┼─────────────────────────>│                  │
        │                           │                          │                  │
        │ 5. User authenticates &   │                          │                  │
        │    grants permissions     │                          │                  │
        │                           │                          │                  │
        │ 6. Google redirects back  │                          │                  │
        │    with authorization     │                          │                  │
        │    code                   │                          │                  │
        │<──────────────────────────┼──────────────────────────┤                  │
        │                           │                          │                  │
        │ 7. Send auth code to      │                          │                  │
        │    backend                │                          │                  │
        ├──────────────────────────>│                          │                  │
        │ GET /api/auth/google/     │                          │                  │
        │     callback?code=xxx     │                          │                  │
        │                           │                          │                  │
        │                           │ 8. Exchange code for     │                  │
        │                           │    access token          │                  │
        │                           ├─────────────────────────>│                  │
        │                           │                          │                  │
        │                           │ 9. Return access token   │                  │
        │                           │    & user profile        │                  │
        │                           │<─────────────────────────┤                  │
        │                           │    {                     │                  │
        │                           │      id, email,          │                  │
        │                           │      name, picture       │                  │
        │                           │    }                     │                  │
        │                           │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                    USER LOOKUP & MIGRATION PROCESS                               │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    │                          │                  │
                                    │ 10. Check if user exists │                  │
                                    │     in unified DB        │                  │
                                    ├─────────────────────────────────────────────>│
                                    │ SELECT * FROM            │                  │
                                    │ unified_users WHERE      │                  │
                                    │ email = ? OR             │                  │
                                    │ google_id = ?            │                  │
                                    │                          │                  │
                                    │<─────────────────────────────────────────────┤
                                    │ User found / not found   │                  │
                                    │                          │                  │
                                    ▼                          │                  │
                        ┌───────────────────────┐              │                  │
                        │   User Exists?        │              │                  │
                        └───────────────────────┘              │                  │
                                    │                          │                  │
                    ┌───────────────┴───────────────┐          │                  │
                    │                               │          │                  │
                YES │                               │ NO       │                  │
                    ▼                               ▼          │                  │
        ┌──────────────────────┐      ┌──────────────────────────────┐            │
        │  Load User Profile   │      │  SEARCH LEGACY DATABASES     │            │
        │  from unified_users  │      │  (Bizoforce, Giglancer,      │            │
        └──────────────────────┘      │   Screenly, Work.Bizoforce)  │            │
                    │                 └──────────────────────────────┘            │
                    │                               │                             │
                    │                               │ 11. Query all 4 legacy DBs  │
                    │                               ├────────────────────────────>│
                    │                               │ Bizoforce:  wp_users        │
                    │                               │ Giglancer:  users           │
                    │                               │ Screenly:   users           │
                    │                               │ Work:       users           │
                    │                               │                             │
                    │                               │<────────────────────────────┤
                    │                               │ Return matching users       │
                    │                               │                             │
                    │                               ▼                             │
                    │                   ┌──────────────────────┐                  │
                    │                   │  Found in Legacy DB? │                  │
                    │                   └──────────────────────┘                  │
                    │                               │                             │
                    │               ┌───────────────┴───────────────┐             │
                    │          YES  │                               │  NO         │
                    │               ▼                               ▼             │
                    │   ┌──────────────────────┐      ┌──────────────────────┐   │
                    │   │  MIGRATE USER        │      │  CREATE NEW USER     │   │
                    │   │  to Unified DB       │      │  in Unified DB       │   │
                    │   └──────────────────────┘      └──────────────────────┘   │
                    │               │                               │             │
                    │               │ 12. Insert into unified_users │             │
                    │               ├───────────────────────────────┼────────────>│
                    │               │ {                             │             │
                    │               │   email,                      │             │
                    │               │   google_id,                  │             │
                    │               │   bizoforce_user_id,          │             │
                    │               │   giglancer_user_id,          │             │
                    │               │   screenly_user_id,           │             │
                    │               │   work_user_id,               │             │
                    │               │   auth_provider: 'google'     │             │
                    │               │ }                             │             │
                    │               │                               │             │
                    │               └───────────────┬───────────────┘             │
                    │                               │                             │
                    └───────────────────────────────┴─────────────────────────────┘
                                                    │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         ROLE DETECTION & ASSIGNMENT                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                                    │
                                    │ 13. Detect user roles    │                  │
                                    │     across platforms     │                  │
                                    ├─────────────────────────────────────────────>│
                                    │                          │                  │
                                    │ Bizoforce: Check         │                  │
                                    │   - wp_usermeta (roles)  │                  │
                                    │   - wp_posts (vendor)    │                  │
                                    │                          │                  │
                                    │ Giglancer: Check         │                  │
                                    │   - users.account_type   │                  │
                                    │   - jobs.user_id         │                  │
                                    │                          │                  │
                                    │ Screenly: Check          │                  │
                                    │   - users.role           │                  │
                                    │   - company_members      │                  │
                                    │                          │                  │
                                    │ Work: Check              │                  │
                                    │   - users.role           │                  │
                                    │   - project_members      │                  │
                                    │                          │                  │
                                    │<─────────────────────────────────────────────┤
                                    │ Return: [roles array]    │                  │
                                    │                          │                  │
                                    │ 14. Insert user_roles    │                  │
                                    ├─────────────────────────────────────────────>│
                                    │ INSERT INTO user_roles   │                  │
                                    │   (user_id, role_type,   │                  │
                                    │    platform, is_primary, │                  │
                                    │    company_id)           │                  │
                                    │                          │                  │
                                    │ Example:                 │                  │
                                    │ - Vendor (Bizoforce)     │                  │
                                    │ - Freelancer (Giglancer) │                  │
                                    │ - Company Admin (Screenly│                  │
                                    │ - Team Member (Work)     │                  │
                                    │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         JWT TOKEN GENERATION                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │                          │                  │
                                    │ 15. Generate JWT token   │                  │
                                    │                          │                  │
                                    │ jwt.sign({               │                  │
                                    │   userId,                │                  │
                                    │   email,                 │                  │
                                    │   google_id,             │                  │
                                    │   roles: [...],          │                  │
                                    │   primary_role,          │                  │
                                    │   auth_provider: 'google'│                  │
                                    │ }, JWT_SECRET, {         │                  │
                                    │   expiresIn: '7d'        │                  │
                                    │ })                       │                  │
                                    │                          │                  │
        │                           │ 16. Return response      │                  │
        │<──────────────────────────┤                          │                  │
        │ {                         │                          │                  │
        │   success: true,          │                          │                  │
        │   data: {                 │                          │                  │
        │     token,                │                          │                  │
        │     user: {               │                          │                  │
        │       id, email, name,    │                          │                  │
        │       picture,            │                          │                  │
        │       roles: [...],       │                          │                  │
        │       primary_role        │                          │                  │
        │     }                     │                          │                  │
        │   }                       │                          │                  │
        │ }                         │                          │                  │
        │                           │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                    FRONTEND: STORE TOKEN & REDIRECT                              │
└─────────────────────────────────────────────────────────────────────────────────┘
        │                           │                          │                  │
        │ 17. Store JWT in          │                          │                  │
        │     localStorage          │                          │                  │
        │     or httpOnly cookie    │                          │                  │
        │                           │                          │                  │
        │ 18. Store user data in    │                          │                  │
        │     React Context/State   │                          │                  │
        │                           │                          │                  │
        │ 19. Redirect based on     │                          │                  │
        │     primary role:         │                          │                  │
        │                           │                          │                  │
        │  Company Admin  →         │                          │                  │
        │    /dashboard             │                          │                  │
        │  Vendor         →         │                          │                  │
        │    /products-services     │                          │                  │
        │  HR             →         │                          │                  │
        │    /jobs                  │                          │                  │
        │  Team Member    →         │                          │                  │
        │    /my-projects           │                          │                  │
        │  Freelancer     →         │                          │                  │
        │    /job-search            │                          │                  │
        │                           │                          │                  │
        ▼                           │                          │                  │
┌───────────────────┐              │                          │                  │
│   Dashboard View  │              │                          │                  │
└───────────────────┘              │                          │                  │
```

---

## 🔄 Subsequent API Requests (Protected Routes)

```
    Frontend                    Backend API                  Middleware           Database
        │                           │                           │                    │
        │ 1. API Request with       │                           │                    │
        │    Authorization header   │                           │                    │
        ├──────────────────────────>│                           │                    │
        │ GET /api/profile          │                           │                    │
        │ Authorization: Bearer     │                           │                    │
        │   <JWT_TOKEN>             │                           │                    │
        │                           │                           │                    │
        │                           │ 2. Authenticate middleware│                    │
        │                           ├──────────────────────────>│                    │
        │                           │                           │                    │
        │                           │                           │ 3. Verify JWT      │
        │                           │                           │    jwt.verify()    │
        │                           │                           │                    │
        │                           │                           │ 4. Extract payload │
        │                           │                           │    { userId,       │
        │                           │                           │      email,        │
        │                           │                           │      roles }       │
        │                           │                           │                    │
        │                           │                           │ 5. Attach to       │
        │                           │                           │    req.user        │
        │                           │                           │                    │
        │                           │<──────────────────────────┤                    │
        │                           │ Authentication success    │                    │
        │                           │                           │                    │
        │                           │ 6. Process request        │                    │
        │                           ├───────────────────────────────────────────────>│
        │                           │ Query user data from      │                    │
        │                           │ unified DB + legacy DBs   │                    │
        │                           │                           │                    │
        │                           │<───────────────────────────────────────────────┤
        │                           │ Return data               │                    │
        │                           │                           │                    │
        │<──────────────────────────┤                           │                    │
        │ Response with data        │                           │                    │
        │                           │                           │                    │
```

---

## 📊 Database Schema for Google OAuth

### Updated `unified_users` Table

```sql
CREATE TABLE unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),  -- NULL for Google OAuth users

  -- Google OAuth fields
  google_id VARCHAR(255) UNIQUE,
  google_profile_picture VARCHAR(500),
  auth_provider ENUM('local', 'google', 'hybrid') DEFAULT 'local',

  -- User details
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),

  -- Legacy platform IDs
  bizoforce_user_id INT,
  giglancer_user_id INT,
  screenly_user_id INT,
  work_user_id INT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,

  -- Indexes
  INDEX idx_email (email),
  INDEX idx_google_id (google_id),
  INDEX idx_auth_provider (auth_provider)
);
```

### `user_roles` Table (Multi-Role Support)

```sql
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role_type ENUM('company_admin', 'hr', 'team_lead', 'team_member',
                 'finance', 'vendor', 'resource_provider',
                 'job_seeker', 'freelancer') NOT NULL,
  platform VARCHAR(50),  -- 'bizoforce', 'giglancer', 'screenly', 'work'
  company_id INT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_role_type (role_type),
  INDEX idx_platform (platform)
);
```

### `oauth_tokens` Table (Optional - for token refresh)

```sql
CREATE TABLE oauth_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  provider ENUM('google', 'facebook', 'microsoft') NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user_provider (user_id, provider)
);
```

---

## 🛠️ Implementation Checklist

### Backend Setup

- [ ] Install dependencies: `passport`, `passport-google-oauth20`
- [ ] Configure Google OAuth 2.0 credentials in Google Cloud Console
- [ ] Add environment variables:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_CALLBACK_URL`
- [ ] Create migration: `04-add-google-oauth-support.sql`
- [ ] Implement `services/google-oauth-service.js`
- [ ] Create routes: `routes/google-auth-routes.js`
- [ ] Update `services/auth-service.js` to handle OAuth users
- [ ] Update `middleware/auth-middleware.js` to support Google tokens

### Frontend Setup

- [ ] Install `@react-oauth/google` or use Google Sign-In button
- [ ] Create `GoogleLoginButton.jsx` component
- [ ] Update `AuthContext.jsx` to handle OAuth flow
- [ ] Add OAuth callback handler route in React Router
- [ ] Implement token storage (localStorage or httpOnly cookies)
- [ ] Add Google profile picture display in UI

### Security Considerations

- [ ] Validate Google tokens on backend
- [ ] Implement CSRF protection for OAuth flow
- [ ] Use state parameter to prevent CSRF attacks
- [ ] Sanitize user input from Google profile
- [ ] Implement rate limiting on OAuth endpoints
- [ ] Add logging for OAuth events (success/failure)

### Testing

- [ ] Test new user registration via Google
- [ ] Test existing user login via Google (unified DB)
- [ ] Test migrating legacy users on first Google login
- [ ] Test multi-role detection across platforms
- [ ] Test role-based redirects after login
- [ ] Test token refresh flow
- [ ] Test error handling (OAuth failures, network issues)

---

## 🎯 Key Decision Points

### 1. **Account Linking Strategy**

**Question**: What if a user has an existing account with email/password and tries to login with Google using the same email?

**Recommended Approach**:

```javascript
// In google-oauth-service.js
async function handleGoogleLogin(googleProfile) {
  const existingUser = await findUserByEmail(googleProfile.email);

  if (existingUser) {
    if (!existingUser.google_id) {
      // Link Google account to existing account
      await updateUser(existingUser.id, {
        google_id: googleProfile.id,
        google_profile_picture: googleProfile.picture,
        auth_provider: "hybrid", // Both local and Google
      });
    }
    return generateToken(existingUser);
  } else {
    // Create new user
    return createGoogleUser(googleProfile);
  }
}
```

### 2. **Role Detection Priority**

When user exists in multiple legacy platforms with different roles:

1. Check Screenly first (most structured role system)
2. Check Work.Bizoforce (company-based roles)
3. Check Bizoforce (vendor/customer)
4. Check Giglancer (freelancer/employer)

Set `is_primary = true` for the most recent or most active role.

### 3. **Session Management**

- JWT expiration: 7 days (configurable)
- Refresh token: Optional (can use Google's refresh token)
- Auto-logout: On token expiration or manual logout

### 4. **Privacy Considerations**

- Only request `profile` and `email` scopes from Google
- Store minimal Google data (id, picture URL)
- Allow users to disconnect Google account
- Provide option to switch to local password

---

## 📱 Mobile/PWA Considerations

For future mobile app support:

- Use same OAuth flow with mobile deep links
- Redirect URI: `com.bizoforce.app://oauth/callback`
- Store JWT in secure storage (Keychain/Keystore)
- Implement biometric authentication after first login

---

## 🔐 Security Best Practices

1. **Never expose Google Client Secret** in frontend
2. **Validate Google ID token** on backend using Google's library
3. **Use HTTPS** for all OAuth redirects
4. **Implement rate limiting** on OAuth endpoints (max 5 attempts/15 min)
5. **Log all OAuth events** for security auditing
6. **Set proper CORS** for frontend domain only
7. **Use secure cookies** for token storage (httpOnly, secure, sameSite)
8. **Implement logout** that revokes Google access token

---

## 📈 Analytics & Monitoring

Track the following metrics:

- Google login success rate
- Account linking events
- User migration from legacy platforms
- Role detection accuracy
- Login failures (by reason)
- Average login time

---

## 🚀 Next Steps

1. **Phase 1**: Implement Google OAuth backend (services + routes)
2. **Phase 2**: Create database migrations for OAuth support
3. **Phase 3**: Build React Google login component
4. **Phase 4**: Test with all 5 databases
5. **Phase 5**: Implement role detection and migration logic
6. **Phase 6**: Add analytics and monitoring
7. **Phase 7**: Production deployment with security audit

---

_Last Updated: November 22, 2025_
_Version: 1.0_
