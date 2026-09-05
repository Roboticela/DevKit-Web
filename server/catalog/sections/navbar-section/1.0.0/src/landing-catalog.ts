export type CatalogKind = 'products' | 'services' | 'reels' | 'support'

export type CatalogIcon =
  | 'studio'
  | 'canvas'
  | 'devices'
  | 'cloud'
  | 'audio'
  | 'accessories'
  | 'signin'
  | 'recovery'
  | 'sync'
  | 'help'
  | 'account'
  | 'security'
  | 'reel'
  | 'clip'

/** @deprecated Use CatalogIcon */
export type ProductIcon = CatalogIcon

export type CatalogProduct = {
  slug: string
  name: string
  tagline: string
  price: string
  facts: string[]
  featured?: boolean
}

export type CatalogItem = {
  slug: string
  label: string
  description: string
  icon?: CatalogIcon
  nav?: 'main' | 'sub'
  products?: CatalogProduct[]
}

export type CatalogSection = {
  kind: CatalogKind
  label: string
  to: string
  flyoutLabel: string
  lede: string
  items: CatalogItem[]
}

export const CATALOG: Record<CatalogKind, CatalogSection> = {
  products: {
    kind: 'products',
    label: 'Products',
    to: '/products',
    flyoutLabel: 'Explore Products',
    lede: 'Tools that stay out of the way, so the work can take the foreground.',
    items: [
      {
        slug: 'studio',
        label: 'Studio',
        description: 'Design, iterate, and ship from a single workspace.',
        icon: 'studio',
        nav: 'main',
        products: [
          {
            slug: 'studio-pro',
            name: 'Studio Pro',
            tagline: 'The full canvas for teams that ship every day.',
            price: 'From $49/mo',
            facts: [
              'Unlimited files and version history',
              'Shared libraries across every device',
              'Review, comment, and handoff in one place',
            ],
            featured: true,
          },
          {
            slug: 'studio-mini',
            name: 'Studio Mini',
            tagline: 'Everything you need to start. Nothing you don’t.',
            price: 'From $12/mo',
            facts: [
              'Personal workspace with 50 files',
              'Export to standard formats',
              'Upgrade to Pro at any time',
            ],
          },
          {
            slug: 'studio-board',
            name: 'Studio Board',
            tagline: 'A wall for ideas that have to stay visible.',
            price: 'From $19/mo',
            facts: [
              'Infinite canvas for maps and flows',
              'Live cursors for up to 16 people',
              'Snap to Studio files in one click',
            ],
          },
          {
            slug: 'studio-type',
            name: 'Studio Type',
            tagline: 'A type system that already knows your brand.',
            price: 'From $9/mo',
            facts: [
              'Optical sizes from caption to display',
              'Variable axes for weight and width',
              'Licensed for web, apps, and print',
            ],
          },
        ],
      },
      {
        slug: 'canvas',
        label: 'Canvas',
        description: 'A quiet surface for notes, boards, and long-form work.',
        icon: 'canvas',
        nav: 'sub',
        products: [
          {
            slug: 'canvas',
            name: 'Canvas',
            tagline: 'Write, sketch, and arrange without switching tools.',
            price: 'Free',
            facts: [
              'Docs, boards, and outlines in one file',
              'Offline on every signed-in device',
              'Publish a read-only link when you’re ready',
            ],
          },
          {
            slug: 'canvas-plus',
            name: 'Canvas Plus',
            tagline: 'The same surface, with room for a whole team.',
            price: 'From $8/mo',
            facts: [
              'Shared spaces with roles and guests',
              'Templates for briefs, logs, and plans',
              'Priority sync on large files',
            ],
          },
          {
            slug: 'canvas-rooms',
            name: 'Canvas Rooms',
            tagline: 'A room for each project. Closed when you’re done.',
            price: 'From $16/mo',
            facts: [
              'Time-boxed spaces with a clear archive',
              'Built-in agenda and decision log',
              'Drops into Studio with one export',
            ],
          },
        ],
      },
      {
        slug: 'device-kit',
        label: 'Device Kit',
        description: 'Pair, approve, and pick up where you left off.',
        icon: 'devices',
        nav: 'sub',
        products: [
          {
            slug: 'hub',
            name: 'Hub',
            tagline: 'The desk companion that keeps every device in step.',
            price: 'From $129',
            facts: [
              'Pairs in one tap with your DevKit Account',
              'Approves sign-in on nearby devices',
              'Quiet status light. No extra apps.',
            ],
          },
          {
            slug: 'key',
            name: 'Key',
            tagline: 'A passkey you can hold. Built for travel.',
            price: 'From $79',
            facts: [
              'USB-C and NFC in a single piece',
              'Works with passkeys and recovery',
              'Find it from any signed-in device',
            ],
          },
          {
            slug: 'clip',
            name: 'Clip',
            tagline: 'A pocket remote for lock, approve, and continue.',
            price: 'From $49',
            facts: [
              'One-button approve for trusted sign-ins',
              'Two-week charge',
              'Pairs through Device Kit, not a cable',
            ],
          },
        ],
      },
      {
        slug: 'cloud',
        label: 'Cloud',
        description: 'Private storage that follows the account, not the device.',
        icon: 'cloud',
        products: [
          {
            slug: 'cloud-256',
            name: 'Cloud 256',
            tagline: 'Space for the work you touch every week.',
            price: 'From $2.99/mo',
            facts: [
              '256 GB encrypted in your account',
              'Share folders with a link or a person',
              'Version history for 30 days',
            ],
          },
          {
            slug: 'cloud-1tb',
            name: 'Cloud 1 TB',
            tagline: 'Room for libraries, masters, and archives.',
            price: 'From $9.99/mo',
            facts: [
              '1 TB with 180-day version history',
              'Priority upload on large files',
              'Family sharing for up to five people',
            ],
            featured: true,
          },
          {
            slug: 'cloud-archive',
            name: 'Cloud Archive',
            tagline: 'Cold storage for what you rarely need — and must keep.',
            price: 'From $4.99/mo',
            facts: [
              'Restore within 12 hours',
              'Independent from your live Cloud plan',
              'Legal hold on request',
            ],
          },
        ],
      },
      {
        slug: 'audio',
        label: 'Audio',
        description: 'Listen in. Stay in the room. Leave the noise out.',
        icon: 'audio',
        products: [
          {
            slug: 'air-line',
            name: 'Air Line',
            tagline: 'All-day wireless. Tuned for voice and music.',
            price: 'From $179',
            facts: [
              'Spatial audio with dynamic head tracking',
              '24 hours with the case',
              'Find with any signed-in device',
            ],
          },
          {
            slug: 'air-line-max',
            name: 'Air Line Max',
            tagline: 'Over-ear quiet. Built for long sessions.',
            price: 'From $349',
            facts: [
              'Adaptive noise control',
              'Studio-grade monitoring mode',
              'USB-C lossless when you need it',
            ],
            featured: true,
          },
          {
            slug: 'buds',
            name: 'Buds',
            tagline: 'Smaller. Lighter. Ready when you are.',
            price: 'From $99',
            facts: [
              'One-tap pairing with Device Kit',
              'Sweat and dust resistant',
              'Five hours on a charge',
            ],
          },
        ],
      },
      {
        slug: 'accessories',
        label: 'Accessories',
        description: 'The pieces that finish the desk — and stay out of the way.',
        icon: 'accessories',
        products: [
          {
            slug: 'cable',
            name: 'Cable',
            tagline: 'USB-C to USB-C. Braided. Two meters.',
            price: '$29',
            facts: [
              'Charge and data in one cable',
              'Woven jacket that lies flat',
              'Works with Hub, Key, and Studio displays',
            ],
          },
          {
            slug: 'stand',
            name: 'Stand',
            tagline: 'A single angle for Hub, phone, and Board.',
            price: '$59',
            facts: [
              'Machined aluminum, 18° tilt',
              'Cable channel through the stem',
              'Fits Hub and most phones',
            ],
          },
          {
            slug: 'sleeve',
            name: 'Sleeve',
            tagline: 'A quiet case for Key, Clip, and Buds.',
            price: '$39',
            facts: [
              'Felt interior, woven exterior',
              'Two pockets, one pull',
              'Fits in a jacket without bulk',
            ],
          },
          {
            slug: 'mag-pad',
            name: 'Mag Pad',
            tagline: 'Charge Hub and phone from one pad.',
            price: '$79',
            facts: [
              'Two coils, one cable',
              'Aligns with a soft snap',
              'Sleeps when nothing is on it',
            ],
          },
        ],
      },
    ],
  },
  services: {
    kind: 'services',
    label: 'Services',
    to: '/services',
    flyoutLabel: 'Explore Services',
    lede: 'Continuity across sign-in, recovery, and the devices you already have.',
    items: [
      {
        slug: 'sign-in',
        label: 'Sign in',
        description: 'Passkeys, authenticator, and trusted devices — your choice.',
        icon: 'signin',
        nav: 'main',
      },
      {
        slug: 'recovery',
        label: 'Recovery',
        description: 'Codes and verified email, ready if you ever need them.',
        icon: 'recovery',
        nav: 'sub',
      },
      {
        slug: 'sync',
        label: 'Sync',
        description: 'Settings follow you, without asking you to manage them.',
        icon: 'sync',
        nav: 'sub',
      },
    ],
  },
  reels: {
    kind: 'reels',
    label: 'Reels',
    to: '/reels',
    flyoutLabel: 'Explore Reels',
    lede: 'Short films for the products you use and the services behind them.',
    items: [
      {
        slug: 'products',
        label: 'Products',
        description: 'See Studio, Canvas, and Device Kit in motion.',
        icon: 'reel',
        nav: 'main',
      },
      {
        slug: 'services',
        label: 'Services',
        description: 'Sign in, recovery, and sync — shown, not explained.',
        icon: 'clip',
        nav: 'sub',
      },
    ],
  },
  support: {
    kind: 'support',
    label: 'Support',
    to: '/support',
    flyoutLabel: 'Explore Support',
    lede: 'Get help with your DevKit Account, security, and devices.',
    items: [
      {
        slug: 'help',
        label: 'Help',
        description: 'Guides and answers for getting started and everyday use.',
        icon: 'help',
        nav: 'main',
      },
      {
        slug: 'account',
        label: 'Account',
        description: 'Manage sign-in, recovery, and your DevKit Account.',
        icon: 'account',
        nav: 'sub',
      },
      {
        slug: 'security',
        label: 'Security',
        description: 'Passkeys, two-factor authentication, and trusted devices.',
        icon: 'security',
        nav: 'sub',
      },
    ],
  },
}

export const CATALOG_SECTIONS = Object.values(CATALOG)

export function getCatalogSection(kind: string | undefined): CatalogSection | undefined {
  if (kind === 'products' || kind === 'services' || kind === 'reels' || kind === 'support') {
    return CATALOG[kind]
  }
  return undefined
}

export function getCatalogItem(section: CatalogSection, slug: string | undefined) {
  if (!slug) return undefined
  return section.items.find((item) => item.slug === slug)
}

export function getCatalogProduct(
  item: CatalogItem | undefined,
  slug: string | undefined,
): CatalogProduct | undefined {
  if (!item?.products || !slug) return undefined
  return item.products.find((product) => product.slug === slug)
}

export function getNavItems(section: CatalogSection) {
  const marked = section.items.filter((item) => item.nav)
  const source = marked.length ? marked : section.items
  const main = source.find((item) => item.nav === 'main') ?? source[0]
  const subs = source.filter((item) => item !== main).slice(0, 2)
  return { main, subs }
}

export function getFeaturedProducts() {
  return CATALOG.products.items.flatMap((category) =>
    (category.products ?? [])
      .filter((product) => product.featured)
      .map((product) => ({ category, product })),
  )
}
