'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DASHBOARD_STATES, type DashboardPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { DashboardPage } from './DashboardPage'

function isState(value: string | null): value is DashboardPreviewState {
  return DASHBOARD_STATES.some((item) => item.id === value)
}

export function DashboardPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <DashboardPage state={state} />
}
