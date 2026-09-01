import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SetupTwoFactorSuccessPreviewRoute } from '@/components/SetupTwoFactorSuccessPreviewRoute'

export const metadata: Metadata = {
  title: 'Two-Factor Setup Success — DevKit',
  description: 'Confirmation screen shown after two-factor authentication and recovery codes are saved.',
}

export default function SetupTwoFactorSuccessPreviewPage() {
  return (
    <Suspense fallback={null}>
      <SetupTwoFactorSuccessPreviewRoute />
    </Suspense>
  )
}
