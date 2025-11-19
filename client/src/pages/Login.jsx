import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setEmail('demo@example.com');
      setShowUserTypeModal(true);
      setLoading(false);
    }, 1500);
  };

  const handleBypassLogin = async () => {
    setLoading(true);
    setEmail('sudh013@gmail.com');
    // For testing: Show role selection instead of auto-login
    // This user has 6 roles and needs to select which one to use
    setTimeout(() => {
      setShowUserTypeModal(true);
      setLoading(false);
    }, 500);
  };

  const handleUserTypeSelect = async (type) => {
    setSelectedUserType(type);
  };

  const handleContinue = async () => {
    if (!selectedUserType) return;

    setLoading(true);
    try {
      // Login with sudh013@gmail.com credentials
      const result = await login('sudh013@gmail.com', 'test123');
      
      if (result.success) {
        if (selectedUserType === 'business') {
          navigate('/dashboard');
        } else {
          navigate('/profile');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2 min-h-[600px]">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-primary-blue to-accent-orange p-12 text-white flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-2xl font-bold">
              B
            </div>
            <div className="text-3xl font-bold">Bizoforce</div>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome to Bizoforce Ecosystem
          </h1>
          <p className="text-lg opacity-90 mb-10">
            Generate leads, grow your business, hire talent, manage projects, and collaborate seamlessly - all in one powerful platform.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                💼
              </div>
              <div>
                <div className="font-semibold">Smart Hiring</div>
                <div className="text-sm opacity-80">AI-powered screening & interviews</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                📊
              </div>
              <div>
                <div className="font-semibold">Project Management</div>
                <div className="text-sm opacity-80">Track work & manage teams</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <div className="font-semibold">Billing & Invoicing</div>
                <div className="text-sm opacity-80">Automated timesheet billing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in with Google to continue</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-accent-orange hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                  <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                  <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                  <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.737 7.395 3.977 10 3.977z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Bypass Login Button for sudh013@gmail.com */}
          <button
            onClick={handleBypassLogin}
            disabled={loading}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            🔓 Quick Login (sudh013@gmail.com)
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">For company employees</span>
            </div>
          </div>

          {/* Company Employee Login Link */}
          <a
            href="/company-login"
            className="block p-5 border-2 border-gray-200 rounded-xl hover:border-primary-blue hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                🏢
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Company Employee Login</div>
                <div className="text-sm text-gray-600">Sign in with your work email</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </a>

          {/* Info Text */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">Company Admins & Individual Users:</span> Use Google sign-in above
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Company Employees:</span> Use the work email login if invited by your admin
            </p>
          </div>

          {/* Signup Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            New to Bizoforce?{' '}
            <a href="/register" className="text-primary-blue font-semibold hover:underline">
              Create an account
            </a>
          </div>
        </div>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Bizoforce! 🎉</h2>
              <p className="text-gray-600">Tell us a bit about yourself to personalize your experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Business Card */}
              <div
                onClick={() => handleUserTypeSelect('business')}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  selectedUserType === 'business'
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200 hover:border-primary-blue'
                }`}
              >
                {selectedUserType === 'business' && (
                  <div className="text-primary-blue text-xl mb-2">✓</div>
                )}
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Business</h3>
                <p className="text-sm text-gray-600">
                  Looking to hire talent, manage projects, and grow my company
                </p>
              </div>

              {/* Talent Card */}
              <div
                onClick={() => handleUserTypeSelect('talent')}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  selectedUserType === 'talent'
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200 hover:border-primary-blue'
                }`}
              >
                {selectedUserType === 'talent' && (
                  <div className="text-primary-blue text-xl mb-2">✓</div>
                )}
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm Looking for Work</h3>
                <p className="text-sm text-gray-600">
                  Seeking opportunities, applying to jobs, and building my career
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowUserTypeModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedUserType}
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-colors ${
                  selectedUserType
                    ? 'bg-primary-blue text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="mb-4">
              <svg className="animate-spin h-12 w-12 text-primary-blue mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-900">Signing in with Google</div>
            <div className="text-sm text-gray-600 mt-2">Please wait while we authenticate your account...</div>
          </div>
        </div>
      )}
    </div>
  );
}
