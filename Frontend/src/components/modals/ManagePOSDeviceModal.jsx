import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { formatDate, formatStatus } from '../../utils/formatters'

function ManagePOSDeviceModal({ isOpen, onClose, device, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    serialNumber: '',
    status: 'active'
  })

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name || '',
        location: device.location || '',
        serialNumber: device.serialNumber || '',
        status: device.status || 'active'
      })
    }
  }, [device])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ ...device, ...formData })
    onClose()
  }

  if (!device) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage POS Device" size="lg">
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Device Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Device ID</p>
              <p className="font-medium">{device.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Active</p>
              <p className="font-medium">
                {device.lastActive ? formatDate(device.lastActive) : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="font-medium">{device.transactions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Status</p>
              <p className={`font-medium ${
                device.status === 'active' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatStatus(device.status)}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Device Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            label="Serial Number"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="input"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Device</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ManagePOSDeviceModal