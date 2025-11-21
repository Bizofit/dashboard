# Bizoforce Unified Dashboard - Backend API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env` file and add your database credentials for:
- Bizoforce (WordPress/WooCommerce)
- Giglancer
- Screenly
- Work.Bizoforce

### 3. Test Database Connections
```bash
npm test
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at: `http://localhost:3006`

## 📚 API Documentation

### Interactive Swagger UI
Access comprehensive API documentation at: `http://localhost:3006/api-docs`

Features:
- ✅ Interactive API testing
- ✅ Complete endpoint documentation
- ✅ Request/response examples
- ✅ Authentication with Bearer tokens
- ✅ ~70+ endpoints documented

**Quick Authentication:**
1. Login via `/api/auth/login` to get JWT token
2. Click "Authorize" button in Swagger UI
3. Enter: `Bearer <your_token>`
4. Test any endpoint directly from browser

### OpenAPI Spec
Download the OpenAPI 3.0 specification: `http://localhost:3006/api-docs.json`

📖 **[Full Documentation Guide](./docs/SWAGGER-DOCUMENTATION.md)**

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Work.Bizoforce (Project Management)
- **Users** (6 endpoints) - User management, earnings, assignments
- **Projects** (13 endpoints) - Full CRUD, members, tasks, time logs
- **Tasks** (10 endpoints) - Task management, comments, subtasks
- **Time Logs** (10 endpoints) - Timesheet tracking, approval workflow
- **Invoices** (9 endpoints) - Invoice generation, auto-billing
- **Clients** (9 endpoints) - Client management, projects, invoices
- **Teams** (7 endpoints) - Team organization, members
- **Reports** (5 endpoints) - Analytics, profitability, productivity

### Coming Soon
- `GET /api/products` - WooCommerce products
- `GET /api/jobs` - Jobs from Giglancer & Screenly
- `GET /api/candidates` - Candidates
- `GET /api/dashboard` - Dashboard statistics

## 🗄️ Database Setup

The system connects to 5 databases:
1. **Unified DB** (new) - Master user registry
2. **Bizoforce** - WordPress/WooCommerce (MySQL)
3. **Giglancer** - Job marketplace (MySQL)
4. **Screenly** - AI screening (PostgreSQL)
5. **Work.Bizoforce** - Projects/Timesheets (MySQL)

## 📝 NPM Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Test database connections

## 🔒 Security

- Helmet.js for security headers
- CORS configured for frontend domains
- Rate limiting (100 requests per 15 minutes)
- Environment variables for sensitive data

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL database driver
- **pg** - PostgreSQL database driver
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **helmet** - Security headers
- **cors** - Cross-origin requests
- **swagger-jsdoc** - OpenAPI/Swagger specification generator
- **swagger-ui-express** - Interactive API documentation UI
- **@woocommerce/woocommerce-rest-api** - WooCommerce integration

## 🧪 Testing

```bash
# Test database connections
npm test

# Test authentication endpoints
node test-auth-api.js

# Test Work API endpoints (requires running server)
node test-work-api.js
```

## 🛠️ Development

Built with Node.js v24+ and Express.js for the Bizoforce unified dashboard ecosystem.
