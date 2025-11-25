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

  const bizoforceUserId = 1028016;
  
  console.log(`\n🔍 Detailed Check for User ${bizoforceUserId}'s Products\n`);

  // Get full product details
  const [products] = await pool.execute(
    `SELECT 
      ID, 
      post_title, 
      post_name, 
      post_status, 
      post_date,
      post_modified,
      guid,
      post_excerpt
     FROM wp_posts 
     WHERE post_type = 'product' AND post_author = ?
     ORDER BY post_modified DESC`,
    [bizoforceUserId]
  );

  console.log(`✅ Found ${products.length} products\n`);

  for (const product of products) {
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📦 Product ID: ${product.ID}`);
    console.log(`   Title: ${product.post_title}`);
    console.log(`   Slug: ${product.post_name}`);
    console.log(`   Status: ${product.post_status}`);
    console.log(`   URL: ${product.guid}`);
    console.log(`   Created: ${product.post_date}`);
    console.log(`   Modified: ${product.post_modified}`);

    // Get product metadata
    const [meta] = await pool.execute(
      `SELECT meta_key, meta_value 
       FROM wp_postmeta 
       WHERE post_id = ? 
       AND meta_key IN ('_price', '_regular_price', '_sale_price', '_stock', '_stock_status', '_sku', 'total_sales', '_thumbnail_id')`,
      [product.ID]
    );

    console.log(`\n   💰 Pricing & Inventory:`);
    const metaObj = {};
    meta.forEach(m => metaObj[m.meta_key] = m.meta_value);
    
    console.log(`      - Price: $${metaObj._price || 'N/A'}`);
    console.log(`      - Regular Price: $${metaObj._regular_price || 'N/A'}`);
    if (metaObj._sale_price) {
      console.log(`      - Sale Price: $${metaObj._sale_price}`);
    }
    console.log(`      - Stock Status: ${metaObj._stock_status || 'N/A'}`);
    console.log(`      - Stock Quantity: ${metaObj._stock || 'N/A'}`);
    console.log(`      - SKU: ${metaObj._sku || 'N/A'}`);
    console.log(`      - Total Sales: ${metaObj.total_sales || '0'}`);

    // Get product image
    if (metaObj._thumbnail_id) {
      const [image] = await pool.execute(
        `SELECT guid FROM wp_posts WHERE ID = ?`,
        [metaObj._thumbnail_id]
      );
      if (image.length > 0) {
        console.log(`      - Image: ${image[0].guid}`);
      }
    }

    console.log('');
  }

  // Check vendor capabilities
  const [vendorMeta] = await pool.execute(
    `SELECT meta_key, meta_value 
     FROM wp_usermeta 
     WHERE user_id = ? AND (meta_key LIKE '%vendor%' OR meta_key LIKE '%wcv%')`,
    [bizoforceUserId]
  );

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🏪 Vendor Capabilities for User ${bizoforceUserId}:\n`);
  
  if (vendorMeta.length > 0) {
    vendorMeta.forEach(m => {
      console.log(`   - ${m.meta_key}: ${m.meta_value}`);
    });
  } else {
    console.log('   ⚠️  No WC Vendors metadata found');
  }

  await pool.end();
  console.log('\n✅ Complete!\n');
})();
