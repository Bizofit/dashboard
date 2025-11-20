# 🚀 Quick Start - Google OAuth Login

## How to Test Google Login

### 1. Start Backend Server
```bash
npm run dev
```
Server runs on: http://localhost:3006

### 2. Start Frontend (New Terminal)
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

### 3. Test Login
1. Go to: http://localhost:5173/login
2. Click "Continue with Google" button
3. You'll be redirected to Google sign-in
4. After approval, redirected back to dashboard

## 🔑 Google Cloud Console Setup

Before testing with real Google account:

1. Go to: https://console.cloud.google.com/
2. Select your project (or create one)
3. Go to "APIs & Services" → "Credentials"
4. Click "OAuth 2.0 Client IDs" → Edit
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3006/api/auth/google/callback
   ```
6. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3006
   http://localhost:5173
   ```
7. Click Save

## 📋 API Endpoints

### Initiate OAuth
```
GET http://localhost:3006/api/auth/google
```
Redirects to Google consent screen

### OAuth Callback
```
GET http://localhost:3006/api/auth/google/callback?code=...
```
Handles Google callback, redirects to frontend with token

### Alternative Client-Side
```
POST http://localhost:3006/api/auth/google
Body: { googleProfile: { id, email, given_name, family_name } }
```

## 🔍 How It Works

```
User clicks "Continue with Google"
         ↓
GET /api/auth/google
         ↓
Redirect to Google
         ↓
User approves
         ↓
GET /api/auth/google/callback
         ↓
Create/login user in database
         ↓
Generate JWT token
         ↓
Redirect to: http://localhost:5173/auth/callback?token=...&user=...
         ↓
Frontend stores token
         ↓
Redirect to dashboard
```

## 📁 Key Files

### Backend
- `config/passport.js` - OAuth strategy
- `routes/auth-routes.js` - OAuth routes
- `services/auth-service.js` - loginWithGoogle()
- `server.js` - Session & passport setup

### Frontend
- `client/src/pages/Login.jsx` - Google button
- `client/src/pages/AuthCallback.jsx` - Callback handler
- `client/src/App.jsx` - Routes

## 🗄️ Database

Users created with Google OAuth:
```sql
SELECT id, email, google_id, first_name, last_name, email_verified
FROM unified_users
WHERE google_id IS NOT NULL;
```

## 🔒 Environment Variables

Required in `.env`:
```
GOOGLE_CLIENT_ID="769224313452-43qur0mj34a2j5f9qdldhhsu7f7ht4st.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="1hXbwq_j3wnkgNpBs8LLrio3"
GOOGLE_REDIRECT_URI=http://localhost:3006/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
JWT_SECRET=bizoforce-local-dev-secret-key-change-in-production-min-64-chars
```

## 🧪 Test Script

```bash
node test-google-oauth.js
```

Tests:
- ✅ OAuth endpoint exists
- ✅ POST endpoint works
- ✅ Environment variables set
- ✅ Database schema ready

## 📚 Full Documentation

See: `docs/GOOGLE-OAUTH-IMPLEMENTATION.md`

## ⚠️ Troubleshooting

### redirect_uri_mismatch
Check that `GOOGLE_REDIRECT_URI` exactly matches Google Console

### User not created
Check logs: `logs/app-*.log`

### Token not stored
Check browser console for errors

---

**Status**: ✅ Ready to Test
**Last Updated**: November 20, 2025
