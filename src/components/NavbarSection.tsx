'use client'

import { HomeShell } from './HomeShell'
import { SiteNav, NAVBAR_SECTION_CONTENT, type NavbarSectionContent } from './SiteNav'
import { type LandingSectionProps } from '@/lib/landing'

export type { NavbarSectionContent, NavbarFlyoutGroup, NavbarFlyoutLink } from './SiteNav'
export { NAVBAR_SECTION_CONTENT }

export type NavbarSectionProps = LandingSectionProps<NavbarSectionContent>

export function NavbarSection({ content, className }: NavbarSectionProps = {}) {
  return (
    <HomeShell className={className}>
      <SiteNav content={content} />
    </HomeShell>
  )
}
