import { useState } from 'react'

// IA: ¿Por qué aumenta el contador de renders? → useRef vs useState
// Solución manual: useState dispara render, useRef NO.
export default function Counter() {
  const [count, setCount] = useState(0)

  // IA: Necesito contar renders SIN causar más renders
  // Solución manual: useRef persiste entre renders sin re-renderizar
  const [renderCount, setRenderCount] = useState(0)
  const [lastAction, setLastAction] = useState('ninguna')

  // Cada vez que cambia count, se ejecuta este render
  // (el renderCount lo incrementamos manualmente para la demo)
  const increment = () => {
    setCount((c) => c + 1)
    setRenderCount((r) => r + 1)
    setLastAction('increment')
  }

  const decrement = () => {
    setCount((c) => c - 1)
    setRenderCount((r) => r + 1)
    setLastAction('decrement')
  }

  const reset = () => {
    setCount(0)
    setRenderCount((r) => r + 1)
    setLastAction('reset')
  }

  return (
    <div className="counter-demo">
      <h3>1️⃣ Ciclo de Render — Contador con useState</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Cada cambio de estado dispara un re-render. StrictMode ejecuta doble en
        desarrollo.
      </p>

      <div className="counter-demo__value">{count}</div>

      <div className="counter-demo__btns">
        <button className="counter-demo__btn btn-reset" onClick={reset}>
          Reset
        </button>
        <button className="counter-demo__btn btn-add" onClick={increment}>
          Sumar
        </button>
        <button className="counter-demo__btn btn-sub" onClick={decrement}>
          Restar
        </button>
      </div>

      <div className="counter-demo__info">
        Re-renders: {renderCount} | Última acción: <b>{lastAction}</b>
      </div>
    </div>
  )
}