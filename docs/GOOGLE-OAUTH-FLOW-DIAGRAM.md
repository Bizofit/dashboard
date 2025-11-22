# Bizoforce Unified Dashboard - Google OAuth Authentication Flow

## Overview
This document describes the complete authentication flow for the Bizoforce Unified Dashboard, integrating Google OAuth 2.0 with the existing multi-database, multi-role system spanning 5 platforms.

---

## 🔐 Complete Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            USER INITIATES LOGIN                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │   Frontend Login Page   │
                        │  (React Component)      │
                        └─────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
        ┌───────────────────────┐         ┌───────────────────────┐
        │  "Login with Google"  │         │   Traditional Login (only for invited company emplyee)  │
        │       Button          │         │  (Email + Password)   │
        └───────────────────────┘         └───────────────────────┘
                    │                                   │
                    │                                   │
                    ▼                                   ▼


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         GOOGLE OAUTH 2.0 FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────────┘

    Frontend                    Backend API              Google OAuth         Database
        │                           │                          │                  │
        │ 1. Click "Login with      │                          │                  │
        │    Google"                │                          │                  │
        ├──────────────────────────>│                          │                  │
        │                           │                          │                  │
        │ 2. GET /api/auth/google   │                          │                  │
        │                           │                          │                  │
        │                           │ 3. Redirect to Google    │                  │
        │                           │    with OAuth params     │                  │
        │                           ├─────────────────────────>│                  │
        │                           │    client_id             │                  │
        │                           │    redirect_uri          │                  │
        │                           │    scope (profile,email) │                  │
        │<──────────────────────────┤                          │                  │
        │                           │                          │                  │
        │ 4. Redirected to Google   │                          │                  │
        │    Login Page             │                          │                  │
        ├───────────────────────────┼─────────────────────────>│                  │
        │                           │                          │                  │
        │ 5. User authenticates &   │                          │                  │
        │    grants permissions     │                          │                  │
        │                           │                          │                  │
        │ 6. Google redirects back  │                          │                  │
        │    with authorization     │                          │                  │
        │    code                   │                          │                  │
        │<──────────────────────────┼──────────────────────────┤                  │
        │                           │                          │                  │
        │ 7. Send auth code to      │                          │                  │
        │    backend                │                          │                  │
        ├──────────────────────────>│                          │                  │
        │ GET /api/auth/google/     │                          │                  │
        │     callback?code=xxx     │                          │                  │
        │                           │                          │                  │
        │                           │ 8. Exchange code for     │                  │
        │                           │    access token          │                  │
        │                           ├─────────────────────────>│                  │
        │                           │                          │                  │
        │                           │ 9. Return access token   │                  │
        │                           │    & user profile        │                  │
        │                           │<─────────────────────────┤                  │
        │                           │    {                     │                  │
        │                           │      id, email,          │                  │
        │                           │      name, picture       │                  │
        │                           │    }                     │                  │
        │                           │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                    USER LOOKUP & MIGRATION PROCESS                               │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    │                          │                  │
                                    │ 10. Check if user exists │                  │
                                    │     in unified DB        │                  │
                                    ├─────────────────────────────────────────────>│
                                    │ SELECT * FROM            │                  │
                                    │ unified_users WHERE      │                  │
                                    │ email = ? OR             │                  │
                                    │ google_id = ?            │                  │
                                    │                          │                  │
                                    │<─────────────────────────────────────────────┤
                                    │ User found / not found   │                  │
                                    │                          │                  │
                                    ▼                          │                  │
                        ┌───────────────────────┐              │                  │
                        │   User Exists?        │              │                  │
                        └───────────────────────┘              │                  │
                                    │                          │                  │
                    ┌───────────────┴───────────────┐          │                  │
                    │                               │          │                  │
                YES │                               │ NO       │                  │
                    ▼                               ▼          │                  │
        ┌──────────────────────┐      ┌──────────────────────────────┐            │
        │  Load User Profile   │      │  SEARCH LEGACY DATABASES     │            │
        │  from unified_users  │      │  (Bizoforce, Giglancer,      │            │
        └──────────────────────┘      │   Screenly, Work.Bizoforce)  │            │
                    │                 └──────────────────────────────┘            │
                    │                               │                             │
                    │                               │ 11. Query all 4 legacy DBs  │
                    │                               ├────────────────────────────>│
                    │                               │ Bizoforce:  wp_users        │
                    │                               │ Giglancer:  users           │
                    │                               │ Screenly:   users           │
                    │                               │ Work:       users           │
                    │                               │                             │
                    │                               │<────────────────────────────┤
                    │                               │ Return matching users       │
                    │                               │                             │
                    │                               ▼                             │
                    │                   ┌──────────────────────┐                  │
                    │                   │  Found in Legacy DB? │                  │
                    │                   └──────────────────────┘                  │
                    │                               │                             │
                    │               ┌───────────────┴───────────────┐             │
                    │          YES  │                               │  NO         │
                    │               ▼                               ▼             │
                    │   ┌──────────────────────┐      ┌──────────────────────┐   │
                    │   │  MIGRATE USER        │      │  CREATE NEW USER     │   │
                    │   │  to Unified DB       │      │  in Unified DB       │   │
                    │   └──────────────────────┘      └──────────────────────┘   │
                    │               │                               │             │
                    │               │ 12. Insert into unified_users │             │
                    │               ├───────────────────────────────┼────────────>│
                    │               │ {                             │             │
                    │               │   email,                      │             │
                    │               │   google_id,                  │             │
                    │               │   bizoforce_user_id,          │             │
                    │               │   giglancer_user_id,          │             │
                    │               │   screenly_user_id,           │             │
                    │               │   work_user_id,               │             │
                    │               │   auth_provider: 'google'     │             │
                    │               │ }                             │             │
                    │               │                               │             │
                    │               └───────────────┬───────────────┘             │
                    │                               │                             │
                    └───────────────────────────────┴─────────────────────────────┘
                                                    │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         ROLE DETECTION & ASSIGNMENT                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                                    │
                                    │ 13. Detect user roles    │                  │
                                    │     across platforms     │                  │
                                    ├─────────────────────────────────────────────>│
                                    │                          │                  │
                                    │ Bizoforce: Check         │                  │
                                    │   - wp_usermeta (roles)  │                  │
                                    │   - wp_posts (vendor)    │                  │
                                    │                          │                  │
                                    │ Giglancer: Check         │                  │
                                    │   - users.account_type   │                  │
                                    │   - jobs.user_id         │                  │
                                    │                          │                  │
                                    │ Screenly: Check          │                  │
                                    │   - users.role           │                  │
                                    │   - company_members      │                  │
                                    │                          │                  │
                                    │ Work: Check              │                  │
                                    │   - users.role           │                  │
                                    │   - project_members      │                  │
                                    │                          │                  │
                                    │<─────────────────────────────────────────────┤
                                    │ Return: [roles array]    │                  │
                                    │                          │                  │
                                    │ 14. Insert user_roles    │                  │
                                    ├─────────────────────────────────────────────>│
                                    │ INSERT INTO user_roles   │                  │
                                    │   (user_id, role_type,   │                  │
                                    │    platform, is_primary, │                  │
                                    │    company_id)           │                  │
                                    │                          │                  │
                                    │ Example:                 │                  │
                                    │ - Vendor (Bizoforce)     │                  │
                                    │ - Freelancer (Giglancer) │                  │
                                    │ - Company Admin (Screenly│                  │
                                    │ - Team Member (Work)     │                  │
                                    │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                         JWT TOKEN GENERATION                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │                          │                  │
                                    │ 15. Generate JWT token   │                  │
                                    │                          │                  │
                                    │ jwt.sign({               │                  │
                                    │   userId,                │                  │
                                    │   email,                 │                  │
                                    │   google_id,             │                  │
                                    │   roles: [...],          │                  │
                                    │   primary_role,          │                  │
                                    │   auth_provider: 'google'│                  │
                                    │ }, JWT_SECRET, {         │                  │
                                    │   expiresIn: '7d'        │                  │
                                    │ })                       │                  │
                                    │                          │                  │
        │                           │ 16. Return response      │                  │
        │<──────────────────────────┤                          │                  │
        │ {                         │                          │                  │
        │   success: true,          │                          │                  │
        │   data: {                 │                          │                  │
        │     token,                │                          │                  │
        │     user: {               │                          │                  │
        │       id, email, name,    │                          │                  │
        │       picture,            │                          │                  │
        │       roles: [...],       │                          │                  │
        │       primary_role        │                          │                  │
        │     }                     │                          │                  │
        │   }                       │                          │                  │
        │ }                         │                          │                  │
        │                           │                          │                  │


┌─────────────────────────────────────────────────────────────────────────────────┐
│                    FRONTEND: STORE TOKEN & REDIRECT                              │
└─────────────────────────────────────────────────────────────────────────────────┘
        │                           │                          │                  │
        │ 17. Store JWT in          │                          │                  │
        │     localStorage          │                          │                  │
        │     or httpOnly cookie    │                          │                  │
        │                           │                          │                  │
        │ 18. Store user data in    │                          │                  │
        │     React Context/State   │                          │                  │
        │                           │                          │                  │
        │ 19. Redirect based on     │                          │                  │
        │     primary role:         │                          │                  │
        │                           │                          │                  │
        │  Company Admin  →         │                          │                  │
        │    /dashboard             │                          │                  │
        │  Vendor         →         │                          │                  │
        │    /products-services     │                          │                  │
        │  HR             →         │                          │                  │
        │    /jobs                  │                          │                  │
        │  Team Member    →         │                          │                  │
        │    /my-projects           │                          │                  │
        │  Freelancer     →         │                          │                  │
        │    /job-search            │                          │                  │
        │                           │                          │                  │
        ▼                           │                          │                  │
┌───────────────────┐              │                          │                  │
│   Dashboard View  │              │                          │                  │
└───────────────────┘              │                          │                  │
```

---

## 🔄 Subsequent API Requests (Protected Routes)

```
    Frontend                    Backend API                  Middleware           Database
        │                           │                           │                    │
        │ 1. API Request with       │                           │                    │
        │    Authorization header   │                           │                    │
        ├──────────────────────────>│                           │                    │
        │ GET /api/profile          │                           │                    │
        │ Authorization: Bearer     │                           │                    │
        │   <JWT_TOKEN>             │                           │                    │
        │                           │                           │                    │
        │                           │ 2. Authenticate middleware│                    │
        │                           ├──────────────────────────>│                    │
        │                           │                           │                    │
        │                           │                           │ 3. Verify JWT      │
        │                           │                           │    jwt.verify()    │
        │                           │                           │                    │
        │                           │                           │ 4. Extract payload │
        │                           │                           │    { userId,       │
        │                           │                           │      email,        │
        │                           │                           │      roles }       │
        │                           │                           │                    │
        │                           │                           │ 5. Attach to       │
        │                           │                           │    req.user        │
        │                           │                           │                    │
        │                           │<──────────────────────────┤                    │
        │                           │ Authentication success    │                    │
        │                           │                           │                    │
        │                           │ 6. Process request        │                    │
        │                           ├───────────────────────────────────────────────>│
        │                           │ Query user data from      │                    │
        │                           │ unified DB + legacy DBs   │                    │
        │                           │                           │                    │
        │                           │<───────────────────────────────────────────────┤
        │                           │ Return data               │                    │
        │                           │                           │                    │
        │<──────────────────────────┤                           │                    │
        │ Response with data        │                           │                    │
        │                           │                           │                    │
```

---

## 📊 Database Schema for Google OAuth

### Updated `unified_users` Table
```sql
CREATE TABLE unified_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),  -- NULL for Google OAuth users
  
  -- Google OAuth fields
  google_id VARCHAR(255) UNIQUE,
  google_profile_picture VARCHAR(500),
  auth_provider ENUM('local', 'google', 'hybrid') DEFAULT 'local',
  
  -- User details
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  
  -- Legacy platform IDs
  bizoforce_user_id INT,
  giglancer_user_id INT,
  screenly_user_id INT,
  work_user_id INT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  
  -- Indexes
  INDEX idx_email (email),
  INDEX idx_google_id (google_id),
  INDEX idx_auth_provider (auth_provider)
);
```

### `user_roles` Table (Multi-Role Support)
```sql
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role_type ENUM('company_admin', 'hr', 'team_lead', 'team_member', 
                 'finance', 'vendor', 'resource_provider', 
                 'job_seeker', 'freelancer') NOT NULL,
  platform VARCHAR(50),  -- 'bizoforce', 'giglancer', 'screenly', 'work'
  company_id INT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_role_type (role_type),
  INDEX idx_platform (platform)
);
```

### `oauth_tokens` Table (Optional - for token refresh)
```sql
CREATE TABLE oauth_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  provider ENUM('google', 'facebook', 'microsoft') NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES unified_users(id) ON DELETE CASCADE,
  INDEX idx_user_provider (user_id, provider)
);
```

---

## 🛠️ Implementation Checklist

### Backend Setup
- [ ] Install dependencies: `passport`, `passport-google-oauth20`
- [ ] Configure Google OAuth 2.0 credentials in Google Cloud Console
- [ ] Add environment variables:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_CALLBACK_URL`
- [ ] Create migration: `04-add-google-oauth-support.sql`
- [ ] Implement `services/google-oauth-service.js`
- [ ] Create routes: `routes/google-auth-routes.js`
- [ ] Update `services/auth-service.js` to handle OAuth users
- [ ] Update `middleware/auth-middleware.js` to support Google tokens

