# Authentication API Testing Guide

## Prerequisites

1. **Database Setup**: Run the migration to create unified_users table
   ```sql
   mysql -h 72.167.148.100 -u bizoforce_newdashboard -p bizoforce_newdashboard < migrations/01-create-unified-db.sql
   ```

2. **Server Running**: Start the server
   ```bash
   npm run dev
   ```

3. **Testing Tool**: Use Postman, Thunder Client, or curl

## API Endpoints

### Base URL
```
http://localhost:3000/api/auth
```

---

## 1. Register New User

**Endpoint**: `POST /api/auth/register`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "individual",
  "phone": "+1234567890"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "individual",
    "phone": "+1234567890"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

## 2. Login with Email & Password

**Endpoint**: `POST /api/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "individual"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 3. Login with Google OAuth

**Endpoint**: `POST /api/auth/google`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "googleProfile": {
    "id": "1234567890",
    "email": "user@gmail.com",
    "given_name": "Jane",
    "family_name": "Smith"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "id": 2,
      "email": "user@gmail.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "userType": "individual"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 4. Get Current User Profile

**Endpoint**: `GET /api/auth/me`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "user_type": "individual",
    "phone": "+1234567890",
    "profile_photo": null,
    "is_active": 1,
    "email_verified": 0,
    "onboarding_complete": 0,
    "created_at": "2025-01-13T10:30:00.000Z"
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "message": "No token provided. Please login first."
}
```

---

## 5. Refresh Token

**Endpoint**: `POST /api/auth/refresh`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 6. Logout

**Endpoint**: `POST /api/auth/logout`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

> **Note**: Logout is handled client-side by removing the token. The server validates the request but doesn't blacklist tokens.

---

## Testing with curl

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "userType": "individual"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## Testing with PowerShell

### Register
```powershell
$body = @{
  email = "test@example.com"
  password = "password123"
  firstName = "Test"
  lastName = "User"
  userType = "individual"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Login
```powershell
$body = @{
  email = "test@example.com"
  password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

$token = $response.data.token
Write-Host "Token: $token"
```

### Get Profile
```powershell
$headers = @{
  Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" `
  -Method Get `
  -Headers $headers
```

---

## Common Errors

### 400 Bad Request - Validation Failed
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Solution**: Check that all required fields are provided with valid values.

### 401 Unauthorized - Invalid Token
```json
{
  "success": false,
  "message": "Invalid or expired token. Please login again."
}
```

**Solution**: Login again to get a new token.

### 403 Forbidden - Account Disabled
```json
{
  "success": false,
  "message": "Account is disabled"
}
```

**Solution**: Contact administrator to reactivate account.

---

## Next Steps

1. **Run Database Migration**: Create the unified_users table
2. **Test Registration**: Create a new user account
3. **Test Login**: Get JWT token
4. **Test Protected Route**: Access /api/auth/me with token
5. **Frontend Integration**: Connect login.html to API

---

## Environment Variables

Make sure these are set in `.env`:

```env
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=3000
```

---

## Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens expire after 7 days (configurable)
- Email validation and sanitization
- Rate limiting: 100 requests per 15 minutes
- CORS configured for localhost:5500

---

*Last Updated: January 13, 2025*
