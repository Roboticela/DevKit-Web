'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import {
  DkCloseDismissCancel,
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { ButtonSpinner } from './ButtonLabel'
import { Caption } from './Text'

export type SegmentedSize = 'sm' | 'md' | 'lg'
export type SegmentedVariant = 'subtle' | 'outline' | 'ghost' | 'primary' | 'pill'
export type SegmentedContent = 'label' | 'icon' | 'both'
export type SegmentedMode = 'inset' | 'grouped'
export type SegmentedStatus = 'idle' | 'loading' | 'success' | 'error'

export const SEGMENTED_VARIANTS: SegmentedVariant[] = [
  'subtle',
  'outline',
  'ghost',
  'primary',
  'pill',
]
export const SEGMENTED_CONTENTS: SegmentedContent[] = ['label', 'icon', 'both']
export const SEGMENTED_SIZES: SegmentedSize[] = ['sm', 'md', 'lg']
export const SEGMENTED_MODES: SegmentedMode[] = ['inset', 'grouped']

export type SegmentedOption<T extends string> = {
  value: T
  label: string
  icon?: ReactNode
  badge?: number | string
  disabled?: boolean
  loading?: boolean
  status?: SegmentedStatus
  onAction?: () => void | Promise<void>
}

const MOTION =
  'duration-300 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:duration-0 motion-reduce:transition-none'

const sizes: Record<
  SegmentedSize,
  { track: string; radius: string; thumb: string; text: string; pad: string; iconPad: string; mark: number }
> = {
  sm: {
    track: 'h-9',
    radius: 'rounded-[10px]',
    thumb: 'rounded-[8px]',
    text: 'text-[15px]',
    pad: 'px-3',
    iconPad: 'px-2.5 min-w-9',
    mark: 16,
  },
  md: {
    track: 'h-11',
    radius: 'rounded-[12px]',
    thumb: 'rounded-[10px]',
    text: 'text-[17px]',
    pad: 'px-4',
    iconPad: 'px-3 min-w-11',
    mark: 18,
  },
  lg: {
    track: 'h-[50px]',
    radius: 'rounded-[12px]',
    thumb: 'rounded-[10px]',
    text: 'text-[17px]',
    pad: 'px-5',
    iconPad: 'px-3.5 min-w-[50px]',
    mark: 18,
  },
}

const THUMB_LIFT = 'bg-bg-elevated dark:bg-[color-mix(in_srgb,var(--bg-tertiary)_72%,white_28%)]'

const appearance: Record<
  SegmentedVariant,
  { track: string; thumb: string; selected: string; idle: string; dividers: boolean; pill: boolean }
