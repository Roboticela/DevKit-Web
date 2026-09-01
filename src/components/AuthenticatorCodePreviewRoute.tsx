'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  AUTHENTICATOR_CODE_STATES,
  type AuthenticatorCodePreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { AuthenticatorCodePage } from './AuthenticatorCodePage'

function isState(value: string | null): value is AuthenticatorCodePreviewState {
  return AUTHENTICATOR_CODE_STATES.some((item) => item.id === value)
}

export function AuthenticatorCodePreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <AuthenticatorCodePage state={state} />
}
