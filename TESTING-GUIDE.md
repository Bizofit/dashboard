# Migration System Testing Guide

## Quick Start

### 1. **Check Server Status**

```bash
# Verify server is running
sudo /usr/local/bin/pm2 status dashboard

# Watch logs in real-time
sudo /usr/local/bin/pm2 logs dashboard
```

Expected output:

- Status: **online**
- Restart: 7
- Connected to 5/5 databases

---

## 2. **Test Google OAuth Flow**

### Manual Test (Browser)

1. Open: `https://dashboard.bizoforce.com`
2. Click "Login with Google"
3. Authenticate with Google account
4. Watch PM2 logs for migration messages

### Expected Log Output

```bash
# Watch logs during login
sudo /usr/local/bin/pm2 logs dashboard --lines 50 | grep -E "Migration|Bizoforce|Giglancer|Worksuite"
```

**For user with Bizoforce companies**:

```
[Migration] Starting migration for: user@example.com
[Bizoforce] User found: ID 1033
[Bizoforce] Found 2 companies for user 1033
[Worksuite] User not found, creating...
[Worksuite] User created with ID: 1245
[Worksuite] Company created: "Company Name"
[Giglancer] User not found
[Migration] requiresGiglancerConsent = true
[Migration] Assigned roles: company_admin (primary), vendor, team_lead
[Migration] Migration complete for user@example.com
```

**For freelancer**:

```
[Migration] Starting migration for: freelancer@example.com
[Bizoforce] User not found
[Giglancer] User found: ID 8765
[Giglancer] Posted jobs: 0, Applications: 15
[Giglancer] Role detected: job_seeker
[Migration] Assigned roles: job_seeker (primary)
[Migration] Migration complete for freelancer@example.com
```

---

## 3. **Verify Database Changes**

### Check Unified Database

```bash
mysql -h 72.167.148.100 -u bizoforce_newdashboard -p bizoforce_newdashboard

# After login
SELECT * FROM unified_users WHERE email = 'user@example.com';
SELECT * FROM user_roles WHERE user_id = <user_id>;
```

**Expected unified_users fields**:

- `bizoforce_user_id`: Should match wp_users.ID
- `giglancer_user_id`: Should match Giglancer users.id (if found)
- `work_user_id`: Should have new ID if auto-created
- `google_id`: Google OAuth ID
- `auth_provider`: 'google'

**Expected user_roles entries**:

```
+----+---------+---------------+-----------+------------+------------+
| id | user_id | role          | platform  | company_id | is_primary |
+----+---------+---------------+-----------+------------+------------+
| 1  | 1033    | company_admin | bizoforce | 1          | 1          |
| 2  | 1033    | vendor        | bizoforce | 1          | 0          |
| 3  | 1033    | team_lead     | work      | 1          | 0          |
+----+---------+---------------+-----------+------------+------------+
```

### Check Worksuite Creation

```bash
mysql -h 72.167.148.100 -u worksuite_old_demo -p worksuite_old

# After login
SELECT * FROM users WHERE email = 'user@example.com';
SELECT * FROM companies WHERE owner_id = <new_user_id>;
```

**Expected**:

- New user created with email matching Google profile
- Company created with name from Bizoforce

---

## 4. **Test Giglancer Consent Flow**

### Scenario: User with Bizoforce account but NO Giglancer

1. **Login** with Google (user NOT in Giglancer)
2. **Check redirect URL**:
   ```
   https://dashboard.bizoforce.com/auth/callback?token=<JWT>&consent=giglancer
   ```
3. **Frontend should detect** `consent=giglancer` parameter
4. **Show modal**: "Create Giglancer account?"
5. **User selects**: Employer or Freelancer
6. **API call**:
   ```bash
   curl -X POST https://dashboard.bizoforce.com/api/migration/giglancer/create \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"accountType":"employer"}'
   ```

**Expected Response**:

```json
{
  "success": true,
  "message": "Giglancer employer account created successfully",
  "data": {
    "giglancerUserId": 12345
  }
}
```

### Verify Giglancer Database

```bash
mysql -h 72.167.148.100 -u giglancer_bizoforce_demo -p giglancer_bizoforce

# After login
SELECT * FROM users WHERE email = 'user@example.com';
```

**Expected**:

- New user created
- `account_type`: 'employer' or 'freelancer'
- Password hash: auto-generated random password

---

## 5. **Test Different User Types**

### Test Case 1: Company Admin (Existing Bizoforce)

**Email**: user@example.com (known user with companies)

**Expected**:

- ✅ Found in Bizoforce
- ✅ Has companies in wpbdp_listings
- ✅ Auto-created in Worksuite
- ✅ Company created in Worksuite
- ✅ Roles: company_admin, vendor, team_lead
- ✅ Redirect: /dashboard
- ✅ primaryRole: 'company_admin'

### Test Case 2: New User (Not in Any DB)

**Email**: Use a NEW Google account

**Expected**:

- ❌ Not found in Bizoforce
- ❌ Not found in Giglancer
- ❌ Not found in Worksuite
- ✅ Created in unified DB only
- ✅ Role: job_seeker (primary)
- ✅ Redirect: /individual-dashboard (pending implementation)
- ⚠️ No consent needed (no legacy data)

### Test Case 3: Giglancer Freelancer

