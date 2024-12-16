// Simulated API functions for demonstration
export const simulateApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export const simulateError = (message, delay = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}