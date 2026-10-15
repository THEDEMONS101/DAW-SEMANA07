import { useMemo, useCallback, useRef, useEffect, memo } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, X, ListTodo } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'

// IA: TaskItem se re-renderiza aunque sus props no cambien
// Solución manual: React.memo + handlers estables con useCallback
const TaskItem = memo(function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={`task-item ${task.completed ? 'task-item--done' : ''}`}>
      <button className="task-item__toggle" onClick={() => onToggle(task.id)}>
        {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
      </button>

      <span className="task-item__title">{task.title}</span>

      <button className="task-item__remove" onClick={() => onRemove(task.id)}>
        <Trash2 size={18} />
      </button>
    </li>
  )
})

export default function Dashboard() {
  const {
    items,
    filter,
    sort,
    totalCount,
    completedCount,
    activeCount,
    addTask,
    removeTask,
    toggleTask,
    setFilter,
    setSort,
    clearCompleted,
  } = useTasks()

  // IA: Autofocus en el input al montar → useRef evita re-render
  // Solución manual: useRef + useEffect con [] para ejecutarse una sola vez
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // IA: Filtrado + ordenamiento en cada render → lag con muchas tareas
  // Solución manual: useMemo con dependencias [items, filter, sort]
  const processedTasks = useMemo(() => {
    let result = [...items]

    if (filter === 'active') result = result.filter((t) => !t.completed)
    if (filter === 'completed') result = result.filter((t) => t.completed)

    result.sort((a, b) =>
      sort === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    )

    return result
  }, [items, filter, sort])

  // IA: Handlers recreados en cada render → TaskItem (memo) no se beneficia
  // Solución manual: useCallback estabiliza handlers
  const handleAdd = useCallback(
    (e) => {
      e.preventDefault()
      const value = inputRef.current?.value || ''
      addTask(value)
      if (inputRef.current) inputRef.current.value = ''
    },
    [addTask]
  )

  const handleRemove = useCallback((id) => removeTask(id), [removeTask])
  const handleToggle = useCallback((id) => toggleTask(id), [toggleTask])

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <ListTodo size={40} className="dashboard__icon" />
        <h1>Dashboard de Tareas</h1>
        <p>Estado complejo con useReducer + Context + useMemo + useCallback</p>
      </header>

      <form className="dashboard__form" onSubmit={handleAdd}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nueva tarea... (presiona Enter)"
          className="dashboard__input"
        />
        <button type="submit" className="btn btn--primary">
          <Plus size={18} /> Agregar
        </button>
      </form>

      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__value">{totalCount}</span>
          <span className="stat-card__label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{activeCount}</span>
          <span className="stat-card__label">Activas</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{completedCount}</span>
          <span className="stat-card__label">Completadas</span>
        </div>
      </div>

      <div className="dashboard__toolbar">
        <div className="dashboard__filters">
          <button
            className={`chip ${filter === 'all' ? 'chip--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`chip ${filter === 'active' ? 'chip--active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Activas
          </button>
          <button
            className={`chip ${filter === 'completed' ? 'chip--active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completadas
          </button>
        </div>

        <div className="dashboard__actions">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="asc">Título A-Z</option>
            <option value="desc">Título Z-A</option>
          </select>
          {completedCount > 0 && (
            <button className="btn btn--ghost" onClick={clearCompleted}>
              <X size={16} /> Limpiar
            </button>
          )}
        </div>
      </div>

      <ul className="dashboard__list">
        {processedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      {processedTasks.length === 0 && (
        <p className="dashboard__empty">No hay tareas para mostrar</p>
      )}
    </section>
  )
}