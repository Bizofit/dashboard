// API Configuration
const API_BASE_URL = 'http://localhost:3006/api';
let selectedUserType = 'company';

// User Type Selection
function selectUserType(type) {
    selectedUserType = type;
    document.querySelectorAll('.user-type-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
}

// Show Alert Message
function showAlert(message, type = 'error') {
    const alert = document.getElementById('alertMessage');
    alert.textContent = message;
    alert.className = `alert ${type} show`;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

// Handle Login Form Submit
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.getElementById('loginBtn');

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(err => err.classList.remove('show'));
    document.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));

    // Disable button and show loading
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="loading-spinner"></span>Signing in...';

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Login successful
            const { user, token } = data.data;

            // Store auth data
            localStorage.setItem('authToken', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userType', user.userType);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);

            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            showAlert('Login successful! Redirecting...', 'success');

            // Redirect based on user type
            setTimeout(() => {
                if (user.userType === 'company') {
                    window.location.href = '/dashboard.html';
                } else {
                    window.location.href = '/dashboard.html'; // Same for now, will differ when React is ready
                }
            }, 1000);

        } else {
            // Login failed
            showAlert(data.message || 'Invalid email or password');
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Sign In';
        }

    } catch (error) {
        console.error('Login error:', error);
        showAlert('Network error. Please check your connection and try again.');
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Sign In';
    }
}

// Handle Google Login (Placeholder)
function handleGoogleLogin() {
    showAlert('Google OAuth integration coming soon!', 'error');
    // TODO: Implement Google OAuth flow
    // 1. Open Google OAuth popup
    // 2. Get Google profile data
    // 3. Send to backend API /api/auth/google
    // 4. Store token and redirect
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    // ⚠️ TESTING BYPASS - REMOVE ON PRODUCTION
    const urlParams = new URLSearchParams(window.location.search);
    const testUser = urlParams.get('test');

    if (testUser === 'sudh013@gmail.com') {
        console.log('🔓 TEST MODE: Bypassing login for sudh013@gmail.com');

        // Set test user credentials
        localStorage.setItem('authToken', 'TEST_TOKEN_' + Date.now());
        localStorage.setItem('userType', 'company');
        localStorage.setItem('userEmail', 'sudh013@gmail.com');
        localStorage.setItem('userId', '1033');
        localStorage.setItem('userName', 'Sudhanshu Pandey');
        localStorage.setItem('currentRole', 'company_admin');
        localStorage.setItem('currentCompanyId', '26');
        localStorage.setItem('availableRoles', 'company_admin,vendor,freelancer,team_member');

        // Show modern modal instead of alert
        const modal = document.getElementById('testModeModal');
        if (modal) {
            modal.classList.add('show');
        }
        return;
    }
    // ⚠️ END TESTING BYPASS

    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    if (token) {
        // User already logged in, redirect to dashboard
        window.location.href = '/dashboard.html';
    }

    // Auto-fill email if remembered
    const rememberMe = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');

    if (rememberMe === 'true' && savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }

    // ⚠️ TESTING BYPASS - Add event listener for test button
    const testBypassBtn = document.getElementById('testBypassBtn');
    if (testBypassBtn) {
        testBypassBtn.addEventListener('click', function() {
            window.location.href = '?test=sudh013@gmail.com';
        });
    }
    // ⚠️ END TESTING BYPASS

    // Add event listener for form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Add event listener for Google login button
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }

    // Add event listeners for user type selection
    document.querySelectorAll('.user-type-option').forEach(option => {
        option.addEventListener('click', function() {
            selectUserType(this.getAttribute('data-type'));
        });
    });

    // Add event listener for modal proceed button
    const proceedBtn = document.getElementById('proceedToDashboardBtn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            window.location.href = '/dashboard.html';
        });
    }
});
