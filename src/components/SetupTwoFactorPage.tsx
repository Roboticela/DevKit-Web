'use client'

import { useEffect, useState } from 'react'
import { DkHandheldMobilePhone } from '@/icons'
import type { SetupTwoFactorPreviewState } from '@/lib/pages-catalog'
import { AuthBrand, AuthLayout, AuthSuccess } from './AuthLayout'
import { Button } from './Button'
import { FieldLabel } from './FieldLabel'
import { LoadingScreen } from './LoadingScreen'
import { OtpBoxes } from './OtpBoxes'
import { RecoveryCodesList } from './RecoveryInput'
import { Body } from './Text'
import { ErrorText } from './TextLink'
import { TotpManualKey } from './TotpManualKey'

const OTP_LENGTH = 6
const SAMPLE_SECRET = 'JBSWY3DPEHPK3PXP'
const SAMPLE_RECOVERY_CODES = ['XK4M-92QP', 'L7TN-3W8D', 'P0AV-61CK', 'H9QE-44BM']

function initialDigits(state: SetupTwoFactorPreviewState) {
  if (state === 'error' || state === 'saving') {
    return ['1', '4', '8', '2', '9', '0']
  }
  return Array(OTP_LENGTH).fill('')
}

function AuthenticatorQrCode() {
  const src =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" fill="#fff"/><path fill="#111" d="M20 20h44v44H20zm8 8v28h28V28zm52-8h44v44H80zm8 8v28h28V28zM20 116h44v44H20zm8 8v28h28v-28zm60 4h8v8h-8zm16 0h8v8h-8zm16 0h8v8h-8zm-32 16h8v8h-8zm16 0h8v8h-8zm16 0h8v8h-8zm-48 16h8v8h-8zm32 0h8v8h-8zm16 0h8v8h-8zM116 116h44v44h-44zm8 8v28h28v-28z"/></svg>`,
    )

  return (
    <img
      className="mx-auto mt-6 block size-[180px] rounded-[12px] bg-white"
      src={src}
      alt="Authenticator QR code"
      width={180}
      height={180}
    />
  )
}

export function SetupTwoFactorPage({
  state = 'default',
}: {
  state?: SetupTwoFactorPreviewState
}) {
  const locked = state !== 'default'
  const invalid = state === 'error'
  const saving = state === 'saving'
  const loading = state === 'loading'
  const codes = state === 'codes'
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
      <AuthLayout navLinkTo="/pages/settings" navLinkLabel="Settings">
        <AuthSuccess
          title="Authenticator Added"
          body="You can use codes from your authenticator app when signing in."
          action={<Button type="button">Continue to Settings</Button>}
        />
      </AuthLayout>
    )
  }

  if (codes) {
    return (
      <AuthLayout navLinkTo="/pages/settings" navLinkLabel="Settings">
        <AuthBrand
          title="Recovery Codes"
          subhead="Save these codes somewhere safe."
          narrowSubhead
          icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} absoluteStrokeWidth />}
        />
        <Body size="sm" align="center" className="mx-auto mt-2 max-w-[360px]">
          Keep these codes somewhere safe. Each can be used once if you lose access to your
          authenticator.
        </Body>
        <div className="mt-8">
          <RecoveryCodesList copyable codes={SAMPLE_RECOVERY_CODES} />
        </div>
        <Button className="mt-8" type="button">
          Continue
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo="/pages/settings" navLinkLabel="Settings">
      <AuthBrand
        title="Set Up Authenticator"
        subhead="Scan the QR code, then enter a code."
        narrowSubhead
        icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <Body size="sm" align="center" className="mx-auto mt-2 max-w-[360px]">
        Scan the QR code with your authenticator app, then enter the 6-digit code.
      </Body>

      <AuthenticatorQrCode />
      <TotpManualKey secret={SAMPLE_SECRET} />

      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <FieldLabel className="mb-3 text-left">Verification code</FieldLabel>
        <OtpBoxes
          value={digits}
          onChange={locked ? () => {} : setDigits}
          invalid={invalid}
          shaking={invalid}
          disabled={saving || locked}
        />

        {invalid ? <ErrorText>Incorrect code, try again</ErrorText> : null}

        <Button
          className="mt-8"
          type="submit"
          disabled={!complete}
          loading={saving}
          loadingText="Saving…"
        >
          Save
        </Button>
      </form>
    </AuthLayout>
  )
}
