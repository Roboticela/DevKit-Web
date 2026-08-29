'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { ButtonLabel, ButtonSpinner } from './ButtonLabel'

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
  disabled,
  children,
  type = 'button',
  ...rest
}: AuthProviderButtonProps) {
  const status = loadingText ?? continuingLabel(children)

  return (
    <button
      type={type}
      className={cn(
        'relative grid h-11 w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center rounded-[980px] border border-border-default bg-bg-elevated px-4 font-sans text-[17px] font-medium leading-none text-text-primary',
        'dark:border-border-strong dark:bg-bg-secondary',
        'transition-[background-color,border-color] duration-150',
        EASE,
        'hover:border-text-tertiary',
        'disabled:cursor-not-allowed disabled:opacity-55',
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span className="col-start-2 flex w-full items-center justify-start gap-2.5">
        <span className="inline-flex size-5 shrink-0 items-center justify-center">
          {loading ? <ButtonSpinner size={18} /> : icon}
        </span>
        <span className="min-w-0 text-left whitespace-nowrap text-[17px] font-medium leading-none text-text-primary">
          <ButtonLabel loading={false}>{loading ? status : children}</ButtonLabel>
        </span>
      </span>
      {lastUsed ? (
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 whitespace-nowrap text-xs font-normal leading-none tracking-[-0.01em] text-text-tertiary dark:text-gray-on-dark">
          Last used
        </span>
      ) : null}
    </button>
  )
}
