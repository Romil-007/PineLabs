function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`pb-4 px-4 text-sm font-medium ${
            activeTab === tab.id
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs