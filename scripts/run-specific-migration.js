/**
 * Run Specific Migration Script
 * Usage: node scripts/run-specific-migration.js <migration-file.sql>
 */

const fs = require('fs').promises;
const path = require('path');
const { unifiedDB } = require('../config/database');

async function runSpecificMigration(filename) {
  try {
    console.log(`🔄 Running migration: ${filename}\n`);
    
    const filePath = path.join(__dirname, '../migrations', filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      console.error(`❌ Migration file not found: ${filename}`);
      process.exit(1);
    }
    
    const sql = await fs.readFile(filePath, 'utf8');
    
    // Split by semicolon and filter out empty statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements\n`);
    
    for (let i = 0; i < statements.length; i++) {
      console.log(`▶️  Executing statement ${i + 1}/${statements.length}...`);
      try {
        await unifiedDB.query(statements[i]);
        console.log(`✅ Statement ${i + 1} completed\n`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Table/column already exists, skipping...\n`);
        } else {
          throw error;
        }
      }
    }
    
    console.log(`🎉 Migration completed: ${filename}\n`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    process.exit(0);
  }
}

// Get filename from command line args
const filename = process.argv[2];

if (!filename) {
  console.error('❌ Usage: node run-specific-migration.js <migration-file.sql>');
  process.exit(1);
}

runSpecificMigration(filename);
