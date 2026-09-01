'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ANOTHER_DEVICE_STATES,
  type AnotherDevicePreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { AnotherDevicePage } from './AnotherDevicePage'

function isState(value: string | null): value is AnotherDevicePreviewState {
  return ANOTHER_DEVICE_STATES.some((item) => item.id === value)
}

export function AnotherDevicePreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const state = isState(raw) ? raw : 'default'
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <AnotherDevicePage state={state} />
}
