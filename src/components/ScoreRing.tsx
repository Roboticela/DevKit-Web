import { useId, type ReactNode } from 'react'
import { DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption } from './Text'

export type ScoreRingVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type ScoreRingSize = 'sm' | 'md' | 'lg'
export type ScoreRingTone = 'brand' | 'success' | 'warning' | 'danger'

export const SCORE_RING_VARIANTS: ScoreRingVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const SCORE_RING_SIZES: ScoreRingSize[] = ['sm', 'md', 'lg']
export const SCORE_RING_TONES: ScoreRingTone[] = ['brand', 'success', 'warning', 'danger']

export const SCORE_RING_VARIANT_LABEL: Record<ScoreRingVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SCORE_RING_SIZE_LABEL: Record<ScoreRingSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const SCORE_RING_TONE_LABEL: Record<ScoreRingTone, string> = {
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

const metrics: Record<
  ScoreRingSize,
  { size: number; stroke: number; pill: number; type: string; percent: string; icon: number }
> = {
  sm: {
    size: 48,
    stroke: 3.5,
    pill: 6,
    type: 'text-[12px] font-semibold tracking-normal',
    percent: 'text-[8px]',
    icon: 14,
  },
  md: {
    size: 72,
    stroke: 5.5,
    pill: 8.5,
    type: 'text-[20px] font-semibold tracking-[-0.015em]',
    percent: 'text-[11px]',
    icon: 20,
  },
  lg: {
    size: 96,
    stroke: 7,
    pill: 11,
    type: 'text-[28px] font-semibold tracking-[-0.005em]',
    percent: 'text-[15px]',
    icon: 28,
  },
}

const paint: Record<ScoreRingTone, { solid: string; quiet: string; tint: string; icon: string }> = {
  brand: {
    solid: 'stroke-brand-primary',
    quiet: 'stroke-brand-primary/45',
    tint: 'stroke-brand-primary/20',
    icon: 'text-brand-primary',
  },
  success: {
    solid: 'stroke-success',
    quiet: 'stroke-success/45',
    tint: 'stroke-success/20',
    icon: 'text-success',
  },
  warning: {
    solid: 'stroke-warning',
    quiet: 'stroke-warning/45',
    tint: 'stroke-warning/20',
    icon: 'text-warning',
  },
  danger: {
    solid: 'stroke-danger',
    quiet: 'stroke-danger/45',
    tint: 'stroke-danger/20',
    icon: 'text-danger',
  },
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value))
}

function trackClass(variant: ScoreRingVariant, onDark: boolean, tone: ScoreRingTone): string | null {
  if (variant === 'ghost') return null
  if (variant === 'subtle') return paint[tone].tint
  if (variant === 'outline') return onDark ? 'stroke-[#48484a]' : 'stroke-border-default'
  return onDark ? 'stroke-[#3a3a3c]' : 'stroke-bg-tertiary'
}

export function ScoreRing({
  score = 0,
  label,
  variant = 'fill',
  size = 'md',
  tone = 'brand',
  onDark = false,
  indeterminate = false,
  disabled = false,
  showValue,
  showCheck = false,
  formatValue,
  children,
  className,
}: {
  score?: number
  label?: string
  variant?: ScoreRingVariant
  size?: ScoreRingSize
  tone?: ScoreRingTone
  onDark?: boolean
  indeterminate?: boolean
  disabled?: boolean
  showValue?: boolean
  showCheck?: boolean
  formatValue?: (value: number) => string
  children?: ReactNode
  className?: string
}) {
  const labelId = useId()
  const metric = metrics[size]
  const diameter = metric.size
  const stroke = variant === 'pill' ? metric.pill : metric.stroke
  const radius = (diameter - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = clamp(score)
  const progress = clamped / 100
  const complete = !indeterminate && progress >= 1
  const offset = indeterminate ? circumference * 0.72 : complete ? 0 : circumference * (1 - progress)
  const cx = diameter / 2
  const track = trackClass(variant, onDark, tone)
  const arc = variant === 'ghost' ? paint[tone].quiet : paint[tone].solid
  const named = label ?? 'Score'
  const showPercent = (showValue ?? true) && !indeterminate && !children
  const showDone = showCheck && complete && !children && (showValue ?? true)
  const customMetric = Boolean(formatValue) && showPercent && !showDone

  return (
    <div className={cn('inline-flex flex-col items-center', disabled && 'opacity-55', className)}>
      <div
        className="relative"
        style={{ width: diameter, height: diameter }}
        role="progressbar"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : named}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={indeterminate ? 'Loading' : `${Math.round(clamped)} percent`}
        aria-busy={indeterminate || undefined}
        aria-disabled={disabled || undefined}
      >
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          className={cn(
            'block origin-center',
            indeterminate && 'animate-btn-spin motion-reduce:animate-none',
          )}
          aria-hidden
        >
          {track ? (
            <circle
              cx={cx}
              cy={cx}
              r={radius}
              fill="none"
              strokeWidth={variant === 'outline' ? Math.max(1.5, stroke * 0.35) : stroke}
              className={track}
            />
          ) : null}
          <circle
            cx={cx}
            cy={cx}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={indeterminate || !complete ? circumference : undefined}
            strokeDashoffset={indeterminate || !complete ? offset : undefined}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cx})`}
            className={cn(
              arc,
              !indeterminate && 'transition-[stroke-dashoffset] duration-[400ms]',
              !indeterminate && EASE,
            )}
          />
        </svg>
        {children || showDone || showPercent ? (
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center leading-none tabular-nums',
              metric.type,
              onDark ? 'text-white' : 'text-text-primary',
            )}
          >
            {children ? (
              children
            ) : showDone ? (
              <DkTaskCompleteCheckmark
                size={metric.icon}
                strokeWidth={2.5}
                absoluteStrokeWidth
                className={paint[tone].icon}
                aria-hidden
              />
            ) : customMetric ? (
              formatValue!(clamped)
            ) : (
              <span className="flex items-baseline">
                <span>{Math.round(clamped)}</span>
                <span className={cn('font-semibold', metric.percent)}>%</span>
              </span>
            )}
          </span>
        ) : null}
      </div>
      {label ? (
        <Caption
          id={labelId}
          as="span"
          tone={onDark ? undefined : 'secondary'}
          align="center"
          className={cn('mt-2 max-w-[8.5rem]', onDark && '!text-[#a1a1a6]')}
        >
          {label}
        </Caption>
      ) : null}
    </div>
  )
}

export function CheckItem({
  done = false,
  children,
  className,
}: {
  done?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-8 items-center gap-2', className)}>
      {done ? (
        <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <DkTaskCompleteCheckmark size={10} strokeWidth={3} absoluteStrokeWidth aria-hidden />
        </span>
      ) : (
        <span className="block size-4 shrink-0 rounded-full border-[1.5px] border-text-tertiary" />
      )}
      <Caption as="span" tone={done ? 'primary' : 'tertiary'}>
        {children}
      </Caption>
    </div>
  )
}
