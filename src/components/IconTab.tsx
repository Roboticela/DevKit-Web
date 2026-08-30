'use client'

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type IconTabVariant = 'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'
export type IconTabSize = 'sm' | 'md' | 'lg'
export type IconTabLayout = 'stacked' | 'inline' | 'icon'
export type IconTabTone = 'default' | 'danger'
export type IconTabPreview = 'hover' | 'focus' | 'active'

export type IconTabItem = {
  id: string
  label: string
  icon: ReactNode
  badge?: number | string
  disabled?: boolean
  tone?: IconTabTone
}

export const ICON_TAB_VARIANTS: IconTabVariant[] = ['ghost', 'subtle', 'outline', 'fill', 'pill']
export const ICON_TAB_SIZES: IconTabSize[] = ['sm', 'md', 'lg']
export const ICON_TAB_LAYOUTS: IconTabLayout[] = ['stacked', 'inline', 'icon']
export const ICON_TAB_TONES: IconTabTone[] = ['default', 'danger']

export const ICON_TAB_VARIANT_LABEL: Record<IconTabVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  fill: 'Fill',
  pill: 'Pill',
}

export const ICON_TAB_SIZE_LABEL: Record<IconTabSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const ICON_TAB_LAYOUT_LABEL: Record<IconTabLayout, string> = {
  stacked: 'Stacked',
  inline: 'Inline',
  icon: 'Icon',
}

export const ICON_TAB_TONE_LABEL: Record<IconTabTone, string> = {
  default: 'Default',
  danger: 'Danger',
}

const MOTION = cn(
  'transition-[left,width,top,height,opacity,background-color] duration-300',
  EASE,
  'motion-reduce:transition-none',
)

const COLOR_MOTION = cn('transition-colors duration-150', EASE)

type Metric = {
  icon: number
  label: string
  stacked: string
  stackedGap: string
  inline: string
  inlineGap: string
  glyph: string
  well: string
  thumb: string
  track: string
  badge: string
}

const sizes: Record<IconTabSize, Metric> = {
  sm: {
    icon: 16,
    label: 'text-[10px] font-medium leading-[1.2]',
    stacked: 'min-h-11 px-1 py-1.5',
    stackedGap: 'gap-0.5',
    inline: 'h-8 min-w-0 px-2.5 text-[13px] tracking-[-0.01em]',
    inlineGap: 'gap-1.5',
    glyph: 'size-8',
    well: 'p-1',
    thumb: 'rounded-[8px]',
    track: 'rounded-[10px]',
    badge: 'h-4 min-w-4 px-1 text-[9px]',
  },
  md: {
    icon: 20,
    label: 'text-[11px] font-medium leading-[1.2]',
    stacked: 'min-h-14 px-1.5 py-2',
    stackedGap: 'gap-1',
    inline: 'h-11 min-w-0 px-3 text-[15px] tracking-[-0.01em]',
    inlineGap: 'gap-2',
    glyph: 'size-11',
    well: 'p-1',
    thumb: 'rounded-[10px]',
    track: 'rounded-[12px]',
    badge: 'h-[18px] min-w-[18px] px-1 text-[10px]',
  },
  lg: {
    icon: 22,
    label: 'text-[12px] font-medium leading-[1.2]',
    stacked: 'min-h-16 px-2 py-2.5',
    stackedGap: 'gap-1',
    inline: 'h-[50px] min-w-0 px-3.5 text-[17px] tracking-[-0.01em]',
    inlineGap: 'gap-2',
    glyph: 'size-[50px]',
    well: 'p-1',
    thumb: 'rounded-[12px]',
    track: 'rounded-[18px]',
    badge: 'h-5 min-w-5 px-1.5 text-[11px]',
  },
}

function isWell(variant: IconTabVariant) {
  return variant !== 'ghost'
}

