'use client'

import { useServerInsertedHTML } from 'next/navigation'
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'
const THEME_EVENT = 'devkit-theme'

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light')t='light';document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`

function readStoredTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore storage access errors
  }

  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore storage access errors
  }
}

function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) onChange()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(THEME_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(THEME_EVENT, onChange)
  }
}

function writeTheme(next: Theme) {
  applyTheme(next)
  window.dispatchEvent(new Event(THEME_EVENT))
}

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const inserted = useRef(false)
  const theme = useSyncExternalStore(subscribeTheme, readStoredTheme, () => 'light' as Theme)

  useServerInsertedHTML(() => {
    if (inserted.current) return null
    inserted.current = true
    return (
      <script
        id="theme-init"
        dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
      />
    )
  })

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: writeTheme,
      toggleTheme: () => writeTheme(theme === 'light' ? 'dark' : 'light'),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
