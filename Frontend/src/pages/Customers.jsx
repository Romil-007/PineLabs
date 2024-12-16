import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import AddCustomerModal from '../components/modals/AddCustomerModal'
import ViewCustomerModal from '../components/modals/ViewCustomerModal'
import { formatCurrency, formatPhoneNumber } from '../utils/formatters'

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 'CUS001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      totalOrders: 12,
      totalSpent: 15400,
      status: 'active',
    },
    {
      id: 'CUS002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      totalOrders: 8,
      totalSpent: 9200,
      status: 'inactive',
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddCustomer = (customerData) => {
    const newCustomer = {
      id: `CUS${String(customers.length + 1).padStart(3, '0')}`,
      ...customerData,
      totalOrders: 0,
      totalSpent: 0,
      status: 'active',
    }
    setCustomers([...customers, newCustomer])
    toast.success('Customer added successfully')
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setIsViewModalOpen(true)
  }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'phone',
      header: 'Phone',
      render: (row) => formatPhoneNumber(row.phone),
    },
    { key: 'totalOrders', header: 'Total Orders' },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      render: (row) => formatCurrency(row.totalSpent),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status === 'active' ? 'Active' : 'Inactive'}
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
            onClick={() => handleViewCustomer(row)}
          >
            View
          </Button>
          <Button variant="secondary" className="text-sm">
            Edit
          </Button>
        </div>
      ),
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Customer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Active Customers</p>
            <p className="text-3xl font-bold text-primary-600">
              {customers.filter((c) => c.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(
                customers.reduce((total, c) => total + c.totalSpent, 0) /
                  customers.reduce((total, c) => total + c.totalOrders, 0)
              )}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6">
          <SearchInput
            placeholder="Search customers..."
            onSearch={setSearchQuery}
          />
        </div>
        <Table columns={columns} data={filteredCustomers} />
      </Card>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCustomer}
      />

      <ViewCustomerModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedCustomer(null)
        }}
        customer={selectedCustomer}
      />
    </div>
  )
}

export default Customers