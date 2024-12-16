import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useState } from 'react'

function PaymentConfigModal({ isOpen, onClose, paymentConfig, onSave }) {
  const [formData, setFormData] = useState(paymentConfig)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Configuration">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="UPI ID"
          value={formData.upiId}
          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
          placeholder="yourname@bank"
          required
        />

        <Input
          label="Card Processor"
          value={formData.cardProcessor}
          onChange={(e) => setFormData({ ...formData, cardProcessor: e.target.value })}
          placeholder="Enter your card processor details"
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

export default PaymentConfigModal