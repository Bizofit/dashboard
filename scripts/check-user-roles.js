require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkUserRoles() {
  const db = await mysql.createConnection({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME
  });

  try {
    console.log('\n🔍 Checking roles for sudh013@gmail.com (User ID: 1033)\n');
    console.log('='.repeat(80));

    const [roles] = await db.query(
      'SELECT * FROM user_roles WHERE user_id = 1033 ORDER BY is_primary DESC, created_at ASC'
    );

    if (roles.length > 0) {
      console.log(`\n✅ Found ${roles.length} role(s):\n`);
      roles.forEach((r, i) => {
        console.log(`${i + 1}. ${r.is_primary ? '⭐ PRIMARY' : '  '} ${r.role_type ? r.role_type.toUpperCase() : 'UNKNOWN'}`);
        console.log(`   Company ID: ${r.company_id || 'N/A'}`);
        console.log(`   Created: ${r.created_at}`);
        console.log(`   Role: ${JSON.stringify(r)}`);
        console.log('');
      });
    } else {
      console.log('\n❌ No roles found in user_roles table\n');
    }

    // Also check user details
    const [user] = await db.query('SELECT * FROM unified_users WHERE id = 1033');
    if (user.length > 0) {
      console.log('📋 User Details:');
      console.log(`   ID: ${user[0].id}`);
      console.log(`   Email: ${user[0].email}`);
      console.log(`   Name: ${user[0].first_name} ${user[0].last_name}`);
      console.log(`   User Type: ${user[0].user_type}`);
      console.log(`   Bizoforce ID: ${user[0].bizoforce_user_id}`);
      console.log(`   Giglancer ID: ${user[0].giglancer_user_id}`);
      console.log(`   Screenly ID: ${user[0].screenly_user_id}`);
      console.log(`   Work.Bizoforce ID: ${user[0].work_user_id}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.end();
  }
}

checkUserRoles();
