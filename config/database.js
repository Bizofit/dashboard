/**
 * Database Configuration - 5 Database Connections
 * - Unified DB (MySQL) - Master database
 * - Bizoforce (MySQL) - WordPress/WooCommerce
 * - Giglancer (MySQL) - Job marketplace
 * - Screenly (PostgreSQL) - AI screening platform
 * - Work.Bizoforce (MySQL) - Project/timesheet management
 */

const mysql = require('mysql2/promise');
const { Pool } = require('pg');

// ============================================
// UNIFIED DATABASE (Master - New Dashboard)
// ============================================
const unifiedDB = mysql.createPool({
  host: process.env.UNIFIED_DB_HOST,
  port: process.env.UNIFIED_DB_PORT || 3306,
  user: process.env.UNIFIED_DB_USER,
  password: process.env.UNIFIED_DB_PASS,
  database: process.env.UNIFIED_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// ============================================
// BIZOFORCE DATABASE (WordPress/WooCommerce)
// ============================================
const bizoforceDB = mysql.createPool({
  host: process.env.BIZOFORCE_DB_HOST,
  port: process.env.BIZOFORCE_DB_PORT || 3306,
  user: process.env.BIZOFORCE_DB_USER,
  password: process.env.BIZOFORCE_DB_PASS,
  database: process.env.BIZOFORCE_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// ============================================
// GIGLANCER DATABASE (Job Marketplace)
// ============================================
const giglancerDB = mysql.createPool({
  host: process.env.GIGLANCER_DB_HOST,
  port: process.env.GIGLANCER_DB_PORT || 3306,
  user: process.env.GIGLANCER_DB_USER,
  password: process.env.GIGLANCER_DB_PASS,
  database: process.env.GIGLANCER_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// ============================================
// SCREENLY DATABASE (PostgreSQL - AI Screening)
// ============================================
const screenlyDB = new Pool({
  host: process.env.SCREENLY_DB_HOST,
  port: process.env.SCREENLY_DB_PORT || 5432,
  user: process.env.SCREENLY_DB_USER,
  password: process.env.SCREENLY_DB_PASS,
  database: process.env.SCREENLY_DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ============================================
// WORK.BIZOFORCE DATABASE (Projects/Timesheets)
// ============================================
const workDB = mysql.createPool({
  host: process.env.WORK_DB_HOST,
  port: process.env.WORK_DB_PORT || 3306,
  user: process.env.WORK_DB_USER,
  password: process.env.WORK_DB_PASS,
  database: process.env.WORK_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// ============================================
// TEST ALL CONNECTIONS
// ============================================
async function testConnections() {
  const results = {
    unified: false,
    bizoforce: false,
    giglancer: false,
    screenly: false,
    work: false
  };
  
  try {
    // Test Unified DB
    const [unifiedRows] = await unifiedDB.query('SELECT 1 as test');
    results.unified = unifiedRows[0].test === 1;
    console.log('✅ Unified DB connected');
  } catch (error) {
    console.error('❌ Unified DB connection failed:', error.message);
  }
  
  try {
    // Test Bizoforce DB
    const [bizoforceRows] = await bizoforceDB.query('SELECT 1 as test');
    results.bizoforce = bizoforceRows[0].test === 1;
    console.log('✅ Bizoforce DB connected');
  } catch (error) {
    console.error('❌ Bizoforce DB connection failed:', error.message);
  }
  
  try {
    // Test Giglancer DB
    const [giglancerRows] = await giglancerDB.query('SELECT 1 as test');
    results.giglancer = giglancerRows[0].test === 1;
    console.log('✅ Giglancer DB connected');
  } catch (error) {
    console.error('❌ Giglancer DB connection failed:', error.message);
  }
  
  try {
    // Test Screenly DB (PostgreSQL)
    const screenlyResult = await screenlyDB.query('SELECT 1 as test');
    results.screenly = screenlyResult.rows[0].test === 1;
    console.log('✅ Screenly DB connected');
  } catch (error) {
    console.error('❌ Screenly DB connection failed:', error.message);
  }
  
  try {
    // Test Work DB
    const [workRows] = await workDB.query('SELECT 1 as test');
    results.work = workRows[0].test === 1;
    console.log('✅ Work.Bizoforce DB connected');
  } catch (error) {
    console.error('❌ Work.Bizoforce DB connection failed:', error.message);
  }
  
  // Check if all connections succeeded
  const allConnected = Object.values(results).every(v => v === true);
  if (!allConnected) {
    throw new Error('Some database connections failed. Check credentials in .env');
  }
  
  return results;
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================
async function closeConnections() {
  console.log('🔌 Closing database connections...');
  await unifiedDB.end();
  await bizoforceDB.end();
  await giglancerDB.end();
  await screenlyDB.end();
  await workDB.end();
  console.log('✅ All database connections closed');
}

process.on('SIGINT', async () => {
  await closeConnections();
  process.exit(0);
});

// ============================================
// EXPORTS
// ============================================
module.exports = {
  unifiedDB,
  bizoforceDB,
  giglancerDB,
  screenlyDB,
  workDB,
  testConnections,
  closeConnections
};
