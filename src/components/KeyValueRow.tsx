'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { DkChevronCaretRight, DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption } from './Text'

export type KeyValueRowVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type KeyValueRowSize = 'sm' | 'md' | 'lg'
export type KeyValueRowTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type KeyValueRowLayout = 'inline' | 'stacked' | 'responsive'
export type KeyValueRowPreview = 'hover' | 'focus' | 'active' | 'disabled' | 'copied'

export const KEY_VALUE_VARIANTS: KeyValueRowVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const KEY_VALUE_SIZES: KeyValueRowSize[] = ['sm', 'md', 'lg']
export const KEY_VALUE_TONES: KeyValueRowTone[] = ['default', 'brand', 'success', 'warning', 'danger']
export const KEY_VALUE_LAYOUTS: KeyValueRowLayout[] = ['inline', 'stacked', 'responsive']

export const KEY_VALUE_VARIANT_LABEL: Record<KeyValueRowVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const KEY_VALUE_SIZE_LABEL: Record<KeyValueRowSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const KEY_VALUE_TONE_LABEL: Record<KeyValueRowTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export const KEY_VALUE_LAYOUT_LABEL: Record<KeyValueRowLayout, string> = {
  inline: 'Inline',
  stacked: 'Stacked',
  responsive: 'Responsive',
}

type Metric = {
  row: string
  y: string
  x: string
  type: string
  hint: string
  gap: string
  icon: string
  chevron: number
  bone: string
  radius: string
  pill: string
}

const sizes: Record<KeyValueRowSize, Metric> = {
  sm: {
    row: 'min-h-10',
    y: 'py-2',
    x: 'px-3',
    type: 'text-[15px] leading-[1.3] tracking-[-0.01em]',
    hint: 'text-[11px] leading-[1.25]',
    gap: 'gap-3',
    icon: '[&_svg]:size-4',
    chevron: 14,
    bone: 'h-2.5 w-20',
    radius: 'rounded-[10px]',
    pill: 'rounded-[980px]',
  },
  md: {
    row: 'min-h-11',
    y: 'py-2.5',
    x: 'px-4',
    type: 'text-[17px] leading-[1.3] tracking-[-0.015em]',
    hint: 'text-[12px] leading-[1.33]',
    gap: 'gap-4',
    icon: '[&_svg]:size-[18px]',
    chevron: 16,
    bone: 'h-3 w-24',
    radius: 'rounded-[12px]',
    pill: 'rounded-[980px]',
  },
  lg: {
    row: 'min-h-14',
    y: 'py-3.5',
    x: 'px-4',
    type: 'text-[17px] leading-[1.3] tracking-[-0.015em]',
    hint: 'text-[13px] leading-[1.3]',
    gap: 'gap-4',
    icon: '[&_svg]:size-5',
    chevron: 18,
    bone: 'h-3 w-28',
    radius: 'rounded-[14px]',
    pill: 'rounded-[980px]',
  },
}

type GroupCtx = {
  variant: KeyValueRowVariant
  size: KeyValueRowSize
  onDark: boolean
}

const GroupContext = createContext<GroupCtx | null>(null)

const MOTION = cn('transition-colors duration-150', EASE)

const VALUE_TONE: Record<KeyValueRowTone, { rest: string; dark: string }> = {
  default: { rest: 'text-text-secondary', dark: 'text-[#a1a1a6]' },
  brand: { rest: 'text-brand-primary', dark: 'text-brand-primary' },
  success: { rest: 'text-success', dark: 'text-success' },
  warning: { rest: 'text-warning', dark: 'text-warning' },
  danger: { rest: 'text-danger', dark: 'text-danger' },
}

