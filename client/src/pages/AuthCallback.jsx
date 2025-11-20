import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const handleCallback = () => {
      const token = searchParams.get('token');
      const userStr = searchParams.get('user');
      const errorMsg = searchParams.get('error');

      if (errorMsg) {
        setError(errorMsg);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        return;
      }

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));

          // Store token in localStorage
          localStorage.setItem('token', token);

          // Set user in context
          setToken(token);
          setUser(user);

          // Redirect based on user type
          if (user.userType === 'company') {
            navigate('/dashboard');
          } else {
            navigate('/profile');
          }
        } catch (err) {
          console.error('Failed to parse user data:', err);
          setError('Failed to complete authentication');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } else {
        setError('Missing authentication data');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser, setToken]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg className="animate-spin h-12 w-12 text-primary-blue mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Authentication</h2>
        <p className="text-gray-600">Please wait while we sign you in...</p>
      </div>
    </div>
  );
}
