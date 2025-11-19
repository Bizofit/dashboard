require('dotenv').config();
const { testConnections, closeConnections } = require('./config/database');

/**
 * Database Connection Test Script
 * Run this to verify all database credentials are correct
 * 
 * Usage: node test-db.js
 */

async function runTests() {
  console.log('\n========================================');
  console.log('  DATABASE CONNECTION TEST');
  console.log('========================================\n');

  try {
    // Test all connections
    const results = await testConnections();
    
    // Summary
    console.log('========================================');
    console.log('  TEST SUMMARY');
    console.log('========================================\n');
    
    console.log('Connection Status:');
    console.log(`  • Unified DB:     ${results.unified ? '✅ Connected' : '❌ Failed'}`);
    console.log(`  • Bizoforce:      ${results.bizoforce ? '✅ Connected' : '❌ Failed'}`);
    console.log(`  • Giglancer:      ${results.giglancer ? '✅ Connected' : '❌ Failed'}`);
    console.log(`  • Screenly:       ${results.screenly ? '✅ Connected' : '❌ Failed'}`);
    console.log(`  • Work.Bizoforce: ${results.work ? '✅ Connected' : '❌ Failed'}`);
    
    const successCount = Object.values(results).filter(Boolean).length;
    const totalCount = Object.keys(results).length;
    
    console.log(`\nTotal: ${successCount}/${totalCount} databases connected\n`);
    
    if (successCount === 0) {
      console.log('⚠️  No databases connected!');
      console.log('   Please check your .env file and update database credentials.\n');
    } else if (successCount < totalCount) {
      console.log('⚠️  Some databases failed to connect.');
      console.log('   Update credentials in .env for failed connections.\n');
    } else {
      console.log('🎉 All databases connected successfully!');
      console.log('   You can now start the server with: npm run dev\n');
    }
    
    // Close connections
    await closeConnections();
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
runTests();
