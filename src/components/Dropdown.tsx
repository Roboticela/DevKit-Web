'use client'

import { useMemo, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectEmpty, SelectList, SelectMenu, SelectOption, SelectSearch } from './SelectMenu'
import {
  SelectTrigger,
  SELECT_SIZES,
  SELECT_VARIANTS,
  type SelectTriggerSize,
  type SelectTriggerVariant,
} from './SelectTrigger'
import { Caption } from './Text'

export type { SelectTriggerSize, SelectTriggerVariant }
export { SELECT_SIZES, SELECT_VARIANTS }

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  icon?: ReactNode
  description?: string
  meta?: ReactNode
  keywords?: string
  disabled?: boolean
  leadingFit?: 'icon' | 'flag'
}

export type SelectTriggerApi = {
  ref: RefObject<HTMLButtonElement | null>
  open: boolean
  disabled: boolean
  listId: string
  toggle: () => void
}

export function Dropdown<T extends string>({
  label,
  ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
  compact = false,
  className,
  variant = 'outline',
  size,
  icon,
  placeholder = 'Select',
  searchable = false,
  searchPlaceholder = 'Search',
  invalid = false,
  valid = false,
  emptyMessage = 'No results found',
  allowClear = false,
  clearLabel = 'Not set',
  matchWidth = true,
  menuFrom = 'trigger',
  minWidth,
  maxWidth,
  renderTrigger,
  children,
  menuClassName,
}: {
  label?: string
  ariaLabel?: string
  value: T
  options: DropdownOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
  compact?: boolean
  className?: string
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  icon?: ReactNode
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  invalid?: boolean
  valid?: boolean
  emptyMessage?: string
  allowClear?: boolean
  clearLabel?: string
  matchWidth?: boolean
  menuFrom?: 'trigger' | 'root'
  minWidth?: number
  maxWidth?: number
  renderTrigger?: (api: SelectTriggerApi) => ReactNode
  children?: ReactNode
  menuClassName?: string
}) {
  const resolvedSize: SelectTriggerSize = size ?? (compact ? 'sm' : 'md')
  const dense = resolvedSize === 'sm'
  const selected = options.find((option) => option.value === value)
  const triggerIcon = selected?.icon ?? icon
  const name = ariaLabel ?? label

  const {
    open,
    setOpen,
    query,
    setQuery,
    menuStyle,
    openUp,
    rootRef,
    triggerRef,
    menuRef,
    searchRef,
    listId,
    close,
  } = useAnchoredMenu([options.length, searchable], {
    matchWidth,
    from: menuFrom,
    minWidth,
    maxWidth,
    estimatedHeight: Math.min(
      360,
      (searchable ? 56 : 16) + options.length * (dense ? 36 : 44),
    ),
  })

  const filtered = useMemo(() => {
    if (!searchable) return options
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((option) => {
      const meta = typeof option.meta === 'string' ? option.meta : ''
      return (
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q) ||
        option.description?.toLowerCase().includes(q) ||
        option.keywords?.toLowerCase().includes(q) ||
        meta.toLowerCase().includes(q)
      )
    })
  }, [options, query, searchable])

  function toggle() {
    setOpen((current) => !current)
  }

  const check = (on: boolean) =>
    on ? (
      <DkTaskCompleteCheckmark
        className="shrink-0 text-brand-primary"
        size={dense ? 14 : 16}
        strokeWidth={2.25}
        absoluteStrokeWidth
      />
    ) : null

  return (
    <div
      className={cn(
        renderTrigger
          ? 'flex w-full min-w-0 items-stretch gap-2 font-sans'
          : cn('flex flex-col gap-1 font-sans', compact ? 'min-w-[7.5rem]' : 'w-full min-w-0'),
        className,
      )}
      ref={rootRef}
    >
      {label && !renderTrigger ? (
        <Caption as="span">{label}</Caption>
      ) : null}
      {renderTrigger ? (
        renderTrigger({
          ref: triggerRef,
          open,
          disabled,
          listId,
          toggle,
        })
      ) : (
        <SelectTrigger
          ref={triggerRef}
          open={open}
          variant={variant}
          size={resolvedSize}
          leading={triggerIcon}
          placeholder={!selected}
          invalid={invalid}
          valid={valid}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={name}
          disabled={disabled}
          onClick={toggle}
        >
          {selected?.label ?? placeholder}
        </SelectTrigger>
      )}
      {children}

      {open
        ? createPortal(
            <SelectMenu
              id={listId}
              label={name ?? 'Options'}
              openUp={openUp}
              style={menuStyle}
              menuRef={menuRef}
              className={cn('z-[400]', menuClassName)}
            >
              {searchable ? (
                <SelectSearch
                  searchRef={searchRef}
                  value={query}
                  onChange={setQuery}
                  placeholder={searchPlaceholder}
                />
              ) : null}
              <SelectList>
                {allowClear ? (
                  <SelectOption
                    selected={!value}
                    leading={icon}
                    name={clearLabel}
                    check={check(!value)}
                    onClick={() => {
                      onChange('' as T)
                      close()
                    }}
                  />
                ) : null}
                {filtered.length === 0 ? (
                  <SelectEmpty>{emptyMessage}</SelectEmpty>
                ) : (
                  filtered.map((option) => {
                    const isSelected = option.value === value
                    return (
                      <SelectOption
                        key={option.value}
                        selected={isSelected}
                        disabled={option.disabled}
                        unavailable={option.disabled}
                        leading={option.icon}
                        leadingFit={option.leadingFit}
                        description={option.description}
                        meta={option.meta}
                        className={dense ? 'min-h-8 gap-2 px-2 text-[13px]' : undefined}
                        name={
                          <span className={isSelected ? 'text-brand-primary' : undefined}>
                            {option.label}
                          </span>
                        }
                        check={check(isSelected)}
                        onClick={() => {
                          if (option.disabled) return
                          onChange(option.value)
                          close()
                        }}
                      />
                    )
                  })
                )}
              </SelectList>
            </SelectMenu>,
            document.body,
          )
        : null}
    </div>
  )
}

export { Dropdown as Select }
