import { PAGES_ITEMS } from './pages-catalog'

export type DocsSearchGroup =
  | 'Foundations'
  | 'Typography'
  | 'Buttons'
  | 'Forms'
  | 'Feedback'
  | 'Overlay'
  | 'Navigation'
  | 'Data Display'
  | 'Marketing'
  | 'Auth'
  | 'App Shell'
  | 'Commerce'
  | 'Content'

export type DocsNavItem = {
  id: string
  label: string
  href: string
  searchGroup: DocsSearchGroup
  description?: string
  isNew?: boolean
}

export type DocsNavSection = {
  id: string
  label: string
  items: DocsNavItem[]
}

export type DocsTocItem = {
  id: string
  label: string
}

function c(
  id: string,
  label: string,
  searchGroup: DocsSearchGroup,
  description?: string,
  isNew?: boolean,
): DocsNavItem {
  return { id, label, href: `/components/${id}`, searchGroup, description, isNew }
}

export const DOCS_NAV: DocsNavSection[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    items: [
      c('colors', 'Colors', 'Foundations', 'Brand, semantic, and neutral tokens.'),
      c('typography', 'Typography', 'Foundations', 'Type scale, weight, and tracking.'),
      c('spacing', 'Spacing', 'Foundations', 'The spacing scale used across the kit.'),
      c('radius', 'Radius', 'Foundations', 'Corner radii for fields, cards, and pills.'),
      c('layout', 'Layout', 'Foundations', 'Breakpoints, content widths, and page padding.'),
      c('icons', 'Icons', 'Foundations', 'A searchable local icon set tagged by meaning.'),
      c('brand-logo', 'Brand Logo', 'Foundations', 'The product mark, wordmark, and lockup.'),
      c('theme-toggle', 'Theme Toggle', 'Foundations', 'Light and dark with a labeled switch, or the switch alone.'),
      c('theme-icon-toggle', 'Theme Icon Toggle', 'Foundations', 'An icon-only control for light and dark, including both icons at once.'),
      c('country-flag', 'Country Flag', 'Foundations', 'Searchable flags for every ISO country code.'),
    ],
  },
  {
    id: 'type',
    label: 'Typography',
    items: [
      c('text', 'Text', 'Typography', 'Heading, subhead, content, and the rest of the type scale.'),
      c('heading', 'Heading', 'Typography', 'Display and h1–h3.'),
      c('subhead', 'Subhead', 'Typography', 'The supporting line under a heading.'),
      c('body', 'Body', 'Typography', 'Content paragraphs at the reading size.'),
      c('caption', 'Caption', 'Typography', 'Small supporting copy for timestamps and hints.'),
      c('eyebrow', 'Eyebrow', 'Typography', 'A short uppercase label above a heading.'),
      c('label', 'Label', 'Typography', 'Medium-weight copy for controls and fields.'),
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      c('button', 'Button', 'Buttons', 'A pressable control that triggers an action.'),
      c('icon-button', 'Icon Button', 'Buttons', 'A compact control for a single icon action.'),
      c('switch', 'Switch', 'Buttons', 'A two-state control, including grouped rows and color variants.'),
      c('segmented-control', 'Segmented Control', 'Buttons', 'A mutually exclusive set of options.'),
      c('confirm-action', 'Confirm Action', 'Buttons', 'A two-tap destructive text action.'),
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      c('text-field', 'Text Field', 'Forms', 'A single-line text input.'),
      c('textarea', 'Textarea', 'Forms', 'A multi-line text input.'),
      c('password-reveal', 'Password Reveal', 'Forms', 'Show or hide a password field.'),
      c('select', 'Select', 'Forms', 'A compact dropdown for a single value.'),
      c('search-select', 'Search Select', 'Forms', 'A searchable single-select menu.'),
      c('country-select', 'Country Select', 'Forms', 'Choose a country from a searchable list.'),
      c('language-select', 'Language Select', 'Forms', 'Choose a language from a searchable list.'),
      c('phone-input', 'Phone Input', 'Forms', 'A phone number field with country code.'),
      c('checkbox', 'Checkbox', 'Forms', 'A binary choice in a form.'),
      c('radio', 'Radio', 'Forms', 'One option in a mutually exclusive set.'),
      c('slider', 'Slider', 'Forms', 'Pick a numeric value along a range.'),
      c('date-picker', 'Date Picker', 'Forms', 'Select a date or date range.', true),
      c('otp-boxes', 'OTP Boxes', 'Forms', 'Digit boxes for a one-time code.'),
      c('recovery-input', 'Recovery Input', 'Forms', 'Enter or display recovery codes.'),
      c('field-label', 'Field Label', 'Forms', 'Label, hint, and field grouping.'),
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      c('alert', 'Alert', 'Feedback', 'An inline message for status or errors.'),
      c('progress', 'Progress', 'Feedback', 'A determinate progress bar.'),
      c('skeleton', 'Skeleton', 'Feedback', 'A placeholder while content loads.'),
      c('empty-state', 'Empty State', 'Feedback', 'A calm empty or zero-result view.'),
      c('loading-screen', 'Loading Screen', 'Feedback', 'A branded wait state.'),
      c('score-ring', 'Score Ring', 'Feedback', 'A circular completion indicator.'),
    ],
  },
  {
    id: 'overlay',
    label: 'Overlay',
    items: [
      c('modal', 'Modal', 'Overlay', 'A focused dialog above the page.'),
      c('confirm-dialog', 'Confirm Dialog', 'Overlay', 'A destructive or irreversible confirm.'),
      c('avatar-editor', 'Avatar Editor', 'Overlay', 'Crop and save a profile photo.'),
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      c('tabs', 'Tabs', 'Navigation', 'Switch between peer views.'),
      c('icon-tab', 'Icon Tab', 'Navigation', 'A compact tab with an icon and label.'),
      c('breadcrumb', 'Breadcrumb', 'Navigation', 'The path back through the hierarchy.'),
      c('pagination', 'Pagination', 'Navigation', 'Move through a paged list.'),
      c('sidebar-nav', 'Sidebar Nav', 'Navigation', 'Primary navigation for an app shell.'),
      c('dashboard-nav', 'Dashboard Nav', 'Navigation', 'Top bar for a signed-in workspace.'),
      c('sheet-nav', 'Sheet Nav', 'Navigation', 'A mobile navigation sheet.'),
      c('nav-search', 'Nav Search', 'Navigation', 'A compact search field for a top bar.'),
      c('profile-button', 'Profile Button', 'Navigation', 'Opens the account menu from an avatar.'),
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    items: [
      c('badge', 'Badge', 'Data Display', 'A compact status or category label.'),
      c('avatar', 'Avatar', 'Data Display', 'A photo or initials for a person.'),
      c('avatar-picker', 'Avatar Picker', 'Data Display', 'Choose a profile photo from disk.'),
      c('stat-card', 'Stat Card', 'Data Display', 'A headline metric with optional delta.', true),
      c('table', 'Table', 'Data Display', 'A structured list of records.'),
      c('page-header', 'Page Header', 'Data Display', 'Title, description, and page actions.'),
      c('list-row', 'List Row', 'Data Display', 'A tappable row inside a grouped list.'),
      c('settings-row', 'Settings Row', 'Data Display', 'A labeled row with a trailing control.'),
      c('key-value-row', 'Key Value Row', 'Data Display', 'A label and value on one line.'),
      c('divider', 'Divider', 'Data Display', 'A labeled rule between sections.'),
    ],
  },
  {
    id: 'auth',
    label: 'Auth',
    items: [
      c('auth-layout', 'Auth Layout', 'Auth', 'Centered layout for sign-in and related flows.'),
      c('text-link', 'Text Link', 'Auth', 'Inline links, legal copy, and error text.'),
      c('social-login', 'Social Login Button', 'Auth', 'Continue with Google, Apple, GitHub, and more.'),
      c('verification-method', 'Verification Method', 'Auth', 'A selectable 2FA method card.'),
      c('totp-manual-key', 'TOTP Manual Key', 'Auth', 'A copyable authenticator secret.'),
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    items: [
      c('site-nav', 'Site Nav', 'Marketing', 'Marketing site header and mobile menu.'),
      c('site-footer', 'Site Footer', 'Marketing', 'Marketing site footer with language.'),
    ],
  },
  {
    id: 'app-shell',
    label: 'App Shell',
    items: [
      c('dashboard-shell', 'Dashboard Shell', 'App Shell', 'Sidebar, top bar, and main canvas.'),
    ],
  },
]

export const DOCS_ITEMS: DocsNavItem[] = DOCS_NAV.flatMap((section) => section.items)

export const FOUNDATION_IDS = new Set(['colors', 'typography', 'spacing', 'radius', 'layout', 'icons'])

export const COMPONENT_ALIASES: Record<string, string> = {
  toggle: 'switch',
  'theme-switch': 'theme-toggle',
  subheading: 'subhead',
  content: 'body',
  paragraph: 'body',
  'theme-icon': 'theme-icon-toggle',
}

export const SEARCH_GROUP_ORDER: DocsSearchGroup[] = [
  'Buttons',
  'Forms',
  'Feedback',
  'Navigation',
  'Foundations',
  'Typography',
  'Overlay',
  'Data Display',
  'Auth',
  'Marketing',
  'App Shell',
  'Commerce',
  'Content',
]

export function searchDocs(query: string): Array<{ group: DocsSearchGroup; items: DocsNavItem[] }> {
  const q = query.trim().toLowerCase()
  const catalog = [...DOCS_ITEMS, ...PAGES_ITEMS]
  const matches = q
    ? catalog.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.searchGroup.toLowerCase().includes(q) ||
          item.id.includes(q) ||
          (item.description ?? '').toLowerCase().includes(q),
      )
    : catalog

  return SEARCH_GROUP_ORDER.flatMap((group) => {
    const items = matches.filter((item) => item.searchGroup === group)
    return items.length ? [{ group, items }] : []
  })
}

export function findDocContext(sections: DocsNavSection[], slug: string) {
  for (const section of sections) {
    const item = section.items.find((entry) => entry.id === slug)
    if (item) return { section, item }
  }
  return undefined
}

export function adjacentDocs(items: DocsNavItem[], slug: string) {
  const index = items.findIndex((item) => item.id === slug)
  const prev = index > 0 ? items[index - 1] : undefined
  const next = index >= 0 && index < items.length - 1 ? items[index + 1] : undefined
  return {
    prev: prev ? { href: prev.href, label: prev.label } : undefined,
    next: next ? { href: next.href, label: next.label } : undefined,
  }
}

export const BUTTON_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'props', label: 'Props' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const TEXT_TOC: DocsTocItem[] = BUTTON_TOC

export const KIT_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'props', label: 'Props' },
]

export const FOUNDATION_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tokens', label: 'Tokens' },
]

export const ICONS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
]

export const FLAGS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'props', label: 'Props' },
]
