require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function checkPassword() {
  const db = await mysql.createConnection({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME
  });

  try {
    const [user] = await db.query(
      'SELECT id, email, password_hash FROM unified_users WHERE email = ?',
      ['sudh013@gmail.com']
    );

    if (user.length > 0) {
      console.log('\n✅ User found:');
      console.log('   Email:', user[0].email);
      console.log('   Has password:', user[0].password_hash ? 'YES' : 'NO');
      
      if (user[0].password_hash) {
        console.log('   Password hash:', user[0].password_hash.substring(0, 30) + '...');
        
        // Test common passwords
        const testPasswords = ['test123', 'password123', 'admin123', '123456'];
        console.log('\n🔍 Testing common passwords...');
        
        for (const pwd of testPasswords) {
          const isMatch = await bcrypt.compare(pwd, user[0].password_hash);
          console.log(`   ${pwd}: ${isMatch ? '✅ MATCH' : '❌'}`);
        }
        
        // Set a known password
        console.log('\n🔐 Setting new password: "test123"');
        const newHash = await bcrypt.hash('test123', 10);
        await db.query(
          'UPDATE unified_users SET password_hash = ? WHERE id = ?',
          [newHash, user[0].id]
        );
        console.log('✅ Password updated successfully!');
      }
    } else {
      console.log('❌ User not found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.end();
  }
}

checkPassword();
