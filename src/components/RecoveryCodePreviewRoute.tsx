'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  RECOVERY_CODE_STATES,
  type RecoveryCodePreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { RecoveryCodePage } from './RecoveryCodePage'

function isState(value: string | null): value is RecoveryCodePreviewState {
  return RECOVERY_CODE_STATES.some((item) => item.id === value)
}

export function RecoveryCodePreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <RecoveryCodePage state={state} />
}
