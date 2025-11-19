# Bizoforce Role-Based Folder Structure

## Overview
All dashboard pages have been reorganized into role-specific folders for better maintainability and clear separation of concerns.

---

## 📁 Folder Structure

```
dashboards/
├── assets/
│   ├── css/
│   │   └── dashboard.css (shared by all roles)
│   └── js/
│       └── dashboard.js (navigation with role-based paths)
├── login.html (public entry - Google OAuth)
├── company-login.html (company employee entry - updated redirects)
├── team-member/ (4 pages)
│   ├── teammember-dashboard.html
│   ├── team-profile.html (business profile)
│   ├── my-projects.html
│   └── my-tasks.html
├── team-lead/ (4 pages)
│   ├── teamlead-dashboard.html
│   ├── team-members.html
│   ├── approvals.html
│   └── reports.html
├── hr/ (6 pages)
│   ├── hr-dashboard.html
│   ├── hr-jobs.html
│   ├── hr-candidates.html
│   ├── hr-screening.html
│   ├── hr-interviews.html
│   └── hr-onboarding.html
├── company-admin/ (15 pages - shared/admin)
│   ├── index.html (dashboard)
│   ├── companies.html
│   ├── products-services.html
│   ├── jobs.html
│   ├── job-detail.html
│   ├── candidates.html
│   ├── candidate-detail.html
│   ├── talent-pool.html
│   ├── projects.html
│   ├── timesheets.html
│   ├── invoices.html
│   ├── earnings.html
│   ├── users-roles.html
│   ├── subscriptions.html
│   └── settings.html
└── individual/ (2 pages existing, 3 to be created)
    ├── my-earnings.html
    ├── my-timesheets.html
    ├── profile.html (TO BE CREATED - job seeker profile)
    ├── applications.html (TO BE CREATED)
    └── (uses shared: jobs.html, my-projects.html)
```

---

## 🔗 Navigation Path Updates

All navigation links in `dashboard.js` have been updated to reflect the new folder structure:

### Team Member Navigation
```javascript
team-member/teammember-dashboard.html
team-member/team-profile.html
team-member/my-projects.html
team-member/my-tasks.html
company-admin/timesheets.html (shared)
company-admin/settings.html (shared)
```

### Team Lead Navigation
```javascript
team-lead/teamlead-dashboard.html
team-member/team-profile.html (shared with Team Member)
company-admin/projects.html (shared)
team-lead/team-members.html
company-admin/timesheets.html (shared)
team-lead/approvals.html
team-lead/reports.html
company-admin/settings.html (shared)
```

### HR Navigation
```javascript
hr/hr-dashboard.html
hr/hr-jobs.html
hr/hr-candidates.html
hr/hr-screening.html
hr/hr-interviews.html
company-admin/talent-pool.html (shared)
hr/hr-onboarding.html
company-admin/timesheets.html (shared)
company-admin/settings.html (shared)
```

### Company Admin Navigation
```javascript
company-admin/index.html
company-admin/companies.html
company-admin/products-services.html
company-admin/jobs.html
company-admin/candidates.html
hr/hr-screening.html (shared with HR)
hr/hr-interviews.html (shared with HR)
company-admin/talent-pool.html
hr/hr-onboarding.html (shared with HR)
company-admin/projects.html
company-admin/timesheets.html
company-admin/invoices.html
company-admin/earnings.html
company-admin/users-roles.html
company-admin/subscriptions.html
company-admin/settings.html
```

### Individual User Navigation
```javascript
individual/profile.html (TO BE CREATED)
individual/applications.html (TO BE CREATED)
company-admin/jobs.html (browse jobs - shared)
team-member/my-projects.html (after hired - shared)
individual/my-timesheets.html
individual/my-earnings.html
company-admin/settings.html (shared)
```

---

## 🔐 Login Redirects Updated

`company-login.html` now redirects to role-specific folders:

| Role | Redirect Path |
|------|---------------|
| Company Admin | `company-admin/index.html` |
| HR | `hr/hr-dashboard.html` |
| Finance | `company-admin/invoices.html` |
| Team Lead | `team-lead/teamlead-dashboard.html` |
| Team Member | `team-member/teammember-dashboard.html` |
| Vendor | `company-admin/products-services.html` |

---

## 📋 Shared Pages Rationale

### Why Some Pages Are Shared:

**company-admin/timesheets.html** - Used by:
- Company Admin (view all)
- HR (view employee timesheets)
- Team Lead (view/approve team timesheets)
- Team Member (enter personal timesheets)

**company-admin/projects.html** - Used by:
- Company Admin (view all projects)
- Team Lead (manage assigned projects)

**company-admin/settings.html** - Used by:
- All roles (personal settings)

**team-member/team-profile.html** - Used by:
- Team Member (personal business profile)
- Team Lead (personal business profile - same structure)

**team-member/my-projects.html** - Used by:
- Team Member (view assigned projects)
- Individual User (after being hired - view assigned projects)

**company-admin/jobs.html** - Used by:
- Company Admin (post/manage jobs)
- Individual User (browse jobs to apply)

---

## 🎯 Benefits of This Structure

### 1. **Clear Separation**
Each role has its own dedicated folder, making it easy to:
- Locate role-specific pages
- Understand which pages belong to which role
- Manage role-specific features

### 2. **Maintainability**
- Easy to add new pages to specific roles
- Clear ownership of files
- Reduces confusion about page purpose

### 3. **Scalability**
- New roles can be added by creating new folders
- Easy to see the full scope of each role
- Shared pages are explicitly identified

### 4. **Security (Future)**
- Folder-based access control can be implemented
- Role-based routing becomes clearer
- API endpoints can mirror folder structure

### 5. **Development Workflow**
- Developers can focus on specific role folders
- Testing becomes role-centric
- Documentation naturally aligns with folder structure

---

## 🚀 Next Steps

### 1. Create Individual User Pages
In `individual/` folder:
- `profile.html` - Job seeker profile with resume
- `applications.html` - Job application tracking

### 2. Implement Role-Based Routing
- Add middleware to check user role
- Redirect unauthorized access attempts
- Implement folder-level permissions

### 3. Create Role-Specific Documentation
- Team Member user guide
- Team Lead management guide
- HR recruitment workflow
- Individual job seeker guide

### 4. Add Role-Specific Features
Each folder can have role-specific:
- Widgets/components
- Reports
- Settings
- Dashboards

---

## ⚠️ Important Notes

### CSS/JS Paths Remain Unchanged
All pages still reference:
```html
<link rel="stylesheet" href="assets/css/dashboard.css">
<script src="assets/js/dashboard.js"></script>
```

**Note**: Paths need to be updated to:
```html
<link rel="stylesheet" href="../assets/css/dashboard.css">
<script src="../assets/js/dashboard.js"></script>
```

### Navigation in dashboard.js
All navigation hrefs have been updated to include folder paths.

### Shared Pages Location
Shared pages remain in `company-admin/` as it has the broadest access level.

---

## 📊 Page Count by Role

| Role | Pages | Status |
|------|-------|--------|
| Team Member | 4 | ✅ Complete |
| Team Lead | 4 | ✅ Complete |
| HR | 6 | ✅ Complete |
| Company Admin | 15 | ✅ Complete |
| Individual | 2/5 | ⏳ 3 pages pending |
| **Total** | **31/34** | **91% Complete** |

---

**Last Updated**: November 14, 2025  
**Status**: Folder structure complete, navigation updated, 3 individual pages pending
