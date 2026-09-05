'use client'

import { HomeShell } from './HomeShell'
import { SiteFooter, FOOTER_SECTION_CONTENT, type FooterSectionContent } from './SiteFooter'
import { type LandingSectionProps } from '@/lib/landing'

export type { FooterSectionContent }
export { FOOTER_SECTION_CONTENT }

export type FooterSectionProps = LandingSectionProps<FooterSectionContent>

export function FooterSection({ content, className }: FooterSectionProps = {}) {
  return (
    <HomeShell className={className}>
      <SiteFooter content={content} className="mt-auto" />
    </HomeShell>
  )
}
