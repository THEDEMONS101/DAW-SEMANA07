import { useEffect } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('gv-theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}