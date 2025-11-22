import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './shared/schema.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.UNIFIED_DB_HOST || 'localhost',
    port: parseInt(process.env.UNIFIED_DB_PORT || '3306'),
    user: process.env.UNIFIED_DB_USER || 'root',
    password: process.env.UNIFIED_DB_PASS || '',
    database: process.env.UNIFIED_DB_NAME || 'bizoforce_newdashboard',
  },
});
