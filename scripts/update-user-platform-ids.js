import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  console.log('🔧 Updating Unified User 1008 with Platform IDs\n');

  const unifiedPool = mysql.createPool({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  try {
    // Update user 1008 with platform IDs
    const [result] = await unifiedPool.execute(
      `UPDATE unified_users 
       SET giglancer_user_id = ?, screenly_user_id = ?
       WHERE id = 1008`,
      [38, 18]  // Giglancer ID: 38, Screenly ID: 18
    );

    console.log(`✅ Updated user 1008:`);
    console.log(`   Rows affected: ${result.affectedRows}`);
    console.log(`   Giglancer ID: 38`);
    console.log(`   Screenly ID: 18`);

    // Verify the update
    const [user] = await unifiedPool.execute(
      `SELECT id, email, first_name, last_name,
              bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id
       FROM unified_users WHERE id = 1008`
    );

    console.log('\n📋 Updated User Record:');
    console.log(JSON.stringify(user[0], null, 2));

  } catch (err) {
    console.error('❌ Error updating user:', err.message);
  }

  await unifiedPool.end();
  console.log('\n✅ Update complete!');
})();