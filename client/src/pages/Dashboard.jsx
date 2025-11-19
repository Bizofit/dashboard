import { StatsCard } from '../components/Card';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const stats = [
    { icon: '🏢', value: '245', label: 'Total Companies', color: 'blue', trend: '↑ 12% this month' },
    { icon: '💼', value: '156', label: 'Open Jobs', color: 'orange', trend: '↑ 8% this week' },
    { icon: '👥', value: '2,847', label: 'Candidates', color: 'purple', trend: '↑ 24% this month' },
    { icon: '📋', value: '87', label: 'Active Projects', color: 'pink', trend: '↑ 5% this week' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">New job posted</h3>
                  <p className="text-sm text-gray-600">Senior Developer at TechCorp</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Timesheet approved</h3>
                  <p className="text-sm text-gray-600">John Smith - 40 hours</p>
                </div>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Invoice generated</h3>
                  <p className="text-sm text-gray-600">$12,450 for Project Alpha</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
