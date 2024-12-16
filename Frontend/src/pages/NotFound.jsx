import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/">
          <Button className="mt-6">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound