'use client'

import type { ButtonHTMLAttributes } from 'react'
import {
  DkFingerprintBiometricScan
} from '@/icons'
import { AuthProviderButton } from './AuthProviderButton'

type PasskeyButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PasskeyButton({
  loading = false,
  children = 'Continue with Passkey',
  ...rest
}: PasskeyButtonProps) {
  return (
    <AuthProviderButton
      icon={<DkFingerprintBiometricScan size={18} strokeWidth={1.75} absoluteStrokeWidth />}
      loading={loading}
      loadingText="Waiting for passkey…"
      {...rest}
    >
      {children}
    </AuthProviderButton>
  )
}
