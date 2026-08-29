import type { DocsNavSection, DocsNavItem, DocsTocItem } from './docs-catalog'

export const PAGES_NAV: DocsNavSection[] = [
  {
    id: 'marketing',
    label: 'Marketing',
    items: [
      { id: 'landing', label: 'Landing Page', href: '/pages/landing', searchGroup: 'Marketing' },
      { id: 'pricing', label: 'Pricing Page', href: '/pages/pricing', searchGroup: 'Marketing' },
      { id: 'about', label: 'About Page', href: '/pages/about', searchGroup: 'Marketing' },
      { id: 'contact', label: 'Contact Page', href: '/pages/contact', searchGroup: 'Marketing' },
    ],
  },
  {
    id: 'auth',
    label: 'Auth',
    items: [
      { id: 'sign-in', label: 'Sign In', href: '/pages/sign-in', searchGroup: 'Auth' },
      { id: 'create-account', label: 'Create Account', href: '/pages/create-account', searchGroup: 'Auth' },
      { id: 'forgot-password', label: 'Forgot Password', href: '/pages/forgot-password', searchGroup: 'Auth' },
      {
        id: 'otp-verification',
        label: 'OTP Verification',
        href: '/pages/otp-verification',
        searchGroup: 'Auth',
      },
      {
        id: 'passkey-sign-in',
        label: 'Passkey Sign In',
        href: '/pages/passkey-sign-in',
        searchGroup: 'Auth',
        isNew: true,
      },
    ],
  },
  {
    id: 'app-shell',
    label: 'App Shell',
    items: [
      { id: 'dashboard', label: 'Dashboard Overview', href: '/pages/dashboard', searchGroup: 'App Shell' },
      { id: 'settings', label: 'Settings', href: '/pages/settings', searchGroup: 'App Shell' },
      { id: 'empty-states', label: 'Empty States', href: '/pages/empty-states', searchGroup: 'App Shell' },
      { id: 'error-pages', label: 'Error Pages', href: '/pages/error-pages', searchGroup: 'App Shell' },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    items: [
      { id: 'product-listing', label: 'Product Listing', href: '/pages/product-listing', searchGroup: 'Commerce' },
      {
        id: 'product-detail',
        label: 'Product Detail',
        href: '/pages/product-detail',
        searchGroup: 'Commerce',
        isNew: true,
      },
      { id: 'cart', label: 'Cart', href: '/pages/cart', searchGroup: 'Commerce' },
      { id: 'checkout', label: 'Checkout', href: '/pages/checkout', searchGroup: 'Commerce' },
      {
        id: 'order-confirmation',
        label: 'Order Confirmation',
        href: '/pages/order-confirmation',
        searchGroup: 'Commerce',
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { id: 'blog-index', label: 'Blog Index', href: '/pages/blog-index', searchGroup: 'Content' },
      { id: 'blog-post', label: 'Blog Post', href: '/pages/blog-post', searchGroup: 'Content', isNew: true },
      {
        id: 'documentation-article',
        label: 'Documentation Article',
        href: '/pages/documentation-article',
        searchGroup: 'Content',
      },
    ],
  },
]

export const PAGES_ITEMS: DocsNavItem[] = PAGES_NAV.flatMap((section) => section.items)

export const SIGN_IN_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const SIGN_IN_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (submitting)' },
  { id: 'locked', label: 'Locked Out (too many attempts)' },
] as const

export type SignInPreviewState = (typeof SIGN_IN_STATES)[number]['id']
