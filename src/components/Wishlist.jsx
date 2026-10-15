import { X, ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'

export default function Wishlist() {
  const { items, isOpen, togglePanel, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  if (!isOpen) return null

  const moveToCart = (game) => {
    addItem(game)
    removeItem(game.id)
  }

  return (
    <div className="cart-overlay" onClick={togglePanel}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-panel__header">
          <h2>❤️ Wishlist ({items.length})</h2>
          <button className="icon-btn" onClick={togglePanel}>
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-panel__empty">Aún no tienes favoritos</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item__info">
                  <h4>{item.title}</h4>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="cart-item__actions">
                  <button
                    className="icon-btn"
                    onClick={() => moveToCart(item)}
                    title="Mover al carrito"
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    className="icon-btn icon-btn--danger"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-panel__actions">
              <button className="btn btn--ghost" onClick={clearWishlist}>
                Vaciar wishlist
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}