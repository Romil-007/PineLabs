import { useState } from 'react'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import SearchInput from '../components/ui/SearchInput'
import Button from '../components/ui/Button'
import TransactionReceiptModal from '../components/modals/TransactionReceiptModal'
import { formatCurrency, formatDate } from '../utils/formatters'

function Transactions() {
  const [transactions] = useState([
    {
      id: 'TRX001',
      date: new Date(),
      amount: 1200,
      status: 'completed',
      customer: 'John Doe',
      paymentMethod: 'Credit Card',
      machineId: 'POS001',
      cashGiven: 1500,
      change: 300,
    },
    {
      id: 'TRX002',
      date: new Date(),
      amount: 850,
      status: 'pending',
      customer: 'Jane Smith',
      paymentMethod: 'UPI',
      machineId: 'POS002',
      cashGiven: 1000,
      change: 150,
    },
  ])

  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const columns = [
    { key: 'id', header: 'Transaction ID' },
    {
      key: 'date',
      header: 'Date',
      render: (row) => formatDate(row.date),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => formatCurrency(row.amount),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
      ),
    },
    { key: 'customer', header: 'Customer' },
    { key: 'paymentMethod', header: 'Payment Method' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button
          variant="secondary"
          className="text-sm"
          onClick={() => {
            setSelectedTransaction(row)
            setIsReceiptModalOpen(true)
          }}
        >
          View Receipt
        </Button>
      ),
    },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      </div>

      <Card>
        <div className="mb-6">
          <SearchInput
            placeholder="Search transactions..."
            onSearch={setSearchQuery}
          />
        </div>
        <Table columns={columns} data={filteredTransactions} />
      </Card>

      <TransactionReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => {
          setIsReceiptModalOpen(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction}
      />
    </div>
  )
}

export default Transactions