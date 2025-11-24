# Session-Based Dashboard Implementation

## Overview

The dashboard at `https://dashboard.bizoforce.com/dashboard` now uses **JWT-based session authentication** instead of localStorage for user data. It dynamically fetches dashboard statistics from the backend API based on the logged-in user's role.

## Architecture

### Backend Components

#### 1. Enhanced Dashboard Service (`services/dashboard-service.js`)

The service now provides role-specific dashboards:

- **Company Admin Dashboard**: Full ecosystem overview with hiring, projects, and marketplace stats
- **HR Dashboard**: Hiring and recruitment focused stats
- **Team Lead Dashboard**: Project and team management stats
- **Finance Dashboard**: Billing and revenue stats
- **Individual Dashboard**: Job seeker/freelancer stats

**Key Methods:**

```javascript
getDashboardStats(userId); // Main entry point - routes to specific dashboard
getCompanyAdminDashboard(user); // Company admin full view
getHRDashboard(user); // HR-specific view
getTeamLeadDashboard(user); // Team lead view
getFinanceDashboard(user); // Finance view
getIndividualDashboard(user); // Individual user view
```

**Stats Fetched from 5 Databases:**

- **Unified DB**: User roles, team members count
- **Giglancer**: Jobs, applications, interviews, candidates
- **Screenly**: AI screenings count
- **Work.Bizoforce**: Projects, timesheets, hours logged
- **Bizoforce**: Products, sales, orders (WooCommerce)

#### 2. Dashboard Routes (`routes/dashboard-routes.js`)

Two main endpoints:

```javascript
GET / api / dashboard / stats; // Get dashboard data (requires authentication)
GET / api / dashboard / user; // Get current user info
```

Both endpoints use `authenticate` middleware which:

1. Validates JWT token from `Authorization: Bearer <token>` header
2. Extracts user info and attaches to `req.user`
3. Returns 401 if token is invalid or expired

### Frontend Component (`public/dashboard.html`)

#### Authentication Flow

1. On page load, check for JWT token in localStorage
2. If no token → redirect to `/login.html`
3. If token exists → fetch dashboard data from API
4. If API returns 401 → logout and redirect to login
5. On successful fetch → render dashboard

#### Session Management

```javascript
// Token stored in localStorage (not user data)
localStorage.setItem("token", jwtToken); // On login
localStorage.getItem("token"); // On dashboard load
localStorage.removeItem("token"); // On logout
```

**Key Difference from HTML Template:**

- ❌ **Old**: `localStorage.getItem('userRole')`, `localStorage.getItem('companyName')`
- ✅ **New**: Fetch from API using JWT token session

#### Dashboard Rendering

Based on API response `userType`:

- `company_admin` → Full ecosystem dashboard
- `hr` → Hiring-focused dashboard
- `team_lead` → Project-focused dashboard
- `finance` → Billing-focused dashboard
- `individual` → Job seeker dashboard

#### Dynamic Components

1. **Stats Cards**: 4 key metrics based on user role
2. **Quick Actions**: Role-specific action buttons
3. **Platform Stats**: Subscription info, credits usage
4. **Recent Activities**: User activity timeline
5. **Getting Started**: Onboarding checklist
6. **Resources**: Help and documentation links

## Data Flow Diagram

```
User Login (login.html)
    ↓
JWT Token Generated
    ↓
Token Stored in localStorage
    ↓
User Navigates to /dashboard
    ↓
Frontend: Fetch with Authorization Header
    ↓
Backend: Validate JWT → Extract userId
    ↓
Dashboard Service: Query 5 Databases
    ↓
Return Role-Specific Stats
    ↓
Frontend: Render Dashboard UI
```

## Security Features

### 1. JWT Token Authentication

- **Token stored in**: localStorage (client-side)
- **Token sent via**: `Authorization: Bearer <token>` header
- **Token expiration**: 7 days (configurable in `.env`)
- **Token validation**: Every API request

### 2. Role-Based Data Access

- Backend queries only data user has permission to access
- User roles checked via `user_roles` table
- Multi-role support (user can have multiple roles)

### 3. Database Access Control

