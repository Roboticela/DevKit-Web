import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AnotherDevicePreviewRoute } from '@/components/AnotherDevicePreviewRoute'

export const metadata: Metadata = {
  title: 'Another Device — DevKit',
  description: 'Wait for approval on a device where you are already signed in.',
}

export default function AnotherDevicePreviewPage() {
  return (
    <Suspense fallback={null}>
      <AnotherDevicePreviewRoute />
    </Suspense>
  )
}
