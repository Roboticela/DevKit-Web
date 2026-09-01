'use client'

import Link from 'next/link'
import { DkHyperlinkChainBindAlternateDisabled } from '@/icons'
import type { LinkExpiredPreviewState } from '@/lib/pages-catalog'
import { cn } from '@/lib/cn'
import { PILL_BUTTON } from '@/lib/styles'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { ButtonLabel } from './ButtonLabel'

export type LinkExpiredPurpose = 'sign_in' | 'reset_password' | 'settings'

function purposeForState(state: LinkExpiredPreviewState): LinkExpiredPurpose {
  if (state === 'reset-password') return 'reset_password'
  if (state === 'settings') return 'settings'
  return 'sign_in'
}

function backTarget(purpose: LinkExpiredPurpose) {
  if (purpose === 'reset_password') {
    return {
      href: '/forgot-password',
      label: 'Back to Forgot Password',
      navHref: '/forgot-password',
      navLabel: 'Forgot Password',
    }
  }
  if (purpose === 'settings') {
    return {
      href: '/pages/settings',
      label: 'Back to Settings',
      navHref: '/pages/settings',
      navLabel: 'Settings',
    }
  }
  return {
    href: '/sign-in',
    label: 'Back to Sign In',
    navHref: '/sign-in',
    navLabel: 'Sign in',
  }
}

function backHref(href: string, email: string, purpose: LinkExpiredPurpose) {
  if (email && purpose === 'reset_password') {
    return `${href}?email=${encodeURIComponent(email)}`
  }
  return href
}

export function LinkExpiredPage({
  state = 'default',
  email = 'alex@roboticela.com',
}: {
  state?: LinkExpiredPreviewState
  email?: string
}) {
  const purpose = purposeForState(state)
  const back = backTarget(purpose)

  return (
    <AuthLayout navLinkTo={back.navHref} navLinkLabel={back.navLabel}>
      <AuthBrand
        title="Link Expired"
        subhead="This verification link has expired."
        narrowSubhead
        icon={<DkHyperlinkChainBindAlternateDisabled size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <Link
        href={backHref(back.href, email, purpose)}
        className={cn(
          PILL_BUTTON,
          'mt-8 inline-flex h-[50px] w-full items-center justify-center px-6 text-[17px] font-medium',
          'border-0 bg-brand-primary text-text-on-brand',
          'hover:bg-brand-primary-hover active:bg-brand-primary-active',
        )}
      >
        <ButtonLabel light>{back.label}</ButtonLabel>
      </Link>
    </AuthLayout>
  )
}
