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

## 📡 API Endpoints

- `GET /` - API documentation
- `GET /health` - Health check
- `GET /api/auth` - Authentication (coming soon)
- `GET /api/products` - WooCommerce products (coming soon)
- `GET /api/jobs` - Jobs from Giglancer & Screenly (coming soon)
- `GET /api/candidates` - Candidates (coming soon)
- `GET /api/projects` - Projects from Work (coming soon)
- `GET /api/timesheets` - Timesheets (coming soon)
- `GET /api/dashboard` - Dashboard stats (coming soon)

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
- **@woocommerce/woocommerce-rest-api** - WooCommerce integration

## 🛠️ Development

Built with Node.js v24+ and Express.js for the Bizoforce unified dashboard ecosystem.