function trackRadius(variant: IconTabVariant, layout: IconTabLayout, metric: Metric) {
  if (variant === 'pill') return layout === 'stacked' ? 'rounded-[22px]' : 'rounded-[980px]'
  return metric.track
}

function thumbRadius(variant: IconTabVariant, layout: IconTabLayout, metric: Metric) {
  if (variant === 'pill') return layout === 'stacked' ? 'rounded-[18px]' : 'rounded-[980px]'
  return metric.thumb
}

function trackChrome(variant: IconTabVariant, layout: IconTabLayout, metric: Metric) {
  const radius = trackRadius(variant, layout, metric)
  const chrome: Record<IconTabVariant, string> = {
    ghost: 'bg-transparent',
    subtle: cn('bg-bg-tertiary', metric.well, radius),
    outline: cn('border border-border-default bg-transparent', metric.well, radius),
    fill: cn('bg-bg-tertiary', metric.well, radius),
    pill: cn('bg-bg-tertiary', metric.well, radius),
  }
  return chrome[variant]
}

function indicatorClass(variant: IconTabVariant, layout: IconTabLayout, metric: Metric, danger: boolean) {
  const radius = thumbRadius(variant, layout, metric)
  if (variant === 'fill') return cn(radius, danger ? 'bg-danger' : 'bg-brand-primary')
  return cn(radius, 'bg-bg-primary dark:bg-bg-active')
}

function formatBadge(badge: number | string, compact: boolean) {
  if (typeof badge === 'number') {
    const cap = compact ? 9 : 99
    return badge > cap ? `${cap}+` : String(badge)
  }
  return badge
}

function itemShape(variant: IconTabVariant, layout: IconTabLayout, metric: Metric, grouped: boolean) {
  if (layout === 'icon') return variant === 'pill' ? 'rounded-[980px]' : metric.thumb
  if (layout === 'inline') {
    if (variant === 'pill') return 'rounded-[980px]'
    return grouped && isWell(variant) ? metric.thumb : metric.thumb
  }
  if (variant === 'pill') return grouped ? 'rounded-[18px]' : 'rounded-[14px]'
  return metric.thumb
}

function itemPad(layout: IconTabLayout, metric: Metric) {
  if (layout === 'icon') return metric.glyph
  if (layout === 'inline') return metric.inline
  return metric.stacked
}

function itemGap(layout: IconTabLayout, metric: Metric) {
  if (layout === 'icon') return ''
  if (layout === 'inline') return metric.inlineGap
  return metric.stackedGap
}

function inkClass({
  selected,
  tone,
  variant,
  preview,
  inert,
}: {
  selected: boolean
  tone: IconTabTone
  variant: IconTabVariant
  preview?: IconTabPreview
  inert: boolean
}) {
  const danger = tone === 'danger'
  const hover = preview === 'hover' || preview === 'active'
  const onFill = selected && variant === 'fill'

  if (inert) {
    return onFill
      ? 'text-text-on-brand'
      : danger
        ? 'text-danger'
        : selected
          ? 'text-brand-primary'
          : 'text-text-tertiary'
  }

  if (onFill) return 'text-text-on-brand'
  if (danger) {
    return cn(
      selected || hover ? 'text-danger' : 'text-text-tertiary',
      !selected && 'hover:text-danger',
    )
  }
  if (selected) return 'text-brand-primary'
  return cn(
    hover ? 'text-text-secondary' : 'text-text-tertiary',
    'hover:text-text-secondary',
  )
}

