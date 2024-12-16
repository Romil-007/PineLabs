export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/
  return re.test(phone)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}

export const validateNumber = (value) => {
  return !isNaN(value) && value >= 0
}

export const validateSKU = (sku) => {
  const re = /^[A-Z0-9]{6,}$/
  return re.test(sku)
}