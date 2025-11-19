require('dotenv').config();
const { testConnections } = require('../config/database');
const mysql = require('mysql2/promise');
const { Pool } = require('pg');

/**
 * User Migration Script
 * Analyzes and migrates users from all 4 platforms to unified database
 */

async function migrateUsers() {
  console.log('\n🚀 Starting User Migration Process...\n');

  // Test connections first
  await testConnections();

  // Create connection pools
  const unifiedDb = mysql.createPool({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
  });

  const bizoforceDb = mysql.createPool({
    host: process.env.BIZOFORCE_DB_HOST,
    user: process.env.BIZOFORCE_DB_USER,
    password: process.env.BIZOFORCE_DB_PASS,
    database: process.env.BIZOFORCE_DB_NAME,
  });

  const giglancerDb = mysql.createPool({
    host: process.env.GIGLANCER_DB_HOST,
    user: process.env.GIGLANCER_DB_USER,
    password: process.env.GIGLANCER_DB_PASS,
    database: process.env.GIGLANCER_DB_NAME,
  });

  const screenlyDb = new Pool({
    host: process.env.SCREENLY_DB_HOST,
    user: process.env.SCREENLY_DB_USER,
    password: process.env.SCREENLY_DB_PASS,
    database: process.env.SCREENLY_DB_NAME,
    port: process.env.SCREENLY_DB_PORT || 5432,
  });

  const workDb = mysql.createPool({
    host: process.env.WORK_DB_HOST,
    user: process.env.WORK_DB_USER,
    password: process.env.WORK_DB_PASS,
    database: process.env.WORK_DB_NAME,
  });

  const stats = {
    bizoforce: { total: 0, migrated: 0, skipped: 0 },
    giglancer: { total: 0, migrated: 0, skipped: 0 },
    screenly: { total: 0, migrated: 0, skipped: 0 },
    work: { total: 0, migrated: 0, skipped: 0 },
    duplicates: 0,
    errors: []
  };

  try {
    // ============================================
    // 1. MIGRATE FROM BIZOFORCE (WordPress)
    // ============================================
    console.log('\n📊 1. Migrating from BIZOFORCE (WordPress/WooCommerce)');
    console.log('━'.repeat(60));

    try {
      const [wpUsers] = await bizoforceDb.query(`
        SELECT 
          ID,
          user_login,
          user_email,
          user_registered,
          display_name
        FROM wp_users
        WHERE user_email != ''
        ORDER BY user_registered DESC
        LIMIT 10
      `);

      stats.bizoforce.total = wpUsers.length;
      console.log(`Found ${wpUsers.length} users in Bizoforce`);

      // Get user metadata (first name, last name, phone)
      const [userMeta] = await bizoforceDb.query(`
        SELECT 
          user_id,
          meta_key,
          meta_value
        FROM wp_usermeta
        WHERE meta_key IN ('first_name', 'last_name', 'billing_phone', 'wp_capabilities')
      `);

      // Organize metadata by user
      const metaByUser = {};
      userMeta.forEach(meta => {
        if (!metaByUser[meta.user_id]) {
          metaByUser[meta.user_id] = {};
        }
        metaByUser[meta.user_id][meta.meta_key] = meta.meta_value;
      });

      // Migrate each user
      for (const user of wpUsers) {
        try {
          const meta = metaByUser[user.ID] || {};
          const firstName = meta.first_name || user.display_name.split(' ')[0] || 'User';
          const lastName = meta.last_name || user.display_name.split(' ')[1] || '';
          const phone = meta.billing_phone || null;
          
          // Determine user type from capabilities
          let userType = 'individual';
          if (meta.wp_capabilities) {
            if (meta.wp_capabilities.includes('administrator') || 
                meta.wp_capabilities.includes('shop_manager')) {
              userType = 'company';
            }
          }

          // Check if user already exists
          const [existing] = await unifiedDb.query(
            'SELECT id FROM unified_users WHERE email = ?',
            [user.user_email]
          );

          if (existing.length > 0) {
            // Update platform IDs
            await unifiedDb.query(
              'UPDATE unified_users SET bizoforce_user_id = ? WHERE email = ?',
              [user.ID, user.user_email]
            );
            stats.bizoforce.skipped++;
            stats.duplicates++;
          } else {
            // Insert new user
            await unifiedDb.query(`
              INSERT INTO unified_users (
                email, password_hash, first_name, last_name, phone,
                user_type, bizoforce_user_id, created_at, updated_at
              ) VALUES (?, '', ?, ?, ?, ?, ?, ?, NOW())
            `, [
              user.user_email,
              firstName,
              lastName,
              phone,
              userType,
              user.ID,
              user.user_registered
            ]);
            stats.bizoforce.migrated++;
          }
        } catch (err) {
          console.error(`  ❌ Error migrating user ${user.user_email}:`, err.message);
          stats.errors.push({ platform: 'bizoforce', email: user.user_email, error: err.message });
        }
      }

      console.log(`✅ Migrated: ${stats.bizoforce.migrated}, Skipped: ${stats.bizoforce.skipped}`);

    } catch (error) {
      console.error('❌ Bizoforce migration error:', error.message);
    }

    // ============================================
    // 2. MIGRATE FROM GIGLANCER
    // ============================================
    console.log('\n📊 2. Migrating from GIGLANCER (Jobs Platform)');
    console.log('━'.repeat(60));

    try {
      // First, find the actual users table
      const [tables] = await giglancerDb.query(`
        SHOW TABLES LIKE '%user%'
      `);
      
      console.log('User-related tables found:');
      tables.forEach(table => {
        console.log(`  - ${Object.values(table)[0]}`);
      });

      // Try common table names
      let usersData = null;
      const possibleTables = ['users', 'tbl_users', 'user'];
      
      for (const tableName of possibleTables) {
        try {
          const [data] = await giglancerDb.query(`SELECT * FROM ${tableName} LIMIT 10`);
          if (data.length > 0) {
            usersData = { tableName, data };
            break;
          }
        } catch (e) {
          // Table doesn't exist, continue
        }
      }

      if (usersData) {
        const { tableName, data } = usersData;
        console.log(`✅ Found ${data.length} users in table: ${tableName}`);
        stats.giglancer.total = data.length;

        // Get column names
        const sampleUser = data[0];
        const columns = Object.keys(sampleUser);
        console.log('Available columns:', columns.join(', '));

        // Map common column names
        const emailField = columns.find(col => col.toLowerCase().includes('email')) || 'email';
        const firstNameField = columns.find(col => col.toLowerCase().includes('first') || col.toLowerCase().includes('fname')) || 'first_name';
        const lastNameField = columns.find(col => col.toLowerCase().includes('last') || col.toLowerCase().includes('lname')) || 'last_name';
        const phoneField = columns.find(col => col.toLowerCase().includes('phone') || col.toLowerCase().includes('mobile')) || 'phone';
        const idField = columns.find(col => col.toLowerCase() === 'id' || col.toLowerCase() === 'user_id') || 'id';

        // Migrate users
        for (const user of data) {
          try {
            const email = user[emailField];
            if (!email || !email.includes('@')) {
              stats.giglancer.skipped++;
              continue;
            }

            const firstName = user[firstNameField] || 'User';
            const lastName = user[lastNameField] || '';
            const phone = user[phoneField] || null;
            const userId = user[idField];

            // Check if exists
            const [existing] = await unifiedDb.query(
              'SELECT id FROM unified_users WHERE email = ?',
              [email]
            );

            if (existing.length > 0) {
              await unifiedDb.query(
                'UPDATE unified_users SET giglancer_user_id = ? WHERE email = ?',
                [userId, email]
              );
              stats.giglancer.skipped++;
              stats.duplicates++;
            } else {
              await unifiedDb.query(`
                INSERT INTO unified_users (
                  email, password_hash, first_name, last_name, phone,
                  user_type, giglancer_user_id, created_at, updated_at
                ) VALUES (?, '', ?, ?, ?, 'individual', ?, NOW(), NOW())
              `, [email, firstName, lastName, phone, userId]);
              stats.giglancer.migrated++;
            }
          } catch (err) {
            console.error(`  ❌ Error migrating user:`, err.message);
            stats.errors.push({ platform: 'giglancer', error: err.message });
          }
        }

        console.log(`✅ Migrated: ${stats.giglancer.migrated}, Skipped: ${stats.giglancer.skipped}`);
      } else {
        console.log('⚠️  No users table found in Giglancer database');
      }

    } catch (error) {
      console.error('❌ Giglancer migration error:', error.message);
    }

    // ============================================
    // 3. MIGRATE FROM SCREENLY (PostgreSQL)
    // ============================================
    console.log('\n📊 3. Migrating from SCREENLY (AI Screening)');
    console.log('━'.repeat(60));

    try {
      // Find user tables
      const tablesResult = await screenlyDb.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE '%user%' OR table_name LIKE '%candidate%')
        ORDER BY table_name
      `);
      
      console.log('User-related tables found:');
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });

      // Try common tables
      const possibleTables = ['users', 'user', 'candidates', 'applicants'];
      let userData = null;

      for (const tableName of possibleTables) {
        try {
          const result = await screenlyDb.query(`SELECT * FROM ${tableName} LIMIT 10`);
          if (result.rows.length > 0) {
            userData = { tableName, data: result.rows };
            break;
          }
        } catch (e) {
          // Table doesn't exist
        }
      }

      if (userData) {
        const { tableName, data } = userData;
        console.log(`✅ Found ${data.length} records in table: ${tableName}`);
        stats.screenly.total = data.length;

        const columns = Object.keys(data[0]);
        console.log('Available columns:', columns.join(', '));

        const emailField = columns.find(col => col.toLowerCase().includes('email')) || 'email';
        const firstNameField = columns.find(col => col.toLowerCase().includes('first')) || 'first_name';
        const lastNameField = columns.find(col => col.toLowerCase().includes('last')) || 'last_name';
        const phoneField = columns.find(col => col.toLowerCase().includes('phone')) || 'phone';
        const idField = columns.find(col => col === 'id' || col === 'user_id') || 'id';

        for (const user of data) {
          try {
            const email = user[emailField];
            if (!email || !email.includes('@')) {
              stats.screenly.skipped++;
              continue;
            }

            const firstName = user[firstNameField] || 'User';
            const lastName = user[lastNameField] || '';
            const phone = user[phoneField] || null;
            const userId = user[idField];

            const [existing] = await unifiedDb.query(
              'SELECT id FROM unified_users WHERE email = ?',
              [email]
            );

            if (existing.length > 0) {
              await unifiedDb.query(
                'UPDATE unified_users SET screenly_user_id = ? WHERE email = ?',
                [userId, email]
              );
              stats.screenly.skipped++;
              stats.duplicates++;
            } else {
              await unifiedDb.query(`
                INSERT INTO unified_users (
                  email, password_hash, first_name, last_name, phone,
                  user_type, screenly_user_id, created_at, updated_at
                ) VALUES (?, '', ?, ?, ?, 'individual', ?, NOW(), NOW())
              `, [email, firstName, lastName, phone, userId]);
              stats.screenly.migrated++;
            }
          } catch (err) {
            console.error(`  ❌ Error migrating user:`, err.message);
            stats.errors.push({ platform: 'screenly', error: err.message });
          }
        }

        console.log(`✅ Migrated: ${stats.screenly.migrated}, Skipped: ${stats.screenly.skipped}`);
      } else {
        console.log('⚠️  No user table found in Screenly database');
      }

    } catch (error) {
      console.error('❌ Screenly migration error:', error.message);
    }

    // ============================================
    // 4. MIGRATE FROM WORK.BIZOFORCE
    // ============================================
    console.log('\n📊 4. Migrating from WORK.BIZOFORCE (Projects/Timesheets)');
    console.log('━'.repeat(60));

    try {
      const [tables] = await workDb.query(`SHOW TABLES LIKE '%user%'`);
      
      console.log('User-related tables found:');
      tables.forEach(table => {
        console.log(`  - ${Object.values(table)[0]}`);
      });

      const possibleTables = ['users', 'tbl_users', 'employees', 'team_members'];
      let usersData = null;

      for (const tableName of possibleTables) {
        try {
          const [data] = await workDb.query(`SELECT * FROM ${tableName} LIMIT 10`);
          if (data.length > 0) {
            usersData = { tableName, data };
            break;
          }
        } catch (e) {
          // Continue
        }
      }

      if (usersData) {
        const { tableName, data } = usersData;
        console.log(`✅ Found ${data.length} records in table: ${tableName}`);
        stats.work.total = data.length;

        const columns = Object.keys(data[0]);
        console.log('Available columns:', columns.join(', '));

        const emailField = columns.find(col => col.toLowerCase().includes('email')) || 'email';
        const firstNameField = columns.find(col => col.toLowerCase().includes('first')) || 'first_name';
        const lastNameField = columns.find(col => col.toLowerCase().includes('last')) || 'last_name';
        const phoneField = columns.find(col => col.toLowerCase().includes('phone')) || 'phone';
        const idField = columns.find(col => col === 'id' || col === 'user_id') || 'id';

        for (const user of data) {
          try {
            const email = user[emailField];
            if (!email || !email.includes('@')) {
              stats.work.skipped++;
              continue;
            }

            const firstName = user[firstNameField] || 'User';
            const lastName = user[lastNameField] || '';
            const phone = user[phoneField] || null;
            const userId = user[idField];

            const [existing] = await unifiedDb.query(
              'SELECT id FROM unified_users WHERE email = ?',
              [email]
            );

            if (existing.length > 0) {
              await unifiedDb.query(
                'UPDATE unified_users SET work_user_id = ? WHERE email = ?',
                [userId, email]
              );
              stats.work.skipped++;
              stats.duplicates++;
            } else {
              await unifiedDb.query(`
                INSERT INTO unified_users (
                  email, password_hash, first_name, last_name, phone,
                  user_type, work_user_id, created_at, updated_at
                ) VALUES (?, '', ?, ?, ?, 'company', ?, NOW(), NOW())
              `, [email, firstName, lastName, phone, userId]);
              stats.work.migrated++;
            }
          } catch (err) {
            console.error(`  ❌ Error migrating user:`, err.message);
            stats.errors.push({ platform: 'work', error: err.message });
          }
        }

        console.log(`✅ Migrated: ${stats.work.migrated}, Skipped: ${stats.work.skipped}`);
      } else {
        console.log('⚠️  No users table found in Work.Bizoforce database');
      }

    } catch (error) {
      console.error('❌ Work.Bizoforce migration error:', error.message);
    }

    // ============================================
    // MIGRATION SUMMARY
    // ============================================
    console.log('\n\n📈 MIGRATION SUMMARY');
    console.log('━'.repeat(60));
    console.log(`\n📊 Bizoforce:`);
    console.log(`   Total: ${stats.bizoforce.total}`);
    console.log(`   Migrated: ${stats.bizoforce.migrated}`);
    console.log(`   Skipped: ${stats.bizoforce.skipped}`);

    console.log(`\n📊 Giglancer:`);
    console.log(`   Total: ${stats.giglancer.total}`);
    console.log(`   Migrated: ${stats.giglancer.migrated}`);
    console.log(`   Skipped: ${stats.giglancer.skipped}`);

    console.log(`\n📊 Screenly:`);
    console.log(`   Total: ${stats.screenly.total}`);
    console.log(`   Migrated: ${stats.screenly.migrated}`);
    console.log(`   Skipped: ${stats.screenly.skipped}`);

    console.log(`\n📊 Work.Bizoforce:`);
    console.log(`   Total: ${stats.work.total}`);
    console.log(`   Migrated: ${stats.work.migrated}`);
    console.log(`   Skipped: ${stats.work.skipped}`);

    const totalMigrated = stats.bizoforce.migrated + stats.giglancer.migrated + 
                          stats.screenly.migrated + stats.work.migrated;
    const totalProcessed = stats.bizoforce.total + stats.giglancer.total + 
                           stats.screenly.total + stats.work.total;

    console.log(`\n🎯 TOTALS:`);
    console.log(`   Total Users Processed: ${totalProcessed}`);
    console.log(`   New Users Migrated: ${totalMigrated}`);
    console.log(`   Duplicate Users Merged: ${stats.duplicates}`);
    console.log(`   Errors: ${stats.errors.length}`);

    if (stats.errors.length > 0) {
      console.log(`\n⚠️  ERRORS (First 10):`);
      stats.errors.slice(0, 10).forEach(err => {
        console.log(`   ${err.platform}: ${err.email || 'unknown'} - ${err.error}`);
      });
    }

    // Check unified database
    const [finalCount] = await unifiedDb.query('SELECT COUNT(*) as count FROM unified_users');
    console.log(`\n✅ Total users in unified database: ${finalCount[0].count}`);

  } catch (error) {
    console.error('\n❌ Fatal migration error:', error);
  } finally {
    // Close connections
    await unifiedDb.end();
    await bizoforceDb.end();
    await giglancerDb.end();
    await screenlyDb.end();
    await workDb.end();
  }

  console.log('\n✅ Migration complete!\n');
}

// Run migration
migrateUsers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
