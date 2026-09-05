import { type MouseEventHandler, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { highlightCode, type HighlightInk } from '@/lib/highlight-code'
import { EASE, FOCUS_VISIBLE_RING } from '@/lib/styles'
import {
  STACK_SIZES,
  STACK_SIZE_LABEL,
  STACK_TONES,
  STACK_TONE_LABEL,
  STACK_VARIANTS,
  STACK_VARIANT_LABEL,
  type StackPreview,
  type StackSize,
  type StackTone,
  type StackVariant,
} from './Stack'

export type InlineCodeVariant = StackVariant
export type InlineCodeSize = StackSize
export type InlineCodeTone = StackTone
export type InlineCodePreview = StackPreview

export const INLINE_CODE_VARIANTS = STACK_VARIANTS
export const INLINE_CODE_SIZES = STACK_SIZES
export const INLINE_CODE_TONES = STACK_TONES

export const INLINE_CODE_VARIANT_LABEL = STACK_VARIANT_LABEL
export const INLINE_CODE_SIZE_LABEL = STACK_SIZE_LABEL
export const INLINE_CODE_TONE_LABEL = STACK_TONE_LABEL

export type InlineCodeProps = {
  code?: string
  children?: ReactNode
  variant?: InlineCodeVariant
  size?: InlineCodeSize
  tone?: InlineCodeTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: InlineCodePreview
  onDark?: boolean
  className?: string
}

const typeSize: Record<InlineCodeSize, string> = {
  sm: 'text-[12px] leading-[1.33]',
  md: 'text-[13px] leading-[1.6]',
  lg: 'text-[15px] leading-[1.47]',
}

const pad: Record<InlineCodeSize, string> = {
  sm: 'px-1 py-px',
  md: 'px-1.5 py-0.5',
  lg: 'px-2 py-1',
}

const lightChrome: Record<InlineCodeVariant, Record<InlineCodeTone, string>> = {
  fill: {
    default: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    brand: 'border border-transparent bg-brand-primary',
    success: 'border border-transparent bg-success',
    warning: 'border border-transparent bg-warning',
    danger: 'border border-transparent bg-danger',
  },
  subtle: {
    default: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
  },
  outline: {
    default: 'border border-border-default bg-transparent',
    brand: 'border border-brand-primary/30 bg-transparent',
    success: 'border border-success/30 bg-transparent',
    warning: 'border border-warning/30 bg-transparent',
    danger: 'border border-border-danger bg-transparent',
  },
  ghost: {
    default: 'border border-transparent bg-transparent',
    brand: 'border border-transparent bg-transparent',
    success: 'border border-transparent bg-transparent',
    warning: 'border border-transparent bg-transparent',
    danger: 'border border-transparent bg-transparent',
  },
  pill: {
    default: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
  },
}

const darkChrome: Record<InlineCodeVariant, Record<InlineCodeTone, string>> = {
  fill: {
    default: 'border border-[#38383a] bg-[#1c1c1e]',
    brand: 'border border-transparent bg-[#3b9eff]',
    success: 'border border-transparent bg-[#30d158]',
    warning: 'border border-transparent bg-[#ff9f0a]',
    danger: 'border border-transparent bg-[#ff453a]',
  },
  subtle: {
    default: 'border border-transparent bg-[#2c2c2e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
  },
  outline: {
    default: 'border border-[#48484a] bg-transparent',
    brand: 'border border-[rgba(59,158,255,0.30)] bg-transparent',
    success: 'border border-[rgba(48,209,88,0.30)] bg-transparent',
    warning: 'border border-[rgba(255,159,10,0.30)] bg-transparent',
    danger: 'border border-[rgba(255,69,58,0.30)] bg-transparent',
  },
  ghost: {
    default: 'border border-transparent bg-transparent',
    brand: 'border border-transparent bg-transparent',
    success: 'border border-transparent bg-transparent',
    warning: 'border border-transparent bg-transparent',
    danger: 'border border-transparent bg-transparent',
  },
  pill: {
    default: 'border border-transparent bg-[#1c1c1e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
  },
}

function surfaceChrome(
  variant: InlineCodeVariant,
  tone: InlineCodeTone,
  onDark: boolean,
  preview?: InlineCodePreview,
  picked?: boolean,
) {
  if (picked) {
    return onDark
      ? 'border border-[rgba(59,158,255,0.30)] bg-[rgba(59,158,255,0.15)]'
      : 'border border-brand-primary bg-brand-primary-subtle'
  }

  if (preview === 'focus') {
    return onDark ? 'border border-brand-primary bg-[#1c1c1e]' : 'border border-brand-primary bg-bg-elevated'
  }

  const rest = onDark ? darkChrome[variant][tone] : lightChrome[variant][tone]
  if (tone !== 'default') return rest

  if (onDark) {
    if (preview === 'hover') return 'border border-transparent bg-[#2c2c2e]'
    if (preview === 'active') return 'border border-transparent bg-[#3a3a3c]'
    return rest
  }

  if (variant === 'outline') {
    if (preview === 'hover' || preview === 'active') return 'border border-border-strong bg-transparent'
    return rest
  }

  if (preview === 'hover') {
    return variant === 'fill'
      ? 'border border-border-default bg-bg-hover dark:bg-bg-active'
      : 'border border-transparent bg-bg-hover dark:bg-bg-active'
  }
  if (preview === 'active') {
    return variant === 'fill'
      ? 'border border-border-default bg-bg-active'
      : 'border border-transparent bg-bg-active'
  }
  return rest
}

function inkFor(
  variant: InlineCodeVariant,
  tone: InlineCodeTone,
  onDark: boolean,
  picked: boolean,
): HighlightInk {
  if (onDark) return 'on-dark'
  if (picked) return 'default'
  if (variant === 'fill' && tone !== 'default') return 'on-brand'
  return 'default'
}

export function InlineCode({
  code,
  children,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  selected = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  fullHeight = false,
  href,
  onClick,
  preview,
  onDark = false,
  className,
}: InlineCodeProps) {
  const busy = loading || preview === 'loading'
  const inert = disabled || preview === 'disabled'
  const picked = selected || preview === 'selected'
  const interactive = !inert && !busy && !preview && Boolean(href || onClick)
  const painted = variant !== 'ghost' || tone !== 'default' || picked || Boolean(preview) || onDark
  const radius = variant === 'pill' ? 'rounded-full' : 'rounded-[8px]'
  const source = code ?? (typeof children === 'string' ? children : undefined)
  const ink = inkFor(variant, tone, onDark, picked)

  const frame = cn(
    'inline-flex max-w-full min-w-0 align-baseline font-mono antialiased',
    typeSize[size],
    fullWidth ? 'w-full' : 'w-fit',
    fullHeight && 'h-full items-center',
    painted && radius,
    painted && variant !== 'ghost' && pad[size],
    painted && surfaceChrome(variant, tone, onDark, preview, picked),
    painted && 'transition-colors duration-150',
    painted && EASE,
    interactive && 'cursor-pointer no-underline',
    interactive && FOCUS_VISIBLE_RING,
    preview === 'focus' && 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    inert && 'opacity-55',
    inert && (href || onClick) && 'cursor-not-allowed',
    className,
  )

  const inner = busy ? (
    <span
      data-dk-skeleton-bone
      className={cn(
        'inline-block h-[1em] w-16 rounded-[4px]',
        onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active',
        'animate-pulse motion-reduce:animate-none',
      )}
    />
  ) : source != null ? (
    highlightCode(source, ink)
  ) : (
    children
  )

  const a11y = {
    'aria-busy': busy || undefined,
    'aria-disabled': inert || undefined,
    'aria-pressed': onClick && picked ? true : undefined,
    'aria-current': href && picked ? ('page' as const) : undefined,
  }

  if (href && interactive) {
    return (
      <a href={href} onClick={onClick} className={frame} {...a11y}>
        {inner}
      </a>
    )
  }

  if (onClick && interactive) {
    return (
      <button type="button" onClick={onClick} className={frame} {...a11y}>
        {inner}
      </button>
    )
  }

  return (
    <code className={frame} {...a11y}>
      {inner}
    </code>
  )
}

InlineCode.displayName = 'InlineCode'
