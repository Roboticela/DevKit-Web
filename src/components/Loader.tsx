import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export type LoaderVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type LoaderSize = 'sm' | 'md' | 'lg'
export type LoaderTone = 'brand' | 'default' | 'success' | 'warning' | 'danger'
export type LoaderLayout = 'stack' | 'inline'

export const LOADER_VARIANTS: LoaderVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const LOADER_SIZES: LoaderSize[] = ['sm', 'md', 'lg']
export const LOADER_TONES: LoaderTone[] = ['brand', 'default', 'success', 'warning', 'danger']
export const LOADER_LAYOUTS: LoaderLayout[] = ['stack', 'inline']

export const LOADER_VARIANT_LABEL: Record<LoaderVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const LOADER_SIZE_LABEL: Record<LoaderSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const LOADER_TONE_LABEL: Record<LoaderTone, string> = {
  brand: 'Brand',
  default: 'Default',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

const ring: Record<LoaderSize, { px: number; stroke: number; well: string; pill: string }> = {
  sm: { px: 16, stroke: 2, well: 'size-7', pill: 'size-8' },
  md: { px: 24, stroke: 2.25, well: 'size-10', pill: 'size-11' },
  lg: { px: 36, stroke: 2.75, well: 'size-14', pill: 'size-16' },
}

const tickClass: Record<LoaderTone, { rest: string; dark: string }> = {
  brand: { rest: 'stroke-brand-primary', dark: 'stroke-white' },
  default: { rest: 'stroke-text-primary', dark: 'stroke-white' },
  success: { rest: 'stroke-success', dark: 'stroke-success' },
  warning: { rest: 'stroke-warning', dark: 'stroke-warning' },
  danger: { rest: 'stroke-danger', dark: 'stroke-danger' },
}

function ringFor(size: LoaderSize | number): { px: number; stroke: number; well: string; pill: string; compact: boolean } {
  if (typeof size === 'number') {
    return {
      px: size,
      stroke: size <= 12 ? 1.65 : size <= 16 ? 2 : size <= 24 ? 2.25 : 2.75,
      well: '',
      pill: '',
      compact: true,
    }
  }
  return { ...ring[size], compact: false }
}

function trackClass(variant: LoaderVariant, onDark: boolean) {
  if (onDark) return 'stroke-[#48484a]'
  if (variant === 'ghost') return 'stroke-text-tertiary/20'
  return 'stroke-text-tertiary/35'
}

function wellChrome(variant: LoaderVariant, onDark: boolean): string | null {
  if (variant === 'fill' || variant === 'ghost') return null
  if (variant === 'outline') {
    return cn('border bg-transparent', onDark ? 'border-[#48484a]' : 'border-border-default')
  }
  return onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary'
}

function Ring({
  px,
  stroke,
  tick,
  track,
  spinning,
}: {
  px: number
  stroke: number
  tick: string
  track: string
  spinning: boolean
}) {
  const r = 16 - stroke
  const circumference = 2 * Math.PI * r
  const arc = circumference * 0.28

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 32 32"
      fill="none"
      className={cn(
        'block shrink-0 origin-center',
        spinning && 'animate-btn-spin motion-reduce:animate-none',
      )}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r={r} fill="none" className={track} strokeWidth={stroke} />
      <circle
        cx="16"
        cy="16"
        r={r}
        fill="none"
        className={tick}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${circumference}`}
      />
    </svg>
  )
}

export function Loader({
  variant = 'fill',
  size = 'md',
  tone = 'brand',
  layout = 'stack',
  label,
  onDark = false,
  spinning = true,
  disabled = false,
  decorative = false,
  className,
}: {
  variant?: LoaderVariant
  size?: LoaderSize | number
  tone?: LoaderTone
  layout?: LoaderLayout
  label?: string
  onDark?: boolean
  spinning?: boolean
  disabled?: boolean
  decorative?: boolean
  className?: string
}) {
  const labelId = useId()
  const metric = ringFor(size)
  const well = metric.compact ? null : wellChrome(variant, onDark)
  const tick = onDark ? tickClass[tone].dark : tickClass[tone].rest
  const named = label ?? 'Loading'
  const inline = layout === 'inline'

  const glyph = (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        well && cn(variant === 'pill' ? metric.pill : metric.well, 'rounded-full', well),
      )}
    >
      <Ring
        px={metric.px}
        stroke={metric.stroke}
        tick={tick}
        track={trackClass(variant, onDark)}
        spinning={spinning}
      />
    </span>
  )

  const caption = label ? (
    <Caption
      id={decorative ? undefined : labelId}
      as="span"
      tone={onDark ? undefined : 'secondary'}
      className={onDark ? '!text-[#a1a1a6]' : undefined}
    >
      {label}
    </Caption>
  ) : null

  return (
    <div
      className={cn(
        'inline-flex',
        inline ? 'flex-row items-center gap-2.5' : 'flex-col items-center gap-3',
        disabled && 'opacity-55',
        className,
      )}
      role={decorative ? undefined : 'status'}
      aria-live={decorative ? undefined : 'polite'}
      aria-busy={decorative ? undefined : true}
      aria-labelledby={decorative || !label ? undefined : labelId}
      aria-label={decorative || label ? undefined : named}
      aria-hidden={decorative || undefined}
    >
      {glyph}
      {caption}
    </div>
  )
}
