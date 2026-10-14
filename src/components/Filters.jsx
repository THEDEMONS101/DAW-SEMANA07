import { memo } from 'react'

const GENRES = ['Todos', 'Shooter', 'MMO', 'MOBA', 'Battle Royale', 'Strategy', 'Racing', 'Sports']

const Filters = memo(function Filters({ genre, setGenre, sort, setSort }) {
  return (
    <div className="filters">
      <div className="filters__group">
        <label>Género</label>
        <div className="filters__chips">
          {GENRES.map((g) => (
            <button
              key={g}
              className={`chip ${genre === g ? 'chip--active' : ''}`}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__group">
        <label>Ordenar por</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Relevancia</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="title">Título (A-Z)</option>
        </select>
      </div>
    </div>
  )
})

export default Filters