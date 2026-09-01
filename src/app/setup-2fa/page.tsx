import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SetupTwoFactorPreviewRoute } from '@/components/SetupTwoFactorPreviewRoute'

export const metadata: Metadata = {
  title: 'Setup Two-Factor — DevKit',
  description: 'Scan a QR code and verify your authenticator app to enable two-factor authentication.',
}

export default function SetupTwoFactorPreviewPage() {
  return (
    <Suspense fallback={null}>
      <SetupTwoFactorPreviewRoute />
    </Suspense>
  )
}
