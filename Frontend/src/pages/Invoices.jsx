import { useState } from 'react'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import CreateInvoiceModal from '../components/modals/CreateInvoiceModal'
import ViewInvoiceModal from '../components/modals/ViewInvoiceModal'
import { formatCurrency, formatDate } from '../utils/formatters'

function Invoices() {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV001',
      customerName: 'John Doe',
      date: new Date(),
      amount: 2500,
      status: 'paid',
      dueDate: new Date(Date.now() + 86400000 * 15),
      items: [
        { product: 'Product A', quantity: 2, price: 1000 },
        { product: 'Product B', quantity: 1, price: 500 }
      ],
      total: 2500
    },
    {
      id: 'INV002',
      customerName: 'Jane Smith',
      date: new Date(),
      amount: 1800,
      status: 'pending',
      dueDate: new Date(Date.now() + 86400000 * 15),
      items: [
        { product: 'Product C', quantity: 3, price: 600 }
      ],
      total: 1800
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCreateInvoice = (invoiceData) => {
    const newInvoice = {
      id: `INV${String(invoices.length + 1).padStart(3, '0')}`,
      date: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 15),
      ...invoiceData,
    }
    setInvoices([...invoices, newInvoice])
  }

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsViewModalOpen(true)
  }

  const columns = [
    { key: 'id', header: 'Invoice ID' },
    { key: 'customerName', header: 'Customer' },
    {
      key: 'date',
      header: 'Issue Date',
      render: (row) => formatDate(row.date),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (row) => formatDate(row.dueDate),
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
            row.status === 'paid'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.status === 'paid' ? 'Paid' : 'Pending'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="space-x-2">
          <Button
            variant="secondary"
            className="text-sm"
            onClick={() => handleViewInvoice(row)}
          >
            View
          </Button>
        </div>
      ),
    },
  ]

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Invoice</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Invoices</p>
            <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Pending Amount</p>
            <p className="text-3xl font-bold text-yellow-600">
              {formatCurrency(
                invoices
                  .filter((i) => i.status === 'pending')
                  .reduce((total, i) => total + i.amount, 0)
              )}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Paid Amount</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(
                invoices
                  .filter((i) => i.status === 'paid')
                  .reduce((total, i) => total + i.amount, 0)
              )}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6">
          <SearchInput
            placeholder="Search invoices..."
            onSearch={setSearchQuery}
          />
        </div>
        <Table columns={columns} data={filteredInvoices} />
      </Card>

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvoice}
      />

      <ViewInvoiceModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedInvoice(null)
        }}
        invoice={selectedInvoice}
      />
    </div>
  )
}

export default Invoices