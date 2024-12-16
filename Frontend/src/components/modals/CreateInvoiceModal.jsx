import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { formatCurrency } from '../../utils/formatters'

function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    status: 'pending'
  })

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1, price: 0 }]
    })
  }

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    })
  }

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, total: calculateTotal() })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Invoice">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Customer Name"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          required
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Items</h3>
            <Button type="button" onClick={addItem} variant="secondary">
              Add Item
            </Button>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <Input
                placeholder="Product Name"
                value={item.product}
                onChange={(e) => updateItem(index, 'product', e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                required
                className="w-24"
              />
              <Input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                required
                className="w-32"
              />
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeItem(index)}
                  className="text-red-600"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg font-medium">
          <span>Total:</span>
          <span>{formatCurrency(calculateTotal())}</span>
        </div>

        <select
          className="input"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Invoice</Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateInvoiceModal