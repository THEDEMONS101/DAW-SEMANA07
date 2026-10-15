// IA: Estado de lista con múltiples acciones (ADD, REMOVE, TOGGLE, FILTER, SORT)
// Solución manual: useReducer centraliza las transiciones con inmutabilidad
export const tasksInitialState = {
  items: [
    { id: 1, title: 'Estudiar React Hooks', completed: false },
    { id: 2, title: 'Hacer la práctica de DAW Semana 07', completed: true },
    { id: 3, title: 'Subir proyecto a GitHub', completed: false },
    { id: 4, title: 'Grabar video explicativo', completed: false },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
  sort: 'asc',   // 'asc' | 'desc'
}

export const TASKS_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  TOGGLE: 'TOGGLE',
  FILTER: 'FILTER',
  SORT: 'SORT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
}

export function tasksReducer(state, action) {
  switch (action.type) {
    case TASKS_ACTIONS.ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            title: action.payload,
            completed: false,
          },
        ],
      }

    case TASKS_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((t) => t.id !== action.payload),
      }

    case TASKS_ACTIONS.TOGGLE:
      return {
        ...state,
        items: state.items.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      }

    case TASKS_ACTIONS.FILTER:
      return { ...state, filter: action.payload }

    case TASKS_ACTIONS.SORT:
      return { ...state, sort: action.payload }

    case TASKS_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter((t) => !t.completed),
      }

    default:
      return state
  }
}