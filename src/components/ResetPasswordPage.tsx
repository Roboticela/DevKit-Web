'use client'

import { useState } from 'react'
import { DkPadlockSecureClosed } from '@/icons'
import type { ResetPasswordPreviewState } from '@/lib/pages-catalog'
import { AuthBrand, AuthLayout, AuthSuccess } from './AuthLayout'
import { AuthLegal, ErrorText } from './TextLink'
import { Button } from './Button'
import { LoadingScreen } from './LoadingScreen'
import { PasswordField } from './PasswordField'
import { TextField } from './TextField'

export function ResetPasswordPage({
  state = 'default',
  password: passwordValue = 'password',
  confirm: confirmValue = 'password',
}: {
  state?: ResetPasswordPreviewState
  password?: string
  confirm?: string
}) {
  const invalid = state === 'error'
  const loading = state === 'loading'
  const [password, setPassword] = useState(passwordValue)
  const [confirm, setConfirm] = useState(confirmValue)
  const [showPassword, setShowPassword] = useState(false)

  if (state === 'checking') {
    return <LoadingScreen status="Setting things up…" />
  }

  if (state === 'success' || state === 'success-signin') {
    const fromSignIn = state === 'success-signin'
    return (
      <AuthLayout navLinkTo="/pages/settings" navLinkLabel="Settings">
        <AuthSuccess
          title="Password Updated"
          body={
            fromSignIn
              ? "You're signed in. Taking you to your account…"
              : 'Your password has been changed. You can continue to Settings.'
          }
          action={
            fromSignIn ? undefined : <Button type="button">Continue to Settings</Button>
          }
        />
        {fromSignIn ? null : <AuthLegal />}
      </AuthLayout>
    )
  }

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Reset Password"
        subhead="Choose a new password for your account."
        narrowSubhead
      />
      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="flex flex-col gap-4">
          <PasswordField
            name="password"
            placeholder="New password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            visible={showPassword}
            onVisibleChange={setShowPassword}
            invalid={invalid}
            disabled={loading}
          />
          <TextField
            icon={<DkPadlockSecureClosed size={18} strokeWidth={1.6} absoluteStrokeWidth />}
            type={showPassword ? 'text' : 'password'}
            name="confirm"
            placeholder="Confirm password"
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            minLength={8}
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            invalid={invalid}
            disabled={loading}
          />
        </div>
        {invalid ? <ErrorText>Could not reset password.</ErrorText> : null}
        <Button className="mt-4" type="submit" loading={loading} loadingText="Saving…">
          Save New Password
        </Button>
      </form>
      <AuthLegal />
    </AuthLayout>
  )
}
