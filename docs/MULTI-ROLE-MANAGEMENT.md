# MULTI-PLATFORM USER ROLE MANAGEMENT STRATEGY

**Date**: November 18, 2025  
**Purpose**: Handle users who exist across multiple platforms with different roles

---

## 🎯 THE PROBLEM

Users like `sudh013@gmail.com` have **multiple identities** across platforms:
- **Bizoforce**: Vendor (selling products)
- **Giglancer**: Employer (2 projects) + Freelancer (12 bids) - **Dual role!**
- **Screenly**: Platform Admin (company: Bizoforce Inc)
- **Work.Bizoforce**: Employee (company_id: 26)

**Challenge**: How do we represent this in our unified system?

---

## 💡 SOLUTION: ROLE CONTEXT SWITCHING

### Approach 1: Primary Profile + Secondary Profiles (RECOMMENDED)

**Concept**: One unified account with multiple "hats" (contexts)

```javascript
unified_users {
  id: 1033,
  email: "sudh013@gmail.com",
  primary_role: "company", // Most active/recent role
  available_roles: ["company_admin", "vendor", "freelancer", "team_member"]
}

user_roles {
  user_id: 1033,
  role: "company_admin",
  company_id: 26, // Work.Bizoforce company
  is_primary: true
}

user_roles {
  user_id: 1033,
  role: "vendor",
  company_id: null, // Individual vendor
  is_primary: false
}

user_roles {
  user_id: 1033,
  role: "freelancer",
  company_id: null,
  is_primary: false
}

user_roles {
  user_id: 1033,
  role: "team_member",
  company_id: 26,
  is_primary: false
}
```

---

## 📊 DATABASE SCHEMA UPDATES

### New Table: `user_roles`

```sql
CREATE TABLE user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL, -- company_admin, vendor, hr, team_lead, team_member, freelancer, job_seeker
  company_id INT NULL, -- Link to company (NULL for individual roles)
  is_primary BOOLEAN DEFAULT false, -- Primary/default role
  is_active BOOLEAN DEFAULT true,
  source_platform VARCHAR(50), -- Where this role came from (bizoforce, giglancer, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES unified_companies(id) ON DELETE CASCADE,
  
  INDEX idx_user_roles (user_id, role),
  INDEX idx_company_roles (company_id, role)
);
```

### New Table: `user_role_history`

```sql
CREATE TABLE user_role_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_id INT NULL,
  action VARCHAR(20), -- 'switched', 'added', 'removed'
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user_history (user_id, timestamp)
);
```

---

## 🔄 USER FLOW: ROLE SWITCHING

### 1. Login Flow

```javascript
// Step 1: User logs in with email/password
POST /api/auth/login
{
  "email": "sudh013@gmail.com",
  "password": "******"
}

// Step 2: Backend checks available roles
SELECT r.role, r.company_id, r.is_primary, c.name as company_name
FROM user_roles r
LEFT JOIN unified_companies c ON r.company_id = c.id
WHERE r.user_id = 1033 AND r.is_active = true;

// Result:
[
  { role: "company_admin", company_id: 26, company_name: "Bizoforce", is_primary: true },
  { role: "vendor", company_id: null, company_name: null, is_primary: false },
  { role: "freelancer", company_id: null, company_name: null, is_primary: false }
]

// Step 3: Return user data with available roles
Response:
{
  "user": {
    "id": 1033,
    "email": "sudh013@gmail.com",
    "name": "Sudhanshu Pandey",
    "current_role": "company_admin",
    "available_roles": [
      { "role": "company_admin", "label": "Company Admin (Bizoforce)", "company_id": 26 },
      { "role": "vendor", "label": "Vendor / Seller", "company_id": null },
      { "role": "freelancer", "label": "Freelancer", "company_id": null }
    ]
  },
  "token": "jwt_token_here"
}
```

### 2. Role Switching (During Session)

```javascript
// User clicks "Switch Role" in UI
POST /api/auth/switch-role
{
  "role": "freelancer",
  "company_id": null
}

// Backend:
1. Validates user has this role
2. Updates session/token with new role
3. Logs role switch in history
4. Updates last_used_at for the role
5. Returns new dashboard URL

Response:
{
  "success": true,
  "current_role": "freelancer",
  "redirect_to": "/freelancer-dashboard",
  "permissions": ["apply_jobs", "submit_proposals", "view_earnings"]
}
```

---

## 🎨 UI/UX DESIGN

### Top Navigation Bar - Role Switcher

