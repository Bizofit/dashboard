#!/usr/bin/env node
/**
 * Test Platform Sync for Current User
 * Tests the platform ID sync for user 1008 (bizofitinfo@gmail.com)
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const unifiedPool = mysql.createPool({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
    connectionLimit: 10
  });

  try {
    const testEmail = 'bizofitinfo@gmail.com';
    console.log(`🧪 Testing platform sync for ${testEmail}...\n`);
    
    // Check BEFORE
    console.log('📋 BEFORE SYNC:');
    const [beforeUsers] = await unifiedPool.execute(
      'SELECT id, email, bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id FROM unified_users WHERE email = ?',
      [testEmail]
    );
    
    if (beforeUsers.length === 0) {
      console.log('❌ User not found!');
      return;
    }
    
    const beforeUser = beforeUsers[0];
    console.log(`   Bizoforce ID: ${beforeUser.bizoforce_user_id || 'NULL'}`);
    console.log(`   Giglancer ID: ${beforeUser.giglancer_user_id || 'NULL'}`);
    console.log(`   Screenly ID: ${beforeUser.screenly_user_id || 'NULL'}`);
    console.log(`   Work ID: ${beforeUser.work_user_id || 'NULL'}`);
    
    // Import and run sync
    console.log('\n🔄 RUNNING SYNC...');
    const platformSync = await import('../services/platform-id-sync-service.js');
    const syncResult = await platformSync.default.syncUserPlatformIds(testEmail);
    
    // Check AFTER
    console.log('\n✅ AFTER SYNC:');
    const [afterUsers] = await unifiedPool.execute(
      'SELECT id, email, bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id FROM unified_users WHERE email = ?',
      [testEmail]
    );
    
    const afterUser = afterUsers[0];
    console.log(`   Bizoforce ID: ${afterUser.bizoforce_user_id || 'NULL'} ${afterUser.bizoforce_user_id !== beforeUser.bizoforce_user_id ? '✅ UPDATED' : ''}`);
    console.log(`   Giglancer ID: ${afterUser.giglancer_user_id || 'NULL'} ${afterUser.giglancer_user_id !== beforeUser.giglancer_user_id ? '✅ UPDATED' : ''}`);
    console.log(`   Screenly ID: ${afterUser.screenly_user_id || 'NULL'} ${afterUser.screenly_user_id !== beforeUser.screenly_user_id ? '✅ UPDATED' : ''}`);
    console.log(`   Work ID: ${afterUser.work_user_id || 'NULL'} ${afterUser.work_user_id !== beforeUser.work_user_id ? '✅ UPDATED' : ''}`);
    
    console.log('\n📊 SYNC RESULT:');
    console.log(`   Success: ${syncResult.success}`);
    console.log(`   Updates: ${JSON.stringify(syncResult.updates, null, 2)}`);
    
    // Test platform data retrieval
    console.log('\n🔍 TESTING PLATFORM DATA RETRIEVAL...');
    const platformData = await platformSync.default.getUserPlatformData(beforeUser.id);
    
    console.log('📦 Platform Data:');
    console.log(`   Bizoforce: ${platformData.bizoforce ? `${platformData.bizoforce.productCount} products, ${platformData.bizoforce.listingCount} listings` : 'No data'}`);
    console.log(`   Giglancer: ${platformData.giglancer ? `${platformData.giglancer.jobCount} jobs` : 'No data'}`);
    console.log(`   Screenly: ${platformData.screenly ? `Company: ${platformData.screenly.companyName || 'Unknown'}` : 'No data'}`);
    console.log(`   Work: ${platformData.work ? `Company ID: ${platformData.work.companyId}` : 'No data'}`);
    
    console.log('\n🎉 Test complete! The user now has comprehensive platform linkage.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await unifiedPool.end();
  }
}

main();