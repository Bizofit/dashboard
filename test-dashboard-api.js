/**
 * Test Dashboard API with Session Authentication
 *
 * This script tests the new session-based dashboard implementation
 */

const API_BASE = "http://localhost:3006/api";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testDashboard() {
  log("\n🧪 Testing Session-Based Dashboard API\n", "cyan");

  let token = null;
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Test 1: Register a test user
    log("Test 1: Register Test User", "blue");
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `dashboard.test.${Date.now()}@example.com`,
        password: "Password123!",
        firstName: "Dashboard",
        lastName: "TestUser",
        userType: "company",
      }),
    });

    const registerData = await registerResponse.json();

    if (registerData.success) {
      log("✅ User registered successfully", "green");
      testsPassed++;
    } else {
      log(`❌ Registration failed: ${registerData.message}`, "red");
      testsFailed++;
      return;
    }

    // Test 2: Login with test user
    log("\nTest 2: Login to Get JWT Token", "blue");
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerData.data.email,
        password: "Password123!",
      }),
    });

    const loginData = await loginResponse.json();

    if (loginData.success && loginData.data.token) {
      token = loginData.data.token;
      log("✅ Login successful, JWT token received", "green");
      log(`   Token: ${token.substring(0, 30)}...`, "yellow");
      testsPassed++;
    } else {
      log(`❌ Login failed: ${loginData.message}`, "red");
      testsFailed++;
      return;
    }

    // Test 3: Access dashboard without token (should fail)
    log("\nTest 3: Access Dashboard Without Token (Should Fail)", "blue");
    const noTokenResponse = await fetch(`${API_BASE}/dashboard/stats`);
    const noTokenData = await noTokenResponse.json();

    if (noTokenResponse.status === 401 || !noTokenData.success) {
      log("✅ Correctly rejected unauthorized request", "green");
      testsPassed++;
    } else {
      log("❌ Should have rejected unauthorized request", "red");
      testsFailed++;
    }

    // Test 4: Access dashboard with token (should succeed)
    log("\nTest 4: Access Dashboard With Valid Token", "blue");
    const dashboardResponse = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const dashboardData = await dashboardResponse.json();

    if (dashboardData.success && dashboardData.data) {
      log("✅ Dashboard data fetched successfully", "green");
      log(`   User Type: ${dashboardData.data.userType}`, "yellow");
      log(
        `   User: ${dashboardData.data.user.firstName} ${dashboardData.data.user.lastName}`,
        "yellow"
      );
      log(`   Email: ${dashboardData.data.user.email}`, "yellow");
      testsPassed++;
    } else {
      log(`❌ Failed to fetch dashboard: ${dashboardData.message}`, "red");
      testsFailed++;
    }

    // Test 5: Verify dashboard data structure
    log("\nTest 5: Verify Dashboard Data Structure", "blue");
    const requiredFields = ["userType", "user", "stats", "activities"];
    const missingFields = requiredFields.filter(
      (field) => !(field in dashboardData.data)
    );

    if (missingFields.length === 0) {
      log("✅ All required fields present", "green");
      log(`   Fields: ${requiredFields.join(", ")}`, "yellow");
      testsPassed++;
    } else {
      log(`❌ Missing fields: ${missingFields.join(", ")}`, "red");
      testsFailed++;
    }

    // Test 6: Verify stats object
    log("\nTest 6: Verify Stats Object", "blue");
    if (
      dashboardData.data.stats &&
      typeof dashboardData.data.stats === "object"
    ) {
      log("✅ Stats object present", "green");
      const statKeys = Object.keys(dashboardData.data.stats);
      log(`   Stats available: ${statKeys.length} metrics`, "yellow");
      statKeys.forEach((key) => {
        log(`   - ${key}: ${dashboardData.data.stats[key]}`, "yellow");
      });
      testsPassed++;
    } else {
      log("❌ Stats object missing or invalid", "red");
      testsFailed++;
    }

    // Test 7: Get user info endpoint
    log("\nTest 7: Get Current User Info", "blue");
    const userResponse = await fetch(`${API_BASE}/dashboard/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = await userResponse.json();

    if (userData.success && userData.data) {
      log("✅ User info fetched successfully", "green");
      log(`   User ID: ${userData.data.userId}`, "yellow");
      log(`   Email: ${userData.data.email}`, "yellow");
      testsPassed++;
    } else {
      log(`❌ Failed to fetch user info: ${userData.message}`, "red");
      testsFailed++;
    }

    // Test 8: Test with invalid token (should fail)
    log("\nTest 8: Access With Invalid Token (Should Fail)", "blue");
    const invalidTokenResponse = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: { Authorization: "Bearer invalid.token.here" },
    });

    if (invalidTokenResponse.status === 401) {
      log("✅ Correctly rejected invalid token", "green");
      testsPassed++;
    } else {
      log("❌ Should have rejected invalid token", "red");
      testsFailed++;
    }
  } catch (error) {
    log(`\n❌ Error during testing: ${error.message}`, "red");
    testsFailed++;
  }

  // Summary
  log("\n" + "=".repeat(50), "cyan");
  log("TEST SUMMARY", "cyan");
  log("=".repeat(50), "cyan");
  log(`✅ Tests Passed: ${testsPassed}`, "green");
  log(`❌ Tests Failed: ${testsFailed}`, "red");
  log(`📊 Total Tests: ${testsPassed + testsFailed}`, "blue");

  if (testsFailed === 0) {
    log("\n🎉 All tests passed! Dashboard API is working correctly.", "green");
  } else {
    log("\n⚠️  Some tests failed. Please check the errors above.", "yellow");
  }
}

// Run tests
testDashboard().catch((error) => {
  log(`\n💥 Fatal error: ${error.message}`, "red");
  process.exit(1);
});
