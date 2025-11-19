require('dotenv').config();
const mysql = require('mysql2/promise');

async function testWork() {
  console.log('\n🔍 Testing Work.Bizoforce (Projects/Timesheets) Connection...\n');
  console.log('Host:', process.env.WORK_DB_HOST);
  console.log('User:', process.env.WORK_DB_USER);
  console.log('Database:', process.env.WORK_DB_NAME);
  console.log('Port:', process.env.WORK_DB_PORT || 3306);
  console.log('');

  try {
    const connection = await mysql.createConnection({
      host: process.env.WORK_DB_HOST,
      port: process.env.WORK_DB_PORT || 3306,
      user: process.env.WORK_DB_USER,
      password: process.env.WORK_DB_PASS,
      database: process.env.WORK_DB_NAME,
      connectTimeout: 10000
    });

    console.log('✅ Connected to Work.Bizoforce database!');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as db, NOW() as time');
    console.log('✅ Query test successful');
    console.log('   Current Database:', rows[0].db);
    console.log('   Server Time:', rows[0].time);
    
    // Show tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`\n📊 Found ${tables.length} tables in database`);
    
    // Check for projects/timesheets tables
    const [projectTables] = await connection.query("SHOW TABLES LIKE '%project%'");
    console.log(`📁 Found ${projectTables.length} project-related tables`);
    
    const [timesheetTables] = await connection.query("SHOW TABLES LIKE '%timesheet%'");
    console.log(`⏰ Found ${timesheetTables.length} timesheet-related tables`);
    
    await connection.end();
    console.log('\n🎉 Work.Bizoforce connection test passed!\n');
    
  } catch (error) {
    console.error('❌ Failed to connect to Work.Bizoforce:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('');
  }
}

testWork();
