import Modal from '../ui/Modal'
import { formatCurrency, formatPhoneNumber, formatDate } from '../../utils/formatters'

function ViewCustomerModal({ isOpen, onClose, customer }) {
  if (!customer) return null

  const transactions = [
    {
      id: 'TRX001',
      date: new Date(),
      amount: 1200,
      location: 'Main Store',
    },
    {
      id: 'TRX002',
      date: new Date(Date.now() - 86400000),
      amount: 850,
      location: 'Branch Store',
    },
  ]

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.location]) {
      acc[transaction.location] = []
    }
    acc[transaction.location].push(transaction)
    return acc
  }, {})

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details" size="lg">
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer ID</p>
              <p className="font-medium">{customer.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{formatPhoneNumber(customer.phone)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Transaction History</h3>
          {Object.entries(groupedTransactions).map(([location, transactions]) => (
            <div key={location} className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">{location}</h4>
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.id}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <p className="font-semibold text-primary-600">
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ViewCustomerModal