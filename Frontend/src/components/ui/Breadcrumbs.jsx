import { Link } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

function Breadcrumbs({ items }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <Link to="/" className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="ml-4 text-sm font-medium text-gray-700">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs