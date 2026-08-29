'use client'

import type { ButtonHTMLAttributes } from 'react'
import { DkGithubOctocatBrandLogo } from '@/icons'
import { AuthProviderButton } from './AuthProviderButton'

type GitHubButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function GitHubButton({
  children = 'Continue with GitHub',
  ...rest
}: GitHubButtonProps) {
  return (
    <AuthProviderButton icon={<DkGithubOctocatBrandLogo size={18} />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