> = {
  subtle: {
    track: 'bg-bg-tertiary',
    thumb: THUMB_LIFT,
    selected: 'font-medium text-text-primary',
    idle: 'font-normal text-text-secondary hover:text-text-primary',
    dividers: true,
    pill: false,
  },
  outline: {
    track: 'border border-border-default bg-transparent',
    thumb: 'bg-bg-secondary dark:bg-[color-mix(in_srgb,var(--bg-tertiary)_72%,white_28%)]',
    selected: 'font-medium text-text-primary',
    idle: 'font-normal text-text-secondary hover:text-text-primary',
    dividers: true,
    pill: false,
  },
  ghost: {
    track: 'bg-transparent',
    thumb: 'bg-bg-tertiary dark:bg-[color-mix(in_srgb,var(--bg-tertiary)_72%,white_28%)]',
    selected: 'font-medium text-text-primary',
    idle: 'font-normal text-text-secondary hover:text-text-primary',
    dividers: false,
    pill: false,
  },
  primary: {
    track: 'bg-bg-tertiary',
    thumb: 'bg-brand-primary',
    selected: 'font-medium text-text-on-brand',
    idle: 'font-normal text-text-secondary hover:text-text-primary',
    dividers: true,
    pill: false,
  },
  pill: {
    track: 'bg-bg-tertiary',
    thumb: THUMB_LIFT,
    selected: 'font-medium text-text-primary',
    idle: 'font-normal text-text-secondary hover:text-text-primary',
    dividers: true,
    pill: true,
  },
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  size = 'md',
  variant = 'subtle',
  content = 'label',
  mode = 'inset',
  fullWidth = false,
  disabled = false,
  leading,
  trailing,
  onAction,
  successMs = 1600,
  className,
  'aria-label': ariaLabel,
}: {
  label?: string
  value: T
  options: SegmentedOption<T>[]
  onChange: (value: T) => void
  size?: SegmentedSize
  variant?: SegmentedVariant
  content?: SegmentedContent
  mode?: SegmentedMode
  fullWidth?: boolean
  disabled?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  onAction?: (value: T) => void | Promise<void>
  successMs?: number
  className?: string
  'aria-label'?: string
}) {
  const labelId = useId()
  const metric = sizes[size]
  const look = appearance[variant]
  const grouped = mode === 'grouped'
  const count = Math.max(options.length, 1)
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )
  const iconOnly = content === 'icon'
  const showIcon = content === 'icon' || content === 'both'
  const showLabel = content !== 'icon'
  const trackRadius = look.pill ? 'rounded-[980px]' : metric.radius
  const thumbRadius = look.pill ? 'rounded-[980px]' : metric.thumb
  const [inner, setInner] = useState<Partial<Record<T, SegmentedStatus>>>({})
  const resetRef = useRef<Partial<Record<T, number>>>({})

  useEffect(() => {
    const timeouts = resetRef.current
    return () => {
      for (const id of Object.values(timeouts)) {
        if (typeof id === 'number') window.clearTimeout(id)
      }
    }
  }, [])

  function enabledValues() {
    return options.filter((option) => !option.disabled).map((option) => option.value)
  }

  function statusOf(option: SegmentedOption<T>): SegmentedStatus {
    if (option.status) return option.status
    if (option.loading) return 'loading'
    return inner[option.value] ?? 'idle'
  }

  function commit(next: T) {
    if (disabled) return
    const option = options.find((item) => item.value === next)
    if (!option || option.disabled) return
    if (option.value !== value) onChange(option.value)
  }

  async function activate(option: SegmentedOption<T>) {
    if (disabled || option.disabled) return
    const status = statusOf(option)
    if (status === 'loading') return
    commit(option.value)
    const run = option.onAction ?? (onAction ? () => onAction(option.value) : undefined)
    if (!run) return
    const key = option.value
    window.clearTimeout(resetRef.current[key])
    setInner((current) => ({ ...current, [key]: 'loading' }))
    try {
      await run()
      setInner((current) => ({ ...current, [key]: 'success' }))
    } catch {
      setInner((current) => ({ ...current, [key]: 'error' }))
    }
    resetRef.current[key] = window.setTimeout(() => {
      setInner((current) => ({ ...current, [key]: 'idle' }))
    }, successMs)
  }

  function optionAt(value: T | undefined) {
    return options.find((item) => item.value === value)
  }

  function move(delta: number) {
    const values = enabledValues()
    if (!values.length) return
    const current = values.indexOf(value)
    const index = current < 0 ? 0 : (current + delta + values.length) % values.length
    const next = optionAt(values[index])
    if (next) commit(next.value)
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
      const first = optionAt(enabledValues()[0])
      if (first) commit(first.value)
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = optionAt(enabledValues().at(-1))
      if (last) commit(last.value)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const current = optionAt(value)
      if (current) void activate(current)
    }
  }

  const track = (
    <div
      role="radiogroup"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : ariaLabel ?? 'Options'}
      aria-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
      className={cn(
        'relative isolate grid grid-flow-col auto-cols-fr overflow-hidden',
        grouped ? 'p-0' : 'p-[2px]',
        'touch-manipulation select-none',
        look.track,
        metric.track,
        trackRadius,
        fullWidth ? 'w-full' : 'w-fit',
        disabled && 'cursor-not-allowed opacity-55',
      )}
    >
      {!grouped ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute top-[2px] z-0 h-[calc(100%-4px)]',
            look.thumb,
            'transition-[inset-inline-start,width]',
            MOTION,
            thumbRadius,
          )}
          style={{
            width: `calc((100% - 4px) / ${count})`,
            insetInlineStart: `calc(2px + ((100% - 4px) / ${count}) * ${selectedIndex})`,
          }}
        />
      ) : null}
      {look.dividers
        ? options.slice(0, -1).map((option, index) => {
            const next = options[index + 1]
            const hidden =
              option.value === value || next?.value === value || option.disabled || next?.disabled
            return (
              <span
                key={`${option.value}-rule`}
                aria-hidden
                className={cn(
                  'pointer-events-none absolute top-1/2 z-[1] h-[46%] w-px -translate-y-1/2',
                  'bg-border-default dark:bg-border-strong',
                  'transition-opacity duration-200',
                  MOTION,
                  hidden ? 'opacity-0' : 'opacity-100',
                )}
                style={{
                  insetInlineStart: grouped
                    ? `calc((100% / ${count}) * ${index + 1})`
                    : `calc(2px + ((100% - 4px) / ${count}) * ${index + 1})`,
                  marginInlineStart: -0.5,
                }}
              />
            )
          })
        : null}
      {options.map((option) => {
        const selected = option.value === value
        const status = statusOf(option)
        const busy = status === 'loading'
        const idle = option.disabled || disabled || busy
        const icon = showIcon ? option.icon : null
        const caption = showLabel || !icon
        const overlay = status !== 'idle'
        const light = variant === 'primary' && selected
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={idle || undefined}
            aria-busy={busy || undefined}
            aria-label={iconOnly ? option.label : undefined}
            tabIndex={option.disabled || disabled ? -1 : selected ? 0 : -1}
            disabled={option.disabled || disabled || busy}
            className={cn(
              'relative z-[2] inline-flex h-full items-center justify-center gap-2',
              iconOnly
                ? metric.iconPad
                : fullWidth
                  ? 'min-w-0'
                  : 'min-w-[4.5rem]',
              !iconOnly && metric.pad,
              'border-0 font-sans leading-none tracking-[-0.01em]',
              grouped && selected ? look.thumb : 'bg-transparent',
              grouped ? 'rounded-none' : thumbRadius,
              'transition-colors duration-200',
              MOTION,
              metric.text,
              'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary',
              idle ? 'cursor-not-allowed' : 'cursor-pointer',
              selected ? look.selected : look.idle,
              !selected && !idle && 'active:opacity-70',
            )}
            onClick={() => void activate(option)}
          >
            <span className={cn('inline-flex min-w-0 items-center justify-center gap-2', overlay && 'invisible')}>
              {icon ? (
                <span className="inline-flex shrink-0 text-current" aria-hidden>
                  {icon}
                </span>
              ) : null}
              {caption ? (
                <span className={cn('truncate', iconOnly && icon ? 'sr-only' : undefined)}>{option.label}</span>
              ) : null}
              {option.badge != null && !iconOnly ? (
                <span
                  className={cn(
                    'inline-flex min-w-4 justify-center text-[12px] font-medium tabular-nums leading-none',
                    selected && variant === 'primary' ? 'text-text-on-brand/80' : 'text-current opacity-70',
                  )}
                >
                  {option.badge}
                </span>
              ) : null}
            </span>
            {busy ? (
              <span className="absolute inset-0 inline-flex items-center justify-center">
                <ButtonSpinner light={light} onWhite={!light} size={metric.mark - 2} />
              </span>
            ) : null}
            {status === 'success' ? (
              <span className="absolute inset-0 inline-flex items-center justify-center">
                <DkTaskCompleteCheckmark
                  size={metric.mark}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  className={light ? undefined : 'text-success'}
                  aria-hidden
                />
              </span>
            ) : null}
            {status === 'error' ? (
              <span className="absolute inset-0 inline-flex items-center justify-center">
                <DkCloseDismissCancel
                  size={metric.mark}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  className={light ? undefined : 'text-danger'}
                  aria-hidden
                />
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className={cn('flex min-w-0 flex-col gap-2', fullWidth ? 'w-full' : 'w-fit', className)}>
      {label ? (
        <Caption as="span" id={labelId}>
          {label}
        </Caption>
      ) : null}
      {leading || trailing ? (
        <div className={cn('flex min-w-0 items-center gap-2', fullWidth && 'w-full')}>
          {leading}
          <div className={cn('min-w-0', fullWidth ? 'flex-1' : 'w-fit')}>{track}</div>
          {trailing}
        </div>
      ) : (
        track
      )}
    </div>
  )
}

export function SegmentedToolbar({
  children,
  attached = false,
  className,
}: {
  children: ReactNode
  attached?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 max-w-full items-center',
        attached
          ? cn(
              'overflow-hidden rounded-[12px] border border-border-default',
              'divide-x divide-border-default',
              '[&_[role=radiogroup]]:rounded-none [&_[role=radiogroup]]:border-0',
              '[&_button]:rounded-none!',
            )
          : 'flex-wrap gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}