function groupChrome(variant: KeyValueRowVariant, onDark: boolean) {
  if (variant === 'ghost' || variant === 'pill') {
    return 'flex flex-col gap-2'
  }

  const fill = onDark ? 'bg-[#1c1c1e]' : 'bg-bg-elevated dark:bg-bg-secondary'
  const subtle = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-secondary'
  const line = onDark ? 'border-[#48484a]' : 'border-border-default'

  const look: Record<'fill' | 'subtle' | 'outline', string> = {
    fill: cn('border', line, fill),
    subtle,
    outline: cn('border bg-transparent', line),
  }

  return cn('flex flex-col rounded-[12px]', look[variant])
}

function groupedRadius(variant: KeyValueRowVariant, grouped: boolean) {
  if (!grouped || variant === 'ghost' || variant === 'pill') return undefined
  return 'first:rounded-t-[12px] last:rounded-b-[12px]'
}

function rowChrome(
  variant: KeyValueRowVariant,
  grouped: boolean,
  onDark: boolean,
  metric: Metric,
): { box: string; divider: string } {
  if (grouped && variant !== 'pill' && variant !== 'ghost') {
    return {
      box: 'bg-transparent',
      divider: onDark ? 'border-[#38383a]' : 'border-border-subtle',
    }
  }

  const rest = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-secondary'
  const tint = onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary'
  const line = onDark ? 'border-[#48484a]' : 'border-border-default'

  const look: Record<KeyValueRowVariant, { box: string; divider: string }> = {
    fill: {
      box: 'bg-transparent',
      divider: onDark ? 'border-[#38383a]' : 'border-border-default',
    },
    subtle: {
      box: cn(rest, metric.radius),
      divider: 'border-transparent',
    },
    outline: {
      box: cn('border bg-transparent', line, metric.radius),
      divider: 'border-transparent',
    },
    ghost: {
      box: 'bg-transparent',
      divider: 'border-transparent',
    },
    pill: {
      box: cn(tint, metric.pill),
      divider: 'border-transparent',
    },
  }

  return look[variant]
}

function rowPad(variant: KeyValueRowVariant, grouped: boolean, metric: Metric) {
  if (grouped || (variant !== 'fill' && variant !== 'ghost')) return cn(metric.x, metric.y)
  return cn('px-0', metric.y)
}

function hairline(variant: KeyValueRowVariant, grouped: boolean) {
  if (grouped) return variant !== 'ghost' && variant !== 'pill'
  return variant === 'fill'
}

function isEmptyValue(value: ReactNode) {
  return value == null || value === false || value === ''
}

function copyString(value: ReactNode, copyText?: string) {
  if (copyText != null && copyText !== '') return copyText
  return typeof value === 'string' ? value : ''
}

function groupName(label: ReactNode) {
  return typeof label === 'string' ? label : 'Details'
}

export function KeyValueGroup({
  children,
  variant = 'fill',
  size = 'md',
  onDark = false,
  label,
  className,
}: {
  children: ReactNode
  variant?: KeyValueRowVariant
  size?: KeyValueRowSize
  onDark?: boolean
  label?: string
  className?: string
}) {
  return (
    <GroupContext.Provider value={{ variant, size, onDark }}>
      <div
        role="group"
        aria-label={label}
        className={cn('w-full', groupChrome(variant, onDark), className)}
      >
        {children}
      </div>
    </GroupContext.Provider>
  )
}

