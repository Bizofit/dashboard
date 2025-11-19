# Bizoforce Ecosystem Dashboard - Development Instructions

## 📋 Overview
This document provides comprehensive instructions for developing and maintaining the Bizoforce unified dashboard ecosystem. **All development work must follow these guidelines and use todo lists for tracking progress.**

### 🔐 Entry Point
**login.html** is the first page users see. It identifies whether the user is:
- **Company User** (7 roles: Company Admin, Vendor, HR, Team Lead, Team Member, Finance, Resource Provider)
- **Individual User** (Candidate/Job Seeker)

After login, users are redirected to their respective dashboards based on user type and role.

---

## 🎯 Core Principles

### 1. **Always Create Todo Lists**
- **MANDATORY**: For ANY prompt or request, create a todo list before starting work
- Break down complex tasks into manageable steps
- Track progress by updating todo status (not-started → in-progress → completed)
- Mark items as completed immediately after finishing each one
- Never batch completions - update after each step

### 2. **Role-Based Architecture**
All features must support multiple user roles with dynamic UI changes based on the current role.

---

## 👥 User Groups & Roles

### **USER GROUP 1 — COMPANY USERS**

#### Company Admin (Master Role)
Can act as any role with full access to all features:
- Full company-level administration
- Can perform HR, Team Lead, Finance, and Vendor functions
- Manage all users and permissions
- **Primary user** who can handle everything alone or delegate to specialized roles

#### Delegated Roles (5 Optional - Assign when scaling):
1. **HR (Hiring & Recruitment)** - Post jobs, screen candidates, conduct interviews, manage hiring pipeline, onboard new hires. *Admin can do this, but delegate when hiring volume increases.*
2. **Team Lead (Project Manager)** - Create and manage projects, assign team members, approve timesheets, track progress. *Admin can do this, but delegate for large teams.*
3. **Team Member (Employee)** - Log work hours, view assigned projects, track personal earnings, submit timesheets. *For individual contributors.*
4. **Finance (Billing & Payments)** - Generate invoices, process payments, track revenue, manage billing cycles. *Admin can do this, but delegate for dedicated accounting.*
5. **Vendor (Products/Services)** - Create and manage product/service listings, handle marketplace sales. *Admin can do this, but delegate for dedicated sales team.*

**Use Case**: Small companies can operate with Admin only. As company grows, Admin delegates specific functions (HR for recruitment, Finance for billing, etc.) to specialized team members.

### **USER GROUP 2 — INDIVIDUAL USERS**

Job seekers and freelancers:
- Search and apply to jobs
- Upload resume and portfolio
- Go through AI screening/interviews
- Accept job offers
- Access "My Projects", "My Timesheets", "My Earnings" when hired
- May become team members inside a company later

**Requirements**: Individual users need a separate login page

---

## 📁 File Structure

### Entry Point
```
dashboards/
├── login.html                    # 🔐 PUBLIC ENTRY POINT - Google OAuth for Company & Individual users
├── company-login.html            # 🏢 COMPANY EMPLOYEE LOGIN - Work email login + Google linking
```

### Core Dashboard Pages
```
dashboards/
├── index.html                    # Unified dashboard overview (Company Users)
├── companies.html                # Company settings & profile
├── products-services.html        # Products/services marketplace
├── jobs.html                     # Job listings & creation (Giglancer + Screenly)
├── job-detail.html              # Single job + candidate pipeline + screening
├── talent-pool.html             # Unified talent pool view
├── candidates.html              # Candidate directory
├── candidate-detail.html        # Candidate 360 profile
├── projects.html                # Projects list (work.bizoforce)
├── timesheets.html              # Timesheet entry & approval
├── earnings.html                # Earnings view for team/candidates
├── invoices.html                # Invoices & billing
├── subscriptions.html           # Subscription & plan usage
├── users-roles.html             # Users & roles management
├── settings.html                # Settings & integrations
```

### Individual User Pages
```
dashboards/
├── profile.html                 # Individual user profile (job seeker) - DEFAULT landing for individual users
├── applications.html            # Individual job applications
├── my-projects.html            # Individual projects view (when hired)
├── my-timesheets.html          # Individual timesheet entry
├── my-earnings.html            # Individual earnings summary
```

### Shared Assets
```
dashboards/assets/
├── css/
│   └── dashboard.css           # Unified styling for all pages
└── js/
    └── dashboard.js            # Shared JavaScript logic
```

---

## 🎨 Global Layout (All Pages)

### Required Components on Every Page:

#### 1. **Left Sidebar**
- Logo with icon + text (`sidebar-logo`)
- Navigation menu (`sidebar-menu`)
- Active page highlighting
- Role-based menu items (show/hide based on role)

#### 2. **Top Header Bar**
- App logo/title (Bizoforce branding)
- Search bar (context-aware based on page)
- Wallet display (showing balance/credits)
- Notifications icon (with badge count)
- User avatar/name placeholder

#### 3. **Main Content Area**
- Page header with title and description
- Stats cards (4-column grid, color-coded)
- Content sections (tables, grids, forms, charts)
- Modals for create/edit actions
- Responsive layout

---

## 🔄 Navigation System

Navigation is automatically determined based on user type (Company vs Individual) stored in localStorage.

### Company User Menu:
```
Dashboard
Company Profile
Products & Services
Hiring
  ├── Jobs
  ├── Talent Pool
  └── Candidates
Projects
Timesheets
Finance
  ├── Invoices
  └── Earnings
Subscriptions
Users & Roles
Settings
```

### HR/Recruiter Menu:
```
Dashboard
Jobs
Candidates
Talent Pool
Screening Pipeline
Interview Schedule
Offers
Settings
```

### Team Member/Resource Menu:
```
Dashboard
My Profile
My Projects
My Timesheets
My Earnings
Settings
```

### Individual User/Candidate Menu:
```
Dashboard
Profile
Job Search
Applications
AI Screening
Interviews
Offers
My Projects (if hired)
My Timesheets (if hired)
My Earnings (if hired)
```

### Implementation:
```javascript
// In dashboard.js - generateNavigation() function
function generateNavigation() {
  const userType = localStorage.getItem('userType') || 'company';
  
  if (userType === 'individual') {
    // Show individual user menu: Profile, Applications, My Projects, etc.
  } else {
    // Show company user menu: Dashboard, Companies, Jobs, etc.
  }
}
```

---

## 📊 Dashboard Content (index.html)

### Summary Cards (Role-Based):

#### Company Admin View:
- Total Companies (dummy: 245)
- Active Projects (dummy: 87)
- Open Jobs (dummy: 156)
- Candidates in Pipeline (dummy: 2,847)
- Pending Timesheets (dummy: 24)
- Open Invoices (dummy: $87,540)

#### Finance View:
- Total Revenue (dummy: $542,890)
- Pending Invoices (dummy: $87,540)
- Paid Invoices (dummy: $455,350)
- Outstanding Balance (dummy: $24,780)

#### HR/Recruiter View:
- Open Jobs (dummy: 156)
- Total Applications (dummy: 2,847)
- Candidates Screened (dummy: 1,234)
- Interviews Scheduled (dummy: 89)
- Offers Extended (dummy: 45)
- Hired This Month (dummy: 23)

### Charts & Visualizations:

#### Hiring Funnel (Progress Bars):
```
Applied → Screened → Interviewed → Hired
2,847    1,234       89            23
```

#### Hours Logged vs Billed:
```
Hours Logged: 2,840 hrs
Billable Hours: 2,456 hrs (87%)
Total Billed: $245,600
```

Use `<canvas>` with Chart.js or simple CSS progress bars.

---

## 🔑 End-to-End Workflows

### 0. **Login & Authentication Flow** (ENTRY POINT)
```
PUBLIC LOGIN (login.html):
1. Visit login.html (main public entry)
2. Two options presented:
   a) "Continue with Google" (Company Admins & Individual Users)
   b) "Company Employee Login" link → redirects to company-login.html
3. Google OAuth flow:
   - User signs in with Google
   - System detects if email is admin/individual
   - Redirects accordingly
4. Store: userType, userEmail, loginMethod: 'google'

COMPANY EMPLOYEE LOGIN (company-login.html):
1. Accessed via link from login.html OR direct URL
2. Employee enters work email (hr@company.com)
3. Receives magic link/OTP to work email
4. Clicks link or enters OTP code
5. On first login: prompted to "Link Google Account" (optional)
6. Select role from dropdown (HR, Team Member, Finance, etc.)
7. Store: userType: 'company', userRole, userEmail, linkedGoogleEmail
8. Redirect to index.html

Google Linking Benefits:
- Faster subsequent logins
- Calendar integration
- Google Drive access
- Single sign-on experience
- Can still use work email as primary

User Type Detection:
- Company Admin → has company, can invite others
- Individual User → job seeker, no company affiliation
- Company Employee → invited by admin, has work email
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
1. Sign up / Login (login.html - select "Individual User")
2. Redirected to profile.html (landing page for individuals)
3. Create/update profile (profile.html)
3. Upload resume and portfolio
4. Search jobs (job search feature)
5. Apply to jobs (applications.html)
6. Complete AI screening
7. Attend interviews
8. Receive and accept offer
9. Get project assignment → my-projects.html
10. Log hours → my-timesheets.html
11. Track earnings → my-earnings.html
```

---

## 🎨 Design System

### Color Scheme:
```css
--primary-blue: #2563eb
--primary-dark: #1e40af
--accent-orange: #f97316
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--purple: #8b5cf6
--pink: #ec4899
```

### Component Patterns:

#### Stats Cards:
```html
<div class="stat-card-colored blue">
  <div class="stat-card-content">
    <h3>Card Title</h3>
    <p class="stat-number">123</p>
    <p class="stat-change positive">↑ 12% this month</p>
  </div>
  <div class="stat-card-icon">
    <!-- SVG icon -->
  </div>
</div>
```

#### Tables:
```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr><th>Column 1</th></tr>
    </thead>
    <tbody>
      <tr><td>Data</td></tr>
    </tbody>
  </table>
</div>
```

