# Complete Role-Page Inventory
**Bizoforce Ecosystem Dashboard**  
*Last Updated: November 14, 2025*

---

## 📊 Overview

All roles now have complete, dedicated page sets organized in role-based folders. Total pages: **35 HTML files** across 5 role directories.

---

## 👤 Team Member (4 pages)
**Folder:** `dashboards/team-member/`

| Page | Description |
|------|-------------|
| `teammember-dashboard.html` | Personal dashboard with projects, hours, tasks stats |
| `team-profile.html` | Business profile (Employee ID, skills, portfolio, certifications) |
| `my-projects.html` | Assigned projects view (no budget visibility) |
| `my-tasks.html` | Task management with priorities and deadlines |

**Navigation Access:**
- Dashboard, Profile, Projects, Tasks
- Timesheets (shared: `company-admin/timesheets.html`)
- Settings (shared: `company-admin/settings.html`)

**Key Features:**
- ❌ No job posting access
- ❌ No earnings/financial data
- ❌ No wallet display
- ✅ View assigned projects and tasks
- ✅ Log work hours
- ✅ Business profile (not job seeker profile)

---

## 👨‍💼 Team Lead (4 pages)
**Folder:** `dashboards/team-lead/`

| Page | Description |
|------|-------------|
| `teamlead-dashboard.html` | Team overview with project cards and approval preview |
| `team-members.html` | Team roster with skills, assignments, performance |
| `approvals.html` | Timesheet approval workflow (18 pending items) |
| `reports.html` | Project analytics with budget vs spent tracking |

**Navigation Access:**
- Dashboard, Profile (shared: `team-member/team-profile.html`)
- Projects (shared: `company-admin/projects.html`)
- Team Members, Approvals, Reports
- Timesheets (shared: `company-admin/timesheets.html`)
- Settings (shared: `company-admin/settings.html`)

**Key Features:**
- ❌ No job posting access
- ✅ See project budgets in `my-projects.html` (Team Members cannot)
- ✅ Approve timesheets
- ✅ Manage team members
- ✅ View project analytics

---

## 👔 HR / Recruiter (6 pages)
**Folder:** `dashboards/hr/`

| Page | Description |
|------|-------------|
| `hr-dashboard.html` | Recruitment metrics, hiring funnel, interview calendar |
| `hr-jobs.html` | Job posting management with create modal |
| `hr-candidates.html` | 5-stage kanban board (New, Screening, Interview, Offer, Hired) |
| `hr-screening.html` | AI screening results and candidate scores |
| `hr-interviews.html` | Interview scheduling and management |
| `hr-onboarding.html` | Employee onboarding checklists and tasks |

**Navigation Access:**
- HR Dashboard, Jobs, Candidates, Screening, Interviews
- Talent Pool (shared: `company-admin/talent-pool.html`)
- Onboarding
- Timesheets (shared: `company-admin/timesheets.html`)
- Settings (shared: `company-admin/settings.html`)

**Key Features:**
- ✅ Post and manage jobs
- ✅ Screen candidates with AI
- ✅ Schedule interviews
- ✅ Manage hiring pipeline
- ✅ Onboard new employees
- ❌ No financial access (invoices, earnings)

---

## 🏢 Company Admin (17 pages)
**Folder:** `dashboards/company-admin/`

| Page | Description |
|------|-------------|
| `index.html` | Main company dashboard with all stats |
| `companies.html` | Company profile and settings |
| `products-services.html` | Marketplace listings management |
| `virtual-resources.html` | **NEW** Browse and hire resources from Giglancer |
| `placements.html` | **NEW** Track resources placed with other companies |
| `jobs.html` | Job posting management |
| `job-detail.html` | Single job view with candidate pipeline |
| `candidates.html` | Candidate directory |
| `candidate-detail.html` | Candidate 360 profile |
| `talent-pool.html` | Unified talent pool management |
| `projects.html` | Project management (shared with Team Leads) |
| `timesheets.html` | Timesheet entry and approval (shared by all company roles) |
| `invoices.html` | Invoice generation and tracking |
| `earnings.html` | Revenue and earnings dashboard |
| `users-roles.html` | User management and role assignment |
| `subscriptions.html` | Subscription and billing management |
| `settings.html` | Company settings and integrations (shared by all) |

