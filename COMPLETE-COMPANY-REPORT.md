# 📊 Complete Company Discovery Report

## User: info.webkit24@gmail.com

---

## 🔍 Executive Summary

The user **info.webkit24@gmail.com** (Unified ID: 1042) is associated with **2 companies** across the platform:

1. ✅ **clickstraight** (Primary) - From Unified/Work database
2. ✅ **Sahjeepurckstraight** - From Work.Bizoforce legacy database

---

## 📋 User Profile Across Databases

| Database           | User ID | Status        | Email                   | Display Name   |
| ------------------ | ------- | ------------- | ----------------------- | -------------- |
| **Unified**        | 1042    | ✅ Active     | info.webkit24@gmail.com | -              |
| **Bizoforce**      | 1189866 | ✅ Exists     | info.webkit24@gmail.com | Webkit24_W     |
| **Work.Bizoforce** | 121     | ✅ Active     | info.webkit24@gmail.com | Ashish Kaushal |
| **Giglancer**      | NULL    | ❌ Not Linked | -                       | -              |
| **Screenly**       | NULL    | ❌ Not Linked | -                       | -              |

---

## 🏢 Companies Found

### Company 1: **clickstraight** (PRIMARY)

**Database**: Unified (Master Registry)  
**Company ID**: 1  
**User Role**: company_admin  
**Status**: Primary Company  
**Source**: Migrated from Work.Bizoforce platform

**Details**:

```
Name: clickstraight
Website: Not set
Industry: Not set
Size: Not set
Description: Not set
```

**User Access**:

- Role: `company_admin` (Full administrative access)
- Source Platform: `work`
- Is Primary: ✅ YES
- Is Active: ✅ YES
- Role ID: 61

**What This Means**:
This is the user's PRIMARY company in the unified dashboard. They have full admin access and can:

- Manage company settings
- Add/remove team members
- View all company data
- Access all features

---

### Company 2: **Sahjeepurckstraight**

**Database**: Work.Bizoforce (Legacy)  
**Company ID**: 26  
**User Role**: Based on company_id association  
**Status**: Active

**Details**:

```
Name: Sahjeepurckstraight
Email: sudh013@gmail.com
Website: Not set
Address: 72 ba Goojipur
```

**User Access**:

- User ID in Work: 121
- Name: Ashish Kaushal
- Company ID: 26
- Status: active

**What This Means**:
This company exists in the legacy Work.Bizoforce database. The user is associated with company ID 26, but this company may or may not have been migrated to the unified database yet.

**Note**: There's a discrepancy:

- Unified DB: User has role for company_id = 1 (clickstraight)
- Work DB: User belongs to company_id = 26 (Sahjeepurckstraight)

This suggests either:

1. The user has access to BOTH companies
2. Company 26 needs to be migrated to the unified system
3. Company 26 was merged/renamed to "clickstraight" (company 1)

---

## 🔄 How the System Finds Companies

The `CompanyAggregationService` queries all 5 databases and aggregates results:

### Step-by-Step Process:

```typescript
1. GET USER PLATFORM IDs
   └─ Query unified_users table
   └─ Extract: bizoforce_user_id, work_user_id, giglancer_user_id, etc.

2. QUERY UNIFIED DATABASE
   └─ SELECT companies WHERE user has role
   └─ Result: Company "clickstraight" (ID: 1)

3. QUERY BIZOFORCE DATABASE
   └─ Check for company listings (post_type = 'listing')
   └─ Check for vendor shops (WooCommerce)
   └─ Result: ❌ No companies found (user exists but no listings/shops)

4. QUERY WORK.BIZOFORCE DATABASE
   └─ SELECT user's company_id from users table
   └─ JOIN with companies table
   └─ Result: ✅ Company "Sahjeepurckstraight" (ID: 26)

5. QUERY GIGLANCER DATABASE
   └─ Result: ❌ User not linked

6. QUERY SCREENLY DATABASE
   └─ Result: ❌ User not linked

7. DEDUPLICATE & MERGE
   └─ Create unique IDs: "unified_1", "work_26"
   └─ Mark primary company
   └─ Return array of CompanyData objects
```

---

## 📊 Database Query Details

### Unified Database Query

```sql
SELECT
  c.id, c.name, c.description,
  ur.role as user_role,
  ur.source_platform,
  ur.is_primary
FROM companies c
INNER JOIN user_roles ur ON c.id = ur.company_id
WHERE ur.user_id = 1042
AND ur.is_active = TRUE
ORDER BY ur.is_primary DESC;
```

**Result**:
| id | name | role | source_platform | is_primary |
|----|------|------|-----------------|------------|
| 1 | clickstraight | company_admin | work | 1 (YES) |

---

### Work.Bizoforce Query

```sql
SELECT
  u.id, u.name, u.email, u.company_id,
  c.company_name, c.company_email, c.address
FROM users u
INNER JOIN companies c ON u.company_id = c.id
WHERE u.id = 121;
```

**Result**:
| user_id | user_name | company_id | company_name | company_email |
|---------|-----------|------------|--------------|---------------|
| 121 | Ashish Kaushal | 26 | Sahjeepurckstraight | sudh013@gmail.com |

---

### Bizoforce Query (No Results)

```sql
-- Check for company listings
SELECT ID, post_title
FROM wp_posts
WHERE post_author = 1189866
AND post_type = 'listing'
AND post_status = 'publish';

-- Check for vendor shops
SELECT meta_value as shop_name
FROM wp_usermeta
WHERE user_id = 1189866
AND meta_key = 'pv_shop_name';
```

**Result**: ❌ No listings or shops found

---

## 🎯 What This Means for the Dashboard

When the user logs in and navigates to `/companies`, they should see:

### Expected Response from `/api/companies`:

```json
{
  "success": true,
  "message": "Found 2 companies",
  "data": [
    {
      "id": "unified_1",
      "name": "clickstraight",
      "description": null,
      "platform": "work",
      "originalId": 1,
      "role": "company_admin",
      "originalRole": "company_admin",
      "isPrimary": true,
      "source": "unified",
      "metadata": {
        "roleId": 61
      }
    },
    {
      "id": "work_26",
      "name": "Sahjeepurckstraight",
      "description": null,
      "platform": "work",
      "originalId": 26,
      "role": "company_admin",
      "originalRole": "admin",
      "isPrimary": false,
      "source": "legacy",
      "metadata": {
        "userId": 121,
        "companyEmail": "sudh013@gmail.com",
        "address": "72 ba Goojipur"
      }
    }
  ]
}
```

---

## 🚨 Data Consistency Issues

### Issue 1: Email Mismatch in Work DB

- **User Email**: info.webkit24@gmail.com
- **Company Email** (Company 26): sudh013@gmail.com

This suggests:

- Company 26 might belong to a different user (sudh013@gmail.com)
- OR the company email is outdated
- OR there's a multi-user company setup

### Issue 2: Company ID Discrepancy

- **Unified DB**: User has role for company_id = 1
- **Work DB**: User belongs to company_id = 26

**Possible Explanations**:

1. **Migration Mapping**: Work company 26 → Unified company 1 (remapped during migration)
2. **Multiple Companies**: User actually has access to BOTH companies
3. **Partial Migration**: Company 26 not yet migrated to unified system

### Recommendation:

Check if there's a migration mapping table that links:

```
work_company_id: 26 → unified_company_id: 1
```

---

## 📈 Statistics

| Metric                      | Count             |
| --------------------------- | ----------------- |
| Total Databases Checked     | 5                 |
| Databases with User Account | 3                 |
| Companies Found             | 2                 |
| Primary Companies           | 1                 |
| Active Roles                | 1                 |
| Platforms with Companies    | 2 (Unified, Work) |

---

## 🔮 Next Steps

1. **Verify Company 26 Migration**

   - Check if company 26 should be migrated to unified DB
   - Determine relationship between company 1 and company 26

2. **Update Company Details**

   - Add website, industry, size for "clickstraight"
   - Verify company email for "Sahjeepurckstraight"

3. **Check Other Platforms**

   - Ask user if they want to link Giglancer account
   - Ask user if they want to link Screenly account
   - Check if user wants to create listings/shop on Bizoforce

4. **Data Consistency**
   - Reconcile email discrepancy (sudh013@gmail.com vs info.webkit24@gmail.com)
   - Clarify company ownership and access rights

---

## 📝 Technical Notes

**File**: `server/services/company-aggregation-service.ts`

**Key Methods**:

- `getUserCompanies(userId: 1042)` - Main aggregation method
- `getUnifiedCompanies()` - Queries unified DB
- `getBizoforceCompanies()` - Checks listings and vendor shops
- `getWorkCompanies()` - Queries Work DB
- `getGiglancerCompanies()` - Not applicable (user not linked)
- `getScreenlyCompanies()` - Not applicable (user not linked)
- `deduplicateCompanies()` - Merges results, handles duplicates

**Error Handling**:
The service uses `Promise.allSettled()` to query all databases in parallel, which means:

- If one database fails, others still return results
- Failed queries are logged but don't break the entire flow
- Empty results are handled gracefully

---

**Generated**: November 24, 2025  
**User**: info.webkit24@gmail.com (ID: 1042)  
**Analysis Tool**: Database Query + Company Aggregation Service
