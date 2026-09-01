import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ChooseVerificationMethodPreviewRoute } from '@/components/ChooseVerificationMethodPreviewRoute'

export const metadata: Metadata = {
  title: 'Choose Verification Method — DevKit',
  description: 'Choose how to verify your DevKit Account.',
}

export default function ChooseVerificationMethodPreviewPage() {
  return (
    <Suspense fallback={null}>
      <ChooseVerificationMethodPreviewRoute />
    </Suspense>
  )
}
