require('dotenv').config();
const mysql = require('mysql2/promise');

async function testGiglancer() {
  console.log('\n🔍 Testing Giglancer Connection...\n');
  console.log('Host:', process.env.GIGLANCER_DB_HOST);
  console.log('User:', process.env.GIGLANCER_DB_USER);
  console.log('Database:', process.env.GIGLANCER_DB_NAME);
  console.log('Port:', process.env.GIGLANCER_DB_PORT || 3306);
  console.log('');

  try {
    const connection = await mysql.createConnection({
      host: process.env.GIGLANCER_DB_HOST,
      port: process.env.GIGLANCER_DB_PORT || 3306,
      user: process.env.GIGLANCER_DB_USER,
      password: process.env.GIGLANCER_DB_PASS,
      database: process.env.GIGLANCER_DB_NAME,
      connectTimeout: 10000
    });

    console.log('✅ Connected to Giglancer database!');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as db, NOW() as time');
    console.log('✅ Query test successful');
    console.log('   Current Database:', rows[0].db);
    console.log('   Server Time:', rows[0].time);
    
    // Show tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`\n📊 Found ${tables.length} tables in database`);
    
    await connection.end();
    console.log('\n🎉 Giglancer connection test passed!\n');
    
  } catch (error) {
    console.error('❌ Failed to connect to Giglancer:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('');
  }
}

testGiglancer();
