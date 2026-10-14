export const cartInitialState = { items: [], isOpen: false }

export const CART_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  CLEAR: 'CLEAR',
  TOGGLE: 'TOGGLE',
}

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }
    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      }
    case CART_ACTIONS.INCREASE:
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case CART_ACTIONS.DECREASE:
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      }
    case CART_ACTIONS.CLEAR:
      return { ...state, items: [] }
    case CART_ACTIONS.TOGGLE:
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}