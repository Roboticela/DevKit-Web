'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  SIGN_IN_STATES,
  resolveSignInPreview,
  type SignInPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SignInPage } from './SignInPage'

function isState(value: string | null): value is SignInPreviewState {
  return SIGN_IN_STATES.some((item) => item.id === value)
}

export function SignInPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const previewState = isState(raw) ? raw : 'default'
  const { state, lastMethod } = resolveSignInPreview(previewState)
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SignInPage state={state} lastMethod={lastMethod} />
}
