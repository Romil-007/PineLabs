import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LineChart from '../components/charts/LineChart'
import Tabs from '../components/ui/Tabs'
import StatsCard from '../components/ui/StatsCard'
import { DocumentArrowDownIcon, ChartBarIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/formatters'

function Reports() {
  const [activeTab, setActiveTab] = useState('sales')

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(2, 132, 199)',
        backgroundColor: 'rgba(2, 132, 199, 0.5)',
      },
    ],
  }

  const inventoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [150, 130, 95, 125, 85, 115],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
    ],
  }

  const customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [25, 35, 28, 45, 38, 52],
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
      },
    ],
  }

  const tabs = [
    { id: 'sales', label: 'Sales Reports' },
    { id: 'inventory', label: 'Inventory Reports' },
    { id: 'customers', label: 'Customer Reports' },
  ]

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting reports...')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <Button onClick={handleExport}>
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(123400)}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-green-600" />}
          change={12}
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Sales Growth"
          value="15%"
          icon={<ChartBarIcon className="h-6 w-6 text-blue-600" />}
          change={5}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Customer Growth"
          value="28%"
          icon={<UserGroupIcon className="h-6 w-6 text-orange-600" />}
          change={-2}
          bgColor="bg-orange-100"
        />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Revenue Overview">
            <LineChart data={salesData} />
          </Card>
          <Card title="Top Products">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Product {index + 1}</p>
                    <p className="text-sm text-gray-600">
                      {150 - index * 25} units sold
                    </p>
                  </div>
                  <p className="font-semibold text-primary-600">
                    {formatCurrency(5000 - index * 1000)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Stock Levels">
            <LineChart data={inventoryData} />
          </Card>
          <Card title="Low Stock Items">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Product {index + 1}</p>
                    <p className="text-sm text-gray-600">
                      Only {10 - index * 2} units left
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Customer Growth">
            <LineChart data={customerData} />
          </Card>
          <Card title="Top Customers">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Customer {index + 1}</p>
                    <p className="text-sm text-gray-600">
                      {15 - index * 3} orders this month
                    </p>
                  </div>
                  <p className="font-semibold text-primary-600">
                    {formatCurrency(8000 - index * 2000)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Reports