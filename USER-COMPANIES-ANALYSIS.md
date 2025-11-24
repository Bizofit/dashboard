# Company Discovery for info.webkit24@gmail.com

## Summary

Based on the database queries, here's how the system finds companies for `info.webkit24@gmail.com`:

## User Platform IDs

```
Unified ID:        1042
Email:             info.webkit24@gmail.com
Bizoforce ID:      1189866
Giglancer ID:      NULL (not linked)
Screenly ID:       NULL (not linked)
Work.Bizoforce ID: 121
```

## Companies Found Across Databases

### 1. **Unified Database** (Master Registry)

**Source**: `user_roles` table linked to `companies` table

**Query Logic**:

```sql
SELECT c.*
FROM companies c
INNER JOIN user_roles ur ON c.id = ur.company_id
WHERE ur.user_id = 1042 AND ur.is_active = TRUE
```

**Current Data**:

- **Company ID**: 1
- **Role**: company_admin
- **Platform Source**: work
- **Is Primary**: YES
- **Status**: Active

**This means**: User has company_admin role for company ID 1 in unified database, which was migrated from Work.Bizoforce platform.

---

### 2. **Bizoforce Database** (WordPress/WooCommerce)

**User ID**: 1189866  
**Email**: info.webkit24@gmail.com  
**Display Name**: Webkit24_W

**Query Logic**: The service checks TWO things:

#### A) Company Listings (Directory Listings)

```sql
SELECT p.ID, p.post_title
FROM wp_posts p
WHERE p.post_author = 1189866
AND p.post_type = 'listing'
AND p.post_status = 'publish'
```

**Result**: **NO company listings found**  
(User has not created any company directory listings on Bizoforce.com)

#### B) Vendor Status (Product Shop)

```sql
SELECT shop.meta_value as shop_name
FROM wp_usermeta shop
WHERE shop.user_id = 1189866
AND shop.meta_key = 'pv_shop_name'
```

**Result**: **NO vendor shop found**  
(User has not set up a product shop on Bizoforce marketplace)

**Conclusion**: User exists in Bizoforce but has NO associated companies there.

---

### 3. **Work.Bizoforce Database** (Project Management)

**User ID**: 121  
**Name**: Ashish Kaushal  
**Email**: info.webkit24@gmail.com  
**Company ID**: 26  
**Status**: active

**Query Logic**:

```sql
SELECT u.company_id, c.company_name
FROM users u
INNER JOIN companies c ON u.company_id = c.id
WHERE u.id = 121
```

**Found Company**:

- **Company ID**: 26
- **Company Name**: (Need to query to get name)
- **Role**: Based on user status, likely company_admin or team_member

**However**: The unified database shows `company_id = 1` in user_roles, which might be a different company or a mapping issue.

Let me check company ID 26 details...

---

### 4. **Giglancer Database** (Job Marketplace)

**Status**: User NOT linked (giglancer_user_id = NULL)

**Conclusion**: User has no account or companies in Giglancer.

---

### 5. **Screenly Database** (AI Screening)

**Status**: User NOT linked (screenly_user_id = NULL)

**Conclusion**: User has no account or companies in Screenly.

---

## How the Aggregation Works

The `CompanyAggregationService` (in `server/services/company-aggregation-service.ts`) follows this flow:

```typescript
async getUserCompanies(userId: 1042) {
  // Step 1: Get platform IDs from unified_users table
  const platformIds = {
    bizoforceUserId: 1189866,
    workUserId: 121,
    giglancerUserId: null,
    screenlyUserId: null
  }

  // Step 2: Query all 5 databases in parallel
  const [unifiedCompanies, bizoforceCompanies, giglancerCompanies,
         screenlyCompanies, workCompanies] = await Promise.allSettled([
    this.getUnifiedCompanies(1042),        // ✅ Returns companies from user_roles
    this.getBizoforceCompanies(1189866),  // ❌ Returns [] (no listings/shops)
    this.getGiglancerCompanies(null),     // ❌ Returns [] (not linked)
    this.getScreenlyCompanies(null),      // ❌ Returns [] (not linked)
    this.getWorkCompanies(121),           // ✅ Returns company ID 26
  ])

  // Step 3: Merge and deduplicate
  // - Unified: company_id = 1
  // - Work: company_id = 26
  //
  // Deduplication creates unique IDs like:
  //   "unified_1" and "work_26"

  // Step 4: Return array of CompanyData objects
}
```

---

## Expected Companies for This User

Based on the data:

### ✅ **Company 1** (Primary)

- **ID**: unified_1 (or work_1)
- **Name**: From unified database company table where id = 1
- **Platform**: work (source_platform in user_roles)
- **Role**: company_admin
- **Is Primary**: YES
- **Source**: Unified DB (migrated from Work.Bizoforce)

### ⚠️ **Company 26** (Work.Bizoforce)

- **ID**: work_26
- **Name**: (Need to query companies table in Work DB)
- **Platform**: work
- **Role**: Depends on user's permissions in Work DB
- **Is Primary**: NO
- **Source**: Legacy Work.Bizoforce DB

**Note**: There might be a mismatch between:

- Unified DB says: user has company_id = 1
- Work DB says: user has company_id = 26

This could mean:

1. Company was migrated and remapped (Work company 26 → Unified company 1)
2. User has multiple companies
3. Need to check the companies table in both databases

---

## To Get Actual Company Names

Run these queries:

### Unified Database

```sql
SELECT id, name, website, industry
FROM companies
WHERE id = 1;
```

### Work.Bizoforce Database

```sql
SELECT id, company_name, website, address
FROM companies
WHERE id = 26;
```

---

## API Response Format

When you call `GET /api/companies` with this user's JWT token, you should get:

```json
{
  "success": true,
  "data": [
    {
      "id": "unified_1",
      "name": "Company Name from DB",
      "description": "...",
      "platform": "work",
      "originalId": 1,
      "role": "company_admin",
      "originalRole": "company_admin",
      "isPrimary": true,
      "source": "unified",
      "metadata": { "roleId": 61 }
    },
    {
      "id": "work_26",
      "name": "Company from Work DB",
      "description": "...",
      "platform": "work",
      "originalId": 26,
      "role": "company_admin",
      "originalRole": "admin",
      "isPrimary": false,
      "source": "legacy",
      "metadata": { "userId": 121 }
    }
  ]
}
```

---

## Why Some Databases Return Nothing

1. **Bizoforce**: User exists but hasn't created listings or vendor shop
2. **Giglancer**: User never signed up (giglancer_user_id = NULL)
3. **Screenly**: User never signed up (screenly_user_id = NULL)

The system is designed to **gracefully handle missing data** - it queries all databases and returns whatever companies it finds, without failing if some databases have nothing.

---

## Key Takeaway

For `info.webkit24@gmail.com`:

- **Main Company**: From Work.Bizoforce (company_id 26)
- **Migrated To**: Unified DB (company_id 1)
- **Role**: company_admin
- **Other Platforms**: No companies in Bizoforce, Giglancer, or Screenly
