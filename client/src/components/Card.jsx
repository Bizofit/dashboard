export default function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatsCard({ icon, value, label, color = 'blue', trend }) {
  const colors = {
    blue: 'bg-blue-600',
    orange: 'bg-accent-orange',
    purple: 'bg-purple',
    pink: 'bg-pink',
    green: 'bg-success',
  };
  
  return (
    <div className={`${colors[color]} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold mb-2">{value}</div>
          <div className="text-blue-100 text-sm">{label}</div>
          {trend && (
            <div className="text-xs mt-2 opacity-90">{trend}</div>
          )}
        </div>
        {icon && (
          <div className="text-5xl opacity-80">{icon}</div>
        )}
      </div>
    </div>
  );
}
