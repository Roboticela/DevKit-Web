'use client'

import { DkDevicesDesktopAndMobile } from '@/icons'
import type { AnotherDevicePreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Loader } from './Loader'
import { Body, Caption } from './Text'
import { ErrorText } from './TextLink'

const SAMPLE_DEVICE_META = {
  browser: 'Safari',
  os: 'macOS',
  location: 'San Francisco, CA',
}

function pageSubhead(state: AnotherDevicePreviewState) {
  if (state === 'completing') {
    return 'Approved. Finishing sign-in…'
  }
  if (state === 'default') {
    return 'We sent an approval request to a device where you’re already signed in.'
  }
  if (state === 'declined' || state === 'expired' || state === 'error') {
    return 'Use another verification method to continue.'
  }
  return ''
}

function pageError(state: AnotherDevicePreviewState) {
  if (state === 'declined') {
    return 'The request was declined on your other device.'
  }
  if (state === 'expired') {
    return 'The request expired. Try again from another way.'
  }
  if (state === 'error') {
    return 'Could not ask another device to approve.'
  }
  return ''
}

function deviceMetaLine(meta: typeof SAMPLE_DEVICE_META) {
  const parts = [meta.browser, meta.os].filter(Boolean)
  const line = parts.join(' · ')
  return meta.location ? `${line} · ${meta.location}` : line
}

export function AnotherDevicePage({
  state = 'default',
  email = 'alex@roboticela.com',
  showTryAnotherWay = true,
}: {
  state?: AnotherDevicePreviewState
  email?: string
  showTryAnotherWay?: boolean
}) {
  const noEmail = state === 'no-email'
  const waiting = state === 'default' || state === 'completing'
  const error = pageError(state)

  if (noEmail) {
    return (
      <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
        <AuthBrand
          title="Check Another Device"
          subhead="Start from Sign In to verify with another device."
          icon={<DkDevicesDesktopAndMobile size={44} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Check Another Device"
        subhead={pageSubhead(state)}
        narrowSubhead
        icon={<DkDevicesDesktopAndMobile size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />

      {waiting ? (
        <div className="mt-8 flex justify-center" aria-hidden>
          <Loader size="md" decorative />
        </div>
      ) : null}

      {state === 'default' ? (
        <Caption align="center" tone="tertiary" className="mt-4">
          {deviceMetaLine(SAMPLE_DEVICE_META)}
        </Caption>
      ) : null}

      {error ? <ErrorText className="mt-6">{error}</ErrorText> : null}

      {showTryAnotherWay ? (
        <Body size="sm" align="center" tone="tertiary" className="mt-6">
          <Anchor
            href={`/choose-verification-method?email=${encodeURIComponent(email)}`}
            variant="subtle"
            className="text-sm"
          >
            Try another way
          </Anchor>
        </Body>
      ) : null}
    </AuthLayout>
  )
}
