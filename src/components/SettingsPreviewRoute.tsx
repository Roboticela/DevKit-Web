'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SETTINGS_STATES, type SettingsPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SettingsPage } from './SettingsPage'

function isState(value: string | null): value is SettingsPreviewState {
  return SETTINGS_STATES.some((item) => item.id === value)
}

export function SettingsPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SettingsPage state={state} />
}
