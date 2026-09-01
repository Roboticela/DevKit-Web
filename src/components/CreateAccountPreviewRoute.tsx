'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  CREATE_ACCOUNT_STATES,
  resolveCreateAccountPreview,
  type CreateAccountPreviewState,
} from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { CreateAccountPage } from './CreateAccountPage'

function isState(value: string | null): value is CreateAccountPreviewState {
  return CREATE_ACCOUNT_STATES.some((item) => item.id === value)
}

export function CreateAccountPreviewRoute() {
  const params = useSearchParams()
  const { setTheme } = useTheme()
  const raw = params.get('state')
  const previewState = isState(raw) ? raw : 'default'
  const { state, lastMethod } = resolveCreateAccountPreview(previewState)
  const theme = params.get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  return <CreateAccountPage state={state} lastMethod={lastMethod} />
}
