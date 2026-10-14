import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const {
    items,
    isOpen,
    total,
    toggleCart,
    removeItem,
    increase,
    decrease,
    clearCart,
    confirmCheckout,
  } = useCart()
  const { isAuthenticated, openAuthModal } = useAuth()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (!isAuthenticated) {
      openAuthModal('login')
      return
    }
    confirmCheckout()
  }

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-panel__header">
          <h2>🛒 Carrito ({items.length})</h2>
          <button className="icon-btn" onClick={toggleCart}>
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-panel__empty">Tu carrito está vacío 🎮</p>
        ) : (
          <>
            <div className="cart-panel__items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item__info">
                    <h4>{item.title}</h4>
                    <span>${item.price.toFixed(2)}</span>
                    <div className="cart-item__qty">
                      <button onClick={() => decrease(item.id)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increase(item.id)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-panel__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            {!isAuthenticated && (
              <p className="cart-panel__hint">
                🔒 Inicia sesión para finalizar tu compra
              </p>
            )}

            <div className="cart-panel__actions">
              <button className="btn btn--ghost" onClick={clearCart}>
                Vaciar
              </button>
              <button className="btn btn--success" onClick={handleCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}