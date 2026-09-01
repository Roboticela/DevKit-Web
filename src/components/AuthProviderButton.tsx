'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Loader } from './Loader'

const PROVIDER_LABEL_WIDTH = 'w-[240px]'

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
    <div data-provider-stack="" className={cn('flex w-full min-w-0 flex-col', className)}>
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
  disabled,
  ...rest
}: AuthProviderButtonProps) {
  const busyLabel = loadingText ?? continuingLabel(children)

  return (
    <Button
      type={type}
      variant="action"
      disabled={disabled || loading}
      className={cn('relative', className)}
      {...rest}
    >
      <span
        data-provider-label=""
        className={cn(
          'inline-flex items-center justify-start gap-2 whitespace-nowrap',
          PROVIDER_LABEL_WIDTH,
        )}
      >
        <span className="inline-flex size-5 shrink-0 items-center justify-center [&_img]:block [&_svg]:block">
          {loading ? <Loader decorative size="sm" /> : icon}
        </span>
        {loading ? busyLabel : children}
      </span>
      {lastUsed ? (
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 whitespace-nowrap text-xs font-normal leading-none tracking-[-0.01em] text-text-tertiary dark:text-gray-on-dark">
          Last used
        </span>
      ) : null}
    </Button>
  )
}
