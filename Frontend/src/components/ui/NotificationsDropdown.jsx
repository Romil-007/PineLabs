import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

function NotificationsDropdown() {
  const notifications = [
    {
      id: 1,
      title: 'Low Stock Alert',
      message: 'Product X is running low on stock',
      time: '5 minutes ago',
    },
    {
      id: 2,
      title: 'New Order',
      message: 'Order #1234 has been placed',
      time: '10 minutes ago',
    },
  ]

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100">
        <BellIcon className="h-6 w-6" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[70]">
          {notifications.map((notification) => (
            <Menu.Item key={notification.id}>
              {({ active }) => (
                <a
                  href="#notification"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  <div className="space-y-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-gray-500">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <a
                href="#all-notifications"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-primary-600 text-center font-medium`}
              >
                View All Notifications
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default NotificationsDropdown