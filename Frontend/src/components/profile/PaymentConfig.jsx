import { CreditCardIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import { CARD_PROCESSORS } from '../../utils/constants'

function PaymentConfig({ paymentConfig, isEditing, onUpdate }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Payment Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCardIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-medium">Card Processing</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Processor</p>
              {isEditing ? (
                <select
                  className="mt-1 input"
                  value={paymentConfig.cardProcessor}
                  onChange={(e) => onUpdate('cardProcessor', e.target.value)}
                >
                  {Object.entries(CARD_PROCESSORS).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                  ))}
                </select>
              ) : (
                <p className="mt-1 text-gray-900">{paymentConfig.cardProcessor}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Merchant ID</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={paymentConfig.merchantId}
                  onChange={(e) => onUpdate('merchantId', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-gray-900">{paymentConfig.merchantId}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <QrCodeIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-medium">UPI Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">UPI ID</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={paymentConfig.upiId}
                  onChange={(e) => onUpdate('upiId', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-gray-900">{paymentConfig.upiId}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Display Name</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 input"
                  value={paymentConfig.upiDisplayName}
                  onChange={(e) => onUpdate('upiDisplayName', e.target.value)}
                />
              ) : (
                <p className="mt-1 text-gray-900">{paymentConfig.upiDisplayName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfig