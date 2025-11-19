require('dotenv').config();
const { Pool } = require('pg');

async function testScreenly() {
  console.log('\n🔍 Testing Screenly (AI Screening) Connection...\n');
  console.log('Host:', process.env.SCREENLY_DB_HOST);
  console.log('User:', process.env.SCREENLY_DB_USER);
  console.log('Database:', process.env.SCREENLY_DB_NAME);
  console.log('Port:', process.env.SCREENLY_DB_PORT || 5432);
  console.log('');

  try {
    const pool = new Pool({
      host: process.env.SCREENLY_DB_HOST,
      port: process.env.SCREENLY_DB_PORT || 5432,
      user: process.env.SCREENLY_DB_USER,
      password: process.env.SCREENLY_DB_PASS,
      database: process.env.SCREENLY_DB_NAME,
      connectionTimeoutMillis: 10000
    });

    // Test connection
    const client = await pool.connect();
    console.log('✅ Connected to Screenly database!');
    
    // Test query
    const res = await client.query('SELECT current_database() as db, NOW() as time');
    console.log('✅ Query test successful');
    console.log('   Current Database:', res.rows[0].db);
    console.log('   Server Time:', res.rows[0].time);
    
    // Show tables
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    console.log(`\n📊 Found ${tables.rows.length} tables in database`);
    
    // Check for screening-related tables
    const screeningTables = await client.query(`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public' 
      AND (tablename LIKE '%screening%' OR tablename LIKE '%candidate%' OR tablename LIKE '%interview%')
      ORDER BY tablename
    `);
    console.log(`🎯 Found ${screeningTables.rows.length} screening-related tables`);
    if (screeningTables.rows.length > 0) {
      console.log('   Tables:', screeningTables.rows.map(r => r.tablename).join(', '));
    }
    
    client.release();
    await pool.end();
    console.log('\n🎉 Screenly connection test passed!\n');
    
  } catch (error) {
    console.error('❌ Failed to connect to Screenly:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('');
  }
}

testScreenly();
