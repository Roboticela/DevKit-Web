'use client'

import type { ButtonHTMLAttributes } from 'react'
import { AuthProviderButton } from './AuthProviderButton'
import { GitHubMark } from './GitHubMark'

type GitHubButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function GitHubButton({
  children = 'Continue with GitHub',
  ...rest
}: GitHubButtonProps) {
  return (
    <AuthProviderButton icon={<GitHubMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
