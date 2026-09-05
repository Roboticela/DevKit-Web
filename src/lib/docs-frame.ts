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
import {
  ANOTHER_DEVICE_TOC,
  AUTHENTICATOR_CODE_TOC,
  CHOOSE_VERIFICATION_METHOD_TOC,
  CREATE_ACCOUNT_TOC,
  DASHBOARD_TOC,
  FORGOT_PASSWORD_TOC,
  LINK_EXPIRED_TOC,
  ONBOARDING_TOC,
  PAGES_NAV,
  RECOVERY_CODE_TOC,
  RESET_PASSWORD_TOC,
  SAVE_RECOVERY_CODES_TOC,
  SETTINGS_TOC,
  SETUP_TWO_FACTOR_SUCCESS_TOC,
  SETUP_TWO_FACTOR_TOC,
  SIGN_IN_TOC,
  VERIFICATION_CODE_TOC,
} from './pages-catalog'
import { SECTIONS_ITEMS, SECTIONS_NAV } from './sections-catalog'

export type DocsFrame = {
  activeId: string
  toc: DocsTocItem[]
  activeTab: 'Docs' | 'Components' | 'Pages' | 'Sections' | 'Guides'
  sections: DocsNavSection[]
  contentWidth: 760 | 900
}

export function resolveDocsFrame(pathname: string): DocsFrame | null {
  if (pathname === '/components' || pathname.startsWith('/components/')) {
    const raw = pathname === '/components' ? 'button' : pathname.slice('/components/'.length)
    const slug = COMPONENT_ALIASES[raw] ?? (raw || 'button')
    let toc = KIT_TOC
    let contentWidth: 760 | 900 = 760
    if (slug === 'button') toc = BUTTON_TOC
    else if (slug === 'anchor') toc = BUTTON_TOC
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
    }
  }

  if (pathname === '/pages' || pathname.startsWith('/pages/')) {
    const slug = (pathname === '/pages' ? 'sign-in' : pathname.slice('/pages/'.length)) || 'sign-in'
    return {
      activeId: slug,
      toc:
        slug === 'sign-in'
          ? SIGN_IN_TOC
          : slug === 'create-account'
            ? CREATE_ACCOUNT_TOC
            : slug === 'onboarding'
              ? ONBOARDING_TOC
              : slug === 'forgot-password'
              ? FORGOT_PASSWORD_TOC
              : slug === 'reset-password'
                ? RESET_PASSWORD_TOC
                : slug === 'choose-verification-method'
                  ? CHOOSE_VERIFICATION_METHOD_TOC
                  : slug === 'verification-code'
                    ? VERIFICATION_CODE_TOC
                    : slug === 'authenticator-code'
                      ? AUTHENTICATOR_CODE_TOC
                      : slug === 'recovery-code'
                        ? RECOVERY_CODE_TOC
                        : slug === 'another-device'
                          ? ANOTHER_DEVICE_TOC
                          : slug === 'link-expired'
                            ? LINK_EXPIRED_TOC
                            : slug === 'setup-2fa'
                              ? SETUP_TWO_FACTOR_TOC
                              : slug === 'save-recovery-codes'
                                ? SAVE_RECOVERY_CODES_TOC
                                : slug === 'setup-2fa-success'
                                  ? SETUP_TWO_FACTOR_SUCCESS_TOC
                                  : slug === 'dashboard'
                                    ? DASHBOARD_TOC
                                    : slug === 'settings'
                                      ? SETTINGS_TOC
                                      : [{ id: 'overview', label: 'Overview' }],
      activeTab: 'Pages',
      sections: PAGES_NAV,
      contentWidth: 900,
    }
  }

  if (pathname === '/sections' || pathname.startsWith('/sections/')) {
    const slug = pathname === '/sections' ? SECTIONS_ITEMS[0]!.id : pathname.slice('/sections/'.length)
    return {
      activeId: slug,
      toc: [{ id: 'overview', label: 'Overview' }],
      activeTab: 'Sections',
      sections: SECTIONS_NAV,
      contentWidth: 900,
    }
  }

  return null
}
