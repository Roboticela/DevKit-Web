'use client'

import { useState } from 'react'
import {
  DkEnvelopeMessageMail
} from '@/icons'
import { brand } from '@/lib/devkit'
import type { SignInPreviewState } from '@/lib/pages-catalog'
import { AppleButton } from './ProviderButtons'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { AuthLegal, ErrorText } from './TextLink'
import { AuthProviderStack } from './AuthProviderButton'
import { Button } from './Button'
import { Divider } from './Divider'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { PasswordField } from './PasswordField'
import { TextField } from './TextField'

export function SignInPage({
  state = 'default',
  email = 'alex@roboticela.com',
}: {
  state?: SignInPreviewState
  email?: string
}) {
  const invalid = state === 'error'
  const loading = state === 'loading'
  const locked = state === 'locked'
  const [value, setValue] = useState(email)
  const [password, setPassword] = useState('password')

  const disabled = loading || locked

  return (
    <AuthLayout navLinkTo="/pages/create-account" navLinkLabel="Create one">
      <AuthBrand title="Welcome back" subhead={brand.taglineSignIn} />
      <form
        className="mt-8 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="flex flex-col gap-4">
          <TextField
            icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            value={value}
            onChange={(event) => setValue(event.target.value)}
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
        <div className="mt-3 flex justify-end">
          <Anchor href="/pages/forgot-password" className="text-sm">
            Forgot password?
          </Anchor>
        </div>
        {invalid ? <ErrorText>Incorrect email or password.</ErrorText> : null}
        {locked ? (
          <ErrorText>Too many attempts. Try again in 15 minutes.</ErrorText>
        ) : null}
        <Button
          className="mt-6"
          type="submit"
          disabled={locked}
          loading={loading}
          loadingText="Signing in…"
        >
          Sign In
        </Button>
        <Divider>or continue with</Divider>
        <AuthProviderStack className="gap-y-3">
          <GoogleButton disabled={disabled} />
          <AppleButton disabled={disabled} />
          <GitHubButton disabled={disabled} />
        </AuthProviderStack>
        <p className="mt-6 mb-0 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{' '}
          <Anchor href="/pages/create-account">Create account</Anchor>
        </p>
        <AuthLegal />
      </form>
    </AuthLayout>
  )
}
