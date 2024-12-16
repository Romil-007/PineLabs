function Stats({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`card cursor-pointer transform transition-all duration-300 hover:scale-105 ${
            item.onClick ? 'hover:shadow-lg hover:bg-gray-50' : ''
          }`}
          onClick={item.onClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && item.onClick?.()}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${item.bgColor} transition-colors duration-300`}>
              {item.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              {item.change !== undefined && (
                <p className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stats