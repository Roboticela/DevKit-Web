import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResetPasswordPreviewRoute } from '@/components/ResetPasswordPreviewRoute'

export const metadata: Metadata = {
  title: 'Reset Password — DevKit',
  description: 'Choose a new password for your DevKit Account.',
}

export default function ResetPasswordPreviewPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPreviewRoute />
    </Suspense>
  )
}
