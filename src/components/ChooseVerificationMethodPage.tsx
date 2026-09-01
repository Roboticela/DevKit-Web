'use client'

import { useState, type ReactNode } from 'react'
import {
  DkDevicesDesktopAndMobile,
  DkEnvelopeMessageMail,
  DkFingerprintBiometricScanPattern,
  DkHandheldMobilePhone,
  DkRoundKeyAccess,
  DkSecurityShieldProtect,
} from '@/icons'
import type { ChooseVerificationMethodPreviewState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Button } from './Button'
import { LoadingScreen } from './LoadingScreen'
import { RadioGroup } from './Radio'
import { Body } from './Text'
import { ErrorText } from './TextLink'
import { VerificationMethodCard } from './VerificationMethodCard'

export type VerificationMethodId = 'email' | 'passkey' | 'authenticator' | 'recovery' | 'device'

export type VerificationMethodAvailability = Record<VerificationMethodId, boolean>

export const VERIFICATION_METHODS: VerificationMethodId[] = [
  'email',
  'passkey',
  'authenticator',
  'recovery',
  'device',
]

export const DEFAULT_VERIFICATION_AVAILABILITY: VerificationMethodAvailability = {
  email: true,
  passkey: true,
  authenticator: true,
  recovery: false,
  device: false,
}

const METHOD_ICONS: Record<VerificationMethodId, ReactNode> = {
  email: <DkEnvelopeMessageMail size={28} strokeWidth={1.6} absoluteStrokeWidth />,
  passkey: <DkFingerprintBiometricScanPattern size={28} strokeWidth={1.6} absoluteStrokeWidth />,
  authenticator: <DkHandheldMobilePhone size={28} strokeWidth={1.6} absoluteStrokeWidth />,
  recovery: <DkRoundKeyAccess size={28} strokeWidth={1.6} absoluteStrokeWidth />,
  device: <DkDevicesDesktopAndMobile size={28} strokeWidth={1.6} absoluteStrokeWidth />,
}

const METHOD_TITLES: Record<VerificationMethodId, string> = {
  email: 'Email',
  passkey: 'Passkey',
  authenticator: 'Authenticator App',
  recovery: 'Recovery Code',
  device: 'Another Device',
}

function methodSubtitle(method: VerificationMethodId, enabled: boolean, email: string) {
  if (!enabled) {
    if (method === 'device') return 'No other signed-in devices'
    return 'Not configured for this account'
  }

  switch (method) {
    case 'email':
      return `Send a code to ${email}.`
    case 'passkey':
      return 'Use Face ID, Touch ID, or your device screen lock.'
    case 'authenticator':
      return 'Enter a code from Google Authenticator or similar.'
    case 'recovery':
      return 'Use one of your one-time recovery codes.'
    case 'device':
      return 'Approve on a device where you’re already signed in.'
  }
}

function methodHint(method: VerificationMethodId, enabled: boolean) {
  if (enabled) return undefined
  if (method === 'device') return 'Sign in on another device first'
  return 'Not configured for this account'
}

export function ChooseVerificationMethodPage({
  state = 'default',
  email = 'alex@roboticela.com',
  selectedMethod: selectedMethodProp = 'email',
  availability = DEFAULT_VERIFICATION_AVAILABILITY,
}: {
  state?: ChooseVerificationMethodPreviewState
  email?: string
  selectedMethod?: VerificationMethodId
  availability?: VerificationMethodAvailability
}) {
  const loading = state === 'loading'
  const checking = state === 'checking'
  const locked = state === 'selected' || state === 'loading' || state === 'error'
  const [method, setMethod] = useState<VerificationMethodId | null>(
    locked ? selectedMethodProp : null,
  )
  const resolvedMethod = locked ? selectedMethodProp : method
  const canContinue = Boolean(resolvedMethod && availability[resolvedMethod])

  if (checking) {
    return <LoadingScreen status="Loading verification methods…" />
  }

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Choose a Verification Method"
        subhead="Select how you'd like to verify it's you."
        icon={<DkSecurityShieldProtect size={56} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <RadioGroup label="Verification method" className="gap-3">
          {VERIFICATION_METHODS.map((option) => {
            const enabled = availability[option]
            const selected = resolvedMethod === option
            return (
              <VerificationMethodCard
                key={option}
                icon={METHOD_ICONS[option]}
                title={METHOD_TITLES[option]}
                subtitle={methodSubtitle(option, enabled, email)}
                selected={selected}
                disabled={!enabled || loading}
                hint={methodHint(option, enabled)}
                onClick={() => {
                  if (!enabled || loading || locked) return
                  setMethod(option)
                }}
              />
            )
          })}
        </RadioGroup>

        {state === 'error' ? (
          <ErrorText>Could not continue. Try again.</ErrorText>
        ) : null}

        <Button
          className="mt-8"
          type="submit"
          disabled={!canContinue}
          loading={loading}
          loadingText="Continuing…"
        >
          Continue
        </Button>
      </form>

      <Body size="sm" align="center" tone="tertiary" className="mt-4">
        <Anchor href="/help/authentication/sign-in" variant="subtle" className="text-sm">
          Need help signing in?
        </Anchor>
      </Body>
    </AuthLayout>
  )
}
