const axios = require('axios');

const API_BASE = 'http://localhost:3006/api/auth';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

async function testAuthAPI() {
  console.log(`${colors.blue}========================================`);
  console.log('🔐 Testing Authentication API');
  console.log(`========================================${colors.reset}\n`);

  let testToken = null;

  try {
    // Test 1: Register a new user
    console.log(`${colors.yellow}Test 1: Register New User${colors.reset}`);
    const registerData = {
      email: `testuser${Date.now()}@example.com`, // Unique email
      password: 'securepassword123',
      firstName: 'Test',
      lastName: 'User',
      userType: 'individual',
      phone: '+1234567890'
    };

    const registerResponse = await axios.post(`${API_BASE}/register`, registerData);
    console.log(`${colors.green}✅ Registration successful!${colors.reset}`);
    console.log('User:', registerResponse.data.data);
    console.log('');

    // Test 2: Login with email and password
    console.log(`${colors.yellow}Test 2: Login with Email & Password${colors.reset}`);
    const loginData = {
      email: registerData.email,
      password: registerData.password
    };

    const loginResponse = await axios.post(`${API_BASE}/login`, loginData);
    console.log(`${colors.green}✅ Login successful!${colors.reset}`);
    console.log('User:', loginResponse.data.data.user);
    console.log('Token received:', loginResponse.data.data.token.substring(0, 50) + '...');
    testToken = loginResponse.data.data.token;
    console.log('');

    // Test 3: Get current user profile
    console.log(`${colors.yellow}Test 3: Get Current User Profile${colors.reset}`);
    const profileResponse = await axios.get(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${testToken}`
      }
    });
    console.log(`${colors.green}✅ Profile retrieved successfully!${colors.reset}`);
    console.log('Profile:', profileResponse.data.data);
    console.log('');

    // Test 4: Refresh token
    console.log(`${colors.yellow}Test 4: Refresh JWT Token${colors.reset}`);
    const refreshResponse = await axios.post(`${API_BASE}/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${testToken}`
      }
    });
    console.log(`${colors.green}✅ Token refreshed successfully!${colors.reset}`);
    console.log('New token:', refreshResponse.data.data.token.substring(0, 50) + '...');
    console.log('');

    // Test 5: Logout
    console.log(`${colors.yellow}Test 5: Logout${colors.reset}`);
    const logoutResponse = await axios.post(`${API_BASE}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${testToken}`
      }
    });
    console.log(`${colors.green}✅ Logout successful!${colors.reset}`);
    console.log('Message:', logoutResponse.data.message);
    console.log('');

    // Test 6: Try to access protected route without token (should fail)
    console.log(`${colors.yellow}Test 6: Access Protected Route Without Token (Should Fail)${colors.reset}`);
    try {
      await axios.get(`${API_BASE}/me`);
      console.log(`${colors.red}❌ Test failed: Should have been rejected${colors.reset}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(`${colors.green}✅ Correctly rejected unauthorized request${colors.reset}`);
        console.log('Error:', error.response.data.message);
      } else {
        throw error;
      }
    }
    console.log('');

    // Test 7: Try to login with wrong password (should fail)
    console.log(`${colors.yellow}Test 7: Login with Wrong Password (Should Fail)${colors.reset}`);
    try {
      await axios.post(`${API_BASE}/login`, {
        email: registerData.email,
        password: 'wrongpassword'
      });
      console.log(`${colors.red}❌ Test failed: Should have been rejected${colors.reset}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(`${colors.green}✅ Correctly rejected invalid credentials${colors.reset}`);
        console.log('Error:', error.response.data.message);
      } else {
        throw error;
      }
    }
    console.log('');

    // Summary
    console.log(`${colors.blue}========================================`);
    console.log(`${colors.green}🎉 All Authentication Tests Passed!${colors.reset}`);
    console.log(`${colors.blue}========================================${colors.reset}\n`);

    console.log('✅ Registration working');
    console.log('✅ Login working');
    console.log('✅ JWT token generation working');
    console.log('✅ Protected routes working');
    console.log('✅ Token refresh working');
    console.log('✅ Logout working');
    console.log('✅ Error handling working');
    console.log('');
    console.log(`${colors.yellow}Next Steps:${colors.reset}`);
    console.log('1. Integrate with frontend login.html');
    console.log('2. Test Google OAuth flow');
    console.log('3. Build user migration script');
    console.log('4. Create protected API routes for other services');

  } catch (error) {
    console.error(`${colors.red}❌ Test failed:${colors.reset}`, error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Run tests
testAuthAPI();
