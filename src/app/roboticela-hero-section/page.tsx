import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Roboticela Hero Section — DevKit',
  description: 'Marketing hero with a headline, a call to action, and a supporting visual.',
}

export default function RoboticelaHeroSectionPage() {
  redirect('/s/roboticela-hero-section')
}
