'use client'

import type { ReactNode } from 'react'
import {
  DkChevronCaretLeft,
  DkChevronCaretRight,
  DkChevronFirst,
  DkChevronLast,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Loader } from './Loader'

export type PaginationVariant = 'ghost' | 'subtle' | 'outline' | 'primary' | 'pill'
export type PaginationSize = 'sm' | 'md' | 'lg'
export type PaginationLayout = 'numbers' | 'compact' | 'simple'
export type PaginationAlign = 'start' | 'center' | 'end'
export type PaginationPreview = 'hover' | 'focus' | 'active'
export type PaginationPreviewTarget = 'page' | 'previous' | 'next' | 'first' | 'last'

export const PAGINATION_VARIANTS: PaginationVariant[] = [
  'ghost',
  'subtle',
  'outline',
  'primary',
  'pill',
]
export const PAGINATION_SIZES: PaginationSize[] = ['sm', 'md', 'lg']
export const PAGINATION_LAYOUTS: PaginationLayout[] = ['numbers', 'compact', 'simple']
export const PAGINATION_ALIGNS: PaginationAlign[] = ['start', 'center', 'end']

export const PAGINATION_VARIANT_LABEL: Record<PaginationVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  primary: 'Primary',
  pill: 'Pill',
}

export const PAGINATION_SIZE_LABEL: Record<PaginationSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const PAGINATION_LAYOUT_LABEL: Record<PaginationLayout, string> = {
  numbers: 'Numbers',
  compact: 'Compact',
  simple: 'Simple',
}

export const PAGINATION_ALIGN_LABEL: Record<PaginationAlign, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
}

export type PaginationToken = number | 'ellipsis'

const MOTION = cn(
  'transition-colors duration-150',
  EASE,
  'motion-reduce:transition-none',
)

const sizes: Record<
  PaginationSize,
  {
    item: string
    inner: string
    text: string
    icon: number
    well: string
    radius: string
    thumb: string
    gap: string
    compact: string
    mark: number
  }
> = {
  sm: {
    item: 'h-8 min-w-8 px-1.5 py-0',
    inner: 'h-full min-w-7 px-1 py-0',
    text: 'text-[13px] tracking-[-0.01em]',
    icon: 16,
    well: 'box-border h-8 p-[2px]',
    radius: 'rounded-[10px]',
    thumb: 'rounded-[8px]',
    gap: 'gap-0.5',
    compact: 'h-8 min-w-[4.5rem] px-3 py-0 text-[13px]',
    mark: 14,
  },
  md: {
    item: 'h-9 min-w-9 px-1.5 py-0',
    inner: 'h-full min-w-8 px-1.5 py-0',
    text: 'text-[15px] tracking-[-0.01em]',
    icon: 18,
    well: 'box-border h-9 p-[2px]',
    radius: 'rounded-[12px]',
    thumb: 'rounded-[10px]',
    gap: 'gap-0.5',
    compact: 'h-9 min-w-[5.25rem] px-3.5 py-0 text-[15px]',
    mark: 16,
  },
  lg: {
    item: 'h-11 min-w-11 px-2 py-0',
    inner: 'h-full min-w-9 px-1.5 py-0',
    text: 'text-[17px] tracking-[-0.01em]',
    icon: 18,
    well: 'box-border h-11 p-1',
    radius: 'rounded-[12px]',
    thumb: 'rounded-[10px]',
    gap: 'gap-1',
    compact: 'h-11 min-w-[6rem] px-4 py-0 text-[17px]',
    mark: 18,
  },
}

function range(start: number, end: number) {
  if (end < start) return []
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationToken[] {
  const count = Math.max(1, Math.floor(pageCount) || 1)
  const current = Math.min(count, Math.max(1, Math.floor(page) || 1))
  const siblings = Math.max(0, Math.floor(siblingCount))
  const boundaries = Math.max(1, Math.floor(boundaryCount))

  const startPages = range(1, Math.min(boundaries, count))
  const endPages = range(Math.max(count - boundaries + 1, boundaries + 1), count)

  const siblingsStart = Math.max(
    Math.min(current - siblings, count - boundaries - siblings * 2 - 1),
    boundaries + 2,
  )
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundaries + siblings * 2 + 2),
    count - boundaries - 1,
  )

  const startGap =
    siblingsStart > boundaries + 2
      ? (['ellipsis'] as PaginationToken[])
      : boundaries + 1 < count - boundaries
        ? [boundaries + 1]
        : []

  const endGap =
    siblingsEnd < count - boundaries - 1
      ? (['ellipsis'] as PaginationToken[])
      : count - boundaries > boundaries
        ? [count - boundaries]
        : []

  return [
    ...startPages,
    ...startGap,
    ...range(siblingsStart, siblingsEnd),
    ...endGap,
    ...endPages,
  ]
}

function isWell(variant: PaginationVariant) {
  return variant === 'subtle' || variant === 'outline' || variant === 'pill'
}

function trackChrome(variant: PaginationVariant, metric: (typeof sizes)[PaginationSize]) {
  const radius = variant === 'pill' ? 'rounded-[980px]' : metric.radius
  if (variant === 'subtle') return cn('bg-bg-tertiary', metric.well, radius)
  if (variant === 'outline') {
    return cn('border border-border-default bg-transparent', metric.well, radius)
  }
  if (variant === 'pill') return cn('bg-bg-tertiary', metric.well, 'rounded-[980px]')
  return null
}

function thumbRadius(variant: PaginationVariant, metric: (typeof sizes)[PaginationSize]) {
  return variant === 'pill' || variant === 'ghost' || variant === 'primary'
    ? 'rounded-[980px]'
    : metric.thumb
}

type ItemLook = {
  selected: boolean
  disabled?: boolean
  muted?: boolean
  preview?: PaginationPreview
  variant: PaginationVariant
}

function itemClass({ selected, disabled, muted, preview, variant }: ItemLook) {
  const well = isWell(variant)
  const brand = variant === 'primary' && selected
  const hover = preview === 'hover'
  const focus = preview === 'focus'
  const press = preview === 'active'

  const idleFill = hover || press ? 'bg-bg-hover text-text-primary' : 'bg-transparent text-text-secondary'
  const selectedFill = brand
    ? press
      ? 'bg-brand-primary-active text-text-on-brand'
      : hover
        ? 'bg-brand-primary-hover text-text-on-brand'
        : 'bg-brand-primary text-text-on-brand'
    : well
      ? 'bg-bg-elevated text-text-primary dark:bg-bg-active'
      : press || hover
        ? 'bg-bg-active text-text-primary'
        : 'bg-bg-tertiary text-text-primary'

  return cn(
    'border-0 font-sans leading-none',
    MOTION,
    selected ? 'font-medium' : 'font-normal',
    selected ? selectedFill : idleFill,
    !selected && !disabled && !preview && 'hover:bg-bg-hover hover:text-text-primary',
    !selected && !disabled && !preview && 'active:bg-bg-active',
    brand && !disabled && !preview && 'hover:bg-brand-primary-hover active:bg-brand-primary-active',
    selected && !brand && !disabled && !preview && 'hover:bg-bg-active',
    'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary',
    focus && 'outline-2 outline-offset-[-2px] outline-brand-primary',
    muted && 'opacity-55',
    disabled && 'cursor-not-allowed',
    !disabled && 'cursor-pointer',
  )
}

function Control({
  label,
  disabled,
  muted,
  preview,
  variant,
  size,
  selected = false,
  inset = false,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  muted?: boolean
  preview?: PaginationPreview
  variant: PaginationVariant
  size: PaginationSize
  selected?: boolean
  inset?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  const metric = sizes[size]
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={selected ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden tabular-nums leading-none',
        inset ? metric.inner : metric.item,
        metric.text,
        thumbRadius(variant, metric),
        itemClass({ selected, disabled, muted, preview, variant }),
      )}
    >
      {children}
    </button>
  )
}

function formatPageLabel(page: number, count: number) {
  return `${page} of ${count}`
}

export function Pagination({
  page,
  pageCount,
  onChange,
  variant = 'primary',
  size = 'sm',
  layout = 'numbers',
  align = 'center',
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = false,
  showPrevNext = true,
  disabled = false,
  loading = false,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  firstLabel = 'First page',
  lastLabel = 'Last page',
  formatCompact = formatPageLabel,
  preview,
  previewTarget = 'page',
  fullWidth = false,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
  variant?: PaginationVariant
  size?: PaginationSize
  layout?: PaginationLayout
  align?: PaginationAlign
  siblingCount?: number
  boundaryCount?: number
  showFirstLast?: boolean
  showPrevNext?: boolean
  disabled?: boolean
  loading?: boolean
  previousLabel?: string
  nextLabel?: string
  firstLabel?: string
  lastLabel?: string
  formatCompact?: (page: number, pageCount: number) => string
  preview?: PaginationPreview
  previewTarget?: PaginationPreviewTarget
  fullWidth?: boolean
  className?: string
  'aria-label'?: string
}) {
  const count = Math.max(1, Math.floor(pageCount) || 1)
  const current = Math.min(count, Math.max(1, Math.floor(page) || 1))
  const metric = sizes[size]
  const well = isWell(variant)
  const track = trackChrome(variant, metric)
  const locked = disabled || loading
  const atStart = current <= 1
  const atEnd = current >= count
  const items = layout === 'numbers' ? getPaginationItems(current, count, siblingCount, boundaryCount) : []
  const brandCurrent = variant === 'primary'

  function go(next: number) {
    if (locked) return
    const clamped = Math.min(count, Math.max(1, next))
    if (clamped === current) return
    onChange(clamped)
  }

  function previewFor(target: PaginationPreviewTarget) {
    return preview && previewTarget === target ? preview : undefined
  }

  const glyph = {
    size: metric.icon,
    strokeWidth: 2,
    absoluteStrokeWidth: true as const,
  }

  const first = showFirstLast ? (
    <Control
      label={firstLabel}
      disabled={locked || atStart}
      muted={locked || atStart}
      variant={variant}
      size={size}
      preview={previewFor('first')}
      onClick={() => go(1)}
    >
      <DkChevronFirst {...glyph} />
    </Control>
  ) : null

  const previous = showPrevNext ? (
    <Control
      label={previousLabel}
      disabled={locked || atStart}
      muted={locked || atStart}
      variant={variant}
      size={size}
      preview={previewFor('previous')}
      onClick={() => go(current - 1)}
    >
      <DkChevronCaretLeft {...glyph} />
    </Control>
  ) : null

  const next = showPrevNext ? (
    <Control
      label={nextLabel}
      disabled={locked || atEnd}
      muted={locked || atEnd}
      variant={variant}
      size={size}
      preview={previewFor('next')}
      onClick={() => go(current + 1)}
    >
      <DkChevronCaretRight {...glyph} />
    </Control>
  ) : null

  const last = showFirstLast ? (
    <Control
      label={lastLabel}
      disabled={locked || atEnd}
      muted={locked || atEnd}
      variant={variant}
      size={size}
      preview={previewFor('last')}
      onClick={() => go(count)}
    >
      <DkChevronLast {...glyph} />
    </Control>
  ) : null

  const numbers = items.map((item, index) => {
    if (item === 'ellipsis') {
      return (
        <span
          key={`ellipsis-${index}`}
          aria-hidden
          className={cn(
            'inline-flex shrink-0 select-none items-center justify-center leading-none',
            well ? metric.inner : metric.item,
            metric.text,
            'font-normal text-text-tertiary',
            thumbRadius(variant, metric),
          )}
        >
          …
        </span>
      )
    }

    const selected = item === current
    const busy = loading && selected
    return (
      <Control
        key={item}
        label={`Page ${item}`}
        selected={selected}
        disabled={locked}
        muted={disabled || (loading && !selected)}
        variant={variant}
        size={size}
        inset={well}
        preview={selected ? previewFor('page') : undefined}
        onClick={() => go(item)}
      >
        {busy ? (
          <Loader
            decorative
            size={metric.mark}
            onDark={brandCurrent}
            tone={brandCurrent ? 'default' : 'brand'}
          />
        ) : (
          item
        )}
      </Control>
    )
  })

  const compact = (
    <span
      className={cn(
        'inline-flex items-center justify-center font-sans tabular-nums leading-none',
        well ? cn('h-full min-w-[4.5rem] px-3 py-0', metric.text) : metric.compact,
        'tracking-[-0.01em] text-text-secondary',
        well ? thumbRadius(variant, metric) : 'rounded-[980px]',
        well && 'bg-bg-elevated dark:bg-bg-active',
      )}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Loader decorative size={metric.mark} tone="brand" />
          <span className="sr-only">{formatCompact(current, count)}</span>
        </span>
      ) : (
        formatCompact(current, count)
      )}
    </span>
  )

  const cluster =
    layout === 'simple' ? (
      <span className="sr-only">{formatCompact(current, count)}</span>
    ) : layout === 'compact' ? (
      well && track ? (
        <div className={cn('inline-flex items-center', track)}>{compact}</div>
      ) : (
        compact
      )
    ) : well && track ? (
      <div
        className={cn(
          'flex min-h-0 min-w-0 items-center overflow-x-auto overflow-y-hidden',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          metric.gap,
          track,
        )}
      >
        {numbers}
      </div>
    ) : (
      <div
        className={cn(
          'flex min-h-0 min-w-0 items-center overflow-x-auto overflow-y-hidden',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          metric.gap,
        )}
      >
        {numbers}
      </div>
    )

  return (
    <nav
      aria-label={ariaLabel}
      aria-disabled={locked || undefined}
      aria-busy={loading || undefined}
      className={cn(
        'flex min-w-0 flex-nowrap items-center',
        metric.gap,
        fullWidth ? 'w-full justify-between' : 'w-full',
        !fullWidth && align === 'center' && 'justify-center',
        !fullWidth && align === 'start' && 'justify-start',
        !fullWidth && align === 'end' && 'justify-end',
        disabled && 'pointer-events-none',
        className,
      )}
    >
      <div className={cn('inline-flex shrink-0 items-center', metric.gap)}>
        {first}
        {previous}
      </div>
      {cluster}
      <div className={cn('inline-flex shrink-0 items-center', metric.gap)}>
        {next}
        {last}
      </div>
    </nav>
  )
}
