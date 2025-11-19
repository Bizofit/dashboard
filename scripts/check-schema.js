require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const db = await mysql.createConnection({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME
  });

  const [cols] = await db.query('DESCRIBE unified_users');
  console.log('\n📋 Columns in unified_users table:\n');
  cols.forEach(c => console.log(`  - ${c.Field} (${c.Type})`));

  await db.end();
})();
