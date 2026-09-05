'use client'

import { cn } from './cn'
import {
  landingEyebrow,
  landingIdeaProse,
  landingIdeaTitle,
  landingInnerWide,
  landingSection,
  landingSectionAlt,
  type LandingSectionProps,
} from './landing'
import { mergeContent } from './merge-content'
import { HomeShell } from './HomeShell'
import { IdeaCell } from './IdeaCell'
import { RevealSection } from './RevealSection'

export type IdeaSectionContent = {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export const IDEA_SECTION_CONTENT: IdeaSectionContent = {
  eyebrow: 'The Idea',
  title: 'Roboticela. Robotic Cell.',
  paragraphs: [
    "A cell is small. It doesn't need much. It just does its job.",
    "That's how we build. Not one big idea, but many small ones done well. Every product, every service, works on its own. Together, they add up to something bigger.",
  ],
}

export type IdeaSectionProps = LandingSectionProps<IdeaSectionContent>

export function IdeaSection({ content, className }: IdeaSectionProps = {}) {
  const copy = mergeContent(IDEA_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={cn(landingSection, landingSectionAlt, 'home__idea overflow-visible')}
        id="idea"
        aria-labelledby="home-idea-title"
        sceneClassName="z-[2]"
        scene={(active) => <IdeaCell active={active} />}
      >
        <div className={landingInnerWide}>
          <p className={landingEyebrow}>{copy.eyebrow}</p>
          <h2 id="home-idea-title" className={landingIdeaTitle}>
            {copy.title}
          </h2>
          <div className={landingIdeaProse}>
            {copy.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  'm-0 mb-5 last:mb-0',
                  index === copy.paragraphs.length - 1 && 'font-medium text-text-primary',
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </RevealSection>
    </HomeShell>
  )
}

export default IdeaSection