```html
<!-- Always visible in top-right corner -->
<div class="role-switcher">
  <button class="current-role-btn">
    <span class="role-icon">💼</span>
    <span class="role-label">Company Admin</span>
    <span class="company-name">Bizoforce</span>
    <span class="dropdown-arrow">▼</span>
  </button>
  
  <div class="role-dropdown">
    <div class="role-option active">
      <span class="role-icon">💼</span>
      <div>
        <div class="role-title">Company Admin</div>
        <div class="role-subtitle">Bizoforce</div>
      </div>
      <span class="check">✓</span>
    </div>
    
    <div class="role-option" onclick="switchRole('vendor')">
      <span class="role-icon">🛒</span>
      <div>
        <div class="role-title">Vendor / Seller</div>
        <div class="role-subtitle">Sell products & services</div>
      </div>
    </div>
    
    <div class="role-option" onclick="switchRole('freelancer')">
      <span class="role-icon">💻</span>
      <div>
        <div class="role-title">Freelancer</div>
        <div class="role-subtitle">Find projects & jobs</div>
      </div>
    </div>
  </div>
</div>
```

### Dashboard Changes Based on Role

```javascript
// After role switch, show different navigation
if (currentRole === 'company_admin') {
  showNav([
    'Dashboard',
    'Company',
    'Jobs',
    'Candidates',
    'Projects',
    'Team',
    'Timesheets',
    'Invoices'
  ]);
} else if (currentRole === 'vendor') {
  showNav([
    'Dashboard',
    'Products',
    'Orders',
    'Customers',
    'Earnings',
    'Settings'
  ]);
} else if (currentRole === 'freelancer') {
  showNav([
    'Dashboard',
    'Browse Jobs',
    'My Proposals',
    'Active Projects',
    'Earnings',
    'Profile'
  ]);
}
```

---

## 🔐 PERMISSION SYSTEM

### Role-Based Permissions

```javascript
const PERMISSIONS = {
  company_admin: [
    'create_company',
    'manage_users',
    'post_jobs',
    'view_candidates',
    'create_projects',
    'approve_timesheets',
    'generate_invoices',
    'view_analytics',
    'manage_subscriptions'
  ],
  
  vendor: [
    'create_products',
    'manage_orders',
    'view_sales',
    'manage_inventory',
    'respond_to_reviews'
  ],
  
  hr: [
    'post_jobs',
    'view_candidates',
    'conduct_interviews',
    'send_offers',
    'onboard_employees'
  ],
  
  team_lead: [
    'create_projects',
    'assign_tasks',
    'approve_timesheets',
    'view_team_reports'
  ],
  
  team_member: [
    'view_assigned_projects',
    'log_hours',
    'submit_timesheets',
    'view_personal_earnings'
  ],
  
  freelancer: [
    'browse_jobs',
    'submit_proposals',
    'view_active_projects',
    'log_hours',
    'view_earnings',
    'update_portfolio'
  ],
  
  job_seeker: [
    'browse_jobs',
    'apply_to_jobs',
    'upload_resume',
    'take_ai_screening',
    'view_application_status'
  ]
};

// Middleware to check permissions
function hasPermission(user, permission) {
  const userRole = user.current_role;
  return PERMISSIONS[userRole]?.includes(permission) || false;
}
```

---

## 📝 MIGRATION SCRIPT UPDATES

### Detect and Create Multiple Roles

