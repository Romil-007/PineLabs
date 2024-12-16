export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export const formatDate = (date) => {
  if (!date) return 'N/A'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return 'Invalid Date'
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid Date'
  }
}

export const formatPhoneNumber = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '+91 ' + match[1] + ' ' + match[2] + ' ' + match[3]
  }
  return phone
}

export const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}