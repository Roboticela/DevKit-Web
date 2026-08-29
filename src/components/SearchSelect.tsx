'use client'

import { useMemo, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectEmpty, SelectList, SelectMenu, SelectOption, SelectSearch } from './SelectMenu'
import { SelectTrigger, type SelectTriggerSize, type SelectTriggerVariant } from './SelectTrigger'

export type SearchSelectOption = {
  value: string
  label: string
  meta?: string
  icon?: ReactNode
  description?: string
}

type SearchSelectProps = {
  value: string
  options?: SearchSelectOption[]
  getOptions?: (query: string) => SearchSelectOption[]
  onChange: (next: string) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  allowClear?: boolean
  clearLabel?: string
  emptyMessage?: string
  icon?: ReactNode
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  invalid?: boolean
  valid?: boolean
}

export function SearchSelect({
  value,
  options = [],
  getOptions,
  onChange,
  disabled = false,
  label = 'Select',
  placeholder = 'Select',
  searchPlaceholder = 'Search',
  className = '',
  allowClear = true,
  clearLabel = 'Not set',
  emptyMessage = 'No results found',
  icon,
  variant = 'outline',
  size = 'md',
  invalid = false,
  valid = false,
}: SearchSelectProps) {
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
  } = useAnchoredMenu([options.length], { matchWidth: true })

  const filtered = useMemo(() => {
    if (getOptions) return getOptions(query)
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q) ||
        option.meta?.toLowerCase().includes(q) ||
        option.description?.toLowerCase().includes(q),
    )
  }, [getOptions, query, options])

  const selected = useMemo(() => {
    if (!value) return null
    return (
      filtered.find((option) => option.value === value) ??
      options.find((option) => option.value === value) ??
      (getOptions ? getOptions(value).find((option) => option.value === value) : undefined) ??
      null
    )
  }, [filtered, getOptions, options, value])

  const selectedLabel = selected?.label ?? (value || null)

  return (
    <div
      className={cn('relative w-full font-sans', className)}
      ref={rootRef}
    >
      <SelectTrigger
        ref={triggerRef}
        open={open}
        variant={variant}
        size={size}
        leading={selected?.icon ?? icon}
        placeholder={!selectedLabel}
        invalid={invalid}
        valid={valid}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        {selectedLabel || placeholder}
      </SelectTrigger>

      {open
        ? createPortal(
            <SelectMenu
              id={listId}
              label={label}
              openUp={openUp}
              style={menuStyle}
              menuRef={menuRef}
            >
              <SelectSearch
                searchRef={searchRef}
                value={query}
                onChange={setQuery}
                placeholder={searchPlaceholder}
              />
              <SelectList>
                {allowClear ? (
                  <SelectOption
                    selected={!value}
                    name={clearLabel}
                    check={
                      !value ? (
                        <DkTaskCompleteCheckmark
                          className="shrink-0 text-brand-primary"
                          size={16}
                          strokeWidth={2.25}
                          absoluteStrokeWidth
                        />
                      ) : null
                    }
                    onClick={() => {
                      onChange('')
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
                        key={`${option.value}-${option.meta ?? ''}`}
                        selected={isSelected}
                        leading={option.icon}
                        description={option.description}
                        name={
                          <span className={isSelected ? 'text-brand-primary' : undefined}>
                            {option.label}
                          </span>
                        }
                        meta={
                          option.meta ? (
                            <span className={isSelected ? 'text-brand-primary' : undefined}>
                              {option.meta}
                            </span>
                          ) : null
                        }
                        check={
                          isSelected ? (
                            <DkTaskCompleteCheckmark
                              className="shrink-0 text-brand-primary"
                              size={16}
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
