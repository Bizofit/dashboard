/**
 * Migration Runner Script
 * Runs SQL migration files in the migrations/ directory
 */

const fs = require('fs').promises;
const path = require('path');
const { unifiedDB } = require('../config/database');

async function runMigrations() {
  try {
    console.log('🔄 Starting migrations...\n');
    
    const migrationsDir = path.join(__dirname, '../migrations');
    const files = await fs.readdir(migrationsDir);
    
    // Filter and sort SQL files
    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    if (sqlFiles.length === 0) {
      console.log('⚠️  No migration files found');
      return;
    }
    
    console.log(`📁 Found ${sqlFiles.length} migration files:\n`);
    
    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf8');
      
      console.log(`▶️  Running: ${file}`);
      
      // Split by semicolon and filter out empty statements
      const statements = sql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
      
      for (const statement of statements) {
        try {
          await unifiedDB.query(statement);
        } catch (error) {
          // Ignore "table already exists" errors
          if (!error.message.includes('already exists')) {
            throw error;
          }
        }
      }
      
      console.log(`✅ Completed: ${file}\n`);
    }
    
    console.log('🎉 All migrations completed successfully!\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    process.exit(0);
  }
}

runMigrations();
