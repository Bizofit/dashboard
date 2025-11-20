# Logging System Documentation

## Overview
Comprehensive logging system for tracking backend API requests and frontend user actions across the Bizoforce ecosystem.

## Backend Logging (Node.js/Express)

### Technology
- **Winston**: Advanced logging library with multiple transports
- **Morgan**: HTTP request logging middleware

### Log Files Location
All logs are stored in `backend/logs/`:
- `combined.log` - All logs (info, warn, error)
- `error.log` - Error logs only
- `requests.log` - HTTP request logs only

### Log Levels
- `error` - Application errors, exceptions
- `warn` - Warning messages
- `info` - General information (default)
- `http` - HTTP requests (via Morgan)
- `debug` - Debug information (development only)

### Usage in Backend Code

```javascript
const logger = require('./config/logger');

// Log information
logger.info('User logged in', { userId: 123, email: 'user@example.com' });

// Log errors
logger.error('Database connection failed', { 
  error: error.message, 
  stack: error.stack 
});

// Log warnings
logger.warn('Rate limit approaching', { ip: '192.168.1.1', requests: 95 });

// Debug logs (only in development)
logger.debug('Processing data', { data: someData });
```

### Authentication Logging
Special helper for auth events:

```javascript
const { authLogger } = require('./middleware/logging-middleware');

// Log successful login
authLogger('login', userId, email, true, 'Successful login');

// Log failed login
authLogger('login', null, email, false, 'Invalid password');

// Log registration
authLogger('register', userId, email, true, 'New user registration');
```

### Action Logging Middleware
Track specific user actions:

```javascript
const { actionLogger } = require('./middleware/logging-middleware');

// Track job creation
router.post('/jobs', 
  authenticate, 
  actionLogger('create-job'), 
  createJobHandler
);

// Track invoice generation
router.post('/invoices', 
  authenticate, 
  actionLogger('generate-invoice'), 
  generateInvoiceHandler
);
```

## Frontend Logging (JavaScript)

### Setup
The logger is automatically initialized when `logger.js` is loaded:

```html
<!-- Add before other scripts -->
<script src="../assets/js/logger.js"></script>
<script src="../assets/js/dashboard.js"></script>
```

### Global Logger Instance
Available as `window.logger` throughout the application.

### Usage Examples

#### 1. Log General Information
```javascript
logger.info('Settings saved', { section: 'profile', changes: 5 });
```

#### 2. Log User Actions
```javascript
// Button clicks
logger.logButtonClick('Save Profile', { section: 'settings' });

// Form submissions
logger.logFormSubmit('Job Application', { jobId: 123, formValid: true });

// Modal interactions
logger.logModalOpen('Add Company');
logger.logModalClose('Add Company');

// Search actions
logger.logSearch('React Developer', { location: 'Remote', type: 'Full-time' });

// Filter changes
logger.logFilter('Status', 'Active');
```

#### 3. Log Navigation
```javascript
logger.logNavigation('dashboard', 'jobs');
```

#### 4. Log API Calls
```javascript
const startTime = Date.now();
try {
  const response = await fetch('/api/jobs');
  const duration = Date.now() - startTime;
  logger.logApiCall('GET', '/api/jobs', response.status, duration);
} catch (error) {
  logger.error('API call failed', { error: error.message });
}
```

#### 5. Log Errors
```javascript
try {
  // Some operation
} catch (error) {
  logger.error('Operation failed', {
    operation: 'createJob',
    error: error.message,
    stack: error.stack
  });
}
```

#### 6. Log Success Messages
```javascript
logger.success('Job posted successfully', { jobId: 123 });
```

#### 7. Log Warnings
```javascript
logger.warning('Unsaved changes', { formName: 'jobApplication' });
```

## Automatic Logging Features

### 1. Page Visits
Automatically tracked when page loads:
- URL, pathname, page title
- User info (if logged in)
- Browser info, screen size
- Referrer

### 2. JavaScript Errors
All uncaught errors are automatically logged:
```javascript
// Automatically captured
throw new Error('Something went wrong');
```

### 3. Unhandled Promise Rejections
```javascript
// Automatically captured
Promise.reject('Failed operation');
```

### 4. Page Unload
Logged when user leaves the page.

## Log Data Structure

### Backend Log Entry
```json
{
  "timestamp": "2025-11-19 14:30:45",
  "level": "info",
  "message": "User logged in",
  "service": "bizoforce-api",
  "userId": 123,
  "email": "user@example.com",
  "method": "POST",
  "url": "/api/auth/login",
  "ip": "192.168.1.1",
  "duration": "150ms"
}
```

