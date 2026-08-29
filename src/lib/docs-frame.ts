import {
  BUTTON_TOC,
  COLORS_TOC,
  COMPONENT_ALIASES,
  DOCS_NAV,
  FOUNDATION_IDS,
  FOUNDATION_TOC,
  GUIDE_SLUGS,
  GUIDE_TOC,
  ICONS_TOC,
  FLAGS_TOC,
  KIT_TOC,
  TEXT_TOC,
  TYPE_FOUNDATION_TOC,
  type DocsNavSection,
  type DocsTocItem,
} from './docs-catalog'
import { PAGES_NAV, SIGN_IN_TOC } from './pages-catalog'

export type DocsFrame = {
  activeId: string
  toc: DocsTocItem[]
  activeTab: 'Docs' | 'Components' | 'Pages' | 'Guides'
  sections: DocsNavSection[]
  contentWidth: 760 | 900
  pagesSidebar: boolean
}

export function resolveDocsFrame(pathname: string): DocsFrame | null {
  if (pathname === '/components' || pathname.startsWith('/components/')) {
    const raw = pathname === '/components' ? 'button' : pathname.slice('/components/'.length)
    const slug = COMPONENT_ALIASES[raw] ?? (raw || 'button')
    let toc = KIT_TOC
    let contentWidth: 760 | 900 = 760
    if (slug === 'button') toc = BUTTON_TOC
    else if (slug === 'text') toc = TEXT_TOC
    else if (GUIDE_SLUGS.has(slug)) toc = GUIDE_TOC
    else if (slug === 'icons') {
      toc = ICONS_TOC
      contentWidth = 900
    } else if (slug === 'country-flag') {
      toc = FLAGS_TOC
      contentWidth = 900
    } else if (slug === 'colors') toc = COLORS_TOC
    else if (slug === 'typography') toc = TYPE_FOUNDATION_TOC
    else if (FOUNDATION_IDS.has(slug)) toc = FOUNDATION_TOC

    return {
      activeId: slug,
      toc,
      activeTab: 'Components',
      sections: DOCS_NAV,
      contentWidth,
      pagesSidebar: false,
    }
  }

  if (pathname === '/pages' || pathname.startsWith('/pages/')) {
    const slug = (pathname === '/pages' ? 'sign-in' : pathname.slice('/pages/'.length)) || 'sign-in'
    return {
      activeId: slug,
      toc: slug === 'sign-in' ? SIGN_IN_TOC : [{ id: 'overview', label: 'Overview' }],
      activeTab: 'Pages',
      sections: PAGES_NAV,
      contentWidth: 900,
      pagesSidebar: true,
    }
  }

  return null
}
