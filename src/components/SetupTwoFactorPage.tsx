'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DkHandheldMobilePhone } from '@/icons'
import type { SetupTwoFactorPreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout, AuthSuccess } from './AuthLayout'
import { Button } from './Button'
import { LoadingScreen } from './LoadingScreen'
import { OtpBoxes } from './OtpBoxes'
import { Body, Caption } from './Text'
import { ErrorText } from './TextLink'
import { QrCode } from './QrCode'
import { TotpManualKey } from './TotpManualKey'

const OTP_LENGTH = 6
const SAMPLE_SECRET = 'JBSWY3DPEHPK3PXP'
const SIGN_IN_HREF = '/sign-in'
const DEFAULT_SKIP_HREF = '/dashboard'
const SAVE_RECOVERY_CODES_HREF = '/save-recovery-codes'

function initialDigits(state: SetupTwoFactorPreviewState) {
  if (state === 'error' || state === 'saving') {
    return ['1', '4', '8', '2', '9', '0']
  }
  return Array(OTP_LENGTH).fill('')
}

export function SetupTwoFactorPage({
  state = 'default',
  showSkipForNow = true,
  skipHref = DEFAULT_SKIP_HREF,
}: {
  state?: SetupTwoFactorPreviewState
  showSkipForNow?: boolean
  skipHref?: string
}) {
  const locked = state === 'error' || state === 'saving'
  const invalid = state === 'error'
  const saving = state === 'saving'
  const loading = state === 'loading'
  const qrLoading = state === 'qr-loading'
  const qrError = state === 'qr-error'
  const success = state === 'success'
  const [digits, setDigits] = useState<string[]>(() => initialDigits(state))
  const complete = digits.every(Boolean)

  useEffect(() => {
    setDigits(initialDigits(state))
  }, [state])

  if (loading) {
    return <LoadingScreen status="Preparing your authenticator…" />
  }

  if (success) {
    return (
      <AuthLayout navLinkTo={SIGN_IN_HREF} navLinkLabel="Sign in">
        <AuthSuccess
          title="Authenticator Added"
          body="Two-factor authentication is on. Save your recovery codes on the next screen."
          action={
            <Link href={SAVE_RECOVERY_CODES_HREF} className="block w-full">
              <Button type="button">Continue</Button>
            </Link>
          }
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo={SIGN_IN_HREF} navLinkLabel="Sign in">
      <AuthBrand
        title="Set Up Authenticator"
        subhead="Your account needs two-factor authentication. Scan the QR code, then enter the 6-digit code."
        narrowSubhead
        icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />

      <div className="mx-auto mt-8 flex w-full max-w-[420px] flex-col items-center">
        <QrCode
          content={{ kind: 'totp', secret: SAMPLE_SECRET }}
          alt="Authenticator QR code"
          variant="branded"
          loading={qrLoading}
          error={qrError}
          className="mt-0"
        />
        <TotpManualKey secret={SAMPLE_SECRET} />

        <form
          className="mt-8 flex w-full flex-col items-center"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <Caption align="center" tone="secondary" className="mb-3 w-full">
            Verification code
          </Caption>
          <OtpBoxes
            className="w-full"
            value={digits}
            onChange={locked ? () => {} : setDigits}
            invalid={invalid}
            shaking={invalid}
            disabled={saving || locked}
          />

          {invalid ? <ErrorText>Incorrect code, try again</ErrorText> : null}

          <Button
            className="mt-8 w-full"
            type="submit"
            disabled={!complete}
            loading={saving}
            loadingText="Saving…"
          >
            Save
          </Button>
        </form>

        {showSkipForNow ? (
          <Body size="sm" align="center" tone="tertiary" className="mt-3 w-full">
            <Anchor href={skipHref} variant="subtle" className="text-sm">
              Skip for now
            </Anchor>
          </Body>
        ) : null}
      </div>
    </AuthLayout>
  )
}
