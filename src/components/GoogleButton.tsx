'use client'

import type { ButtonHTMLAttributes } from 'react'
import { AuthProviderButton } from './AuthProviderButton'
import { GoogleMark } from './GoogleMark'

type GoogleButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function GoogleButton({
  children = 'Continue with Google',
  ...rest
}: GoogleButtonProps) {
  return (
    <AuthProviderButton icon={<GoogleMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
