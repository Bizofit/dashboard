require('dotenv').config();
const { 
  unifiedDB, 
  bizoforceDB, 
  giglancerDB, 
  screenlyDB, 
  workDB 
} = require('../config/database');

async function analyzeSchemas() {
  console.log('\n🔍 ANALYZING DATABASE SCHEMAS FOR USER MIGRATION\n');
  console.log('='.repeat(80));

  try {
    // ============================================
    // 1. BIZOFORCE (WordPress/WooCommerce)
    // ============================================
    console.log('\n📊 1. BIZOFORCE DATABASE (WordPress/WooCommerce)');
    console.log('-'.repeat(80));

    // Get wp_users structure
    const [wpUsersSchema] = await bizoforceDB.query(`
      DESCRIBE wp_users
    `);
    console.log('\n✅ wp_users table structure:');
    wpUsersSchema.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type}) ${col.Key ? '[' + col.Key + ']' : ''}`);
    });

    // Check user roles/meta
    const [wpUserMetaSchema] = await bizoforceDB.query(`
      DESCRIBE wp_usermeta
    `);
    console.log('\n✅ wp_usermeta table structure:');
    wpUserMetaSchema.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type})`);
    });

    // Check for capabilities (roles stored here)
    const [wpUserRoles] = await bizoforceDB.query(`
      SELECT DISTINCT meta_key, COUNT(*) as count
      FROM wp_usermeta 
      WHERE meta_key LIKE '%capabilities%' OR meta_key LIKE '%role%'
      GROUP BY meta_key
    `);
    console.log('\n✅ User role/capability keys found:');
    wpUserRoles.forEach(row => {
      console.log(`   - ${row.meta_key}: ${row.count} users`);
    });

    // Sample role data
    const [sampleRoles] = await bizoforceDB.query(`
      SELECT user_id, meta_key, meta_value
      FROM wp_usermeta 
      WHERE meta_key = 'wp_capabilities'
      LIMIT 5
    `);
    console.log('\n✅ Sample role data:');
    sampleRoles.forEach(row => {
      console.log(`   User ${row.user_id}: ${row.meta_value}`);
    });

    // Check WooCommerce vendor tables
    const [vendorTables] = await bizoforceDB.query(`
      SHOW TABLES LIKE '%vendor%'
    `);
    console.log('\n✅ Vendor-related tables:');
    vendorTables.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`   - ${tableName}`);
    });

    // Check for companies/organizations
    const [companyTables] = await bizoforceDB.query(`
      SHOW TABLES LIKE '%company%'
    `);
    console.log('\n✅ Company-related tables:');
    if (companyTables.length > 0) {
      companyTables.forEach(row => {
        const tableName = Object.values(row)[0];
        console.log(`   - ${tableName}`);
      });
    } else {
      console.log('   (No dedicated company tables - likely stored in posts or custom tables)');
    }

    // ============================================
    // 2. GIGLANCER (Jobs Platform)
    // ============================================
    console.log('\n\n📊 2. GIGLANCER DATABASE (Jobs Platform)');
    console.log('-'.repeat(80));

    // Get users table structure
    const [giglancerUsersSchema] = await giglancerDB.query(`
      DESCRIBE users
    `);
    console.log('\n✅ users table structure:');
    giglancerUsersSchema.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type}) ${col.Key ? '[' + col.Key + ']' : ''}`);
    });

    // Check for user types/roles
    const [giglancerUserTypes] = await giglancerDB.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_KEY
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${process.env.GIGLANCER_DB_NAME}'
      AND TABLE_NAME = 'users'
      AND (COLUMN_NAME LIKE '%type%' OR COLUMN_NAME LIKE '%role%' OR COLUMN_NAME LIKE '%status%')
    `);
    console.log('\n✅ User type/role columns:');
    giglancerUserTypes.forEach(col => {
      console.log(`   - ${col.COLUMN_NAME} (${col.COLUMN_TYPE})`);
    });

    // Sample user data to see actual values
    const [giglancerSampleUsers] = await giglancerDB.query(`
      SELECT * FROM users LIMIT 3
    `);
    console.log('\n✅ Sample user data:');
    if (giglancerSampleUsers.length > 0) {
      console.log('   Columns:', Object.keys(giglancerSampleUsers[0]).join(', '));
      giglancerSampleUsers.forEach((user, idx) => {
        console.log(`   User ${idx + 1}:`, JSON.stringify(user, null, 2).substring(0, 200) + '...');
      });
    }

    // Check for related tables
    const [giglancerTables] = await giglancerDB.query(`
      SHOW TABLES
    `);
    console.log('\n✅ All Giglancer tables (looking for user-related):');
    const userRelatedTables = [];
    giglancerTables.forEach(row => {
      const tableName = Object.values(row)[0];
      if (tableName.includes('user') || tableName.includes('client') || 
          tableName.includes('freelancer') || tableName.includes('employer') ||
          tableName.includes('seeker') || tableName.includes('profile')) {
        userRelatedTables.push(tableName);
        console.log(`   - ${tableName}`);
      }
    });

    // ============================================
    // 3. SCREENLY (AI Screening)
    // ============================================
    console.log('\n\n📊 3. SCREENLY DATABASE (AI Screening)');
    console.log('-'.repeat(80));

    // Get users table structure (PostgreSQL)
    const screenlyUsersSchema = await screenlyDB.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = '${process.env.SCREENLY_DB_NAME}'
      AND table_name = 'users'
      ORDER BY ordinal_position
    `);
    console.log('\n✅ users table structure:');
    screenlyUsersSchema.rows.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? '[NOT NULL]' : ''}`);
    });

    // Sample user data (PostgreSQL)
    const screenlySampleUsers = await screenlyDB.query(`
      SELECT * FROM users LIMIT 3
    `);
    console.log('\n✅ Sample user data:');
    if (screenlySampleUsers.rows.length > 0) {
      console.log('   Columns:', Object.keys(screenlySampleUsers.rows[0]).join(', '));
      screenlySampleUsers.rows.forEach((user, idx) => {
        console.log(`   User ${idx + 1}:`, JSON.stringify(user, null, 2).substring(0, 300) + '...');
      });
    }

    // Check for user-related tables (PostgreSQL)
    const screenlyTables = await screenlyDB.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = '${process.env.SCREENLY_DB_NAME}'
      AND (table_name LIKE '%user%' OR table_name LIKE '%candidate%' OR table_name LIKE '%profile%' OR table_name LIKE '%application%' OR table_name LIKE '%interview%')
      ORDER BY table_name
    `);
    console.log('\n✅ User-related tables:');
    screenlyTables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    // Check for role/type columns
    const screenlyUserTypes = await screenlyDB.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = '${process.env.SCREENLY_DB_NAME}'
      AND table_name = 'users'
      AND (column_name LIKE '%type%' OR column_name LIKE '%role%' OR column_name LIKE '%status%')
    `);
    console.log('\n✅ User type/role columns:');
    if (screenlyUserTypes.rows.length > 0) {
      screenlyUserTypes.rows.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type})`);
      });
    } else {
      console.log('   (No explicit role/type columns found)');
    }

    // ============================================
    // 4. WORK.BIZOFORCE (Projects/Timesheets)
    // ============================================
    console.log('\n\n📊 4. WORK.BIZOFORCE DATABASE (Projects/Timesheets)');
    console.log('-'.repeat(80));

    // Get users table structure
    const [workUsersSchema] = await workDB.query(`
      DESCRIBE users
    `);
    console.log('\n✅ users table structure:');
    workUsersSchema.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type}) ${col.Key ? '[' + col.Key + ']' : ''}`);
    });

    // Check for role/type columns
    const [workUserTypes] = await workDB.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${process.env.WORK_DB_NAME}'
      AND TABLE_NAME = 'users'
      AND (COLUMN_NAME LIKE '%type%' OR COLUMN_NAME LIKE '%role%' OR COLUMN_NAME LIKE '%status%')
    `);
    console.log('\n✅ User type/role columns:');
    if (workUserTypes.length > 0) {
      workUserTypes.forEach(col => {
        console.log(`   - ${col.COLUMN_NAME} (${col.COLUMN_TYPE})`);
      });
    } else {
      console.log('   (No explicit role/type columns found)');
    }

    // Sample user data
    const [workSampleUsers] = await workDB.query(`
      SELECT * FROM users LIMIT 3
    `);
    console.log('\n✅ Sample user data:');
    if (workSampleUsers.length > 0) {
      console.log('   Columns:', Object.keys(workSampleUsers[0]).join(', '));
      workSampleUsers.forEach((user, idx) => {
        console.log(`   User ${idx + 1}:`, JSON.stringify(user, null, 2).substring(0, 300) + '...');
      });
    }

    // Check for user-related tables
    const [workTables] = await workDB.query(`
      SHOW TABLES
    `);
    console.log('\n✅ User-related tables:');
    const workUserRelatedTables = [];
    workTables.forEach(row => {
      const tableName = Object.values(row)[0];
      if (tableName.includes('user') || tableName.includes('employee') || 
          tableName.includes('team') || tableName.includes('member') ||
          tableName.includes('project') || tableName.includes('timesheet') ||
          tableName.includes('company')) {
        workUserRelatedTables.push(tableName);
        console.log(`   - ${tableName}`);
      }
    });

    // Check for company-user relationships
    const [workCompanyUsers] = await workDB.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${process.env.WORK_DB_NAME}'
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME LIKE '%company%'
    `);
    console.log('\n✅ Company-related columns in users table:');
    if (workCompanyUsers.length > 0) {
      workCompanyUsers.forEach(col => {
        console.log(`   - ${col.COLUMN_NAME} (${col.COLUMN_TYPE})`);
      });
    } else {
      console.log('   (No company columns found in users table)');
    }

    // ============================================
    // 5. GIGLANCER ROLES TABLE
    // ============================================
    console.log('\n\n📊 5. GIGLANCER ROLES TABLE');
    console.log('-'.repeat(80));

    const [giglancerRoles] = await giglancerDB.query(`
      SELECT * FROM roles ORDER BY id
    `);
    console.log('\n✅ Available roles in Giglancer:');
    if (giglancerRoles.length > 0) {
      giglancerRoles.forEach(role => {
        console.log(`   Role ID ${role.id}: ${role.name || role.role_name || JSON.stringify(role)}`);
      });
    } else {
      console.log('   (Roles table not found or empty)');
    }

    // Count users by role
    const [giglancerUsersByRole] = await giglancerDB.query(`
      SELECT role_id, COUNT(*) as count
      FROM users
      GROUP BY role_id
      ORDER BY role_id
    `);
    console.log('\n✅ User distribution by role:');
    giglancerUsersByRole.forEach(row => {
      console.log(`   Role ID ${row.role_id}: ${row.count} users`);
    });

    // ============================================
    // 6. COUNT USERS IN EACH DATABASE
    // ============================================
    console.log('\n\n📊 USER COUNTS');
    console.log('-'.repeat(80));

    const [bizoforceCount] = await bizoforceDB.query('SELECT COUNT(*) as count FROM wp_users');
    console.log(`✅ Bizoforce: ${bizoforceCount[0].count} users`);

    const [giglancerCount] = await giglancerDB.query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Giglancer: ${giglancerCount[0].count} users`);

    const screenlyCount = await screenlyDB.query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Screenly: ${screenlyCount.rows[0].count} users`);

    const [workCount] = await workDB.query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Work.Bizoforce: ${workCount[0].count} users`);

    const totalUsers = parseInt(bizoforceCount[0].count) + parseInt(giglancerCount[0].count) + 
                      parseInt(screenlyCount.rows[0].count) + parseInt(workCount[0].count);
    console.log(`\n📊 TOTAL: ${totalUsers} users across all platforms`);

    console.log('\n' + '='.repeat(80));
    console.log('✅ Schema analysis complete!\n');

  } catch (error) {
    console.error('❌ Error analyzing schemas:', error.message);
    console.error(error);
  } finally {
    // Close all connections
    await unifiedDB.end();
    await bizoforceDB.end();
    await giglancerDB.end();
    await screenlyDB.end();
    await workDB.end();
    process.exit(0);
  }
}

// Run the analysis
analyzeSchemas();
