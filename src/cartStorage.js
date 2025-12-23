const hasStorage = typeof window !== 'undefined' && 'localStorage' in window

const KEY = 'cart:v1'

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}

export function getCart() {
  return safeParse(localStorage.getItem(KEY)) || []
}

export function setCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart))
  notify()
}

export function clearCart() {
  localStorage.removeItem(KEY)
  notify()
}

function notify() {
  window.dispatchEvent(new Event('cart:update'))
}

export function subscribe(fn) {
  window.addEventListener('cart:update', fn)
  return () => window.removeEventListener('cart:update', fn)
}

export function addItem(item) {
  const cart = getCart()
  const existing = cart.find(i => i.id === item.id)

  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ ...item, qty: 1 })
  }

  setCart(cart)
}

export function increment(id) {
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return
  item.qty += 1
  setCart(cart)
}

export function decrement(id) {
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return

  item.qty -= 1
  if (item.qty <= 0) {
    setCart(cart.filter(i => i.id !== id))
  } else {
    setCart(cart)
  }
}

export function removeItem(id) {
  setCart(getCart().filter(i => i.id !== id))
}

export function setQuantity(id, qty) {
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return

  const value = Math.floor(qty)

  if (value <= 0 || Number.isNaN(value)) {
    setCart(cart.filter(i => i.id !== id))
  } else {
    item.qty = value
    setCart(cart)
  }
}