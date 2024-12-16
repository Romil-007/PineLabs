import { Bars3Icon } from '@heroicons/react/24/outline'
import NotificationsDropdown from './ui/NotificationsDropdown'
import ProfileDropdown from './ui/ProfileDropdown'

function Navbar({ onMenuClick }) {
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <button
              type="button"
              className="lg:hidden px-4 text-gray-500 focus:outline-none"
              onClick={onMenuClick}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationsDropdown />
            <div className="relative z-50">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar