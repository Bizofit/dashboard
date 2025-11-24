# 🗺️ Company Discovery Flow Diagram

## For user: info.webkit24@gmail.com

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     USER LOGIN: info.webkit24@gmail.com                      │
│                         Unified User ID: 1042                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │  GET /api/companies endpoint    │
                    │  (Authenticated with JWT token) │
                    └─────────────────────────────────┘
                                      │
                                      ▼
              ┌────────────────────────────────────────────┐
              │ CompanyAggregationService.getUserCompanies │
              │            (userId: 1042)                  │
              └────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │  STEP 1: Get Platform IDs       │
                    │  Query: unified_users table     │
                    └─────────────────────────────────┘
                                      │
                  ┌───────────────────┴───────────────────┐
                  │   SELECT bizoforce_user_id,          │
                  │          work_user_id,                │
                  │          giglancer_user_id,           │
                  │          screenly_user_id             │
                  │   FROM unified_users WHERE id = 1042  │
                  └───────────────────┬───────────────────┘
                                      │
                                      ▼
                  ┌───────────────────────────────────────┐
                  │ RESULT: User Platform IDs             │
                  │  ✅ Bizoforce:  1189866               │
                  │  ✅ Work:       121                   │
                  │  ❌ Giglancer:  NULL                  │
                  │  ❌ Screenly:   NULL                  │
                  └───────────────────────────────────────┘
                                      │
                                      ▼
        ┌─────────────────────────────────────────────────────────────┐
        │         STEP 2: Query All 5 Databases (Parallel)            │
        │              Using Promise.allSettled([...])                 │
        └─────────────────────────────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│ 1️⃣ UNIFIED DB │           │ 2️⃣ BIZOFORCE  │           │ 3️⃣ GIGLANCER  │
│   (MySQL)     │           │   (MySQL)     │           │   (MySQL)     │
└───────────────┘           └───────────────┘           └───────────────┘
        │                             │                             │
        │ Query:                      │ Query:                      │ Query:
        │ user_roles →                │ wp_posts                    │ users
        │ companies                   │ (post_type='listing')       │ (account_type)
        │                             │ wp_usermeta                 │
        │ WHERE user_id = 1042        │ (shop_name)                 │ WHERE id = NULL
        │                             │ WHERE author = 1189866      │
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│ ✅ FOUND:     │           │ ❌ NOT FOUND: │           │ ❌ NOT LINKED │
│               │           │               │           │               │
│ Company ID: 1 │           │ No listings   │           │ User NULL     │
│ Name:         │           │ No vendor     │           │               │
│ clickstraight │           │ shop          │           │ No companies  │
│               │           │               │           │               │
│ Role:         │           │ (User exists  │           │               │
│ company_admin │           │  but no       │           │               │
│               │           │  companies)   │           │               │
│ is_primary:   │           │               │           │               │
│ TRUE          │           │               │           │               │
└───────────────┘           └───────────────┘           └───────────────┘


        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────┐
│ 4️⃣ SCREENLY   │           │ 5️⃣ WORK.BIZ   │
│ (PostgreSQL)  │           │   (MySQL)     │
└───────────────┘           └───────────────┘
        │                             │
        │ Query:                      │ Query:
        │ users                       │ users → companies
        │                             │
        │ WHERE id = NULL             │ WHERE user_id = 121
        │                             │ JOIN companies ON
        │                             │   users.company_id = companies.id
        ▼                             ▼
┌───────────────┐           ┌───────────────────────────┐
│ ❌ NOT LINKED │           │ ✅ FOUND:                 │
│               │           │                           │
│ User NULL     │           │ User ID: 121              │
│               │           │ Name: Ashish Kaushal      │
│ No companies  │           │                           │
│               │           │ Company ID: 26            │
│               │           │ Name: Sahjeepurckstraight │
│               │           │ Email: sudh013@gmail.com  │
│               │           │ Address: 72 ba Goojipur   │
└───────────────┘           └───────────────────────────┘


                                      │
                                      ▼
        ┌─────────────────────────────────────────────────────────┐
        │  STEP 3: Merge Results (Deduplicate & Normalize)        │
        └─────────────────────────────────────────────────────────┘
                                      │
                  ┌───────────────────┴───────────────────┐
                  │                                       │
                  ▼                                       ▼
        ┌──────────────────────┐            ┌──────────────────────┐
        │ Company 1 (Primary)  │            │ Company 2            │
        │ ─────────────────────│            │ ─────────────────────│
        │ ID: "unified_1"      │            │ ID: "work_26"        │
        │ Name: clickstraight  │            │ Name: Sahjeepurc...  │
        │ Platform: work       │            │ Platform: work       │
        │ Role: company_admin  │            │ Role: company_admin  │
        │ isPrimary: TRUE ✅   │            │ isPrimary: FALSE     │
        │ Source: unified      │            │ Source: legacy       │
        └──────────────────────┘            └──────────────────────┘


                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │  STEP 4: Return JSON Response   │
                    └─────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          API RESPONSE                                        │
