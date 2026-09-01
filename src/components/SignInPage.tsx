'use client'

import { useState } from 'react'
import { DkChevronCaretLeft, DkEnvelopeMessageMail } from '@/icons'
import { brand } from '@/lib/devkit'
import type { SignInPageState } from '@/lib/pages-catalog'
import { Anchor } from './Anchor'
import { AuthBrand, AuthFormCollapse, AuthLayout } from './AuthLayout'
import { AuthProviderStack } from './AuthProviderButton'
import { AuthLegal, ErrorText } from './TextLink'
import { Button } from './Button'
import { Divider } from './Divider'
import { OtherWaysButton } from './OtherWaysButton'
import { PasswordField } from './PasswordField'
import {
  SOCIAL_LOGIN_MORE_PROVIDERS,
  SOCIAL_LOGIN_PRIMARY_PROVIDERS,
  SocialLoginButton,
  type SocialLoginProvider,
} from './SocialLoginButton'
import { TextField } from './TextField'

export type SignInLastMethod = Extract<SocialLoginProvider, 'google' | 'passkey' | 'roboticela'>

function SignInFooter() {
  return (
    <>
      <p className="mt-6 mb-0 text-center text-sm leading-[1.4] text-text-link">
        Don&apos;t have an account? <Anchor href="/create-account">Create one</Anchor>
      </p>
      <AuthLegal />
    </>
  )
}

export function SignInPage({
  state = 'default',
  email = 'alex@roboticela.com',
  lastMethod = null,
}: {
  state?: SignInPageState
  email?: string
  lastMethod?: SignInLastMethod | null
}) {
  const invalid = state === 'error'
  const loading = state === 'loading'
  const locked = state === 'locked'
  const [identifier, setIdentifier] = useState(email)
  const [password, setPassword] = useState('password')
  const [more, setMore] = useState(state === 'other-ways')
  const disabled = loading || locked
  const providers = more ? SOCIAL_LOGIN_MORE_PROVIDERS : SOCIAL_LOGIN_PRIMARY_PROVIDERS

  return (
    <AuthLayout navLinkTo="/create-account" navLinkLabel="Create one">
      <AuthBrand title="Sign In" subhead={brand.taglineSignIn} />
      <div className="mt-8 flex flex-col">
        <AuthFormCollapse open={!more}>
          <form
            className="flex flex-col"
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div className="flex flex-col gap-4">
              <TextField
                icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                type="text"
                name="username"
                placeholder="Email or username"
                autoComplete="username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                invalid={invalid}
                disabled={disabled}
              />
              <PasswordField
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                invalid={invalid}
                disabled={disabled}
              />
            </div>
            <Anchor href="/forgot-password" className="mt-2 self-end text-sm leading-[1.4]">
              Forgot password?
            </Anchor>
            {invalid ? <ErrorText>Incorrect email or password.</ErrorText> : null}
            {locked ? <ErrorText>Too many attempts. Try again in 15 minutes.</ErrorText> : null}
            <Button
              className="mt-4"
              type="submit"
              disabled={locked}
              loading={loading}
              loadingText="Signing in…"
            >
              Sign In
            </Button>
          </form>
          <Divider>or</Divider>
        </AuthFormCollapse>
        <AuthProviderStack
          key={more ? 'more' : 'primary'}
          className="gap-y-3 animate-docs-crossfade motion-reduce:animate-none"
        >
          {providers.map((provider) => (
            <SocialLoginButton
              key={provider}
              provider={provider}
              disabled={disabled}
              lastUsed={!more && lastMethod === provider}
            >
              {!more && provider === 'passkey' ? 'Sign in with Passkey' : undefined}
            </SocialLoginButton>
          ))}
        </AuthProviderStack>
        <div className="mt-3">
          <OtherWaysButton
            disabled={disabled}
            aria-expanded={more}
            icon={
              more ? (
                <DkChevronCaretLeft size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
              ) : undefined
            }
            onClick={() => setMore((current) => !current)}
          >
            {more ? 'Back' : undefined}
          </OtherWaysButton>
        </div>
        <SignInFooter />
      </div>
    </AuthLayout>
  )
}
