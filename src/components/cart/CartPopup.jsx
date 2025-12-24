import { useEffect, useState } from 'react'
import BottomBlock from './BottomBlock'
import './Cart.css'
import EmptyCart from './EmptyCart'
import ProductTile from './ProductTile'
import TopBlock from './TopBlock'

export default function CartPopup({ cartOpen, OpenCart, items }) {
  const isEmpty = items.length === 0

  const [showFilled, setShowFilled] = useState(!isEmpty)

  useEffect(() => {
    if (isEmpty) {
      setShowFilled(false)
    } else {
      setShowFilled(true)
    }
  }, [isEmpty])

  /* 1. Subtotal FIRST */
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  /* 2. Discount logic AFTER subtotal */
  let discountRate = 0

  if (subtotal >= 75) {
    discountRate = 0.20
  } else if (subtotal >= 50) {
    discountRate = 0.10
  }

  const discountAmount = subtotal * discountRate
  const discountedSubtotal = subtotal - discountAmount

  const checkoutItems = items.map(item => ({
  qty: item.qty
}))


  return (
    <div className={`cart-pop-up-wrap tra ${cartOpen ? '' : 'hide'}`}>
      <TopBlock
        OpenCart={OpenCart}
        subtotal={subtotal}
      />

      <div className="f-col relative">
        {/* FILLED STATE */}
        <div className={`cart-content ${showFilled ? '' : 'hide'}`}>
          {items.map(item => (
            <ProductTile key={item.id} item={item} />
          ))}
        </div>

        {/* EMPTY STATE */}
        <div className={`cart-content flex f-col empty-cart-wrap ${isEmpty ? '' : 'hide'}`}>
          <EmptyCart />
        </div>
      </div>

      <div className={`cart-content ${showFilled ? '' : 'hide'}`}>
        <BottomBlock
          subtotal={subtotal}
          discountRate={discountRate}
          discountAmount={discountAmount}
          discountedSubtotal={discountedSubtotal}
          checkoutItems={checkoutItems}
          isEmpty={isEmpty}
        />
      </div>
    </div>
  )
}

