import express, { type Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ConnectPgSimple from 'connect-pg-simple';
import { configureGoogleAuth } from './auth/google.js';
import { addUserToLocals } from './auth/middleware.js';
import { registerRoutes } from './routes/index.js';
import { screenlyPool, testConnections } from './db.js';
import { setupVite, serveStatic, log } from './vite.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3006;
const isProduction = process.env.NODE_ENV === 'production';

// ============================================================================
// SECURITY & MIDDLEWARE
// ============================================================================

// Trust proxy (required for HTTPS detection behind reverse proxy)
app.set('trust proxy', true);

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  crossOriginEmbedderPolicy: false,
}));

// Compression
app.use(compression());

// CORS Configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow Chrome extensions
    if (origin && origin.startsWith('chrome-extension://')) {
      console.log(`✅ [CORS] Allowing Chrome extension: ${origin}`);
      return callback(null, true);
    }
    
    const allowedOrigins = [
      'http://localhost:3006', // Vite dev server + backend same port
      'http://localhost:3000', // Legacy support
      'http://localhost:5173', // Legacy Vite port
      process.env.FRONTEND_URL,
      process.env.FRONTEND_PRODUCTION_URL,
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ [CORS] Blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting with proper trust proxy configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting if IP can't be determined
  skip: (req) => !req.ip,
  // Use forwarded IP from proxy if available
  keyGenerator: (req) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
  },
});

app.use('/api/', limiter);

// ============================================================================
// SESSION CONFIGURATION (using PostgreSQL from Screenly DB)
// ============================================================================

const PgSession = ConnectPgSimple(session);

app.use(
  session({
    store: new PgSession({
      pool: screenlyPool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // HTTPS only in production
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
    },
  })
);

// ============================================================================
// PASSPORT CONFIGURATION
// ============================================================================

app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth
configureGoogleAuth();

// Add user to locals for templates
app.use(addUserToLocals);

// ============================================================================
// STATIC FILES & UPLOADS
// ============================================================================

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Bizoforce Unified Dashboard API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Register all API routes
registerRoutes(app);

// ============================================================================
// VITE SETUP (Development) or Static Files (Production)
// ============================================================================

if (isProduction) {
  serveStatic(app);
} else {
  await setupVite(app);
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ [SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: isProduction ? 'Internal server error' : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
});

// ============================================================================
// SERVER START
// ============================================================================

const server = http.createServer(app);

async function startServer() {
  try {
    console.log('🔄 Testing database connections...');
    const dbStatus = await testConnections();
    
    const connectedDbs = Object.entries(dbStatus)
      .filter(([_, connected]) => connected)
      .map(([name]) => name);
    
    console.log(`✅ Connected to ${connectedDbs.length}/5 databases:`, connectedDbs.join(', '));
    
    if (connectedDbs.length === 0) {
      console.error('❌ No database connections available. Server starting anyway for API testing...');
    }
    
    server.listen(PORT, () => {
      log(`🚀 Server running on port ${PORT}`);
      log(`📊 Environment: ${process.env.NODE_ENV}`);
      log(`🔗 API: http://localhost:${PORT}/api`);
      if (!isProduction) {
        log(`🎨 Frontend: http://localhost:${PORT}`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
