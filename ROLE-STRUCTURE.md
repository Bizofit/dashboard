# Bizoforce Role-Based Page Structure

## Overview
This document outlines the complete page structure for all user roles, ensuring clear separation between company employees and individual job seekers.

---

## 🏢 TEAM MEMBER ROLE (Company Employee)

### Profile Type: Company/Business Profile
**Focus**: Professional work profile within the company, NOT job seeking

### Navigation Structure:
1. **Overview**
   - My Dashboard (`teammember-dashboard.html`) ✅
   - My Profile (`team-profile.html`) ✅ - Business profile with GitHub, portfolio, skills

2. **Work**
   - My Projects (`my-projects.html`) ✅
   - My Tasks (`my-tasks.html`) ✅

3. **Time Tracking**
   - My Timesheets (`timesheets.html`) ✅

4. **System**
   - Settings (`settings.html`) ✅

### Key Features:
- ✅ **NO** job browsing or job applications
- ✅ **NO** earnings/salary visibility
- ✅ **NO** wallet display
- ✅ Portfolio links (GitHub, LinkedIn, personal website)
- ✅ Skills and certifications
- ✅ Current project assignments
- ✅ Performance stats (hours, tasks, on-time delivery)
- ✅ Professional information (Employee ID, Department, Manager)

### Pages Created:
- `teammember-dashboard.html` - 3 stat cards (Projects, Hours, Tasks)
- `team-profile.html` - Professional business profile
- `my-projects.html` - View assigned projects
- `my-tasks.html` - Task management with priorities
- `my-timesheets.html` (pending)
- `my-earnings.html` (exists but NOT in navigation - hidden from Team Members)

---

## 👔 TEAM LEAD ROLE (Project Manager)

### Profile Type: Company/Business Profile
**Focus**: Management profile with team oversight capabilities

### Navigation Structure:
1. **Overview**
   - Dashboard (`teamlead-dashboard.html`) ✅
   - My Profile (`team-profile.html`) ✅ - Same business profile as Team Member

2. **Project Management**
   - My Projects (`projects.html`) ✅
   - Team Members (`team-members.html`) ✅

3. **Time & Approval**
   - Timesheets (`timesheets.html`) ✅
   - Pending Approvals (`approvals.html`) ✅

4. **Reports**
   - Project Reports (`reports.html`) ✅

5. **System**
   - Settings (`settings.html`) ✅

### Key Features:
- ✅ **NO** job posting or candidate management
- ✅ **NO** job browsing
- ✅ Team member management (view roster, assign projects)
- ✅ Timesheet approval workflow
- ✅ Project analytics and reports
- ✅ Budget tracking (can see project costs)
- ✅ Team performance metrics

### Pages Created:
- `teamlead-dashboard.html` - 4 stat cards + project cards + approvals
- `team-profile.html` - Shared with Team Member
- `projects.html` - Project listing (existing)
- `team-members.html` - Team roster with skills/assignments
- `approvals.html` - Timesheet approval management
- `reports.html` - Project analytics and performance
- `timesheets.html` - Team timesheet view (existing)

---

## 🔍 INDIVIDUAL USER ROLE (Job Seeker/Candidate)

### Profile Type: Job Seeker Profile
**Focus**: Resume, job applications, career-seeking profile

### Navigation Structure (Current):
1. **Personal**
   - My Profile (`profile.html`) ⏳ TO BE CREATED - Job seeker profile
   - My Applications (`applications.html`) ⏳ TO BE CREATED

2. **Work**
   - Browse Jobs (`jobs.html`) ✅ - Can browse and apply to jobs
   - My Projects (`my-projects.html`) ✅ - After being hired
   - My Timesheets (`my-timesheets.html`) ⏳ TO BE CREATED

3. **Finance**
   - My Earnings (`my-earnings.html`) ✅ - Can see earnings after hired

4. **System**
   - Settings (`settings.html`) ✅

### Key Features (To Be Implemented):
- ⏳ Resume upload and management
- ⏳ Job search and filtering
- ⏳ Job application tracking
- ⏳ AI screening status
- ⏳ Interview scheduling
- ⏳ Offer acceptance
- ⏳ Career history and experience
- ⏳ Education and qualifications
- ⏳ After hired: Access to projects, timesheets, earnings

### Pages Needed:
- `profile.html` - Job seeker profile (resume, experience, education)
- `applications.html` - Job application tracking
- `my-timesheets.html` - Timesheet entry (for hired candidates)

---

## 🎯 KEY DIFFERENCES

### Team Member/Lead Profile vs Individual Profile:

| Feature | Team Member/Lead | Individual (Job Seeker) |
|---------|-----------------|------------------------|
| **Purpose** | Internal company profile | Job seeking profile |
| **GitHub/Portfolio** | ✅ Yes (work samples) | ✅ Yes (portfolio) |
| **Skills** | ✅ Company-relevant skills | ✅ Marketable skills |
| **Projects** | ✅ Current assignments | ⏳ Past work / portfolio |
| **Job Browsing** | ❌ NO | ✅ YES |
| **Job Applications** | ❌ NO | ✅ YES |
| **Resume** | ❌ NO | ✅ YES |
| **Employee ID** | ✅ YES | ❌ NO |
| **Manager Info** | ✅ YES | ❌ NO |
| **Certifications** | ✅ YES | ✅ YES |
| **Performance Stats** | ✅ YES (hours/tasks) | ⏳ After hired |
| **Earnings Visibility** | ❌ NO (Team Member) | ✅ YES (after hired) |
| **Earnings Visibility** | ✅ YES (Team Lead) | ✅ YES (after hired) |

---

## 📋 NAVIGATION SUMMARY

### Team Member (7 pages):
1. My Dashboard
2. **My Profile** (business profile)
3. My Projects
4. My Tasks
5. My Timesheets
6. Settings

### Team Lead (9 pages):
1. Dashboard
2. **My Profile** (business profile)
3. My Projects
4. Team Members
5. Timesheets
6. Pending Approvals
7. Project Reports
8. Settings

### Individual User (8 pages):
1. **My Profile** (job seeker profile) ⏳
2. My Applications ⏳
3. Browse Jobs ✅
4. My Projects ✅
5. My Timesheets ⏳
6. My Earnings ✅
7. Settings ✅

---

## 🚀 NEXT STEPS

### Priority 1: Create Individual User Pages
1. **profile.html** - Job seeker profile with:
   - Resume upload
   - Work experience
   - Education history
   - Skills and certifications
   - Portfolio/projects
   - Career objectives
   - Contact information

2. **applications.html** - Job application tracking with:
   - Applied jobs list
   - Application status (Applied → Screening → Interview → Offer → Hired)
   - AI screening results
   - Interview schedule
   - Offer details

3. **my-timesheets.html** - For hired candidates:
   - Weekly timesheet entry
   - Project-based time logging
   - Submission and approval tracking

### Priority 2: Differentiation
- Ensure Team Member/Lead profiles focus on internal company data
- Ensure Individual profiles focus on job seeking and career development
- Clear visual distinction between profile types

---

## ✅ COMPLETED WORK

### Team Member:
- ✅ Dashboard with 3 stat cards (no earnings)
- ✅ Business profile page with GitHub/portfolio
- ✅ Projects page (view assignments)
- ✅ Tasks page (priority management)
- ✅ Removed earnings from navigation
- ✅ Removed wallet display
- ✅ No job browsing capability

### Team Lead:
- ✅ Dashboard with project oversight
- ✅ Business profile page (shared with Team Member)
- ✅ Team members roster management
- ✅ Timesheet approval workflow
- ✅ Project reports and analytics
- ✅ No job posting capability (reserved for HR)

### Navigation:
- ✅ Team Member cannot see jobs or earnings
- ✅ Team Lead cannot post jobs (HR only)
- ✅ Individual users can browse jobs
- ✅ Clear separation of concerns by role

---

**Last Updated**: November 14, 2025
**Status**: Team Member & Team Lead complete, Individual User pending
