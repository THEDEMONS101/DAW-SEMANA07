import { useMemo, useCallback } from 'react'
import GameCard from './GameCard'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../hooks/useCart'
import { useDebounce } from '../hooks/useDebounce'

const API_URL = 'https://www.freetogame.com/api/games'

export default function GameGrid({ searchTerm, genre, sort, section, onView }) {
  const { data, loading, error } = useFetch(API_URL)
  const { addItem } = useCart()

  const debouncedSearch = useDebounce(searchTerm, 300)

  const games = useMemo(() => {
    if (!data) return []

    let list = data.slice(0, 40).map((g, idx) => ({
      id: g.id,
      title: g.title,
      genre: g.genre,
      image: g.thumbnail,
      description: g.short_description,
      platform: g.platform,
      price: Number(((g.id % 50) + 9.99).toFixed(2)),
      discount: g.id % 3 === 0 ? 30 : 0, // 33% de juegos tienen descuento
      isNew: idx < 10, // los primeros 10 son "novedades"
    }))

    // 👇 Filtros por sección
    if (section === 'ofertas') {
      list = list.filter((g) => g.discount > 0)
    } else if (section === 'novedades') {
      list = list.filter((g) => g.isNew)
    }

    if (genre !== 'Todos') list = list.filter((g) => g.genre === genre)

    if (debouncedSearch.trim()) {
      const t = debouncedSearch.toLowerCase()
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(t) ||
          g.genre.toLowerCase().includes(t)
      )
    }

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'title':
        list = [...list].sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return list
  }, [data, debouncedSearch, genre, sort, section])

  const handleAdd = useCallback((game) => addItem(game), [addItem])
  const handleView = useCallback((game) => onView(game), [onView])

  if (loading) return <SkeletonGrid />
  if (error) return <div className="status">⚠️ Error al cargar: {error}</div>
  if (!games.length)
    return <div className="status">No se encontraron juegos en esta sección.</div>

  return (
    <>
      <p className="results-count">{games.length} juegos encontrados</p>
      <div className="games-grid">
        {games.map((g) => (
          <GameCard key={g.id} game={g} onAdd={handleAdd} onView={handleView} />
        ))}
      </div>
    </>
  )
}

function SkeletonGrid() {
  return (
    <div className="games-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="game-card skeleton" />
      ))}
    </div>
  )
}