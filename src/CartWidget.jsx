import { useEffect, useState } from 'react'
import './App.css'
import BackgroundBlur from './components/background-blur/BackgroundBlur'
import CartPopup from './components/cart/CartPopup'
import { getCart, subscribe } from './cartStorage'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartRender, setCartRender] = useState(false)
  const [items, setItems] = useState([])

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
      <button className='button-main' onClick={toggleCart}>Open</button>
    </>
  )
}

export default App
