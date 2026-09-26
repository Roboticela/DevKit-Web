import { PAGES_ITEMS } from './pages-catalog'
import { SECTIONS_ITEMS } from './sections-catalog'

export type DocsSearchGroup =
  | 'Foundations'
  | 'Typography'
  | 'Buttons'
  | 'Forms'
  | 'Feedback'
  | 'Overlay'
  | 'Navigation'
  | 'Dock'
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
      c('shadows', 'Shadows', 'Foundations', 'The elevation scale in light and dark, plus the Dock and icon-tile shadows. Use the token, never a one-off box-shadow.'),
      c('glass', 'Glass', 'Foundations', 'The five blur and tint weight classes for every translucent surface. Pick the closest class instead of inventing a recipe.'),
      c('motion', 'Motion', 'Foundations', 'The two easing curves and the duration scale. Spring is reserved for defined alive moments; everything else uses standard.'),
      c('z-index', 'Z-Index', 'Foundations', 'The OS layering scale from desktop to tooltip. Window order is computed at runtime and capped below the Dock.'),
      c('icons', 'Icons', 'Foundations', 'A local icon library you can search by name or meaning. Use these glyphs in buttons, fields, and empty states.'),
      c('cursors', 'Cursors', 'Foundations', 'RoboticelaOS and system cursor packs in SVG and .rcur binary formats, featuring an interactive testing playground, hotspot calibration, and runtime loaders.'),
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
      c('password-field', 'Password Field', 'Forms', 'Collect a secret that stays hidden until the person chooses to show it. Use this on sign in and when creating an account.'),
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
      c('number-field', 'Number Field', 'Forms', 'Type or step a number. A unit such as percent, currency, or pixels sits next to the digits.'),
      c('date-picker', 'Date Picker', 'Forms', 'Pick a calendar date, or a start and an end. The field and the calendar match the other menus in the kit.'),
      c('otp-boxes', 'OTP Boxes', 'Forms', 'Enter a verification code one digit at a time. Paste fills the row. Use this after sign in or to confirm a device.'),
      c('recovery-input', 'Recovery Input', 'Forms', 'Enter a backup code or account recovery key. Letters and numbers group themselves as the person types.'),
      c('field-label', 'Field Label', 'Forms', 'Name a field and place help or an error under it. A placeholder is not a substitute for this name.'),
      c('swatch-picker', 'Swatch Picker', 'Forms', 'Pick a color from a row of round swatches. The selected one gets a double ring; hover only scales.'),
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      c('alert', 'Alert', 'Feedback', 'Tell the person something that happened on this screen. Use it for a save, a warning, a failure, or a quiet note they can dismiss.'),
      c('progress', 'Progress', 'Feedback', 'Show how far a known task has gone, from empty to complete. Use it for an upload, a quota, or an install. If you do not know the amount yet, use the traveling bar.'),
      c('skeleton', 'Skeleton', 'Feedback', 'Hold the layout while data loads by wrapping the real component. Bones keep the same size and shape so the page does not jump.'),
      c('empty-state', 'Empty State', 'Feedback', 'The page when a list has nothing to show. Use it for a first visit, no search results, or a failure that needs a retry.'),
      c('empty-popup', 'Empty Popup', 'Feedback', 'The compact empty view inside a menu or palette. Use it when a popup list has no results, not when the whole page is empty.'),
      c('loading-screen', 'Loading Screen', 'Feedback', 'Cover the view while boot or sign in finishes. Use Loader instead when only a control or a line of copy is waiting.'),
      c('loader', 'Loader', 'Feedback', 'A spinning ring for a short wait next to a label, in a toolbar, or on a card. Use Loading Screen when the whole view is not ready.'),
      c('score-ring', 'Score Ring', 'Feedback', 'A circular score or completion mark, like Screen Time. Use it for a profile score, a quota, or a setup checklist.'),
      c('notification-banner', 'Notification Banner', 'Feedback', 'A transient message from an app: icon, title, body, timestamp, and dismiss on glass. Slides in with the reserved spring ease and dismisses itself after five seconds.'),
    ],
  },
  {
    id: 'overlay',
    label: 'Overlay',
    items: [
      c('modal', 'Modal', 'Overlay', 'A panel above the page that takes focus until the person finishes. Use a dialog for a form, an alert for a short decision, a sheet from the bottom, or an action list for choices such as Share or Delete.'),
      c('command-palette', 'Command Palette', 'Overlay', 'Type to find and run a command without leaving the page. Use it for in-app search, a marketing header, or a system jump with a keyboard shortcut.'),
      c('confirm-dialog', 'Confirm Dialog', 'Overlay', 'Ask once before a change that is hard to undo. Use it for delete, publish, leave without saving, or archive.'),
      c('avatar-editor', 'Avatar Editor', 'Overlay', 'A full screen crop sheet for a profile photo. The person moves, zooms, and rotates, then saves a circular jpeg.'),
      c('glass-surface', 'Glass Surface', 'Overlay', 'The one blur, tint, border, and shadow recipe every chrome surface inherits. Four weight classes: menu bar, panel, modal, tooltip.'),
      c('traffic-lights', 'Traffic Lights', 'Overlay', 'The three-dot close, minimize, and maximize cluster in a window’s title bar. Glyphs show on hover; all dots mute when the window is unfocused.'),
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      c('anchor', 'Anchor', 'Navigation', 'A text link to another screen or to the open web. Use it when the person is going somewhere. Use a Button when they are doing something. Arrow is the circular chevron for View all, previous, and next.'),
      c('tabs', 'Tabs', 'Navigation', 'Switch between peer views of the same page, such as All and Live. Use Icon Tab when the items are destinations in the app, not filters of one list.'),
      c('icon-tab', 'Icon Tab', 'Navigation', 'The compact bar of destinations at the bottom of an app, with an icon and a short label. Use it for Home, Inbox, and Profile.'),
      c('breadcrumb', 'Breadcrumb', 'Navigation', 'The path from the root to this page so the person can step back. The last crumb is the current page and is not a link.'),
      c('pagination', 'Pagination', 'Navigation', 'Move through a long list one page at a time. Extra page numbers collapse so the control stays short.'),
      c('sheet-nav', 'Sheet Nav', 'Navigation', 'The header of a sheet with Cancel and Done. Use it at the top of a modal sheet so the person can dismiss or save.'),
      c('nav-search', 'Nav Search', 'Navigation', 'A compact search field for a top bar. Use it as the trigger for Command Palette, with a shortcut hint such as ⌘K.'),
      c('profile-button', 'Profile Button', 'Navigation', 'The account control in a header. Press it to open the account menu. Use a face in a toolbar, or add the name and email on a settings row.'),
    ],
  },
  {
    id: 'dock',
    label: 'Dock',
    items: [
      c('dock', 'Dock Shell', 'Dock', 'The floating glass bar of app icons at the bottom of the screen. Use it for the apps that are always one press away.'),
      c('dock-icon', 'Dock Icon', 'Dock', 'A single app icon tile inside the Dock. The whole 56×56 tile is the click target. Artwork is pre-masked to the squircle.'),
      c('dock-magnification', 'Magnification Engine', 'Dock', 'The cursor-proximity physics that grow Dock icons as the pointer approaches. Every other Dock component sizes from this.'),
      c('dock-indicator', 'Running Indicator', 'Dock', 'The small brand-blue dot beneath a Dock Icon showing the app has an open window. A slightly larger dot means more than one window.'),
      c('dock-launch-bounce', 'Launch Bounce', 'Dock', 'The bounce a Dock Icon plays when clicked to launch. One leap per click, then the Running Indicator fades in as it lands.'),
      c('dock-divider', 'Dock Divider', 'Dock', 'The thin vertical line separating pinned apps from minimized windows and the Trash. It never magnifies.'),
      c('dock-minimized-window', 'Minimized Window Tile', 'Dock', 'A live snapshot of a minimized window in the Dock’s right section. Click to pour it back out with the genie effect.'),
      c('dock-trash', 'Trash Well', 'Dock', 'The Trash icon at the far right of the Dock. Outline when empty, crumpled paper when it has items, and a red glow when a file is dragged over it.'),
      c('dock-tooltip', 'Icon Tooltip', 'Dock', 'The name label above a Dock Icon on hover. Appears after a short delay, tracks the icon’s live magnified position, one at a time.'),
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    items: [
      c('badge', 'Badge', 'Data Display', 'A short status, count, or category on a row or a heading. Use it for New, Live, a review, or a notification number. Do not put a sentence in a badge.'),
      c('avatar', 'Avatar', 'Data Display', 'The face of a person in the interface. A photo when you have one, otherwise initials from the name. Stack faces in a group when several people share a row.'),
      c('avatar-picker', 'Avatar Picker', 'Data Display', 'Choose a profile photo from the device. An empty face is Add photo. A saved photo is Edit photo and should open the crop sheet.'),
      c('card', 'Card', 'Data Display', 'A quiet surface for a title, supporting copy, and optional media or actions. Use it for a project, a feature, or a destination.'),
      c('card-grid', 'Card Grid', 'Data Display', 'A responsive set of cards. Choose equal or unequal height, equal or mixed width, and two to four columns.'),
      c('stat-card', 'Stat Card', 'Data Display', 'A headline number on a dashboard, with an optional change, unit, icon, and trend. Use one card per metric.'),
      c('table', 'Table', 'Data Display', 'A structured list of records with headers, sort, selection, and optional editing in a cell. Use it when each row is the same kind of item.'),
      c('page-header', 'Page Header', 'Data Display', 'The title of a view, with optional supporting copy and page actions. Use it at the top of a list, a settings screen, or a detail page.'),
      c('list-row', 'List Row', 'Data Display', 'A tappable row inside a grouped list, with a title, optional meta, and a trailing control. Use it for people, files, or mail.'),
      c('settings-row', 'Settings Row', 'Data Display', 'A preference row with a label and a trailing control such as a switch. Use it in grouped settings, not as a form field.'),
      c('key-value-row', 'Key Value Row', 'Data Display', 'A field name on the left and its current value on the right. Use it for account details. Make a value copyable when the person needs to take it with them.'),
      c('divider', 'Divider', 'Data Display', 'A quiet line between sections. Add a label when two groups need a word in the middle, such as or continue with.'),
      c('stack', 'Stack', 'Data Display', 'A row or column of items with even space between them. Use it to group cards, actions, or fields.'),
      c('usage', 'Usage', 'Data Display', 'A how-to block: a short paragraph, three principles, then do and don’t. Use it to explain a feature or a flow.'),
      c('token-group', 'Token Group', 'Data Display', 'A labeled family of samples with an optional note. Use it for a color set, a spacing scale, or a radius set.'),
      c('state-card', 'State Card', 'Data Display', 'A labeled tile that shows one control state on a quiet surface. Use it to sample a button, a field, or a row.'),
      c('state-grid', 'State Grid', 'Data Display', 'A responsive set of state cards. Use three columns for fields, six for compact controls.'),
      c('state-group', 'State Group', 'Data Display', 'A caption plus a grid of state cards for one axis, such as appearance, size, or tone.'),
      c('swatch', 'Swatch', 'Data Display', 'A color chip that shows the token fill and its CSS variable name. Use it for a palette sample.'),
      c('swatch-grid', 'Swatch Grid', 'Data Display', 'A four column grid of color swatches for a token family. Use it inside Token Group.'),
      c('contrast-card', 'Contrast Card', 'Data Display', 'A reading pair of foreground and background tokens, shown at body size.'),
      c('radius-card', 'Radius Card', 'Data Display', 'A sample corner next to its name, pixel value, and intended use.'),
      c('scale-row', 'Scale Row', 'Data Display', 'A bar for a content width relative to a max, or a spacing step at its true pixel size.'),
      c('related', 'Related', 'Data Display', 'A three column grid of sibling links. Use it at the end of a page for nearby components.'),
      c('rule-card', 'Rule Card', 'Data Display', 'A do or don’t list with a success or danger tone. Use it inside Usage, or on its own.'),
      c('inline-code', 'Inline Code', 'Data Display', 'A highlighted token, prop, or import path inside a sentence.'),
      c('file-tile', 'File Tile', 'Data Display', 'An icon plus label unit for a file manager’s icon grid. Selection highlights only the label pill; renaming swaps in an inline field.'),
      c('thumbnail-tile', 'Thumbnail Tile', 'Data Display', 'An image, video, or doc preview with a skeleton loading state and an overlay badge slot.'),
    ],
  },
  {
    id: 'auth',
    label: 'Auth',
    items: [
      c('auth-nav', 'Auth Nav', 'Auth', 'The bar on sign-in and related flows. Logo, theme toggle, and a trailing Anchor.'),
      c('social-login', 'Social Login Button', 'Auth', 'Continue with Roboticela, Passkey, Google, Apple, GitHub, and more.'),
      c('verification-method', 'Verification Method', 'Auth', 'A selectable 2FA method card.'),
      c('totp-manual-key', 'TOTP Manual Key', 'Auth', 'A copyable authenticator secret.'),
      c('qr-code', 'QR Code', 'Auth', 'A scannable QR for URLs, TOTP, Wi‑Fi, and more.'),
    ],
  },
  {
    id: 'documentation',
    label: 'Documentation',
    items: [
      c('docs-snippet', 'Snippet', 'Documentation', 'A monospace code sample on a secondary surface.', true),
    ],
  },
]

