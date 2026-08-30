import { useId } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption } from './Text'

export type ProgressVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressTone = 'brand' | 'success' | 'warning' | 'danger'

export const PROGRESS_VARIANTS: ProgressVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const PROGRESS_SIZES: ProgressSize[] = ['sm', 'md', 'lg']
export const PROGRESS_TONES: ProgressTone[] = ['brand', 'success', 'warning', 'danger']

export const PROGRESS_VARIANT_LABEL: Record<ProgressVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const PROGRESS_SIZE_LABEL: Record<ProgressSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const PROGRESS_TONE_LABEL: Record<ProgressTone, string> = {
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

const heights: Record<ProgressSize, { bar: string; pill: string }> = {
  sm: { bar: 'h-1', pill: 'h-2.5' },
  md: { bar: 'h-1.5', pill: 'h-3' },
  lg: { bar: 'h-2', pill: 'h-3.5' },
}

const fillTone: Record<ProgressTone, { solid: string; quiet: string }> = {
  brand: { solid: 'bg-brand-primary', quiet: 'bg-brand-primary-subtle' },
  success: { solid: 'bg-success', quiet: 'bg-success-subtle' },
  warning: { solid: 'bg-warning', quiet: 'bg-warning-subtle' },
  danger: { solid: 'bg-danger', quiet: 'bg-danger-subtle' },
}

function trackChrome(
  variant: ProgressVariant,
  onDark: boolean,
): { track: string; radius: string } {
  const rest = onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary'
  const chrome: Record<ProgressVariant, { track: string; radius: string }> = {
    fill: { track: rest, radius: 'rounded-[980px]' },
    subtle: { track: onDark ? 'bg-[#2c2c2e]' : 'bg-bg-secondary', radius: 'rounded-[980px]' },
    outline: {
      track: cn(
        'border bg-transparent',
        onDark ? 'border-[#48484a]' : 'border-border-default',
      ),
      radius: 'rounded-[980px]',
    },
    ghost: { track: 'bg-transparent', radius: 'rounded-[980px]' },
    pill: { track: rest, radius: 'rounded-[980px]' },
  }
  return chrome[variant]
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value))
}

export function Progress({
  value = 0,
  label,
  variant = 'fill',
  size = 'md',
  tone = 'brand',
  onDark = false,
  indeterminate = false,
  disabled = false,
  showValue,
  formatValue = (next) => `${Math.round(next)}%`,
  className,
}: {
  value?: number
  label?: string
  variant?: ProgressVariant
  size?: ProgressSize
  tone?: ProgressTone
  onDark?: boolean
  indeterminate?: boolean
  disabled?: boolean
  showValue?: boolean
  formatValue?: (value: number) => string
  className?: string
}) {
  const labelId = useId()
  const clamped = clamp(value)
  const percent = Math.round(clamped)
  const paint = fillTone[tone]
  const look = trackChrome(variant, onDark)
  const metric = heights[size]
  const height = variant === 'pill' ? metric.pill : metric.bar
  const fill = variant === 'ghost' ? paint.quiet : paint.solid
  const showPercent = (showValue ?? Boolean(label)) && !indeterminate
  const named = label ?? 'Progress'

  return (
    <div className={cn('w-full', disabled && 'opacity-55', className)}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-4">
          <Caption
            id={labelId}
            as="span"
            tone={onDark ? undefined : 'secondary'}
            className={onDark ? 'text-[#a1a1a6]' : undefined}
          >
            {label}
          </Caption>
          {showPercent ? (
            <Caption
              as="span"
              tone={onDark ? undefined : 'primary'}
              className={cn('tabular-nums', onDark && 'text-white')}
            >
              {formatValue(clamped)}
            </Caption>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn('relative w-full overflow-hidden', height, look.radius, look.track)}
        role="progressbar"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : named}
        aria-valuenow={indeterminate ? undefined : percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={indeterminate ? 'Loading' : `${percent} percent`}
        aria-busy={indeterminate || undefined}
        aria-disabled={disabled || undefined}
      >
        {indeterminate ? (
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-[32%] origin-left',
              look.radius,
              fill,
              'animate-progress-indeterminate',
            )}
          />
        ) : (
          <div
            className={cn(
              'h-full origin-left',
              look.radius,
              fill,
              'transition-[width] duration-300',
              EASE,
            )}
            style={{ width: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  )
}
