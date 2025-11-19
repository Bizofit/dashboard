require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function runSpecificMigration(migrationFile) {
  // Use path relative to project root, not scripts folder
  const filePath = path.join(__dirname, '..', migrationFile);
  
  console.log(`\n🔄 Running migration: ${migrationFile}\n`);

  try {
    // Read migration file
    const sql = await fs.readFile(filePath, 'utf8');
    
    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.UNIFIED_DB_HOST,
      user: process.env.UNIFIED_DB_USER,
      password: process.env.UNIFIED_DB_PASS,
      database: process.env.UNIFIED_DB_NAME,
      multipleStatements: true
    });

    // Execute migration
    console.log('📝 Executing SQL statements...\n');
    await connection.query(sql);
    
    console.log('✅ Migration completed successfully!\n');
    
    // Verify new tables
    const [tables] = await connection.query(`
      SHOW TABLES LIKE '%role%'
    `);
    
    console.log('📊 Role-related tables:');
    tables.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`  ✅ ${tableName}`);
    });

    await connection.end();
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the migration
const migrationFile = process.argv[2] || 'migrations/03-add-multi-role-support.sql';
runSpecificMigration(migrationFile);
