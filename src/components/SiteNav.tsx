'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { CategoryIcon } from './CategoryIcon'
import { ThemeToggle } from './ThemeToggle'
import { CATALOG_SECTIONS, getNavItems, type CatalogSection } from '@/lib/landing-catalog'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import { landingEase } from '@/lib/landing'
import { mergeContent } from '@/lib/merge-content'

export type NavbarFlyoutLink = { to: string; label: string }
export type NavbarFlyoutGroup = { label: string; links: NavbarFlyoutLink[] }

export type NavbarSectionContent = {
  brandName: string
  brandHref: string
  createAccountLabel: string
  createAccountHref: string
  signInLabel: string
  signInHref: string
  searchHref: string
  searchPlaceholder: string
  goToSearchLabel: string
  bagHref: string
  bagEmpty: string
  goToBagLabel: string
  searchLabel: string
  bagLabel: string
  resultsLabel: string
  noMatches: string
  searchAriaLabel: string
  bagAriaLabel: string
  menuOpenLabel: string
  menuCloseLabel: string
  closeLabel: string
  flyoutSides: Record<string, NavbarFlyoutGroup[]>
}

export const NAVBAR_SECTION_CONTENT: NavbarSectionContent = {
  brandName: brand.name,
  brandHref: '/',
  createAccountLabel: 'Create Account',
  createAccountHref: '/create-account',
  signInLabel: 'Sign in',
  signInHref: '/signin',
  searchHref: '/search',
  searchPlaceholder: `Search ${brand.name}`,
  goToSearchLabel: 'Go to Search',
  bagHref: '/bag',
  bagEmpty: 'Your bag is empty.',
  goToBagLabel: 'Go to Bag',
  searchLabel: 'Search',
  bagLabel: 'Bag',
  resultsLabel: 'Results',
  noMatches: 'No matches',
  searchAriaLabel: 'Search',
  bagAriaLabel: 'Shopping bag',
  menuOpenLabel: 'Open menu',
  menuCloseLabel: 'Close menu',
  closeLabel: 'Close',
  flyoutSides: {
    products: [
      {
        label: 'Quick Links',
        links: [
          { to: '/products', label: 'Shop Products' },
          { to: '/support', label: 'Product Support' },
        ],
      },
      {
        label: 'More from Products',
        links: [
          { to: '/products/cloud', label: 'Cloud' },
          { to: '/products/audio', label: 'Audio' },
        ],
      },
    ],
    services: [
      {
        label: 'Quick Links',
        links: [
          { to: '/signin', label: 'Manage Account' },
          { to: '/support', label: 'Services Support' },
        ],
      },
      {
        label: 'More from Services',
        links: [
          { to: '/create-account', label: 'Create Account' },
          { to: '/signin', label: 'Family Sharing' },
        ],
      },
    ],
    reels: [
      {
        label: 'Quick Links',
        links: [
          { to: '/reels', label: 'Watch Reels' },
          { to: '/support', label: 'Reels Support' },
        ],
      },
      {
        label: 'More from Reels',
        links: [
          { to: '/products', label: 'Shop Products' },
          { to: '/services', label: 'Explore Services' },
        ],
      },
    ],
    support: [
      {
        label: 'Quick Links',
        links: [
          { to: '/support/help', label: 'Get Support' },
          { to: '/support/account', label: 'Community' },
        ],
      },
      {
        label: 'Helpful Topics',
        links: [
          { to: '/support/security', label: 'Accessibility' },
          { to: '/support', label: 'System Status' },
        ],
      },
    ],
    search: [
      {
        label: 'Quick Links',
        links: [
          { to: '/search', label: 'Go to Search' },
          { to: '/products', label: 'Products' },
          { to: '/services', label: 'Services' },
          { to: '/reels', label: 'Reels' },
          { to: '/support', label: 'Support' },
        ],
      },
      {
        label: 'More',
        links: [
          { to: '/create-account', label: 'Create Account' },
          { to: '/signin', label: 'Sign in' },
        ],
      },
    ],
    cart: [
      {
        label: 'Quick Links',
        links: [
          { to: '/bag', label: 'Go to Bag' },
          { to: '/signin', label: 'Sign in' },
          { to: '/create-account', label: 'Create Account' },
        ],
      },
      {
        label: 'More',
        links: [
          { to: '/products', label: 'Shop Products' },
          { to: '/support', label: 'Order Status' },
        ],
      },
    ],
  },
}

type Panel = 'none' | 'search' | 'cart' | 'menu'
type Overlay =
  | { mode: 'flyout'; kind: string }
  | { mode: 'search' }
  | { mode: 'cart' }

const ICON = {
  size: 18,
  strokeWidth: 1.6,
  absoluteStrokeWidth: true,
} as const

const NAV_MOVE_MS = 400
const NAV_MUTED = 'text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)]'
const NAV_FOCUS = cn(
  'focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue',
)
const NAV_COLOR_TRANSITION = cn(
  'transition-colors duration-300',
  landingEase,
  'motion-reduce:transition-none',
)
const COL1_LI_DELAY = ['delay-[90ms]', 'delay-[130ms]', 'delay-[170ms]'] as const
const COL2_LI_DELAY = ['delay-[260ms]', 'delay-[300ms]'] as const
const COL3_LI_DELAY = ['delay-[320ms]', 'delay-[360ms]'] as const
const COL_LABEL_DELAY = ['delay-[40ms]', 'delay-[220ms]', 'delay-[280ms]'] as const
const MENU_LI_DELAY = ['delay-[40ms]', 'delay-[80ms]', 'delay-[120ms]'] as const
const SUB_LI_DELAY = [
  'delay-[40ms]',
  'delay-[80ms]',
  'delay-[120ms]',
  'delay-[160ms]',
  'delay-[200ms]',
  'delay-[240ms]',
] as const

const nav = {
  root: 'sticky top-0 z-[var(--z-navigation,200)] font-sans antialiased',
  bar: cn(
    'relative z-[3] h-11 overflow-visible transition-colors duration-[400ms]',
    landingEase,
    'motion-reduce:transition-none',
  ),
  barRest:
    'bg-[color-mix(in_srgb,var(--bg-primary)_72%,transparent)] backdrop-blur-[20px] backdrop-saturate-[180%]',
  barOpen: 'bg-bg-elevated backdrop-blur-none dark:bg-bg-primary',
  inner: cn(
    'mx-auto flex h-11 w-full max-w-[1024px] items-center justify-between px-2',
    'max-[1068px]:grid max-[1068px]:grid-cols-[1fr_auto_1fr] max-[1068px]:gap-2',
    'min-[1069px]:px-0',
  ),
  list: cn(
    'm-0 flex h-11 w-full list-none items-center justify-between gap-8 p-0',
    'max-[1068px]:w-auto max-[1068px]:justify-center max-[1068px]:gap-0',
  ),
  item: 'flex h-11 shrink-0 items-center',
  itemBrand: 'max-[1068px]:w-full max-[1068px]:justify-center',
  itemDesktop: 'max-[1068px]:hidden',
  brand: cn(
    'inline-flex h-11 items-center gap-2 leading-[0] text-text-primary no-underline',
    NAV_FOCUS,
  ),
  title: 'whitespace-nowrap text-xs font-semibold leading-none tracking-[-0.01em]',
  link: cn(
    'inline-flex h-11 items-center whitespace-nowrap text-xs font-normal leading-none no-underline',
    NAV_COLOR_TRANSITION,
    NAV_FOCUS,
    'hover:text-blue hover:visited:text-blue',
  ),
  linkRest: cn(NAV_MUTED, 'visited:text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)]'),
  linkActive: 'text-text-primary visited:text-text-primary',
  icon: cn(
    'm-0 inline-flex h-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0 no-underline',
    NAV_COLOR_TRANSITION,
    NAV_FOCUS,
    'hover:text-blue hover:visited:text-blue',
  ),
  iconBar: 'w-11',
  iconSm: 'w-8',
  iconRest: cn(NAV_MUTED, 'visited:text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)]'),
  iconActive: 'text-text-primary visited:text-text-primary',
  menuBtn: cn(
    'm-0 hidden h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0 no-underline',
    NAV_COLOR_TRANSITION,
    NAV_FOCUS,
    NAV_MUTED,
    'hover:text-blue hover:visited:text-blue',
    'max-[1068px]:flex max-[1068px]:justify-self-start',
  ),
  mobileActions: 'hidden items-center max-[1068px]:flex max-[1068px]:justify-self-end',
  scrim: cn(
    'fixed inset-x-0 top-11 bottom-0 z-[1] m-0 cursor-pointer border-0 bg-bg-overlay p-0',
    'transition-opacity duration-[400ms]',
    landingEase,
    'motion-reduce:transition-none',
  ),
  curtain: cn(
    'absolute top-11 inset-x-0 z-[2] grid',
    'transition-[grid-template-rows] duration-[400ms]',
    landingEase,
    'motion-reduce:transition-none',
  ),
  curtainClip: 'min-h-0 overflow-hidden bg-bg-elevated text-text-primary dark:bg-bg-primary',
  curtainBody: 'min-h-0',
  flyoutInner: cn(
    'mx-auto w-full max-w-[1024px] px-[22px] pt-10',
    'min-[735px]:px-10 min-[1069px]:px-0',
  ),
  flyoutInnerDefault: 'pb-20',
  flyoutInnerPanel: cn(
    'max-h-[calc(100dvh-44px)] pb-10',
    'max-[1068px]:overflow-x-hidden max-[1068px]:pt-6 max-[1068px]:pb-8',
  ),
  flyoutGrid: 'flex items-start',
  flyoutCol: 'min-w-[200px] pr-20',
  flyoutColLead: cn(
    'flex min-h-0 min-w-[280px] max-h-[calc(100dvh-44px-80px)] flex-col pr-20',
  ),
  flyoutColPanel: cn(
    'max-[1068px]:min-w-0 max-[1068px]:max-h-[calc(100dvh-44px-56px)] max-[1068px]:flex-1 max-[1068px]:basis-0 max-[1068px]:pr-6',
  ),
  flyoutLabel: 'm-0 mb-2 text-xs font-normal leading-[1.33337] tracking-[-0.01em] text-gray-600',
  flyoutLabelSticky:
    'sticky top-0 z-[1] mb-2 bg-bg-elevated pb-1 dark:bg-bg-primary',
  flyoutList: 'm-0 list-none p-0',
  flyoutIcon: 'inline-flex size-6 shrink-0 items-center justify-center text-inherit',
  flyoutIconPanel: 'max-[1068px]:size-5',
  flyoutText: cn(
    'm-0 py-1 text-2xl font-semibold leading-[1.16667] tracking-[0.009em] text-text-primary',
    'max-[1068px]:text-[17px] max-[1068px]:leading-[1.29] max-[1068px]:tracking-normal',
  ),
  flyoutEmpty:
    'm-0 py-[5px] text-xs font-normal leading-[1.33337] tracking-[-0.01em] text-gray-600',
  search: cn(
    'flex items-center gap-3 py-1 text-text-primary',
    'max-[1068px]:gap-2',
  ),
  searchInput: cn(
    'm-0 h-auto min-w-0 w-full flex-1 rounded-none border-0 bg-transparent p-0 font-sans font-semibold text-text-primary outline-none',
    'text-2xl leading-[1.16667] tracking-[0.009em]',
    'placeholder:text-gray-500',
    'max-[1068px]:text-[17px] max-[1068px]:leading-[1.29] max-[1068px]:tracking-normal',
    '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none',
  ),
  searchHits: 'mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain',
  panelGo: cn(
    'mt-4 hidden h-9 items-center justify-center rounded-[980px] border border-gray-300 bg-transparent px-4',
    'text-sm font-medium leading-none text-blue no-underline',
    'transition-[background-color,border-color,color] duration-150',
    landingEase,
    'motion-reduce:transition-none',
    'max-[1068px]:inline-flex',
    'dark:border-border-strong',
  ),
  menu: cn(
    'fixed top-11 right-0 bottom-0 left-0 z-[2] overflow-auto bg-bg-elevated text-text-primary dark:bg-bg-primary',
    'transition-[opacity,transform,visibility] duration-[400ms] [transition-duration:400ms,400ms,0s]',
    landingEase,
    'motion-reduce:translate-x-0 motion-reduce:transition-none',
  ),
  menuList: 'm-0 list-none px-[22px] pt-6 pb-4 min-[735px]:px-10',
  menuRow: 'flex items-center gap-1',
  menuRowLink: cn(
    'flex min-h-12 min-w-0 flex-1 items-center text-[28px] font-semibold leading-[1.14] tracking-[-0.005em] text-text-primary no-underline',
    NAV_COLOR_TRANSITION,
    'visited:text-text-primary hover:text-blue hover:visited:text-blue',
    'max-[734px]:text-[21px]',
  ),
  menuChevron: cn(
    'm-0 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-text-primary',
    'transition-transform duration-300',
    landingEase,
    'motion-reduce:transition-none',
  ),
  menuSubClip: cn(
    'grid transition-[grid-template-rows] duration-300',
    landingEase,
    'motion-reduce:transition-none',
  ),
  menuSub: 'flex min-h-0 items-start overflow-hidden',
  menuCatsCol: 'min-w-0 flex-1 basis-0 pr-6',
  menuCats: 'm-0 list-none p-0',
  menuCatsLink: cn(
    'flex min-h-10 items-center gap-2.5 pl-4 text-sm font-normal leading-[1.33337] tracking-[-0.01em] text-text-primary no-underline',
    NAV_COLOR_TRANSITION,
    'visited:text-text-primary hover:text-blue hover:visited:text-blue',
  ),
  menuIcon: 'inline-flex size-4 shrink-0 items-center justify-center text-inherit',
  menuExtraLabel: 'm-0 mb-1 text-xs font-normal leading-[1.33337] tracking-[-0.01em] text-gray-600',
  menuExtraLink: cn(
    'flex min-h-8 items-center pl-0 text-xs font-normal leading-[1.33337] tracking-[-0.01em] text-text-primary no-underline',
    NAV_COLOR_TRANSITION,
    'visited:text-text-primary hover:text-blue hover:visited:text-blue',
  ),
  menuAccount: 'flex flex-col gap-1 px-[22px] pt-2 pb-12 min-[735px]:px-10',
  menuAccountLink: cn(
    'flex h-11 items-center text-[17px] font-normal leading-none text-text-primary no-underline',
    NAV_COLOR_TRANSITION,
    'visited:text-text-primary hover:text-blue hover:visited:text-blue',
  ),
  menuTheme: 'px-3 pt-4 pb-2 min-[735px]:px-7',
}

