import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SignInPreviewRoute } from '@/components/SignInPreviewRoute'

export const metadata: Metadata = {
  title: 'Sign In — DevKit',
  description: 'Sign in to your DevKit Account.',
}

export default function SignInPreviewPage() {
  return (
    <Suspense fallback={null}>
      <SignInPreviewRoute />
    </Suspense>
  )
}