export const DOCS_ITEMS: DocsNavItem[] = DOCS_NAV.flatMap((section) => section.items)

export const FOUNDATION_IDS = new Set(['colors', 'typography', 'spacing', 'radius', 'layout', 'icons', 'shadows', 'glass', 'motion', 'z-index'])

export const PREVIEW_EXCLUDED_IDS = new Set([...FOUNDATION_IDS, 'country-flag'])

export const DOCS_PRIMITIVE_IDS = new Set([
  'docs-snippet',
])

export const COMPONENT_ALIASES: Record<string, string> = {
  toggle: 'switch',
  'theme-switch': 'theme-toggle',
  subheading: 'subhead',
  content: 'body',
  paragraph: 'body',
  prose: 'body',
  'docs-prose': 'body',
  'theme-icon': 'theme-icon-toggle',
  password: 'password-field',
  'search-select': 'select',
  spotlight: 'command-palette',
  cmdk: 'command-palette',
  'cmd-k': 'command-palette',
  'search-palette': 'command-palette',
  'province-select': 'state-select',
  'region-select': 'state-select',
  'emirate-select': 'state-select',
  link: 'anchor',
  'text-link': 'anchor',
  'text-anchor': 'anchor',
  'district-select': 'county-select',
  'range-slider': 'slider',
  stepper: 'number-field',
  'number-input': 'number-field',
  'value-selector': 'number-field',
  quantity: 'number-field',
  'auth-layout': 'auth-nav',
  'docs-card': 'card',
  'docs-card-grid': 'card-grid',
  'docs-stack': 'stack',
  'docs-usage': 'usage',
  'docs-token-group': 'token-group',
  'docs-state-card': 'state-card',
  'docs-state-grid': 'state-grid',
  'docs-state-group': 'state-group',
  'docs-swatch': 'swatch',
  'docs-swatch-grid': 'swatch-grid',
  'docs-contrast-card': 'contrast-card',
  'docs-radius-card': 'radius-card',
  'docs-scale-row': 'scale-row',
  'docs-measure-row': 'scale-row',
  'measure-row': 'scale-row',
  'docs-table': 'table',
  'docs-keys': 'table',
  keys: 'table',
  'docs-related': 'related',
  'docs-principle-card': 'card',
  'principle-card': 'card',
  'docs-principles': 'card-grid',
  principles: 'card-grid',
  'docs-rule-card': 'rule-card',
  'docs-do-dont': 'rule-card',
  'do-dont': 'rule-card',
  'docs-inline-code': 'inline-code',
  'a11y-section': 'alert',
  a11y: 'alert',
  'accessibility-section': 'alert',
}

