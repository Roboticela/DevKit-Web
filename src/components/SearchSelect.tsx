'use client'

import { useMemo, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectEmpty, SelectList, SelectMenu, SelectOption, SelectSearch } from './SelectMenu'
import { SelectTrigger } from './SelectTrigger'

export type SearchSelectOption = {
  value: string
  label: string
  meta?: string
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
  } = useAnchoredMenu([options.length], { minWidth: 280, maxWidth: 360 })

  const filtered = useMemo(() => {
    if (getOptions) return getOptions(query)
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q) ||
        option.meta?.toLowerCase().includes(q),
    )
  }, [getOptions, query, options])

  const selectedLabel = useMemo(() => {
    if (!value) return null
    const fromFiltered = filtered.find((option) => option.value === value)
    if (fromFiltered) return fromFiltered.label
    const fromOptions = options.find((option) => option.value === value)
    if (fromOptions) return fromOptions.label
    if (getOptions) {
      const match = getOptions(value).find((option) => option.value === value)
      if (match) return match.label
    }
    return value
  }, [filtered, getOptions, options, value])

  return (
    <div
      className={cn('relative w-full font-sans', className)}
      ref={rootRef}
    >
      <SelectTrigger
        ref={triggerRef}
        open={open}
        leading={icon}
        placeholder={!selectedLabel}
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
                        <Check
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
                            <Check
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
