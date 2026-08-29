'use client'

import { useEffect, useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import { brand } from '@/lib/devkit'
import type { SignInPreviewState } from '@/lib/pages-catalog'
import { AppleButton } from './ProviderButtons'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { AuthLegal, ErrorText, TextLink } from './TextLink'
import { AuthProviderStack } from './AuthProviderButton'
import { Button } from './Button'
import { Divider } from './Divider'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { PasswordReveal } from './PasswordReveal'
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
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(email)
  const [password, setPassword] = useState('password')

  useEffect(() => {
    setVisible(false)
  }, [state])

  const disabled = loading || locked

  return (
    <AuthLayout navLinkTo="/pages/create-account" navLinkLabel="Create account">
      <AuthBrand title="Welcome back" subhead={brand.taglineSignIn} />
      <form
        className="mt-8 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="flex flex-col gap-4">
          <TextField
            icon={<Mail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            invalid={invalid}
            disabled={disabled}
          />
          <TextField
            icon={<Lock size={18} strokeWidth={1.6} absoluteStrokeWidth />}
            type={visible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            invalid={invalid}
            disabled={disabled}
            trailing={
              <PasswordReveal visible={visible} onToggle={() => setVisible((open) => !open)} />
            }
          />
        </div>
        <div className="mt-3 flex justify-end">
          <TextLink href="/pages/forgot-password" className="text-sm">
            Forgot password?
          </TextLink>
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
          <TextLink href="/pages/create-account">Create account</TextLink>
        </p>
        <AuthLegal />
      </form>
    </AuthLayout>
  )
}