function soloFill({
  selected,
  variant,
  layout,
  metric,
  tone,
  preview,
}: {
  selected: boolean
  variant: IconTabVariant
  layout: IconTabLayout
  metric: Metric
  tone: IconTabTone
  preview?: IconTabPreview
}) {
  if (!selected && preview !== 'hover' && preview !== 'active') return 'bg-transparent'
  const radius = itemShape(variant, layout, metric, false)
  const danger = tone === 'danger'
  const hoverOnly = !selected && (preview === 'hover' || preview === 'active')

  if (hoverOnly) return cn(radius, 'bg-bg-hover')
  if (!selected) return 'bg-transparent'

  const chrome: Record<IconTabVariant, string> = {
    ghost: 'bg-transparent',
    subtle: cn(radius, 'bg-bg-tertiary'),
    outline: cn(radius, 'border border-border-default bg-transparent'),
    fill: cn(radius, danger ? 'bg-danger' : 'bg-brand-primary'),
    pill: cn(
      variant === 'pill' && layout === 'inline' ? 'rounded-[980px]' : radius,
      danger ? 'bg-danger-subtle' : 'bg-brand-primary-subtle',
    ),
  }
  return chrome[variant]
}

export function IconTab({
  icon,
  label,
  active = false,
  selected,
  tone = 'default',
  variant = 'ghost',
  size = 'md',
  layout = 'stacked',
  badge,
  disabled = false,
  preview,
  className,
  ...rest
}: {
  icon: ReactNode
  label: string
  active?: boolean
  selected?: boolean
  tone?: IconTabTone
  variant?: IconTabVariant
  size?: IconTabSize
  layout?: IconTabLayout
  badge?: number | string
  preview?: IconTabPreview
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const on = selected ?? active
  const metric = sizes[size]
  const inert = Boolean(disabled)
  const iconOnly = layout === 'icon'
  const stacked = layout === 'stacked'
  const showBadge = badge != null && badge !== 0 && badge !== '0'

  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'relative inline-flex min-w-0 cursor-pointer items-center justify-center border-0 font-sans',
        'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
        COLOR_MOTION,
        itemPad(layout, metric),
        itemGap(layout, metric),
        itemShape(variant, layout, metric, false),
        stacked ? 'flex-col' : 'flex-row',
        soloFill({ selected: on, variant, layout, metric, tone, preview }),
        inkClass({ selected: on, tone, variant, preview, inert }),
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        preview === 'focus' && 'outline-2 outline-offset-2 outline-brand-primary',
        preview === 'active' && !on && 'opacity-70',
        inert ? 'cursor-not-allowed opacity-55' : 'active:opacity-70',
        className,
      )}
      aria-current={on ? 'page' : undefined}
      aria-label={iconOnly ? label : undefined}
      aria-disabled={inert || undefined}
      disabled={inert}
    >
      <IconTabFace
        icon={icon}
        label={label}
        layout={layout}
        metric={metric}
        badge={showBadge ? badge : undefined}
        compactBadge
      />
    </button>
  )
}

