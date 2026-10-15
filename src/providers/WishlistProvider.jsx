import { useReducer, useCallback } from 'react'
import { WishlistContext } from '../contexts/WishlistContext'
import { wishlistReducer, wishlistInitialState, WISHLIST_ACTIONS } from '../reducers/wishlistReducer'

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, wishlistInitialState)

  const toggleItem = useCallback((game) => {
    dispatch({ type: WISHLIST_ACTIONS.TOGGLE_ITEM, payload: game })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE, payload: id })
  }, [])

  const clearWishlist = useCallback(() => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR })
  }, [])

  const togglePanel = useCallback(() => {
    dispatch({ type: WISHLIST_ACTIONS.TOGGLE_PANEL })
  }, [])

  const isInWishlist = useCallback(
    (id) => state.items.some((i) => i.id === id),
    [state.items]
  )

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        toggleItem,
        removeItem,
        clearWishlist,
        togglePanel,
        isInWishlist,
        totalItems: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}