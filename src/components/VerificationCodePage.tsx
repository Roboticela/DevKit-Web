'use client'

import { useEffect, useState } from 'react'
import { DkPadlockSecureClosed } from '@/icons'
import type { VerificationCodePreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Button } from './Button'
import { LoadingScreen } from './LoadingScreen'
import { OtpBoxes } from './OtpBoxes'
import { Body, Caption } from './Text'
import { ErrorText } from './TextLink'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export type VerificationCodePurpose = 'sign_in' | 'reset_password'

function formatCountdown(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function initialDigits(state: VerificationCodePreviewState) {
  if (state === 'error' || state === 'loading') {
    return ['1', '4', '8', '2', '9', '0']
  }
  return Array(OTP_LENGTH).fill('')
}

function previewResendIn(state: VerificationCodePreviewState) {
  if (state === 'resend-countdown') return RESEND_SECONDS
  if (state === 'resend-ready') return 0
  return RESEND_SECONDS
}

function verificationCopy(purpose: VerificationCodePurpose, email: string) {
  const destination = email || 'your email'

  if (purpose === 'reset_password') {
    return {
      title: 'Verify Your Identity',
      subhead: `Enter the 6-digit code sent to ${destination} to reset your password.`,
    }
  }

  return {
    title: 'Enter Verification Code',
    subhead: `Enter the 6-digit code sent to ${destination}.`,
  }
}

export function VerificationCodePage({
  state = 'default',
  email = 'alex@roboticela.com',
  purpose = 'sign_in',
  showTryAnotherWay = true,
}: {
  state?: VerificationCodePreviewState
  email?: string
  purpose?: VerificationCodePurpose
  showTryAnotherWay?: boolean
}) {
  const locked = state !== 'default'
  const invalid = state === 'error'
  const loading = state === 'loading'
  const checking = state === 'checking'
  const noEmail = state === 'no-email'
  const resolvedPurpose = state === 'reset-password' ? 'reset_password' : purpose
  const [digits, setDigits] = useState<string[]>(() => initialDigits(state))
  const [resendIn, setResendIn] = useState(() => previewResendIn(state))
  const copy = verificationCopy(resolvedPurpose, email)
  const complete = digits.every(Boolean)

  useEffect(() => {
    setDigits(initialDigits(state))
    setResendIn(previewResendIn(state))
  }, [state])

  useEffect(() => {
    if (locked || resendIn <= 0) return
    const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [locked, resendIn])

  if (checking) {
    return <LoadingScreen status="Verifying your link…" />
  }

  if (noEmail) {
    return (
      <AuthLayout>
        <AuthBrand
          title="Enter Verification Code"
          subhead="Start from Create Account or Sign In to receive a code."
          icon={<DkPadlockSecureClosed size={44} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <AuthBrand
        title={copy.title}
        subhead={copy.subhead}
        narrowSubhead
        icon={<DkPadlockSecureClosed size={44} strokeWidth={1.5} absoluteStrokeWidth />}
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

        <div className="mt-4 text-center">
          {resendIn > 0 ? (
            <Caption as="span" tone="tertiary">
              Resend in {formatCountdown(resendIn)}
            </Caption>
          ) : (
            <Anchor href="#" variant="subtle" className="text-sm">
              Didn&apos;t receive a code? Resend
            </Anchor>
          )}
        </div>

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
