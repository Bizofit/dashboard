import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  console.log('🔍 Checking Giglancer Users Table Structure\n');

  const giglancerPool = mysql.createPool({
    host: process.env.GIGLANCER_DB_HOST,
    user: process.env.GIGLANCER_DB_USER,
    password: process.env.GIGLANCER_DB_PASS,
    database: process.env.GIGLANCER_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  try {
    // Check table structure
    const [columns] = await giglancerPool.execute('DESCRIBE users');
    
    console.log('📋 Giglancer users table columns:');
    columns.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type})`);
    });

    console.log('\n🔍 Searching for bizofitinfo@gmail.com user:');
    
    // Search by email with correct columns
    const [users] = await giglancerPool.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      ['bizofitinfo@gmail.com']
    );

    if (users.length > 0) {
      console.log('✅ Found user in Giglancer:');
      console.log(JSON.stringify(users[0], null, 2));
    } else {
      console.log('❌ User not found in Giglancer');
      
      // Check similar emails
      const [similar] = await giglancerPool.execute(
        `SELECT id, email, first_name, last_name FROM users 
         WHERE email LIKE '%bizofit%' OR email LIKE '%bala%' 
         LIMIT 5`
      );
      
      console.log('\n🔍 Similar emails:');
      similar.forEach(user => {
        console.log(`   - ID: ${user.id}, Email: ${user.email}, Name: ${user.first_name} ${user.last_name}`);
      });
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  await giglancerPool.end();
  console.log('\n✅ Complete!');
})();