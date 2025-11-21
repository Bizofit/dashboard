# Swagger API Documentation Guide

## Overview

The Bizoforce Unified Dashboard API now includes comprehensive Swagger/OpenAPI 3.0 documentation for all endpoints. This interactive documentation allows you to:

- **Explore** all available API endpoints
- **Test** endpoints directly from the browser
- **View** request/response schemas
- **Authenticate** with Bearer tokens
- **Download** OpenAPI specification

---

## Accessing Swagger UI

### Development Server
```
http://localhost:3006/api-docs
```

### Production Server
```
https://api.bizoforce.com/api-docs
```

---

## Quick Start

### 1. Start the Server
```bash
npm run dev
```

### 2. Open Swagger UI
Navigate to: `http://localhost:3006/api-docs`

### 3. Authenticate
1. Click the **"Authorize"** button (top right)
2. Obtain a JWT token by:
   - Using the `/api/auth/login` endpoint
   - Or `/api/auth/register` endpoint
3. Enter token in format: `Bearer <your_token>`
4. Click **"Authorize"**
5. All subsequent requests will include the token

### 4. Test Endpoints
1. Expand any endpoint section
2. Click **"Try it out"**
3. Fill in parameters (if required)
4. Click **"Execute"**
5. View response below

---

## API Documentation Structure

### Tags (Categories)

1. **Authentication** - Register, login, Google OAuth, profile management
2. **Users** - User management, earnings, projects, tasks
3. **Projects** - Project CRUD, members, tasks, time logs, files
4. **Tasks** - Task management, comments, subtasks, history
5. **Time Logs** - Timesheet tracking, approval workflow
6. **Invoices** - Invoice generation, auto-billing from time logs
7. **Clients** - Client management, projects, invoices
8. **Teams** - Team organization, members, projects
9. **Reports** - Analytics, profitability, productivity reports

---

## Key Features

### 🔐 Security Schemes
- **Bearer Authentication**: JWT tokens with 7-day expiration
- All protected endpoints marked with 🔒 lock icon

### 📝 Request/Response Examples
- Complete request body schemas
- Example values for all fields
- Detailed response structures
- Error response formats

### 🎨 Interactive Testing
- Try any endpoint directly from the UI
- No need for Postman or curl
- Real-time response viewing
- HTTP status codes displayed

### 📊 Data Models
- Complete schema definitions for:
  - User
  - Project
  - Task
  - TimeLog
  - Invoice
  - Client
  - Team

### ⚠️ Error Handling
- Standard error responses documented
- HTTP status code explanations:
  - `401 Unauthorized`: Missing/invalid token
  - `404 Not Found`: Resource not found
  - `400 Bad Request`: Validation error
  - `500 Internal Server Error`: Server error

---

## Documented Endpoints

### Authentication (5 endpoints)
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Users (6 endpoints)
- `GET /api/work/users` - List all users (filtered)
- `GET /api/work/users/{id}` - Get user details
- `GET /api/work/users/{id}/projects` - User's projects
- `GET /api/work/users/{id}/tasks` - User's tasks
- `GET /api/work/users/{id}/timelogs` - User's time logs
- `GET /api/work/users/{id}/earnings` - Calculate earnings

### Projects (13 endpoints)
- `GET /api/work/projects` - List all projects
- `POST /api/work/projects` - Create project
- `GET /api/work/projects/{id}` - Get project details
- `PUT /api/work/projects/{id}` - Update project
- `DELETE /api/work/projects/{id}` - Delete project
- `GET /api/work/projects/{id}/members` - Project members
- `GET /api/work/projects/{id}/tasks` - Project tasks
- `GET /api/work/projects/{id}/timelogs` - Project time logs
- `GET /api/work/projects/{id}/milestones` - Project milestones
- `GET /api/work/projects/{id}/files` - Project files
- `GET /api/work/projects/{id}/notes` - Project notes
- `GET /api/work/projects/{id}/activity` - Project activity log

