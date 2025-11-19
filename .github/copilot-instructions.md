# Bizoforce Unified Dashboard - Backend API

## Project Overview
Unified authentication and data aggregation API for the Bizoforce ecosystem, consolidating **5 separate databases** (1 unified + 4 legacy platforms) into a single dashboard experience. This is an **active migration project** - users exist across multiple platforms and need consolidated access.

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
- **Unified DB** (MySQL): `bizoforce_newdashboard` - Master user registry, new unified schema
- **Bizoforce** (MySQL): WordPress/WooCommerce platform (198K+ users, 565 tables)
- **Giglancer** (MySQL): Job marketplace (82K+ users, 162 tables)
- **Screenly** (PostgreSQL): AI screening platform (24 users, 50 tables)
- **Work.Bizoforce** (MySQL): Project/timesheet management (1.1K users, 226 tables)

All databases are on remote server `72.167.148.100`. Connection pools managed in `config/database.js`.

### User Migration Pattern
Users migrate from legacy platforms to unified DB while **preserving platform-specific IDs**:
```javascript
unified_users {
  id: 1033,
  email: "user@example.com",
  bizoforce_user_id: 42,    // References wp_users.ID
  giglancer_user_id: 789,    // References users.id in Giglancer
  screenly_user_id: 12,      // References users.id in Screenly
  work_user_id: 456          // References users.id in Work.Bizoforce
}
```

### Multi-Role System
Users can have **multiple roles across contexts** (see `migrations/03-add-multi-role-support.sql`):
- Same user can be: Company Admin, Vendor, Freelancer, Team Member
- `user_roles` table with `is_primary` flag for role switching
- Example: `sudh013@gmail.com` is Vendor (Bizoforce) + Freelancer (Giglancer) + Company Admin (Screenly)

## Development Workflows

### Essential Commands
```powershell
# Start dev server with auto-reload
npm run dev

# Test all 5 database connections
npm test

# Run migrations (creates unified tables)
node run-migration.js

# Run specific migration
node scripts/run-specific-migration.js 03-add-multi-role-support.sql

# Test authentication endpoints
node test-auth-api.js

# Analyze/migrate users from legacy platforms
node scripts/migrate-users.js
node scripts/check-migrated-users.js
```

### Migration Workflow
1. Create SQL in `migrations/` (e.g., `04-new-feature.sql`)
2. Run: `node scripts/run-specific-migration.js 04-new-feature.sql`
3. Migration script handles multi-line statements and SQL comments

## Code Patterns

### Database Queries
Use connection pools from `config/database.js`:
```javascript
const { unifiedDB, bizoforceDB, giglancerDB } = require('../config/database');

// Standard query pattern
const [rows] = await unifiedDB.query(
  'SELECT * FROM unified_users WHERE email = ?',
  [email]
);
```

**PostgreSQL (Screenly only)**: Use `rows` directly (no destructuring):
```javascript
const result = await screenlyDB.query('SELECT * FROM users WHERE id = $1', [id]);
const rows = result.rows;
```

### Authentication Flow
JWT-based auth with 7-day expiration (see `services/auth-service.js`):
1. Register/Login → Generate JWT with `{ userId, email, userType }`
2. Frontend sends: `Authorization: Bearer <token>`
3. Middleware `authenticate()` verifies and attaches `req.user`
4. Optional: `authorize('company', 'vendor')` restricts by user type

### Protected Routes Pattern
```javascript
const { authenticate, authorize } = require('../middleware/auth-middleware');

// Require authentication
router.get('/profile', authenticate, handler);

// Restrict by user type
router.post('/jobs', authenticate, authorize('company', 'hr'), handler);

// Optional auth (public but personalized)
router.get('/listings', optionalAuth, handler);
```

### Error Handling Convention
Services throw errors, routes catch and format:
```javascript
// In service (auth-service.js)
if (!user) throw new Error('User not found');

// In route (auth-routes.js)
try {
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
} catch (error) {
  res.status(400).json({ success: false, message: error.message });
}
```