#### Action Buttons:
```html
<div class="action-buttons">
  <button class="btn-icon" title="View">
    <svg>...</svg>
  </button>
  <button class="btn-icon danger" title="Delete">
    <svg>...</svg>
  </button>
</div>
```

---

## 📝 Dummy Data Guidelines

### Use Realistic Numbers:
- **Companies**: 245 total, 198 active
- **Jobs**: 156 open positions
- **Candidates**: 2,847 in pipeline
- **Projects**: 87 active, 342 completed
- **Revenue**: $542,890 total, $87,540 monthly
- **Users**: 486 total, 412 active

### Sample Names:
- **Companies**: TechCorp, DataSystems Inc., CloudServices Ltd.
- **Users**: John Smith, Sarah Johnson, Michael Chen
- **Jobs**: Senior Developer, Marketing Manager, Data Analyst
- **Projects**: Website Redesign, CRM Implementation, Mobile App

---

## ✅ Development Workflow

### For Every New Feature/Request:

1. **Create Todo List** (MANDATORY)
   ```
   - [ ] Understand requirements
   - [ ] Plan implementation steps
   - [ ] Update HTML structure
   - [ ] Add CSS styling
   - [ ] Implement JavaScript functionality
   - [ ] Test role-based visibility
   - [ ] Verify responsiveness
   - [ ] Update documentation
   ```

2. **Break Down Complex Tasks**
   - Use sub-tasks for clarity
   - Mark dependencies clearly
   - Update status as you progress

3. **Mark Completion Immediately**
   - Don't batch completions
   - Update after each step
   - Provide brief progress updates

4. **Test User Type Features**
   - Verify company users see company navigation
   - Verify individual users see individual navigation
   - Test proper redirection based on userType in localStorage

5. **Maintain Consistency**
   - Use existing CSS classes
   - Follow established naming conventions
   - Keep layout structure uniform across pages

---

## 🔧 Technical Requirements

### HTML:
- Semantic HTML5 elements
- Consistent layout structure across all pages
- Role-based content visibility using JavaScript
- Accessibility attributes (aria-labels, titles)

### CSS:
- Single unified `dashboard.css` file
- CSS variables for theming
- Responsive design (mobile, tablet, desktop)
- Smooth transitions and animations
- Consistent spacing and typography

### JavaScript:
- Single unified `dashboard.js` file
- Role-based navigation generation
- Modal management
- Tab switching
- Form validation
- LocalStorage for role persistence

---

## 📦 Workspace Organization

### Company Workspaces:
1. **Company Workspace** - companies.html
2. **Marketplace Workspace** - products-services.html
3. **Hiring Workspace** - jobs.html, job-detail.html, candidates.html, talent-pool.html
4. **Project Workspace** - projects.html
5. **Timesheet Workspace** - timesheets.html
6. **Finance Workspace** - invoices.html, earnings.html
7. **User/Role Management** - users-roles.html
8. **Settings Workspace** - settings.html, subscriptions.html

### Individual Workspaces:
1. **Profile** - profile.html
2. **Applications** - applications.html
3. **AI Screening** - (integrated in application flow)
4. **Interviews** - (integrated in application flow)
5. **Offers** - (integrated in application flow)
6. **My Projects** - my-projects.html
7. **My Timesheets** - my-timesheets.html
8. **My Earnings** - my-earnings.html

---

## 🚀 Next Steps for Full Implementation

### Additional Pages Needed:
```
✅ login.html (PUBLIC ENTRY - Google OAuth)
✅ company-login.html (COMPANY EMPLOYEE - Work email login)
✅ index.html (Company dashboard)
✅ companies.html
✅ products-services.html
✅ jobs.html
✅ job-detail.html
✅ candidates.html
✅ candidate-detail.html
✅ talent-pool.html
✅ projects.html
✅ timesheets.html
✅ invoices.html
✅ earnings.html
✅ users-roles.html
✅ subscriptions.html
✅ settings.html

⏳ Individual User Pages:
✅ profile.html (Individual dashboard - landing page)
✅ applications.html
✅ my-projects.html
✅ my-timesheets.html
✅ my-earnings.html
```

### Navigation System:
✅ Automatic user type detection (company vs individual)
✅ Separate navigation menus based on userType in localStorage
✅ Active page highlighting
✅ Smooth navigation between pages

### Charts & Visualizations:
- [ ] Hiring funnel chart
- [ ] Hours logged vs billed chart
- [ ] Revenue trends chart
- [ ] Project progress charts
- [ ] Timesheet summary charts

### AI Screening Integration:
- [ ] AI screening workflow pages
- [ ] Interview scheduling interface
- [ ] Candidate scoring system
- [ ] Automated pipeline movement

---

## 📞 Support & Questions

For any questions or clarifications about these instructions, refer to:
- Design system: `dashboard.css`
- Navigation logic: `dashboard.js`
- Sample implementations: existing HTML pages
- This instructions file: `INSTRUCTIONS.md`

**Remember**: ALWAYS create a todo list before starting any development work!

---

*Last Updated: November 13, 2025*
*Bizoforce Ecosystem Dashboard v1.0*