**Navigation Access:**
- Full access to all company features
- Can act as any other role (HR, Finance, Vendor, etc.)
- Marketplace: Products/Services, Virtual Resources, Placements

**Key Features:**
- ✅ Complete system access
- ✅ Hire virtual resources from marketplace
- ✅ Track placements and commissions
- ✅ Manage all users and roles
- ✅ Financial management
- ✅ Can delegate functions to specialized roles

---

## 🙋 Individual / Job Seeker (4 pages)
**Folder:** `dashboards/individual/`

| Page | Description |
|------|-------------|
| `profile.html` | **NEW** Job seeker profile with resume, experience, education |
| `applications.html` | **NEW** Job application tracking with 5-stage pipeline |
| `my-timesheets.html` | Personal timesheet entry (when hired) |
| `my-earnings.html` | Personal earnings tracking (when hired) |

**Navigation Access:**
- Profile, Applications
- Browse Jobs (shared: `company-admin/jobs.html` - view only)
- My Projects (shared: `team-member/my-projects.html` - when hired)
- My Timesheets, My Earnings
- Settings

**Key Features:**
- ✅ Create comprehensive job seeker profile
- ✅ Resume upload and management
- ✅ Track job applications across pipeline stages
- ✅ Application stats dashboard
- ✅ When hired → access projects, timesheets, earnings
- ❌ Cannot post jobs or manage company features

**Profile Differences:**
- **Individual Profile** (`individual/profile.html`): Resume, work history, education, job preferences, salary expectations
- **Team Profile** (`team-member/team-profile.html`): Employee ID, department, manager, current projects, certifications

---

## 📂 Shared Resources

### Shared by Multiple Roles:

| Page | Used By | Location |
|------|---------|----------|
| `timesheets.html` | All company roles + Individual (when hired) | `company-admin/` |
| `settings.html` | All roles | `company-admin/` |
| `projects.html` | Company Admin, Team Lead | `company-admin/` |
| `talent-pool.html` | Company Admin, HR | `company-admin/` |
| `team-profile.html` | Team Member, Team Lead | `team-member/` |
| `my-projects.html` | Team Member, Individual (when hired) | `team-member/` |
| `jobs.html` | Company Admin, HR (post), Individual (browse) | `company-admin/` |

### Why Shared?
- **Efficiency**: Single source of truth for common functionality
- **Consistency**: Same UI/UX across roles
- **Maintainability**: Update once, affects all roles
- **Role Detection**: JavaScript checks `userRole` to show/hide features

---

## 🆕 Newly Created Pages (5 total)

### Individual User Pages (2):
1. **`individual/profile.html`** - Comprehensive job seeker profile
   - Resume upload/download
   - Work experience timeline
   - Education history
   - Skills showcase
   - Social/portfolio links
   - Certifications
   - Job preferences (salary, location, type)
   - Application stats

2. **`individual/applications.html`** - Application tracking
   - 5-stage pipeline (Applied, Screening, Interview, Offer, Hired)
   - 24 dummy applications
   - Application stats cards
   - Filter by status, date, job type
   - Upcoming interview reminders

### Company Admin Pages (2):
3. **`company-admin/virtual-resources.html`** - Hire marketplace resources
   - Browse 847 available resources
   - Advanced filters (skills, experience, rate, availability)
   - Resource cards with profile previews
   - Hire and view profile actions
   - Integration with Giglancer marketplace

4. **`company-admin/placements.html`** - Track resource placements
   - 24 total placements (12 active, 5 pending, 7 completed)
   - Commission tracking per placement
   - Monthly earnings breakdown
   - Client billing information
   - Timesheet and invoice access
   - Re-engagement options

### Path Updates:
5. **All 35 HTML files** - CSS/JS paths updated to `../assets/` for subfolder compatibility

---

## 🎯 Role-Based Feature Matrix

