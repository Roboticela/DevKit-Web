'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  CHOOSE_VERIFICATION_METHOD_STATES,
  type ChooseVerificationMethodPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { ChooseVerificationMethodPage } from './ChooseVerificationMethodPage'

function isState(value: string | null): value is ChooseVerificationMethodPreviewState {
  return CHOOSE_VERIFICATION_METHOD_STATES.some((item) => item.id === value)
}

export function ChooseVerificationMethodPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <ChooseVerificationMethodPage state={state} />
}
