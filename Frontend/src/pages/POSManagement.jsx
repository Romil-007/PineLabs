import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import SearchInput from '../components/ui/SearchInput'
import EmptyState from '../components/ui/EmptyState'
import AddPOSMachineModal from '../components/modals/AddPOSMachineModal'
import ManagePOSDeviceModal from '../components/modals/ManagePOSDeviceModal'
import ConfirmationModal from '../components/modals/ConfirmationModal'
import { formatDate } from '../utils/formatters'

function POSManagement() {
  const [devices, setDevices] = useState([
    {
      id: 'POS001',
      name: 'Main Counter',
      location: 'Main Store',
      serialNumber: 'SN123456',
      status: 'active',
      lastActive: new Date(),
      transactions: 145,
    },
    {
      id: 'POS002',
      name: 'Checkout 2',
      location: 'Branch Store',
      serialNumber: 'SN789012',
      status: 'inactive',
      lastActive: new Date(Date.now() - 86400000 * 2),
      transactions: 89,
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddDevice = (deviceData) => {
    const newDevice = {
      id: `POS${String(devices.length + 1).padStart(3, '0')}`,
      ...deviceData,
      lastActive: new Date(),
      transactions: 0,
    }
    setDevices([...devices, newDevice])
    toast.success('POS device added successfully')
  }

  const handleUpdateDevice = (updatedDevice) => {
    setDevices(devices.map(device => 
      device.id === updatedDevice.id ? updatedDevice : device
    ))
    toast.success('POS device updated successfully')
  }

  const handleDeleteDevice = () => {
    setDevices(devices.filter((device) => device.id !== selectedDevice.id))
    setIsDeleteModalOpen(false)
    setSelectedDevice(null)
    toast.success('POS device deleted successfully')
  }

  const columns = [
    { key: 'id', header: 'Device ID' },
    { key: 'name', header: 'Name' },
    { key: 'location', header: 'Location' },
    { key: 'serialNumber', header: 'Serial Number' },
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
      key: 'lastActive',
      header: 'Last Active',
      render: (row) => formatDate(row.lastActive),
    },
    { key: 'transactions', header: 'Total Transactions' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            className="text-sm"
            onClick={() => {
              setSelectedDevice(row)
              setIsManageModalOpen(true)
            }}
          >
            Manage
          </Button>
          <Button
            variant="secondary"
            className="text-sm text-red-600 hover:text-red-700"
            onClick={() => {
              setSelectedDevice(row)
              setIsDeleteModalOpen(true)
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">POS Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add New Device</Button>
      </div>

      <Card>
        <div className="mb-6">
          <SearchInput
            placeholder="Search devices..."
            onSearch={setSearchQuery}
          />
        </div>

        {filteredDevices.length > 0 ? (
          <Table columns={columns} data={filteredDevices} />
        ) : (
          <EmptyState
            title="No POS devices found"
            description="Add your first POS device to get started"
            actionText="Add Device"
            onAction={() => setIsAddModalOpen(true)}
          />
        )}
      </Card>

      <AddPOSMachineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddDevice}
      />

      <ManagePOSDeviceModal
        isOpen={isManageModalOpen}
        onClose={() => {
          setIsManageModalOpen(false)
          setSelectedDevice(null)
        }}
        device={selectedDevice}
        onUpdate={handleUpdateDevice}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedDevice(null)
        }}
        onConfirm={handleDeleteDevice}
        title="Delete POS Device"
        message={`Are you sure you want to delete ${selectedDevice?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

export default POSManagement