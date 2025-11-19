require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const db = await mysql.createConnection({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME
  });

  const [users] = await db.query(`
    SELECT 
      id, 
      email, 
      first_name, 
      last_name, 
      user_type, 
      bizoforce_user_id, 
      giglancer_user_id, 
      screenly_user_id, 
      work_user_id, 
      needsRoleSelection,
      migrated_from,
      migration_date
    FROM unified_users 
    ORDER BY id DESC 
    LIMIT 20
  `);

  console.log('\n📊 LAST 20 MIGRATED USERS:\n');
  users.forEach(u => {
    const platforms = [];
    if (u.bizoforce_user_id) platforms.push('Bizo');
    if (u.giglancer_user_id) platforms.push('Gig');
    if (u.screenly_user_id) platforms.push('Screen');
    if (u.work_user_id) platforms.push('Work');
    
    console.log(`${u.id}. ${u.email}`);
    console.log(`   Name: ${u.first_name} ${u.last_name}`);
    console.log(`   Type: ${u.user_type} | NeedsRolePrompt: ${u.needsRoleSelection}`);
    console.log(`   Migrated from: ${u.migrated_from} | Date: ${u.migration_date}`);
    console.log(`   Platforms: [${platforms.join(', ')}]`);
    console.log('');
  });

  await db.end();
})();
