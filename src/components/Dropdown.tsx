'use client'

import { useMemo, type ReactNode } from 'react'
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
  disabled?: boolean
}

export function Dropdown<T extends string>({
  label,
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
}: {
  label?: string
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
}) {
  const resolvedSize: SelectTriggerSize = size ?? (compact ? 'sm' : 'md')
  const dense = resolvedSize === 'sm'
  const selected = options.find((option) => option.value === value)
  const triggerIcon = selected?.icon ?? icon

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
    matchWidth: true,
    estimatedHeight: Math.min(
      360,
      (searchable ? 56 : 16) + options.length * (dense ? 36 : 44),
    ),
  })

  const filtered = useMemo(() => {
    if (!searchable) return options
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q) ||
        option.description?.toLowerCase().includes(q),
    )
  }, [options, query, searchable])

  return (
    <div
      className={cn('flex flex-col gap-1 font-sans', compact ? 'min-w-[7.5rem]' : 'w-full min-w-0', className)}
      ref={rootRef}
    >
      {label ? (
        <Caption as="span">{label}</Caption>
      ) : null}
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
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        {selected?.label ?? placeholder}
      </SelectTrigger>

      {open
        ? createPortal(
            <SelectMenu
              id={listId}
              label={label ?? 'Options'}
              openUp={openUp}
              style={menuStyle}
              menuRef={menuRef}
              className="z-[400]"
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
                        leading={option.icon}
                        description={option.description}
                        className={dense ? 'min-h-8 gap-2 px-2 text-[13px]' : undefined}
                        name={
                          <span className={isSelected ? 'text-brand-primary' : undefined}>
                            {option.label}
                          </span>
                        }
                        check={
                          isSelected ? (
                            <DkTaskCompleteCheckmark
                              className="shrink-0 text-brand-primary"
                              size={dense ? 14 : 16}
                              strokeWidth={2.25}
                              absoluteStrokeWidth
                            />
                          ) : null
                        }
                        onClick={() => {
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
