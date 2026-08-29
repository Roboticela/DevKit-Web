import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Caption } from './Text'

type TextLinkProps = {
  children: ReactNode
  muted?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function TextLink({ children, muted = false, className, ...rest }: TextLinkProps) {
  return (
    <a
      className={cn(
        'font-sans no-underline',
        muted
          ? 'text-text-tertiary hover:text-brand-primary'
          : 'text-brand-primary hover:underline',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

export function AuthLegal({ className }: { className?: string }) {
  return (
    <Caption align="center" tone="secondary" className={cn('mt-6', className)}>
      By continuing, you agree to our <TextLink href="#terms">Terms</TextLink> and{' '}
      <TextLink href="#privacy">Privacy Policy</TextLink>
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
