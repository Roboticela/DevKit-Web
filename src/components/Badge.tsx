'use client'

import type { MouseEvent, ReactNode } from 'react'
import { DkCloseDismissCancel } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Loader } from './Loader'

export type BadgeVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeTone =
  | 'brand'
  | 'verified'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'primary'
  | 'unverified'
  | 'muted'
export type BadgeShape = 'pill' | 'rounded'

export const BADGE_VARIANTS: BadgeVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const BADGE_SIZES: BadgeSize[] = ['sm', 'md', 'lg']
export const BADGE_TONES: Exclude<BadgeTone, 'primary' | 'unverified' | 'muted'>[] = [
  'brand',
  'verified',
  'success',
  'warning',
  'danger',
  'neutral',
]
export const BADGE_SHAPES: BadgeShape[] = ['pill', 'rounded']

export const BADGE_VARIANT_LABEL: Record<BadgeVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const BADGE_SIZE_LABEL: Record<BadgeSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const BADGE_TONE_LABEL: Record<(typeof BADGE_TONES)[number], string> = {
  brand: 'Brand',
  verified: 'Verified',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  neutral: 'Neutral',
}

export const BADGE_SHAPE_LABEL: Record<BadgeShape, string> = {
  pill: 'Pill',
  rounded: 'Rounded',
}

type CanonicalTone = (typeof BADGE_TONES)[number]

const TONE_ALIAS: Record<string, CanonicalTone> = {
  primary: 'brand',
  unverified: 'warning',
  muted: 'neutral',
}

function resolveTone(tone: BadgeTone): CanonicalTone {
  return TONE_ALIAS[tone] ?? (tone as CanonicalTone)
}

const PAINT: Record<
  CanonicalTone,
  { solid: string; wash: string; line: string; ink: string }
> = {
  brand: {
    solid: 'bg-brand-primary text-text-on-brand',
    wash: 'bg-brand-primary-subtle text-brand-primary',
    line: 'border-brand-primary/30 text-brand-primary',
    ink: 'text-brand-primary',
  },
  verified: {
    solid: 'bg-accent-teal text-text-on-brand',
    wash: 'bg-accent-teal-subtle text-accent-teal',
    line: 'border-accent-teal/30 text-accent-teal',
    ink: 'text-accent-teal',
  },
  success: {
    solid: 'bg-success text-text-on-brand',
    wash: 'bg-success-subtle text-success',
    line: 'border-success/30 text-success',
    ink: 'text-success',
  },
  warning: {
    solid: 'bg-warning text-text-on-brand',
    wash: 'bg-warning-subtle text-warning',
    line: 'border-warning/30 text-warning',
    ink: 'text-warning',
  },
  danger: {
    solid: 'bg-danger text-text-on-brand',
    wash: 'bg-danger-subtle text-danger',
    line: 'border-danger/30 text-danger',
    ink: 'text-danger',
  },
  neutral: {
    solid: 'bg-bg-tertiary text-text-primary dark:bg-bg-active',
    wash: 'bg-bg-tertiary text-text-secondary',
    line: 'border-border-default text-text-secondary',
    ink: 'text-text-secondary',
  },
}

function chromeFor(variant: BadgeVariant, tone: CanonicalTone): string {
  const paint = PAINT[tone]
  const chrome: Record<BadgeVariant, string> = {
    fill: cn('border border-transparent', paint.solid),
    subtle: cn('border border-transparent', paint.wash),
    outline: cn('border bg-transparent', paint.line),
    ghost: cn('border border-transparent bg-transparent', paint.ink),
    pill: cn('border border-transparent', paint.wash),
  }
  return chrome[variant]
}

const SIZES: Record<
  BadgeSize,
  {
    label: string
    pill: string
    type: string
    gap: string
    icon: number
    dot: string
    close: string
    radius: string
    count: string
  }
> = {
  sm: {
    label: 'h-[18px] px-1.5',
    pill: 'h-5 px-2',
    type: 'text-[10px]',
    gap: 'gap-1',
    icon: 10,
    dot: 'size-1.5',
    close: 'size-3.5',
    radius: 'rounded-[6px]',
    count: 'h-[18px] min-w-[18px] px-1',
  },
  md: {
    label: 'h-[22px] px-2',
    pill: 'h-6 px-2.5',
    type: 'text-[11px]',
    gap: 'gap-1',
    icon: 12,
    dot: 'size-2',
    close: 'size-4',
    radius: 'rounded-[8px]',
    count: 'h-[22px] min-w-[22px] px-1.5',
  },
  lg: {
    label: 'h-[26px] px-2.5',
    pill: 'h-7 px-3',
    type: 'text-[13px]',
    gap: 'gap-1.5',
    icon: 14,
    dot: 'size-2',
    close: 'size-[18px]',
    radius: 'rounded-[10px]',
    count: 'h-[26px] min-w-[26px] px-1.5',
  },
}

