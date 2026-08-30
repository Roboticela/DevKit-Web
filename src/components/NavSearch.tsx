'use client'

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  DkCloseDismissCancel,
  DkMagnifyingGlassFind
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Loader } from './Loader'

export type NavSearchVariant = 'pill' | 'subtle' | 'outline' | 'ghost' | 'icon'
export type NavSearchSize = 'sm' | 'md' | 'lg'
export type NavSearchPreview = 'hover' | 'focus'

export const NAV_SEARCH_VARIANTS: NavSearchVariant[] = [
  'pill',
  'subtle',
  'outline',
  'ghost',
  'icon',
]
export const NAV_SEARCH_SIZES: NavSearchSize[] = ['sm', 'md', 'lg']

export const NAV_SEARCH_VARIANT_LABEL: Record<NavSearchVariant, string> = {
  pill: 'Pill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  icon: 'Icon',
}

export const NAV_SEARCH_SIZE_LABEL: Record<NavSearchSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const RING =
  'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]'

const sizes: Record<
  NavSearchSize,
  {
    field: string
    pad: string
    type: string
    icon: number
    loader: number
    clear: number
    mark: number
    width: string
    collapsed: string
  }
> = {
  sm: {
    field: 'h-8',
    pad: 'gap-2 px-3',
    type: 'text-[13px]',
    icon: 15,
    loader: 13,
    clear: 14,
    mark: 8,
    width: 'w-[160px] min-[735px]:w-[200px]',
    collapsed: 'size-8',
  },
  md: {
    field: 'h-9',
    pad: 'gap-2 px-3.5',
    type: 'text-[13px]',
    icon: 16,
    loader: 14,
    clear: 14,
    mark: 8,
    width: 'w-[180px] min-[735px]:w-[240px]',
    collapsed: 'size-9',
  },
  lg: {
    field: 'h-11',
    pad: 'gap-2.5 px-4',
    type: 'text-[15px]',
    icon: 17,
    loader: 16,
    clear: 16,
    mark: 9,
    width: 'w-[220px] min-[735px]:w-[280px]',
    collapsed: 'size-11',
  },
}

type Chrome = {
  rest: string
  hover: string
  within: string
  radius: string
}

const openChrome: Record<NavSearchVariant, Chrome> = {
  pill: {
    rest: 'border border-transparent bg-bg-secondary',
    hover: 'hover:bg-bg-tertiary',
    within: cn(
      'focus-within:border-brand-primary focus-within:bg-bg-elevated focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
      'dark:focus-within:bg-bg-secondary',
    ),
    radius: 'rounded-[980px]',
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    within: cn(
      'focus-within:border-brand-primary focus-within:bg-bg-elevated focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
      'dark:focus-within:bg-bg-secondary',
    ),
    radius: 'rounded-[10px]',
  },
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    within:
      'focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    radius: 'rounded-[10px]',
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    within: cn(
      'focus-within:border-brand-primary focus-within:bg-bg-elevated focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
      'dark:focus-within:bg-bg-secondary',
    ),
    radius: 'rounded-[10px]',
  },
  icon: {
    rest: 'border border-transparent bg-bg-secondary',
    hover: 'hover:bg-bg-tertiary',
    within: cn(
      'focus-within:border-brand-primary focus-within:bg-bg-elevated focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
      'dark:focus-within:bg-bg-secondary',
    ),
    radius: 'rounded-[980px]',
  },
}

const collapsedChrome: Chrome = {
  rest: 'border border-transparent bg-transparent',
  hover: 'hover:bg-bg-hover',
  within:
    'focus-within:border-brand-primary focus-within:bg-bg-secondary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  radius: 'rounded-[980px]',
}

const forcedOpenHover: Record<NavSearchVariant, string> = {
  pill: 'bg-bg-tertiary',
  subtle: 'bg-bg-hover',
  outline: 'border-border-strong',
  ghost: 'bg-bg-hover',
  icon: 'bg-bg-tertiary',
}

const forcedOpenFocus: Record<NavSearchVariant, string> = {
  pill: cn('bg-bg-elevated dark:bg-bg-secondary', RING),
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', RING),
  outline: RING,
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', RING),
  icon: cn('bg-bg-elevated dark:bg-bg-secondary', RING),
}

