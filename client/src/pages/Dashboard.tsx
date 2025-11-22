import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';

export default function DashboardPage() {
  const [_, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLocation('/login');
      return;
    }

    axios
      .get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.data);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLocation('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bizoforce Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Connected Platforms</h3>
            <p className="text-4xl font-bold">5</p>
            <p className="text-blue-100 mt-2">Bizoforce, Giglancer, Screenly, Work, Unified</p>
          </div>

          <div className="bg-green-600 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Active Roles</h3>
            <p className="text-4xl font-bold">{user?.roles?.length || 0}</p>
            <p className="text-green-100 mt-2">
              {user?.roles?.map((r: any) => r.roleType).join(', ') || 'No roles'}
            </p>
          </div>

          <div className="bg-purple-600 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Authentication</h3>
            <p className="text-2xl font-bold">{user?.authProvider || 'Local'}</p>
            <p className="text-purple-100 mt-2">
              {user?.googleId ? 'Google OAuth Enabled' : 'Email/Password'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {user?.googleProfilePicture && (
                <img
                  src={user.googleProfilePicture}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-lg">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Account Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">User ID</p>
                  <p className="font-medium">{user?.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created At</p>
                  <p className="font-medium">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Login</p>
                  <p className="font-medium">
                    {new Date(user?.lastLoginAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{user?.phone || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-medium">Analytics</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-3xl mb-2">🛍️</div>
              <div className="font-medium">Products</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-medium">Jobs</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-medium">Timesheets</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
