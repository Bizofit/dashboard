require('dotenv').config();
const { 
  unifiedDb, 
  bizoforceDb, 
  giglancerDb, 
  screenlyDb, 
  workDb 
} = require('../config/database');

/**
 * Analyze User Tables Across All Platforms
 * This script explores user-related tables and their structures
 */

async function analyzeUserTables() {
  console.log('\n🔍 Analyzing User Tables Across All Platforms...\n');

  // ============================================
  // 1. BIZOFORCE (WordPress/WooCommerce)
  // ============================================
  console.log('📊 1. BIZOFORCE (WordPress/WooCommerce)');
  console.log('━'.repeat(60));

  try {
    // Get wp_users structure
    const [userColumns] = await bizoforceDb.query(`
      DESCRIBE wp_users
    `);
    console.log('\n📋 wp_users columns:');
    userColumns.forEach(col => {
      console.log(`   ${col.Field} (${col.Type}) ${col.Key ? `[${col.Key}]` : ''}`);
    });

    // Count users
    const [userCount] = await bizoforceDb.query('SELECT COUNT(*) as count FROM wp_users');
    console.log(`\n👥 Total users: ${userCount[0].count}`);

    // Sample user data
    const [sampleUsers] = await bizoforceDb.query('SELECT * FROM wp_users LIMIT 3');
    console.log('\n📝 Sample users:');
    sampleUsers.forEach((user, idx) => {
      console.log(`\n   User ${idx + 1}:`);
      console.log(`   - ID: ${user.ID}`);
      console.log(`   - Email: ${user.user_email}`);
      console.log(`   - Login: ${user.user_login}`);
      console.log(`   - Display Name: ${user.display_name}`);
      console.log(`   - Registered: ${user.user_registered}`);
    });

    // Check for usermeta table
    const [usermetaColumns] = await bizoforceDb.query(`
      DESCRIBE wp_usermeta
    `);
    console.log('\n📋 wp_usermeta columns:');
    usermetaColumns.forEach(col => {
      console.log(`   ${col.Field} (${col.Type})`);
    });

    // Get common meta keys
    const [metaKeys] = await bizoforceDb.query(`
      SELECT meta_key, COUNT(*) as count 
      FROM wp_usermeta 
      GROUP BY meta_key 
      ORDER BY count DESC 
      LIMIT 20
    `);
    console.log('\n🔑 Common meta keys:');
    metaKeys.forEach(mk => {
      console.log(`   ${mk.meta_key}: ${mk.count} entries`);
    });

  } catch (error) {
    console.error('❌ Bizoforce error:', error.message);
  }

  // ============================================
  // 2. GIGLANCER (Jobs Platform)
  // ============================================
  console.log('\n\n📊 2. GIGLANCER (Jobs Platform)');
  console.log('━'.repeat(60));

  try {
    // Find user-related tables
    const [tables] = await giglancerDb.query(`
      SHOW TABLES LIKE '%user%'
    `);
    console.log('\n📋 User-related tables:');
    tables.forEach(table => {
      console.log(`   ${Object.values(table)[0]}`);
    });

    // Check main users table (try common names)
    const userTableNames = ['users', 'tbl_users', 'user', 'members'];
    let userTableFound = null;

    for (const tableName of userTableNames) {
      try {
        const [check] = await giglancerDb.query(`SHOW TABLES LIKE '${tableName}'`);
        if (check.length > 0) {
          userTableFound = tableName;
          break;
        }
      } catch (e) {
        // Table doesn't exist, continue
      }
    }

    if (userTableFound) {
      console.log(`\n✅ Found main user table: ${userTableFound}`);
      
      const [columns] = await giglancerDb.query(`DESCRIBE ${userTableFound}`);
      console.log('\n📋 Columns:');
      columns.forEach(col => {
        console.log(`   ${col.Field} (${col.Type}) ${col.Key ? `[${col.Key}]` : ''}`);
      });

      const [count] = await giglancerDb.query(`SELECT COUNT(*) as count FROM ${userTableFound}`);
      console.log(`\n👥 Total users: ${count[0].count}`);

      const [sample] = await giglancerDb.query(`SELECT * FROM ${userTableFound} LIMIT 3`);
      console.log('\n📝 Sample users:');
      sample.forEach((user, idx) => {
        console.log(`\n   User ${idx + 1}:`, JSON.stringify(user, null, 2));
      });
    } else {
      console.log('\n⚠️  Could not find main user table. Listing all tables:');
      const [allTables] = await giglancerDb.query('SHOW TABLES');
      allTables.slice(0, 20).forEach(table => {
        console.log(`   ${Object.values(table)[0]}`);
      });
    }

  } catch (error) {
    console.error('❌ Giglancer error:', error.message);
  }

  // ============================================
  // 3. SCREENLY (AI Screening - PostgreSQL)
  // ============================================
  console.log('\n\n📊 3. SCREENLY (AI Screening)');
  console.log('━'.repeat(60));

  try {
    // Find user tables
    const tablesResult = await screenlyDb.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%user%'
      ORDER BY table_name
    `);
    
    console.log('\n📋 User-related tables:');
    tablesResult.rows.forEach(row => {
      console.log(`   ${row.table_name}`);
    });

    // Try to find main users table
    const possibleTables = ['users', 'user', 'candidates', 'applicants'];
    let foundTable = null;

    for (const tableName of possibleTables) {
      try {
        const check = await screenlyDb.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_name = $1
        `, [tableName]);
        
        if (check.rows.length > 0) {
          foundTable = tableName;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (foundTable) {
      console.log(`\n✅ Found table: ${foundTable}`);
      
      const columnsResult = await screenlyDb.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [foundTable]);
      
      console.log('\n📋 Columns:');
      columnsResult.rows.forEach(col => {
        console.log(`   ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? '[NOT NULL]' : ''}`);
      });

      const countResult = await screenlyDb.query(`SELECT COUNT(*) as count FROM ${foundTable}`);
      console.log(`\n👥 Total records: ${countResult.rows[0].count}`);

      const sampleResult = await screenlyDb.query(`SELECT * FROM ${foundTable} LIMIT 3`);
      console.log('\n📝 Sample records:');
      sampleResult.rows.forEach((record, idx) => {
        console.log(`\n   Record ${idx + 1}:`, JSON.stringify(record, null, 2));
      });
    } else {
      console.log('\n⚠️  Listing first 20 tables:');
      const allTables = await screenlyDb.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
        LIMIT 20
      `);
      allTables.rows.forEach(row => {
        console.log(`   ${row.table_name}`);
      });
    }

  } catch (error) {
    console.error('❌ Screenly error:', error.message);
  }

  // ============================================
  // 4. WORK.BIZOFORCE (Projects/Timesheets)
  // ============================================
  console.log('\n\n📊 4. WORK.BIZOFORCE (Projects/Timesheets)');
  console.log('━'.repeat(60));

  try {
    const [tables] = await workDb.query(`SHOW TABLES LIKE '%user%'`);
    console.log('\n📋 User-related tables:');
    tables.forEach(table => {
      console.log(`   ${Object.values(table)[0]}`);
    });

    // Try common table names
    const possibleTables = ['users', 'tbl_users', 'employees', 'team_members'];
    let foundTable = null;

    for (const tableName of possibleTables) {
      try {
        const [check] = await workDb.query(`SHOW TABLES LIKE '${tableName}'`);
        if (check.length > 0) {
          foundTable = tableName;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (foundTable) {
      console.log(`\n✅ Found table: ${foundTable}`);
      
      const [columns] = await workDb.query(`DESCRIBE ${foundTable}`);
      console.log('\n📋 Columns:');
      columns.forEach(col => {
        console.log(`   ${col.Field} (${col.Type}) ${col.Key ? `[${col.Key}]` : ''}`);
      });

      const [count] = await workDb.query(`SELECT COUNT(*) as count FROM ${foundTable}`);
      console.log(`\n👥 Total records: ${count[0].count}`);

      const [sample] = await workDb.query(`SELECT * FROM ${foundTable} LIMIT 3`);
      console.log('\n📝 Sample records:');
      sample.forEach((record, idx) => {
        console.log(`\n   Record ${idx + 1}:`, JSON.stringify(record, null, 2));
      });
    } else {
      console.log('\n⚠️  Listing first 30 tables:');
      const [allTables] = await workDb.query('SHOW TABLES LIMIT 30');
      allTables.forEach(table => {
        console.log(`   ${Object.values(table)[0]}`);
      });
    }

  } catch (error) {
    console.error('❌ Work.Bizoforce error:', error.message);
  }

  console.log('\n\n✅ Analysis Complete!\n');
}

// Run analysis
analyzeUserTables()
  .then(() => {
    console.log('📊 Analysis saved. Review output to design migration strategy.\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