| Feature | Team Member | Team Lead | HR | Company Admin | Individual |
|---------|------------|-----------|-----|---------------|-----------|
| Post Jobs | ❌ | ❌ | ✅ | ✅ | ❌ |
| Screen Candidates | ❌ | ❌ | ✅ | ✅ | ❌ |
| View Budget | ❌ | ✅ | ❌ | ✅ | ❌ |
| Approve Timesheets | ❌ | ✅ | ❌ | ✅ | ❌ |
| Manage Team | ❌ | ✅ | ❌ | ✅ | ❌ |
| Access Financials | ❌ | ❌ | ❌ | ✅ | Own Only |
| Hire Virtual Resources | ❌ | ❌ | ❌ | ✅ | ❌ |
| Track Placements | ❌ | ❌ | ❌ | ✅ | ❌ |
| Apply to Jobs | ❌ | ❌ | ❌ | ❌ | ✅ |
| Upload Resume | ❌ | ❌ | ❌ | ❌ | ✅ |
| Log Hours | ✅ | ✅ | ✅ | ✅ | ✅ (when hired) |
| View Projects | ✅ | ✅ | ❌ | ✅ | ✅ (when hired) |

---

## 🛠️ Technical Implementation

### Navigation System (`dashboard.js`):
```javascript
// Automatic role detection
const userType = localStorage.getItem('userType'); // 'company' or 'individual'
const userRole = localStorage.getItem('userRole'); // 'HR', 'Team Lead', etc.

// Navigation paths include folder prefixes
{ href: 'team-member/teammember-dashboard.html' }
{ href: 'hr/hr-dashboard.html' }
{ href: 'company-admin/index.html' }
{ href: 'individual/profile.html' }
```

### Folder Structure:
```
dashboards/
├── team-member/        (4 pages)
├── team-lead/          (4 pages)
├── hr/                 (6 pages)
├── company-admin/      (17 pages)
├── individual/         (4 pages)
├── assets/
│   ├── css/dashboard.css
│   └── js/dashboard.js
├── login.html          (Google OAuth - public entry)
└── company-login.html  (Work email - employee entry)
```

### Asset Paths:
- **Root pages** (login.html, company-login.html): `assets/css/dashboard.css`
- **Subfolder pages** (all role folders): `../assets/css/dashboard.css`

---

## ✅ Completion Status

### Team Member: ✅ Complete (4/4 pages)
- Dashboard, Profile, Projects, Tasks

### Team Lead: ✅ Complete (4/4 pages)
- Dashboard, Team Members, Approvals, Reports

### HR: ✅ Complete (6/6 pages)
- Dashboard, Jobs, Candidates, Screening, Interviews, Onboarding

### Company Admin: ✅ Complete (17/17 pages)
- All management features + new marketplace pages

### Individual: ✅ Complete (4/4 pages)
- Profile, Applications, Timesheets, Earnings

---

## 🚀 Next Steps

### Testing:
- [ ] Test all navigation links across roles
- [ ] Verify role-based visibility (budget in my-projects.html)
- [ ] Test login redirects for each role
- [ ] Verify CSS/JS loading in all pages
- [ ] Test shared pages from different roles

### Backend Integration:
- [ ] Replace localStorage with API authentication
- [ ] Implement real-time role permissions
- [ ] Connect to Giglancer marketplace API
- [ ] Integrate AI screening service
- [ ] Set up commission calculation engine

### Enhancements:
- [ ] Add real-time notifications
- [ ] Implement chat/messaging
- [ ] Add analytics dashboards
- [ ] Create mobile-responsive views
- [ ] Add export/reporting features

---

## 📝 Notes

- **All pages use the same design system** (`dashboard.css`)
- **All pages share navigation logic** (`dashboard.js`)
- **Role detection is automatic** based on localStorage
- **Shared pages adapt** based on user role
- **File organization is clear** and maintainable
- **No duplicate code** across role folders
- **35 total HTML pages** organized across 5 folders

---

*This inventory ensures every role has complete, dedicated functionality while maintaining code efficiency through strategic resource sharing.*
