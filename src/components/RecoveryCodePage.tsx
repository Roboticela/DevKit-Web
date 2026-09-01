'use client'

import { useEffect, useState } from 'react'
import { DkRoundKeyAccess } from '@/icons'
import type { RecoveryCodePreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Button } from './Button'
import { RecoveryInput, recoveryPlaceholder, sanitizeRecoveryCode } from './RecoveryInput'
import { Body } from './Text'
import { ErrorText } from './TextLink'

const CODE_LENGTH = 8

function initialCode(state: RecoveryCodePreviewState) {
  if (state === 'error' || state === 'loading') {
    return 'XK4M-92QP'
  }
  return ''
}

export function RecoveryCodePage({
  state = 'default',
  email = 'alex@roboticela.com',
  showTryAnotherWay = true,
}: {
  state?: RecoveryCodePreviewState
  email?: string
  showTryAnotherWay?: boolean
}) {
  const locked = state !== 'default'
  const invalid = state === 'error'
  const loading = state === 'loading'
  const noEmail = state === 'no-email'
  const [code, setCode] = useState(() => initialCode(state))
  const complete = sanitizeRecoveryCode(code, CODE_LENGTH).length === CODE_LENGTH

  useEffect(() => {
    setCode(initialCode(state))
  }, [state])

  if (noEmail) {
    return (
      <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
        <AuthBrand
          title="Enter Recovery Code"
          subhead="Start from Sign In to verify with a recovery code."
          icon={<DkRoundKeyAccess size={44} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Enter Recovery Code"
        subhead="Use one of the one-time recovery codes you saved when turning on two-factor authentication."
        narrowSubhead
        icon={<DkRoundKeyAccess size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <RecoveryInput
          value={code}
          onChange={locked ? () => {} : setCode}
          invalid={invalid}
          shaking={invalid}
          disabled={loading || locked}
          placeholder={recoveryPlaceholder()}
        />

        {invalid ? <ErrorText>Incorrect recovery code, try again.</ErrorText> : null}

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
