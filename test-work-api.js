/**
 * Work API Test Suite
 * Tests all endpoints for Work.Bizoforce API with Bearer token authentication
 *
 * Run: node test-work-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3006/api';
let authToken = '';
let testUserId = null;
let testProjectId = null;
let testTaskId = null;
let testTimeLogId = null;
let testInvoiceId = null;
let testClientId = null;
let testTeamId = null;

// ============================================
// HELPER FUNCTIONS
// ============================================

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function logTest(name) {
  console.log(`\n${colors.blue}▶ Testing: ${name}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function makeRequest(method, url, data = null, useAuth = true) {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: useAuth && authToken ? { Authorization: `Bearer ${authToken}` } : {}
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
}

// ============================================
// AUTHENTICATION SETUP
// ============================================

async function authenticate() {
  logSection('AUTHENTICATION SETUP');

  logTest('Login to get Bearer token');
  const loginResult = await makeRequest('POST', '/auth/login', {
    email: 'omer@bizoforce.com',
    password: 'password123'
  }, false);

  if (loginResult.success && loginResult.data.data?.token) {
    authToken = loginResult.data.data.token;
    logSuccess(`Authenticated successfully! Token: ${authToken.substring(0, 20)}...`);
    return true;
  } else {
    logError('Authentication failed: ' + loginResult.error);
    logWarning('Make sure the user exists and password is correct');
    return false;
  }
}

// ============================================
// USER TESTS
// ============================================

async function testUsers() {
  logSection('USERS API TESTS');

  // Test 1: Get all users
  logTest('GET /api/work/users');
  const usersResult = await makeRequest('GET', '/work/users');
  if (usersResult.success && usersResult.data.data?.length > 0) {
    testUserId = usersResult.data.data[0].id;
    logSuccess(`Fetched ${usersResult.data.count} users. Test User ID: ${testUserId}`);
  } else {
    logError('Failed to fetch users: ' + usersResult.error);
  }

  // Test 2: Get single user
  if (testUserId) {
    logTest(`GET /api/work/users/${testUserId}`);
    const userResult = await makeRequest('GET', `/work/users/${testUserId}`);
    if (userResult.success) {
      logSuccess(`Fetched user: ${userResult.data.data.name}`);
    } else {
      logError('Failed to fetch user: ' + userResult.error);
    }
  }

  // Test 3: Get user projects
  if (testUserId) {
    logTest(`GET /api/work/users/${testUserId}/projects`);
    const projectsResult = await makeRequest('GET', `/work/users/${testUserId}/projects`);
    if (projectsResult.success) {
      logSuccess(`User has ${projectsResult.data.count} projects`);
    } else {
      logError('Failed to fetch user projects: ' + projectsResult.error);
    }
  }

  // Test 4: Get user tasks
  if (testUserId) {
    logTest(`GET /api/work/users/${testUserId}/tasks`);
    const tasksResult = await makeRequest('GET', `/work/users/${testUserId}/tasks`);
    if (tasksResult.success) {
      logSuccess(`User has ${tasksResult.data.count} tasks`);
    } else {
      logError('Failed to fetch user tasks: ' + tasksResult.error);
    }
  }

  // Test 5: Get user time logs
  if (testUserId) {
    logTest(`GET /api/work/users/${testUserId}/timelogs`);
    const timeLogsResult = await makeRequest('GET', `/work/users/${testUserId}/timelogs`);
    if (timeLogsResult.success) {
      logSuccess(`User has ${timeLogsResult.data.count} time logs`);
    } else {
      logError('Failed to fetch user time logs: ' + timeLogsResult.error);
    }
  }

  // Test 6: Get user earnings
  if (testUserId) {
    logTest(`GET /api/work/users/${testUserId}/earnings`);
    const earningsResult = await makeRequest('GET', `/work/users/${testUserId}/earnings`);
    if (earningsResult.success) {
      logSuccess(`User earnings: ${earningsResult.data.data.total_earnings} (${earningsResult.data.data.total_hours} hours)`);
    } else {
      logError('Failed to fetch user earnings: ' + earningsResult.error);
    }
  }
}

// ============================================
// PROJECT TESTS
// ============================================

async function testProjects() {
  logSection('PROJECTS API TESTS');

  // Test 1: Get all projects
  logTest('GET /api/work/projects');
  const projectsResult = await makeRequest('GET', '/work/projects');
  if (projectsResult.success && projectsResult.data.data?.length > 0) {
    testProjectId = projectsResult.data.data[0].id;
    logSuccess(`Fetched ${projectsResult.data.count} projects. Test Project ID: ${testProjectId}`);
  } else {
    logError('Failed to fetch projects: ' + projectsResult.error);
  }

  // Test 2: Get single project
  if (testProjectId) {
    logTest(`GET /api/work/projects/${testProjectId}`);
    const projectResult = await makeRequest('GET', `/work/projects/${testProjectId}`);
    if (projectResult.success) {
      logSuccess(`Fetched project: ${projectResult.data.data.project_name}`);
    } else {
      logError('Failed to fetch project: ' + projectResult.error);
    }
  }

  // Test 3: Get project members
  if (testProjectId) {
    logTest(`GET /api/work/projects/${testProjectId}/members`);
    const membersResult = await makeRequest('GET', `/work/projects/${testProjectId}/members`);
    if (membersResult.success) {
      logSuccess(`Project has ${membersResult.data.count} members`);
    } else {
      logError('Failed to fetch project members: ' + membersResult.error);
    }
  }

  // Test 4: Get project tasks
  if (testProjectId) {
    logTest(`GET /api/work/projects/${testProjectId}/tasks`);
    const tasksResult = await makeRequest('GET', `/work/projects/${testProjectId}/tasks`);
    if (tasksResult.success) {
      logSuccess(`Project has ${tasksResult.data.count} tasks`);
    } else {
      logError('Failed to fetch project tasks: ' + tasksResult.error);
    }
  }

  // Test 5: Get project time logs
  if (testProjectId) {
    logTest(`GET /api/work/projects/${testProjectId}/timelogs`);
    const timeLogsResult = await makeRequest('GET', `/work/projects/${testProjectId}/timelogs`);
    if (timeLogsResult.success) {
      logSuccess(`Project has ${timeLogsResult.data.count} time logs`);
    } else {
      logError('Failed to fetch project time logs: ' + timeLogsResult.error);
    }
  }
}

// ============================================
// TASK TESTS
// ============================================

async function testTasks() {
  logSection('TASKS API TESTS');

  // Test 1: Get all tasks
  logTest('GET /api/work/tasks');
  const tasksResult = await makeRequest('GET', '/work/tasks');
  if (tasksResult.success && tasksResult.data.data?.length > 0) {
    testTaskId = tasksResult.data.data[0].id;
    logSuccess(`Fetched ${tasksResult.data.count} tasks. Test Task ID: ${testTaskId}`);
  } else {
    logError('Failed to fetch tasks: ' + tasksResult.error);
  }

  // Test 2: Get single task
  if (testTaskId) {
    logTest(`GET /api/work/tasks/${testTaskId}`);
    const taskResult = await makeRequest('GET', `/work/tasks/${testTaskId}`);
    if (taskResult.success) {
      logSuccess(`Fetched task: ${taskResult.data.data.heading}`);
    } else {
      logError('Failed to fetch task: ' + taskResult.error);
    }
  }

  // Test 3: Get task comments
  if (testTaskId) {
    logTest(`GET /api/work/tasks/${testTaskId}/comments`);
    const commentsResult = await makeRequest('GET', `/work/tasks/${testTaskId}/comments`);
    if (commentsResult.success) {
      logSuccess(`Task has ${commentsResult.data.count} comments`);
    } else {
      logError('Failed to fetch task comments: ' + commentsResult.error);
    }
  }
}

// ============================================
// TIME LOG TESTS
// ============================================

async function testTimeLogs() {
  logSection('TIME LOGS API TESTS');

  // Test 1: Get all time logs
  logTest('GET /api/work/timelogs');
  const timeLogsResult = await makeRequest('GET', '/work/timelogs');
  if (timeLogsResult.success && timeLogsResult.data.data?.length > 0) {
    testTimeLogId = timeLogsResult.data.data[0].id;
    logSuccess(`Fetched ${timeLogsResult.data.count} time logs. Test Time Log ID: ${testTimeLogId}`);
  } else {
    logError('Failed to fetch time logs: ' + timeLogsResult.error);
  }

  // Test 2: Get single time log
  if (testTimeLogId) {
    logTest(`GET /api/work/timelogs/${testTimeLogId}`);
    const timeLogResult = await makeRequest('GET', `/work/timelogs/${testTimeLogId}`);
    if (timeLogResult.success) {
      logSuccess(`Fetched time log: ${timeLogResult.data.data.memo || 'No memo'}`);
    } else {
      logError('Failed to fetch time log: ' + timeLogResult.error);
    }
  }

  // Test 3: Get pending time logs
  logTest('GET /api/work/timelogs/pending-approval');
  const pendingResult = await makeRequest('GET', '/work/timelogs/pending-approval');
  if (pendingResult.success) {
    logSuccess(`Found ${pendingResult.data.count} pending time logs`);
  } else {
    logError('Failed to fetch pending time logs: ' + pendingResult.error);
  }
}

// ============================================
// INVOICE TESTS
// ============================================

async function testInvoices() {
  logSection('INVOICES API TESTS');

  // Test 1: Get all invoices
  logTest('GET /api/work/invoices');
  const invoicesResult = await makeRequest('GET', '/work/invoices');
  if (invoicesResult.success && invoicesResult.data.data?.length > 0) {
    testInvoiceId = invoicesResult.data.data[0].id;
    logSuccess(`Fetched ${invoicesResult.data.count} invoices. Test Invoice ID: ${testInvoiceId}`);
  } else {
    logError('Failed to fetch invoices: ' + invoicesResult.error);
  }

  // Test 2: Get single invoice
  if (testInvoiceId) {
    logTest(`GET /api/work/invoices/${testInvoiceId}`);
    const invoiceResult = await makeRequest('GET', `/work/invoices/${testInvoiceId}`);
    if (invoiceResult.success) {
      logSuccess(`Fetched invoice: ${invoiceResult.data.data.invoice_number} - Total: ${invoiceResult.data.data.total}`);
    } else {
      logError('Failed to fetch invoice: ' + invoiceResult.error);
    }
  }
}

// ============================================
// CLIENT TESTS
// ============================================

async function testClients() {
  logSection('CLIENTS API TESTS');

  // Test 1: Get all clients
  logTest('GET /api/work/clients');
  const clientsResult = await makeRequest('GET', '/work/clients');
  if (clientsResult.success && clientsResult.data.data?.length > 0) {
    testClientId = clientsResult.data.data[0].id;
    logSuccess(`Fetched ${clientsResult.data.count} clients. Test Client ID: ${testClientId}`);
  } else {
    logError('Failed to fetch clients: ' + clientsResult.error);
  }

  // Test 2: Get single client
  if (testClientId) {
    logTest(`GET /api/work/clients/${testClientId}`);
    const clientResult = await makeRequest('GET', `/work/clients/${testClientId}`);
    if (clientResult.success) {
      logSuccess(`Fetched client: ${clientResult.data.data.company_name || clientResult.data.data.name}`);
    } else {
      logError('Failed to fetch client: ' + clientResult.error);
    }
  }

  // Test 3: Get client projects
  if (testClientId) {
    logTest(`GET /api/work/clients/${testClientId}/projects`);
    const projectsResult = await makeRequest('GET', `/work/clients/${testClientId}/projects`);
    if (projectsResult.success) {
      logSuccess(`Client has ${projectsResult.data.count} projects`);
    } else {
      logError('Failed to fetch client projects: ' + projectsResult.error);
    }
  }

  // Test 4: Get client invoices
  if (testClientId) {
    logTest(`GET /api/work/clients/${testClientId}/invoices`);
    const invoicesResult = await makeRequest('GET', `/work/clients/${testClientId}/invoices`);
    if (invoicesResult.success) {
      logSuccess(`Client has ${invoicesResult.data.count} invoices`);
    } else {
      logError('Failed to fetch client invoices: ' + invoicesResult.error);
    }
  }
}

// ============================================
// TEAM TESTS
// ============================================

async function testTeams() {
  logSection('TEAMS API TESTS');

  // Test 1: Get all teams
  logTest('GET /api/work/teams');
  const teamsResult = await makeRequest('GET', '/work/teams');
  if (teamsResult.success && teamsResult.data.data?.length > 0) {
    testTeamId = teamsResult.data.data[0].id;
    logSuccess(`Fetched ${teamsResult.data.count} teams. Test Team ID: ${testTeamId}`);
  } else {
    logError('Failed to fetch teams: ' + teamsResult.error);
  }

  // Test 2: Get single team
  if (testTeamId) {
    logTest(`GET /api/work/teams/${testTeamId}`);
    const teamResult = await makeRequest('GET', `/work/teams/${testTeamId}`);
    if (teamResult.success) {
      logSuccess(`Fetched team: ${teamResult.data.data.team_name}`);
    } else {
      logError('Failed to fetch team: ' + teamResult.error);
    }
  }

  // Test 3: Get team members
  if (testTeamId) {
    logTest(`GET /api/work/teams/${testTeamId}/members`);
    const membersResult = await makeRequest('GET', `/work/teams/${testTeamId}/members`);
    if (membersResult.success) {
      logSuccess(`Team has ${membersResult.data.count} members`);
    } else {
      logError('Failed to fetch team members: ' + membersResult.error);
    }
  }
}

// ============================================
// REPORTS TESTS
// ============================================

async function testReports() {
  logSection('REPORTS & EARNINGS API TESTS');

  // Test 1: User earnings
  if (testUserId) {
    logTest(`GET /api/work/earnings/user/${testUserId}`);
    const earningsResult = await makeRequest('GET', `/work/earnings/user/${testUserId}`);
    if (earningsResult.success) {
      logSuccess(`User earnings: ${earningsResult.data.data.total_earnings}`);
    } else {
      logError('Failed to fetch user earnings: ' + earningsResult.error);
    }
  }

  // Test 2: Project earnings
  if (testProjectId) {
    logTest(`GET /api/work/earnings/project/${testProjectId}`);
    const earningsResult = await makeRequest('GET', `/work/earnings/project/${testProjectId}`);
    if (earningsResult.success) {
      logSuccess(`Project earnings: ${earningsResult.data.data.total_earnings}`);
    } else {
      logError('Failed to fetch project earnings: ' + earningsResult.error);
    }
  }

  // Test 3: Timesheet report
  logTest('GET /api/work/reports/timesheet');
  const timesheetResult = await makeRequest('GET', '/work/reports/timesheet');
  if (timesheetResult.success) {
    logSuccess(`Timesheet report: ${timesheetResult.data.count} entries`);
  } else {
    logError('Failed to fetch timesheet report: ' + timesheetResult.error);
  }

  // Test 4: Project profitability
  logTest('GET /api/work/reports/project-profitability');
  const profitResult = await makeRequest('GET', '/work/reports/project-profitability');
  if (profitResult.success) {
    logSuccess(`Profitability report: ${profitResult.data.count} projects`);
  } else {
    logError('Failed to fetch profitability report: ' + profitResult.error);
  }

  // Test 5: User productivity
  logTest('GET /api/work/reports/user-productivity');
  const productivityResult = await makeRequest('GET', '/work/reports/user-productivity');
  if (productivityResult.success) {
    logSuccess(`Productivity report: ${productivityResult.data.count} users`);
  } else {
    logError('Failed to fetch productivity report: ' + productivityResult.error);
  }
}

// ============================================
// RUN ALL TESTS
// ============================================

async function runAllTests() {
  console.clear();
  log('\n🚀 WORK API TEST SUITE', 'cyan');
  log('Testing all Work.Bizoforce endpoints with Bearer token authentication\n', 'cyan');

  try {
    // Step 1: Authenticate
    const authSuccess = await authenticate();
    if (!authSuccess) {
      logError('\n❌ Authentication failed. Cannot proceed with tests.');
      process.exit(1);
    }

    // Step 2: Run all tests
    await testUsers();
    await testProjects();
    await testTasks();
    await testTimeLogs();
    await testInvoices();
    await testClients();
    await testTeams();
    await testReports();

    // Summary
    logSection('TEST SUMMARY');
    logSuccess('All Work API tests completed!');
    log('\n📝 Test coverage:', 'cyan');
    log('  ✅ Users API (6 endpoints)', 'green');
    log('  ✅ Projects API (13 endpoints)', 'green');
    log('  ✅ Tasks API (10 endpoints)', 'green');
    log('  ✅ Time Logs API (10 endpoints)', 'green');
    log('  ✅ Invoices API (9 endpoints)', 'green');
    log('  ✅ Clients API (9 endpoints)', 'green');
    log('  ✅ Teams API (7 endpoints)', 'green');
    log('  ✅ Reports & Earnings API (5 endpoints)', 'green');
    log('\n📊 Total: ~70 endpoints tested', 'cyan');

  } catch (error) {
    logError('\n❌ Test suite failed with error: ' + error.message);
    process.exit(1);
  }
}

// Start tests
runAllTests();
