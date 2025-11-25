#!/usr/bin/env node
/**
 * Sync All Users Platform IDs
 * This script ensures ALL users have correct platform IDs populated
 * Run this to fix the entire codebase for all users
 */

import dotenv from 'dotenv';
dotenv.config();

// Use ES modules syntax since package.json has "type": "module"
async function main() {
  try {
    // Dynamic import since we're using ES modules
    const platformSync = await import('../services/platform-id-sync-service.js');
    
    console.log('🚀 Starting comprehensive platform ID sync for ALL users...\n');
    
    // Sync all users
    const results = await platformSync.default.syncAllUsersPlatformIds();
    
    console.log('\n📊 SYNC RESULTS:');
    console.log(`   Total Users: ${results.total}`);
    console.log(`   Successfully Synced: ${results.synced}`);
    console.log(`   Errors: ${results.errors}`);
    
    if (results.errors > 0) {
      console.log('\n❌ Users with Errors:');
      results.details
        .filter(d => !d.success)
        .forEach(detail => {
          console.log(`   - ${detail.email}: ${detail.error}`);
        });
    }
    
    console.log('\n✅ Users with Updates:');
    const usersWithUpdates = results.details.filter(d => d.success && Object.keys(d.updates || {}).length > 0);
    if (usersWithUpdates.length > 0) {
      usersWithUpdates.forEach(detail => {
        const updatesList = Object.entries(detail.updates).map(([key, value]) => `${key}=${value}`).join(', ');
        console.log(`   - ${detail.email}: ${updatesList}`);
      });
    } else {
      console.log('   (No users needed platform ID updates)');
    }
    
    console.log('\n🎉 Platform ID sync complete! All users now have correct platform linkage.');
    
    process.exit(0);
    
  } catch (error) {
    console.error('💥 Fatal error during platform ID sync:', error);
    process.exit(1);
  }
}

main();