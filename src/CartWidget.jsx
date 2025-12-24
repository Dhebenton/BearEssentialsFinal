import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import BackgroundBlur from './components/background-blur/BackgroundBlur'
import CartPopup from './components/cart/CartPopup'
import { getCart, subscribe } from './cartStorage'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartRender, setCartRender] = useState(false)
  const [items, setItems] = useState([])
  const [cartButtonRoot, setCartButtonRoot] = useState(null)

  function toggleCart() {
    if (cartRender) {
      setCartOpen(false)
      setTimeout(() => setCartRender(false), 350)
    } else {
      setCartRender(true)
      setTimeout(() => setCartOpen(true), 4)
    }
  }

  useEffect(() => {
    setItems(getCart())
    const unsub = subscribe(() => setItems(getCart()))
    return unsub
  }, [])

  useEffect(() => {
    setCartButtonRoot(document.getElementById('cart-button'))
  }, [])

  useEffect(() => {
  const open = () => {
    if (!cartRender) {
      setCartRender(true)
      setTimeout(() => setCartOpen(true), 4)
    } else {
      setCartOpen(true)
    }
  }

  window.addEventListener('cart:open', open)
  return () => window.removeEventListener('cart:open', open)
}, [cartRender])



  return (
    <>
      {cartRender && (
        <BackgroundBlur cartOpen={cartOpen} OpenCart={toggleCart} />
      )}
      {cartRender && (
        <CartPopup
          cartOpen={cartOpen}
          OpenCart={toggleCart}
          items={items}
        />
      )}

      {cartButtonRoot &&
        createPortal(
          <button className="nav-button f-row j-c cart" onClick={toggleCart}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 14">
              <path d="M.538462 0C.395653 0 .258693.0567305.157712.157712.0567306.258693 0 .395653 0 .538462 0 .68127.0567306.81823.157712.919211c.100981.100979.237941.157709.38075.157709h.995078c.12205 0 .22831.08185.2599.19959l1.83651 6.88657c-.57682.15029-1.0875.48766-1.45206.95926-.36455.47161-.56238 1.05086-.56251 1.64686 0 .2973.24124.5385.53847.5385H13.4615c.1428 0 .2798-.0567.3808-.1577.101-.101.1577-.238.1577-.3808 0-.1428-.0567-.2797-.1577-.3807-.101-.101-.238-.1577-.3808-.1577H2.78421c.11137-.31506.3177-.58779.59055-.78067.27285-.19287.5988-.29638.93293-.29628h8.05391c.1009 0 .1998-.02834.2853-.08177.0856-.05344.1544-.12984.1986-.22049.8197-1.68208 1.5296-3.41549 2.1252-5.18933.0235-.07018.0323-.14445.0259-.21818-.0065-.07373-.0281-.14533-.0635-.21035-.0353-.06501-.0837-.12204-.1421-.16751-.0584-.04547-.1256-.07842-.1973-.09678-3.7866-.96554-7.68556-1.41878-11.59267-1.34759L2.83446.999385c-.07642-.286648-.24539-.540024-.48064-.72075C2.11856.0979087 1.8302-.000044 1.53354 0H.538462ZM1.61538 12.9231c0-.2856.11347-.5596.31543-.7615.20196-.202.47588-.3154.7615-.3154.28562 0 .55954.1134.7615.3154.20196.2019.31542.4759.31542.7615 0 .2856-.11346.5595-.31542.7615-.20196.2019-.47588.3154-.7615.3154-.28562 0-.55954-.1135-.7615-.3154-.20196-.202-.31543-.4759-.31543-.7615Zm9.15382 0c0-.2856.1135-.5596.3155-.7615.2019-.202.4758-.3154.7615-.3154.2856 0 .5595.1134.7615.3154.2019.2019.3154.4759.3154.7615 0 .2856-.1135.5595-.3154.7615-.202.2019-.4759.3154-.7615.3154-.2857 0-.5596-.1135-.7615-.3154-.202-.202-.3155-.4759-.3155-.7615Z" />
            </svg>
          </button>,
          cartButtonRoot
        )}
    </>
  )
}

export default App
