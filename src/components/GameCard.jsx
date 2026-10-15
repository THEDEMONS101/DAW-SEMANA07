import { memo } from 'react'
import { Plus, Heart, Eye } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'

const GameCard = memo(function GameCard({ game, onAdd, onView }) {
  const { toggleItem, isInWishlist } = useWishlist()
  const liked = isInWishlist(game.id)

  const finalPrice = game.discount
    ? game.price * (1 - game.discount / 100)
    : game.price

  return (
    <article className="game-card">
      <div className="game-card__media">
        <img src={game.image} alt={game.title} loading="lazy" />

        <span className="game-card__genre">{game.genre}</span>

        {game.discount > 0 && (
          <span className="badge-discount">🔥 -{game.discount}%</span>
        )}
        {game.isNew && game.discount === 0 && (
          <span className="badge-new">✨ Nuevo</span>
        )}
      </div>

      <div className="game-card__body">
        <h3 className="game-card__title">{game.title}</h3>

        <div className="game-card__footer">
          <div className="game-card__prices">
            <span className="game-card__price">${finalPrice.toFixed(2)}</span>
            {game.discount > 0 && (
              <span className="game-card__old-price">
                ${game.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="game-card__actions">
            <button
              className="icon-btn"
              onClick={() => toggleItem(game)}
              title="Wishlist"
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button
              className="icon-btn"
              onClick={() => onView(game)}
              title="Ver detalle"
            >
              <Eye size={16} />
            </button>
            <button
              className="game-card__btn"
              onClick={() => onAdd({ ...game, price: finalPrice })}
              title="Añadir al carrito"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
})

export default GameCard