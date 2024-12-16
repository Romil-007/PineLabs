import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { generateInvoice } from '../../utils/pdfGenerator'

function ViewInvoiceModal({ isOpen, onClose, invoice }) {
  if (!invoice) return null

  const handleDownload = () => {
    generateInvoice(invoice)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details" size="lg">
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">Invoice #{invoice.id}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(invoice.date)}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                invoice.status === 'paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {invoice.status === 'paid' ? 'Paid' : 'Pending'}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Details</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{invoice.customerName}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">{item.product}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-2 text-right">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="py-2 text-right font-medium">Total:</td>
                  <td className="py-2 text-right font-medium">
                    {formatCurrency(invoice.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
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

export default ViewInvoiceModal