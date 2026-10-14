import { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CheckoutModal({ orderNumber, total, items, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="checkout-modal__icon">
          <CheckCircle2 size={64} />
        </div>

        <h2>¡Compra realizada!</h2>
        <p className="checkout-modal__subtitle">
          Gracias por tu compra. Hemos enviado los detalles a tu correo.
        </p>

        <div className="checkout-modal__order">
          <div className="checkout-modal__row">
            <span>N° de orden</span>
            <strong>#{orderNumber}</strong>
          </div>
          <div className="checkout-modal__row">
            <span>Artículos</span>
            <strong>{items.reduce((a, i) => a + i.quantity, 0)}</strong>
          </div>
          <div className="checkout-modal__row checkout-modal__row--total">
            <span>Total pagado</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="checkout-modal__items">
          {items.map((item) => (
            <div key={item.id} className="checkout-modal__item">
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <span>
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn--success" onClick={onClose}>
          Seguir comprando
        </button>
      </div>
    </div>
  )
}