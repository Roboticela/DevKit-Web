'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption } from './Text'

export type SegmentedOption<T extends string> = {
  value: T
  label: string
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label?: string
  value: T
  options: SegmentedOption<T>[]
  onChange: (value: T) => void
  className?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const ready = indicator.width > 0

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return
    const selected = list.querySelector<HTMLElement>('[aria-checked="true"]')
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
  }, [measure, value, options])

  return (
    <div className={cn('flex min-w-0 flex-col gap-1', className)}>
      {label ? (
        <Caption as="span">{label}</Caption>
      ) : null}
      <div
        ref={listRef}
        role="radiogroup"
        aria-label={label}
        className="relative isolate grid h-8 w-fit grid-flow-col auto-cols-fr rounded-[8px] border border-border-default bg-bg-secondary p-0.5"
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute z-0 rounded-[6px] bg-bg-elevated dark:bg-bg-tertiary',
            'transition-[left,width,top,height,opacity] duration-300',
            EASE,
            'motion-reduce:transition-none',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          style={indicator}
        />
        {options.map((option) => {
          const selected = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={cn(
                'relative z-[1] h-full min-w-[2.75rem] cursor-pointer rounded-[6px] border-0 bg-transparent px-3',
                'font-sans text-[13px] font-medium leading-none tracking-[-0.01em]',
                'transition-colors duration-300',
                EASE,
                selected ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
              )}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