### Tasks (10 endpoints)
- `GET /api/work/tasks` - List all tasks
- `POST /api/work/tasks` - Create task
- `GET /api/work/tasks/{id}` - Get task details
- `PUT /api/work/tasks/{id}` - Update task
- `PUT /api/work/tasks/{id}/status` - Change task status
- `DELETE /api/work/tasks/{id}` - Delete task
- `GET /api/work/tasks/{id}/comments` - Task comments
- `GET /api/work/tasks/{id}/subtasks` - Task subtasks
- `GET /api/work/tasks/{id}/files` - Task files
- `GET /api/work/tasks/{id}/history` - Task history

### Time Logs (10 endpoints)
- `GET /api/work/timelogs` - List all time logs
- `POST /api/work/timelogs` - Clock in (start tracking)
- `GET /api/work/timelogs/{id}` - Get time log details
- `PUT /api/work/timelogs/{id}` - Clock out (end tracking)
- `PUT /api/work/timelogs/{id}/approve` - Approve timesheet
- `PUT /api/work/timelogs/{id}/reject` - Reject timesheet
- `DELETE /api/work/timelogs/{id}` - Delete time log
- `GET /api/work/timelogs/project/{projectId}` - Project time logs
- `GET /api/work/timelogs/user/{userId}` - User time logs
- `GET /api/work/timelogs/pending-approval` - Pending approvals

### Invoices (9 endpoints)
- `GET /api/work/invoices` - List all invoices
- `POST /api/work/invoices` - Create invoice
- `POST /api/work/invoices/generate-from-timelogs` - Auto-generate from hours
- `GET /api/work/invoices/{id}` - Get invoice details
- `PUT /api/work/invoices/{id}` - Update invoice
- `PUT /api/work/invoices/{id}/status` - Update payment status
- `DELETE /api/work/invoices/{id}` - Delete invoice
- `GET /api/work/invoices/client/{clientId}` - Client invoices
- `GET /api/work/invoices/project/{projectId}` - Project invoices

### Clients (9 endpoints)
- `GET /api/work/clients` - List all clients
- `POST /api/work/clients` - Create client
- `GET /api/work/clients/{id}` - Get client details
- `PUT /api/work/clients/{id}` - Update client
- `DELETE /api/work/clients/{id}` - Delete client
- `GET /api/work/clients/{id}/projects` - Client projects
- `GET /api/work/clients/{id}/invoices` - Client invoices
- `GET /api/work/clients/{id}/contacts` - Client contacts
- `GET /api/work/clients/{id}/documents` - Client documents

### Teams (7 endpoints)
- `GET /api/work/teams` - List all teams
- `POST /api/work/teams` - Create team
- `GET /api/work/teams/{id}` - Get team details
- `PUT /api/work/teams/{id}` - Update team
- `DELETE /api/work/teams/{id}` - Delete team
- `GET /api/work/teams/{id}/members` - Team members
- `GET /api/work/teams/{id}/projects` - Team projects

### Reports (5 endpoints)
- `GET /api/work/earnings/user/{userId}` - User earnings summary
- `GET /api/work/earnings/project/{projectId}` - Project earnings
- `GET /api/work/reports/timesheet` - Detailed timesheet report
- `GET /api/work/reports/project-profitability` - Profit margins
- `GET /api/work/reports/user-productivity` - Productivity stats

**Total: ~70+ endpoints fully documented**

---

## Advanced Features

### Filter & Search Parameters

Many endpoints support query parameters for filtering:

```javascript
// Users endpoint with filters
GET /api/work/users?status=active&company_id=1&search=john&limit=50

// Time logs with date range
GET /api/work/timelogs?user_id=5&start_date=2025-01-01&end_date=2025-01-31&approved=1

// Projects by status
GET /api/work/projects?status=in progress&client_id=10
```

### Pagination
Use `limit` parameter where available:
```javascript
GET /api/work/users?limit=25
```

### Date Formats
All dates use **ISO 8601 format**:
- Date: `YYYY-MM-DD` (e.g., `2025-01-13`)
- DateTime: `YYYY-MM-DDTHH:mm:ssZ` (e.g., `2025-01-13T09:00:00Z`)

---

## Export OpenAPI Specification

### JSON Format
```
http://localhost:3006/api-docs.json
```

### Download
Right-click the link above → Save As → `openapi-spec.json`

### Use With Tools
- **Postman**: Import OpenAPI spec
- **Insomnia**: Import OpenAPI spec
- **Code Generators**: Generate client SDKs
- **API Testing**: Automated testing tools

---

## Example Workflow

### 1. Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "secure123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "individual"
}
```

**Response**: JWT token in `data.token`

### 2. Authenticate in Swagger
1. Copy the token from response
2. Click "Authorize" button
3. Enter: `Bearer <token>`
4. Click "Authorize"

### 3. Get User Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### 4. Create Project
```http
POST /api/work/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "project_name": "New Website",
  "start_date": "2025-02-01",
  "deadline": "2025-05-01",
  "client_id": 5,
  "budget": 50000,
  "status": "not started"
}
```

### 5. Create Task
```http
POST /api/work/tasks
Authorization: Bearer <token>

{
  "project_id": 10,
  "heading": "Design homepage",
  "due_date": "2025-02-15",
  "assigned_to": 1,
  "priority": "high"
}
```

### 6. Clock In (Start Time Tracking)
```http
POST /api/work/timelogs

{
  "project_id": 10,
  "task_id": 50,
  "start_time": "2025-01-13T09:00:00Z",
  "memo": "Working on homepage design"
}
```

### 7. Clock Out (End Time Tracking)
```http
PUT /api/work/timelogs/{id}

{
  "end_time": "2025-01-13T17:00:00Z"
}
```

### 8. Approve Timesheet
```http
PUT /api/work/timelogs/{id}/approve
```

### 9. Generate Invoice from Approved Hours
```http
POST /api/work/invoices/generate-from-timelogs

{
  "project_id": 10,
  "client_id": 5,
  "start_date": "2025-01-01",
  "end_date": "2025-01-31",
  "due_date": "2025-02-28",
  "tax_rate": 10
}
```

---

## Rate Limiting

All endpoints are rate-limited:
- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Response Code**: 429 Too Many Requests

---

## CORS Configuration

API accepts requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3006` (API server)
- `https://api.bizoforce.com` (Production)

---

## Support & Feedback

- **API Issues**: Contact support@bizoforce.com
- **Documentation Updates**: Submit PR to `/config/swagger.js`
- **Feature Requests**: Open issue on GitHub

---

## Best Practices

### 1. Always Authenticate
- Obtain token via login/register
- Include in all protected requests
- Token expires after 7 days

### 2. Handle Errors Gracefully
```javascript
{
  "success": false,
  "message": "Error description"
}
```

### 3. Check Response Structure
```javascript
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### 4. Use Filters
- Reduce payload size
- Improve performance
- Get relevant data only

### 5. Respect Rate Limits
- Cache responses when possible
- Use pagination
- Avoid excessive requests

---

## Troubleshooting

### Token Not Working
1. Check format: `Bearer <token>` (with space)
2. Verify token not expired (7-day limit)
3. Re-login to get fresh token

### Swagger UI Not Loading
1. Check server is running: `npm run dev`
2. Clear browser cache
3. Try incognito mode
4. Check console for errors

### Endpoint Returns 404
1. Verify endpoint path is correct
2. Check HTTP method (GET/POST/PUT/DELETE)
3. Ensure server routes are registered

### Authorization Failed
1. Click "Authorize" button
2. Enter token in correct format
3. Ensure token is valid
4. Check user permissions

---

**Version**: 1.0.0
**Last Updated**: November 21, 2025
**OpenAPI Version**: 3.0.0
**Maintained By**: Bizoforce Development Team
