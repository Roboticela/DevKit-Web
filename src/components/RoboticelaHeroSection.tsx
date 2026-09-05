'use client'

import Link from 'next/link'
import {
  landingActionsHero,
  landingBtnPrimary,
  landingBtnQuiet,
  landingHero,
  landingHeroBody,
  landingHeroTagline,
  landingDisplay,
  landingInnerHero,
  type LandingLink,
  type LandingSectionProps,
} from '@/lib/landing'
import { mergeContent } from '@/lib/merge-content'
import { HeroCells } from './HeroCells'
import { HomeShell } from './HomeShell'
import { RevealSection } from './RevealSection'

export type HeroSectionContent = {
  title: string
  body: string
  tagline: string
  primaryAction: LandingLink
  secondaryAction: LandingLink
}

export const HERO_SECTION_CONTENT: HeroSectionContent = {
  title: 'We build small things that work.',
  body: 'Roboticela makes products and services that are small, self-contained, and built with intelligence from day one.',
  tagline: "We're just getting started. Come watch us grow.",
  primaryAction: { label: 'Shop Products', href: '/products' },
  secondaryAction: { label: 'Explore Services', href: '/services' },
}

export type HeroSectionProps = LandingSectionProps<HeroSectionContent>

export function RoboticelaHeroSection({ content, className }: HeroSectionProps = {}) {
  const copy = mergeContent(HERO_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={landingHero}
        aria-labelledby="home-hero-title"
        scene={(active) => <HeroCells active={active} />}
      >
        <div className={landingInnerHero}>
          <h1 id="home-hero-title" className={landingDisplay}>
            {copy.title}
          </h1>
          <p className={landingHeroBody}>{copy.body}</p>
          <p className={landingHeroTagline}>{copy.tagline}</p>
          <div className={landingActionsHero}>
            <Link className={landingBtnPrimary} href={copy.primaryAction.href}>
              {copy.primaryAction.label}
            </Link>
            <Link className={landingBtnQuiet} href={copy.secondaryAction.href}>
              {copy.secondaryAction.label}
            </Link>
          </div>
        </div>
      </RevealSection>
    </HomeShell>
  )
}
