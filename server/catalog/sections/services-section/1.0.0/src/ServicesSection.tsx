'use client'

import { cn } from './cn'
import {
  landingHeadlineCompact,
  landingInnerServices,
  landingLede,
  landingSection,
  landingSectionAlt,
  landingTextLinkMore,
  type LandingLink,
  type LandingSectionProps,
} from './landing'
import { mergeContent } from './merge-content'
import { HomeShell } from './HomeShell'
import { HomeTextLink } from './HomeTextLink'
import { RevealSection } from './RevealSection'
import { ServiceCarousel, SERVICE_CAROUSEL_SLIDES, type ServiceSlide } from './ServiceCarousel'
import { ServiceRibbon } from './ServiceRibbon'

export type ServicesSectionContent = {
  title: string
  lede: string
  viewAll: LandingLink
  learnMoreLabel: string
  slides: ServiceSlide[]
}

export const SERVICES_SECTION_CONTENT: ServicesSectionContent = {
  title: 'Things That Work for You',
  lede: 'Simple subscriptions. One plan, every update, nothing hidden.',
  viewAll: { label: 'View All Services', href: '/services' },
  learnMoreLabel: 'Learn more',
  slides: SERVICE_CAROUSEL_SLIDES,
}

export type ServicesSectionProps = LandingSectionProps<ServicesSectionContent>

export function ServicesSection({ content, className }: ServicesSectionProps = {}) {
  const copy = mergeContent(SERVICES_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={cn(landingSection, landingSectionAlt, 'home__services-stage overflow-hidden')}
        id="services"
        aria-labelledby="home-services-title"
        flushScene
        scene={(active) => <ServiceRibbon active={active} />}
      >
        <div className={landingInnerServices}>
          <header className="mx-auto mb-12 text-center min-[735px]:mb-16">
            <h2 id="home-services-title" className={landingHeadlineCompact}>
              {copy.title}
            </h2>
            <p className={cn(landingLede, 'mt-3')}>{copy.lede}</p>
            <HomeTextLink className={landingTextLinkMore} href={copy.viewAll.href}>
              {copy.viewAll.label}
            </HomeTextLink>
          </header>
        </div>
        <ServiceCarousel slides={copy.slides} cta={copy.learnMoreLabel} />
      </RevealSection>
    </HomeShell>
  )
}

export default ServicesSection