## Key Files & Their Roles

- **`server.js`**: Express app, security middleware (Helmet, CORS, rate limiting), route registration
- **`config/database.js`**: All 5 database connection pools, `testConnections()` helper
- **`services/auth-service.js`**: Business logic for register, login, JWT generation/verification
- **`middleware/auth-middleware.js`**: `authenticate`, `authorize`, `optionalAuth` middlewares
- **`migrations/*.sql`**: Database schema changes (run via `run-migration.js`)
- **`docs/MULTI-ROLE-MANAGEMENT.md`**: Detailed multi-role architecture strategy
- **`docs/USER-MIGRATION-STRATEGY.md`**: Analysis of user tables across all 4 legacy platforms

## Testing Strategy

### Database Connection Tests
Each platform has a test file: `test-db.js`, `test-bizoforce.js`, `test-giglancer.js`, etc.
- Verify connections
- Query sample data
- Check table structures

### API Testing
`test-auth-api.js` runs automated E2E tests:
- Register → Login → Get Profile → Refresh Token → Logout
- Currently 7/7 tests passing

## Security Configurations

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Secret**: `JWT_SECRET` in `.env` (7-day expiration)
- **Rate Limiting**: 100 requests per 15 minutes on `/api/*` routes
- **CORS**: Configured for `FRONTEND_URL`, `FRONTEND_PRODUCTION_URL`, localhost:5500
- **Helmet**: Security headers enabled by default

## Environment Variables
Required in `.env` (5 databases × 5 credentials each = 25 vars):
```
# Unified DB
UNIFIED_DB_HOST=72.167.148.100
UNIFIED_DB_USER=...
UNIFIED_DB_PASS=...
UNIFIED_DB_NAME=bizoforce_newdashboard

# + 4 more sets (BIZOFORCE_*, GIGLANCER_*, SCREENLY_*, WORK_*)
# + JWT_SECRET, PORT, NODE_ENV, FRONTEND_URL
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
- **Runtime**: Node.js v24+
- **Framework**: Express.js v5+
- **Database Drivers**: mysql2 (MySQL), pg (PostgreSQL)
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Security**: Helmet, CORS, express-rate-limit

### Frontend (To Be Created)
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API or Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Design System Colors (from existing wireframes)
```css
--primary-blue: #2563eb
--accent-orange: #f97316
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--purple: #8b5cf6
--pink: #ec4899
```

## Frontend Development Guidelines

When building the React frontend in `client/`:
1. Use Tailwind CSS utility classes (no custom CSS files)
2. Create reusable components (Button, Card, Modal, Table, etc.)
3. Implement responsive design (mobile-first approach)
4. Use React Router for navigation
5. Axios interceptors for JWT token handling
6. Context API for global state (user auth, role switching)

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
```javascript
// Protect endpoints by role
router.post('/jobs', authenticate, authorize('company_admin', 'hr'), createJob);
router.get('/earnings', authenticate, authorize('team_member', 'finance'), getEarnings);
```

## User Roles & Authorization

## User Roles & Authorization

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
- `Button.jsx` - Reusable button with variants (primary, secondary, danger, success)
- `Card.jsx` - Stats cards and content cards
- `Modal.jsx` - Modal dialogs for forms and actions
- `Table.jsx` - Data tables with sorting and filtering
- `Sidebar.jsx` - Navigation sidebar
- `Header.jsx` - Top navigation bar

### Tailwind CSS Patterns
Use utility classes for styling:
```jsx
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
```jsx
// AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
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
6. **Database Queries** - Use connection pools from `config/database.js`
7. **Frontend Styling** - Tailwind CSS utility classes only, no custom CSS
8. **Component Reusability** - Build shared components in `client/src/components/`

---

*Last Updated: November 18, 2025*
*Bizoforce Unified Dashboard Backend v1.0*
