import { useState } from 'react'
import { toast } from 'react-hot-toast'
import AuthToggle from './AuthToggle'
import Input from '../ui/Input'
import Button from '../ui/Button'
import OtpVerification from './OtpVerification'
import { validateEmail, validatePhone } from '../../utils/validators'

function OtpLoginForm({ onBack }) {
  const [isPhoneSelected, setIsPhoneSelected] = useState(false)
  const [step, setStep] = useState('input') // 'input' | 'otp'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    identifier: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const identifier = isPhoneSelected ? formData.phone : formData.email
    const isValid = isPhoneSelected ? validatePhone(identifier) : validateEmail(identifier)
    
    if (!isValid) {
      toast.error(`Please enter a valid ${isPhoneSelected ? 'phone number' : 'email address'}`)
      return
    }

    // Simulate sending OTP
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormData(prev => ({ ...prev, identifier }))
      setStep('otp')
      toast.success(`OTP sent to your ${isPhoneSelected ? 'phone' : 'email'}`)
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  const handleOtpVerify = async (otp) => {
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Successfully logged in!')
      window.location.href = '/'
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    }
  }

  const handleResendOtp = () => {
    toast.success('OTP resent successfully')
  }

  if (step === 'otp') {
    return (
      <OtpVerification
        phone={formData.identifier}
        onVerify={handleOtpVerify}
        onResend={handleResendOtp}
        onBack={() => setStep('input')}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign in with OTP</h2>
        <p className="mt-2 text-sm text-gray-600">
          We'll send you a one-time code to verify your identity
        </p>
      </div>

      <AuthToggle
        enabled={isPhoneSelected}
        onChange={setIsPhoneSelected}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {isPhoneSelected ? (
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter your 10-digit phone number"
            required
          />
        ) : (
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email address"
            required
          />
        )}

        <div className="space-y-3">
          <Button type="submit" className="w-full">
            Send OTP
          </Button>

          <button
            type="button"
            onClick={onBack}
            className="block w-full text-sm text-gray-600 hover:text-gray-500"
          >
            Back to login
          </button>
        </div>
      </form>
    </div>
  )
}

export default OtpLoginForm