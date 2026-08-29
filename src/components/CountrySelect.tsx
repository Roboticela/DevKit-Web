'use client'

import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  DkTaskCompleteCheckmark,
  DkGlobeWorldEarth
} from '@/icons'
import { COUNTRIES, sortedCountriesForSearch } from '@/lib/countries'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { CountryFlag } from './CountryFlag'
import { SelectEmpty, SelectList, SelectMenu, SelectOption, SelectSearch } from './SelectMenu'
import { SelectTrigger } from './SelectTrigger'

type CountrySelectProps = {
  value: string | null
  onChange: (next: string | null) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  className?: string
  allowClear?: boolean
  enabledIsos?: readonly string[]
  compact?: boolean
}

export function countryDisplayName(iso: string | null | undefined) {
  if (!iso) return 'Not set'
  const match = COUNTRIES.find((country) => country.iso === iso)
  return match?.name ?? iso
}

export function CountrySelect({
  value,
  onChange,
  disabled = false,
  label = 'Country',
  placeholder = 'Select a country',
  className = '',
  allowClear = true,
  enabledIsos,
  compact = false,
}: CountrySelectProps) {
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
  } = useAnchoredMenu([], { minWidth: 320, maxWidth: 420 })
  const selected = value ? (COUNTRIES.find((country) => country.iso === value) ?? null) : null
  const countries = useMemo(() => sortedCountriesForSearch(query), [query])
  const enabledSet = useMemo(
    () => (enabledIsos ? new Set(enabledIsos.map((iso) => iso.toUpperCase())) : null),
    [enabledIsos],
  )
  const isEnabled = (iso: string) => !enabledSet || enabledSet.has(iso.toUpperCase())

  return (
    <div className={cn('relative w-full font-sans', className)} ref={rootRef}>
      <SelectTrigger
        ref={triggerRef}
        open={open}
        className={compact ? 'h-9 gap-2 rounded-[10px] px-3 text-[13px]' : undefined}
        leading={
          selected ? (
            <CountryFlag iso={selected.iso} size={compact ? 16 : 18} />
          ) : (
            <DkGlobeWorldEarth size={compact ? 16 : 18} strokeWidth={1.75} absoluteStrokeWidth />
          )
        }
        placeholder={!selected}
        chevronSize={compact ? 14 : 16}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        {selected ? selected.name : placeholder}
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
                placeholder="Search countries"
              />
              <SelectList>
                {allowClear ? (
                  <SelectOption
                    selected={!selected}
                    leading={<DkGlobeWorldEarth size={18} strokeWidth={1.75} absoluteStrokeWidth />}
                    name="Not set"
                    check={
                      !selected ? (
                        <DkTaskCompleteCheckmark
                          className="shrink-0 text-brand-primary"
                          size={16}
                          strokeWidth={2.25}
                          absoluteStrokeWidth
                        />
                      ) : null
                    }
                    onClick={() => {
                      onChange(null)
                      close()
                    }}
                  />
                ) : null}
                {countries.length === 0 ? (
                  <SelectEmpty>No countries found</SelectEmpty>
                ) : (
                  countries.map((item) => {
                    const isSelected = item.iso === value
                    const available = isEnabled(item.iso)
                    return (
                      <SelectOption
                        key={item.iso}
                        selected={isSelected}
                        unavailable={!available}
                        leading={<CountryFlag iso={item.iso} size={20} />}
                        name={item.name}
                        meta={available ? item.iso : 'Coming soon'}
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
                          if (!available) return
                          onChange(item.iso)
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
