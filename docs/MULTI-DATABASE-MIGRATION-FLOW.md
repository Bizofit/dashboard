# Multi-Database User Migration System

## Overview

Comprehensive user authentication and migration system that checks all 5 legacy databases when a user logs in, automatically migrates data, detects roles, creates accounts where needed, and handles consent for new platform registrations.

---

## 🔄 Login Flow

### 1. **User Initiates Login** (Google OAuth)

```
User clicks "Login with Google"
    ↓
Google authenticates user
    ↓
Callback to: /api/auth/google/callback
```

### 2. **Email Check in All Databases**

The system checks user existence in this order:

#### **A. Unified Database** (bizoforce_newdashboard)

- **Table**: `unified_users`
- **Check**: `SELECT * FROM unified_users WHERE email = ?`
- **If found**: User already migrated, load existing data
- **If not found**: Proceed to legacy platform checks

#### **B. Bizoforce** (bizoforce_BizoforceGodaddyOct292025)

- **Table**: `wp_users`
- **Check**: `SELECT * FROM wp_users WHERE user_email = ?`
- **If found**:
  - Save `bizoforce_user_id`
  - Check for companies in `wpbdp_listings` table
  - If companies exist → Assign **Company Admin** role

#### **C. Giglancer** (giglancer_bizoforce)

- **Table**: `users`
- **Check**: `SELECT * FROM users WHERE email = ?`
- **If found**:
  - Check posted jobs: `SELECT COUNT(*) FROM jobs WHERE user_id = ?`
  - Check applications: `SELECT COUNT(*) FROM job_applications WHERE user_id = ?`
  - **Role Assignment**:
    - Posted jobs + applications → **Recruiter** (HR + Job Seeker)
    - Posted jobs only → **HR**
    - Applications only → **Job Seeker/Freelancer**
- **If not found**:
  - Mark `requiresGiglancerConsent = true`
  - User will be prompted to create account later

#### **D. Worksuite** (worksuite_old)

- **Table**: `users`
- **Check**: `SELECT * FROM users WHERE email = ?`
- **If not found** + **user has Bizoforce companies**:
  - **Auto-create** Worksuite account
  - **Auto-create** company in Worksuite
  - Assign **Team Lead** role

#### **E. Screenly** (screenly_new)

- **Table**: `users`
- **Check**: Reserved for future implementation
- Currently not part of login migration

---

## 👥 Role Assignment Logic

### Primary Roles (Mutually Exclusive Primary)

| Platform      | Condition                         | Role Assigned       | isPrimary                    |
| ------------- | --------------------------------- | ------------------- | ---------------------------- |
| **Bizoforce** | Has companies in `wpbdp_listings` | `company_admin`     | ✅ Yes                       |
| **Bizoforce** | Has companies                     | `vendor`            | No                           |
| **Worksuite** | Account exists/created            | `team_lead`         | No                           |
| **Giglancer** | Posted jobs + applications        | `hr` + `job_seeker` | No                           |
| **Giglancer** | Posted jobs only                  | `hr`                | No                           |
| **Giglancer** | Applications only                 | `job_seeker`        | ✅ Yes (if no other primary) |
| **None**      | No activity found                 | `job_seeker`        | ✅ Yes (default)             |

### Role Hierarchy

1. **Company Admin** (highest priority)
2. **Team Lead**
3. **HR/Recruiter**
4. **Job Seeker** (default fallback)

---

## 🏢 Company Detection & Migration

### Bizoforce Companies

**Detection**:

```sql
SELECT
  l.id as listingId,
  l.title as companyName,
  l.created_on as createdDate,
  p.post_status as status
FROM wpbdp_listings l
LEFT JOIN wp_posts p ON l.post_id = p.ID
WHERE l.user_id = ?
AND p.post_status = 'publish'
```

**Migration to Worksuite**:

```sql
INSERT INTO companies (
  company_name,
  owner_id,
  package_type,
  status,
  created_at,
  updated_at
) VALUES (?, ?, 'annual', 'active', NOW(), NOW())
```

- Takes first Bizoforce company name
- Auto-creates in Worksuite if user doesn't exist there
- Links via `owner_id` (Worksuite user ID)

---

## ✅ Giglancer Consent Flow

### Scenario: User NOT in Giglancer

**Detection**:

```javascript
if (bizoforceUser && !giglancerUser) {
  requiresGiglancerConsent = true;
}
```

**Redirect**:

```
/auth/callback?token=<JWT>&consent=giglancer
```

**Frontend Action**:

1. Show modal: "Create Giglancer account?"
2. Options: "Employer" or "Freelancer"
3. User selects account type
4. API call: `POST /api/migration/giglancer/create`

**API Endpoint**:

```typescript
POST /api/migration/giglancer/create
Headers: Authorization: Bearer <token>
Body: { accountType: "employer" | "freelancer" }

Response:
{
  success: true,
  message: "Giglancer employer account created successfully",
  data: { giglancerUserId: 12345 }
}
```

---

## 🎯 Dashboard Routing

### Based on Primary Role

| Primary Role    | Redirect To             | Description                              |
| --------------- | ----------------------- | ---------------------------------------- |
| `company_admin` | `/dashboard`            | Full company dashboard with all features |
| `vendor`        | `/products-services`    | Product/service listings management      |
| `hr`            | `/jobs`                 | Job posting and candidate management     |
| `team_lead`     | `/projects`             | Project and team management              |
| `team_member`   | `/my-projects`          | Assigned projects and timesheets         |
| `job_seeker`    | `/individual-dashboard` | Job search, applications, profile        |

### Individual Dashboard

**For users with ONLY `job_seeker` role**:

**Features**:

- Browse jobs
- Apply to positions
- Track applications
- AI screening status
- Resume/portfolio upload
- Skill assessments
- Earnings from completed projects

**Key Difference**: Simplified, individual-focused UI without company management features

---

## 📊 Data Stored in Unified Database

### unified_users Table

```sql
CREATE TABLE unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,

  -- Google OAuth
  google_id VARCHAR(255) UNIQUE,
  google_profile_picture VARCHAR(500),

  -- User details
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  password_hash VARCHAR(255), -- NULL for OAuth-only users

  -- Legacy platform IDs (preserve relationships)
  bizoforce_user_id INT,
  giglancer_user_id INT,
  screenly_user_id INT,
  work_user_id INT,

  auth_provider ENUM('local', 'google', 'hybrid'),
  last_login_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### user_roles Table

```sql
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'company_admin', 'hr', 'team_lead', etc.
  platform VARCHAR(50), -- 'bizoforce', 'giglancer', 'work', 'screenly'
  company_id INT, -- If role is company-specific
  is_primary BOOLEAN DEFAULT FALSE, -- Primary role determines dashboard
  created_at TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES unified_users(id)
);
```

---

## 🔐 JWT Token Structure

```javascript
{
  userId: 1033,
  email: "user@example.com",
  googleId: "123456789",
  roles: [
    { id: 1, role: "company_admin", platform: "bizoforce", isPrimary: true },
    { id: 2, role: "vendor", platform: "bizoforce", isPrimary: false },
    { id: 3, role: "team_lead", platform: "work", isPrimary: false }
  ],
  primaryRole: "company_admin",
  authProvider: "google",
  exp: 1732896000 // 7 days from issuance
}
```

---

## 📝 Migration Examples

### Example 1: Company Admin

**User Email**: john@company.com

**Found In**:

- ✅ Bizoforce: `user_id = 5432`
- ✅ Bizoforce Companies: 2 companies (`wpbdp_listings`)
- ❌ Giglancer: Not found
- ❌ Worksuite: Not found

**Actions**:

1. Create unified user with `bizoforce_user_id = 5432`
2. Create Worksuite account (auto)
3. Create company in Worksuite (first Bizoforce company name)
4. Assign roles:
   - `company_admin` (primary) - Bizoforce
   - `vendor` - Bizoforce
   - `team_lead` - Work
5. Set `requiresGiglancerConsent = true`

**Redirect**: `/dashboard` (company admin dashboard)

---

### Example 2: Freelancer

**User Email**: jane@freelancer.com

**Found In**:

- ❌ Bizoforce: Not found
- ✅ Giglancer: `user_id = 8765`
- ✅ Giglancer Applications: 15 applications, 0 posted jobs
- ❌ Worksuite: Not found

**Actions**:

1. Create unified user with `giglancer_user_id = 8765`
2. Assign roles:
   - `job_seeker` (primary) - Giglancer
3. No Worksuite creation (no companies)

**Redirect**: `/individual-dashboard` (individual user dashboard)

---

### Example 3: Recruiter (Dual Role)

**User Email**: alex@recruiting.com

**Found In**:

- ❌ Bizoforce: Not found
- ✅ Giglancer: `user_id = 9876`
- ✅ Giglancer Posted Jobs: 8 jobs
- ✅ Giglancer Applications: 3 applications
- ❌ Worksuite: Not found

**Actions**:

1. Create unified user with `giglancer_user_id = 9876`
2. Assign roles:
   - `hr` (primary) - Giglancer (posted jobs)
   - `job_seeker` - Giglancer (applied to jobs)

**Redirect**: `/jobs` (HR dashboard for posting/managing jobs)

---

## 🚨 Error Handling

### Database Connection Failures

```typescript
try {
  const bizoforceUser = await checkBizoforceUser(email);
} catch (error) {
  console.error("Error checking Bizoforce user:", error);
  // Continue with other databases
  // Don't fail entire migration
}
```

### Duplicate Email Prevention

- Unified DB has `UNIQUE` constraint on email
- Migration checks unified DB first
- If exists, skip legacy checks

### Session Timeout

- JWT expires after 7 days
- User must re-authenticate
- Migration runs again on next login (idempotent)

---

## 🧪 Testing the Flow

### Test User 1: Existing Bizoforce Company Owner

```bash
# Login with Google using: user@example.com

