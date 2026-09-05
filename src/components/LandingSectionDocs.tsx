'use client'

import { brand } from '@/lib/devkit'
import { adjacentDocs } from '@/lib/docs-catalog'
import { SECTIONS_ITEMS } from '@/lib/sections-catalog'
import { Badge } from './Badge'
import { Caption, Heading, Subhead } from './Text'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { RelatedCard } from './RelatedCard'
import { PropsTable, type PropRow } from './PropsTable'
import { ViewportPreview } from './ViewportPreview'

type Spec = {
  crumb: string
  title: string
  description: string
  version: string
  tree: CompositionNode[]
  source: string
  builtWith: { label: string; href: string }[]
  props: PropRow[]
}

function sectionProps(contentType: string): PropRow[] {
  return [
    {
      name: 'content',
      type: `Partial<${contentType}>`,
      defaultValue: 'shipped defaults',
      description:
        'All copy, links, and lists. Pass only what you need to change. The section module cannot be edited after install.',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Extra classes on the outer shell.',
    },
  ]
}

const BUTTON_TEXT = [
  { label: 'Button', href: '/components/button' },
  { label: 'Text', href: '/components/text' },
]

const SPECS: Record<string, Spec> = {
  'navbar-section': {
    crumb: 'Sections / Marketing / Roboticela Navbar Section',
    title: 'Roboticela Navbar Section',
    description:
      'The sticky global bar: brand, catalog flyouts, search, bag, account links, and appearance.',
    version: 'v1.0.7',
    builtWith: [
      { label: 'Brand Logo', href: '/components/brand-logo' },
      { label: 'Theme Toggle', href: '/components/theme-toggle' },
    ],
    props: sectionProps('NavbarSectionContent'),
    tree: [
      {
        label: 'Roboticela Navbar Section',
        children: [
          { label: 'SiteNav', note: '(sticky global bar)' },
          { label: 'Brand Logo', href: '/components/brand-logo' },
          { label: 'Catalog flyouts', note: '(Products, Services, Reels, Support)' },
          { label: 'Search and bag overlays' },
          { label: 'Theme Toggle', href: '/components/theme-toggle', note: '(compact on desktop)' },
          { label: 'Mobile menu' },
        ],
      },
    ],
    source: `export function NavbarSection({ content }: NavbarSectionProps) {
  return (
    <HomeShell>
      <SiteNav content={content} />
    </HomeShell>
  )
}

<NavbarSection
  content={{
    brandName: 'Roboticela',
    createAccountLabel: 'Create Account',
    signInLabel: 'Sign in',
  }}
/>`,
  },
  'roboticela-hero-section': {
    crumb: 'Sections / Marketing / Roboticela Hero Section',
    title: 'Roboticela Hero Section',
    description:
      'Marketing hero with a headline, a call to action, and a supporting visual. The opening block of a landing page.',
    version: 'v1.0.7',
    builtWith: BUTTON_TEXT,
    props: sectionProps('HeroSectionContent'),
    tree: [
      {
        label: 'Roboticela Hero Section',
        children: [
          { label: 'RevealSection', note: '(hero stage)' },
          { label: 'HeroCells', note: '(Three.js living-cell scene)' },
          { label: 'Display Heading', href: '/components/text' },
          { label: 'Hero Body', href: '/components/text' },
          { label: 'Hero Tagline', href: '/components/text' },
          { label: 'Button', href: '/components/button', note: '(Shop Products)' },
          { label: 'Button', href: '/components/button', note: '(Explore Services)' },
        ],
      },
    ],
    source: `<RoboticelaHeroSection
  content={{
    title: 'We build small things that work.',
    body: 'Roboticela makes products and services that are small, self-contained, and built with intelligence from day one.',
    tagline: "We're just getting started. Come watch us grow.",
    primaryAction: { label: 'Shop Products', href: '/products' },
    secondaryAction: { label: 'Explore Services', href: '/services' },
  }}
/>`,
  },
  'idea-section': {
    crumb: 'Sections / Marketing / Roboticela Idea Section',
    title: 'Roboticela Idea Section',
    description:
      'The story block that names the product, states the idea, and explains it in plain words on a dark surface.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('IdeaSectionContent'),
    tree: [
      {
        label: 'Roboticela Idea Section',
        children: [
          { label: 'RevealSection', note: '(idea block)' },
          { label: 'IdeaCell', note: '(Three.js dividing-cell scene)' },
          { label: 'Eyebrow', href: '/components/text', note: '(The Idea)' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Body', href: '/components/text' },
        ],
      },
    ],
    source: `<IdeaSection
  content={{
    eyebrow: 'The Idea',
    title: 'Roboticela. Robotic Cell.',
    paragraphs: [
      "A cell is small. It doesn't need much. It just does its job.",
      "That's how we build. Not one big idea, but many small ones done well.",
    ],
  }}
/>`,
  },
  'product-marquee-section': {
    crumb: 'Sections / Marketing / Roboticela Product Marquee Section',
    title: 'Roboticela Product Marquee Section',
    description: 'A scrolling row of product cards under the hero, with a quiet storefront feel.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('ProductMarqueeSectionContent'),
    tree: [
      {
        label: 'Roboticela Product Marquee Section',
        children: [
          { label: 'RevealSection', note: '(product stage)' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Subhead', href: '/components/text' },
          { label: 'Anchor', href: '/components/anchor', note: '(View All Products)' },
          { label: 'ProductMarquee', note: '(Hero tile + grid)' },
        ],
      },
    ],
    source: `<ProductMarqueeSection
  content={{
    title: 'Things You Can Hold',
    lede: 'Made carefully, one at a time. A few are ready. More are coming.',
    viewAll: { label: 'View All Products', href: '/products' },
  }}
/>`,
  },
  'services-section': {
    crumb: 'Sections / Marketing / Roboticela Services Section',
    title: 'Roboticela Services Section',
    description:
      'A services showcase: a ribbon scene over a carousel of the offerings, with a heading and a view-all link.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('ServicesSectionContent'),
    tree: [
      {
        label: 'Roboticela Services Section',
        children: [
          { label: 'RevealSection', note: '(services stage)' },
          { label: 'ServiceRibbon', note: '(Three.js silk ribbon)' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Subhead', href: '/components/text' },
          { label: 'Anchor', href: '/components/anchor', note: '(View All Services)' },
          { label: 'ServiceCarousel' },
        ],
      },
    ],
    source: `<ServicesSection
  content={{
    title: 'Things That Work for You',
    lede: 'Simple subscriptions. One plan, every update, nothing hidden.',
    viewAll: { label: 'View All Services', href: '/services' },
  }}
/>`,
  },
  'reels-section': {
    crumb: 'Sections / Marketing / Roboticela Reels Section',
    title: 'Roboticela Reels Section',
    description:
      'A wall of short build-in-progress clips under an animated backdrop. Use it to show work before it ships.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('ReelsSectionContent'),
    tree: [
      {
        label: 'Roboticela Reels Section',
        children: [
          { label: 'RevealSection', note: '(reels stage)' },
          { label: 'AuroraParticles', note: '(Three.js wave field)' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Subhead', href: '/components/text' },
          { label: 'Anchor', href: '/components/anchor', note: '(Watch All Reels)' },
          { label: 'ReelStrip' },
        ],
      },
    ],
    source: `<ReelsSection
  content={{
    title: 'Watch Us Build',
    lede: "Short clips of what we're working on, before it's finished.",
    viewAll: { label: 'Watch All Reels', href: '/reels' },
  }}
/>`,
  },
  'trust-section': {
    crumb: 'Sections / Marketing / Roboticela Trust Section',
    title: 'Roboticela Trust Section',
    description:
      'The why-trust-us block: honest copy about who the company is and how it works, on a quiet gray surface.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('TrustSectionContent'),
    tree: [
      {
        label: 'Roboticela Trust Section',
        children: [
          { label: 'RevealSection', note: '(trust block)' },
          { label: 'TrustField', note: '(Three.js drift field)' },
          { label: 'Eyebrow', href: '/components/text', note: '(Why Trust Us)' },
          { label: 'Body', href: '/components/text' },
        ],
      },
    ],
    source: `<TrustSection
  content={{
    eyebrow: 'Why Trust Us',
    close: 'Slow and honest, over fast and loud.',
  }}
/>`,
  },
  'roadmap-section': {
    crumb: 'Sections / Marketing / Roboticela Roadmap Section',
    title: 'Roboticela Roadmap Section',
    description:
      'The building-toward block that names what comes next and connects the current product to the future.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('RoadmapSectionContent'),
    tree: [
      {
        label: 'Roboticela Roadmap Section',
        children: [
          { label: 'BuildingToward', note: '(roadmap lattice)' },
          { label: 'Eyebrow', href: '/components/text' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Body', href: '/components/text' },
        ],
      },
    ],
    source: `<RoadmapSection
  content={{
    eyebrow: "What We're Building Toward",
    title: "One product doesn't say much on its own. Neither does one service.",
  }}
/>`,
  },
  'contact-section': {
    crumb: 'Sections / Marketing / Roboticela Contact Section',
    title: 'Roboticela Contact Section',
    description:
      'The closing invitation: Get In Touch copy and a contact link for buying, using, or backing the product.',
    version: 'v1.0.0',
    builtWith: BUTTON_TEXT,
    props: sectionProps('ContactSectionContent'),
    tree: [
      {
        label: 'Roboticela Contact Section',
        children: [
          { label: 'RevealSection', note: '(contact block)' },
          { label: 'ContactBlob', note: '(Three.js knot)' },
          { label: 'Heading', href: '/components/text' },
          { label: 'Subhead', href: '/components/text' },
          { label: 'Button', href: '/components/button', note: '(Contact Us)' },
          { label: 'Button', href: '/components/button', note: '(Email Us)' },
        ],
      },
    ],
    source: `<ContactSection
  content={{
    title: 'Get In Touch',
    body: "Want to buy something, use a service, or back what we're building? We'd like to hear from you.",
    primaryAction: { label: 'Contact Us', href: '/support' },
    secondaryAction: { label: 'Email Us', href: 'mailto:hello@roboticela.com' },
  }}
/>`,
  },
  'footer-section': {
    crumb: 'Sections / Marketing / Roboticela Footer Section',
    title: 'Roboticela Footer Section',
    description:
      'The site footer: locale, newsletter, link columns, social marks, and legal copy.',
    version: 'v1.0.7',
    builtWith: [
      { label: 'Brand Logo', href: '/components/brand-logo' },
      { label: 'Language Select', href: '/components/language-select' },
      { label: 'Country Select', href: '/components/country-select' },
    ],
    props: sectionProps('FooterSectionContent'),
    tree: [
      {
        label: 'Roboticela Footer Section',
        children: [
          { label: 'SiteFooter' },
          { label: 'Brand Logo', href: '/components/brand-logo' },
          { label: 'Language Select', href: '/components/language-select' },
          { label: 'Country Select', href: '/components/country-select' },
          { label: 'Newsletter form' },
          { label: 'Link columns', note: '(Store, Software, Company, Resources, Support, Legal)' },
          { label: 'Social and mini links' },
        ],
      },
    ],
    source: `<FooterSection
  content={{
    newsletterTitle: 'Stay in the loop',
    newsletterBody: 'Get updates on new products and releases.',
    subscribeLabel: 'Subscribe',
  }}
/>`,
  },
}

function relatedItems(id: string) {
  const index = SECTIONS_ITEMS.findIndex((item) => item.id === id)
  const pick = [SECTIONS_ITEMS[index - 1], SECTIONS_ITEMS[index + 1], SECTIONS_ITEMS[index + 2] ?? SECTIONS_ITEMS[index - 2]]
  return pick.filter((item): item is (typeof SECTIONS_ITEMS)[number] => Boolean(item) && item.id !== id).slice(0, 3)
}

export function LandingSectionDocs({ id }: { id: string }) {
  const spec = SPECS[id]
  if (!spec) return null
  const src = `/s/${id}`

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>{spec.crumb}</Caption>
        <Heading className="mt-2">{spec.title}</Heading>
        <Subhead className="mt-2">{spec.description}</Subhead>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            {spec.version}
          </Badge>
          <Caption as="span">Last updated Sep 5, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={spec.builtWith} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/${id}`}
          fullHref={src}
          fadeKey={id}
          onCopy={() => navigator.clipboard.writeText(spec.source)}
          onSource={() => window.open(src, '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={spec.source} fadeKey={id} />
        </div>
      </section>

      <section id="composition" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>How This Section Is Built</DocsSectionTitle>
        <CompositionTree tree={spec.tree} />
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable className="mt-4" rows={spec.props} />
      </section>

      <section id="related" className="mt-12 scroll-mt-20">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
          {relatedItems(id).map((item) => (
            <RelatedCard
              key={item.id}
              href={item.href}
              title={item.label}
              description={item.description ?? ''}
            />
          ))}
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(SECTIONS_ITEMS, id)} />
    </article>
  )
}
