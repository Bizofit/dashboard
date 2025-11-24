# Quick Reference: Session-Based Dashboard

## API Endpoints

### Authentication

```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login & get JWT token
POST /api/auth/logout    - Logout (clear session)
GET  /api/auth/profile   - Get user profile
```

### Dashboard

```
GET /api/dashboard/stats - Get dashboard data (requires auth)
GET /api/dashboard/user  - Get current user info (requires auth)
```

## Frontend URLs

```
/login.html     - Login page
/register.html  - Registration page
/dashboard      - Main dashboard (requires login)
```

## Usage Examples

### Login & Access Dashboard

```javascript
// 1. Login
const loginResponse = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const { data } = await loginResponse.json();
const token = data.token;

// 2. Store token
localStorage.setItem("token", token);

// 3. Fetch dashboard
const dashboardResponse = await fetch("/api/dashboard/stats", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const dashboard = await dashboardResponse.json();
console.log(dashboard.data);
```

### Logout

```javascript
localStorage.removeItem("token");
window.location.href = "/login.html";
```

## Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "message": "Error description"
}
```

## Dashboard Data Structure

```javascript
{
  userType: "company_admin" | "hr" | "team_lead" | "finance" | "individual",
  user: {
    id: number,
    email: string,
    firstName: string,
    lastName: string
  },
  stats: {
    // Role-specific stats
    openPositions: number,
    applications: number,
    // ... more stats
  },
  platformStats: {
    jobPostingCredits: { used, total, percentage },
    aiScreeningCredits: { used, total, percentage },
    subscriptionPlan: string,
    nextBillingDate: string
  },
  activities: [
    { icon, title, description, time, color }
  ],
  quickActions: [
    { icon, label, link }
  ]
}
```

## Role-Based Stats

### Company Admin

- openPositions, applications, aiScreenings, interviews
- activeProjects, teamMembers, hoursLogged, pendingTimesheets
- productsListed, totalSales, activeOrders, customerViews

### HR

- openPositions, applications, aiScreenings, interviews, pendingOffers

### Team Lead

- activeProjects, teamMembers, pendingTimesheets, projectsOnTime

### Finance

- pendingInvoices, monthlyRevenue, unpaidInvoices, totalEarnings

### Individual

- jobApplications, activeProjects, monthlyEarnings, hoursLogged

## Testing

### Run Tests

```bash
node test-dashboard-api.js
```

### Manual Test

```bash
# Login
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get dashboard (replace <TOKEN>)
curl -X GET http://localhost:3006/api/dashboard/stats \
  -H "Authorization: Bearer <TOKEN>"
```

## Troubleshooting

### 401 Unauthorized

- Token expired or invalid
- Token not sent in Authorization header
- Solution: Re-login to get new token

### 500 Internal Server Error

- Database connection issue
- Check server logs: `tail -f logs/app.log`
- Verify all 5 databases are connected

### Empty Stats

- User not linked to any platform
- Normal for new users
- Will show zeros

## Environment Variables

Required in `.env`:

```
JWT_SECRET=your_secret_key
PORT=3006
NODE_ENV=development

# Database credentials (5 sets)
UNIFIED_DB_HOST=...
BIZOFORCE_DB_HOST=...
GIGLANCER_DB_HOST=...
SCREENLY_DB_HOST=...
WORK_DB_HOST=...
```

## Files Modified

```
services/dashboard-service.js  - Dashboard logic
routes/dashboard-routes.js     - API endpoints
public/dashboard.html          - Frontend UI
```

## Security Notes

- ✅ JWT tokens expire in 7 days
- ✅ Passwords hashed with bcrypt
- ✅ CORS enabled for authorized origins
- ✅ Rate limiting on API routes (100 req/15min)
- ✅ Helmet security headers enabled

---

_For full documentation, see: docs/SESSION-BASED-DASHBOARD.md_
