import { useEffect, useState } from 'react'

// IA: Peticiones huérfanas al cambiar filtros → memory leak + race conditions
// Solución manual: AbortController + flag isMounted dentro del cleanup
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (isMounted) setData(json)
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}