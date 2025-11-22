import { unifiedDB } from './server/db.js';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, 'migrations');

async function runMigrations() {
  try {
    // Create migrations directory if it doesn't exist
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      console.log('✅ Created migrations directory');
    }

    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
    
    if (files.length === 0) {
      console.log('📝 No migration files found. Run: npm run db:generate');
      return;
    }

    console.log(`📦 Found ${files.length} migration files`);

    for (const file of files.sort()) {
      console.log(`🔄 Running migration: ${file}`);
      const content = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      
      // Split by semicolons but handle multi-line statements
      const statements = content
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        try {
          await unifiedDB.execute(sql.raw(statement));
        } catch (error) {
          console.error(`❌ Error in statement:`, statement.substring(0, 100));
          throw error;
        }
      }
      
      console.log(`✅ Completed: ${file}`);
    }

    console.log('✅ All migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
