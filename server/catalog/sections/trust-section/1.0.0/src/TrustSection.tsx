'use client'

import { cn } from './cn'
import {
  landingEyebrow,
  landingInnerCopy,
  landingSection,
  landingSectionAlt,
  landingTrustClose,
  landingTrustProse,
  type LandingSectionProps,
} from './landing'
import { mergeContent } from './merge-content'
import { HomeShell } from './HomeShell'
import { RevealSection } from './RevealSection'
import { TrustField } from './TrustField'

export type TrustSectionContent = {
  eyebrow: string
  paragraphs: string[]
  close: string
}

export const TRUST_SECTION_CONTENT: TrustSectionContent = {
  eyebrow: 'Why Trust Us',
  paragraphs: [
    "We're small, and we're early. We'd rather say that plainly than pretend otherwise.",
    "We don't chase big launches. We build one thing, get it right, then move to the next. If it's not ready, it doesn't ship.",
    "If you're a customer, what you see is what we've actually finished. If you're an investor, we'll tell you exactly where we stand.",
  ],
  close: 'Slow and honest, over fast and loud.',
}

export type TrustSectionProps = LandingSectionProps<TrustSectionContent>

export function TrustSection({ content, className }: TrustSectionProps = {}) {
  const copy = mergeContent(TRUST_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={cn(landingSection, landingSectionAlt, 'home__trust')}
        id="trust"
        aria-labelledby="home-trust-title"
        flushScene
        scene={(active) => <TrustField active={active} />}
      >
        <div className={landingInnerCopy}>
          <h2 id="home-trust-title" className={landingEyebrow}>
            {copy.eyebrow}
          </h2>
          <div className={landingTrustProse}>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0 mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          <p className={landingTrustClose}>{copy.close}</p>
        </div>
      </RevealSection>
    </HomeShell>
  )
}

export default TrustSection
