export const PAYMENT_METHODS = {
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  UPI: 'UPI',
  CASH: 'Cash',
  WALLET: 'Digital Wallet'
}

export const CARD_PROCESSORS = {
  STRIPE: 'Stripe',
  RAZORPAY: 'Razorpay',
  PAYPAL: 'PayPal',
  SQUARE: 'Square',
  ADYEN: 'Adyen',
  CUSTOM: 'Custom'
}

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CASHIER: 'cashier'
}

export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  FAILED: 'failed'
}