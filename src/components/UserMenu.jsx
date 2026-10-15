import { useEffect, useRef, useState } from 'react'
import { LogOut, Package } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu__trigger" onClick={() => setOpen(!open)}>
        <span className="user-menu__avatar">{initials}</span>
      </button>

      {open && (
        <div className="user-menu__dropdown">
          <div className="user-menu__info">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <button className="user-menu__item">
            <Package size={16} /> Mis pedidos
          </button>
          <button className="user-menu__item user-menu__item--danger" onClick={logout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}