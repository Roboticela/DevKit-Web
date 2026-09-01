'use client'

import { useEffect, useState } from 'react'
import { DkHandheldMobilePhone } from '@/icons'
import type { AuthenticatorCodePreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Button } from './Button'
import { OtpBoxes } from './OtpBoxes'
import { Body } from './Text'
import { ErrorText } from './TextLink'

const OTP_LENGTH = 6

function initialDigits(state: AuthenticatorCodePreviewState) {
  if (state === 'error' || state === 'loading') {
    return ['1', '4', '8', '2', '9', '0']
  }
  return Array(OTP_LENGTH).fill('')
}

export function AuthenticatorCodePage({
  state = 'default',
  email = 'alex@roboticela.com',
  showTryAnotherWay = true,
}: {
  state?: AuthenticatorCodePreviewState
  email?: string
  showTryAnotherWay?: boolean
}) {
  const locked = state !== 'default'
  const invalid = state === 'error'
  const loading = state === 'loading'
  const noEmail = state === 'no-email'
  const [digits, setDigits] = useState<string[]>(() => initialDigits(state))
  const complete = digits.every(Boolean)

  useEffect(() => {
    setDigits(initialDigits(state))
  }, [state])

  if (noEmail) {
    return (
      <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
        <AuthBrand
          title="Authenticator Code"
          subhead="Start from Sign In to verify with your authenticator app."
          icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Authenticator Code"
        subhead="Enter the 6-digit code from your authenticator app."
        narrowSubhead
        icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <OtpBoxes
          value={digits}
          onChange={locked ? () => {} : setDigits}
          invalid={invalid}
          shaking={invalid}
          disabled={loading || locked}
        />

        {invalid ? <ErrorText>Incorrect code, try again</ErrorText> : null}

        <Button
          className="mt-8"
          type="submit"
          disabled={!complete}
          loading={loading}
          loadingText="Verifying…"
        >
          Verify
        </Button>
      </form>

      {showTryAnotherWay ? (
        <Body size="sm" align="center" tone="tertiary" className="mt-4">
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
