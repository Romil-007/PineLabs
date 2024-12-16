import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import Input from '../ui/Input'
import OtpInput from '../auth/OtpInput'

function AuthEndpointChange({ currentEmail, currentPhone }) {
  const [isChanging, setIsChanging] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [formData, setFormData] = useState({
    email: currentEmail,
    phone: currentPhone
  })
  const [otp, setOtp] = useState('')
  const [changingField, setChangingField] = useState(null)

  const resetState = () => {
    setIsChanging(false)
    setShowOtp(false)
    setChangingField(null)
    setOtp('')
    setFormData({
      email: currentEmail,
      phone: currentPhone
    })
  }

  const handleStartChange = (field) => {
    if (field === 'email' && formData.email === currentEmail) {
      toast.error('New email must be different from current email')
      return
    }
    if (field === 'phone' && formData.phone === currentPhone) {
      toast.error('New phone must be different from current phone')
      return
    }
    setChangingField(field)
    setShowOtp(true)
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${changingField === 'email' ? 'Email' : 'Phone'} updated successfully`)
      resetState()
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.')
    }
  }

  const handleResendOtp = () => {
    toast.success('OTP resent successfully')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Change Authentication Endpoints
        </h3>
        <Button 
          variant="secondary"
          onClick={() => isChanging ? resetState() : setIsChanging(true)}
        >
          {isChanging ? 'Cancel' : 'Change'}
        </Button>
      </div>

      {isChanging && !showOtp && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Address</p>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button 
                variant="secondary"
                onClick={() => handleStartChange('email')}
                disabled={formData.email === currentEmail}
              >
                Update Email
              </Button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone Number</p>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button 
                variant="secondary"
                onClick={() => handleStartChange('phone')}
                disabled={formData.phone === currentPhone}
              >
                Update Phone
              </Button>
            </div>
          </div>
        </div>
      )}

      {showOtp && (
        <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Verify Your Identity</h3>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a verification code to your {changingField === 'email' ? 'current email' : 'current phone'}
            </p>
          </div>

          <OtpInput
            length={6}
            value={otp}
            onChange={setOtp}
          />

          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={resetState}
                className="block w-full text-sm text-gray-600 hover:text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthEndpointChange