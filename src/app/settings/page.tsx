import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SettingsPreviewRoute } from '@/components/SettingsPreviewRoute'

export const metadata: Metadata = {
  title: 'Settings — DevKit',
  description: 'Profile, security, and workspace preferences.',
}

export default function SettingsRoutePage() {
  return (
    <Suspense fallback={null}>
      <SettingsPreviewRoute />
    </Suspense>
  )
}
