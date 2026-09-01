import type { Metadata } from 'next'
import { Suspense } from 'react'
import { OnboardingPreviewRoute } from '@/components/OnboardingPreviewRoute'

export const metadata: Metadata = {
  title: 'Onboarding — DevKit',
  description: 'Finish setting up your account after signing in with a provider or email.',
}

export default function OnboardingPreviewPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingPreviewRoute />
    </Suspense>
  )
}
