'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ResetPasswordPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { ResetPasswordPage } from './ResetPasswordPage'

const STATES: ResetPasswordPreviewState[] = [
  'default',
  'error',
  'loading',
  'success',
  'success-signin',
  'checking',
]

function isState(value: string | null): value is ResetPasswordPreviewState {
  return STATES.includes(value as ResetPasswordPreviewState)
}

export function ResetPasswordPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <ResetPasswordPage state={state} />
}
