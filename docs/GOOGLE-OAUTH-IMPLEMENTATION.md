# Google OAuth Authentication Implementation

## Overview
This document describes the Google OAuth 2.0 authentication implementation for the Bizoforce Unified Dashboard. Users can now sign in using their Google accounts, and the system automatically creates or links user accounts.

## Setup

### 1. Environment Variables
The following environment variables are required in `.env`:

```env
GOOGLE_CLIENT_ID="769224313452-43qur0mj34a2j5f9qdldhhsu7f7ht4st.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="1hXbwq_j3wnkgNpBs8LLrio3"
GOOGLE_REDIRECT_URI=http://localhost:3006/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### 2. Google Cloud Console Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - Development: `http://localhost:3006/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`
6. Add authorized JavaScript origins:
   - Development: `http://localhost:3006`, `http://localhost:5173`
   - Production: `https://yourdomain.com`

## Architecture

### Backend Components

#### 1. Passport Configuration (`config/passport.js`)
- Configures Google OAuth 2.0 strategy
- Handles user profile extraction
- Calls `loginWithGoogle()` service for user creation/lookup
- Serializes/deserializes user for session

#### 2. Auth Service (`services/auth-service.js`)
- **`loginWithGoogle(googleProfile)`**: Core Google login logic
  - Checks if user exists by `google_id` or `email`
  - Creates new user if not found
  - Links Google ID to existing users
  - Returns JWT token and user data

#### 3. Auth Routes (`routes/auth-routes.js`)
- **`GET /api/auth/google`**: Initiates OAuth flow, redirects to Google
- **`GET /api/auth/google/callback`**: Handles Google callback
  - Receives user data from Passport
  - Redirects to frontend with token and user data
- **`POST /api/auth/google`**: Alternative endpoint for client-side Google Sign-In

#### 4. Server Configuration (`server.js`)
- Express session middleware with secure cookies
- Passport initialization and session handling

### Frontend Components

#### 1. Login Page (`client/src/pages/Login.jsx`)
- Google login button that redirects to `/api/auth/google`
- Triggers OAuth flow in popup window

#### 2. Auth Callback Page (`client/src/pages/AuthCallback.jsx`)
- Receives token and user data from backend redirect
- Stores token in localStorage
- Updates Auth context
- Redirects to dashboard or profile based on user type

#### 3. App Router (`client/src/App.jsx`)
- Added `/auth/callback` route for OAuth redirects

## Authentication Flow

### Server-Side Flow (Recommended)
```
1. User clicks "Continue with Google" on Login page
   ↓
2. Frontend redirects to: GET /api/auth/google
   ↓
3. Passport redirects to Google OAuth consent screen
   ↓
4. User approves access on Google
   ↓
5. Google redirects to: GET /api/auth/google/callback?code=...
   ↓
6. Passport exchanges code for access token
   ↓
7. Passport fetches user profile from Google
   ↓
8. Backend calls loginWithGoogle(profile)
   - Creates/finds user in unified_users
   - Generates JWT token
   ↓
9. Backend redirects to: http://localhost:5173/auth/callback?token=...&user=...
   ↓
10. Frontend AuthCallback page:
    - Stores token in localStorage
    - Updates AuthContext
    - Redirects to /dashboard or /profile
```

### Client-Side Flow (Alternative)
For apps using Google Sign-In JavaScript SDK:
```
1. User clicks Google button
   ↓
2. Google SDK returns profile data
   ↓
3. Frontend sends: POST /api/auth/google { googleProfile }
   ↓
4. Backend processes and returns JWT token
```

## Database Schema

### unified_users Table
```sql
CREATE TABLE unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- NULL for Google-only users
  google_id VARCHAR(255), -- Google user ID
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  user_type ENUM('company', 'individual'),
  email_verified BOOLEAN DEFAULT FALSE, -- Auto-true for Google users
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### User Registration Logic
- **New Google User**: Creates account with `google_id`, no password
- **Existing User (by email)**: Links Google ID to existing account
- **Existing Google User**: Logs in directly

## Security Features

1. **Session Security**
   - HTTP-only cookies
   - Secure flag in production
   - 24-hour session expiration

2. **JWT Tokens**
   - 7-day expiration
   - Contains: userId, email, userType, platform IDs
   - Signed with `JWT_SECRET`

3. **CORS Protection**
   - Whitelist of allowed origins
   - Credentials enabled

4. **Rate Limiting**
   - 100 requests per 15 minutes per IP

## Testing

### Manual Testing
1. Start backend: `npm run dev` (in root)
2. Start frontend: `npm run dev` (in client/)
3. Visit: `http://localhost:5173/login`
4. Click "Continue with Google"
5. Complete Google sign-in
6. Verify redirect to dashboard

### Check User Creation
```sql
SELECT id, email, google_id, first_name, last_name, user_type, email_verified
FROM unified_users
WHERE google_id IS NOT NULL;
```

## Error Handling

### Backend Errors
- **Invalid Google profile**: Returns 400 with error message
- **Database errors**: Logged and returned as 500
- **OAuth failure**: Redirects to login with `?error=google_auth_failed`

### Frontend Errors
- **Missing token**: Shows error and redirects to login
- **Invalid user data**: Shows error and redirects to login
- Query params include error messages: `?error=callback_failed`

## Production Deployment

### Backend (.env)
```env
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-secret
GOOGLE_REDIRECT_URI=https://api.yourdomain.com/api/auth/google/callback
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com
```

### Google Cloud Console
1. Add production redirect URI
2. Add production JavaScript origin
3. Verify domain ownership

## Troubleshooting

### "redirect_uri_mismatch" Error
- Ensure `GOOGLE_REDIRECT_URI` exactly matches Google Console settings
- Check for trailing slashes
- Verify protocol (http vs https)

### User Not Created
- Check backend logs for database errors
- Verify `unified_users` table exists
- Check `google_id` column is VARCHAR(255)

### Token Not Stored
- Check browser console for errors
- Verify localStorage is enabled
- Check CORS settings

### Session Issues
- Clear browser cookies
- Restart backend server
- Check `JWT_SECRET` is set

## API Endpoints

### GET /api/auth/google
Initiates Google OAuth flow
- **Auth**: None (public)
- **Response**: Redirects to Google

### GET /api/auth/google/callback
Handles Google OAuth callback
- **Auth**: None (Passport handles)
- **Response**: Redirects to frontend with token

### POST /api/auth/google
Alternative client-side Google login
- **Auth**: None (public)
- **Body**: `{ googleProfile: { id, email, given_name, family_name } }`
- **Response**: `{ success: true, data: { user, token } }`

## Future Enhancements

1. **Refresh Tokens**: Implement long-lived refresh tokens
2. **Multi-Factor Auth**: Add 2FA for Google accounts
3. **Account Linking**: Allow linking multiple auth methods
4. **Profile Photos**: Store Google profile picture URL
5. **Scopes**: Request additional Google permissions (Calendar, Drive)

---

**Last Updated**: November 20, 2025
**Author**: Bizoforce Development Team
**Version**: 1.0.0
