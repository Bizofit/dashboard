# 🚨 URGENT: Dashboard Server Needs Root Restart

## Problem

The Bizoforce Dashboard at https://dashboard.bizoforce.com is currently running **OLD CODE** that has a database schema mismatch.

### Error when users try to login:

```json
{ "success": false, "message": "Unknown column 'role_type' in 'field list'" }
```

### Root Cause

- Process **PID 215724** (owned by **root**) is running the old server code
- The old code uses `role_type` column but the database has `role` column
- New code has been built and deployed to `dist/index.js` but the old process is still running

## Solution

**Run this command as ROOT:**

```bash
sudo bash /home/bizoforce/public_html/dashboard/fix-server.sh
```

OR manually:

```bash
# 1. Kill old processes (as root)
sudo pkill -f "dashboard/dist/index.js"
sudo fuser -k 3006/tcp

# 2. Start new server
cd /home/bizoforce/public_html/dashboard
sudo pm2 start dist/index.js --name dashboard -i 1

# 3. Test
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test123"}'
```

## What Was Fixed in the New Code

1. ✅ Changed schema from `roleType` to `role` in `shared/schema.ts`
2. ✅ Updated all TypeScript files to use `role` instead of `roleType`
3. ✅ Rebuilt server: `npm run build:server`
4. ✅ New compiled code is ready in `dist/index.js`

## Verification After Restart

Login should return a JWT token like this:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1033,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": [...]
    }
  }
}
```

## Files Changed

- `shared/schema.ts` - Schema definition fixed
- `server/routes/auth.ts` - Login route fixed
- `server/auth/google.ts` - Google OAuth fixed
- `server/auth/middleware.ts` - Auth middleware fixed
- `server/routes/dashboard.ts` - Dashboard route fixed
- `dist/index.js` - Recompiled with fixes

## Current Status

- ❌ Server NOT working (old process running)
- ✅ New code READY (in dist/index.js)
- ✅ Database schema CORRECT (`role` column exists)
- ✅ Build SUCCESSFUL
- ⏳ Waiting for ROOT to restart server

---

**Generated:** November 22, 2025 at 1:47 PM
**Developer:** GitHub Copilot
**Priority:** HIGH - Users cannot login!
