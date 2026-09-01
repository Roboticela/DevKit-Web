import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SaveRecoveryCodesPreviewRoute } from '@/components/SaveRecoveryCodesPreviewRoute'

export const metadata: Metadata = {
  title: 'Save Recovery Codes — DevKit',
  description: 'Copy and save one-time recovery codes after enabling two-factor authentication.',
}

export default function SaveRecoveryCodesPreviewPage() {
  return (
    <Suspense fallback={null}>
      <SaveRecoveryCodesPreviewRoute />
    </Suspense>
  )
}
