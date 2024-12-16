import { InboxIcon } from '@heroicons/react/24/outline'
import Button from './Button'

function EmptyState({ title, description, actionText, onAction }) {
  return (
    <div className="text-center py-12">
      <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>{actionText}</Button>
        </div>
      )}
    </div>
  )
}

export default EmptyState