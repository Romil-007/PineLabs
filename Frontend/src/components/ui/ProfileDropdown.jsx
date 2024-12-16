import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function ProfileDropdown() {
  const navigate = useNavigate()

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative z-10 flex items-center focus:outline-none">
        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-white ring-2 ring-white">
          <img
            className="h-full w-full object-cover"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User"
          />
        </div>
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
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[70]">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/profile')}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
              >
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Your Profile
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/settings')}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Settings
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/login')}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdown