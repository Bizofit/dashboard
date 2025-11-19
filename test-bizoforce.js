require('dotenv').config();
const mysql = require('mysql2/promise');

async function testBizoforce() {
  console.log('\n🔍 Testing Bizoforce (WordPress/WooCommerce) Connection...\n');
  console.log('Host:', process.env.BIZOFORCE_DB_HOST);
  console.log('User:', process.env.BIZOFORCE_DB_USER);
  console.log('Database:', process.env.BIZOFORCE_DB_NAME);
  console.log('Port:', process.env.BIZOFORCE_DB_PORT || 3306);
  console.log('');

  try {
    const connection = await mysql.createConnection({
      host: process.env.BIZOFORCE_DB_HOST,
      port: process.env.BIZOFORCE_DB_PORT || 3306,
      user: process.env.BIZOFORCE_DB_USER,
      password: process.env.BIZOFORCE_DB_PASS,
      database: process.env.BIZOFORCE_DB_NAME,
      connectTimeout: 10000
    });

    console.log('✅ Connected to Bizoforce database!');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as db, NOW() as time');
    console.log('✅ Query test successful');
    console.log('   Current Database:', rows[0].db);
    console.log('   Server Time:', rows[0].time);
    
    // Show WordPress tables
    const [tables] = await connection.query("SHOW TABLES LIKE 'wp_%'");
    console.log(`\n📊 Found ${tables.length} WordPress tables`);
    
    // Check WooCommerce
    const [wcTables] = await connection.query("SHOW TABLES LIKE '%woocommerce%'");
    console.log(`🛒 Found ${wcTables.length} WooCommerce tables`);
    
    await connection.end();
    console.log('\n🎉 Bizoforce connection test passed!\n');
    
  } catch (error) {
    console.error('❌ Failed to connect to Bizoforce:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('');
  }
}

testBizoforce();
