const PREFIX = 'pos_'

export const storage = {
  set: (key, value) => {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
  },
  get: (key) => {
    const item = localStorage.getItem(`${PREFIX}${key}`)
    return item ? JSON.parse(item) : null
  },
  remove: (key) => {
    localStorage.removeItem(`${PREFIX}${key}`)
  },
  clear: () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key))
  }
}