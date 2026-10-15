import { useReducer, useCallback, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { authReducer, authInitialState, AUTH_ACTIONS } from '../reducers/authReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function AuthProvider({ children }) {
  const [persistedUser, setPersistedUser] = useLocalStorage('gv-user', null)

  const [state, dispatch] = useReducer(authReducer, {
    ...authInitialState,
    user: persistedUser,
  })

  useEffect(() => {
    setPersistedUser(state.user)
  }, [state.user, setPersistedUser])

  const login = useCallback((user) => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: { id: Date.now(), name: user.name, email: user.email },
    })
  }, [])

  const register = useCallback((user) => {
    dispatch({
      type: AUTH_ACTIONS.REGISTER,
      payload: { id: Date.now(), name: user.name, email: user.email },
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