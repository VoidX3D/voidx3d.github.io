import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  set: (t: Theme) => void
}

const Context = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {}, set: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Context.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark'), set: setTheme }}>
      {children}
    </Context.Provider>
  )
}

export const useTheme = () => useContext(Context)
