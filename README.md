# Bizoforce Unified Dashboard - Backend API

## 🚀 Project Overview

Unified authentication and data aggregation API for the Bizoforce ecosystem, consolidating **5 separate databases** into a single dashboard experience:

- **Unified DB** (MySQL) - Master user registry & unified schema
- **Bizoforce** (MySQL) - WordPress/WooCommerce (198K+ users)
- **Giglancer** (MySQL) - Job marketplace (82K+ users)
- **Screenly** (PostgreSQL) - AI screening platform
- **Work.Bizoforce** (MySQL) - Project/timesheet management

## ✨ Features

### Authentication
- ✅ Traditional email/password registration & login
- ✅ Google OAuth 2.0 integration
- ✅ JWT-based stateless authentication (7-day expiration)
- ✅ Automatic user migration from legacy platforms
- ✅ Multi-role support across platforms

### Multi-Role System
Users can have multiple roles:
- Company Admin
- HR/Recruiter
- Team Lead
- Team Member
- Finance
- Vendor
- Resource Provider
- Job Seeker
- Freelancer

### Security
- Helmet.js for security headers
- CORS protection
- Rate limiting (100 req/15min)
- bcrypt password hashing (10 rounds)
- Input validation

## 📋 Prerequisites

- Node.js v18 or higher
- Access to 5 remote databases
- Google OAuth credentials (optional for OAuth flow)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```powershell
cd d:\backend
npm install
```

### 2. Configure Environment Variables

The `.env` file is already configured with database credentials. Update Google OAuth settings if needed:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3006/api/google-auth/callback
```

### 3. Test Database Connections

```powershell
npm test
```

This will test connections to all 5 databases.

### 4. Run Migrations

```powershell
npm run migrate
```

This creates the unified schema tables:
- `unified_users` - Master user table
- `companies` - Company profiles
- `user_roles` - Multi-role system
- `oauth_tokens` - OAuth token storage
- `user_sessions` - Session tracking

### 5. Start Development Server

```powershell
npm run dev
```

Server will run on `http://localhost:3006`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |
| POST | `/api/auth/refresh` | Refresh JWT token | No |
| POST | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/logout` | Logout (client-side) | Yes |

### Google OAuth Routes (`/api/google-auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/google-auth/url` | Get Google OAuth URL | No |
| GET | `/api/google-auth/callback` | OAuth callback (GET) | No |
| POST | `/api/google-auth/callback` | OAuth callback (POST) | No |

### Example Requests

#### Register User
```bash
POST http://localhost:3006/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login
```bash
POST http://localhost:3006/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": [
        {
          "type": "job_seeker",
          "platform": "unified",
          "isPrimary": true
        }
      ],
      "primaryRole": "job_seeker"
    }
  }
}
```

#### Get Profile (Protected)
```bash
GET http://localhost:3006/api/auth/profile
Authorization: Bearer <your_jwt_token>
```

#### Google OAuth Flow
```bash
# 1. Get Google OAuth URL
GET http://localhost:3006/api/google-auth/url

# 2. User authenticates with Google and is redirected back with code

# 3. Exchange code for JWT
POST http://localhost:3006/api/google-auth/callback
Content-Type: application/json

{
  "code": "authorization_code_from_google"
}
```

## 🗂️ Project Structure

```
d:\backend\
├── config/
│   └── database.js           # 5 database connections
├── docs/
│   └── GOOGLE-OAUTH-FLOW-DIAGRAM.md  # OAuth flow documentation
├── migrations/
│   ├── 01-create-unified-users.sql
│   ├── 02-create-companies.sql
│   ├── 03-create-user-roles.sql
│   ├── 04-create-oauth-tokens.sql
│   └── 05-create-sessions.sql
├── middleware/
│   └── auth-middleware.js    # JWT auth & authorization
├── routes/
│   ├── auth-routes.js        # Traditional auth endpoints
│   └── google-auth-routes.js # Google OAuth endpoints
├── services/
│   ├── auth-service.js       # Auth business logic
│   └── google-oauth-service.js # Google OAuth logic
├── scripts/
│   ├── run-migration.js      # Run all migrations
│   └── run-specific-migration.js # Run single migration
├── tests/
│   └── test-connections.js   # Test database connections
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── server.js                 # Main Express app
```

