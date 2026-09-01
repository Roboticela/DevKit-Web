'use client'

import { useState } from 'react'
import { DkChevronCaretLeft, DkEnvelopeMessageMail, DkPersonUserProfile } from '@/icons'
import { brand } from '@/lib/devkit'
import type { CreateAccountPageState } from '@/lib/pages-catalog'
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

export type CreateAccountLastMethod = Extract<SocialLoginProvider, 'google' | 'passkey' | 'roboticela'>

function CreateAccountFooter() {
  return (
    <>
      <p className="mt-6 mb-0 text-center text-sm leading-[1.4] text-text-link">
        Already have an account? <Anchor href="/sign-in">Sign in</Anchor>
      </p>
      <AuthLegal />
    </>
  )
}

export function CreateAccountPage({
  state = 'default',
  name: nameValue = 'Alex Rivera',
  email = 'alex@roboticela.com',
  lastMethod = null,
}: {
  state?: CreateAccountPageState
  name?: string
  email?: string
  lastMethod?: CreateAccountLastMethod | null
}) {
  const invalid = state === 'error'
  const loading = state === 'loading'
  const [name, setName] = useState(nameValue)
  const [identifier, setIdentifier] = useState(email)
  const [password, setPassword] = useState('password')
  const [more, setMore] = useState(state === 'other-ways')
  const disabled = loading
  const providers = more ? SOCIAL_LOGIN_MORE_PROVIDERS : SOCIAL_LOGIN_PRIMARY_PROVIDERS

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand title="Create your Account" subhead={brand.taglineCreate} />
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
                icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                invalid={invalid}
                disabled={disabled}
              />
              <TextField
                icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                invalid={invalid}
                disabled={disabled}
              />
              <PasswordField
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                invalid={invalid}
                disabled={disabled}
              />
            </div>
            {invalid ? <ErrorText>Could not create account.</ErrorText> : null}
            <Button
              className="mt-4"
              type="submit"
              loading={loading}
              loadingText="Creating…"
            >
              Create Account
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
            />
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
        <CreateAccountFooter />
      </div>
    </AuthLayout>
  )
}
