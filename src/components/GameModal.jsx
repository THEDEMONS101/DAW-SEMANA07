import { useEffect, useRef } from 'react'
import { X, Plus, Heart } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

export default function GameModal({ game, onClose }) {
  const closeRef = useRef(null)
  const { addItem, toggleCart } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()

  // Focus en el botón de cerrar al abrir
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!game) return null

  const liked = isInWishlist(game.id)

  const handleAdd = () => {
    addItem(game)
    onClose()
    toggleCart()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal__close" onClick={onClose}>
          <X size={22} />
        </button>

        <img className="modal__image" src={game.image} alt={game.title} />

        <div className="modal__body">
          <span className="modal__genre">{game.genre}</span>
          <h2>{game.title}</h2>
          <p className="modal__desc">{game.description}</p>
          <p className="modal__platform">Plataforma: {game.platform}</p>

          <div className="modal__footer">
            <span className="modal__price">${game.price.toFixed(2)}</span>
            <div className="modal__actions">
              <button
                className="btn btn--ghost"
                onClick={() => toggleItem(game)}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Quitar' : 'Wishlist'}
              </button>
              <button className="btn btn--primary" onClick={handleAdd}>
                <Plus size={16} /> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}