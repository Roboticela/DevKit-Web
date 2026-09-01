import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LinkExpiredPreviewRoute } from '@/components/LinkExpiredPreviewRoute'

export const metadata: Metadata = {
  title: 'Link Expired — DevKit',
  description: 'This verification link has expired.',
}

export default function LinkExpiredPreviewPage() {
  return (
    <Suspense fallback={null}>
      <LinkExpiredPreviewRoute />
    </Suspense>
  )
}
