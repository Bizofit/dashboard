# Bizoforce Unified Dashboard - Full Stack Application

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
export const unifiedUsers = mysqlTable('unified_users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  googleId: varchar('google_id', { length: 255 }).unique(),
  bizoforceUserId: int('bizoforce_user_id'),    // References wp_users.ID
  giglancerUserId: int('giglancer_user_id'),    // References users.id in Giglancer
  screenlyUserId: int('screenly_user_id'),      // References users.id in Screenly
  workUserId: int('work_user_id'),              // References users.id in Work.Bizoforce
  authProvider: mysqlEnum('auth_provider', ['local', 'google', 'hybrid']),
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
export const userRoles = mysqlTable('user_roles', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  roleType: mysqlEnum('role_type', [
    'company_admin', 'hr', 'team_lead', 'team_member',
    'finance', 'vendor', 'resource_provider', 'job_seeker', 'freelancer'
  ]).notNull(),
  platform: varchar('platform', { length: 50 }),
  companyId: int('company_id'),
  isPrimary: boolean('is_primary').default(false),
});
```

## Development Workflows

### Essential Commands
```powershell
# Start dev server with TypeScript hot-reload (port 3006)
npm run dev

# Build for production (frontend + backend)
npm run build:prod

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
```

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
```

**PostgreSQL (Screenly only)**: Uses node-postgres pool:
```typescript
import { screenlyDB, screenlyPool } from '../db';

// Drizzle queries work the same
const result = await screenlyDB.select().from(someTable);

// Raw queries if needed
const client = await screenlyPool.connect();
const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
client.release();
```
  [email]
);
```

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
```

### Error Handling Convention
Routes throw errors, Express error handler catches:
```typescript
// In route (server/routes/auth.ts)
import { Request, Response } from 'express';

if (!user) throw new Error('User not found');

// Express error handler
try {
  const result = await someAsyncOperation();
  res.json({ success: true, data: result });
} catch (error) {
  res.status(400).json({ 
    success: false, 
    message: error instanceof Error ? error.message : 'Unknown error' 
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

## Important Constraints

1. **Never use `&&` in PowerShell** - Use `;` to chain commands
2. **PostgreSQL uses `$1, $2` placeholders** - MySQL uses `?`
3. **Migrations are sequential** - Prefix with `01-`, `02-`, etc.
4. **User IDs are preserved** - Always maintain platform-specific foreign keys
5. **Email is primary identifier** - Used for deduplication across platforms
6. **Multi-role requires context** - Include `company_id` when querying roles

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
router.post('/jobs', authenticate, authorize('company_admin', 'hr'), createJob);
router.get('/earnings', authenticate, authorize('team_member', 'finance'), getEarnings);
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
import { createContext, useState, ReactNode } from 'react';

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

*Last Updated: November 18, 2025*
*Bizoforce Unified Dashboard v1.0*
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
        auth_provider: 'hybrid'  // Both local and Google
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

*Last Updated: November 22, 2025*
*Version: 1.0*
