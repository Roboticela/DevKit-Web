'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  LINK_EXPIRED_STATES,
  type LinkExpiredPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { LinkExpiredPage } from './LinkExpiredPage'

function isState(value: string | null): value is LinkExpiredPreviewState {
  return LINK_EXPIRED_STATES.some((item) => item.id === value)
}

export function LinkExpiredPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <LinkExpiredPage state={state} />
}
