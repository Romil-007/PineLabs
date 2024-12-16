import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { validatePhone } from '../../utils/validators'

function PhoneLogin({ onSubmit, onBack }) {
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number')
      return
    }

    setIsLoading(true)
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSubmit(phone)
      toast.success('OTP sent successfully')
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign in with phone</h2>
        <p className="mt-2 text-sm text-gray-600">
          We'll send you a one-time verification code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your 10-digit phone number"
          required
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="block w-full text-sm text-gray-600 hover:text-gray-500"
        >
          Back to login
        </button>
      </form>
    </div>
  )
}

export default PhoneLogin