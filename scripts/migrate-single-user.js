require('dotenv').config();
const mysql = require('mysql2/promise');
const { Pool } = require('pg');

async function searchAndMigrateUser() {
  const targetEmail = 'sudh013@gmail.com';
  
  console.log(`\n🔍 Searching for user: ${targetEmail}\n`);
  console.log('='.repeat(80));

  // Create connections
  const unifiedDb = await mysql.createConnection({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
  });

  const bizoforceDb = await mysql.createConnection({
    host: process.env.BIZOFORCE_DB_HOST,
    user: process.env.BIZOFORCE_DB_USER,
    password: process.env.BIZOFORCE_DB_PASS,
    database: process.env.BIZOFORCE_DB_NAME,
  });

  const giglancerDb = await mysql.createConnection({
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

  const workDb = await mysql.createConnection({
    host: process.env.WORK_DB_HOST,
    user: process.env.WORK_DB_USER,
    password: process.env.WORK_DB_PASS,
    database: process.env.WORK_DB_NAME,
  });

  try {
    // Check if already migrated
    const [existing] = await unifiedDb.query(
      'SELECT * FROM unified_users WHERE email = ?',
      [targetEmail]
    );

    if (existing.length > 0) {
      console.log('❌ User already exists in unified database:\n');
      console.log('   ID:', existing[0].id);
      console.log('   Name:', existing[0].first_name, existing[0].last_name);
      console.log('   Type:', existing[0].user_type);
      console.log('   Platforms:');
      if (existing[0].bizoforce_user_id) console.log('     ✅ Bizoforce:', existing[0].bizoforce_user_id);
      if (existing[0].giglancer_user_id) console.log('     ✅ Giglancer:', existing[0].giglancer_user_id);
      if (existing[0].screenly_user_id) console.log('     ✅ Screenly:', existing[0].screenly_user_id);
      if (existing[0].work_user_id) console.log('     ✅ Work.Bizoforce:', existing[0].work_user_id);
      return;
    }

    console.log('✅ User not found in unified database. Searching platforms...\n');

    const userData = {};

    // 1. Search Bizoforce
    console.log('🔎 Searching BIZOFORCE...');
    const [bizoUsers] = await bizoforceDb.query(
      'SELECT * FROM wp_users WHERE user_email = ?',
      [targetEmail]
    );
    if (bizoUsers.length > 0) {
      const user = bizoUsers[0];
      userData.bizoforce = user;
      console.log('   ✅ Found! ID:', user.ID);
      console.log('      Login:', user.user_login);
      console.log('      Display Name:', user.display_name);
      console.log('      Signup Step:', user.signup_step);
      console.log('      Registered:', user.user_registered);

      // Get metadata
      const [meta] = await bizoforceDb.query(
        `SELECT meta_key, meta_value FROM wp_usermeta 
         WHERE user_id = ? AND meta_key IN ('first_name', 'last_name', 'billing_phone', 'wp_capabilities')`,
        [user.ID]
      );
      userData.bizoforce_meta = meta;
      meta.forEach(m => {
        if (m.meta_key === 'wp_capabilities') {
          console.log('      Role:', m.meta_value);
        }
      });
    } else {
      console.log('   ❌ Not found');
    }

    // 2. Search Giglancer
    console.log('\n🔎 Searching GIGLANCER...');
    const [gigUsers] = await giglancerDb.query(
      'SELECT * FROM users WHERE email = ?',
      [targetEmail]
    );
    if (gigUsers.length > 0) {
      const user = gigUsers[0];
      userData.giglancer = user;
      console.log('   ✅ Found! ID:', user.id);
      console.log('      Username:', user.username);
      console.log('      Name:', user.first_name, user.last_name);
      console.log('      Role ID:', user.role_id);
      console.log('      Active:', user.is_active);
      console.log('      Email Confirmed:', user.is_email_confirmed);
      console.log('      Project Count:', user.project_count);
      console.log('      Job Count:', user.job_count);
      console.log('      Bid Count:', user.bid_count);
      console.log('      Job Apply Count:', user.job_apply_count);
      console.log('      Bizoforce Company ID:', user.bizoforce_company_id);
      console.log('      Created:', user.created_at);
    } else {
      console.log('   ❌ Not found');
    }

    // 3. Search Screenly
    console.log('\n🔎 Searching SCREENLY...');
    const screenResult = await screenlyDb.query(
      'SELECT * FROM users WHERE email = $1',
      [targetEmail]
    );
    if (screenResult.rows.length > 0) {
      const user = screenResult.rows[0];
      userData.screenly = user;
      console.log('   ✅ Found! ID:', user.id);
      console.log('      Name:', user.first_name, user.last_name);
      console.log('      Google ID:', user.google_id);
      console.log('      Role:', user.role);
      console.log('      Company:', user.company_name);
      console.log('      Company ID:', user.company_id);
      console.log('      Active:', user.is_active);
      console.log('      Created:', user.created_at);
    } else {
      console.log('   ❌ Not found');
    }

    // 4. Search Work.Bizoforce
    console.log('\n🔎 Searching WORK.BIZOFORCE...');
    const [workUsers] = await workDb.query(
      'SELECT * FROM users WHERE email = ?',
      [targetEmail]
    );
    if (workUsers.length > 0) {
      const user = workUsers[0];
      userData.work = user;
      console.log('   ✅ Found! ID:', user.id);
      console.log('      Name:', user.name);
      console.log('      Company ID:', user.company_id);
      console.log('      Super Admin:', user.super_admin);
      console.log('      Status:', user.status);
      console.log('      Login:', user.login);
      console.log('      Created:', user.created_at);
    } else {
      console.log('   ❌ Not found');
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 MIGRATION DECISION:\n');

    // Determine user type and role
    let userType = 'individual'; // Default
    let needsRoleSelection = false;
    let firstName = '';
    let lastName = '';
    let password = null;
    let phone = null;
    let isActive = true;
    let emailVerified = false;
    let createdAt = new Date();

    // Priority 1: Work.Bizoforce (cleanest data)
    if (userData.work) {
      if (userData.work.company_id) {
        userType = 'company';
        console.log('✅ User type: COMPANY (has company_id in Work.Bizoforce)');
      }
      const nameParts = userData.work.name.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
      password = userData.work.password;
      phone = userData.work.mobile;
      isActive = userData.work.status === 'active';
      createdAt = userData.work.created_at;
    }

    // Priority 2: Giglancer (detailed activity data)
    if (userData.giglancer) {
      firstName = firstName || userData.giglancer.first_name;
      lastName = lastName || userData.giglancer.last_name;
      password = password || userData.giglancer.password;
      emailVerified = userData.giglancer.is_email_confirmed;
      createdAt = userData.giglancer.created_at < createdAt ? userData.giglancer.created_at : createdAt;

      if (userData.giglancer.bizoforce_company_id) {
        userType = 'company';
        console.log('✅ User type: COMPANY (has bizoforce_company_id in Giglancer)');
      } else if (userData.giglancer.role_id === 3) {
        userType = 'company';
        console.log('✅ User type: COMPANY (role_id=3 Client in Giglancer)');
      } else if (userData.giglancer.project_count > 0 || userData.giglancer.job_count > 0) {
        userType = 'company';
        console.log('✅ User type: COMPANY (posted jobs/projects in Giglancer)');
      } else if (userData.giglancer.job_apply_count > 0 || userData.giglancer.bid_count > 0) {
        userType = 'individual';
        console.log('✅ User type: INDIVIDUAL (applied to jobs/bids in Giglancer)');
      }
    }

    // Priority 3: Screenly
    if (userData.screenly) {
      firstName = firstName || userData.screenly.first_name;
      lastName = lastName || userData.screenly.last_name;
      password = password || userData.screenly.password_hash;
      phone = phone || userData.screenly.phone_number;
      isActive = userData.screenly.is_active;
      createdAt = userData.screenly.created_at < createdAt ? userData.screenly.created_at : createdAt;

      if (userData.screenly.company_id) {
        userType = 'company';
        console.log('✅ User type: COMPANY (has company_id in Screenly)');
      }
    }

    // Priority 4: Bizoforce
    if (userData.bizoforce) {
      const nameParts = userData.bizoforce.display_name.split(' ');
      firstName = firstName || nameParts[0] || '';
      lastName = lastName || nameParts.slice(1).join(' ') || '';
      password = password || userData.bizoforce.user_pass;
      createdAt = userData.bizoforce.user_registered < createdAt ? userData.bizoforce.user_registered : createdAt;

      if (userData.bizoforce.signup_step === 'register_company') {
        userType = 'company';
        console.log('✅ User type: COMPANY (signup_step=register_company in Bizoforce)');
      } else if (userData.bizoforce.signup_step === 'register_product_service') {
        userType = 'company';
        console.log('✅ User type: COMPANY (signup_step=register_product_service in Bizoforce)');
      } else if (!userData.bizoforce.signup_step) {
        needsRoleSelection = true;
        console.log('⚠️  User needs role selection (no signup_step in Bizoforce)');
      }

      // Get metadata
      if (userData.bizoforce_meta) {
        userData.bizoforce_meta.forEach(m => {
          if (m.meta_key === 'first_name') firstName = firstName || m.meta_value;
          if (m.meta_key === 'last_name') lastName = lastName || m.meta_value;
          if (m.meta_key === 'billing_phone') phone = phone || m.meta_value;
        });
      }
    }

    console.log('\n📝 MIGRATION DATA:');
    console.log('   Email:', targetEmail);
    console.log('   First Name:', firstName);
    console.log('   Last Name:', lastName);
    console.log('   User Type:', userType);
    console.log('   Needs Role Selection:', needsRoleSelection);
    console.log('   Phone:', phone);
    console.log('   Email Verified:', emailVerified);
    console.log('   Active:', isActive);
    console.log('   Created:', createdAt);

    // Insert into unified database
    console.log('\n💾 Inserting into unified database...');

    const [result] = await unifiedDb.query(
      `INSERT INTO unified_users (
        email, password_hash, first_name, last_name, phone, user_type,
        bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id,
        is_active, email_verified, needsRoleSelection, created_at, migration_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        targetEmail,
        password,
        firstName,
        lastName,
        phone,
        userType,
        userData.bizoforce?.ID || null,
        userData.giglancer?.id || null,
        userData.screenly?.id || null,
        userData.work?.id || null,
        isActive,
        emailVerified,
        needsRoleSelection,
        createdAt
      ]
    );

    console.log('\n✅ Migration successful!');
    console.log('   Unified User ID:', result.insertId);
    console.log('   Platform IDs:');
    if (userData.bizoforce) console.log('     - Bizoforce:', userData.bizoforce.ID);
    if (userData.giglancer) console.log('     - Giglancer:', userData.giglancer.id);
    if (userData.screenly) console.log('     - Screenly:', userData.screenly.id);
    if (userData.work) console.log('     - Work.Bizoforce:', userData.work.id);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
  } finally {
    await unifiedDb.end();
    await bizoforceDb.end();
    await giglancerDb.end();
    await screenlyDb.end();
    await workDb.end();
  }
}

searchAndMigrateUser();