# Expected:
# - Found in Bizoforce (user_id: 1033)
# - Has companies in wpbdp_listings
# - Not in Worksuite → auto-created
# - Company auto-created in Worksuite
# - Roles: company_admin (primary), vendor, team_lead
# - Redirect: /dashboard
```

### Test User 2: New User (Not in Any DB)

```bash
# Login with Google using: newuser@example.com

# Expected:
# - Not found in any database
# - Create new unified user
# - Assign default role: job_seeker (primary)
# - No companies
# - Redirect: /individual-dashboard
```

### Test User 3: Giglancer Freelancer

```bash
# Login with Google using: freelancer@giglancer.com

# Expected:
# - Found in Giglancer
# - Has applications, no posted jobs
# - Role: job_seeker (primary)
# - Redirect: /individual-dashboard
```

---

## 📚 API Endpoints

### Authentication

- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback with migration
- `POST /api/auth/login` - Email/password login (company employees)
- `POST /api/auth/logout` - Logout user

### Migration

- `POST /api/migration/giglancer/create` - Create Giglancer account after consent
  ```json
  {
    "accountType": "employer" | "freelancer"
  }
  ```

### Profile

- `GET /api/auth/profile` - Get current user profile with roles

---

## 🔄 Future Enhancements

1. **Screenly Integration**: Add Screenly user detection and migration
2. **Batch Migration**: Script to migrate all users at once
3. **Consent Management**: UI for managing connected platforms
4. **Account Unlinking**: Allow users to disconnect platform accounts
5. **Activity Sync**: Sync new jobs/applications back to legacy platforms
6. **Company Consolidation**: Merge duplicate companies across platforms

---

## 🎉 Benefits

✅ **Single Sign-On**: One Google login for all 5 platforms  
✅ **Automatic Migration**: No manual data entry required  
✅ **Role Detection**: Smart role assignment based on activity  
✅ **Company Preservation**: Companies from Bizoforce carried over  
✅ **User Consent**: Giglancer accounts created only with permission  
✅ **Unified Dashboard**: Single interface for all platforms  
✅ **Data Integrity**: Preserves all legacy platform IDs

---

_Last Updated: November 22, 2025_  
_Version: 1.0_
