import type { Express } from 'express';
import authRoutes from './auth.js';
import googleAuthRoutes from './google-auth.js';
import userRoutes from './users.js';

export function registerRoutes(app: Express) {
  // Authentication routes
  app.use('/api/auth', authRoutes);
  app.use('/api/auth', googleAuthRoutes);
  
  // User management routes
  app.use('/api/users', userRoutes);
  
  console.log('✅ All API routes registered');
}
