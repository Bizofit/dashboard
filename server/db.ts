import { drizzle } from 'drizzle-orm/mysql2';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import pg from 'pg';
import dotenv from 'dotenv';
import * as schema from '../shared/schema.js';

dotenv.config();

const { Pool: PgPool } = pg;

// ============================================================================
// UNIFIED DATABASE (MySQL) - Master user registry
// ============================================================================
export const unifiedPool = mysql.createPool({
  host: process.env.UNIFIED_DB_HOST,
  port: parseInt(process.env.UNIFIED_DB_PORT || '3306'),
  user: process.env.UNIFIED_DB_USER,
  password: process.env.UNIFIED_DB_PASS,
  database: process.env.UNIFIED_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 300000
});

export const unifiedDB = drizzle(unifiedPool, { schema, mode: 'default' });

// ============================================================================
// BIZOFORCE DATABASE (MySQL) - WordPress/WooCommerce platform
// ============================================================================
export const bizoforcePool = mysql.createPool({
  host: process.env.BIZOFORCE_DB_HOST,
  port: parseInt(process.env.BIZOFORCE_DB_PORT || '3306'),
  user: process.env.BIZOFORCE_DB_USER,
  password: process.env.BIZOFORCE_DB_PASS,
  database: process.env.BIZOFORCE_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 300000
});

export const bizoforceDB = drizzle(bizoforcePool, { mode: 'default' });

// ============================================================================
// GIGLANCER DATABASE (MySQL) - Job marketplace
// ============================================================================
export const giglancerPool = mysql.createPool({
  host: process.env.GIGLANCER_DB_HOST,
  port: parseInt(process.env.GIGLANCER_DB_PORT || '3306'),
  user: process.env.GIGLANCER_DB_USER,
  password: process.env.GIGLANCER_DB_PASS,
  database: process.env.GIGLANCER_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 300000
});

export const giglancerDB = drizzle(giglancerPool, { mode: 'default' });

// ============================================================================
// SCREENLY DATABASE (PostgreSQL) - AI screening platform
// ============================================================================
export const screenlyPool = new PgPool({
  host: process.env.SCREENLY_DB_HOST,
  port: parseInt(process.env.SCREENLY_DB_PORT || '5432'),
  user: process.env.SCREENLY_DB_USER,
  password: process.env.SCREENLY_DB_PASS,
  database: process.env.SCREENLY_DB_NAME,
  max: 10,
});

export const screenlyDB = drizzlePg(screenlyPool);

// ============================================================================
// WORK.BIZOFORCE DATABASE (MySQL) - Project/timesheet management
// ============================================================================
export const workPool = mysql.createPool({
  host: process.env.WORK_DB_HOST,
  port: parseInt(process.env.WORK_DB_PORT || '3306'),
  user: process.env.WORK_DB_USER,
  password: process.env.WORK_DB_PASS,
  database: process.env.WORK_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 300000
});

export const workDB = drizzle(workPool, { mode: 'default' });

// ============================================================================
// CONNECTION TESTING
// ============================================================================
export async function testConnections() {
  const results = {
    unified: false,
    bizoforce: false,
    giglancer: false,
    screenly: false,
    work: false,
  };

  try {
    await unifiedPool.query('SELECT 1');
    results.unified = true;
    console.log('✅ Unified DB connected');
  } catch (error) {
    console.error('❌ Unified DB failed:', error instanceof Error ? error.message : String(error));
  }

  try {
    await bizoforcePool.query('SELECT 1');
    results.bizoforce = true;
    console.log('✅ Bizoforce DB connected');
  } catch (error) {
    console.error('❌ Bizoforce DB failed:', error instanceof Error ? error.message : String(error));
  }

  try {
    await giglancerPool.query('SELECT 1');
    results.giglancer = true;
    console.log('✅ Giglancer DB connected');
  } catch (error) {
    console.error('❌ Giglancer DB failed:', error instanceof Error ? error.message : String(error));
  }

  try {
    const client = await screenlyPool.connect();
    await client.query('SELECT 1');
    client.release();
    results.screenly = true;
    console.log('✅ Screenly DB connected');
  } catch (error) {
    console.error('❌ Screenly DB failed:', error instanceof Error ? error.message : String(error));
  }

  try {
    await workPool.query('SELECT 1');
    results.work = true;
    console.log('✅ Work DB connected');
  } catch (error) {
    console.error('❌ Work DB failed:', error instanceof Error ? error.message : String(error));
  }

  return results;
}

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================
export async function closeConnections() {
  await unifiedPool.end();
  await bizoforcePool.end();
  await giglancerPool.end();
  await screenlyPool.end();
  await workPool.end();
  console.log('🔌 All database connections closed');
}

process.on('SIGINT', async () => {
  await closeConnections();
  process.exit(0);
});

/**
 * Retry wrapper for database operations with exponential backoff
 */
export async function retryDatabaseOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on certain types of errors
      if (lastError.message.includes('ER_ACCESS_DENIED') || 
          lastError.message.includes('ER_BAD_DB_ERROR') ||
          lastError.message.includes('ER_NO_SUCH_TABLE') ||
          lastError.message.includes('ER_TABLEACCESS_DENIED')) {
        throw lastError;
      }

      if (attempt === maxRetries) {
        console.error(`❌ Database operation failed after ${maxRetries} attempts:`, lastError.message);
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(`⚠️ Database operation failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Unknown database error');
}
