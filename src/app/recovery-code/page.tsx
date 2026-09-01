import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RecoveryCodePreviewRoute } from '@/components/RecoveryCodePreviewRoute'

export const metadata: Metadata = {
  title: 'Recovery Code — DevKit',
  description: 'Enter a one-time recovery code saved when two-factor authentication was enabled.',
}

export default function RecoveryCodePreviewPage() {
  return (
    <Suspense fallback={null}>
      <RecoveryCodePreviewRoute />
    </Suspense>
  )
}
