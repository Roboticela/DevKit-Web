import type { Metadata } from 'next'
import { DashboardPreview } from '@/components/DashboardPreview'

export const metadata: Metadata = {
  title: 'Dashboard — DevKit',
}

export default function DashboardPage() {
  return <DashboardPreview full />
}
