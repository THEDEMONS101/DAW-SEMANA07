// IA: Estado de autenticación con múltiples acciones (login, registro, logout)
// Solución manual: useReducer centraliza las transiciones de estado
export const authInitialState = {
  user: null,       // { id, name, email }
  isAuthModalOpen: false,
  authMode: 'login', // 'login' | 'register'
}

export const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SWITCH_MODE: 'SWITCH_MODE',
}

export function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
    case AUTH_ACTIONS.REGISTER:
      return { ...state, user: action.payload, isAuthModalOpen: false }

    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null }

    case AUTH_ACTIONS.OPEN_MODAL:
      return { ...state, isAuthModalOpen: true, authMode: action.payload || 'login' }

    case AUTH_ACTIONS.CLOSE_MODAL:
      return { ...state, isAuthModalOpen: false }

    case AUTH_ACTIONS.SWITCH_MODE:
      return { ...state, authMode: state.authMode === 'login' ? 'register' : 'login' }

    default:
      return state
  }
}