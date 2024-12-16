import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { validateEmail, validatePhone, validatePassword } from '../../utils/validators'

function RegisterForm({
  formData,
  storeDetails,
  paymentConfig,
  onSubmit,
  onOpenStoreModal,
  onOpenPaymentModal,
  setFormData
}) {
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    if (!formData.businessName) newErrors.businessName = 'Business name is required'
    if (!formData.name) newErrors.name = 'Full name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address'
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number'
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!storeDetails.storeName || !storeDetails.storeAddress) {
      newErrors.storeDetails = 'Store details are required'
    }
    if (!paymentConfig.upiId || !paymentConfig.cardProcessor) {
      newErrors.paymentConfig = 'Payment configuration is required'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit(formData)
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <Input
          label="Business Name"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          error={errors.businessName}
          required
        />
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />
        <Input
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
        />
      </div>

      {/* Store Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Store Configuration</h3>
        <div
          className={`input cursor-pointer flex items-center justify-between ${
            errors.storeDetails ? 'border-red-500' : ''
          }`}
          onClick={onOpenStoreModal}
        >
          <span className={storeDetails.storeName ? 'text-gray-900' : 'text-gray-500'}>
            {storeDetails.storeName ? 'Store Details Added' : 'Add Store Details'}
          </span>
          <Button type="button" variant="secondary" size="sm">
            {storeDetails.storeName ? 'Edit' : 'Add'}
          </Button>
        </div>
        {errors.storeDetails && (
          <p className="mt-1 text-sm text-red-500">{errors.storeDetails}</p>
        )}
      </div>

      {/* Payment Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Setup</h3>
        <div
          className={`input cursor-pointer flex items-center justify-between ${
            errors.paymentConfig ? 'border-red-500' : ''
          }`}
          onClick={onOpenPaymentModal}
        >
          <span className={paymentConfig.upiId ? 'text-gray-900' : 'text-gray-500'}>
            {paymentConfig.upiId ? 'Payment Config Added' : 'Add Payment Configuration'}
          </span>
          <Button type="button" variant="secondary" size="sm">
            {paymentConfig.upiId ? 'Edit' : 'Add'}
          </Button>
        </div>
        {errors.paymentConfig && (
          <p className="mt-1 text-sm text-red-500">{errors.paymentConfig}</p>
        )}
      </div>

      {/* Security */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Security</h3>
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm