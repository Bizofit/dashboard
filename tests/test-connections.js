/**
 * Test Database Connections
 * Tests all 5 database connections
 */

const { testConnections, closeConnections } = require('../config/database');

async function test() {
  try {
    console.log('🧪 Testing all database connections...\n');
    const results = await testConnections();
    console.log('\n📊 Connection Results:', results);
    console.log('\n✨ All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await closeConnections();
    process.exit(0);
  }
}

test();
