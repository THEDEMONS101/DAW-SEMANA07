import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { authReducer, authInitialState, AUTH_ACTIONS } from '../reducers/authReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Persistimos solo el usuario, no el estado de UI
  const [persistedUser, setPersistedUser] = useLocalStorage('gv-user', null)

  const [state, dispatch] = useReducer(authReducer, {
    ...authInitialState,
    user: persistedUser,
  })

  // Sincroniza usuario con localStorage
  useEffect(() => {
    setPersistedUser(state.user)
  }, [state.user, setPersistedUser])

  // IA: Funciones recreadas en cada render → hijos re-renderizan
  // Solución manual: useCallback estabiliza handlers de auth
  const login = useCallback((user) => {
    // Simulación de login: guardamos datos del formulario
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        id: Date.now(),
        name: user.name,
        email: user.email,
      },
    })
  }, [])

  const register = useCallback((user) => {
    dispatch({
      type: AUTH_ACTIONS.REGISTER,
      payload: {
        id: Date.now(),
        name: user.name,
        email: user.email,
      },
    })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }, [])

  const openAuthModal = useCallback((mode = 'login') => {
    dispatch({ type: AUTH_ACTIONS.OPEN_MODAL, payload: mode })
  }, [])

  const closeAuthModal = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLOSE_MODAL })
  }, [])

  const switchMode = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.SWITCH_MODE })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: !!state.user,
        isAuthModalOpen: state.isAuthModalOpen,
        authMode: state.authMode,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        switchMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}