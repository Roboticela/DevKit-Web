import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ForgotPasswordPreviewRoute } from '@/components/ForgotPasswordPreviewRoute'

export const metadata: Metadata = {
  title: 'Forgot Password — DevKit',
  description: 'Reset your DevKit Account password.',
}

export default function ForgotPasswordPreviewPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordPreviewRoute />
    </Suspense>
  )
}