export function formatBadgeCount(value: number | string, max = 99) {
  if (typeof value === 'number') return value > max ? `${max}+` : String(value)
  return value
}

export function Badge({
  children,
  variant = 'subtle',
  size = 'md',
  tone = 'brand',
  shape = 'pill',
  icon,
  dot = false,
  pulse = false,
  count,
  max = 99,
  loading = false,
  disabled = false,
  onDismiss,
  dismissLabel = 'Remove',
  onClick,
  label,
  className,
}: {
  children?: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  tone?: BadgeTone
  shape?: BadgeShape
  icon?: ReactNode
  dot?: boolean
  pulse?: boolean
  count?: number | string
  max?: number
  loading?: boolean
  disabled?: boolean
  onDismiss?: () => void
  dismissLabel?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  label?: string
  className?: string
}) {
  const canonical = resolveTone(tone)
  const metric = SIZES[size]
  const showCount = count != null && count !== 0 && count !== '0'
  const countText = showCount ? formatBadgeCount(count, max) : null
  const countOnly = showCount
  const content = countOnly ? countText : children
  const dotOnly = Boolean(dot) && content == null && !icon && !loading && !onDismiss
  const interactive = Boolean(onClick) && !disabled
  const radius = shape === 'rounded' && !dotOnly ? metric.radius : 'rounded-[980px]'
  const pad = countOnly ? metric.count : variant === 'pill' ? metric.pill : metric.label
  const accessible =
    label ??
    (dotOnly
      ? `${BADGE_TONE_LABEL[canonical].toLowerCase()} status`
      : countOnly
        ? (countText ?? undefined)
        : undefined)
  const loaderTone =
    canonical === 'brand'
      ? 'brand'
      : canonical === 'danger'
        ? 'danger'
        : canonical === 'warning'
          ? 'warning'
          : canonical === 'success'
            ? 'success'
            : 'default'

  const inner = (
    <>
      {loading ? (
        <Loader
          decorative
          size={metric.icon}
          tone={loaderTone}
          onDark={variant === 'fill' && canonical !== 'neutral'}
        />
      ) : dot || pulse ? (
        <span className={cn('relative inline-flex shrink-0', metric.dot)}>
          {pulse ? (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-current opacity-35 motion-reduce:animate-none"
              aria-hidden
            />
          ) : null}
          <span className="relative block size-full rounded-full bg-current" aria-hidden />
        </span>
      ) : icon ? (
        <span
          className="inline-flex shrink-0 items-center justify-center [&_svg]:size-[1em]"
          style={{ fontSize: metric.icon }}
        >
          {icon}
        </span>
      ) : null}
      {content != null ? <span className="min-w-0 truncate">{content}</span> : null}
      {onDismiss ? (
        <button
          type="button"
          aria-label={dismissLabel}
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation()
            if (disabled) return
            onDismiss()
          }}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 text-current',
            'opacity-70 transition-opacity duration-150',
            EASE,
            metric.close,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-100',
            'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-primary',
          )}
        >
          <DkCloseDismissCancel size={metric.icon - 2} strokeWidth={2.5} absoluteStrokeWidth aria-hidden />
        </button>
      ) : null}
    </>
  )

  const box = cn(
    'inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap font-medium leading-none',
    metric.type,
    metric.gap,
    radius,
    dotOnly ? PAINT[canonical].ink : chromeFor(variant, canonical),
    dotOnly ? metric.dot : pad,
    countOnly && 'tabular-nums',
    loading && 'cursor-wait',
    disabled && 'cursor-not-allowed opacity-55',
    interactive &&
      cn(
        'cursor-pointer select-none transition-colors duration-150',
        EASE,
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
      ),
    className,
  )

  if (interactive) {
    return (
      <button
        type="button"
        aria-label={accessible}
        aria-busy={loading || undefined}
        disabled={disabled}
        onClick={onClick}
        className={box}
      >
        {inner}
      </button>
    )
  }

  return (
    <span aria-label={accessible} aria-busy={loading || undefined} className={box}>
      {inner}
    </span>
  )
}
