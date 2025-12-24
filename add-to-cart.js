(function () {
  const CART_KEY = 'cart:v1'

  function getQtyValueEl() {
    return document.getElementById('qty-value')
  }

  function setQty(n) {
    const el = getQtyValueEl()
    if (!el) return
    el.textContent = n
  }

  function getQty() {
    const el = getQtyValueEl()
    if (!el) return 1
    const n = parseInt(el.textContent, 10)
    return Number.isFinite(n) && n > 0 ? n : 1
  }

  function addToCart(qty) {
    const item = {
      id: 'tallow-honey-moisturiser',
      priceId: 'price_XXXXXXXXXXXX', // REQUIRED
      name: 'Tallow & Honey Moisturiser',
      price: 26.95,
      qty
    }

    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    const existing = cart.find(i => i.id === item.id)

    if (existing) {
      existing.qty += qty
    } else {
      cart.push(item)
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    window.dispatchEvent(new Event('cart:update'))
    window.dispatchEvent(new Event('cart:open'))
  }

  document.addEventListener('click', function (e) {
    const inc = e.target.closest('#qty-increase')
    const dec = e.target.closest('#qty-decrease')
    const add = e.target.closest('.add-to-cart')

    if (inc) {
      setQty(getQty() + 1)
      return
    }

    if (dec) {
      const next = getQty() - 1
      setQty(next < 1 ? 1 : next)
      return
    }

    if (add) {
      e.preventDefault()
      addToCart(getQty())
    }
  })
})()
