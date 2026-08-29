'use client'

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type TabItem = {
  id: string
  label: string
}

type TabsVariant = 'underline' | 'pill'
type TabsSize = 'sm' | 'md'

export function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  variant?: TabsVariant
  size?: TabsSize
  className?: string
  'aria-label'?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const ready = indicator.width > 0
  const pill = variant === 'pill'
  const compact = size === 'sm'

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
    return () => observer.disconnect()
  }, [measure, value, items, variant, size])

  function move(delta: number) {
    const ids = items.map((item) => item.id)
    const index = Math.max(0, ids.indexOf(value))
    const next = ids[(index + delta + ids.length) % ids.length]
    onChange(next)
    window.requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus()
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
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
      onChange(items[0]?.id ?? value)
    }
    if (event.key === 'End') {
      event.preventDefault()
      onChange(items[items.length - 1]?.id ?? value)
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'relative flex max-w-full items-center overflow-x-auto',
        pill
          ? cn(
              'w-fit rounded-[980px] bg-bg-tertiary p-1',
              compact ? 'h-9' : 'h-11',
            )
          : cn(
              'w-full gap-1 border-b border-border-default',
              compact ? 'h-9' : 'h-11',
            ),
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute z-0',
          'transition-[left,width,top,height,opacity] duration-300',
          EASE,
          'motion-reduce:transition-none',
          ready ? 'opacity-100' : 'opacity-0',
          pill
            ? 'rounded-[980px] bg-bg-primary'
            : 'bottom-0 h-0.5 rounded-[980px] bg-brand-primary',
        )}
        style={
          pill
            ? {
                left: indicator.left,
                width: indicator.width,
                top: indicator.top,
                height: indicator.height,
              }
            : {
                left: indicator.left,
                width: indicator.width,
              }
        }
      />
      {items.map((item) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative z-[1] shrink-0 cursor-pointer border-0 bg-transparent font-sans font-medium leading-none',
              'transition-colors duration-300',
              EASE,
              compact
                ? 'h-7 px-3 text-[13px] tracking-[-0.01em]'
                : 'h-9 px-4 text-[15px] tracking-[-0.01em]',
              pill
                ? cn(
                    'rounded-[980px]',
                    selected ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
                  )
                : cn(
                    compact ? 'h-9' : 'h-11',
                    selected ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
                  ),
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
