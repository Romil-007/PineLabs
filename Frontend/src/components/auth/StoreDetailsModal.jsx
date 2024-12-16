import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useState } from 'react'

function StoreDetailsModal({ isOpen, onClose, storeDetails, onSave }) {
  const [formData, setFormData] = useState(storeDetails)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Store Details">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Store Name"
          value={formData.storeName}
          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
          required
        />

        <Input
          label="Store Address"
          value={formData.storeAddress}
          onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
          required
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}

export default StoreDetailsModal