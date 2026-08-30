import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Anchor } from './Anchor'
import { Body, Caption } from './Text'

export function AuthLegal({ className }: { className?: string }) {
  return (
    <Caption align="center" tone="secondary" className={cn('mt-6', className)}>
      By continuing, you agree to our <Anchor href="#terms">Terms</Anchor> and{' '}
      <Anchor href="#privacy">Privacy Policy</Anchor>
    </Caption>
  )
}

export function ErrorText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Body size="sm" align="center" tone="danger" className={cn('mt-4', className)}>
      {children}
    </Body>
  )
}

export function StatusText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Body size="sm" align="center" className={cn('mt-4', className)}>
      {children}
    </Body>
  )
}
