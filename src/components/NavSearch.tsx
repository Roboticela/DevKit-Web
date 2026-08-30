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

const MODIFIER = /^(⌘|⌃|⌥|⇧|Ctrl|Cmd|Alt|Option|Shift|Super)$/i

function keysFromShortcut(shortcut: string): string[] {
  const text = shortcut.trim()
  if (!text) return []
  const split = text.split(/\s*\+\s*|\s+/).filter(Boolean)
  if (split.length > 1) return split.flatMap((part) => keysFromShortcut(part))
  const chord = text.match(/^(⌘|⌃|⌥|⇧|Ctrl|Cmd|Alt|Option|Shift|Super)(.+)$/i)
  if (chord?.[2]) return [chord[1], ...keysFromShortcut(chord[2])]
  return [text]
}

const sizes: Record<
  NavSearchSize,
  {
    field: string
    pad: string
    padClear: string
    type: string
    icon: number
    loader: number
    clear: number
    mark: number
    width: string
    withShortcut: string
    collapsed: string
  }
> = {
  sm: {
    field: 'h-8',
    pad: 'gap-2 pl-3 pr-3',
    padClear: 'gap-1.5 pl-3 pr-2',
    type: 'text-[13px]',
    icon: 15,
    loader: 13,
    clear: 14,
    mark: 7,
    width: 'w-[160px] min-[735px]:w-[200px]',
    withShortcut: 'w-[196px] min-[735px]:w-[236px]',
    collapsed: 'size-8',
  },
  md: {
    field: 'h-9',
    pad: 'gap-2 pl-3.5 pr-3.5',
    padClear: 'gap-1.5 pl-3.5 pr-2',
    type: 'text-[13px]',
    icon: 16,
    loader: 14,
    clear: 14,
    mark: 7,
    width: 'w-[180px] min-[735px]:w-[240px]',
    withShortcut: 'w-[216px] min-[735px]:w-[276px]',
    collapsed: 'size-9',
  },
  lg: {
    field: 'h-11',
    pad: 'gap-2.5 pl-4 pr-4',
    padClear: 'gap-2 pl-4 pr-2.5',
    type: 'text-[15px]',
    icon: 17,
    loader: 16,
    clear: 16,
    mark: 8,
    width: 'w-[220px] min-[735px]:w-[280px]',
    withShortcut: 'w-[256px] min-[735px]:w-[316px]',
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
  active = false,
  readOnly = false,
  onActivate,
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
  active?: boolean
  readOnly?: boolean
  onActivate?: () => void
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
  const trigger = Boolean(onActivate)
  const locked = readOnly || trigger
  const liveFocus = focused || preview === 'focus' || active
  const forcedHover = preview === 'hover'
  const forcedFocus = preview === 'focus' || active
  const iconOpen = (expanded ?? innerOpen) || liveFocus || filled
  const collapsed = variant === 'icon' && (trigger || !iconOpen)
  const look = collapsed ? collapsedChrome : openChrome[variant]
  const keys = shortcut ? keysFromShortcut(shortcut) : []
  const showShortcut = keys.length > 0 && !collapsed && !filled && !liveFocus && !loading
  const showClear = filled && !collapsed && !loading && !disabled && !trigger
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
    if (trigger) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate?.()
      }
      return
    }
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
        collapsed
          ? cn('justify-center', metric.collapsed)
          : cn(showClear ? metric.padClear : metric.pad, showShortcut ? metric.withShortcut : metric.width),
        look.rest,
        trigger && 'cursor-pointer',
        !disabled && !forcedHover && !forcedFocus && look.hover,
        !disabled && !forcedHover && !forcedFocus && look.within,
        forcedHover && !disabled && (collapsed ? 'bg-bg-hover' : forcedOpenHover[variant]),
        forcedFocus && !disabled && (collapsed ? cn('bg-bg-secondary', RING) : forcedOpenFocus[variant]),
        disabled && 'pointer-events-none cursor-not-allowed opacity-55',
        className,
      )}
      aria-busy={busy || undefined}
      onMouseDown={(event) => {
        if (!trigger || disabled) return
        event.preventDefault()
      }}
      onClick={(event) => {
        if (!trigger || disabled) return
        event.preventDefault()
        onActivate?.()
      }}
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
        readOnly={locked}
        placeholder={collapsed ? undefined : placeholder}
        aria-label={named}
        aria-haspopup={trigger ? 'dialog' : undefined}
        aria-expanded={trigger ? active || undefined : undefined}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="search"
        onChange={(event) => {
          if (locked) return
          onChange(event.target.value)
        }}
        onFocus={() => {
          setFocused(true)
          if (trigger) return
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
          trigger && 'cursor-pointer',
        )}
      />

      {showShortcut ? (
        <span className="inline-flex shrink-0 items-center gap-1" aria-hidden="true">
          {keys.map((key) => (
            <kbd
              key={key}
              className={cn(
                'inline-flex h-[18px] items-center justify-center rounded-[4px] bg-bg-tertiary font-sans text-[11px] font-medium leading-none text-text-tertiary',
                MODIFIER.test(key) || key.length > 1 ? 'min-w-[20px] px-1' : 'w-[18px]',
              )}
            >
              {key}
            </kbd>
          ))}
        </span>
      ) : null}

      {showClear ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear search"
          className={cn(
            'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-text-tertiary p-0 text-bg-primary',
            'transition-colors duration-150',
            EASE,
            'hover:bg-text-secondary',
            'focus-visible:outline-none',
            'before:absolute before:-inset-1.5 before:content-[""]',
          )}
          style={{ width: metric.clear, height: metric.clear }}
          onMouseDown={(event) => event.preventDefault()}
          onClick={clear}
        >
          <DkCloseDismissCancel size={metric.mark} strokeWidth={2.75} absoluteStrokeWidth />
        </button>
      ) : null}
    </label>
  )
}