**Email**: Find user in Giglancer with applications only

**Expected**:

- ❌ Not found in Bizoforce
- ✅ Found in Giglancer
- ✅ Has applications, no posted jobs
- ✅ Role: job_seeker (primary)
- ✅ Redirect: /individual-dashboard

### Test Case 4: Giglancer Recruiter

**Email**: Find user in Giglancer with posted jobs AND applications

**Expected**:

- ✅ Found in Giglancer
- ✅ Posted jobs > 0
- ✅ Applications > 0
- ✅ Roles: hr (primary), job_seeker
- ✅ Redirect: /jobs

---

## 6. **Test JWT Token**

### Decode Token

```bash
# Copy token from browser localStorage or auth/callback URL
# Use https://jwt.io to decode

# Or use command line
echo "<JWT_TOKEN>" | cut -d'.' -f2 | base64 -d | jq
```

**Expected Payload**:

```json
{
  "userId": 1033,
  "email": "user@example.com",
  "googleId": "123456789",
  "roles": [
    {
      "id": 1,
      "role": "company_admin",
      "platform": "bizoforce",
      "isPrimary": true
    },
    { "id": 2, "role": "vendor", "platform": "bizoforce", "isPrimary": false },
    { "id": 3, "role": "team_lead", "platform": "work", "isPrimary": false }
  ],
  "primaryRole": "company_admin",
  "authProvider": "google",
  "iat": 1732289600,
  "exp": 1732896000
}
```

---

## 7. **Test Protected Endpoints**

### Get Profile

```bash
curl -X GET https://dashboard.bizoforce.com/api/auth/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Expected Response**:

```json
{
  "success": true,
  "data": {
    "id": 1033,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "googleId": "123456789",
    "googleProfilePicture": "https://...",
    "authProvider": "google",
    "roles": [
      { "role": "company_admin", "platform": "bizoforce", "isPrimary": true },
      { "role": "vendor", "platform": "bizoforce" },
      { "role": "team_lead", "platform": "work" }
    ],
    "primaryRole": "company_admin"
  }
}
```

---

## 8. **Common Issues & Solutions**

### Issue: "Error checking Bizoforce user"

**Cause**: Database connection failure or query error

**Debug**:

```bash
# Test Bizoforce connection
mysql -h 72.167.148.100 -u bizoforce_BizoforceGodaddyOct292025_demo -p

# Check wp_users table
SHOW TABLES LIKE 'wp_users';
DESCRIBE wp_users;
```

### Issue: "Company not created in Worksuite"

**Cause**: User creation succeeded but company creation failed

**Debug**:

```bash
# Check Worksuite logs
sudo /usr/local/bin/pm2 logs dashboard | grep -E "Worksuite|company"

# Manually check Worksuite
mysql -h 72.167.148.100 -u worksuite_old_demo -p worksuite_old
SELECT * FROM users WHERE email = 'user@example.com';
SELECT * FROM companies WHERE owner_id = <user_id>;
```

### Issue: "requiresGiglancerConsent not triggering modal"

**Cause**: Frontend not implemented yet

**TODO**:

1. Create `ConsentModal.tsx` component
2. Check URL parameter: `consent=giglancer`
3. Show modal with account type selection
4. Call API: `POST /api/migration/giglancer/create`

### Issue: "Roles not assigned correctly"

**Cause**: Logic error in role detection

**Debug**:

```bash
# Check Giglancer jobs/applications
mysql -h 72.167.148.100 -u giglancer_bizoforce_demo -p giglancer_bizoforce

SELECT
  u.id,
  u.email,
  COUNT(DISTINCT j.id) as posted_jobs,
  COUNT(DISTINCT ja.id) as applications
FROM users u
LEFT JOIN jobs j ON j.user_id = u.id
LEFT JOIN job_applications ja ON ja.user_id = u.id
WHERE u.email = 'user@example.com'
GROUP BY u.id;
```

---

## 9. **Performance Monitoring**

### Check Server Health

```bash
# CPU and memory usage
sudo /usr/local/bin/pm2 show dashboard

# Request count
sudo /usr/local/bin/pm2 monit
```

### Migration Time

**Expected**: < 2 seconds for full migration with all database checks

**Monitor**:

```bash
# Add timestamps in logs
sudo /usr/local/bin/pm2 logs dashboard --lines 100 | grep -E "Migration|timestamp"
```

---

## 10. **Production Checklist**

Before going live:

- [ ] Test all 5 database connections
- [ ] Test with 10+ different user types
- [ ] Verify role assignment accuracy
- [ ] Test Worksuite auto-creation
- [ ] Test Giglancer consent flow
- [ ] Verify JWT token structure
- [ ] Test protected endpoints
- [ ] Check error handling
- [ ] Monitor migration performance
- [ ] Set up error alerting
- [ ] Document user support procedures
- [ ] Create rollback plan

---

## 📞 Support

If issues persist:

1. Check PM2 logs: `sudo /usr/local/bin/pm2 logs dashboard --err`
2. Test database connections: `npm test`
3. Verify environment variables: `cat .env | grep -E "DB|GOOGLE"`
4. Restart server: `sudo /usr/local/bin/pm2 restart dashboard --update-env`
5. Check migration service code: `server/services/user-migration.ts`

---

_Last Updated: November 22, 2025_
