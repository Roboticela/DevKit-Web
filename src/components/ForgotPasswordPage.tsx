'use client'

import { useState } from 'react'
import { DkEnvelopeMessageMail } from '@/icons'
import type { ForgotPasswordPreviewState } from '@/lib/pages-catalog'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { AuthLegal, ErrorText } from './TextLink'
import { Button } from './Button'
import { OtherWaysButton } from './OtherWaysButton'
import { TextField } from './TextField'

export function ForgotPasswordPage({
  state = 'default',
  email = 'alex@roboticela.com',
}: {
  state?: ForgotPasswordPreviewState
  email?: string
}) {
  const invalid = state === 'error'
  const loading = state === 'loading'
  const [identifier, setIdentifier] = useState(email)

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Forgot Password?"
        subhead="Enter your email, then verify it's you to reset your password."
        narrowSubhead
      />
      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <TextField
          icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          invalid={invalid}
          disabled={loading}
        />
        {invalid ? <ErrorText>Could not start password reset.</ErrorText> : null}
        <Button className="mt-4" type="submit" loading={loading} loadingText="Continuing…">
          Continue
        </Button>
      </form>
      <div className="mt-6">
        <OtherWaysButton href="/sign-in" />
      </div>
      <AuthLegal />
    </AuthLayout>
  )
}
