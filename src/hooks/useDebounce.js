import { useEffect, useState } from 'react'

// IA: El buscador dispara filtrados en cada tecla → renders innecesarios
// Solución manual: useDebounce con setTimeout + cleanup
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}