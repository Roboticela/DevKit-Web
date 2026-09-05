import type { DocsNavItem, DocsNavSection, DocsTocItem } from './docs-catalog'

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
        'navbar-section',
        'Roboticela Navbar Section',
        '/sections/navbar-section',
        'The sticky global bar: brand, catalog flyouts, search, bag, account links, and appearance.',
      ),
      sectionItem(
        'roboticela-hero-section',
        'Roboticela Hero Section',
        '/sections/roboticela-hero-section',
        'Marketing hero with a headline, a call to action, and a supporting visual. The opening block of a landing page.',
        true,
      ),
      sectionItem(
        'product-marquee-section',
        'Roboticela Product Marquee Section',
        '/sections/product-marquee-section',
        'A scrolling row of product cards under the hero, with a quiet storefront feel.',
      ),
      sectionItem(
        'services-section',
        'Roboticela Services Section',
        '/sections/services-section',
        'A services showcase: a ribbon scene over a carousel of the offerings, with a heading and a view-all link.',
        true,
      ),
      sectionItem(
        'idea-section',
        'Roboticela Idea Section',
        '/sections/idea-section',
        'The story block that names the product, states the idea, and explains it in plain words on a dark surface.',
        true,
      ),
      sectionItem(
        'reels-section',
        'Roboticela Reels Section',
        '/sections/reels-section',
        'A wall of short build-in-progress clips under an animated backdrop. Use it to show work before it ships.',
      ),
      sectionItem(
        'trust-section',
        'Roboticela Trust Section',
        '/sections/trust-section',
        'The why-trust-us block: honest copy about who the company is and how it works, on a quiet gray surface.',
        true,
      ),
      sectionItem(
        'roadmap-section',
        'Roboticela Roadmap Section',
        '/sections/roadmap-section',
        'The building-toward block that names what comes next and connects the current product to the future.',
        true,
      ),
      sectionItem(
        'contact-section',
        'Roboticela Contact Section',
        '/sections/contact-section',
        'The closing invitation: Get In Touch copy and a contact link for buying, using, or backing the product.',
        true,
      ),
      sectionItem(
        'footer-section',
        'Roboticela Footer Section',
        '/sections/footer-section',
        'The site footer: locale, newsletter, link columns, social marks, and legal copy.',
      ),
    ] as SectionMeta[],
  },
]

export const SECTIONS_ITEMS: DocsNavItem[] = SECTIONS_NAV.flatMap(
  (section) => section.items as DocsNavItem[],
)

export const SECTION_DOC_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'composition', label: 'Composition' },
  { id: 'props', label: 'Props' },
  { id: 'related', label: 'Related' },
]

export function findSectionMeta(id: string): SectionMeta | undefined {
  for (const section of SECTIONS_NAV) {
    const match = section.items.find(
      (item): item is SectionMeta => (item as SectionMeta).id === id,
    )
    if (match) return match
  }
  return undefined
}
