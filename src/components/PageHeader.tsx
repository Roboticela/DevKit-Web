import type { ElementType, ReactNode } from 'react'
import { DkChevronCaretLeft } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Skeleton } from './Skeleton'
import { Body, Eyebrow, Heading } from './Text'

export type PageHeaderVariant = 'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'
export type PageHeaderSize = 'sm' | 'md' | 'lg'
export type PageHeaderLayout = 'split' | 'stack'
export type PageHeaderAlign = 'start' | 'center'

export const PAGE_HEADER_VARIANTS: PageHeaderVariant[] = [
  'ghost',
  'subtle',
  'outline',
  'fill',
  'pill',
]
export const PAGE_HEADER_SIZES: PageHeaderSize[] = ['sm', 'md', 'lg']
export const PAGE_HEADER_LAYOUTS: PageHeaderLayout[] = ['split', 'stack']
export const PAGE_HEADER_ALIGNS: PageHeaderAlign[] = ['start', 'center']

export const PAGE_HEADER_VARIANT_LABEL: Record<PageHeaderVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  fill: 'Fill',
  pill: 'Pill',
}

export const PAGE_HEADER_SIZE_LABEL: Record<PageHeaderSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const PAGE_HEADER_LAYOUT_LABEL: Record<PageHeaderLayout, string> = {
  split: 'Split',
  stack: 'Stack',
}

export const PAGE_HEADER_ALIGN_LABEL: Record<PageHeaderAlign, string> = {
  start: 'Start',
  center: 'Center',
}

const sizes: Record<
  PageHeaderSize,
  {
    box: string
    gap: string
    copy: string
    title: 1 | 2 | 3
    body: 'md' | 'sm'
    back: string
    chevron: number
    lead: string
    action: string
    skeleton: 'sm' | 'md' | 'lg'
  }
> = {
  sm: {
    box: 'px-4 py-4',
    gap: 'gap-3',
    copy: 'gap-1.5',
    title: 3,
    body: 'sm',
    back: 'size-8',
    chevron: 18,
    lead: 'gap-3',
    action: 'gap-2',
    skeleton: 'sm',
  },
  md: {
    box: 'px-5 py-5 min-[735px]:px-6 min-[735px]:py-6',
    gap: 'gap-4',
    copy: 'gap-2',
    title: 2,
    body: 'sm',
    back: 'size-9',
    chevron: 20,
    lead: 'gap-3 min-[735px]:gap-4',
    action: 'gap-2 min-[735px]:gap-3',
    skeleton: 'md',
  },
  lg: {
    box: 'px-6 py-6 min-[735px]:px-8 min-[735px]:py-8',
    gap: 'gap-5 min-[735px]:gap-6',
    copy: 'gap-2 min-[735px]:gap-3',
    title: 1,
    body: 'md',
    back: 'size-10',
    chevron: 22,
    lead: 'gap-4',
    action: 'gap-3',
    skeleton: 'lg',
  },
}

function trackChrome(variant: PageHeaderVariant, onDark: boolean): string {
  const rest = onDark ? 'bg-[#1c1c1e]' : 'bg-bg-secondary'
  const well = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-tertiary'
  const line = onDark ? 'border-[#48484a]' : 'border-border-default'
  const chrome: Record<PageHeaderVariant, string> = {
    ghost: 'bg-transparent',
    subtle: rest,
    outline: cn('border bg-transparent', line),
    fill: well,
    pill: rest,
  }
  return chrome[variant]
}

function HeaderBack({
  size,
  onDark,
  onBack,
}: {
  size: PageHeaderSize
  onDark: boolean
  onBack: () => void
}) {
  const metric = sizes[size]
  return (
    <button
      type="button"
      aria-label="Back"
      onClick={onBack}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        'transition-colors duration-150',
        EASE,
        metric.back,
        onDark
          ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a] active:bg-[#636366]'
          : 'bg-bg-tertiary text-text-primary hover:bg-bg-hover active:bg-bg-active',
        'outline-none focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
      )}
    >
      <DkChevronCaretLeft
        size={metric.chevron}
        strokeWidth={2.2}
        absoluteStrokeWidth
        aria-hidden
      />
    </button>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  leading,
  meta,
  breadcrumbs,
  extra,
  variant = 'ghost',
  size = 'md',
  layout = 'split',
  align = 'start',
  loading = false,
  disabled = false,
  onBack,
  onDark = false,
  as,
  className,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  actions?: ReactNode
  leading?: ReactNode
  meta?: ReactNode
  breadcrumbs?: ReactNode
  extra?: ReactNode
  variant?: PageHeaderVariant
  size?: PageHeaderSize
  layout?: PageHeaderLayout
  align?: PageHeaderAlign
  loading?: boolean
  disabled?: boolean
  onBack?: () => void
  onDark?: boolean
  as?: ElementType
  className?: string
}) {
  const metric = sizes[size]
  const centered = align === 'center'
  const stacked = layout === 'stack' || centered
  const padded = variant !== 'ghost'
  const titleTone = onDark ? undefined : 'primary'
  const bodyTone = onDark ? undefined : 'secondary'
  const titlePaint = onDark ? '!text-white' : undefined
  const bodyPaint = onDark ? '!text-[#a1a1a6]' : undefined
  const eyebrowPaint = onDark ? '!text-[#98989d]' : undefined
  const lead = leading ?? (onBack ? <HeaderBack size={size} onDark={onDark} onBack={onBack} /> : null)
  const titleTag = as ?? 'h1'

  const heading = loading ? (
    <Skeleton
      shape="heading"
      size={metric.skeleton}
      variant={onDark ? 'ghost' : 'subtle'}
      width={centered ? '56%' : '48%'}
    />
  ) : (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2',
        centered ? 'justify-center' : 'flex-wrap',
      )}
    >
      <Heading
        level={metric.title}
        as={titleTag}
        align={centered ? 'center' : 'start'}
        tone={titleTone}
        className={cn('min-w-0', titlePaint)}
      >
        {title}
      </Heading>
      {meta ? <span className="inline-flex shrink-0 items-center">{meta}</span> : null}
    </div>
  )

  const copy = (
    <div
      className={cn(
        'flex min-w-0 flex-col',
        metric.copy,
        centered ? 'items-center text-center' : 'items-start text-start',
      )}
    >
      {eyebrow && !loading ? (
        <Eyebrow align={centered ? 'center' : 'start'} className={eyebrowPaint}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      {heading}
      {loading && description ? (
        <Skeleton
          shape="line"
          size={metric.skeleton}
          variant={onDark ? 'ghost' : 'subtle'}
          width={centered ? '72%' : '64%'}
        />
      ) : !loading && description ? (
        <Body
          size={metric.body}
          align={centered ? 'center' : 'start'}
          tone={bodyTone}
          className={cn('max-w-[692px]', bodyPaint)}
        >
          {description}
        </Body>
      ) : null}
    </div>
  )

  const leadCopy = lead ? (
    <div
      className={cn(
        'flex min-w-0',
        metric.lead,
        centered ? 'flex-col items-center' : 'flex-row items-start',
      )}
    >
      <span className={cn('inline-flex shrink-0', size === 'lg' && !centered && 'mt-1')}>{lead}</span>
      {copy}
    </div>
  ) : (
    copy
  )

  const actionRow = loading && actions ? (
    <div className={cn('flex shrink-0', centered && 'justify-center')}>
      <Skeleton
        variant="pill"
        className={cn(
          size === 'sm' ? 'h-8 w-[72px]' : size === 'lg' ? 'h-[50px] w-[108px]' : 'h-11 w-[88px]',
        )}
      />
    </div>
  ) : !loading && actions ? (
    <div
      className={cn(
        'flex shrink-0 flex-wrap items-center',
        metric.action,
        centered ? 'justify-center' : stacked ? 'justify-start' : 'justify-start min-[735px]:justify-end',
        disabled && 'pointer-events-none opacity-55',
      )}
    >
      {actions}
    </div>
  ) : null

  return (
    <header
      aria-busy={loading || undefined}
      className={cn(
        'flex w-full min-w-0 flex-col',
        metric.gap,
        padded && metric.box,
        variant === 'pill' ? 'rounded-[24px]' : padded ? 'rounded-[18px]' : null,
        trackChrome(variant, onDark),
        className,
      )}
    >
      {loading ? <span className="sr-only">{title}</span> : null}
      {breadcrumbs ? (
        <div className={cn('min-w-0', centered && 'flex justify-center')}>{breadcrumbs}</div>
      ) : null}

      <div
        className={cn(
          'flex min-w-0',
          metric.gap,
          stacked
            ? cn('flex-col', centered ? 'items-center' : 'items-stretch')
            : 'flex-col min-[735px]:flex-row min-[735px]:items-end min-[735px]:justify-between',
        )}
      >
        <div className="min-w-0 flex-1">{leadCopy}</div>
        {actionRow}
      </div>

      {extra ? <div className="min-w-0 w-full">{extra}</div> : null}
    </header>
  )
}
