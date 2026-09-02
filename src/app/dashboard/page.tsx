import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DashboardPreviewRoute } from '@/components/DashboardPreviewRoute'

export const metadata: Metadata = {
  title: 'Dashboard — DevKit',
  description: 'Workspace overview with metrics, projects, and navigation.',
}

export default function DashboardRoutePage() {
  return (
    <Suspense fallback={null}>
      <DashboardPreviewRoute />
    </Suspense>
  )
}
