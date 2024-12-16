import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../ui/Button'
import OtpInput from './OtpInput'

function VerificationStep({ email, phone, verifiedFields, onVerify, onBack }) {
  const [currentField, setCurrentField] = useState(verifiedFields.email ? 'phone' : 'email')
  const [otp, setOtp] = useState('')

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    }

    await onVerify(currentField, otp)
    setOtp('')
    
    if (!verifiedFields[currentField === 'email' ? 'phone' : 'email']) {
      setCurrentField(currentField === 'email' ? 'phone' : 'email')
    }
  }

  const handleResend = () => {
    toast.success(`OTP resent to your ${currentField}`)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify your identity</h2>
        <p className="mt-2 text-sm text-gray-600">
          {currentField === 'email' 
            ? `We've sent a verification code to ${email}`
            : `We've sent a verification code to ${phone}`
        }
        </p>
      </div>

      <div className="space-y-4">
        <OtpInput
          length={6}
          value={otp}
          onChange={setOtp}
        />

        <div className="space-y-3">
          <Button
            className="w-full"
            onClick={handleVerify}
          >
            Verify {currentField === 'email' ? 'Email' : 'Phone'}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Resend OTP
            </button>
            <button
              type="button"
              onClick={onBack}
              className="block w-full text-sm text-gray-600 hover:text-gray-500"
            >
              Back to registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationStep