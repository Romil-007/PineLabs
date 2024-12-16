import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'

function TransactionReceiptModal({ isOpen, onClose, transaction }) {
  const handleDownload = () => {
    // Implement PDF download logic
    console.log('Downloading receipt...')
  }

  if (!transaction) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Receipt">
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold">Transaction Details</h3>
          <p className="text-sm text-gray-600">Order #{transaction.id}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span>{formatDate(transaction.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">POS Machine ID:</span>
            <span>{transaction.machineId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span>{transaction.customer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-semibold">{formatCurrency(transaction.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cash Given:</span>
            <span>{formatCurrency(transaction.cashGiven)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Change:</span>
            <span>{formatCurrency(transaction.change)}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default TransactionReceiptModal