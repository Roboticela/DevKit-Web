'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  SETUP_TWO_FACTOR_STATES,
  type SetupTwoFactorPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SetupTwoFactorPage } from './SetupTwoFactorPage'

function isState(value: string | null): value is SetupTwoFactorPreviewState {
  return SETUP_TWO_FACTOR_STATES.some((item) => item.id === value)
}

export function SetupTwoFactorPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SetupTwoFactorPage state={state} />
}
