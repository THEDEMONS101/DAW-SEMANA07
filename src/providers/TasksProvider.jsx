import { useReducer, useCallback, useEffect } from 'react'
import { TasksContext } from '../contexts/TasksContext'
import { tasksReducer, tasksInitialState, TASKS_ACTIONS } from '../reducers/tasksReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function TasksProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('gv-tasks', tasksInitialState)
  const [state, dispatch] = useReducer(tasksReducer, persisted)

  useEffect(() => {
    setPersisted(state)
  }, [state, setPersisted])

  const addTask = useCallback((title) => {
    if (!title.trim()) return
    dispatch({ type: TASKS_ACTIONS.ADD, payload: title.trim() })
  }, [])

  const removeTask = useCallback((id) => {
    dispatch({ type: TASKS_ACTIONS.REMOVE, payload: id })
  }, [])

  const toggleTask = useCallback((id) => {
    dispatch({ type: TASKS_ACTIONS.TOGGLE, payload: id })
  }, [])

  const setFilter = useCallback((filter) => {
    dispatch({ type: TASKS_ACTIONS.FILTER, payload: filter })
  }, [])

  const setSort = useCallback((sort) => {
    dispatch({ type: TASKS_ACTIONS.SORT, payload: sort })
  }, [])

  const clearCompleted = useCallback(() => {
    dispatch({ type: TASKS_ACTIONS.CLEAR_COMPLETED })
  }, [])

  const totalCount = state.items.length
  const completedCount = state.items.filter((t) => t.completed).length
  const activeCount = totalCount - completedCount

  return (
    <TasksContext.Provider
      value={{
        items: state.items,
        filter: state.filter,
        sort: state.sort,
        totalCount,
        completedCount,
        activeCount,
        addTask,
        removeTask,
        toggleTask,
        setFilter,
        setSort,
        clearCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}