### Frontend Setup
- [ ] Install `@react-oauth/google` or use Google Sign-In button
- [ ] Create `GoogleLoginButton.jsx` component
- [ ] Update `AuthContext.jsx` to handle OAuth flow
- [ ] Add OAuth callback handler route in React Router
- [ ] Implement token storage (localStorage or httpOnly cookies)
- [ ] Add Google profile picture display in UI

### Security Considerations
- [ ] Validate Google tokens on backend
- [ ] Implement CSRF protection for OAuth flow
- [ ] Use state parameter to prevent CSRF attacks
- [ ] Sanitize user input from Google profile
- [ ] Implement rate limiting on OAuth endpoints
- [ ] Add logging for OAuth events (success/failure)

### Testing
- [ ] Test new user registration via Google
- [ ] Test existing user login via Google (unified DB)
- [ ] Test migrating legacy users on first Google login
- [ ] Test multi-role detection across platforms
- [ ] Test role-based redirects after login
- [ ] Test token refresh flow
- [ ] Test error handling (OAuth failures, network issues)

---

## 🎯 Key Decision Points

### 1. **Account Linking Strategy**
**Question**: What if a user has an existing account with email/password and tries to login with Google using the same email?

**Recommended Approach**:
```javascript
// In google-oauth-service.js
async function handleGoogleLogin(googleProfile) {
  const existingUser = await findUserByEmail(googleProfile.email);
  
  if (existingUser) {
    if (!existingUser.google_id) {
      // Link Google account to existing account
      await updateUser(existingUser.id, {
        google_id: googleProfile.id,
        google_profile_picture: googleProfile.picture,
        auth_provider: 'hybrid'  // Both local and Google
      });
    }
    return generateToken(existingUser);
  } else {
    // Create new user
    return createGoogleUser(googleProfile);
  }
}
```

