# Work.Bizoforce API Documentation

**Base URL**: `http://localhost:3006/api/work`
**Authentication**: Bearer Token (JWT)
**Version**: 1.0.0

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users API](#users-api)
3. [Projects API](#projects-api)
4. [Tasks API](#tasks-api)
5. [Time Logs API](#time-logs-api)
6. [Invoices API](#invoices-api)
7. [Clients API](#clients-api)
8. [Teams API](#teams-api)
9. [Reports & Earnings API](#reports--earnings-api)
10. [Error Handling](#error-handling)

---

## Authentication

All Work API endpoints require Bearer token authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

To obtain a token, use the authentication endpoints:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/google`

---

## Users API

### 1. Get All Users
**Endpoint**: `GET /api/work/users`
**Description**: Fetch all users with optional filtering
**Query Parameters**:
- `status` (string, optional): Filter by user status (active, inactive)
- `company_id` (integer, optional): Filter by company ID
- `search` (string, optional): Search by name or email
- `limit` (integer, optional): Limit results (default: 100)

**Example Request**:
```http
GET /api/work/users?status=active&company_id=1&limit=50
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "company_id": 1,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Single User
**Endpoint**: `GET /api/work/users/:id`
**Description**: Fetch user by ID

**Example Request**:
```http
GET /api/work/users/1
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active",
    "company_id": 1,
    "hourly_rate": 50.00,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Get User Projects
**Endpoint**: `GET /api/work/users/:id/projects`
**Description**: Fetch all projects assigned to user

**Example Request**:
```http
GET /api/work/users/1/projects
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 10,
      "project_name": "Website Redesign",
      "status": "in progress",
      "deadline": "2025-03-01",
      "role": "Developer"
    }
  ]
}
```

---

### 4. Get User Tasks
**Endpoint**: `GET /api/work/users/:id/tasks`
**Description**: Fetch all tasks assigned to user

**Example Request**:
```http
GET /api/work/users/1/tasks?status=incomplete
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 50,
      "heading": "Implement login page",
      "status": "incomplete",
      "project_id": 10,
      "due_date": "2025-01-20"
    }
  ]
}
```

---

### 5. Get User Time Logs
**Endpoint**: `GET /api/work/users/:id/timelogs`
**Description**: Fetch user's time logs
**Query Parameters**:
- `start_date` (date, optional): Filter from date (YYYY-MM-DD)
- `end_date` (date, optional): Filter to date (YYYY-MM-DD)

**Example Request**:
```http
GET /api/work/users/1/timelogs?start_date=2025-01-01&end_date=2025-01-31
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 45,
  "data": [
    {
      "id": 1001,
      "project_id": 10,
      "start_time": "2025-01-13T09:00:00Z",
      "end_time": "2025-01-13T17:00:00Z",
      "total_hours": 8.0,
      "approved": 1
    }
  ]
}
```

---

### 6. Get User Earnings
**Endpoint**: `GET /api/work/users/:id/earnings`
**Description**: Calculate user's total earnings from time logs
**Query Parameters**:
- `start_date` (date, optional): Calculate from date
- `end_date` (date, optional): Calculate to date

**Example Request**:
```http
GET /api/work/users/1/earnings?start_date=2025-01-01&end_date=2025-01-31
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "total_hours": 160.5,
    "hourly_rate": 50.00,
    "total_earnings": 8025.00,
    "period": {
      "start_date": "2025-01-01",
      "end_date": "2025-01-31"
    }
  }
}
```

---

## Projects API

### 1. Get All Projects
**Endpoint**: `GET /api/work/projects`
**Description**: Fetch all projects with optional filtering
**Query Parameters**:
- `status` (string, optional): Filter by status (in progress, finished, cancelled)
- `client_id` (integer, optional): Filter by client
- `search` (string, optional): Search by project name

**Example Request**:
```http
GET /api/work/projects?status=in progress
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": 10,
      "project_name": "Website Redesign",
      "start_date": "2024-12-01",
      "deadline": "2025-03-01",
      "status": "in progress",
      "client_id": 5,
      "task_count": 25,
      "member_count": 4,
      "total_hours": 120.5
    }
  ]
}
```

---

### 2. Get Single Project
**Endpoint**: `GET /api/work/projects/:id`
**Description**: Fetch project details by ID

**Example Request**:
```http
GET /api/work/projects/10
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 10,
    "project_name": "Website Redesign",
    "start_date": "2024-12-01",
    "deadline": "2025-03-01",
    "status": "in progress",
    "budget": 50000.00,
    "currency": "USD",
    "client_id": 5,
    "notes": "Complete redesign of company website"
  }
}
```

---

### 3. Get Project Members
**Endpoint**: `GET /api/work/projects/:id/members`
**Description**: Fetch all members assigned to project

**Example Request**:
```http
GET /api/work/projects/10/members
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Project Manager",
      "hourly_rate": 75.00
    }
  ]
}
```

---

### 4. Get Project Tasks
**Endpoint**: `GET /api/work/projects/:id/tasks`
**Description**: Fetch all tasks for project

**Example Request**:
```http
GET /api/work/projects/10/tasks
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": 50,
      "heading": "Implement login page",
      "status": "incomplete",
      "due_date": "2025-01-20",
      "assigned_to": 1,
      "priority": "high"
    }
  ]
}
```

---

### 5. Create Project
**Endpoint**: `POST /api/work/projects`
**Description**: Create new project
**Access**: Admin, Team Lead

**Request Body**:
```json
{
  "project_name": "New Website",
  "start_date": "2025-02-01",
  "deadline": "2025-05-01",
  "client_id": 5,
  "budget": 75000.00,
  "status": "not started",
  "notes": "Project description here"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 51,
    "project_name": "New Website",
    "created_at": "2025-01-13T18:00:00Z"
  }
}
```

---

### 6. Update Project
**Endpoint**: `PUT /api/work/projects/:id`
**Description**: Update project details
**Access**: Admin, Team Lead

**Request Body** (partial update supported):
```json
{
  "status": "in progress",
  "deadline": "2025-06-01"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": 10,
    "updated_at": "2025-01-13T18:00:00Z"
  }
}
```

---

### 7. Delete Project
**Endpoint**: `DELETE /api/work/projects/:id`
**Description**: Delete project (soft delete)
**Access**: Admin

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": {
    "id": 10,
    "deleted": true
  }
}
```

---

## Tasks API

### 1. Get All Tasks
**Endpoint**: `GET /api/work/tasks`
**Description**: Fetch all tasks with filtering
**Query Parameters**:
- `project_id` (integer, optional): Filter by project
- `user_id` (integer, optional): Filter by assigned user
- `status` (string, optional): Filter by status (complete, incomplete)

**Example Request**:
```http
GET /api/work/tasks?project_id=10&status=incomplete
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 50,
      "heading": "Implement login page",
      "project_id": 10,
      "status": "incomplete",
      "due_date": "2025-01-20",
      "assigned_to": 1,
      "priority": "high"
    }
  ]
}
```

---

### 2. Create Task
**Endpoint**: `POST /api/work/tasks`
**Description**: Create new task
**Access**: Team Lead, Project Manager

**Request Body**:
```json
{
  "project_id": 10,
  "heading": "Design homepage mockup",
  "description": "Create responsive homepage design",
  "due_date": "2025-01-25",
  "assigned_to": 3,
  "priority": "high",
  "status": "incomplete"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 51,
    "heading": "Design homepage mockup",
    "created_at": "2025-01-13T18:00:00Z"
  }
}
```

---

### 3. Update Task Status
**Endpoint**: `PUT /api/work/tasks/:id/status`
**Description**: Change task status

**Request Body**:
```json
{
  "status": "complete"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Task status updated successfully",
  "data": {
    "id": 50,
    "status": "complete",
    "completed_at": "2025-01-13T18:00:00Z"
  }
}
```

---

## Time Logs API

### 1. Get All Time Logs
**Endpoint**: `GET /api/work/timelogs`
**Description**: Fetch time logs with filtering
**Query Parameters**:
- `user_id` (integer, optional): Filter by user
- `project_id` (integer, optional): Filter by project
- `approved` (boolean, optional): Filter by approval status (0, 1)
- `start_date` (date, optional): Filter from date
- `end_date` (date, optional): Filter to date

**Example Request**:
```http
GET /api/work/timelogs?project_id=10&approved=1
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "id": 1001,
      "user_id": 1,
      "project_id": 10,
      "start_time": "2025-01-13T09:00:00Z",
      "end_time": "2025-01-13T17:00:00Z",
      "total_hours": 8.0,
      "approved": 1,
      "memo": "Frontend development"
    }
  ]
}
```

---

### 2. Create Time Log (Clock In)
**Endpoint**: `POST /api/work/timelogs`
**Description**: Start time tracking

**Request Body**:
```json
{
  "project_id": 10,
  "task_id": 50,
  "start_time": "2025-01-13T09:00:00Z",
  "memo": "Working on login feature"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Time log created successfully",
  "data": {
    "id": 1002,
    "start_time": "2025-01-13T09:00:00Z"
  }
}
```

---

### 3. Update Time Log (Clock Out)
**Endpoint**: `PUT /api/work/timelogs/:id`
**Description**: End time tracking

**Request Body**:
```json
{
  "end_time": "2025-01-13T17:30:00Z"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Time log updated successfully",
  "data": {
    "id": 1002,
    "end_time": "2025-01-13T17:30:00Z",
    "total_hours": 8.5
  }
}
```

---

### 4. Approve Time Log
**Endpoint**: `PUT /api/work/timelogs/:id/approve`
**Description**: Approve timesheet for billing
**Access**: Admin, Team Lead

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Time log approved successfully",
  "data": {
    "id": 1002,
    "approved": 1,
    "approved_at": "2025-01-13T18:00:00Z"
  }
}
```

---

### 5. Get Pending Time Logs
**Endpoint**: `GET /api/work/timelogs/pending-approval`
**Description**: Fetch all pending timesheets for approval
**Access**: Admin, Team Lead

**Response** (200 OK):
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1003,
      "user_id": 2,
      "user_name": "Jane Smith",
      "project_name": "Website Redesign",
      "total_hours": 8.0,
      "start_time": "2025-01-12T09:00:00Z",
      "end_time": "2025-01-12T17:00:00Z",
      "approved": 0
    }
  ]
}
```

---

## Invoices API

### 1. Get All Invoices
**Endpoint**: `GET /api/work/invoices`
**Description**: Fetch invoices with filtering
**Query Parameters**:
- `client_id` (integer, optional): Filter by client
- `project_id` (integer, optional): Filter by project
- `status` (string, optional): Filter by status (paid, unpaid, partial)

**Example Request**:
```http
GET /api/work/invoices?status=unpaid
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "invoice_number": "INV-2025-001",
      "client_id": 5,
      "project_id": 10,
      "total": 5000.00,
      "status": "unpaid",
      "issue_date": "2025-01-10",
      "due_date": "2025-02-10"
    }
  ]
}
```

---

### 2. Generate Invoice from Time Logs
**Endpoint**: `POST /api/work/invoices/generate-from-timelogs`
**Description**: Auto-generate invoice from approved time logs
**Access**: Finance, Admin

**Request Body**:
```json
{
  "project_id": 10,
  "client_id": 5,
  "start_date": "2025-01-01",
  "end_date": "2025-01-31",
  "due_date": "2025-02-28",
  "tax_rate": 10
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Invoice generated from time logs successfully",
  "data": {
    "id": 2,
    "invoice_number": "INV-2025-002",
    "total_hours": 160.5,
    "subtotal": 8025.00,
    "tax": 802.50,
    "total": 8827.50,
    "time_logs_count": 45
  }
}
```

---

### 3. Update Invoice Status
**Endpoint**: `PUT /api/work/invoices/:id/status`
**Description**: Update payment status
**Access**: Finance, Admin

**Request Body**:
```json
{
  "status": "paid"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Invoice status updated successfully",
  "data": {
    "id": 1,
    "status": "paid",
    "paid_at": "2025-01-13T18:00:00Z"
  }
}
```

---

## Clients API

### 1. Get All Clients
**Endpoint**: `GET /api/work/clients`
**Description**: Fetch all clients
**Query Parameters**:
- `search` (string, optional): Search by company name

**Example Request**:
```http
GET /api/work/clients?search=Acme
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": 5,
      "company_name": "Acme Corporation",
      "name": "John Smith",
      "email": "john@acme.com",
      "website": "https://acme.com",
      "project_count": 3,
      "invoice_count": 8
    }
  ]
}
```

---

### 2. Get Client Projects
**Endpoint**: `GET /api/work/clients/:id/projects`
**Description**: Fetch all projects for client

**Response** (200 OK):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 10,
      "project_name": "Website Redesign",
      "status": "in progress",
      "total_hours": 120.5,
      "budget": 50000.00
    }
  ]
}
```

---

### 3. Get Client Invoices
**Endpoint**: `GET /api/work/clients/:id/invoices`
**Description**: Fetch all invoices for client

**Response** (200 OK):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "invoice_number": "INV-2025-001",
      "project_name": "Website Redesign",
      "total": 5000.00,
      "status": "paid",
      "issue_date": "2025-01-10"
    }
  ]
}
```

---

## Teams API

### 1. Get All Teams
**Endpoint**: `GET /api/work/teams`
**Description**: Fetch all teams

**Response** (200 OK):
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "team_name": "Development Team",
      "member_count": 8,
      "project_count": 4
    }
  ]
}
```

---

### 2. Get Team Members
**Endpoint**: `GET /api/work/teams/:id/members`
**Description**: Fetch all team members

**Response** (200 OK):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Developer"
    }
  ]
}
```

---

## Reports & Earnings API

### 1. Get User Earnings
**Endpoint**: `GET /api/work/earnings/user/:userId`
**Description**: Calculate user earnings summary
**Query Parameters**:
- `start_date` (date, optional): Calculate from date
- `end_date` (date, optional): Calculate to date

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "total_hours": 160.5,
    "hourly_rate": 50.00,
    "total_earnings": 8025.00,
    "approved_hours": 160.5,
    "pending_hours": 0
  }
}
```

---

### 2. Get Timesheet Report
**Endpoint**: `GET /api/work/reports/timesheet`
**Description**: Generate detailed timesheet report
**Query Parameters**:
- `user_id` (integer, optional): Filter by user
- `project_id` (integer, optional): Filter by project
- `start_date` (date, optional): Report start date
- `end_date` (date, optional): Report end date

**Response** (200 OK):
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "user_name": "John Doe",
      "project_name": "Website Redesign",
      "date": "2025-01-13",
      "hours": 8.0,
      "approved": 1,
      "earnings": 400.00
    }
  ]
}
```

---

### 3. Get Project Profitability Report
**Endpoint**: `GET /api/work/reports/project-profitability`
**Description**: Calculate profit margins for all projects
**Access**: Admin, Finance

**Response** (200 OK):
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "project_id": 10,
      "project_name": "Website Redesign",
      "budget": 50000.00,
      "total_cost": 35000.00,
      "total_paid": 40000.00,
      "profit": 5000.00,
      "profit_margin": 12.5,
      "status": "profitable"
    }
  ]
}
```

---

### 4. Get User Productivity Stats
**Endpoint**: `GET /api/work/reports/user-productivity`
**Description**: Calculate productivity metrics per user
**Query Parameters**:
- `user_id` (integer, optional): Filter by user
- `start_date` (date, optional): Stats start date
- `end_date` (date, optional): Stats end date

**Response** (200 OK):
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "user_id": 1,
      "user_name": "John Doe",
      "projects_worked": 3,
      "tasks_completed": 25,
      "total_hours": 160.5,
      "earnings": 8025.00,
      "avg_hours_per_day": 8.0
    }
  ]
}
```

---

## Error Handling

All API endpoints follow consistent error response format:

**Error Response Structure**:
```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common HTTP Status Codes**:
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Example Error Responses**:

1. **Authentication Error** (401):
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

2. **Not Found Error** (404):
```json
{
  "success": false,
  "message": "Project not found"
}
```

3. **Validation Error** (400):
```json
{
  "success": false,
  "message": "Project name is required"
}
```

---

## Testing

Use the provided test suite to verify all endpoints:

```bash
# Start server
npm run dev

# Run tests (in new terminal)
node test-work-api.js
```

The test suite will:
1. Authenticate and obtain JWT token
2. Test all ~70 Work API endpoints
3. Display results with color-coded output
4. Provide test coverage summary

---

## Rate Limiting

All API endpoints are rate-limited to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 per IP address
- **Response** (429 Too Many Requests):
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Notes

- All date/time values are in **ISO 8601 format** (YYYY-MM-DDTHH:mm:ssZ)
- All monetary values are in **decimal format** with 2 decimal places
- All IDs are **integers**
- Query parameters are **case-insensitive**
- **Soft deletes** are used (records marked as deleted, not removed)
- **Audit logging** is implemented for all create/update/delete operations

---

**Last Updated**: January 13, 2025
**Version**: 1.0.0
**Maintained by**: Bizoforce Development Team
