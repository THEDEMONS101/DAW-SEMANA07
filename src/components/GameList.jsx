import { useMemo, useCallback } from 'react'
import GameCard from './GameCard'
import { useFetch } from '../hooks/useFetch'

// API pública sin key (FreeToGame)
const API_URL = 'https://www.freetogame.com/api/games'

export default function GameList({ searchTerm }) {
  // PASO 5: Hook personalizado useFetch
  const { data, loading, error } = useFetch(API_URL)

  // PASO 4: useCallback estabiliza la función para que GameCard (memo) no re-renderice
  const handleAdd = useCallback((game) => {
    // Esta función se pasa a cada GameCard
    window.dispatchEvent(new CustomEvent('gamevault:add', { detail: game }))
  }, [])

  // PASO 4: useMemo filtra la lista solo cuando cambian los datos o el término
  const filteredGames = useMemo(() => {
    if (!data) return []
    const list = data.slice(0, 40).map((g) => ({
      id: g.id,
      title: g.title,
      genre: g.genre,
      image: g.thumbnail,
      price: Math.round((g.id % 60) + 9.99), // precio simulado
    }))

    if (!searchTerm.trim()) return list

    const term = searchTerm.toLowerCase()
    return list.filter(
      (g) =>
        g.title.toLowerCase().includes(term) ||
        g.genre.toLowerCase().includes(term)
    )
  }, [data, searchTerm])

  if (loading) return <div className="status">Cargando juegos... 🎮</div>
  if (error) return <div className="status">Error: {error} ⚠️</div>

  return (
    <>
      <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        {filteredGames.length} juegos encontrados
      </p>
      <div className="games-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} onAdd={handleAdd} />
        ))}
      </div>
    </>
  )
}