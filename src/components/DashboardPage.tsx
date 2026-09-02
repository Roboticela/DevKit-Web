'use client'

import { DashboardPreview } from './DashboardPreview'
import type { DashboardPreviewState } from '@/lib/pages-catalog'

export function DashboardPage({
  state = 'default',
  full = true,
}: {
  state?: DashboardPreviewState
  full?: boolean
}) {
  return <DashboardPreview full={full} state={state} />
}
