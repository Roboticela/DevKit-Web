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
      { id: 'reset-password', label: 'Reset Password', href: '/pages/reset-password', searchGroup: 'Auth' },
      {
        id: 'choose-verification-method',
        label: 'Choose Verification Method',
        href: '/pages/choose-verification-method',
        searchGroup: 'Auth',
      },
      {
        id: 'verification-code',
        label: 'Verification Code',
        href: '/pages/verification-code',
        searchGroup: 'Auth',
      },
      {
        id: 'authenticator-code',
        label: 'Authenticator Code',
        href: '/pages/authenticator-code',
        searchGroup: 'Auth',
      },
      { id: 'recovery-code', label: 'Recovery Code', href: '/pages/recovery-code', searchGroup: 'Auth' },
      { id: 'another-device', label: 'Another Device', href: '/pages/another-device', searchGroup: 'Auth' },
      { id: 'link-expired', label: 'Link Expired', href: '/pages/link-expired', searchGroup: 'Auth' },
      { id: 'setup-2fa', label: 'Setup Two-Factor', href: '/pages/setup-2fa', searchGroup: 'Auth' },
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
  { id: 'other-ways', label: 'Other ways to sign in' },
  { id: 'last-used-google', label: 'Last used (Google)' },
  { id: 'last-used-passkey', label: 'Last used (Passkey)' },
  { id: 'last-used-roboticela', label: 'Last used (Roboticela)' },
] as const

export type SignInPreviewState = (typeof SIGN_IN_STATES)[number]['id']

export type SignInPageState = 'default' | 'error' | 'loading' | 'locked' | 'other-ways'

export type AuthLastMethod = 'google' | 'passkey' | 'roboticela'

export function resolveSignInPreview(state: SignInPreviewState): {
  state: SignInPageState
  lastMethod: AuthLastMethod | null
} {
  if (state === 'last-used-google') return { state: 'default', lastMethod: 'google' }
  if (state === 'last-used-passkey') return { state: 'default', lastMethod: 'passkey' }
  if (state === 'last-used-roboticela') return { state: 'default', lastMethod: 'roboticela' }
  return { state, lastMethod: null }
}

export const CREATE_ACCOUNT_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const CREATE_ACCOUNT_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (submitting)' },
  { id: 'other-ways', label: 'Other ways to sign in' },
  { id: 'last-used-google', label: 'Last used (Google)' },
  { id: 'last-used-passkey', label: 'Last used (Passkey)' },
  { id: 'last-used-roboticela', label: 'Last used (Roboticela)' },
] as const

export type CreateAccountPreviewState = (typeof CREATE_ACCOUNT_STATES)[number]['id']

export type CreateAccountPageState = 'default' | 'error' | 'loading' | 'other-ways'

export function resolveCreateAccountPreview(state: CreateAccountPreviewState): {
  state: CreateAccountPageState
  lastMethod: AuthLastMethod | null
} {
  if (state === 'last-used-google') return { state: 'default', lastMethod: 'google' }
  if (state === 'last-used-passkey') return { state: 'default', lastMethod: 'passkey' }
  if (state === 'last-used-roboticela') return { state: 'default', lastMethod: 'roboticela' }
  return { state, lastMethod: null }
}

export const FORGOT_PASSWORD_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const FORGOT_PASSWORD_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (submitting)' },
] as const

export type ForgotPasswordPreviewState = (typeof FORGOT_PASSWORD_STATES)[number]['id']

export const RESET_PASSWORD_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const RESET_PASSWORD_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (saving)' },
  { id: 'success', label: 'Password updated' },
  { id: 'success-signin', label: 'Password updated (from sign-in)' },
  { id: 'checking', label: 'Checking session' },
] as const

export type ResetPasswordPreviewState = (typeof RESET_PASSWORD_STATES)[number]['id']

export const CHOOSE_VERIFICATION_METHOD_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const CHOOSE_VERIFICATION_METHOD_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'selected', label: 'Method selected' },
  { id: 'loading', label: 'Loading (continuing)' },
  { id: 'error', label: 'Error' },
  { id: 'checking', label: 'Loading methods' },
] as const

export type ChooseVerificationMethodPreviewState =
  (typeof CHOOSE_VERIFICATION_METHOD_STATES)[number]['id']

export const VERIFICATION_CODE_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const VERIFICATION_CODE_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (verifying)' },
  { id: 'resend-countdown', label: 'Resend countdown' },
  { id: 'resend-ready', label: 'Resend ready' },
  { id: 'no-email', label: 'No email' },
  { id: 'checking', label: 'Verifying link' },
  { id: 'reset-password', label: 'Reset password flow' },
] as const

export type VerificationCodePreviewState = (typeof VERIFICATION_CODE_STATES)[number]['id']

export const AUTHENTICATOR_CODE_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const AUTHENTICATOR_CODE_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (verifying)' },
  { id: 'no-email', label: 'No email' },
] as const

export type AuthenticatorCodePreviewState = (typeof AUTHENTICATOR_CODE_STATES)[number]['id']

export const RECOVERY_CODE_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const RECOVERY_CODE_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'error', label: 'Validation Error' },
  { id: 'loading', label: 'Loading (verifying)' },
  { id: 'no-email', label: 'No email' },
] as const

export type RecoveryCodePreviewState = (typeof RECOVERY_CODE_STATES)[number]['id']

export const ANOTHER_DEVICE_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const ANOTHER_DEVICE_STATES = [
  { id: 'default', label: 'Waiting for approval' },
  { id: 'completing', label: 'Approved (finishing)' },
  { id: 'declined', label: 'Declined' },
  { id: 'expired', label: 'Expired' },
  { id: 'error', label: 'Error' },
  { id: 'no-email', label: 'No email' },
] as const

export type AnotherDevicePreviewState = (typeof ANOTHER_DEVICE_STATES)[number]['id']

export const LINK_EXPIRED_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const LINK_EXPIRED_STATES = [
  { id: 'default', label: 'Sign in flow' },
  { id: 'reset-password', label: 'Password reset' },
  { id: 'settings', label: 'Settings change' },
] as const

export type LinkExpiredPreviewState = (typeof LINK_EXPIRED_STATES)[number]['id']

export const SETUP_TWO_FACTOR_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-preview', label: 'Live Preview' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'composition', label: 'Composition' },
  { id: 'data', label: 'Data Requirements' },
]

export const SETUP_TWO_FACTOR_STATES = [
  { id: 'default', label: 'Scan QR code' },
  { id: 'loading', label: 'Loading setup' },
  { id: 'error', label: 'Invalid code' },
  { id: 'saving', label: 'Saving' },
  { id: 'codes', label: 'Recovery codes' },
  { id: 'success', label: 'Setup complete' },
] as const

export type SetupTwoFactorPreviewState = (typeof SETUP_TWO_FACTOR_STATES)[number]['id']
