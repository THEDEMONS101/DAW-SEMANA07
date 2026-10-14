import { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react'
import { cartReducer, cartInitialState, CART_ACTIONS } from '../reducers/cartReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('gv-cart', cartInitialState)
  const [state, dispatch] = useReducer(cartReducer, persisted)

  // Estado del checkout
  const [checkout, setCheckout] = useState(null) // { orderNumber, total, items } | null

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

  const total = state.items.reduce((a, i) => a + i.price * i.quantity, 0)
  const totalItems = state.items.reduce((a, i) => a + i.quantity, 0)

  // Simula el proceso de checkout
  const confirmCheckout = useCallback(() => {
    if (state.items.length === 0) return
    const orderNumber = Math.floor(100000 + Math.random() * 900000)
    setCheckout({
      orderNumber,
      total: state.items.reduce((a, i) => a + i.price * i.quantity, 0),
      items: state.items,
    })
    dispatch({ type: CART_ACTIONS.CLEAR })
    dispatch({ type: CART_ACTIONS.TOGGLE }) // cierra el panel
  }, [state.items])

  const closeCheckout = useCallback(() => setCheckout(null), [])

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

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}