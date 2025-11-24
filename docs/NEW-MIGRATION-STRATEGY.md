# New Migration Strategy - Intelligent Role Detection

## 🎯 Objective

Remove all job seeker users from the database and implement smart role detection based on actual platform usage across Bizoforce, Giglancer, Screenly, and Work.Bizoforce.

---

## ❌ What to Remove

### 1. Delete All Job Seeker Users

**SQL Query to identify job seekers:**

```sql
-- Find all users with ONLY job_seeker role (no other roles)
SELECT u.id, u.email, u.first_name, u.last_name, COUNT(ur.id) as role_count
FROM unified_users u
INNER JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'job_seeker'
GROUP BY u.id
HAVING role_count = 1;

-- Delete user_roles for job seekers
DELETE FROM user_roles
WHERE user_id IN (
  SELECT u.id FROM unified_users u
  INNER JOIN user_roles ur ON u.id = ur.user_id
  WHERE ur.role = 'job_seeker'
  GROUP BY u.id
  HAVING COUNT(ur.id) = 1
);

-- Delete unified_users who only had job_seeker role
DELETE FROM unified_users
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles);
```

**Safety Check:**

- Backup database before deletion
- Count users to be deleted first
- Verify no company associations exist
- Run in transaction with rollback option

---

## ✅ New Role Detection Logic

### Platform Detection Priority

Users will be assigned roles based on **actual platform presence** and **activity patterns**:

| Platform           | Detection Criteria                           | Assigned Role   | Confidence |
| ------------------ | -------------------------------------------- | --------------- | ---------- |
| **Work.Bizoforce** | User exists in `users` table                 | `company_admin` | High       |
| **Screenly**       | User has `company_name` and `company_id`     | `company_admin` | High       |
| **Bizoforce**      | User has vendor shop (`pv_shop_name`)        | `vendor`        | High       |
| **Bizoforce**      | User has directory listing (`wpbdp_listing`) | `company_admin` | Medium     |
| **Bizoforce**      | User has products/orders                     | `vendor`        | Medium     |
| **Giglancer**      | Posted projects > bids submitted             | `hr`            | Medium     |
| **Giglancer**      | Bids submitted > posted projects             | **Show Popup**  | Low        |
| **None**           | No platform data found                       | **Show Popup**  | Lowest     |

---

## 🧠 Smart Detection Algorithm

### Step 1: Check Work.Bizoforce (Highest Priority)

```typescript
async function checkWorkPresence(email: string): Promise<{
  found: boolean;
  userId: number | null;
  companyId: number | null;
  companyName: string | null;
}> {
  const [rows] = await workPool.execute(
    `SELECT u.id, c.id as company_id, c.company_name
     FROM users u
     LEFT JOIN employee_details ed ON u.id = ed.user_id
     LEFT JOIN companies c ON ed.company_id = c.id
     WHERE u.email = ?
     LIMIT 1`,
    [email]
  );

  if (rows.length > 0) {
    return {
      found: true,
      userId: rows[0].id,
      companyId: rows[0].company_id,
      companyName: rows[0].company_name,
    };
  }

  return { found: false, userId: null, companyId: null, companyName: null };
}

// If found → Assign role: company_admin
```

### Step 2: Check Screenly (2nd Priority)

```typescript
async function checkScreenlyPresence(email: string): Promise<{
  found: boolean;
  userId: number | null;
  companyName: string | null;
  companyId: number | null;
}> {
  const result = await screenlyPool.query(
    `SELECT id, company_name, company_id
     FROM users
     WHERE email = $1 AND company_name IS NOT NULL
     LIMIT 1`,
    [email]
  );

  if (result.rows.length > 0) {
    return {
      found: true,
      userId: result.rows[0].id,
      companyName: result.rows[0].company_name,
      companyId: result.rows[0].company_id,
    };
  }

  return { found: false, userId: null, companyName: null, companyId: null };
}

// If found → Assign role: company_admin
```

### Step 3: Check Bizoforce (3rd Priority)

```typescript
async function checkBizoforcePresence(email: string): Promise<{
  found: boolean;
  userId: number | null;
  isVendor: boolean;
  shopName: string | null;
  hasDirectoryListing: boolean;
  listingName: string | null;
}> {
  // Check wp_users
  const [userRows] = await bizoforcePool.execute(
    `SELECT ID FROM wp_users WHERE user_email = ? LIMIT 1`,
    [email]
  );

  if (userRows.length === 0) {
    return {
      found: false,
      userId: null,
      isVendor: false,
      shopName: null,
      hasDirectoryListing: false,
      listingName: null,
    };
  }

  const userId = userRows[0].ID;

  // Check if vendor (has shop)
  const [vendorRows] = await bizoforcePool.execute(
    `SELECT meta_value FROM wp_usermeta 
     WHERE user_id = ? AND meta_key = 'pv_shop_name' LIMIT 1`,
    [userId]
  );

  const isVendor = vendorRows.length > 0;
  const shopName = isVendor ? vendorRows[0].meta_value : null;

  // Check directory listing
  const [listingRows] = await bizoforcePool.execute(
    `SELECT post_title FROM wp_posts 
     WHERE post_author = ? AND post_type = 'wpbdp_listing' 
     AND post_status IN ('publish', 'draft')
     ORDER BY post_status DESC, post_date DESC LIMIT 1`,
    [userId]
  );

  const hasDirectoryListing = listingRows.length > 0;
  const listingName = hasDirectoryListing ? listingRows[0].post_title : null;

  return {
    found: true,
    userId,
    isVendor,
    shopName,
    hasDirectoryListing,
    listingName,
  };
}

// If isVendor → Assign role: vendor
// If hasDirectoryListing → Assign role: company_admin
```

### Step 4: Check Giglancer (4th Priority - Requires Analysis)

```typescript
async function checkGiglancerPresence(email: string): Promise<{
  found: boolean;
  userId: number | null;
  postedProjects: number;
  submittedBids: number;
  accountType: string | null;
}> {
  // Check users table
  const [userRows] = await giglancerPool.execute(
    `SELECT id, account_type FROM users WHERE email = ? LIMIT 1`,
    [email]
  );

  if (userRows.length === 0) {
    return {
      found: false,
      userId: null,
      postedProjects: 0,
      submittedBids: 0,
      accountType: null,
    };
  }

  const userId = userRows[0].id;
  const accountType = userRows[0].account_type;

  // Count posted projects (as employer)
  const [projectRows] = await giglancerPool.execute(
    `SELECT COUNT(*) as count FROM projects WHERE user_id = ?`,
    [userId]
  );
  const postedProjects = projectRows[0].count;

  // Count submitted bids (as freelancer)
  const [bidRows] = await giglancerPool.execute(
    `SELECT COUNT(*) as count FROM bids WHERE user_id = ?`,
    [userId]
  );
  const submittedBids = bidRows[0].count;

  return {
    found: true,
    userId,
    postedProjects,
    submittedBids,
    accountType,
  };
}

// Decision Logic:
// If postedProjects > submittedBids → Assign role: hr
// If postedProjects === 0 && submittedBids > 0 → SHOW POPUP (might be job seeker)
// If both === 0 → SHOW POPUP (new user, no activity)
```

---

## 🎨 Role Selection Popup

### When to Show Popup

Show role selection popup when:

1. **No platform data found** (truly new user)
2. **Giglancer only + more bids than projects** (might be job seeker)
3. **Ambiguous activity** (equal projects and bids)

### Popup Design

```tsx
interface RoleSelectionPopupProps {
  email: string;
  platformsFound: string[];
  onRoleSelected: (role: "company" | "job_seeker") => void;
}

function RoleSelectionPopup({
  email,
  platformsFound,
  onRoleSelected,
}: RoleSelectionPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Choose Your Role</h2>
        <p className="text-gray-600 mb-6">
          We found your account but couldn't determine your role. Please select:
        </p>

        <div className="space-y-4">
          <button
            onClick={() => onRoleSelected("company")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-left"
          >
            <div className="font-bold">Company / Employer</div>
            <div className="text-sm text-blue-100">
              Post jobs, hire talent, manage projects
            </div>
          </button>

          <button
            onClick={() => onRoleSelected("job_seeker")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg text-left"
          >
            <div className="font-bold">Job Seeker / Freelancer</div>
            <div className="text-sm text-orange-100">
              Apply to jobs, find projects, track applications
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Popup API Endpoint

```typescript
// POST /api/auth/select-role
router.post("/select-role", authenticate, async (req, res) => {
  const { role } = req.body; // 'company' or 'job_seeker'
  const userId = req.user.userId;

  if (!role || !["company", "job_seeker"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }

  // Determine actual role type based on selection
  const roleType = role === "company" ? "company_admin" : "job_seeker";

  // Insert role into user_roles
  await unifiedDB.insert(userRoles).values({
    userId,
    roleType,
    platform: "unified",
    isPrimary: true,
  });

  // Generate new JWT with role
  const token = generateToken({
    userId,
    email: req.user.email,
    roles: [{ roleType }],
    primaryRole: roleType,
  });

  res.json({ success: true, token, role: roleType });
});
```

---

## 🔄 Migration Flow

### New User Login Flow

```
1. User logs in with Google OAuth or email/password
2. Check if user exists in unified_users
   ├─ YES → Load existing roles → Redirect to dashboard
   └─ NO  → Run smart detection:
       ├─ Check Work.Bizoforce
       │   └─ Found → Create user with role: company_admin
       ├─ Check Screenly
       │   └─ Found → Create user with role: company_admin
       ├─ Check Bizoforce
       │   ├─ Vendor → Create user with role: vendor
       │   └─ Directory Listing → Create user with role: company_admin
       ├─ Check Giglancer
       │   ├─ Posted Projects > Bids → Create user with role: hr
       │   ├─ Bids > Projects → SHOW POPUP
       │   └─ No Activity → SHOW POPUP
       └─ No platforms → SHOW POPUP

3. If POPUP shown:
   ├─ User selects "Company" → Create role: company_admin
   └─ User selects "Job Seeker" → Create role: job_seeker

4. Generate JWT with assigned role
5. Redirect to appropriate dashboard
```

### Existing User Login Flow

```
1. User logs in
2. Load user from unified_users
3. Load user_roles
4. Check if has any role:
   ├─ YES → Generate JWT → Redirect to dashboard
   └─ NO  → Run smart detection (same as new user)
```

---

## 🗃️ Database Cleanup Script

Create a script to safely remove job seekers:

```bash
#!/bin/bash
# File: scripts/remove-job-seekers.sh

echo "🔍 Counting job seeker users..."
JOB_SEEKER_COUNT=$(mysql -h 72.167.148.100 -u bizoforce_newdashboard -p'i&B4{NKC~!6cLC*r' bizoforce_newdashboard -se "
SELECT COUNT(DISTINCT u.id)
FROM unified_users u
INNER JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role_type = 'job_seeker'
AND u.id NOT IN (
  SELECT user_id FROM user_roles WHERE role_type != 'job_seeker'
);
")

echo "📊 Found $JOB_SEEKER_COUNT users with ONLY job_seeker role"
echo ""
echo "⚠️  WARNING: This will permanently delete these users!"
read -p "Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Operation cancelled"
  exit 1
fi

echo "🗑️  Deleting job seeker roles..."
mysql -h 72.167.148.100 -u bizoforce_newdashboard -p'i&B4{NKC~!6cLC*r' bizoforce_newdashboard -e "
START TRANSACTION;

DELETE FROM user_roles
WHERE user_id IN (
  SELECT u.id FROM unified_users u
  INNER JOIN user_roles ur ON u.id = ur.user_id
  WHERE ur.role_type = 'job_seeker'
  GROUP BY u.id
  HAVING COUNT(ur.id) = 1
);

DELETE FROM unified_users
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles);

COMMIT;
"

echo "✅ Job seeker users removed successfully"
echo "🔄 You may need to restart the server to clear caches"
```

---

## 📋 Implementation Checklist

- [ ] **Step 1**: Backup unified database
- [ ] **Step 2**: Create `remove-job-seekers.sh` script
- [ ] **Step 3**: Run script to delete job seeker users
- [ ] **Step 4**: Update `server/services/migration-service.ts` with new detection logic
- [ ] **Step 5**: Create `RoleSelectionPopup.tsx` component
- [ ] **Step 6**: Add `/api/auth/select-role` endpoint
- [ ] **Step 7**: Update login flow to trigger popup when needed
- [ ] **Step 8**: Remove default role assignment in migration service
- [ ] **Step 9**: Test with users from each platform
- [ ] **Step 10**: Deploy to production

---

## 🧪 Testing Scenarios

### Test Cases

1. **Work User** → Auto-assign `company_admin` ✅
2. **Screenly User** → Auto-assign `company_admin` ✅
3. **Bizoforce Vendor** → Auto-assign `vendor` ✅
4. **Bizoforce Directory Listing** → Auto-assign `company_admin` ✅
5. **Giglancer Employer** (posted > bids) → Auto-assign `hr` ✅
6. **Giglancer Freelancer** (bids > posted) → Show popup ⚠️
7. **New User (no platform data)** → Show popup ⚠️
8. **Ambiguous Giglancer** (posted = bids) → Show popup ⚠️

### Expected Outcomes

- **No job seekers in database** after cleanup
- **Smart role detection** based on actual usage
- **Popup only shown** when truly ambiguous
- **All company users** auto-assigned correct role
- **Fast login** (no unnecessary queries)

---

_Created: November 24, 2025_
_Version: 1.0_
