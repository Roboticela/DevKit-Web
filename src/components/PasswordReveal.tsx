'use client'

import type { ButtonHTMLAttributes } from 'react'
import {
  DkVisibilityEyeShown,
  DkVisibilityEyeHidden
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type PasswordRevealVariant = 'ghost' | 'subtle' | 'outline' | 'text' | 'pill'
export type PasswordRevealSize = 'sm' | 'md' | 'lg'

export const PASSWORD_REVEAL_VARIANTS: PasswordRevealVariant[] = [
  'ghost',
  'subtle',
  'outline',
  'text',
  'pill',
]
export const PASSWORD_REVEAL_SIZES: PasswordRevealSize[] = ['sm', 'md', 'lg']

const hits: Record<
  PasswordRevealSize,
  { icon: number; box: string; text: string; pill: string; inset: string; textInset: string }
> = {
  sm: {
    icon: 16,
    box: 'size-7',
    text: 'text-[13px] font-medium',
    pill: 'h-7 gap-1 px-2 text-[12px]',
    inset: 'right-1',
    textInset: 'right-2.5',
  },
  md: {
    icon: 18,
    box: 'size-8',
    text: 'text-[15px] font-medium',
    pill: 'h-7 gap-1.5 px-2.5 text-[13px]',
    inset: 'right-1.5',
    textInset: 'right-3',
  },
  lg: {
    icon: 20,
    box: 'size-9',
    text: 'text-[17px] font-medium',
    pill: 'h-8 gap-1.5 px-3 text-[15px]',
    inset: 'right-2',
    textInset: 'right-3.5',
  },
}

const chrome: Record<PasswordRevealVariant, string> = {
  ghost:
    'rounded-[8px] border-0 bg-transparent text-text-tertiary hover:text-text-primary focus-visible:text-text-primary',
  subtle:
    'rounded-full border-0 bg-bg-tertiary text-text-secondary hover:bg-bg-hover hover:text-text-primary',
  outline:
    'rounded-full border border-border-default bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
  text: 'rounded-[8px] border-0 bg-transparent text-brand-primary hover:text-brand-primary-hover',
  pill: 'rounded-[980px] border-0 bg-bg-tertiary font-medium text-text-secondary hover:bg-bg-hover hover:text-text-primary',
}

const shown: Record<PasswordRevealVariant, string> = {
  ghost: 'text-text-primary',
  subtle: 'bg-bg-hover text-text-primary',
  outline: 'border-brand-primary text-brand-primary',
  text: 'text-brand-primary',
  pill: 'bg-brand-primary-subtle text-brand-primary',
}

export function PasswordReveal({
  visible,
  onToggle,
  variant = 'ghost',
  size = 'md',
  inField = true,
  disabled = false,
  showLabel = 'Show',
  hideLabel = 'Hide',
  className,
  ...rest
}: {
  visible: boolean
  onToggle: () => void
  variant?: PasswordRevealVariant
  size?: PasswordRevealSize
  inField?: boolean
  showLabel?: string
  hideLabel?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>) {
  const metric = hits[size]
  const labeled = variant === 'text' || variant === 'pill'
  const name = visible ? hideLabel : showLabel
  const glyph = {
    size: metric.icon,
    strokeWidth: 1.6,
    absoluteStrokeWidth: true as const,
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center',
        'transition-[color,background-color,border-color] duration-150',
        EASE,
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-55',
        variant === 'text' ? metric.text : variant === 'pill' ? metric.pill : metric.box,
        chrome[variant],
        visible && shown[variant],
        inField && 'absolute top-1/2 z-[2] -translate-y-1/2',
        inField && (labeled ? metric.textInset : metric.inset),
        className,
      )}
      {...rest}
      disabled={disabled}
      aria-label={visible ? 'Hide password' : 'Show password'}
      aria-pressed={visible}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onToggle}
    >
      {variant === 'text' ? (
        name
      ) : (
        <>
          {visible ? (
            <DkVisibilityEyeHidden {...glyph} />
          ) : (
            <DkVisibilityEyeShown {...glyph} />
          )}
          {variant === 'pill' ? <span>{name}</span> : null}
        </>
      )}
    </button>
  )
}
