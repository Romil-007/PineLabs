import { useNavigate } from 'react-router-dom'
import { CurrencyDollarIcon, DeviceTabletIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Stats from '../components/ui/Stats'
import Card from '../components/ui/Card'
import LineChart from '../components/charts/LineChart'
import { formatCurrency } from '../utils/formatters'

function Dashboard() {
  const navigate = useNavigate()

  const statsData = [
    {
      label: 'Total Sales',
      value: formatCurrency(84320),
      change: 12,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-100',
      onClick: () => navigate('/reports?tab=sales'),
    },
    {
      label: 'Active POS',
      value: '24',
      icon: <DeviceTabletIcon className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-100',
      onClick: () => navigate('/pos'),
    },
    {
      label: 'Total Orders',
      value: '156',
      change: 8,
      icon: <ShoppingCartIcon className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-100',
      onClick: () => navigate('/transactions'),
    },
    {
      label: 'New Customers',
      value: '32',
      change: -2,
      icon: <UserGroupIcon className="h-6 w-6 text-orange-600" />,
      bgColor: 'bg-orange-100',
      onClick: () => navigate('/customers'),
    },
  ]

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <Stats items={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sales Overview">
          <div 
            className="cursor-pointer" 
            onClick={() => navigate('/reports?tab=sales')}
          >
            <LineChart data={salesData} />
          </div>
        </Card>

        <Card title="Recent Transactions">
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/transactions')}
              >
                <div>
                  <p className="font-medium">Order #{1000 + index}</p>
                  <p className="text-sm text-gray-600">2 minutes ago</p>
                </div>
                <p className="font-semibold text-green-600">
                  {formatCurrency(1200)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard