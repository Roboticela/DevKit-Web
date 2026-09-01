import type { Metadata } from 'next'
import { Suspense } from 'react'
import { VerificationCodePreviewRoute } from '@/components/VerificationCodePreviewRoute'

export const metadata: Metadata = {
  title: 'Verification Code — DevKit',
  description: 'Enter the verification code sent to your email.',
}

export default function VerificationCodePreviewPage() {
  return (
    <Suspense fallback={null}>
      <VerificationCodePreviewRoute />
    </Suspense>
  )
}
