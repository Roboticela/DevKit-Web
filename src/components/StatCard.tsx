import { useId, type MouseEventHandler, type ReactNode } from 'react'
import {
  DkChevronCaretDown,
  DkChevronCaretUp,
  DkEqualMathSign,
  DkWarningTriangleAlert,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_VISIBLE_RING } from '@/lib/styles'
import { Caption } from './Text'

export type StatCardVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type StatCardSize = 'sm' | 'md' | 'lg'
export type StatCardTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type StatCardAlign = 'start' | 'center'
export type StatCardDeltaTone = 'up' | 'down' | 'warning' | 'neutral'

export const STAT_CARD_VARIANTS: StatCardVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const STAT_CARD_SIZES: StatCardSize[] = ['sm', 'md', 'lg']
export const STAT_CARD_TONES: StatCardTone[] = ['default', 'brand', 'success', 'warning', 'danger']
export const STAT_CARD_ALIGNS: StatCardAlign[] = ['start', 'center']
export const STAT_CARD_DELTA_TONES: StatCardDeltaTone[] = ['up', 'down', 'warning', 'neutral']

export const STAT_CARD_VARIANT_LABEL: Record<StatCardVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const STAT_CARD_SIZE_LABEL: Record<StatCardSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const STAT_CARD_TONE_LABEL: Record<StatCardTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export const STAT_CARD_ALIGN_LABEL: Record<StatCardAlign, string> = {
  start: 'Start',
  center: 'Center',
}

export const STAT_CARD_DELTA_LABEL: Record<StatCardDeltaTone, string> = {
  up: 'Up',
  down: 'Down',
  warning: 'Warning',
  neutral: 'Neutral',
}

export type StatCardDelta = {
  value: string
  tone?: StatCardDeltaTone
  invert?: boolean
}

export type StatCardProps = {
  label: string
  value?: string
  unit?: string
  delta?: StatCardDelta
  hint?: string
  icon?: ReactNode
  sparkline?: number[]
  variant?: StatCardVariant
  size?: StatCardSize
  tone?: StatCardTone
  align?: StatCardAlign
  onDark?: boolean
  loading?: boolean
  empty?: boolean
  disabled?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  className?: string
}

const metrics: Record<
  StatCardSize,
  {
    box: string
    value: string
    unit: string
    icon: number
    well: string
    sparkW: number
    sparkH: number
    sparkStroke: number
    chip: string
    mark: number
  }
> = {
  sm: {
    box: 'gap-2 p-4',
    value: 'text-[21px] font-semibold tracking-[-0.005em] leading-[1.14]',
    unit: 'text-[12px]',
    icon: 16,
    well: 'size-8 rounded-[10px]',
    sparkW: 56,
    sparkH: 20,
    sparkStroke: 1.5,
    chip: 'h-5 gap-0.5 px-1.5 text-[10px]',
    mark: 10,
  },
  md: {
    box: 'gap-2.5 p-5 min-[735px]:p-6',
    value: 'text-[24px] font-semibold tracking-[-0.005em] leading-[1.14] min-[735px]:text-[28px]',
    unit: 'text-[13px] min-[735px]:text-[15px]',
    icon: 18,
    well: 'size-9 rounded-[10px] min-[735px]:size-10 min-[735px]:rounded-[12px]',
    sparkW: 72,
    sparkH: 24,
    sparkStroke: 1.75,
    chip: 'h-6 gap-1 px-2 text-[11px]',
    mark: 12,
  },
  lg: {
    box: 'gap-3 p-6 min-[735px]:p-8',
    value: 'text-[32px] font-semibold tracking-[-0.01em] leading-[1.1] min-[735px]:text-[40px]',
    unit: 'text-[15px] min-[735px]:text-[17px]',
    icon: 20,
    well: 'size-11 rounded-[12px]',
    sparkW: 96,
    sparkH: 28,
    sparkStroke: 2,
    chip: 'h-7 gap-1 px-2.5 text-[12px]',
    mark: 14,
  },
}