export const SEARCH_GROUP_ORDER: DocsSearchGroup[] = [
  'Buttons',
  'Forms',
  'Feedback',
  'Navigation',
  'Dock',
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
  const catalog = [...DOCS_ITEMS, ...PAGES_ITEMS, ...SECTIONS_ITEMS]
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

export const CURSORS_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'packs', label: 'Cursor Packs' },
  { id: 'formats', label: 'Formats (SVG & .rcur)' },
  { id: 'states-table', label: 'State ID Registry' },
]

export const CURSOR_PACK_TOC: DocsTocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'playground', label: 'Testing Playground' },
  { id: 'library', label: 'Cursor Library' },
  { id: 'import-code', label: 'Import & Usage' },
  { id: 'robocursor-format', label: 'RoboCursor (.rcur) Spec' },
  { id: 'states-table', label: 'State ID Enum' },
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
  'alert',
  'progress',
  'skeleton',
  'empty-state',
  'empty-popup',
  'loading-screen',
  'loader',
  'score-ring',
  'modal',
  'command-palette',
  'confirm-dialog',
  'avatar-editor',
  'tabs',
  'icon-tab',
  'breadcrumb',
  'pagination',
  'sheet-nav',
  'auth-nav',
  'nav-search',
  'profile-button',
  'badge',
  'avatar',
  'avatar-picker',
  'card',
  'card-grid',
  'stat-card',
  'table',
  'page-header',
  'list-row',
  'settings-row',
  'key-value-row',
  'divider',
  'stack',
  'usage',
  'token-group',
  'state-card',
  'state-grid',
  'state-group',
  'swatch',
  'swatch-grid',
  'contrast-card',
  'radius-card',
  'scale-row',
  'related',
  'rule-card',
  'inline-code',
  'segmented-control',
  'confirm-action',
  'brand-logo',
  'theme-toggle',
  'theme-icon-toggle',
  ...DOCS_PRIMITIVE_IDS,
])
