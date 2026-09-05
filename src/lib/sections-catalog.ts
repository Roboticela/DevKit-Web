import type { DocsNavItem, DocsNavSection } from './docs-catalog'

type SectionMeta = DocsNavItem & { sceneBleed?: boolean }

function sectionItem(
  id: string,
  label: string,
  href: string,
  description: string,
  sceneBleed = false,
): SectionMeta {
  return {
    id,
    label,
    href,
    searchGroup: 'Marketing',
    description,
    sceneBleed,
  }
}

export const SECTIONS_NAV: DocsNavSection[] = [
  {
    id: 'marketing',
    label: 'Marketing',
    items: [
      sectionItem(
        'hero-section',
        'Hero Section',
        '/sections/hero-section',
        'Marketing hero with a headline, a call to action, and a supporting visual. The opening block of a landing page.',
        true,
      ),
      sectionItem(
        'product-marquee-section',
        'Product Marquee',
        '/sections/product-marquee-section',
        'A scrolling row of product cards under the hero, with a quiet storefront feel.',
      ),
      sectionItem(
        'services-section',
        'Services',
        '/sections/services-section',
        'A services showcase: a ribbon scene over a carousel of the offerings, with a heading and a view-all link.',
        true,
      ),
      sectionItem(
        'idea-section',
        'Idea',
        '/sections/idea-section',
        'The story block that names the product, states the idea, and explains it in plain words on a dark surface.',
        true,
      ),
      sectionItem(
        'reels-section',
        'Reels',
        '/sections/reels-section',
        'A wall of short build-in-progress clips under an animated backdrop. Use it to show work before it ships.',
      ),
      sectionItem(
        'trust-section',
        'Trust',
        '/sections/trust-section',
        'The why-trust-us block: honest copy about who the company is and how it works, on a quiet gray surface.',
        true,
      ),
      sectionItem(
        'roadmap-section',
        'Roadmap',
        '/sections/roadmap-section',
        'The building-toward block that names what comes next and connects the current product to the future.',
        true,
      ),
      sectionItem(
        'contact-section',
        'Contact',
        '/sections/contact-section',
        'The closing invitation: Get In Touch copy and a contact link for buying, using, or backing the product.',
        true,
      ),
    ] as SectionMeta[],
  },
]

export const SECTIONS_ITEMS: DocsNavItem[] = SECTIONS_NAV.flatMap(
  (section) => section.items as DocsNavItem[],
)

export function findSectionMeta(id: string): SectionMeta | undefined {
  for (const section of SECTIONS_NAV) {
    const match = section.items.find(
      (item): item is SectionMeta => (item as SectionMeta).id === id,
    )
    if (match) return match
  }
  return undefined
}