│ {                                                                            │
│   "success": true,                                                           │
│   "message": "Found 2 companies",                                            │
│   "data": [                                                                  │
│     {                                                                        │
│       "id": "unified_1",            ← Primary company shown first           │
│       "name": "clickstraight",                                               │
│       "platform": "work",                                                    │
│       "role": "company_admin",                                               │
│       "isPrimary": true             ← User's main company                   │
│     },                                                                       │
│     {                                                                        │
│       "id": "work_26",              ← Secondary company from legacy DB      │
│       "name": "Sahjeepurckstraight",                                         │
│       "platform": "work",                                                    │
│       "role": "company_admin",                                               │
│       "isPrimary": false            ← Not primary, but still has access     │
│     }                                                                        │
│   ]                                                                          │
│ }                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   Frontend: Companies Page      │
                    │   Displays both companies       │
                    │   with clickstraight as primary │
                    └─────────────────────────────────┘
```

---

## 🔍 Key Points

### ✅ What Works:

1. **User exists in 3 databases**: Unified, Bizoforce, Work
2. **Found 2 companies**:
   - clickstraight (Unified DB, primary)
   - Sahjeepurckstraight (Work DB, legacy)
3. **Parallel queries**: All databases checked simultaneously
4. **Graceful failures**: Missing data doesn't break the flow
5. **Role-based access**: User has company_admin role for both

### ⚠️ Data Considerations:

1. **Email mismatch**:
   - User: info.webkit24@gmail.com
   - Company 26 email: sudh013@gmail.com
2. **ID discrepancy**:
   - Unified DB: company_id = 1
   - Work DB: company_id = 26
3. **Possible migration**: Company 26 may have been remapped to Company 1

### ❌ Not Used:

- Giglancer database (user not linked)
- Screenly database (user not linked)
- Bizoforce listings/shops (none found)

---

## 📊 Database Query Summary

| Database      | Queried    | Found Companies | Details                        |
| ------------- | ---------- | --------------- | ------------------------------ |
| **Unified**   | ✅ Yes     | 1 company       | clickstraight (ID: 1)          |
| **Bizoforce** | ✅ Yes     | 0 companies     | User exists, no listings/shops |
| **Giglancer** | ⚠️ Skipped | 0 companies     | User not linked (NULL)         |
| **Screenly**  | ⚠️ Skipped | 0 companies     | User not linked (NULL)         |
| **Work**      | ✅ Yes     | 1 company       | Sahjeepurckstraight (ID: 26)   |

**Total Companies**: 2  
**Query Time**: ~100-300ms (parallel execution)  
**Success Rate**: 100% (no database errors)

---

## 🎯 Business Logic

```typescript
// Simplified code flow
async function getUserCompanies(userId: 1042) {
  // 1. Get platform IDs
  const platformIds = await getPlatformIds(1042);
  //    → { bizoforceUserId: 1189866, workUserId: 121, ... }

  // 2. Query all databases (parallel)
  const [unified, bizoforce, giglancer, screenly, work] =
    await Promise.allSettled([
      getUnifiedCompanies(1042), // Returns: [clickstraight]
      getBizoforceCompanies(1189866), // Returns: []
      getGiglancerCompanies(null), // Returns: []
      getScreenlyCompanies(null), // Returns: []
      getWorkCompanies(121), // Returns: [Sahjeepurckstraight]
    ]);

  // 3. Merge successful results
  const allCompanies = [
    ...unified.value, // [clickstraight]
    ...bizoforce.value, // []
    ...work.value, // [Sahjeepurckstraight]
  ];

  // 4. Deduplicate and sort by isPrimary
  return deduplicateCompanies(allCompanies);
  //    → [clickstraight (primary), Sahjeepurckstraight]
}
```

---

**Generated**: November 24, 2025  
**Diagram Type**: Company Discovery Flow  
**User**: info.webkit24@gmail.com
