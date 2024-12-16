import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Tabs from '../components/ui/Tabs'
import AuthEndpointChange from '../components/settings/AuthEndpointChange'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    businessName: 'My Store',
    email: 'contact@mystore.com',
    phone: '+91 98765 43210',
    address: '123 Business Street',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    paymentMethods: {
      creditCard: true,
      debitCard: true,
      upi: true,
      cash: true,
      wallet: false,
    },
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    security: {
      twoFactor: false,
    },
  })

  const tabs = [
    { id: 'profile', label: 'Business Profile' },
    { id: 'payment', label: 'Payment Settings' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Settings updated successfully!')
  }

  const togglePaymentMethod = (method) => {
    setFormData({
      ...formData,
      paymentMethods: {
        ...formData.paymentMethods,
        [method]: !formData.paymentMethods[method],
      },
    })
  }

  const toggleNotification = (type) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [type]: !formData.notifications[type],
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'profile' && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Business Name"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <Input
                label="Currency"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              />
              <Input
                label="Timezone"
                value={formData.timezone}
                onChange={(e) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Other tabs remain the same */}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.security.twoFactor ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        security: {
                          ...formData.security,
                          twoFactor: !formData.security.twoFactor,
                        },
                      })
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.security.twoFactor ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-4">
                  <Button variant="secondary">Change Password</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <AuthEndpointChange 
              currentEmail={formData.email}
              currentPhone={formData.phone}
            />
          </Card>
        </div>
      )}
    </div>
  )
}

export default Settings