### Frontend Log Entry
```json
{
  "timestamp": "2025-11-19T14:30:45.123Z",
  "level": "action",
  "message": "User action: Button click",
  "sessionId": "session_1732032645_abc123",
  "user": {
    "userId": 123,
    "email": "user@example.com",
    "userType": "company"
  },
  "page": {
    "url": "http://localhost:5500/company-admin/jobs.html",
    "pathname": "/company-admin/jobs.html",
    "page": "jobs",
    "title": "Jobs - Bizoforce"
  },
  "browser": {
    "userAgent": "Mozilla/5.0...",
    "language": "en-US",
    "screenSize": "1920x1080"
  },
  "action": "Button click",
  "buttonName": "Post Job"
}
```

## Viewing Logs

### Terminal Output (Backend)
When running `npm run dev`, logs appear in terminal with color coding:
- Blue: Info
- Green: Success
- Yellow: Warning
- Red: Error
- Purple: Actions

### Log Files (Backend)
View log files directly:
```powershell
# View latest 50 entries from combined log
Get-Content backend/logs/combined.log -Tail 50

# View error log
Get-Content backend/logs/error.log

# Watch logs in real-time
Get-Content backend/logs/combined.log -Wait
```

### Browser Console (Frontend)
Open DevTools Console to see colored frontend logs:
```
[INFO] Page visit { visitTime: '2025-11-19T14:30:45.123Z', loadTime: 45.2 }
[ACTION] User action: Button click { buttonName: 'Post Job' }
[ERROR] API call failed { error: 'Network error' }
```

## Best Practices

### 1. Log Important Events
✅ Do log:
- User authentication (login, logout, registration)
- CRUD operations (create, update, delete)
- API calls and responses
- Errors and exceptions
- Business-critical actions (job posts, invoices, payments)

❌ Don't log:
- Sensitive data (passwords, credit cards, API keys)
- Every single function call
- Excessive debug information in production

### 2. Include Context
```javascript
// Good - includes context
logger.info('Job created', {
  jobId: 123,
  companyId: 456,
  title: 'React Developer',
  postedBy: userId
});

// Bad - no context
logger.info('Job created');
```

### 3. Use Appropriate Log Levels
```javascript
logger.error()   // Errors that need immediate attention
logger.warning() // Warnings that should be reviewed
logger.info()    // Normal operations
logger.debug()   // Development/troubleshooting only
```

### 4. Log for Troubleshooting
When logging errors, include:
- Error message
- Stack trace
- User context (ID, email)
- Request details (URL, method, params)
- Any relevant data

```javascript
logger.error('Failed to create job', {
  error: error.message,
  stack: error.stack,
  userId: user.id,
  companyId: companyId,
  requestBody: req.body
});
```

## Configuration

### Backend Configuration
Edit `backend/config/logger.js`:
- Change log levels
- Add/remove transports
- Adjust file sizes and rotation
- Customize log format

### Frontend Configuration
Edit `assets/js/logger.js`:
```javascript
this.apiEndpoint = 'http://localhost:3000/api/logs'; // Backend endpoint
this.batchSize = 10;      // Logs per batch
this.flushInterval = 5000; // Flush every 5 seconds
```

### Environment Variables
Add to `backend/.env`:
```
LOG_LEVEL=info          # Minimum log level to record
NODE_ENV=development    # development|production
```

## Troubleshooting

### Logs Not Appearing
1. Check if `logs/` directory exists in backend
2. Verify winston and morgan are installed: `npm list winston morgan`
3. Check file permissions on `logs/` directory
4. Ensure logger is imported: `const logger = require('./config/logger')`

### Frontend Logs Not Sending
1. Check browser console for errors
2. Verify backend is running on correct port
3. Check CORS settings in `server.js`
4. Verify auth token is valid

### Too Many Logs
1. Increase log level: `LOG_LEVEL=warn` in `.env`
2. Reduce frontend batch frequency
3. Filter logs in production

## Security Notes

### Never Log:
- Passwords (hashed or plaintext)
- Credit card numbers
- API keys or secrets
- JWT tokens (full)
- Social security numbers
- Personal health information

### Safe to Log:
- User IDs
- Email addresses
- Usernames
- Request URLs (without sensitive query params)
- Response status codes
- Error messages (sanitized)

---

*Last Updated: November 19, 2025*
*Bizoforce Logging System v1.0*
