'use client'

import { cn } from '@/lib/cn'
import {
  landingHeadlineCompact,
  landingLedeTight,
  landingSection,
  landingSectionBase,
  landingTextLinkMore,
  type LandingLink,
  type LandingSectionProps,
} from '@/lib/landing'
import { mergeContent } from '@/lib/merge-content'
import { HomeShell } from './HomeShell'
import { HomeTextLink } from './HomeTextLink'
import {
  ProductMarquee,
  PRODUCT_MARQUEE_HERO,
  PRODUCT_MARQUEE_ITEMS,
  type ProductCardContent,
} from './ProductMarquee'
import { RevealSection } from './RevealSection'

export type ProductMarqueeSectionContent = {
  title: string
  lede: string
  viewAll: LandingLink
  learnMoreLabel: string
  hero: ProductCardContent
  items: ProductCardContent[]
}

export const PRODUCT_MARQUEE_SECTION_CONTENT: ProductMarqueeSectionContent = {
  title: 'Things You Can Hold',
  lede: 'Made carefully, one at a time. A few are ready. More are coming.',
  viewAll: { label: 'View All Products', href: '/products' },
  learnMoreLabel: 'Learn more',
  hero: PRODUCT_MARQUEE_HERO,
  items: PRODUCT_MARQUEE_ITEMS,
}

export type ProductMarqueeSectionProps = LandingSectionProps<ProductMarqueeSectionContent>

export function ProductMarqueeSection({ content, className }: ProductMarqueeSectionProps = {}) {
  const copy = mergeContent(PRODUCT_MARQUEE_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={cn(landingSection, landingSectionBase, 'isolate overflow-visible px-0')}
        id="products"
        aria-labelledby="home-products-title"
      >
        <header className="mx-auto mb-12 max-w-[692px] px-[22px] text-center min-[735px]:mb-16">
          <h2 id="home-products-title" className={landingHeadlineCompact}>
            {copy.title}
          </h2>
          <p className={landingLedeTight}>{copy.lede}</p>
          <HomeTextLink className={landingTextLinkMore} href={copy.viewAll.href}>
            {copy.viewAll.label}
          </HomeTextLink>
        </header>
        <ProductMarquee hero={copy.hero} items={copy.items} cta={copy.learnMoreLabel} />
      </RevealSection>
    </HomeShell>
  )
}
