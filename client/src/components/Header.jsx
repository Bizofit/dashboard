import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, role, switchRole, logout } = useAuth();

  const availableRoles = ['company_admin', 'vendor', 'hr', 'team_lead', 'team_member', 'finance'];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Role Switcher (Company Users Only) */}
          {user?.userType === 'company' && (
            <select
              value={role || 'company_admin'}
              onChange={(e) => switchRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            >
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {r.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <span className="text-2xl">🔔</span>
            <span className="absolute top-0 right-0 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Wallet */}
          <div className="px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Wallet: </span>
            <span className="font-bold text-gray-900">$2,450</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