function IconTabFace({
  icon,
  label,
  layout,
  metric,
  badge,
  compactBadge,
}: {
  icon: ReactNode
  label: string
  layout: IconTabLayout
  metric: Metric
  badge?: number | string
  compactBadge: boolean
}) {
  const iconOnly = layout === 'icon'
  const stacked = layout === 'stacked'
  const showLabel = !iconOnly
  const onGlyph = stacked || iconOnly

  return (
    <>
      <span className={cn('relative inline-flex shrink-0 items-center justify-center', onGlyph && 'mt-0.5 pr-1 text-current')}>
        <span
          className="inline-flex shrink-0 items-center justify-center [&_svg]:block [&_svg]:size-[1em]"
          style={{ fontSize: metric.icon }}
          aria-hidden
        >
          {icon}
        </span>
        {badge != null && onGlyph ? (
          <span
            className={cn(
              'absolute -top-1 -right-2 inline-flex items-center justify-center rounded-[980px] bg-danger font-medium leading-none text-white',
              metric.badge,
            )}
          >
            {formatBadge(badge, compactBadge)}
          </span>
        ) : null}
      </span>
      {showLabel ? (
        <span className={cn('min-w-0 truncate', stacked ? metric.label : 'font-medium leading-none')}>{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
      {badge != null && layout === 'inline' ? (
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-[980px] bg-danger px-1.5 font-medium leading-none text-white',
            metric.badge,
          )}
        >
          {formatBadge(badge, false)}
        </span>
      ) : null}
    </>
  )
}

export function IconTabBar({
  items,
  value,
  onChange,
  variant = 'ghost',
  size = 'md',
  layout = 'stacked',
  fullWidth,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: {
  items: IconTabItem[]
  value: string
  onChange: (id: string) => void
  variant?: IconTabVariant
  size?: IconTabSize
  layout?: IconTabLayout
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const ready = indicator.width > 0
  const metric = sizes[size]
  const well = isWell(variant)
  const fill = fullWidth ?? layout !== 'icon'
  const selectedItem = items.find((item) => item.id === value)
  const dangerThumb = selectedItem?.tone === 'danger'

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return
    const selected = list.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!selected) return
    setIndicator({
      left: selected.offsetLeft,
      width: selected.offsetWidth,
      top: selected.offsetTop,
      height: selected.offsetHeight,
    })
  }, [])

  useLayoutEffect(() => {
    measure()
    const list = listRef.current
    if (!list) return
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    for (const child of list.children) {
      if (child instanceof HTMLElement) observer.observe(child)
    }
    return () => observer.disconnect()
  }, [measure, value, items, variant, size, layout, fullWidth])

  function enabledIds() {
    return items.filter((item) => !item.disabled).map((item) => item.id)
  }

  function move(delta: number) {
    const ids = enabledIds()
    if (!ids.length) return
    const index = Math.max(0, ids.indexOf(value))
    const next = ids[(index + delta + ids.length) % ids.length]
    onChange(next)
    window.requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus()
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      const first = enabledIds()[0]
      if (first) onChange(first)
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = enabledIds().at(-1)
      if (last) onChange(last)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select(value)
    }
  }

  function select(id: string) {
    if (disabled) return
    const item = items.find((entry) => entry.id === id)
    if (!item || item.disabled) return
    onChange(id)
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
      className={cn(
        'relative isolate flex min-w-0 max-w-full flex-nowrap items-stretch overflow-hidden',
        trackChrome(variant, layout, metric),
        fill ? 'w-full' : 'w-fit',
        disabled && 'opacity-55',
        className,
      )}
    >
      {well ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute z-0',
            MOTION,
            ready ? 'opacity-100' : 'opacity-0',
            indicatorClass(variant, layout, metric, Boolean(dangerThumb)),
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
            top: indicator.top,
            height: indicator.height,
          }}
        />
      ) : null}

      {items.map((item) => {
        const selected = item.id === value
        const inert = disabled || Boolean(item.disabled)
        const tone = item.tone ?? 'default'
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-disabled={item.disabled || undefined}
            aria-label={layout === 'icon' ? item.label : undefined}
            tabIndex={inert ? -1 : selected ? 0 : -1}
            disabled={inert}
            onClick={() => select(item.id)}
            className={cn(
              'relative z-[1] inline-flex min-w-0 cursor-pointer items-center justify-center border-0 bg-transparent font-sans',
              'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
              COLOR_MOTION,
              'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary',
              itemPad(layout, metric),
              itemGap(layout, metric),
              itemShape(variant, layout, metric, true),
              layout === 'stacked' ? 'flex-col' : 'flex-row',
              fill || layout !== 'icon' ? 'min-w-0 flex-1' : 'shrink-0',
              inkClass({ selected, tone, variant, inert }),
              inert ? 'cursor-not-allowed' : 'active:opacity-70',
              item.disabled && 'opacity-55',
            )}
          >
            <IconTabFace
              icon={item.icon}
              label={item.label}
              layout={layout}
              metric={metric}
              badge={item.badge != null && item.badge !== 0 && item.badge !== '0' ? item.badge : undefined}
              compactBadge={layout !== 'inline'}
            />
          </button>
        )
      })}
    </div>
  )
}
