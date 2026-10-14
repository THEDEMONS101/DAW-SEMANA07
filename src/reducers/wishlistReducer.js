export const wishlistInitialState = { items: [], isOpen: false }

export const WISHLIST_ACTIONS = {
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
  TOGGLE_PANEL: 'TOGGLE_PANEL',
}

export function wishlistReducer(state, action) {
  switch (action.type) {
    case WISHLIST_ACTIONS.TOGGLE_ITEM: {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case WISHLIST_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      }
    case WISHLIST_ACTIONS.CLEAR:
      return { ...state, items: [] }
    case WISHLIST_ACTIONS.TOGGLE_PANEL:
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}