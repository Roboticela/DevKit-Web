'use client'

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type TabsVariant = 'underline' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type TabsSize = 'sm' | 'md' | 'lg'
export type TabsAlign = 'start' | 'stretch'
export type TabsPreview = 'hover' | 'focus'

export type TabItem = {
  id: string
  label: string
  icon?: ReactNode
  badge?: number | string
  disabled?: boolean
}

export const TABS_VARIANTS: TabsVariant[] = ['underline', 'subtle', 'outline', 'ghost', 'pill']
export const TABS_SIZES: TabsSize[] = ['sm', 'md', 'lg']
export const TABS_ALIGNS: TabsAlign[] = ['start', 'stretch']

export const TABS_VARIANT_LABEL: Record<TabsVariant, string> = {
  underline: 'Underline',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const TABS_SIZE_LABEL: Record<TabsSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const TABS_ALIGN_LABEL: Record<TabsAlign, string> = {
  start: 'Start',
  stretch: 'Stretch',
}

const MOTION = cn(
  'transition-[left,width,top,height,opacity] duration-300',
  EASE,
  'motion-reduce:transition-none',
)

const sizes: Record<
  TabsSize,
  {
    list: string
    well: string
    tab: string
    underline: string
    icon: number
    gap: string
    thumb: string
    track: string
  }
> = {
  sm: {
    list: 'h-9',
    well: 'h-9 p-1',
    tab: 'h-7 px-3 text-[13px] tracking-[-0.01em]',
    underline: 'h-9 px-3 text-[13px] tracking-[-0.01em]',
    icon: 14,
    gap: 'gap-1.5',
    thumb: 'rounded-[8px]',
    track: 'rounded-[10px]',
  },
  md: {
    list: 'h-11',
    well: 'h-11 p-1',
    tab: 'h-9 px-4 text-[15px] tracking-[-0.01em]',
    underline: 'h-11 px-4 text-[15px] tracking-[-0.01em]',
    icon: 16,
    gap: 'gap-2',
    thumb: 'rounded-[10px]',
    track: 'rounded-[12px]',
  },
  lg: {
    list: 'h-[50px]',
    well: 'h-[50px] p-1',
    tab: 'h-[42px] px-5 text-[17px] tracking-[-0.01em]',
    underline: 'h-[50px] px-5 text-[17px] tracking-[-0.01em]',
    icon: 18,
    gap: 'gap-2',
    thumb: 'rounded-[10px]',
    track: 'rounded-[12px]',
  },
}

function isWell(variant: TabsVariant) {
  return variant === 'subtle' || variant === 'outline' || variant === 'pill'
}

function trackChrome(variant: TabsVariant, metric: (typeof sizes)[TabsSize]) {
  const radius = variant === 'pill' ? 'rounded-[980px]' : metric.track
  const chrome: Record<TabsVariant, string> = {
    underline: cn('border-b border-border-default', metric.list),
    subtle: cn('bg-bg-tertiary', metric.well, radius),
    outline: cn('border border-border-default bg-transparent', metric.well, radius),
    ghost: metric.list,
    pill: cn('bg-bg-tertiary', metric.well, 'rounded-[980px]'),
  }
  return chrome[variant]
}

function indicatorChrome(variant: TabsVariant, metric: (typeof sizes)[TabsSize]) {
  if (variant === 'underline') return 'bottom-0 h-0.5 rounded-[980px] bg-brand-primary'
  const radius = variant === 'pill' ? 'rounded-[980px]' : metric.thumb
  if (variant === 'outline') return cn(radius, 'bg-bg-tertiary dark:bg-bg-active')
  return cn(radius, 'bg-bg-primary dark:bg-bg-active')
}

function formatBadge(badge: number | string) {
  if (typeof badge === 'number') return badge > 99 ? '99+' : String(badge)
  return badge
}

function tabRing(on: boolean) {
  return cn(
    'pointer-events-none absolute inset-[3px] rounded-[inherit] border-2 border-transparent',
    on ? 'border-brand-primary' : 'group-focus-visible:border-brand-primary',
  )
}

export function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  align = 'start',
  fullWidth = false,
  disabled = false,
  preview,
  className,
  'aria-label': ariaLabel,
}: {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  variant?: TabsVariant
  size?: TabsSize
  align?: TabsAlign
  fullWidth?: boolean
  disabled?: boolean
  preview?: TabsPreview
  className?: string
  'aria-label'?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const ready = indicator.width > 0
  const metric = sizes[size]
  const well = isWell(variant)
  const stretch = align === 'stretch'
  const showBar = variant === 'underline'
  const fill = fullWidth || variant === 'underline' || stretch
  const hoverId = items.find((item) => !item.disabled && item.id !== value)?.id

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
  }, [measure, value, items, variant, size, align, fullWidth])

  function enabledIds() {
    return items.filter((item) => !item.disabled).map((item) => item.id)
  }

  function reveal(id: string) {
    window.requestAnimationFrame(() => {
      listRef.current
        ?.querySelector<HTMLElement>(`[data-tab-id="${id}"]`)
        ?.focus({ preventScroll: true })
    })
  }

  function move(delta: number) {
    const ids = enabledIds()
    if (!ids.length) return
    const index = Math.max(0, ids.indexOf(value))
    const next = ids[(index + delta + ids.length) % ids.length]
    onChange(next)
    reveal(next)
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
      if (first) {
        onChange(first)
        reveal(first)
      }
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = enabledIds().at(-1)
      if (last) {
        onChange(last)
        reveal(last)
      }
    }
  }

  function select(id: string) {
    if (disabled) return
    const item = items.find((entry) => entry.id === id)
    if (!item || item.disabled) return
    onChange(id)
    reveal(id)
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
      className={cn(
        'relative flex min-w-0 max-w-full flex-nowrap items-center overflow-hidden',
        trackChrome(variant, metric),
        fill ? 'w-full' : 'w-fit',
        disabled && 'pointer-events-none opacity-55',
        className,
      )}
    >
      {variant !== 'ghost' ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute z-0',
            MOTION,
            ready ? 'opacity-100' : 'opacity-0',
            indicatorChrome(variant, metric),
          )}
          style={
            showBar
              ? { left: indicator.left, width: indicator.width }
              : {
                  left: indicator.left,
                  width: indicator.width,
                  top: indicator.top,
                  height: indicator.height,
                }
          }
        />
      ) : null}

      {items.map((item) => {
        const selected = item.id === value
        const inert = disabled || item.disabled
        const hover = preview === 'hover' && item.id === hoverId && !inert
        const focused = preview === 'focus' && selected && !inert
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-tab-id={item.id}
            aria-selected={selected}
            aria-disabled={item.disabled || undefined}
            tabIndex={inert ? -1 : selected ? 0 : -1}
            disabled={item.disabled}
            onClick={() => select(item.id)}
            className={cn(
              'group relative z-[1] inline-flex min-w-0 items-center justify-center border-0 bg-transparent font-sans font-medium leading-none outline-none',
              'transition-colors duration-300',
              EASE,
              metric.gap,
              well ? metric.tab : metric.underline,
              well && variant === 'pill' ? 'rounded-[980px]' : well ? metric.thumb : 'rounded-[8px]',
              stretch && 'flex-1',
              inert ? 'cursor-not-allowed' : 'cursor-pointer',
              item.disabled && 'opacity-55',
              selected ? 'text-text-primary' : 'text-text-secondary',
              !selected &&
                !inert &&
                (well
                  ? 'hover:bg-black/[0.06] hover:text-text-primary dark:hover:bg-white/[0.08]'
                  : 'hover:bg-bg-hover hover:text-text-primary'),
              hover &&
                (well
                  ? 'bg-black/[0.06] text-text-primary dark:bg-white/[0.08]'
                  : 'bg-bg-hover text-text-primary'),
            )}
          >
            <span aria-hidden className={tabRing(focused)} />
            {item.icon ? (
              <span
                className="inline-flex shrink-0 items-center justify-center [&_svg]:size-[1em]"
                style={{ fontSize: metric.icon }}
                aria-hidden
              >
                {item.icon}
              </span>
            ) : null}
            <span className="min-w-0 truncate">{item.label}</span>
            {item.badge != null ? (
              <span
                className={cn(
                  'inline-flex shrink-0 items-center justify-center rounded-[980px] px-1.5 font-medium leading-none',
                  size === 'sm' ? 'h-4 min-w-4 text-[10px]' : 'h-[18px] min-w-[18px] text-[11px]',
                  selected
                    ? 'bg-brand-primary text-text-on-brand'
                    : 'bg-bg-tertiary text-text-secondary dark:bg-bg-active',
                )}
              >
                {formatBadge(item.badge)}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
