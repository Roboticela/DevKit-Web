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
  | 'Documentation'

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
      c('colors', 'Colors', 'Foundations', 'Tokens for brand, status, type, surfaces, and borders. Use a token so light and dark stay correct.'),
      c('typography', 'Typography', 'Foundations', 'The type scale for the kit. Size, weight, and tracking live here and the Text components apply them.'),
      c('spacing', 'Spacing', 'Foundations', 'The only spacing steps the kit uses. Pick the nearest value on this scale instead of inventing a new gap.'),
      c('radius', 'Radius', 'Foundations', 'Corner rounding for fields, cards, panels, and pills. Match the radius to what the object is.'),
      c('layout', 'Layout', 'Foundations', 'Breakpoints, content widths, and page padding. Start from the small screen and add columns as the viewport grows.'),
      c('icons', 'Icons', 'Foundations', 'A local icon library you can search by name or meaning. Use these glyphs in buttons, fields, and empty states.'),
      c('brand-logo', 'Brand Logo', 'Foundations', 'The company mark, the product wordmark, and the lockup that pairs them.'),
      c('theme-toggle', 'Theme Toggle', 'Foundations', 'A labeled switch that sets light or dark for the whole page. Compact and switch only layouts are included.'),
      c('theme-icon-toggle', 'Theme Icon Toggle', 'Foundations', 'A compact control that sets light or dark with sun and moon icons. Variants show one icon or both at once.'),
      c('country-flag', 'Country Flag', 'Foundations', 'A flag image for every ISO country code. Search by name, code, or dialing code.'),
    ],
  },
  {
    id: 'type',
    label: 'Typography',
    items: [
      c('text', 'Text', 'Typography', 'The full type scale in one place. Heading, subhead, body, caption, eyebrow, and label share these sizes and tones.'),
      c('heading', 'Heading', 'Typography', 'The title of a page or section. Display is a hero. Levels 1, 2, and 3 follow the document outline.'),
      c('subhead', 'Subhead', 'Typography', 'One supporting sentence that sits directly under a heading.'),
      c('body', 'Body', 'Typography', 'Paragraphs at the reading size. Use the default for pages and the small size inside cards.'),
      c('caption', 'Caption', 'Typography', 'Quiet supporting copy for timestamps, counts, and hints. Do not put essential instructions here.'),
      c('eyebrow', 'Eyebrow', 'Typography', 'A short uppercase kicker that sits above a heading. Keep it to a few words.'),
      c('label', 'Label', 'Typography', 'Medium weight text for fields and controls. In forms, prefer Field Label so the input stays associated.'),
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      c('button', 'Button', 'Buttons', 'The main control for running an action. Use one primary button on a screen.'),
      c('icon-button', 'Icon Button', 'Buttons', 'A compact button that shows only a glyph. The label prop is the accessible name.'),
      c('switch', 'Switch', 'Buttons', 'An immediate on or off setting. The change applies as soon as the control is flipped.'),
      c('segmented-control', 'Segmented Control', 'Buttons', 'A small set of options where only one can be selected. Use it for views, ranges, and toolbars.'),
      c('confirm-action', 'Confirm Action', 'Buttons', 'A button that asks once, then runs the action on a second press. Use it for remove, sign out, and similar row actions.'),
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      c('text-field', 'Text Field', 'Forms', 'Collect a short answer such as a name, email, or search query. Use this when the value fits on one line.'),
      c('password-field', 'Password Field', 'Forms', 'Collect a secret that stays hidden until the person chooses to show it. Use this on sign in and when creating an account.', true),
      c('textarea', 'Textarea', 'Forms', 'Collect a note, bio, or message. Use this when the person needs room to write more than one line.'),
      c('password-reveal', 'Password Reveal', 'Forms', 'Lets the person show or hide the characters in a password. Keep it inside the field.'),
      c('select', 'Select', 'Forms', 'Pick one option from a list. Use this when the choices are too many to show as radios and only one answer is allowed.'),
      c('country-select', 'Country Select', 'Forms', 'Ask for a country. The menu is searchable and shows a flag. Pass the chosen country into region and city fields.'),
      c('state-select', 'State Select', 'Forms', 'Ask for a state, province, or emirate after the country is known. The caption changes to match that country.'),
      c('county-select', 'County Select', 'Forms', 'Ask for a county or district after a region is chosen. Hide this field in countries that do not use this layer.'),
      c('city-select', 'City Select', 'Forms', 'Ask for a city. Narrow the list with the country, region, or county already chosen.'),
      c('language-select', 'Language Select', 'Forms', 'Ask for a display language. Store a language id, not the translated name.'),
      c('phone-input', 'Phone Input', 'Forms', 'Collect a phone number with a country code. The number formats as the person types. Store the international form with a plus and digits.'),
      c('checkbox', 'Checkbox', 'Forms', 'Let the person turn a choice on or off before submitting. Several can be on at once. Use a switch if the change should apply immediately.'),
      c('radio', 'Radio', 'Forms', 'Pick exactly one option from a small set that stays visible. Use a select when the list is long.'),
      c('slider', 'Slider', 'Forms', 'Pick a number by dragging along a track. Attach a Number Field when the exact figure must be typed.'),
      c('number-field', 'Number Field', 'Forms', 'Type or step a number. A unit such as percent, currency, or pixels sits next to the digits.', true),
      c('date-picker', 'Date Picker', 'Forms', 'Pick a calendar date, or a start and an end. The field and the calendar match the other menus in the kit.', true),
      c('otp-boxes', 'OTP Boxes', 'Forms', 'Enter a verification code one digit at a time. Paste fills the row. Use this after sign in or to confirm a device.'),
      c('recovery-input', 'Recovery Input', 'Forms', 'Enter a backup code or account recovery key. Letters and numbers group themselves as the person types.'),
      c('field-label', 'Field Label', 'Forms', 'Name a field and place help or an error under it. A placeholder is not a substitute for this name.'),
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      c('alert', 'Alert', 'Feedback', 'An inline status message. Subtle, outline, solid, and ghost, with info through danger and a quiet neutral note.'),
      c('progress', 'Progress', 'Feedback', 'Show how far a task has gone. Use this for uploads, quotas, and installs. The bar fills from zero to complete.'),
      c('skeleton', 'Skeleton', 'Feedback', 'A placeholder while content loads. Subtle, outline, ghost, and pill, as a line, heading, circle, rect, or square.'),
      c('empty-state', 'Empty State', 'Feedback', 'Show a calm view when a list has nothing to show. Use this for first use, no results, and a blank canvas after an error.'),
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
  {
    id: 'documentation',
    label: 'Documentation',
    items: [
      c('docs-card', 'Card', 'Documentation', 'A rounded surface for principles, stacks, and other docs content.', true),
      c('docs-card-grid', 'Card Grid', 'Documentation', 'A responsive grid for docs cards. Use two, three, four, or six columns.', true),
      c('docs-stack', 'Stack', 'Documentation', 'A vertical stack with the kit spacing scale. Use it to group docs blocks.', true),
      c('docs-usage', 'Usage', 'Documentation', 'The standard vertical rhythm for a usage section: prose, principles, then do and don’t.', true),
      c('docs-token-group', 'Token Group', 'Documentation', 'A labeled group of token samples with an optional note.', true),
      c('docs-state-card', 'State Card', 'Documentation', 'A labeled tile that shows one control state on a quiet surface.', true),
      c('docs-state-grid', 'State Grid', 'Documentation', 'A grid of state cards. Matches the live states section on kit pages.', true),
      c('docs-state-group', 'State Group', 'Documentation', 'A caption plus a grid of state cards, for appearance, size, or tone.', true),
      c('docs-swatch', 'Swatch', 'Documentation', 'A color chip that shows the token fill and its CSS variable name.', true),
      c('docs-swatch-grid', 'Swatch Grid', 'Documentation', 'A four column grid of color swatches for a token family.', true),
      c('docs-contrast-card', 'Contrast Card', 'Documentation', 'A reading pair of foreground and background tokens, shown at body size.', true),
      c('docs-radius-card', 'Radius Card', 'Documentation', 'A sample corner next to its name, pixel value, and intended use.', true),
      c('docs-scale-row', 'Scale Row', 'Documentation', 'A percentage bar for content widths and other values relative to a max.', true),
      c('docs-measure-row', 'Measure Row', 'Documentation', 'A pixel bar for spacing steps, shown at their true width.', true),
      c('docs-table', 'Docs Table', 'Documentation', 'A simple table for scales, breakpoints, and keyboard maps.', true),
      c('docs-snippet', 'Snippet', 'Documentation', 'A monospace code sample on a secondary surface.', true),
      c('docs-related', 'Related', 'Documentation', 'A three column grid for related component links.', true),
      c('docs-principle-card', 'Principle Card', 'Documentation', 'A numbered principle with a short title and supporting line.', true),
      c('docs-rule-card', 'Rule Card', 'Documentation', 'A do or don’t list with a success or danger tone.', true),
      c('docs-inline-code', 'Inline Code', 'Documentation', 'A monospace token or prop name inside a sentence.', true),
      c('docs-prose', 'Prose', 'Documentation', 'A reading column capped at 692px for docs body copy.', true),
      c('docs-principles', 'Principles', 'Documentation', 'Three principle cards in a row. Use them to state how a component should be used.', true),
      c('docs-do-dont', 'Do Don’t', 'Documentation', 'A paired do list and don’t list for a usage section.', true),
      c('docs-keys', 'Keys', 'Documentation', 'A keyboard table with Key and Action columns.', true),
      c('a11y-section', 'Accessibility Section', 'Documentation', 'Requirements in a callout, with an optional keyboard table below.', true),
    ],
  },
]

export const DOCS_ITEMS: DocsNavItem[] = DOCS_NAV.flatMap((section) => section.items)

export const FOUNDATION_IDS = new Set(['colors', 'typography', 'spacing', 'radius', 'layout', 'icons'])

export const DOCS_PRIMITIVE_IDS = new Set([
  'docs-card',
  'docs-card-grid',
  'docs-stack',
  'docs-usage',
  'docs-token-group',
  'docs-state-card',
  'docs-state-grid',
  'docs-state-group',
  'docs-swatch',
  'docs-swatch-grid',
  'docs-contrast-card',
  'docs-radius-card',
  'docs-scale-row',
  'docs-measure-row',
  'docs-table',
  'docs-snippet',
  'docs-related',
  'docs-principle-card',
  'docs-rule-card',
  'docs-inline-code',
  'docs-prose',
  'docs-principles',
  'docs-do-dont',
  'docs-keys',
  'a11y-section',
])

export const COMPONENT_ALIASES: Record<string, string> = {
  toggle: 'switch',
  'theme-switch': 'theme-toggle',
  subheading: 'subhead',
  content: 'body',
  paragraph: 'body',
  'theme-icon': 'theme-icon-toggle',
  password: 'password-field',
  'search-select': 'select',
  'province-select': 'state-select',
  'region-select': 'state-select',
  'emirate-select': 'state-select',
  'district-select': 'county-select',
  'range-slider': 'slider',
  stepper: 'number-field',
  'number-input': 'number-field',
  'value-selector': 'number-field',
  quantity: 'number-field',
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
  'Documentation',
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
  { id: 'usage', label: 'Usage' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'props', label: 'Props' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const TEXT_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'Variants' },
  { id: 'tones', label: 'Tones' },
  { id: 'stack', label: 'Stack' },
  { id: 'props', label: 'Props' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const GUIDE_TOC: DocsTocItem[] = BUTTON_TOC

export const KIT_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'code', label: 'Code' },
  { id: 'states', label: 'States' },
  { id: 'props', label: 'Props' },
]

export const FOUNDATION_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const COLORS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'contrast', label: 'Contrast' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const TYPE_FOUNDATION_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'tokens', label: 'Scale' },
  { id: 'stack', label: 'Stack' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const ICONS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'library', label: 'Library' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const FLAGS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'library', label: 'Library' },
  { id: 'props', label: 'Props' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const GUIDE_SLUGS = new Set([
  'heading',
  'subhead',
  'body',
  'caption',
  'eyebrow',
  'label',
  'icon-button',
  'switch',
  'checkbox',
  'radio',
  'text-field',
  'password-field',
  'textarea',
  'password-reveal',
  'select',
  'country-select',
  'state-select',
  'county-select',
  'city-select',
  'language-select',
  'phone-input',
  'slider',
  'number-field',
  'date-picker',
  'otp-boxes',
  'recovery-input',
  'field-label',
  'progress',
  'empty-state',
  'segmented-control',
  'confirm-action',
  'brand-logo',
  'theme-toggle',
  'theme-icon-toggle',
  ...DOCS_PRIMITIVE_IDS,
])