export function KeyValueRow({
  label,
  value,
  hint,
  leading,
  trailing,
  variant: variantProp,
  size: sizeProp,
  tone = 'default',
  layout = 'inline',
  placeholder = 'Not set',
  copyable = false,
  copyText,
  chevron,
  href,
  target,
  rel,
  selected = false,
  loading = false,
  empty = false,
  invalid = false,
  disabled = false,
  onDark: onDarkProp,
  preview,
  onClick,
  className,
}: {
  label: ReactNode
  value?: ReactNode
  hint?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  variant?: KeyValueRowVariant
  size?: KeyValueRowSize
  tone?: KeyValueRowTone
  layout?: KeyValueRowLayout
  placeholder?: string
  copyable?: boolean
  copyText?: string
  chevron?: boolean
  href?: string
  target?: string
  rel?: string
  selected?: boolean
  loading?: boolean
  empty?: boolean
  invalid?: boolean
  disabled?: boolean
  onDark?: boolean
  preview?: KeyValueRowPreview
  onClick?: () => void
  className?: string
}) {
  const group = useContext(GroupContext)
  const variant = variantProp ?? group?.variant ?? 'fill'
  const size = sizeProp ?? group?.size ?? 'md'
  const onDark = onDarkProp ?? group?.onDark ?? false
  const grouped = group != null
  const metric = sizes[size]
  const look = rowChrome(variant, grouped, onDark, metric)
  const labelId = useId()
  const hintId = useId()
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copiedTimer.current != null) window.clearTimeout(copiedTimer.current)
    }
  }, [])

  const vacant = empty || isEmptyValue(value)
  const inert = disabled || preview === 'disabled'
  const busy = loading
  const shownCopied = copied || preview === 'copied'
  const interactive = Boolean(onClick || href || copyable) && !inert && !busy
  const showChevron =
    chevron === true || ((Boolean(href) || Boolean(onClick)) && chevron !== false && !copyable)
  const hover = preview === 'hover'
  const pressed = preview === 'active'
  const focused = preview === 'focus'
  const text = copyString(value, copyText)
  const canCopy = copyable && text !== '' && !inert && !busy

  const valueTone: KeyValueRowTone = invalid
    ? 'danger'
    : shownCopied
      ? 'success'
      : canCopy || href
        ? tone === 'default'
          ? 'brand'
          : tone
        : tone

  async function handleCopy() {
    if (!canCopy) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (copiedTimer.current != null) window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  function handleActivate() {
    if (inert || busy) return
    if (canCopy) void handleCopy()
    onClick?.()
  }

  function onPress() {
    if (!interactive) return
    if (href) {
      onClick?.()
      return
    }
    handleActivate()
  }

  const Tag = href && !inert && !busy ? 'a' : interactive ? 'button' : 'div'
  const name = groupName(label)
  const actionName = canCopy
    ? shownCopied
      ? `Copied ${name}`
      : `Copy ${name}${typeof value === 'string' ? `, ${value}` : ''}`
    : href || onClick
      ? `${name}${typeof value === 'string' ? `, ${value}` : ''}`
      : undefined
  const rule = hairline(variant, grouped)

  const stacked = layout === 'stacked'
  const responsive = layout === 'responsive'
  const rowLayout = stacked
    ? 'flex-col items-start'
    : responsive
      ? 'flex-col items-stretch min-[735px]:flex-row min-[735px]:items-center min-[735px]:justify-between'
      : 'flex-row items-center justify-between'

  const labelColor = inert
    ? onDark
      ? 'text-[#48484a]'
      : 'text-text-disabled'
    : onDark
      ? 'text-white'
      : 'text-text-primary'

  const valueColor = inert
    ? onDark
      ? 'text-[#48484a]'
      : 'text-text-disabled'
    : vacant
      ? onDark
        ? 'text-[#636366]'
        : 'text-text-tertiary'
      : onDark
        ? VALUE_TONE[valueTone].dark
        : VALUE_TONE[valueTone].rest

  const hoverFill = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-hover'
  const activeFill = onDark ? 'bg-[#3a3a3c]' : 'bg-bg-active'
  const selectedFill = onDark ? 'bg-[rgba(59,158,255,0.15)]' : 'bg-brand-primary-subtle'
  const canHoverPaint = interactive && variant !== 'ghost'
  const roundGroup = groupedRadius(variant, grouped)

  const body = (
    <>
      <span className={cn('flex min-w-0 items-center', metric.gap, stacked || responsive ? 'w-full' : 'flex-1')}>
        {leading ? (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center',
              metric.icon,
              inert ? valueColor : onDark ? 'text-[#a1a1a6]' : 'text-text-tertiary',
            )}
            aria-hidden
          >
            {leading}
          </span>
        ) : null}
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <span id={labelId} className={cn('font-normal', metric.type, labelColor)}>
            {label}
          </span>
          {hint ? (
            <Caption
              id={hintId}
              as="span"
              tone={invalid ? 'danger' : onDark ? undefined : 'tertiary'}
              className={cn(metric.hint, onDark && !invalid && 'text-[#98989d]')}
            >
              {hint}
            </Caption>
          ) : null}
        </span>
      </span>

      <span
        className={cn(
          'inline-flex min-w-0 shrink-0 items-center',
          stacked ? 'w-full justify-start' : 'justify-end',
          responsive && 'w-full justify-start min-[735px]:w-auto min-[735px]:max-w-[60%] min-[735px]:justify-end',
          !stacked && !responsive && 'max-w-[60%]',
          metric.gap,
        )}
      >
        {busy ? (
          <span
            className={cn(
              'inline-block rounded-[980px]',
              metric.bone,
              onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary',
              'motion-safe:animate-pulse',
            )}
            aria-hidden
          />
        ) : (
          <span
            className={cn(
              'min-w-0 font-normal',
              metric.type,
              valueColor,
              stacked || layout === 'inline' ? 'truncate' : 'min-[735px]:truncate',
              stacked && 'text-start',
              !stacked && 'text-end',
              responsive && 'text-start min-[735px]:text-end',
            )}
          >
            {vacant ? placeholder : value}
          </span>
        )}
        {trailing ? (
          <span className="inline-flex shrink-0 items-center">{trailing}</span>
        ) : shownCopied ? (
          <DkTaskCompleteCheckmark
            size={metric.chevron}
            strokeWidth={2}
            absoluteStrokeWidth
            className="shrink-0 text-success"
            aria-hidden
          />
        ) : showChevron && !busy ? (
          <DkChevronCaretRight
            size={metric.chevron}
            strokeWidth={1.75}
            absoluteStrokeWidth
            className={cn('shrink-0', inert ? valueColor : onDark ? 'text-[#636366]' : 'text-text-tertiary')}
            aria-hidden
          />
        ) : null}
      </span>
    </>
  )

  return (
    <Tag
      className={cn(
        'flex w-full text-left font-sans antialiased',
        metric.row,
        rowPad(variant, grouped, metric),
        metric.gap,
        rowLayout,
        look.box,
        roundGroup,
        rule && cn('border-b', look.divider, grouped && 'last:border-b-0'),
        MOTION,
        interactive && 'cursor-pointer',
        inert && 'cursor-not-allowed',
        canHoverPaint && !hover && !pressed && !selected && (onDark ? 'hover:bg-[#2c2c2e]' : 'hover:bg-bg-hover'),
        hover && canHoverPaint && hoverFill,
        pressed && canHoverPaint && activeFill,
        selected && selectedFill,
        focused && 'relative z-[1] outline-2 outline-offset-[-2px] outline-brand-primary',
        interactive &&
          'focus-visible:relative focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary',
        className,
      )}
      {...(Tag === 'button' ? { type: 'button' as const, disabled: inert || busy } : {})}
      {...(Tag === 'a'
        ? {
            href,
            target,
            rel: target === '_blank' ? (rel ?? 'noreferrer') : rel,
          }
        : {})}
      aria-label={actionName}
      aria-describedby={hint ? hintId : undefined}
      aria-busy={busy || undefined}
      aria-invalid={invalid || undefined}
      aria-disabled={inert || undefined}
      aria-current={selected ? 'true' : undefined}
      onClick={Tag === 'div' ? undefined : onPress}
    >
      {body}
      {shownCopied ? <span className="sr-only">Copied</span> : null}
      {busy ? <span className="sr-only">Loading</span> : null}
    </Tag>
  )
}
