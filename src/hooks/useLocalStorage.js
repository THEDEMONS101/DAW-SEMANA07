import { useEffect, useState } from 'react'

// IA: Persistir carrito/wishlist/tema en cada context → código repetido
// Solución manual: useLocalStorage reutilizable con serialización
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}