## 🔒 Security Features

### Password Security
- bcrypt hashing with 10 salt rounds
- Minimum password requirements (enforced client-side)
- Password change requires current password verification

### JWT Security
- 7-day token expiration (configurable)
- Secret key stored in environment variable
- Tokens verified on every protected route

### Google OAuth Security
- State parameter for CSRF protection
- Token validation via Google API
- Secure token storage in database

### Request Security
- Helmet.js security headers
- CORS protection (whitelist frontend URLs)
- Rate limiting (100 requests per 15 minutes)
- Request size limits (10MB max)

## 🔄 Google OAuth Flow

See detailed flow diagram: [docs/GOOGLE-OAUTH-FLOW-DIAGRAM.md](docs/GOOGLE-OAUTH-FLOW-DIAGRAM.md)

**Summary**:
1. User clicks "Login with Google"
2. Frontend redirects to Google OAuth URL
3. User authenticates with Google
4. Google redirects back with authorization code
5. Backend exchanges code for access token
6. Backend fetches user profile from Google
7. Backend searches unified + legacy databases for user
8. If found: Link Google account, load roles
9. If not found: Migrate from legacy platforms or create new user
10. Generate JWT and return to frontend

## 🧪 Testing

### Test Database Connections
```powershell
npm test
```

### Manual API Testing
Use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl

Example with curl:
```bash
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 📊 Database Schema

### unified_users Table
Primary user table with:
- Email/password authentication
- Google OAuth fields (`google_id`, `google_profile_picture`)
- Legacy platform IDs (links to 4 legacy databases)
- Account status and timestamps

### user_roles Table
Multi-role support:
- User can have multiple roles
- Roles linked to companies (context)
- `is_primary` flag for default role
- Platform tracking (role origin)

### oauth_tokens Table
OAuth token management:
- Access/refresh tokens
- Token expiration tracking
- Multiple provider support (Google, Facebook, etc.)

### user_sessions Table
Session tracking:
- Device/browser information
- IP address logging
- Session expiration
- Security auditing

## 🚀 Next Steps

### Backend
- [ ] Implement user migration scripts
- [ ] Create company management endpoints
- [ ] Build job listing aggregation
- [ ] Add product/service endpoints
- [ ] Implement timesheet/project routes
- [ ] Add email notification service

### Frontend
- [ ] Setup React + Vite project
- [ ] Implement Google OAuth button
- [ ] Create login/register forms
- [ ] Build role-based dashboard
- [ ] Add profile management
- [ ] Implement role switching

### DevOps
- [ ] Setup production environment
- [ ] Configure SSL certificates
- [ ] Setup database backups
- [ ] Implement logging (Winston)
- [ ] Add monitoring (PM2)

## 🐛 Troubleshooting

### Database Connection Issues
- Check `.env` credentials
- Verify database server is accessible
- Check firewall/network settings
- For PostgreSQL: Ensure `SCREENLY_DB_PASS` is a string

### JWT Token Issues
- Verify `JWT_SECRET` is set
- Check token expiration time
- Ensure Authorization header format: `Bearer <token>`

### Google OAuth Issues
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check redirect URI matches Google Console
- Ensure OAuth consent screen is configured

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server (nodemon) |
| `npm test` | Test database connections |
| `npm run migrate` | Run all migrations |
| `npm run migrate:specific` | Run specific migration file |

## 📄 License

MIT License - Bizoforce Team

## 👥 Contributors

Bizoforce Development Team

---

**Last Updated**: November 22, 2025  
**Version**: 1.0.0
