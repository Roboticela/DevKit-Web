import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthenticatorCodePreviewRoute } from '@/components/AuthenticatorCodePreviewRoute'

export const metadata: Metadata = {
  title: 'Authenticator Code — DevKit',
  description: 'Enter the 6-digit code from your authenticator app.',
}

export default function AuthenticatorCodePreviewPage() {
  return (
    <Suspense fallback={null}>
      <AuthenticatorCodePreviewRoute />
    </Suspense>
  )
}
