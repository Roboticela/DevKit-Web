'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ForgotPasswordPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { ForgotPasswordPage } from './ForgotPasswordPage'

const STATES: ForgotPasswordPreviewState[] = ['default', 'error', 'loading']

function isState(value: string | null): value is ForgotPasswordPreviewState {
  return STATES.includes(value as ForgotPasswordPreviewState)
}

export function ForgotPasswordPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <ForgotPasswordPage state={state} />
}