- User can only access data from platforms they're linked to
- Checks for `bizoforce_user_id`, `giglancer_user_id`, etc.
- Returns 0 for stats from platforms user doesn't have access to

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "userType": "company_admin",
    "user": {
      "id": 1033,
      "email": "admin@company.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "stats": {
      "openPositions": 5,
      "applications": 23,
      "aiScreenings": 15,
      "interviews": 8,
      "activeProjects": 12,
      "teamMembers": 45,
      "hoursLogged": 1234,
      "pendingTimesheets": 3
    },
    "platformStats": {
      "jobPostingCredits": { "used": 35, "total": 50, "percentage": 70 },
      "aiScreeningCredits": { "used": 342, "total": 500, "percentage": 68 },
      "subscriptionPlan": "Enterprise",
      "nextBillingDate": "Dec 15, 2025"
    },
    "activities": [
      {
        "icon": "👤",
        "title": "Profile Updated",
        "description": "Welcome John",
        "time": "Just now",
        "color": "blue"
      }
    ],
    "quickActions": [{ "icon": "📝", "label": "Post Job", "link": "/jobs" }],
    "primaryGoal": "hiring"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Failed to fetch dashboard statistics"
}
```

## Customization by User Role

### Company Admin Stats (primaryGoal-based)

- **Hiring Goal**: Open Positions, Applications, AI Screenings, Interviews
- **Projects Goal**: Active Projects, Team Members, Hours Logged, Pending Timesheets
- **Marketplace Goal**: Products Listed, Total Sales, Active Orders, Customer Views
- **All Goals**: Mix of all above

### HR Stats

- Open Positions
- Applications
- AI Screenings
- Interviews
- Pending Offers

### Team Lead Stats

- Active Projects
- Team Members
- Pending Timesheets
- Projects On Time

### Finance Stats

- Pending Invoices
- Monthly Revenue
- Unpaid Invoices
- Total Earnings

### Individual Stats

- Job Applications
- Active Projects
- Monthly Earnings
- Hours Logged

## Testing the Dashboard

### 1. Test Authentication

```bash
# Register a user
curl -X POST http://localhost:3006/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "userType": "company"
  }'

# Login
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "password123"
  }'

# Save the token from response
```

### 2. Test Dashboard API

```bash
# Fetch dashboard stats (replace <TOKEN> with actual JWT)
curl -X GET http://localhost:3006/api/dashboard/stats \
  -H "Authorization: Bearer <TOKEN>"
```

### 3. Test Frontend

1. Open browser: `http://localhost:3006/login.html`
2. Login with test credentials
3. Should redirect to `/dashboard` on success
4. Dashboard should load with user-specific data

### 4. Test Logout

- Click "Logout" button
- Token should be cleared
- Should redirect to login page

## Migration from localStorage to Session

### Old Approach (HTML Template)

```javascript
// Store user data in localStorage
localStorage.setItem("userType", "company");
localStorage.setItem("userRole", "Company Admin");
localStorage.setItem("companyName", "Acme Corp");
localStorage.setItem("primaryGoal", "hiring");

// Read data on dashboard
const companyName = localStorage.getItem("companyName");
```

### New Approach (API-based)

```javascript
// Store only token
localStorage.setItem("token", jwtToken);

// Fetch data from API
const response = await fetch("/api/dashboard/stats", {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await response.json();
const companyName = data.user.firstName;
```

## Benefits of Session-Based Approach

1. **Security**: User data not exposed in localStorage
2. **Real-time**: Always fetches latest data from database
3. **Centralized**: Single source of truth (backend database)
4. **Scalable**: Works across multiple devices/sessions
5. **Secure**: JWT tokens can be invalidated server-side
6. **Consistent**: Same data structure for all clients

## Next Steps

1. **Implement Company Profile**: Store `companyName`, `primaryGoal` in database
2. **Add Activity Tracking**: Log user actions to database for activity feed
3. **Subscription Management**: Connect to payment gateway for billing
4. **Real-time Updates**: Add WebSocket for live dashboard updates
5. **Analytics**: Track dashboard views and user engagement

## Related Documentation

- [AUTH-API-TESTING.md](./AUTH-API-TESTING.md) - Authentication testing guide
- [MULTI-ROLE-MANAGEMENT.md](./MULTI-ROLE-MANAGEMENT.md) - Multi-role system architecture
- [GOOGLE-OAUTH-IMPLEMENTATION.md](./GOOGLE-OAUTH-IMPLEMENTATION.md) - Google OAuth setup

---

_Last Updated: November 22, 2025_
_Session-Based Dashboard v1.0_
