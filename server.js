require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { testConnections } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Security headers
app.use(helmet());

// CORS - Allow frontend to access API
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_PRODUCTION_URL,
    'http://localhost:5173', // Vite dev server
    'http://localhost:5500',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5500'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting - Prevent abuse
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ============================================
// BODY PARSERS
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// SERVE STATIC FILES (Frontend)
// ============================================
const path = require('path');

// Serve React build folder
app.use(express.static(path.join(__dirname, 'client/dist')));

// ============================================
// REQUEST LOGGING (Development)
// ============================================
if (process.env.NODE_ENV === 'development' && process.env.ENABLE_REQUEST_LOGGING === 'true') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// ============================================
// API ROUTES (Will be added progressively)
// ============================================

// Import route modules
const authRoutes = require('./routes/auth-routes');

// API info route (moved from root to /api/info)
app.get('/api/info', (req, res) => {
  res.json({
    message: 'Bizoforce Unified Dashboard API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/health',
      auth: '/api/auth (register, login, google, me, logout, refresh)',
      products: '/api/products',
      jobs: '/api/jobs',
      candidates: '/api/candidates',
      projects: '/api/projects',
      timesheets: '/api/timesheets',
      dashboard: '/api/dashboard'
    },
    documentation: 'Coming soon...'
  });
});

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Products/Marketplace routes (placeholder)
app.get('/api/products', (req, res) => {
  res.json({ message: 'WooCommerce products - Coming soon' });
});

// Jobs routes (placeholder)
app.get('/api/jobs', (req, res) => {
  res.json({ message: 'Jobs from Giglancer & Screenly - Coming soon' });
});

// Candidates routes (placeholder)
app.get('/api/candidates', (req, res) => {
  res.json({ message: 'Candidates - Coming soon' });
});

// Projects routes (placeholder)
app.get('/api/projects', (req, res) => {
  res.json({ message: 'Projects from Work.Bizoforce - Coming soon' });
});

// Timesheets routes (placeholder)
app.get('/api/timesheets', (req, res) => {
  res.json({ message: 'Timesheets - Coming soon' });
});

// Dashboard routes (placeholder)
app.get('/api/dashboard', (req, res) => {
  res.json({ message: 'Dashboard statistics - Coming soon' });
});

// ============================================
// SERVE REACT APP (Must be AFTER all API routes)
// ============================================
// Serve React app for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
    // API route not found
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.path} not found`
    });
  } else {
    // Serve React app
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  }
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================
async function startServer() {
  try {
    console.log('\n🚀 Starting Bizoforce Unified Dashboard API...\n');
    
    // Test database connections
    const dbStatus = await testConnections();
    
    const connectedCount = Object.values(dbStatus).filter(Boolean).length;
    const totalCount = Object.keys(dbStatus).length;
    
    if (connectedCount === 0) {
      console.log('⚠️  Warning: No database connections available');
      console.log('   Please configure your .env file with database credentials\n');
    }
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
      console.log(`   Database Status: ${connectedCount}/${totalCount} connected`);
      console.log(`\n📚 API Documentation: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health\n`);
    });
    
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
