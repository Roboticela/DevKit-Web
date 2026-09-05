'use client'

import { LANDING_SECTIONS } from './landing-sections'

export function LandingSectionPreview({ slug }: { slug: string }) {
  const Section = LANDING_SECTIONS[slug]
  if (!Section) return null
  return <Section />
}
