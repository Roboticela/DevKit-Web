'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  SETUP_TWO_FACTOR_SUCCESS_STATES,
  type SetupTwoFactorSuccessPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SetupTwoFactorSuccessPage } from './SetupTwoFactorSuccessPage'

function isState(value: string | null): value is SetupTwoFactorSuccessPreviewState {
  return SETUP_TWO_FACTOR_SUCCESS_STATES.some((item) => item.id === value)
}

export function SetupTwoFactorSuccessPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SetupTwoFactorSuccessPage state={state} />
}