### 2. **Role Detection Priority**
When user exists in multiple legacy platforms with different roles:
1. Check Screenly first (most structured role system)
2. Check Work.Bizoforce (company-based roles)
3. Check Bizoforce (vendor/customer)
4. Check Giglancer (freelancer/employer)

Set `is_primary = true` for the most recent or most active role.

### 3. **Session Management**
- JWT expiration: 7 days (configurable)
- Refresh token: Optional (can use Google's refresh token)
- Auto-logout: On token expiration or manual logout

### 4. **Privacy Considerations**
- Only request `profile` and `email` scopes from Google
- Store minimal Google data (id, picture URL)
- Allow users to disconnect Google account
- Provide option to switch to local password

---

## 📱 Mobile/PWA Considerations

For future mobile app support:
- Use same OAuth flow with mobile deep links
- Redirect URI: `com.bizoforce.app://oauth/callback`
- Store JWT in secure storage (Keychain/Keystore)
- Implement biometric authentication after first login

---

## 🔐 Security Best Practices

1. **Never expose Google Client Secret** in frontend
2. **Validate Google ID token** on backend using Google's library
3. **Use HTTPS** for all OAuth redirects
4. **Implement rate limiting** on OAuth endpoints (max 5 attempts/15 min)
5. **Log all OAuth events** for security auditing
6. **Set proper CORS** for frontend domain only
7. **Use secure cookies** for token storage (httpOnly, secure, sameSite)
8. **Implement logout** that revokes Google access token

---

## 📈 Analytics & Monitoring

Track the following metrics:
- Google login success rate
- Account linking events
- User migration from legacy platforms
- Role detection accuracy
- Login failures (by reason)
- Average login time

---

## 🚀 Next Steps

1. **Phase 1**: Implement Google OAuth backend (services + routes)
2. **Phase 2**: Create database migrations for OAuth support
3. **Phase 3**: Build React Google login component
4. **Phase 4**: Test with all 5 databases
5. **Phase 5**: Implement role detection and migration logic
6. **Phase 6**: Add analytics and monitoring
7. **Phase 7**: Production deployment with security audit

---

*Last Updated: November 22, 2025*
*Version: 1.0*
