import { useState } from 'react'
import { toast } from 'react-hot-toast'
import OtpInput from './OtpInput'
import Button from '../ui/Button'

function OtpVerification({ phone, onVerify, onResend, onBack }) {
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    }

    setIsVerifying(true)
    try {
      await onVerify(otp)
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify your identity</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to {phone}
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
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={onResend}
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            Resend OTP
          </button>
          <button
            type="button"
            onClick={onBack}
            className="block w-full text-sm text-gray-600 hover:text-gray-500"
          >
            Use different method
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification