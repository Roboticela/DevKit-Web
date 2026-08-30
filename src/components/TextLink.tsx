import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Anchor } from './Anchor'
import { Body, Caption } from './Text'

type TextLinkProps = {
  children: ReactNode
  muted?: boolean
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export function TextLink({ children, muted = false, className, href, ...rest }: TextLinkProps) {
  return (
    <Anchor
      href={href}
      variant={muted ? 'subtle' : 'inline'}
      className={className}
      {...rest}
    >
      {children}
    </Anchor>
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
