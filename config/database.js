require('dotenv').config();
const mysql = require('mysql2/promise');
const { Pool } = require('pg');

/**
 * Database Connection Pools
 * Manages connections to all 5 databases (Unified + 4 platforms)
 */

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// ============================================
// UNIFIED DATABASE (MySQL) - Master Database
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
// BIZOFORCE (MySQL) - WordPress/WooCommerce
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
// GIGLANCER (MySQL) - Job Marketplace
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
// SCREENLY (PostgreSQL) - AI Screening
// ============================================
const screenlyDB = new Pool({
  host: process.env.SCREENLY_DB_HOST,
  port: process.env.SCREENLY_DB_PORT || 5432,
  user: process.env.SCREENLY_DB_USER,
  password: process.env.SCREENLY_DB_PASS,
  database: process.env.SCREENLY_DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased from 2000ms to 10000ms (10 seconds)
  query_timeout: 10000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
});

// ============================================
// WORK.BIZOFORCE (MySQL) - Projects/Timesheets
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

/**
 * Test all database connections
 * @returns {Promise<Object>} Connection status for each database
 */
async function testConnections() {
  const results = {
    unified: false,
    bizoforce: false,
    giglancer: false,
    screenly: false,
    work: false
  };

  console.log('\n' + colors.blue + '🔍 Testing Database Connections...' + colors.reset + '\n');

  // Test Unified DB
  try {
    const conn = await unifiedDB.getConnection();
    await conn.ping();
    conn.release();
    results.unified = true;
    console.log(colors.green + '✅ Unified Database (MySQL): Connected' + colors.reset);
  } catch (err) {
    console.error(colors.red + '❌ Unified Database (MySQL): Failed' + colors.reset);
    console.error(colors.red + '   Error: ' + err.message + colors.reset);
  }

  // Test Bizoforce DB
  try {
    const conn = await bizoforceDB.getConnection();
    await conn.ping();
    conn.release();
    results.bizoforce = true;
    console.log(colors.green + '✅ Bizoforce (WooCommerce): Connected' + colors.reset);
  } catch (err) {
    console.error(colors.red + '❌ Bizoforce (WooCommerce): Failed' + colors.reset);
    console.error(colors.red + '   Error: ' + err.message + colors.reset);
  }

  // Test Giglancer DB
  try {
    const conn = await giglancerDB.getConnection();
    await conn.ping();
    conn.release();
    results.giglancer = true;
    console.log(colors.green + '✅ Giglancer (Jobs): Connected' + colors.reset);
  } catch (err) {
    console.error(colors.red + '❌ Giglancer (Jobs): Failed' + colors.reset);
    console.error(colors.red + '   Error: ' + err.message + colors.reset);
  }

  // Test Screenly DB
  try {
    await screenlyDB.query('SELECT 1');
    results.screenly = true;
    console.log(colors.green + '✅ Screenly (AI Screening): Connected' + colors.reset);
  } catch (err) {
    console.error(colors.red + '❌ Screenly (AI Screening): Failed' + colors.reset);
    console.error(colors.red + '   Error: ' + err.message + colors.reset);
  }

  // Test Work DB
  try {
    const conn = await workDB.getConnection();
    await conn.ping();
    conn.release();
    results.work = true;
    console.log(colors.green + '✅ Work.Bizoforce (Projects): Connected' + colors.reset);
  } catch (err) {
    console.error(colors.red + '❌ Work.Bizoforce (Projects): Failed' + colors.reset);
    console.error(colors.red + '   Error: ' + err.message + colors.reset);
  }

  console.log('');
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;

  if (successCount === totalCount) {
    console.log(colors.green + `🎉 All ${totalCount} databases connected successfully!` + colors.reset + '\n');
  } else {
    console.log(colors.yellow + `⚠️  ${successCount}/${totalCount} databases connected` + colors.reset + '\n');
  }

  return results;
}

/**
 * Close all database connections gracefully
 */
async function closeConnections() {
  console.log(colors.yellow + '\n🔌 Closing database connections...' + colors.reset);
  
  try {
    await unifiedDB.end();
    await bizoforceDB.end();
    await giglancerDB.end();
    await screenlyDB.end();
    await workDB.end();
    console.log(colors.green + '✅ All connections closed' + colors.reset + '\n');
  } catch (err) {
    console.error(colors.red + '❌ Error closing connections: ' + err.message + colors.reset);
  }
}

module.exports = {
  unifiedDB,
  bizoforceDB,
  giglancerDB,
  screenlyDB,
  workDB,
  testConnections,
  closeConnections
};
