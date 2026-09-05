'use client'

import Link from './link'
import { cn } from './cn'
import {
  landingActionsContact,
  landingBtnPrimary,
  landingBtnQuietFill,
  landingHeadline,
  landingInnerCopy,
  landingLede,
  landingSection,
  landingSectionAlt,
  type LandingLink,
  type LandingSectionProps,
} from './landing'
import { mergeContent } from './merge-content'
import { ContactBlob } from './ContactBlob'
import { HomeShell } from './HomeShell'
import { RevealSection } from './RevealSection'

export type ContactSectionContent = {
  title: string
  body: string
  primaryAction: LandingLink
  secondaryAction: LandingLink
}

export const CONTACT_SECTION_CONTENT: ContactSectionContent = {
  title: 'Get In Touch',
  body: "Want to buy something, use a service, or back what we're building? We'd like to hear from you.",
  primaryAction: { label: 'Contact Us', href: '/support' },
  secondaryAction: { label: 'Email Us', href: 'mailto:hello@roboticela.com' },
}

export type ContactSectionProps = LandingSectionProps<ContactSectionContent>

export function ContactSection({ content, className }: ContactSectionProps = {}) {
  const copy = mergeContent(CONTACT_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={cn(landingSection, landingSectionAlt, 'home__contact')}
        id="contact"
        aria-labelledby="home-contact-title"
        sceneClassName="z-0"
        copyClassName="z-[1]"
        scene={(active) => <ContactBlob active={active} />}
      >
        <div className={landingInnerCopy}>
          <h2 id="home-contact-title" className={landingHeadline}>
            {copy.title}
          </h2>
          <p className={landingLede}>{copy.body}</p>
          <div className={cn(landingActionsContact, 'home__actions--contact')}>
            <Link className={landingBtnPrimary} href={copy.primaryAction.href}>
              {copy.primaryAction.label}
            </Link>
            {copy.secondaryAction.href.startsWith('mailto:') ? (
              <a className={landingBtnQuietFill} href={copy.secondaryAction.href}>
                {copy.secondaryAction.label}
              </a>
            ) : (
              <Link className={landingBtnQuietFill} href={copy.secondaryAction.href}>
                {copy.secondaryAction.label}
              </Link>
            )}
          </div>
          <div className="h-[84px] min-[735px]:h-[112px]" aria-hidden="true" />
        </div>
      </RevealSection>
    </HomeShell>
  )
}

export default ContactSection
