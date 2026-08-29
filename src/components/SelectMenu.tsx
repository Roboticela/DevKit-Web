'use client'

import type { CSSProperties, ReactNode, RefObject } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { MENU_SEARCH_INPUT, MENU_SURFACE } from '@/lib/styles'

export function SelectMenu({
  id,
  label,
  openUp,
  style,
  menuRef,
  children,
  className,
}: {
  id: string
  label: string
  openUp?: boolean
  style?: CSSProperties
  menuRef: RefObject<HTMLDivElement | null>
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(MENU_SURFACE, openUp && 'origin-bottom', className)}
      id={id}
      role="listbox"
      aria-label={label}
      ref={menuRef}
      style={style}
    >
      {children}
    </div>
  )
}

export function SelectSearch({
  searchRef,
  value,
  onChange,
  placeholder,
}: {
  searchRef: RefObject<HTMLInputElement | null>
  value: string
  onChange: (next: string) => void
  placeholder: string
}) {
  return (
    <div className="relative mb-2 shrink-0">
      <span
        className="pointer-events-none absolute top-1/2 left-3 inline-flex -translate-y-1/2 text-text-tertiary"
        aria-hidden="true"
      >
        <Search size={16} strokeWidth={1.75} absoluteStrokeWidth />
      </span>
      <input
        ref={searchRef}
        type="search"
        className={MENU_SEARCH_INPUT}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  )
}

export function SelectList({ children }: { children: ReactNode }) {
  return <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">{children}</div>
}

export function SelectEmpty({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 px-3 py-6 text-center text-sm text-text-tertiary">{children}</p>
  )
}

export function SelectOption({
  selected = false,
  unavailable = false,
  leading,
  name,
  meta,
  check,
  onClick,
  disabled,
  className,
}: {
  selected?: boolean
  unavailable?: boolean
  leading?: ReactNode
  name: ReactNode
  meta?: ReactNode
  check?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-disabled={unavailable || disabled}
      disabled={disabled || unavailable}
      className={cn(
        'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[10px] border-0 bg-transparent px-2.5 text-left font-sans text-[15px] text-text-primary',
        'transition-colors duration-150 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
        'hover:bg-bg-hover focus-visible:bg-bg-hover focus-visible:outline-none',
        (unavailable || disabled) &&
          'cursor-not-allowed opacity-[0.48] hover:bg-transparent focus-visible:bg-transparent',
        selected && 'text-text-primary',
        className,
      )}
      onClick={onClick}
    >
      {leading ? (
        <span className="inline-flex h-[18px] w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] text-text-tertiary">
          {leading}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
        <span
          className={cn(
            'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal',
            selected && 'font-medium',
          )}
        >
          {name}
        </span>
        {meta ? (
          <span className="shrink-0 text-xs font-medium tracking-[0.02em] text-text-tertiary">
            {meta}
          </span>
        ) : null}
      </span>
      {check}
    </button>
  )
}
