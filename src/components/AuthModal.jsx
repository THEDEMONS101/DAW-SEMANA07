import { useEffect, useRef, useState } from 'react'
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal, switchMode, login, register } = useAuth()
  const closeRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  // Focus en el primer input al abrir
  useEffect(() => {
    if (isAuthModalOpen) {
      closeRef.current?.focus()
      setForm({ name: '', email: '', password: '' })
      setError('')
    }
  }, [isAuthModalOpen, authMode])

  // Cerrar con Escape
  useEffect(() => {
    if (!isAuthModalOpen) return
    const handler = (e) => e.key === 'Escape' && closeAuthModal()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isAuthModalOpen, closeAuthModal])

  if (!isAuthModalOpen) return null

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password.trim()) {
      setError('Email y contraseña son obligatorios')
      return
    }
    if (authMode === 'register' && !form.name.trim()) {
      setError('El nombre es obligatorio para registrarse')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (authMode === 'login') {
      login({ name: form.email.split('@')[0], email: form.email })
    } else {
      register({ name: form.name, email: form.email })
    }
  }

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal__close" onClick={closeAuthModal}>
          <X size={22} />
        </button>

        <div className="auth-modal__header">
          <h2>{authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <p>
            {authMode === 'login'
              ? 'Bienvenido de vuelta a GameVault'
              : 'Únete y empieza a comprar videojuegos'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <div className="auth-form__field">
              <UserIcon size={18} />
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-form__field">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="auth-form__field">
            <Lock size={18} />
            <input
              type="password"
              name="password"
              placeholder="Contraseña (mín. 6 caracteres)"
              value={form.password}
              onChange={handleChange}
              autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="auth-form__error">⚠️ {error}</p>}

          <button type="submit" className="btn btn--primary auth-form__submit">
            {authMode === 'login' ? (
              <>
                <LogIn size={16} /> Iniciar Sesión
              </>
            ) : (
              <>
                <UserPlus size={16} /> Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div className="auth-modal__footer">
          {authMode === 'login' ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button onClick={switchMode}>Regístrate aquí</button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button onClick={switchMode}>Inicia sesión</button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}