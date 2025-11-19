require('dotenv').config();
const mysql = require('mysql2/promise');

async function createTestUserRoles() {
  console.log('\n🔄 Creating roles for test user sudh013@gmail.com (ID: 1033)\n');

  try {
    const connection = await mysql.createConnection({
      host: process.env.UNIFIED_DB_HOST,
      user: process.env.UNIFIED_DB_USER,
      password: process.env.UNIFIED_DB_PASS,
      database: process.env.UNIFIED_DB_NAME
    });

    // Based on platform data:
    // Bizoforce: Vendor
    // Giglancer: Employer (2 projects) + Freelancer (12 bids)
    // Screenly: Admin
    // Work: Team Member/Admin (company_id 26)

    const roles = [
      { role: 'company_admin', company_id: 26, is_primary: 1, source_platform: 'work' },
      { role: 'vendor', company_id: null, is_primary: 0, source_platform: 'bizoforce' },
      { role: 'freelancer', company_id: null, is_primary: 0, source_platform: 'giglancer' },
      { role: 'team_member', company_id: 26, is_primary: 0, source_platform: 'work' }
    ];

    console.log('📝 Inserting roles:\n');
    
    for (const roleData of roles) {
      const [result] = await connection.query(`
        INSERT INTO user_roles (user_id, role, company_id, is_primary, source_platform, created_at, last_used_at)
        VALUES (1033, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE last_used_at = NOW()
      `, [roleData.role, roleData.company_id, roleData.is_primary, roleData.source_platform]);
      
      console.log(`  ✅ ${roleData.role}${roleData.company_id ? ` (company ${roleData.company_id})` : ''} - from ${roleData.source_platform}`);
    }

    // Update current_role in unified_users
    await connection.query(`
      UPDATE unified_users 
      SET current_role = 'company_admin', current_company_id = 26
      WHERE id = 1033
    `);

    console.log('\n✅ Updated current_role to company_admin\n');

    // Query the user with roles
    const [users] = await connection.query(`
      SELECT * FROM user_with_roles WHERE id = 1033
    `);

    console.log('📊 User profile with roles:');
    console.log('─────────────────────────────────────────');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Current Role: ${user.current_role}${user.current_company_id ? ` (company ${user.current_company_id})` : ''}`);
      console.log(`Available Roles: ${user.available_roles || 'None'}`);
      console.log(`Role Count: ${user.role_count}`);
    });
    console.log('─────────────────────────────────────────\n');

    await connection.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createTestUserRoles();
