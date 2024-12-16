import { useRef, useEffect } from 'react'

function OtpInput({ length = 6, value, onChange }) {
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleChange = (e, index) => {
    const newValue = e.target.value
    if (newValue.match(/^[0-9]$/)) {
      const otpArray = value.split('')
      otpArray[index] = newValue
      const newOtp = otpArray.join('')
      onChange(newOtp)
      
      if (index < length - 1) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  )
}

export default OtpInput