const QUICK_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/reels', label: 'Reels' },
  { to: '/support', label: 'Support' },
  ...CATALOG_SECTIONS.flatMap((section) => [
    ...section.items.map((item) => ({
      to: `${section.to}/${item.slug}`,
      label: item.label,
    })),
    ...section.items.flatMap((item) =>
      (item.products ?? []).map((product) => ({
        to: `${section.to}/${item.slug}/${product.slug}`,
        label: product.name,
      })),
    ),
  ]),
  { to: '/create-account', label: 'Create Account' },
  { to: '/signin', label: 'Sign in' },
]

function navEnter(active: boolean, delay?: string) {
  return active ? cn('animate-nav-enter motion-reduce:animate-none', delay) : undefined
}

function colLiDelay(colIndex: number, itemIndex: number) {
  if (colIndex === 0) return COL1_LI_DELAY[itemIndex]
  if (colIndex === 1) return COL2_LI_DELAY[itemIndex]
  if (colIndex === 2) return COL3_LI_DELAY[itemIndex]
  return undefined
}

function flyoutLinkClass(quiet?: boolean, panel?: boolean) {
  return cn(
    'flex items-center gap-3 whitespace-nowrap text-text-primary no-underline',
    NAV_COLOR_TRANSITION,
    'visited:text-text-primary hover:text-blue hover:visited:text-blue',
    quiet
      ? 'py-[5px] text-xs font-normal leading-[1.33337] tracking-[-0.01em]'
      : 'py-1 text-2xl font-semibold leading-[1.16667] tracking-[0.009em]',
    panel && 'max-[1068px]:whitespace-normal',
  )
}

function flyoutSubClass(index: number, total: number, panel: boolean) {
  const last = index === total - 1
  const first = index === 0
  return cn(
    'min-w-40',
    first
      ? cn(
          'border-l border-l-gray-300 pl-10 dark:border-l-[rgba(255,255,255,0.12)]',
          last ? 'pr-0' : 'pr-10',
        )
      : cn('border-l-0 pl-0', last ? 'pr-0' : 'pr-10'),
    panel &&
      cn(
        'max-[1068px]:min-w-0 max-[1068px]:max-h-[calc(100dvh-44px-56px)] max-[1068px]:flex-[0_1_28%] max-[1068px]:pr-0 max-[1068px]:pl-6',
        'max-[734px]:flex-[0_1_42%]',
        !first && 'max-[734px]:hidden',
      ),
  )
}

function menuExtraClass(index: number) {
  return cn(
    'min-w-0 flex-[0_1_28%] py-0 pr-0 pl-6 max-[734px]:flex-[0_1_42%]',
    index === 0
      ? 'border-l border-l-gray-300 dark:border-l-[rgba(255,255,255,0.12)]'
      : 'border-l-0 max-[734px]:hidden',
  )
}

export function SiteNav({
  content,
}: {
  content?: Partial<NavbarSectionContent>
} = {}) {
  const copy = mergeContent(NAVBAR_SECTION_CONTENT, content)
  const pathname = usePathname()
  const router = useRouter()
  const [panel, setPanel] = useState<Panel>('none')
  const [flyout, setFlyout] = useState<string | null>(null)
  const [menuSection, setMenuSection] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [renderedOverlay, setRenderedOverlay] = useState<Overlay | null>(null)
  const closeTimer = useRef<number | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const searchId = useId()

  const searchOpen = panel === 'search'
  const cartOpen = panel === 'cart'
  const menuOpen = panel === 'menu'
  const overlay: Overlay | null = flyout
    ? { mode: 'flyout', kind: flyout }
    : searchOpen
      ? { mode: 'search' }
      : cartOpen
        ? { mode: 'cart' }
        : null
  const overlayOpen = overlay !== null
  const shownOverlay = overlay ?? renderedOverlay
  const navOpen = overlayOpen || menuOpen

  useEffect(() => {
    setPanel('none')
    setFlyout(null)
    setMenuSection(null)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    if (flyout) {
      setRenderedOverlay({ mode: 'flyout', kind: flyout })
      return
    }
    if (searchOpen) {
      setRenderedOverlay({ mode: 'search' })
      return
    }
    if (cartOpen) {
      setRenderedOverlay({ mode: 'cart' })
      return
    }
    const timer = window.setTimeout(() => setRenderedOverlay(null), NAV_MOVE_MS)
    return () => window.clearTimeout(timer)
  }, [flyout, searchOpen, cartOpen])

  useEffect(() => {
    if (!navOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanel('none')
        setFlyout(null)
        setQuery('')
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    if (panel === 'menu') {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [navOpen, panel])

  useEffect(() => {
    if (!searchOpen) return
    const frame = requestAnimationFrame(() => searchRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [searchOpen])

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    }
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const quickLinks = normalizedQuery
    ? QUICK_LINKS.filter((item) => item.label.toLowerCase().includes(normalizedQuery))
    : QUICK_LINKS.filter((item) =>
        ['Products', 'Services', 'Reels', 'Support', 'Create Account', 'Sign in'].includes(item.label),
      )

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openFlyout(id: string) {
    clearCloseTimer()
    setPanel('none')
    setFlyout(id)
  }

  function openSearch() {
    clearCloseTimer()
    setFlyout(null)
    setPanel('search')
  }

  function openCart() {
    clearCloseTimer()
    setFlyout(null)
    setQuery('')
    setPanel('cart')
  }

  function scheduleCloseOverlay() {
    clearCloseTimer()
    closeTimer.current = window.setTimeout(() => {
      setFlyout(null)
      setPanel((current) => (current === 'search' || current === 'cart' ? 'none' : current))
      setQuery('')
    }, 120)
  }

  function onOverlayItemBlur(event: { currentTarget: HTMLElement; relatedTarget: EventTarget | null }) {
    const next = event.relatedTarget as Node | null
    if (event.currentTarget.contains(next)) return
    if (next && document.getElementById('site-nav-overlay')?.contains(next)) return
    scheduleCloseOverlay()
  }

  function togglePanel(next: Panel) {
    setFlyout(null)
    setPanel((current) => (current === next ? 'none' : next))
    if (next !== 'search') setQuery('')
  }

  function closePanel() {
    setPanel('none')
    setFlyout(null)
    setMenuSection(null)
    setQuery('')
  }

  function goTo(to: string) {
    closePanel()
    router.push(to)
  }

  function canHoverNavigate() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }

  function onSearchClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!canHoverNavigate()) {
      event.preventDefault()
      openSearch()
      return
    }
    closePanel()
  }

  function onCartClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!canHoverNavigate()) {
      event.preventDefault()
      openCart()
      return
    }
    closePanel()
  }

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault()
    const first = quickLinks[0]
    if (!first) return
    goTo(first.to)
  }

  const flyoutSection =
    shownOverlay?.mode === 'flyout'
      ? CATALOG_SECTIONS.find((section) => section.kind === shownOverlay.kind)
      : undefined

  return (
    <nav className={nav.root} aria-label="Global">
      <div className={cn(nav.bar, navOpen ? nav.barOpen : nav.barRest)}>
        <div className={nav.inner}>
          <button
            type="button"
            className={nav.menuBtn}
            aria-label={menuOpen ? copy.menuCloseLabel : copy.menuOpenLabel}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            onClick={() => togglePanel('menu')}
          >
            {menuOpen ? <X {...ICON} aria-hidden="true" /> : <Menu {...ICON} aria-hidden="true" />}
          </button>

          <ul className={nav.list}>
            <li className={cn(nav.item, nav.itemBrand)}>
              <Link className={nav.brand} href={copy.brandHref} aria-label={copy.brandName} onClick={closePanel}>
                <BrandLogo variant="icon" size={20} alt="" />
                <span className={nav.title}>{copy.brandName}</span>
              </Link>
            </li>

            {CATALOG_SECTIONS.map((section) => (
              <FlyoutItem
                key={section.kind}
                section={section}
                open={flyout === section.kind}
                pathname={pathname}
                onOpen={() => openFlyout(section.kind)}
                onClose={scheduleCloseOverlay}
                onNavigate={closePanel}
              />
            ))}

            <li className={cn(nav.item, nav.itemDesktop)}>
              <Link
                className={cn(nav.link, nav.linkRest)}
                href={copy.createAccountHref}
                onMouseEnter={scheduleCloseOverlay}
              >
                {copy.createAccountLabel}
              </Link>
            </li>

            <li className={cn(nav.item, nav.itemDesktop)}>
              <Link className={cn(nav.link, nav.linkRest)} href={copy.signInHref} onMouseEnter={scheduleCloseOverlay}>
                {copy.signInLabel}
              </Link>
            </li>

            <li className={cn(nav.item, nav.itemDesktop)} onMouseEnter={scheduleCloseOverlay}>
              <ThemeToggle compact />
            </li>

            <li
              className={cn(nav.item, nav.itemDesktop)}
              onMouseEnter={openSearch}
              onMouseLeave={scheduleCloseOverlay}
              onFocusCapture={openSearch}
              onBlurCapture={onOverlayItemBlur}
            >
              <Link
                className={cn(
                  nav.icon,
                  nav.iconSm,
                  searchOpen || pathname === copy.searchHref ? nav.iconActive : nav.iconRest,
                )}
                href={copy.searchHref}
                aria-label={copy.searchAriaLabel}
                aria-expanded={searchOpen}
                aria-haspopup="true"
                aria-controls="site-nav-overlay"
                onClick={onSearchClick}
              >
                <Search {...ICON} aria-hidden="true" />
              </Link>
            </li>

            <li
              className={cn(nav.item, nav.itemDesktop)}
              onMouseEnter={openCart}
              onMouseLeave={scheduleCloseOverlay}
              onFocusCapture={openCart}
              onBlurCapture={onOverlayItemBlur}
            >
              <Link
                className={cn(
                  nav.icon,
                  nav.iconSm,
                  cartOpen || pathname === copy.bagHref ? nav.iconActive : nav.iconRest,
                )}
                href={copy.bagHref}
                aria-label={copy.bagAriaLabel}
                aria-expanded={cartOpen}
                aria-haspopup="true"
                aria-controls="site-nav-overlay"
                onClick={onCartClick}
              >
                <ShoppingBag {...ICON} aria-hidden="true" />
              </Link>
            </li>
          </ul>

          <div className={nav.mobileActions}>
            <button
              type="button"
              className={cn(nav.icon, nav.iconBar, searchOpen ? nav.iconActive : nav.iconRest)}
              aria-label={copy.searchAriaLabel}
              aria-expanded={searchOpen}
              onClick={() => togglePanel('search')}
            >
              <Search {...ICON} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={cn(nav.icon, nav.iconBar, cartOpen ? nav.iconActive : nav.iconRest)}
              aria-label={copy.bagAriaLabel}
              aria-expanded={cartOpen}
              onClick={() => togglePanel('cart')}
            >
              <ShoppingBag {...ICON} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={cn(nav.scrim, navOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}
        aria-label={copy.closeLabel}
        tabIndex={navOpen ? 0 : -1}
        onMouseEnter={() => {
          if (flyout || searchOpen || cartOpen) scheduleCloseOverlay()
        }}
        onClick={closePanel}
      />

      <div
        className={cn(
          nav.curtain,
          overlayOpen ? 'pointer-events-auto grid-rows-[1fr]' : 'pointer-events-none grid-rows-[0fr]',
        )}
        id="site-nav-overlay"
        aria-hidden={!overlayOpen}
        inert={overlayOpen ? undefined : true}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={() => {
          if (flyout || searchOpen || cartOpen) scheduleCloseOverlay()
        }}
      >
        <div className={nav.curtainClip}>
          {shownOverlay ? (
            <div
              className={nav.curtainBody}
              key={shownOverlay.mode === 'flyout' ? `flyout-${shownOverlay.kind}` : shownOverlay.mode}
            >
              {shownOverlay.mode === 'flyout' && flyoutSection ? (
                <FlyoutContent
                  section={flyoutSection}
                  pathname={pathname}
                  onNavigate={closePanel}
                  animate={overlayOpen}
                  sides={copy.flyoutSides[flyoutSection.kind] ?? []}
                />
              ) : null}

              {shownOverlay.mode === 'search' ? (
                <div className={cn(nav.flyoutInner, nav.flyoutInnerPanel)}>
                  <div className={nav.flyoutGrid}>
                    <div className={cn(nav.flyoutColLead, nav.flyoutColPanel)}>
                      <p className={cn(nav.flyoutLabel, navEnter(overlayOpen, COL_LABEL_DELAY[0]))}>
                        {copy.searchLabel}
                      </p>
                      <form
                        className={cn(nav.search, navEnter(overlayOpen, COL1_LI_DELAY[0]))}
                        onSubmit={handleSearchSubmit}
                        role="search"
                      >
                        <span className={cn(nav.flyoutIcon, nav.flyoutIconPanel)}>
                          <Search size={20} strokeWidth={1.6} absoluteStrokeWidth aria-hidden="true" />
                        </span>
                        <label className="sr-only" htmlFor={searchId}>
                          {copy.searchLabel} {copy.brandName}
                        </label>
                        <input
                          ref={searchRef}
                          id={searchId}
                          type="search"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder={copy.searchPlaceholder}
                          autoComplete="off"
                          className={nav.searchInput}
                        />
                      </form>
                      <Link className={nav.panelGo} href={copy.searchHref} onClick={closePanel}>
                        {copy.goToSearchLabel}
                      </Link>
                      {normalizedQuery ? (
                        <div className={nav.searchHits}>
                          <p
                            className={cn(
                              nav.flyoutLabel,
                              nav.flyoutLabelSticky,
                              navEnter(overlayOpen, COL_LABEL_DELAY[0]),
                            )}
                          >
                            {copy.resultsLabel}
                          </p>
                          {quickLinks.length ? (
                            <ul className={nav.flyoutList}>
                              {quickLinks.map((item, itemIndex) => (
                                <li
                                  key={`${item.to}-${item.label}`}
                                  className={navEnter(overlayOpen, colLiDelay(0, itemIndex))}
                                >
                                  <Link
                                    className={flyoutLinkClass(true, true)}
                                    href={item.to}
                                    onClick={closePanel}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className={cn(nav.flyoutEmpty, navEnter(overlayOpen))}>{copy.noMatches}</p>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <FlyoutSides
                      groups={copy.flyoutSides.search ?? []}
                      onNavigate={closePanel}
                      animate={overlayOpen}
                      panel
                    />
                  </div>
                </div>
              ) : null}

              {shownOverlay.mode === 'cart' ? (
                <div className={cn(nav.flyoutInner, nav.flyoutInnerPanel)}>
                  <div className={nav.flyoutGrid}>
                    <div className={cn(nav.flyoutCol, nav.flyoutColPanel)}>
                      <p className={cn(nav.flyoutLabel, navEnter(overlayOpen, COL_LABEL_DELAY[0]))}>
                        {copy.bagLabel}
                      </p>
                      <p className={cn(nav.flyoutText, navEnter(overlayOpen, COL1_LI_DELAY[0]))}>
                        {copy.bagEmpty}
                      </p>
                      <Link className={nav.panelGo} href={copy.bagHref} onClick={closePanel}>
                        {copy.goToBagLabel}
                      </Link>
                    </div>
                    <FlyoutSides
                      groups={copy.flyoutSides.cart ?? []}
                      onNavigate={closePanel}
                      animate={overlayOpen}
                      panel
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          nav.menu,
          menuOpen
            ? 'visible pointer-events-auto translate-x-0 opacity-100 [transition-delay:0s]'
            : 'invisible pointer-events-none -translate-x-3 opacity-0 [transition-delay:0s,0s,400ms]',
        )}
        id="site-nav-menu"
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <ul className={nav.menuList}>
          {CATALOG_SECTIONS.map((section, index) => (
            <MenuSection
              key={section.kind}
              section={section}
              expanded={menuSection === section.kind}
              onToggle={() =>
                setMenuSection((current) => (current === section.kind ? null : section.kind))
              }
              onNavigate={closePanel}
              animate={menuOpen}
              enterDelay={MENU_LI_DELAY[index]}
              sides={copy.flyoutSides[section.kind] ?? []}
            />
          ))}
        </ul>

        <div className={cn(nav.menuAccount, navEnter(menuOpen, 'delay-[160ms]'))}>
          <Link className={nav.menuAccountLink} href={copy.searchHref} onClick={closePanel}>
            {copy.searchLabel}
          </Link>
          <Link className={nav.menuAccountLink} href={copy.bagHref} onClick={closePanel}>
            {copy.bagLabel}
          </Link>
          <Link className={nav.menuAccountLink} href={copy.createAccountHref} onClick={closePanel}>
            {copy.createAccountLabel}
          </Link>
          <Link className={nav.menuAccountLink} href={copy.signInHref} onClick={closePanel}>
            {copy.signInLabel}
          </Link>
        </div>

        <div className={cn(nav.menuTheme, navEnter(menuOpen, 'delay-[200ms]'))}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

function FlyoutItem({
  section,
  open,
  pathname,
  onOpen,
  onClose,
  onNavigate,
}: {
  section: CatalogSection
  open: boolean
  pathname: string
  onOpen: () => void
  onClose: () => void
  onNavigate: () => void
}) {
  const active = pathname === section.to || pathname.startsWith(`${section.to}/`)

  return (
    <li
      className={cn(nav.item, nav.itemDesktop)}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocusCapture={onOpen}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null
        if (event.currentTarget.contains(next)) return
        if (next && document.getElementById('site-nav-overlay')?.contains(next)) return
        onClose()
      }}
    >
      <Link
        className={cn(nav.link, active ? nav.linkActive : nav.linkRest)}
        href={section.to}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="site-nav-overlay"
        onClick={onNavigate}
      >
        {section.label}
      </Link>
    </li>
  )
}

function FlyoutSides({
  groups,
  onNavigate,
  animate,
  panel = false,
}: {
  groups: NavbarFlyoutGroup[]
  onNavigate: () => void
  animate: boolean
  panel?: boolean
}) {
  return (
    <>
      {groups.map((group, index) => {
        const colIndex = index + 1
        return (
          <div key={group.label} className={flyoutSubClass(index, groups.length, panel)}>
            <p className={cn(nav.flyoutLabel, navEnter(animate, COL_LABEL_DELAY[colIndex]))}>{group.label}</p>
            <ul className={nav.flyoutList}>
              {group.links.map((item, itemIndex) => (
                <li key={item.label} className={navEnter(animate, colLiDelay(colIndex, itemIndex))}>
                  <Link className={flyoutLinkClass(true, panel)} href={item.to} onClick={onNavigate}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}

function flyoutActive(pathname: string, to: string) {
  if (pathname === to) return true
  if (to.split('/').filter(Boolean).length < 2) return false
  return pathname.startsWith(`${to}/`)
}

function FlyoutContent({
  section,
  pathname,
  onNavigate,
  animate,
  sides,
}: {
  section: CatalogSection
  pathname: string
  onNavigate: () => void
  animate: boolean
  sides: NavbarFlyoutGroup[]
}) {
  const { main, subs } = getNavItems(section)
  if (!main) return null

  const items = [main, ...subs]

  return (
    <div className={cn(nav.flyoutInner, nav.flyoutInnerDefault)}>
      <div className={nav.flyoutGrid}>
        <div className={nav.flyoutCol}>
          <p className={cn(nav.flyoutLabel, navEnter(animate, COL_LABEL_DELAY[0]))}>{section.flyoutLabel}</p>
          <ul className={nav.flyoutList}>
            {items.map((item, itemIndex) => {
              const to = `${section.to}/${item.slug}`
              return (
                <li key={item.slug} className={navEnter(animate, colLiDelay(0, itemIndex))}>
                  <Link
                    className={cn(flyoutLinkClass(false), flyoutActive(pathname, to) && 'text-text-primary')}
                    href={to}
                    onClick={onNavigate}
                  >
                    <span className={nav.flyoutIcon}>
                      <CategoryIcon name={item.icon} size="md" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        {sides.map((group, index) => {
          const colIndex = index + 1
          return (
            <div key={group.label} className={flyoutSubClass(index, sides.length, false)}>
              <p className={cn(nav.flyoutLabel, navEnter(animate, COL_LABEL_DELAY[colIndex]))}>{group.label}</p>
              <ul className={nav.flyoutList}>
                {group.links.map((item, itemIndex) => (
                  <li key={item.label} className={navEnter(animate, colLiDelay(colIndex, itemIndex))}>
                    <Link className={flyoutLinkClass(true)} href={item.to} onClick={onNavigate}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MenuSection({
  section,
  expanded,
  onToggle,
  onNavigate,
  animate,
  enterDelay,
  sides,
}: {
  section: CatalogSection
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
  animate: boolean
  enterDelay?: string
  sides: NavbarFlyoutGroup[]
}) {
  const { main, subs } = getNavItems(section)

  return (
    <li className={navEnter(animate, enterDelay)}>
      <div className={nav.menuRow}>
        <Link className={nav.menuRowLink} href={section.to} onClick={onNavigate}>
          {section.label}
        </Link>
        <button
          type="button"
          className={cn(nav.menuChevron, expanded && 'rotate-180')}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Hide' : 'Show'} ${section.label} categories`}
          onClick={onToggle}
        >
          <ChevronDown size={20} strokeWidth={1.6} absoluteStrokeWidth aria-hidden="true" />
        </button>
      </div>
      <div className={cn(nav.menuSubClip, expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className={cn(nav.menuSub, expanded && 'pb-4')}>
          <div className={nav.menuCatsCol}>
            <p className={nav.menuExtraLabel}>{section.flyoutLabel}</p>
            <ul className={nav.menuCats}>
              {main ? (
                <li className={expanded ? cn('animate-nav-enter duration-[300ms] motion-reduce:animate-none', SUB_LI_DELAY[0]) : undefined}>
                  <Link className={nav.menuCatsLink} href={`${section.to}/${main.slug}`} onClick={onNavigate}>
                    <span className={nav.menuIcon}>
                      <CategoryIcon name={main.icon} size="sm" />
                    </span>
                    {main.label}
                  </Link>
                </li>
              ) : null}
              {subs.map((item, index) => (
                <li
                  key={item.slug}
                  className={
                    expanded
                      ? cn(
                          'animate-nav-enter duration-[300ms] motion-reduce:animate-none',
                          SUB_LI_DELAY[index + (main ? 1 : 0)],
                        )
                      : undefined
                  }
                >
                  <Link className={nav.menuCatsLink} href={`${section.to}/${item.slug}`} onClick={onNavigate}>
                    <span className={nav.menuIcon}>
                      <CategoryIcon name={item.icon} size="sm" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {sides.map((group, index) => (
            <div key={group.label} className={menuExtraClass(index)}>
              <p className={nav.menuExtraLabel}>{group.label}</p>
              <ul className={nav.menuCats}>
                {group.links.map((item, itemIndex) => (
                  <li
                    key={item.label}
                    className={
                      expanded
                        ? cn(
                            'animate-nav-enter duration-[300ms] motion-reduce:animate-none',
                            SUB_LI_DELAY[itemIndex],
                          )
                        : undefined
                    }
                  >
                    <Link className={nav.menuExtraLink} href={item.to} onClick={onNavigate}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}
