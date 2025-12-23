export default function BottomBlock({
  subtotal,
  discountRate,
  discountAmount,
  discountedSubtotal
}) {
  const FREE_SHIPPING_THRESHOLD = 35
  const SHIPPING_COST = 2.99

  const hasFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD
  const shipping = hasFreeShipping ? 0 : SHIPPING_COST

  const hasDiscount = discountRate > 0

  let tierLabel = 'FREESHIP'
let tierText = 'Free Shipping'

if (discountRate === 0.10) {
  tierLabel = 'TIER10'
  tierText = '10% Off'
}

if (discountRate === 0.20) {
  tierLabel = 'TIER20'
  tierText = '20% Off'
}

  return (
    <div className="cart-bottom-block">
        <div
            className={`cart-bottom-discount-label-wrap tra ${
                hasDiscount ? 'open' : 'closed'
            }`}
        >
            <div className="cart-bottom-discount-label g8 f-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11"><path fill="color(display-p3 .9608 .9647 .9608)" fillRule="evenodd" d="M1.65914 0C1.21911 0 .797102.174802.485952.485952.174802.797102 0 1.21911 0 1.65914v2.38807c.000094.43999.174958.86194.486129 1.17301L5.78433 10.519c.50881.5088 1.32179.6559 1.96222.2367 1.19923-.78531 2.22361-1.80951 3.00915-3.0086.4192-.64154.2721-1.45396-.2367-1.96221L5.22078.486129a1.659258 1.659258 0 0 0-.53842-.359824A1.6591488 1.6591488 0 0 0 4.04721 0H1.65914Zm.62218 2.9035c.16502 0 .32327-.06555.43995-.18223s.18223-.27493.18223-.43995c0-.16501-.06555-.32326-.18223-.43994s-.27493-.18224-.43995-.18224c-.16501 0-.32326.06556-.43994.18224-.11668.11668-.18224.27493-.18224.43994 0 .16502.06556.32327.18224.43995.11668.11668.27493.18223.43994.18223Z" clipRule="evenodd"/></svg>
                <div className="f-row flex j-s-b">
                    <p className="tra gant">{tierLabel}</p>
                    <p className="tra gant">{tierText}</p>
                </div>
            </div>
        </div>
      <div className="f-row j-s-b">
        <p className="bottom-block-price-label gant">Subtotal:</p>

        <div className="bottom-block-price-wrap f-row g6">
          <p
            className={`gant tra strike ${hasDiscount ? '' : 'hide'}`}
            >
            £{subtotal.toFixed(2)}
        </p>

          <p
            className={`gant tra ${hasDiscount ? 'discount' : ''}`}
          >
            £{discountedSubtotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="f-row j-s-b">
        <p className="bottom-block-price-label gant">Shipping:</p>
        <div className="bottom-block-price-wrap">
          <p className={`tra gant ${hasFreeShipping ? 'free-shipping' : ''}`}>
            {hasFreeShipping ? 'Free' : `£${shipping.toFixed(2)}`}
          </p>
        </div>
      </div>

      <button className="button-main">
        Proceed To Checkout
      </button>
    </div>
  )
}
