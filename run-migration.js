const { unifiedDB } = require('./config/database');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  console.log('🔄 Running database migration...\n');

  try {
    // Read SQL file
    const sqlFile = path.join(__dirname, 'migrations', '01-create-unified-db.sql');
    let sql = fs.readFileSync(sqlFile, 'utf8');

    // Remove comments
    sql = sql.replace(/--.*$/gm, ''); // Remove single-line comments
    sql = sql.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments

    // Split SQL into individual statements (split by semicolon)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Found ${statements.length} SQL statements\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      try {
        await unifiedDB.query(statement);
        
        // Extract table name for display
        const tableMatch = statement.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?`?(\w+)`?/i);
        if (tableMatch) {
          console.log(`✅ Created table: ${tableMatch[1]}`);
        }
      } catch (error) {
        // Ignore "table already exists" errors
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
          const tableMatch = statement.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?`?(\w+)`?/i);
          if (tableMatch) {
            console.log(`⚠️  Table already exists: ${tableMatch[1]}`);
          }
        } else {
          console.error('❌ Error executing statement:', statement.substring(0, 150) + '...');
          console.error('Error:', error.message);
          throw error;
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');

    // Verify tables were created
    console.log('\n📊 Verifying database tables...');
    const [tables] = await unifiedDB.query('SHOW TABLES');
    
    const expectedTables = [
      'unified_users',
      'unified_companies',
      'company_users',
      'user_sessions',
      'platform_sync_log'
    ];

    console.log('\nCreated tables:');
    tables.forEach(row => {
      const tableName = Object.values(row)[0];
      const isExpected = expectedTables.includes(tableName);
      console.log(`  ${isExpected ? '✅' : '  '} ${tableName}`);
    });

    const missingTables = expectedTables.filter(
      table => !tables.some(row => Object.values(row)[0] === table)
    );

    if (missingTables.length > 0) {
      console.log('\n⚠️  Missing tables:', missingTables.join(', '));
    } else {
      console.log('\n✅ All expected tables exist!');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await unifiedDB.end();
  }
}

runMigration();
