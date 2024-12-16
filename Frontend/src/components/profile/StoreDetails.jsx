import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'

function StoreDetails({ storeDetails, isEditing, onUpdate }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Store Details</h2>
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <BuildingStorefrontIcon className="w-full h-full text-primary-600" />
        </div>
        <div className="relative p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Store Name</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={storeDetails.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {storeDetails.name}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Store Type</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={storeDetails.type}
                  onChange={(e) => onUpdate('type', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">{storeDetails.type}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Established</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={storeDetails.established}
                  onChange={(e) => onUpdate('established', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {storeDetails.established}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Operating Hours</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={storeDetails.operatingHours}
                  onChange={(e) => onUpdate('operatingHours', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {storeDetails.operatingHours}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreDetails