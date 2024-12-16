import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

function AddPOSMachineModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    serialNumber: '',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add POS Machine">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Machine Name"
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
        <select
          className="input"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Machine</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddPOSMachineModal