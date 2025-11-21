require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { testConnections } = require('./config/database');
const logger = require('./config/logger');
const { requestLogger, errorLogger } = require('./middleware/logging-middleware');

const app = express();
const PORT = process.env.PORT || 3006;

// ============================================
// LOGGING SETUP
// ============================================

// HTTP request logging with Morgan
app.use(morgan('combined', { stream: logger.stream }));

// Custom request/response logger
app.use(requestLogger);

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Security headers
app.use(helmet({
  contentSecurityPolicy:{
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3006"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow Swagger UI inline scripts
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow Swagger UI inline styles
      imgSrc: ["'self'", "data:", "https:"], // Allow Swagger UI images
    },
  }
}));

// CORS - Allow frontend to access API
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_PRODUCTION_URL,
    'http://localhost:5173', // Vite dev server
    'http://localhost:5500',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5500',
    'http://localhost:3006' // Allow API access from production dashboard
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
// SESSION & PASSPORT SETUP
// ============================================
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

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
const logsRoutes = require('./routes/logs-routes');
const workRoutes = require('./routes/work-routes');
const workRoutesPart2 = require('./routes/work-routes-part2');

// ============================================
// SWAGGER API DOCUMENTATION
// ============================================

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API server is running and responsive
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                 environment:
 *                   type: string
 *                   example: development
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */

// Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Bizoforce API Documentation',
  customfavIcon: '/favicon.ico'
}));

// Swagger JSON spec endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API info route (moved from root to /api/info)
app.get('/api/info', (req, res) => {
  res.json({
    message: 'Bizoforce Unified Dashboard API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/health',
      auth: '/api/auth (register, login, google, me, logout, refresh)',
      work: '/api/work (users, projects, tasks, timelogs, invoices, clients, teams, reports)',
      products: '/api/products',
      jobs: '/api/jobs',
      candidates: '/api/candidates',
      dashboard: '/api/dashboard'
    },
    documentation: '/api-docs (Swagger UI)',
    openapi_spec: '/api-docs.json'
  });
});

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount logs routes
app.use('/api', logsRoutes);

// Mount Work.Bizoforce routes (Projects, Tasks, Timesheets, Invoices, etc.)
app.use('/api/work', workRoutes);
app.use('/api/work', workRoutesPart2);

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

// Error logging middleware
app.use(errorLogger);

// Error response handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

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
    logger.info('🚀 Starting Bizoforce Unified Dashboard API...');

    // Test database connections
    const dbStatus = await testConnections();

    const connectedCount = Object.values(dbStatus).filter(Boolean).length;
    const totalCount = Object.keys(dbStatus).length;

    if (connectedCount === 0) {
      logger.warn('No database connections available - Please configure .env file');
    }

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`✅ Server running on http://localhost:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`Database Status: ${connectedCount}/${totalCount} connected`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
    });

  } catch (err) {
    logger.error('Failed to start server', { error: err.message, stack: err.stack });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('⚠️  SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('⚠️  SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
