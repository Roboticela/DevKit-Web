'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { SignInPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SignInPage } from './SignInPage'

const STATES: SignInPreviewState[] = ['default', 'error', 'loading', 'locked']

function isState(value: string | null): value is SignInPreviewState {
  return STATES.includes(value as SignInPreviewState)
}

export function SignInPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SignInPage state={state} />
}
