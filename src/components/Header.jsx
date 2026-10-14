import { Gamepad2, ShoppingCart, Heart, Sun, Moon, LogIn } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import UserMenu from './UserMenu'

export default function Header({ section, setSection }) {
  const { theme, toggleTheme } = useTheme()
  const { totalItems, toggleCart } = useCart()
  const { totalItems: wishCount, togglePanel } = useWishlist()
  const { isAuthenticated, openAuthModal } = useAuth()

  const navItems = [
    { id: 'catalog', label: 'Catálogo' },
    { id: 'ofertas', label: 'Ofertas' },
    { id: 'novedades', label: 'Novedades' },
  ]

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={() => setSection('catalog')}
        style={{ cursor: 'pointer' }}
      >
        <Gamepad2 size={30} />
        <span>GameVault</span>
      </div>

      <nav className="header__nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${section === item.id ? 'nav-link--active' : ''}`}
            onClick={() => setSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header__actions">
        <button className="header__btn" onClick={toggleTheme} title="Cambiar tema">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="header__btn" onClick={togglePanel} title="Wishlist">
          <Heart size={18} />
          {wishCount > 0 && <span className="badge">{wishCount}</span>}
        </button>

        <button className="header__btn" onClick={toggleCart} title="Carrito">
          <ShoppingCart size={18} />
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            className="header__btn header__btn--login"
            onClick={() => openAuthModal('login')}
          >
            <LogIn size={18} />
            <span>Iniciar sesión</span>
          </button>
        )}
      </div>
    </header>
  )
}