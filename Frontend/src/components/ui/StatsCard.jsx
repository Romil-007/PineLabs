function StatsCard({ title, value, icon, change, bgColor = 'bg-blue-100' }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsCard