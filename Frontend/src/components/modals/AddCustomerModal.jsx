import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { validateEmail, validatePhone, validateRequired } from '../../utils/validators'

function AddCustomerModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(formData.name)) newErrors.name = 'Name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address'
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number'
    if (!validateRequired(formData.address)) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Customer">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
        />
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          error={errors.address}
          required
        />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddCustomerModal