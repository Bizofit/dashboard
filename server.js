/**
 * Bizoforce Unified Dashboard - Main Server
 * Consolidates 5 databases into unified authentication & data API
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { testConnections } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3006;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Security headers
app.use(helmet());

// CORS - Allow frontend access
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.FRONTEND_PRODUCTION_URL || 'https://dashboard.bizoforce.com',
    'http://localhost:5500'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting - 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ============================================
// BODY PARSERS & LOGGING
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Morgan - HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth-routes'));
app.use('/api/google-auth', require('./routes/google-auth-routes'));
// app.use('/api/users', require('./routes/user-routes'));
// app.use('/api/companies', require('./routes/company-routes'));
// app.use('/api/jobs', require('./routes/job-routes'));
// app.use('/api/products', require('./routes/product-routes'));
// app.use('/api/projects', require('./routes/project-routes'));
// app.use('/api/timesheets', require('./routes/timesheet-routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// SERVER STARTUP
// ============================================

async function startServer() {
  try {
    console.log('🚀 Starting Bizoforce Unified Dashboard API...');
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    
    // Test all database connections
    console.log('🔌 Testing database connections...');
    await testConnections();
    console.log('✅ All databases connected successfully!');
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`✨ Server running on port ${PORT}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}`);
      console.log(`📊 Health Check: http://localhost:${PORT}/health`);
      console.log('\n🔥 Ready to accept requests!\n');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
