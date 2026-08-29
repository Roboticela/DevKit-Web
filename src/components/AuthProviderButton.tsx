'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

function continuingLabel(children: ReactNode) {
  if (typeof children === 'string') {
    const match = children.match(/^Continue with (.+)$/i)
    if (match) return `Continuing with ${match[1].replace(/…$/, '')}…`
  }
  return 'Continuing…'
}

export function AuthProviderStack({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div data-provider-stack="" className={cn('w-full min-w-0', className)}>
      {children}
    </div>
  )
}

export type AuthProviderButtonProps = {
  icon: ReactNode
  loading?: boolean
  loadingText?: string
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AuthProviderButton({
  icon,
  loading = false,
  loadingText,
  lastUsed = false,
  className,
  children,
  type = 'button',
  ...rest
}: AuthProviderButtonProps) {
  return (
    <Button
      type={type}
      variant="action"
      loading={loading}
      loadingText={loadingText ?? continuingLabel(children)}
      leading={icon}
      className={cn('relative', lastUsed && 'pr-24', className)}
      trailing={
        lastUsed ? (
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 whitespace-nowrap text-xs font-normal leading-none tracking-[-0.01em] text-text-tertiary dark:text-gray-on-dark">
            Last used
          </span>
        ) : undefined
      }
      {...rest}
    >
      {children}
    </Button>
  )
}
