'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  SAVE_RECOVERY_CODES_STATES,
  type SaveRecoveryCodesPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { SaveRecoveryCodesPage } from './SaveRecoveryCodesPage'

function isState(value: string | null): value is SaveRecoveryCodesPreviewState {
  return SAVE_RECOVERY_CODES_STATES.some((item) => item.id === value)
}

export function SaveRecoveryCodesPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <SaveRecoveryCodesPage state={state} />
}