const lightChrome: Record<StatCardVariant, Record<StatCardTone, string>> = {
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

const darkChrome: Record<StatCardVariant, Record<StatCardTone, string>> = {
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

const iconInk: Record<StatCardTone, { rest: string; dark: string }> = {
  default: { rest: 'text-text-secondary', dark: 'text-[#a1a1a6]' },
  brand: { rest: 'text-brand-primary', dark: 'text-[#3b9eff]' },
  success: { rest: 'text-success', dark: 'text-success' },
  warning: { rest: 'text-warning', dark: 'text-warning' },
  danger: { rest: 'text-danger', dark: 'text-danger' },
}

function iconWell(variant: StatCardVariant, tone: StatCardTone, onDark: boolean): string {
  const ink = onDark ? iconInk[tone].dark : iconInk[tone].rest
  if (variant === 'ghost') return ink
  if (variant === 'outline') {
    return cn('border', onDark ? 'border-[#48484a]' : 'border-border-default', ink)
  }
  return cn(onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active', ink)
}

function deltaPaint(
  tone: StatCardDeltaTone,
  invert: boolean,
): { chip: string; ink: string; darkChip: string; darkInk: string } {
  const positive = invert ? tone === 'down' : tone === 'up'
  const negative = invert ? tone === 'up' : tone === 'down'

  if (positive) {
    return {
      chip: 'bg-success-subtle',
      ink: 'text-success',
      darkChip: 'bg-[rgba(48,209,88,0.15)]',
      darkInk: 'text-[#30d158]',
    }
  }
  if (negative) {
    return {
      chip: 'bg-danger-subtle',
      ink: 'text-danger',
      darkChip: 'bg-[rgba(255,69,58,0.10)]',
      darkInk: 'text-[#ff453a]',
    }
  }
  if (tone === 'warning') {
    return {
      chip: 'bg-warning-subtle',
      ink: 'text-warning',
      darkChip: 'bg-[rgba(255,159,10,0.15)]',
      darkInk: 'text-[#ff9f0a]',
    }
  }
  return {
    chip: 'bg-bg-tertiary dark:bg-bg-active',
    ink: 'text-text-secondary',
    darkChip: 'bg-[#3a3a3c]',
    darkInk: 'text-[#a1a1a6]',
  }
}

function sparkPath(values: number[], width: number, height: number, pad: number) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const innerW = width - pad * 2
  const innerH = height - pad * 2
  return values
    .map((value, index) => {
      const x = pad + (index / Math.max(values.length - 1, 1)) * innerW
      const y = pad + innerH - ((value - min) / span) * innerH
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function Sparkline({
  values,
  width,
  height,
  stroke,
  className,
}: {
  values: number[]
  width: number
  height: number
  stroke: number
  className?: string
}) {
  if (values.length < 2) return null
  const d = sparkPath(values, width, height, stroke)
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('shrink-0 overflow-visible', className)}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Bone({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span
      data-dk-skeleton-bone
      className={cn(
        'inline-block rounded-[8px]',
        onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active',
        'animate-pulse motion-reduce:animate-none',
        className,
      )}
    />
  )
}

export function StatCard({
  label,
  value,
  unit,
  delta,
  hint,
  icon,
  sparkline,
  variant = 'fill',
  size = 'md',
  tone = 'default',
  align = 'start',
  onDark = false,
  loading = false,
  empty = false,
  disabled = false,
  href,
  onClick,
  className,
}: StatCardProps) {
  const labelId = useId()
  const metric = metrics[size]
  const centered = align === 'center'
  const interactive = !disabled && !loading && Boolean(href || onClick)
  const vacant = empty || (!loading && (value == null || value === ''))
  const display = vacant ? '—' : (value ?? '')
  const change = delta?.tone ?? 'neutral'
  const invert = delta?.invert ?? false
  const paint = delta ? deltaPaint(change, invert) : null
  const sparkTone = paint ? (onDark ? paint.darkInk : paint.ink) : onDark ? 'text-[#a1a1a6]' : 'text-text-tertiary'
  const showSpark = Boolean(sparkline && sparkline.length >= 2 && !loading && !vacant)
  const Mark =
    change === 'up'
      ? DkChevronCaretUp
      : change === 'down'
        ? DkChevronCaretDown
        : change === 'warning'
          ? DkWarningTriangleAlert
          : DkEqualMathSign

  const frame = cn(
    'flex w-full appearance-none flex-col font-sans text-inherit antialiased',
    metric.box,
    variant === 'pill' ? 'rounded-[24px]' : 'rounded-[18px]',
    onDark ? darkChrome[variant][tone] : lightChrome[variant][tone],
    centered ? 'items-center text-center' : 'items-stretch text-start',
    'transition-colors duration-150',
    EASE,
    interactive && 'cursor-pointer no-underline',
    interactive && FOCUS_VISIBLE_RING,
    interactive &&
      tone === 'default' &&
      !onDark &&
      (variant === 'outline'
        ? 'hover:border-border-strong'
        : 'hover:bg-bg-hover dark:hover:bg-bg-active'),
    interactive && tone === 'default' && onDark && 'hover:bg-[#2c2c2e]',
    disabled && 'opacity-55',
    disabled && (href || onClick) && 'cursor-not-allowed',
    className,
  )

  const inner = (
    <>
      <span
        className={cn(
          'flex w-full gap-3',
          centered ? 'flex-col items-center' : 'items-start justify-between',
        )}
      >
        <span
          className={cn(
            'flex min-w-0 items-center gap-2.5',
            centered && 'flex-col',
          )}
        >
          {icon ? (
            <span
              className={cn(
                'inline-flex shrink-0 items-center justify-center',
                metric.well,
                iconWell(variant, tone, onDark),
              )}
            >
              <span className="inline-flex [&_svg]:size-[1em]" style={{ fontSize: metric.icon }}>
                {icon}
              </span>
            </span>
          ) : null}
          <Caption
            id={labelId}
            as="span"
            tone={onDark ? undefined : 'secondary'}
            align={centered ? 'center' : 'start'}
            className={cn('m-0', onDark && '!text-[#a1a1a6]')}
          >
            {label}
          </Caption>
        </span>
        {showSpark && !centered ? (
          <Sparkline
            values={sparkline!}
            width={metric.sparkW}
            height={metric.sparkH}
            stroke={metric.sparkStroke}
            className={sparkTone}
          />
        ) : null}
      </span>

      <span
        className={cn(
          'm-0 flex items-baseline font-sans tabular-nums',
          metric.value,
          centered ? 'justify-center' : 'justify-start',
          vacant
            ? onDark
              ? 'text-[#636366]'
              : 'text-text-tertiary'
            : onDark
              ? 'text-white'
              : 'text-text-primary',
        )}
      >
        {loading ? (
          <Bone
            onDark={onDark}
            className={cn(
              size === 'sm' ? 'h-6 w-[4.5rem]' : size === 'lg' ? 'h-10 w-[7.5rem]' : 'h-8 w-[6.5rem]',
            )}
          />
        ) : (
          <>
            <span>{display}</span>
            {unit && !vacant ? (
              <span
                className={cn(
                  'ms-1 font-normal tracking-normal',
                  metric.unit,
                  onDark ? 'text-[#a1a1a6]' : 'text-text-tertiary',
                )}
              >
                {unit}
              </span>
            ) : null}
          </>
        )}
      </span>

      {showSpark && centered ? (
        <Sparkline
          values={sparkline!}
          width={metric.sparkW}
          height={metric.sparkH}
          stroke={metric.sparkStroke}
          className={sparkTone}
        />
      ) : null}

      {delta || hint ? (
        <span
          className={cn(
            'flex flex-wrap items-center gap-x-2 gap-y-1',
            centered ? 'justify-center' : 'justify-start',
          )}
        >
          {loading && delta ? (
            <Bone onDark={onDark} className="h-5 w-16 rounded-[980px]" />
          ) : delta && paint && !vacant ? (
            <span
              className={cn(
                'inline-flex items-center rounded-[980px] font-medium leading-none tabular-nums',
                metric.chip,
                onDark ? paint.darkChip : paint.chip,
                onDark ? paint.darkInk : paint.ink,
              )}
            >
              <Mark size={metric.mark} strokeWidth={2.5} absoluteStrokeWidth aria-hidden />
              {delta.value}
            </span>
          ) : null}
          {loading && hint ? (
            <Bone onDark={onDark} className="h-3 w-20" />
          ) : hint && !loading ? (
            <Caption
              as="span"
              tone={onDark ? undefined : 'secondary'}
              className={onDark ? '!text-[#a1a1a6]' : undefined}
            >
              {hint}
            </Caption>
          ) : null}
        </span>
      ) : null}
    </>
  )

  const a11y = {
    'aria-labelledby': labelId,
    'aria-busy': loading || undefined,
    'aria-disabled': disabled || undefined,
  } as const

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
    <article className={frame} {...a11y}>
      {inner}
    </article>
  )
}
