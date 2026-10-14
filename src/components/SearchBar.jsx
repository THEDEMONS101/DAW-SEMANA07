import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)

  // Autofocus al montar (una sola vez)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Atajo Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="search-bar">
      <Search size={20} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar por título o género... (Ctrl + K)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}