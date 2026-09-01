'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ONBOARDING_STATES,
  type OnboardingPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { OnboardingPage } from './OnboardingPage'

function isState(value: string | null): value is OnboardingPreviewState {
  return ONBOARDING_STATES.some((item) => item.id === value)
}

export function OnboardingPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <OnboardingPage state={state} />
}
