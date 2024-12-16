import { Link, useLocation } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  DeviceTabletIcon,
  CreditCardIcon,
  DocumentTextIcon,
  CubeIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'POS Management', href: '/pos', icon: DeviceTabletIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Invoices', href: '/invoices', icon: DocumentTextIcon },
  { name: 'Inventory', href: '/inventory', icon: CubeIcon },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
]

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-primary-600">POS Manager</h1>
        <button
          type="button"
          className="lg:hidden text-gray-500"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-4 px-4 flex-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar