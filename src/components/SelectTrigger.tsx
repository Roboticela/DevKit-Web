'use client'

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import {
  DkChevronCaretDown
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE, FIELD_INVALID, FIELD_VALID, FOCUS_VISIBLE_RING, OPEN_RING } from '@/lib/styles'

export type SelectTriggerVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'
export type SelectTriggerSize = 'sm' | 'md' | 'lg'

export const SELECT_VARIANTS: SelectTriggerVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const SELECT_SIZES: SelectTriggerSize[] = ['sm', 'md', 'lg']

const sizes: Record<SelectTriggerSize, { field: string; chevron: number; radius: string }> = {
  sm: {
    field: 'h-9 gap-2 px-3 pr-2.5 text-[13px]',
    chevron: 14,
    radius: 'rounded-[10px]',
  },
  md: {
    field: 'h-11 gap-3 px-4 pr-3.5 text-[15px]',
    chevron: 16,
    radius: 'rounded-[12px]',
  },
  lg: {
    field: 'h-[50px] gap-3 px-5 pr-4 text-[17px]',
    chevron: 18,
    radius: 'rounded-[12px]',
  },
}

const chrome: Record<SelectTriggerVariant, { rest: string; hover: string; hoverPreview: string; radius?: string }> = {
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    hoverPreview: 'border-border-strong',
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    hoverPreview: 'bg-bg-hover',
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    hoverPreview: 'bg-bg-hover',
  },
  underline: {
    rest: 'rounded-none border-0 border-b border-border-default bg-transparent',
    hover: 'hover:border-border-strong',
    hoverPreview: 'border-border-strong',
    radius: 'rounded-none',
  },
  pill: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    hoverPreview: 'border-border-strong',
    radius: 'rounded-[980px]',
  },
}

const openLook: Record<SelectTriggerVariant, string> = {
  outline: OPEN_RING,
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  underline: 'border-brand-primary',
  pill: OPEN_RING,
}

type SelectTriggerProps = {
  open?: boolean
  leading?: ReactNode
  placeholder?: boolean
  children: ReactNode
  chevronSize?: number
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  invalid?: boolean
  valid?: boolean
  preview?: 'hover' | 'open'
  ref?: Ref<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SelectTrigger({
  open = false,
  leading,
  placeholder = false,
  children,
  chevronSize,
  variant = 'outline',
  size = 'md',
  invalid = false,
  valid = false,
  preview,
  className,
  ref,
  ...rest
}: SelectTriggerProps) {
  const metric = sizes[size]
  const look = chrome[variant]
  const error = invalid && !rest.disabled
  const ok = valid && !invalid && !rest.disabled
  const radius = look.radius ?? metric.radius
  const isOpen = open || preview === 'open'
  const isHover = preview === 'hover' && !isOpen

  return (
    <button
      type="button"
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'flex w-full min-w-0 cursor-pointer items-center text-left font-sans font-normal text-text-primary',
        'box-border transition-[border-color,background-color,box-shadow] duration-150',
        EASE,
        'disabled:cursor-not-allowed disabled:opacity-55',
        metric.field,
        radius,
        look.rest,
        !error && !ok && !isOpen && look.hover,
        isHover && !error && !ok && look.hoverPreview,
        !error && !ok && !isOpen && FOCUS_VISIBLE_RING,
        isOpen && !error && !ok && openLook[variant],
        error && FIELD_INVALID,
        ok && FIELD_VALID,
        className,
      )}
      {...rest}
    >
      {leading ? (
        <span className="inline-flex shrink-0 items-center justify-center text-text-tertiary">
          {leading}
        </span>
      ) : null}
      <span
        className={cn(
          'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap',
          placeholder && 'text-text-tertiary',
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'inline-flex shrink-0 text-text-tertiary transition-transform duration-200',
          EASE,
          isOpen && 'rotate-180',
        )}
        aria-hidden="true"
      >
        <DkChevronCaretDown size={chevronSize ?? metric.chevron} strokeWidth={1.75} absoluteStrokeWidth />
      </span>
    </button>
  )
}
