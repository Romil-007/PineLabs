import { 
  CreditCardIcon, 
  BanknotesIcon, 
  QrCodeIcon,
  WalletIcon 
} from '@heroicons/react/24/outline'
import Toggle from '../ui/Toggle'

function PaymentSettings({ paymentMethods, onUpdate }) {
  const methods = [
    {
      id: 'creditCard',
      label: 'Credit Card',
      description: 'Accept credit card payments',
      icon: CreditCardIcon
    },
    {
      id: 'debitCard',
      label: 'Debit Card',
      description: 'Accept debit card payments',
      icon: CreditCardIcon
    },
    {
      id: 'upi',
      label: 'UPI',
      description: 'Accept UPI payments',
      icon: QrCodeIcon
    },
    {
      id: 'cash',
      label: 'Cash',
      description: 'Accept cash payments',
      icon: BanknotesIcon
    },
    {
      id: 'wallet',
      label: 'Digital Wallet',
      description: 'Accept digital wallet payments',
      icon: WalletIcon
    }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Payment Methods</h3>
      <div className="space-y-4">
        {methods.map(method => (
          <div key={method.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <method.icon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">{method.label}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            <Toggle 
              enabled={paymentMethods[method.id]} 
              onChange={() => onUpdate(method.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentSettings