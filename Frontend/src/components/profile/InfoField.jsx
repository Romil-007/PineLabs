import { PencilSquareIcon } from '@heroicons/react/24/outline'

function InfoField({ icon: Icon, label, value, editable, isEditing, onChange }) {
  return (
    <div className="relative group">
      <div className="flex items-start space-x-3 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          {isEditing && editable ? (
            <input
              type="text"
              className="mt-1 w-full input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <p className="mt-1 text-base text-gray-900">{value}</p>
          )}
        </div>
        {isEditing && editable && (
          <button className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-primary-600">
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default InfoField