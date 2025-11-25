import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const pool = mysql.createPool({
    host: process.env.BIZOFORCE_DB_HOST,
    user: process.env.BIZOFORCE_DB_USER,
    password: process.env.BIZOFORCE_DB_PASS,
    database: process.env.BIZOFORCE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  console.log('🔍 Checking WooCommerce Products in Bizoforce Database...\n');

  // Check different product post types
  const [productTypes] = await pool.execute(
    `SELECT post_type, COUNT(*) as count 
     FROM wp_posts 
     WHERE post_type LIKE '%product%' 
     GROUP BY post_type`
  );
  
  console.log('📦 Product Post Types Found:');
  productTypes.forEach(row => {
    console.log(`   - ${row.post_type}: ${row.count} items`);
  });

  // Check your user's products specifically
  const bizoforceUserId = 1028016; // Your user ID
  const [userProducts] = await pool.execute(
    `SELECT post_type, post_status, COUNT(*) as count 
     FROM wp_posts 
     WHERE post_type = 'product' AND post_author = ?
     GROUP BY post_type, post_status`,
    [bizoforceUserId]
  );

  console.log(`\n👤 Your Products (User ID: ${bizoforceUserId}):`);
  if (userProducts.length === 0) {
    console.log('   ⚠️  No products found for your user ID');
  } else {
    userProducts.forEach(row => {
      console.log(`   - Status '${row.post_status}': ${row.count} products`);
    });
  }

  // Check total products
  const [totalProducts] = await pool.execute(
    `SELECT COUNT(*) as total FROM wp_posts WHERE post_type = 'product'`
  );
  console.log(`\n📊 Total Products in Database: ${totalProducts[0].total}`);

  // Check WC Vendors specific tables
  const [vendorTables] = await pool.execute(
    `SHOW TABLES LIKE '%vendor%'`
  );
  
  console.log('\n🏪 WC Vendors Tables:');
  if (vendorTables.length === 0) {
    console.log('   ⚠️  No vendor-specific tables found');
  } else {
    vendorTables.forEach(row => {
      console.log(`   - ${Object.values(row)[0]}`);
    });
  }

  // Check for vendor meta
  const [vendorMeta] = await pool.execute(
    `SELECT meta_key, COUNT(*) as count 
     FROM wp_usermeta 
     WHERE user_id = ? AND meta_key LIKE '%vendor%'
     GROUP BY meta_key`,
    [bizoforceUserId]
  );

  console.log(`\n🔑 Vendor Metadata for User ${bizoforceUserId}:`);
  if (vendorMeta.length === 0) {
    console.log('   ℹ️  No vendor metadata found');
  } else {
    vendorMeta.forEach(row => {
      console.log(`   - ${row.meta_key}: ${row.count} entries`);
    });
  }

  // Check WC Vendors plugin status
  const [wcVendors] = await pool.execute(
    `SELECT option_value FROM wp_options WHERE option_name = 'wcvendors_version' LIMIT 1`
  );

  if (wcVendors.length > 0) {
    console.log(`\n✅ WC Vendors Plugin Version: ${wcVendors[0].option_value}`);
  } else {
    console.log('\n⚠️  WC Vendors plugin data not found in wp_options');
  }

  // Sample products
  const [sampleProducts] = await pool.execute(
    `SELECT ID, post_title, post_type, post_status, post_author, post_date 
     FROM wp_posts 
     WHERE post_type = 'product' 
     ORDER BY post_date DESC 
     LIMIT 5`
  );

  console.log('\n📋 Sample Products (Most Recent 5):');
  sampleProducts.forEach(p => {
    console.log(`   - ID: ${p.ID}, Title: '${p.post_title.substring(0, 50)}', Author: ${p.post_author}, Status: ${p.post_status}`);
  });

  await pool.end();
  console.log('\n✅ Database check complete!');
})();
