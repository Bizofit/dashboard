/**
 * Test /api/auth/profile endpoint to see what role structure is returned
 */

import { unifiedDB } from './server/db';
import { userRoles } from './shared/schema';
import { eq } from 'drizzle-orm';

// First, login to get a token
async function testProfileAPI() {
  try {
    console.log('🔐 Logging in with sudh013@gmail.com...');
    
    // This is a Google OAuth user, so we can't test with password login
    // Instead, let's query the database directly to see what Drizzle returns
    
    console.log('📊 Querying user_roles for user_id 1033...');
    const roles = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, 1033));
    
    console.log('✅ Raw Drizzle ORM result:');
    console.log(JSON.stringify(roles, null, 2));
    
    console.log('\n📋 Role object structure:');
    if (roles.length > 0) {
      const role = roles[0];
      console.log('Keys:', Object.keys(role));
      console.log('role field:', role.role);
      console.log('isPrimary field:', role.isPrimary);
      console.log('is_primary field:', role.is_primary);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testProfileAPI();
