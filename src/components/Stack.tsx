import { type MouseEventHandler, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_VISIBLE_RING } from '@/lib/styles'
import {
  CARD_SIZES,
  CARD_SIZE_LABEL,
  CARD_TONES,
  CARD_TONE_LABEL,
  CARD_VARIANTS,
  CARD_VARIANT_LABEL,
  type CardPreview,
  type CardSize,
  type CardTone,
  type CardVariant,
} from './Card'

export type StackVariant = CardVariant
export type StackSize = CardSize
export type StackTone = CardTone
export type StackPreview = CardPreview
export type StackDirection = 'vertical' | 'horizontal'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between'
export type StackGap = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const STACK_VARIANTS = CARD_VARIANTS
export const STACK_SIZES = CARD_SIZES
export const STACK_TONES = CARD_TONES
export const STACK_DIRECTIONS: StackDirection[] = ['vertical', 'horizontal']
export const STACK_ALIGNS: StackAlign[] = ['start', 'center', 'end', 'stretch']
export const STACK_JUSTIFIES: StackJustify[] = ['start', 'center', 'end', 'between']
export const STACK_GAPS: StackGap[] = ['sm', 'md', 'lg', 'xl', '2xl']

export const STACK_VARIANT_LABEL = CARD_VARIANT_LABEL
export const STACK_SIZE_LABEL = CARD_SIZE_LABEL
export const STACK_TONE_LABEL = CARD_TONE_LABEL
export const STACK_DIRECTION_LABEL: Record<StackDirection, string> = {
  vertical: 'Vertical',
  horizontal: 'Horizontal',
}
export const STACK_ALIGN_LABEL: Record<StackAlign, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
  stretch: 'Stretch',
}
export const STACK_JUSTIFY_LABEL: Record<StackJustify, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
  between: 'Between',
}
export const STACK_GAP_LABEL: Record<StackGap, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra large',
  '2xl': '2X large',
}

export type StackProps = {
  children?: ReactNode
  variant?: StackVariant
  size?: StackSize
  tone?: StackTone
  direction?: StackDirection
  align?: StackAlign
  justify?: StackJustify
  gap?: StackGap
  wrap?: boolean
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: StackPreview
  onDark?: boolean
  className?: string
}

const pad: Record<StackSize, string> = {
  sm: 'p-4',
  md: 'p-5 min-[735px]:p-6',
  lg: 'p-6 min-[735px]:p-8',
}

const gapClass: Record<StackGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
}

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyClass: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
}

const lightChrome: Record<StackVariant, Record<StackTone, string>> = {
  fill: {
    default: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
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

const darkChrome: Record<StackVariant, Record<StackTone, string>> = {
  fill: {
    default: 'border border-[#38383a] bg-[#1c1c1e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
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
  variant: StackVariant,
  tone: StackTone,
  onDark: boolean,
  preview?: StackPreview,
  picked?: boolean,
) {
  if (picked) {
    return onDark
      ? 'border border-[rgba(59,158,255,0.30)] bg-[rgba(59,158,255,0.15)]'
      : 'border border-brand-primary bg-brand-primary-subtle'
  }

  if (preview === 'focus') {
    if (onDark) {
      return variant === 'fill' || variant === 'subtle' || variant === 'pill'
        ? 'border border-brand-primary bg-[#1c1c1e]'
        : 'border border-brand-primary bg-transparent'
    }
    if (variant === 'fill') return 'border border-brand-primary bg-bg-elevated dark:bg-bg-secondary'
    if (variant === 'outline' || variant === 'ghost') return 'border border-brand-primary bg-transparent'
    return 'border border-brand-primary bg-bg-secondary dark:bg-bg-tertiary'
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

function Bone({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span
      data-dk-skeleton-bone
      className={cn(
        'inline-block h-10 w-full rounded-[8px]',
        onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active',
        'animate-pulse motion-reduce:animate-none',
        className,
      )}
    />
  )
}

export function Stack({
  children,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  gap = 'md',
  wrap = false,
  selected = false,
  loading = false,
  disabled = false,
  fullWidth = true,
  fullHeight = false,
  href,
  onClick,
  preview,
  onDark = false,
  className,
}: StackProps) {
  const busy = loading || preview === 'loading'
  const inert = disabled || preview === 'disabled'
  const picked = selected || preview === 'selected'
  const interactive = !inert && !busy && !preview && Boolean(href || onClick)
  const painted = variant !== 'ghost' || tone !== 'default' || picked || Boolean(preview) || onDark
  const radius = variant === 'pill' ? 'rounded-[24px]' : 'rounded-[18px]'

  const frame = cn(
    'flex appearance-none text-start font-sans text-inherit antialiased',
    direction === 'vertical' ? 'flex-col' : 'flex-row',
    wrap && 'flex-wrap',
    alignClass[align],
    justifyClass[justify],
    gapClass[gap],
    fullWidth ? 'w-full min-w-0' : 'w-fit max-w-full',
    fullHeight && 'h-full',
    painted && radius,
    painted && surfaceChrome(variant, tone, onDark, preview, picked),
    painted && variant !== 'ghost' && pad[size],
    painted && 'transition-colors duration-150',
    painted && EASE,
    interactive && 'cursor-pointer no-underline',
    interactive && FOCUS_VISIBLE_RING,
    interactive &&
      tone === 'default' &&
      !onDark &&
      (variant === 'outline' ? 'hover:border-border-strong' : 'hover:bg-bg-hover dark:hover:bg-bg-active'),
    interactive && tone === 'default' && onDark && 'hover:bg-[#2c2c2e]',
    preview === 'focus' && 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    inert && 'opacity-55',
    inert && (href || onClick) && 'cursor-not-allowed',
    className,
  )

  const inner = busy ? (
    <>
      <Bone onDark={onDark} className="max-w-[180px]" />
      <Bone onDark={onDark} />
      <Bone onDark={onDark} className="max-w-[220px]" />
    </>
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
    <div className={frame} {...a11y}>
      {inner}
    </div>
  )
}

Stack.displayName = 'Stack'
