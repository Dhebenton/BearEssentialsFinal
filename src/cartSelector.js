export function getSubtotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.qty
  }, 0)
}

export function getLineItem(items) {
  if (!items.length) return null

  const item = items[0]

  return {
    name: item.name,
    quantity: item.qty,
    unit_amount: Math.round(item.price * 100),
    currency: 'gbp'
  }
}