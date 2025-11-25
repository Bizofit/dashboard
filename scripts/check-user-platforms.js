import mysql from 'mysql2/promise';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  console.log('🔍 Checking User 1008 in Giglancer and Screenly Databases\n');

  // Giglancer (MySQL)
  const giglancerPool = mysql.createPool({
    host: process.env.GIGLANCER_DB_HOST,
    user: process.env.GIGLANCER_DB_USER,
    password: process.env.GIGLANCER_DB_PASS,
    database: process.env.GIGLANCER_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  // Screenly (PostgreSQL)
  const screenlyPool = new pg.Pool({
    host: process.env.SCREENLY_DB_HOST,
    user: process.env.SCREENLY_DB_USER,
    password: process.env.SCREENLY_DB_PASS,
    database: process.env.SCREENLY_DB_NAME,
    port: parseInt(process.env.SCREENLY_DB_PORT || '5432'),
    ssl: false
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 GIGLANCER DATABASE (MySQL)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // Search by email in Giglancer
    const [usersByEmail] = await giglancerPool.execute(
      `SELECT id, email, name, role_id, account_type, project_count, bid_count, job_count, job_apply_count, 
              created_at, updated_at, status
       FROM users 
       WHERE email = ?`,
      ['bizofitinfo@gmail.com']
    );

    console.log(`\n📧 Search by email 'bizofitinfo@gmail.com':`);
    if (usersByEmail.length > 0) {
      usersByEmail.forEach(user => {
        console.log(`   ✅ Found User ID: ${user.id}`);
        console.log(`      Name: ${user.name}`);
        console.log(`      Role ID: ${user.role_id}`);
        console.log(`      Account Type: ${user.account_type}`);
        console.log(`      Projects: ${user.project_count}, Bids: ${user.bid_count}`);
        console.log(`      Jobs: ${user.job_count}, Applications: ${user.job_apply_count}`);
        console.log(`      Status: ${user.status}`);
        console.log(`      Created: ${user.created_at}`);
      });
    } else {
      console.log(`   ❌ No users found with email 'bizofitinfo@gmail.com'`);
    }

    // Search similar emails
    const [similarEmails] = await giglancerPool.execute(
      `SELECT id, email, name, role_id, account_type 
       FROM users 
       WHERE email LIKE '%bizofit%' OR email LIKE '%bala%'
       ORDER BY id DESC
       LIMIT 10`
    );

    console.log(`\n🔍 Similar emails (bizofit/bala):`);
    if (similarEmails.length > 0) {
      similarEmails.forEach(user => {
        console.log(`   - ID: ${user.id}, Email: ${user.email}, Name: ${user.name}`);
      });
    } else {
      console.log(`   ❌ No similar emails found`);
    }

    // Check recent users
    const [recentUsers] = await giglancerPool.execute(
      `SELECT id, email, name, role_id, account_type, created_at
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 5`
    );

    console.log(`\n📅 Most recent 5 users:`);
    recentUsers.forEach(user => {
      console.log(`   - ID: ${user.id}, Email: ${user.email}, Created: ${user.created_at}`);
    });

  } catch (err) {
    console.error('❌ Giglancer database error:', err.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 SCREENLY DATABASE (PostgreSQL)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // Search by email in Screenly
    const usersByEmailScreenly = await screenlyPool.query(
      `SELECT id, email, first_name, last_name, company_name, role, 
              created_at, updated_at, is_active
       FROM users 
       WHERE email = $1`,
      ['bizofitinfo@gmail.com']
    );

    console.log(`\n📧 Search by email 'bizofitinfo@gmail.com':`);
    if (usersByEmailScreenly.rows.length > 0) {
      usersByEmailScreenly.rows.forEach(user => {
        console.log(`   ✅ Found User ID: ${user.id}`);
        console.log(`      Name: ${user.first_name} ${user.last_name}`);
        console.log(`      Company: ${user.company_name}`);
        console.log(`      Role: ${user.role}`);
        console.log(`      Active: ${user.is_active}`);
        console.log(`      Created: ${user.created_at}`);
      });
    } else {
      console.log(`   ❌ No users found with email 'bizofitinfo@gmail.com'`);
    }

    // Search similar emails
    const similarEmailsScreenly = await screenlyPool.query(
      `SELECT id, email, first_name, last_name, company_name, role
       FROM users 
       WHERE email ILIKE '%bizofit%' OR email ILIKE '%bala%' OR first_name ILIKE '%bala%'
       ORDER BY id DESC
       LIMIT 10`
    );

    console.log(`\n🔍 Similar emails/names (bizofit/bala):`);
    if (similarEmailsScreenly.rows.length > 0) {
      similarEmailsScreenly.rows.forEach(user => {
        console.log(`   - ID: ${user.id}, Email: ${user.email}, Name: ${user.first_name} ${user.last_name}, Company: ${user.company_name}`);
      });
    } else {
      console.log(`   ❌ No similar emails found`);
    }

    // Check recent users
    const recentUsersScreenly = await screenlyPool.query(
      `SELECT id, email, first_name, last_name, company_name, created_at
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 5`
    );

    console.log(`\n📅 Most recent 5 users:`);
    recentUsersScreenly.rows.forEach(user => {
      console.log(`   - ID: ${user.id}, Email: ${user.email}, Name: ${user.first_name} ${user.last_name}, Created: ${user.created_at}`);
    });

  } catch (err) {
    console.error('❌ Screenly database error:', err.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 UNIFIED DATABASE - Current User 1008');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Check current unified user
  const unifiedPool = mysql.createPool({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  try {
    const [unifiedUser] = await unifiedPool.execute(
      `SELECT id, email, first_name, last_name, 
              bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id,
              auth_provider, created_at
       FROM unified_users 
       WHERE id = 1008`
    );

    if (unifiedUser.length > 0) {
      const user = unifiedUser[0];
      console.log(`\n✅ Current Unified User 1008:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log(`   Bizoforce ID: ${user.bizoforce_user_id}`);
      console.log(`   Giglancer ID: ${user.giglancer_user_id}`);
      console.log(`   Screenly ID: ${user.screenly_user_id}`);
      console.log(`   Work ID: ${user.work_user_id}`);
      console.log(`   Auth Provider: ${user.auth_provider}`);
    }
  } catch (err) {
    console.error('❌ Unified database error:', err.message);
  }

  // Close connections
  await giglancerPool.end();
  await screenlyPool.end();
  await unifiedPool.end();
  
  console.log('\n✅ Database search complete!');
})();