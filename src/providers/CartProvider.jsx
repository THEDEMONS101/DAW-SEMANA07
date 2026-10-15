import { useReducer, useCallback, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { cartReducer, cartInitialState, CART_ACTIONS } from '../reducers/cartReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('gv-cart', cartInitialState)
  const [state, dispatch] = useReducer(cartReducer, persisted)
  const [checkout, setCheckout] = useState(null)

  useEffect(() => {
    setPersisted(state)
  }, [state, setPersisted])

  const addItem = useCallback((game) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: game })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: id })
  }, [])

  const increase = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.INCREASE, payload: id })
  }, [])

  const decrease = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.DECREASE, payload: id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.TOGGLE })
  }, [])

  const confirmCheckout = useCallback(() => {
    if (state.items.length === 0) return
    const orderNumber = Math.floor(100000 + Math.random() * 900000)
    setCheckout({
      orderNumber,
      total: state.items.reduce((a, i) => a + i.price * i.quantity, 0),
      items: state.items,
    })
    dispatch({ type: CART_ACTIONS.CLEAR })
    dispatch({ type: CART_ACTIONS.TOGGLE })
  }, [state.items])

  const closeCheckout = useCallback(() => setCheckout(null), [])

  const total = state.items.reduce((a, i) => a + i.price * i.quantity, 0)
  const totalItems = state.items.reduce((a, i) => a + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        total,
        totalItems,
        addItem,
        removeItem,
        increase,
        decrease,
        clearCart,
        toggleCart,
        checkout,
        confirmCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}