import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user, role } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const companyMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/companies', label: 'Companies', icon: '🏢' },
    { path: '/products', label: 'Products & Services', icon: '📦' },
    { path: '/jobs', label: 'Jobs', icon: '💼' },
    { path: '/candidates', label: 'Candidates', icon: '👥' },
    { path: '/talent-pool', label: 'Talent Pool', icon: '🎯' },
    { path: '/projects', label: 'Projects', icon: '📋' },
    { path: '/timesheets', label: 'Timesheets', icon: '⏰' },
    { path: '/invoices', label: 'Invoices', icon: '💰' },
    { path: '/earnings', label: 'Earnings', icon: '💵' },
    { path: '/users', label: 'Users & Roles', icon: '👤' },
    { path: '/subscriptions', label: 'Subscriptions', icon: '📱' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const individualMenu = [
    { path: '/profile', label: 'My Profile', icon: '👤' },
    { path: '/browse-jobs', label: 'Browse Jobs', icon: '🔍' },
    { path: '/applications', label: 'My Applications', icon: '📝' },
    { path: '/my-projects', label: 'My Projects', icon: '📋' },
    { path: '/my-timesheets', label: 'My Timesheets', icon: '⏰' },
    { path: '/my-earnings', label: 'My Earnings', icon: '💵' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const menu = user?.userType === 'individual' ? individualMenu : companyMenu;

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white min-h-screen transition-all duration-300`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center font-bold text-xl">
            B
          </div>
          {isOpen && <span className="font-bold text-xl">Bizoforce</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-blue text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 left-4 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </div>
  );
}