```javascript
async function migrateUserWithMultipleRoles(userData) {
  // 1. Create unified user (primary identity)
  const userId = await createUnifiedUser(userData);
  
  // 2. Detect all roles from platforms
  const roles = [];
  
  // From Bizoforce
  if (userData.bizoforce) {
    if (userData.bizoforce.signup_step === 'register_company') {
      roles.push({ role: 'company_admin', source: 'bizoforce' });
    }
    if (userData.bizoforce_meta?.wp_capabilities?.includes('vendor')) {
      roles.push({ role: 'vendor', source: 'bizoforce' });
    }
  }
  
  // From Giglancer
  if (userData.giglancer) {
    // Employer activity
    if (userData.giglancer.project_count > 0 || userData.giglancer.job_count > 0) {
      roles.push({ role: 'company_admin', source: 'giglancer' });
    }
    
    // Freelancer activity
    if (userData.giglancer.bid_count > 0 || userData.giglancer.portfolio_count > 0) {
      roles.push({ role: 'freelancer', source: 'giglancer' });
    }
    
    // Job seeker activity
    if (userData.giglancer.job_apply_count > 0) {
      roles.push({ role: 'job_seeker', source: 'giglancer' });
    }
  }
  
  // From Work.Bizoforce
  if (userData.work) {
    if (userData.work.company_id) {
      // Query role_user table to get actual role
      const workRoles = await getWorkRoles(userData.work.id);
      workRoles.forEach(wr => {
        roles.push({
          role: wr.role === 'admin' ? 'company_admin' : 'team_member',
          company_id: userData.work.company_id,
          source: 'work'
        });
      });
    }
  }
  
  // 3. Deduplicate roles
  const uniqueRoles = deduplicateRoles(roles);
  
  // 4. Insert into user_roles table
  for (const [index, role] of uniqueRoles.entries()) {
    await db.query(`
      INSERT INTO user_roles (user_id, role, company_id, is_primary, source_platform, is_active)
      VALUES (?, ?, ?, ?, ?, true)
    `, [userId, role.role, role.company_id || null, index === 0, role.source]);
  }
  
  return { userId, roles: uniqueRoles };
}

function deduplicateRoles(roles) {
  const seen = new Set();
  const unique = [];
  
  for (const role of roles) {
    const key = `${role.role}_${role.company_id || 'null'}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(role);
    }
  }
  
  return unique;
}
```

---

## 🚀 API ENDPOINTS

### 1. Get Available Roles
```
GET /api/users/me/roles
Response: {
  "roles": [
    { "role": "company_admin", "company_id": 26, "company_name": "Bizoforce", "is_primary": true },
    { "role": "vendor", "company_id": null, "is_primary": false },
    { "role": "freelancer", "company_id": null, "is_primary": false }
  ]
}
```

### 2. Switch Role
```
POST /api/users/me/switch-role
Body: { "role": "freelancer", "company_id": null }
Response: {
  "success": true,
  "current_role": "freelancer",
  "redirect_to": "/freelancer-dashboard",
  "permissions": ["apply_jobs", "submit_proposals"]
}
```

### 3. Add New Role
```
POST /api/users/me/roles
Body: { "role": "vendor" }
Response: {
  "success": true,
  "message": "Vendor role added. You can now sell products!"
}
```

### 4. Remove Role
```
DELETE /api/users/me/roles/:role
Response: {
  "success": true,
  "message": "Vendor role removed"
}
```

---

## 🎯 USER SCENARIOS

### Scenario 1: Sudhanshu's Login Experience

1. **First Login After Migration**:
   ```
   "Welcome back, Sudhanshu!
   We've detected you have accounts on multiple platforms.
   
   Choose your primary role:
   ○ Company Admin at Bizoforce (Recommended based on activity)
   ○ Vendor / Seller
   ○ Freelancer
   
   Don't worry, you can switch between roles anytime!"
   ```

2. **Subsequent Logins**:
   - Logs in → Goes directly to Company Admin dashboard
   - Can switch to Vendor or Freelancer using top-right dropdown

3. **Switching to Freelancer**:
   - Clicks role switcher → Selects "Freelancer"
   - Dashboard changes to show: Browse Jobs, My Proposals, Earnings
   - Can now apply to jobs and submit bids

4. **Switching to Vendor**:
   - Clicks role switcher → Selects "Vendor"
   - Dashboard changes to show: Products, Orders, Customers
   - Can now create product listings

### Scenario 2: New User (No Multiple Platforms)

1. **Registration**:
   ```
   "Are you looking to:
   ○ Hire talent or manage a company
   ○ Find jobs or freelance work"
   ```

2. **Can Add More Roles Later**:
   - Settings → "Add New Role"
   - Select: Vendor, Freelancer, etc.

---

## 📊 ANALYTICS & INSIGHTS

### Track Role Usage

```javascript
// Log every role switch
user_role_history {
  user_id: 1033,
  role: "freelancer",
  action: "switched",
  timestamp: "2025-11-18 14:30:00"
}

// Analytics queries:
// 1. Most popular role combinations
SELECT 
  GROUP_CONCAT(role ORDER BY role) as role_combo,
  COUNT(DISTINCT user_id) as user_count
FROM user_roles
GROUP BY user_id
ORDER BY user_count DESC;

// 2. Role switching frequency
SELECT 
  user_id,
  COUNT(*) as switches_per_day
FROM user_role_history
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY user_id
ORDER BY switches_per_day DESC;
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Database Changes
- [ ] Create `user_roles` table
- [ ] Create `user_role_history` table
- [ ] Create migration script to populate user_roles from existing data
- [ ] Add indexes for performance

### Backend API
- [ ] Create role management service
- [ ] Add role switching endpoint
- [ ] Add role permission middleware
- [ ] Update JWT token to include current_role
- [ ] Add role history logging

### Frontend UI
- [ ] Create role switcher component
- [ ] Add first-time role selection modal
- [ ] Update navigation based on current role
- [ ] Add "Add New Role" option in settings
- [ ] Create role management page

### Migration Script
- [ ] Update migrate-users.js to detect multiple roles
- [ ] Create roles for existing migrated users
- [ ] Set primary role based on activity
- [ ] Test with sample users

### Testing
- [ ] Test role switching flow
- [ ] Test permissions for each role
- [ ] Test with multi-platform users
- [ ] Test role history logging

---

**Last Updated**: November 18, 2025  
**Status**: Design complete, ready for implementation
