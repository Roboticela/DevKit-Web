import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CreateAccountPreviewRoute } from '@/components/CreateAccountPreviewRoute'

export const metadata: Metadata = {
  title: 'Create Account — DevKit',
  description: 'Create your DevKit Account.',
}

export default function CreateAccountPreviewPage() {
  return (
    <Suspense fallback={null}>
      <CreateAccountPreviewRoute />
    </Suspense>
  )
}