export function NavSearch({
  value,
  onChange,
  placeholder = 'Search',
  label,
  variant = 'pill',
  size = 'sm',
  shortcut,
  loading = false,
  disabled = false,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  onClear,
  onSubmit,
  preview,
  name,
  id,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  variant?: NavSearchVariant
  size?: NavSearchSize
  shortcut?: string
  loading?: boolean
  disabled?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onClear?: () => void
  onSubmit?: (value: string) => void
  preview?: NavSearchPreview
  name?: string
  id?: string
  className?: string
}) {
  const autoId = useId()
  const inputId = id ?? autoId
  const inputRef = useRef<HTMLInputElement>(null)
  const [innerOpen, setInnerOpen] = useState(defaultExpanded)
  const [focused, setFocused] = useState(false)

  const metric = sizes[size]
  const filled = value.length > 0
  const named = label ?? placeholder
  const liveFocus = focused || preview === 'focus'
  const open =
    variant !== 'icon' ||
    (expanded ?? innerOpen) ||
    liveFocus ||
    filled
  const collapsed = variant === 'icon' && !open
  const look = collapsed ? collapsedChrome : openChrome[variant]
  const showShortcut = Boolean(shortcut) && !collapsed && !filled && !liveFocus && !loading
  const showClear = filled && !collapsed && !loading && !disabled
  const busy = loading && !disabled

  function setOpen(next: boolean) {
    if (expanded === undefined) setInnerOpen(next)
    onExpandedChange?.(next)
  }

  function clear() {
    if (onClear) {
      onClear()
      return
    }
    onChange('')
    inputRef.current?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      if (filled) {
        clear()
        return
      }
      inputRef.current?.blur()
      setOpen(false)
      return
    }
    if (event.key === 'Enter') onSubmit?.(value)
  }

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative flex min-w-0 shrink-0 items-center overflow-hidden',
        'transition-[width,background-color,border-color,box-shadow,color] duration-300',
        EASE,
        metric.field,
        look.radius,
        collapsed ? cn('justify-center', metric.collapsed) : cn(metric.pad, metric.width),
        look.rest,
        !disabled && preview !== 'hover' && preview !== 'focus' && look.hover,
        !disabled && preview !== 'hover' && preview !== 'focus' && look.within,
        preview === 'hover' && !disabled && (collapsed ? 'bg-bg-hover' : forcedOpenHover[variant]),
        preview === 'focus' && !disabled && (collapsed ? cn('bg-bg-secondary', RING) : forcedOpenFocus[variant]),
        disabled && 'pointer-events-none cursor-not-allowed opacity-55',
        className,
      )}
      aria-busy={busy || undefined}
    >
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          collapsed ? 'text-text-secondary' : 'text-text-tertiary',
          !collapsed && filled && 'text-text-primary',
          liveFocus && !disabled && 'text-brand-primary',
          'transition-colors duration-150',
          EASE,
        )}
        aria-hidden="true"
      >
        {busy ? (
          <Loader size={metric.loader} variant="ghost" layout="inline" decorative />
        ) : (
          <DkMagnifyingGlassFind size={metric.icon} strokeWidth={1.5} absoluteStrokeWidth />
        )}
      </span>

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="search"
        value={value}
        disabled={disabled}
        placeholder={collapsed ? undefined : placeholder}
        aria-label={named}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="search"
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => {
          setFocused(true)
          setOpen(true)
        }}
        onBlur={() => {
          setFocused(false)
          if (!filled) setOpen(false)
        }}
        onKeyDown={onKeyDown}
        className={cn(
          'min-w-0 appearance-none border-0 bg-transparent font-sans font-normal leading-none text-text-primary caret-text-primary outline-none',
          'placeholder:text-text-tertiary',
          '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
          metric.type,
          collapsed ? 'w-0 flex-none p-0 opacity-0' : 'w-full flex-1',
        )}
      />

      {showShortcut ? (
        <kbd
          className="inline-flex shrink-0 items-center rounded-[4px] bg-bg-tertiary px-1.5 py-0.5 font-sans text-[10px] font-medium leading-none text-text-tertiary"
          aria-hidden="true"
        >
          {shortcut}
        </kbd>
      ) : null}

      {showClear ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear search"
          className={cn(
            'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0',
            'transition-colors duration-150',
            EASE,
            'focus-visible:outline-none',
            '[&>span]:bg-text-tertiary hover:[&>span]:bg-text-secondary',
          )}
          onMouseDown={(event) => event.preventDefault()}
          onClick={clear}
        >
          <span
            className="inline-flex items-center justify-center rounded-full text-bg-primary transition-colors duration-150"
            style={{ width: metric.clear, height: metric.clear }}
          >
            <DkCloseDismissCancel size={metric.mark} strokeWidth={3} absoluteStrokeWidth />
          </span>
        </button>
      ) : null}
    </label>
  )
}
