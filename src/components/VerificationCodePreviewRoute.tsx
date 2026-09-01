'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  VERIFICATION_CODE_STATES,
  type VerificationCodePreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { VerificationCodePage } from './VerificationCodePage'

function isState(value: string | null): value is VerificationCodePreviewState {
  return VERIFICATION_CODE_STATES.some((item) => item.id === value)
}

export function VerificationCodePreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <VerificationCodePage state={state} />
}
