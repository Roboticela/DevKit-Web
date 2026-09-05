'use client'

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, Globe, Search } from 'lucide-react'
import { CountryFlag } from './CountryFlag'
import {
  COUNTRIES,
  sortedCountriesForSearch,
} from '@/lib/countries'
import { cn } from '@/lib/cn'
import {
  landingSelectCheck,
  landingSelectChevron,
  landingSelectChevronOpen,
  landingSelectEmpty,
  landingSelectLeading,
  landingSelectList,
  landingSelectMenu,
  landingSelectMenuUp,
  landingSelectOption,
  landingSelectOptionCode,
  landingSelectOptionCopy,
  landingSelectOptionLeading,
  landingSelectOptionName,
  landingSelectOptionNameSelected,
  landingSelectOptionUnavailable,
  landingSelectPlaceholder,
  landingSelectRoot,
  landingSelectSearch,
  landingSelectSearchIcon,
  landingSelectSearchInput,
  landingSelectTrigger,
  landingSelectTriggerOpen,
  landingSelectValue,
} from '@/lib/landing-select'


type CountrySelectProps = {
  value: string | null
  onChange: (next: string | null) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  className?: string
  allowClear?: boolean
  /** When set, all countries still list; only these ISO codes are selectable. */
  enabledIsos?: readonly string[]
}

export function countryDisplayName(iso: string | null | undefined) {
  if (!iso) return 'Not set'
  const match = COUNTRIES.find((country) => country.iso === iso)
  return match?.name ?? iso
}

export function LandingCountrySelect({
  value,
  onChange,
  disabled = false,
  label = 'Country',
  placeholder = 'Select a country',
  className = '',
  allowClear = true,
  enabledIsos,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({})
  const [openUp, setOpenUp] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const selected = value ? COUNTRIES.find((country) => country.iso === value) ?? null : null
  const countries = useMemo(() => sortedCountriesForSearch(query), [query])
  const enabledSet = useMemo(
    () => (enabledIsos ? new Set(enabledIsos.map((iso) => iso.toUpperCase())) : null),
    [enabledIsos],
  )
  const isEnabled = (iso: string) => !enabledSet || enabledSet.has(iso.toUpperCase())

  useLayoutEffect(() => {
    if (!open) return

    function place() {
      const trigger = triggerRef.current
      if (!trigger) return

      const rect = trigger.getBoundingClientRect()
      const gap = 8
      const estimatedHeight = 360
      const spaceBelow = window.innerHeight - rect.bottom - gap
      const spaceAbove = rect.top - gap
      const shouldOpenUp = spaceBelow < estimatedHeight && spaceAbove > spaceBelow
      const width = Math.min(420, Math.max(rect.width, 320))
      const left = Math.min(
        Math.max(12, rect.left),
        window.innerWidth - width - 12,
      )

      if (shouldOpenUp) {
        setOpenUp(true)
        setMenuStyle({
          position: 'fixed',
          left,
          width,
          bottom: window.innerHeight - rect.top + gap,
          top: 'auto',
          maxHeight: Math.min(360, Math.max(220, spaceAbove - 8)),
        })
      } else {
        setOpenUp(false)
        setMenuStyle({
          position: 'fixed',
          left,
          width,
          top: rect.bottom + gap,
          bottom: 'auto',
          maxHeight: Math.min(360, Math.max(220, spaceBelow - 8)),
        })
      }
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, countries.length])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => searchRef.current?.focus(), 40)

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
      setQuery('')
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={cn(landingSelectRoot, className)} ref={rootRef}>
      <button
        type="button"
        className={cn(landingSelectTrigger, open && landingSelectTriggerOpen)}
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={landingSelectLeading} aria-hidden="true">
          {selected ? (
            <CountryFlag iso={selected.iso} size={18} />
          ) : (
            <Globe size={18} strokeWidth={1.75} absoluteStrokeWidth />
          )}
        </span>
        <span className={cn(landingSelectValue, !selected && landingSelectPlaceholder)}>
          {selected ? selected.name : placeholder}
        </span>
        <span className={cn(landingSelectChevron, open && landingSelectChevronOpen)} aria-hidden="true">
          <ChevronDown size={16} strokeWidth={1.75} absoluteStrokeWidth />
        </span>
      </button>

      {open
        ? createPortal(
            <div className="font-sans">
              <div
                className={cn(landingSelectMenu, openUp && landingSelectMenuUp)}
                id={listId}
                role="listbox"
                aria-label={label}
                ref={menuRef}
                style={menuStyle}
              >
                <div className={landingSelectSearch}>
                  <span className={landingSelectSearchIcon} aria-hidden="true">
                    <Search size={16} strokeWidth={1.75} absoluteStrokeWidth />
                  </span>
                  <input
                    ref={searchRef}
                    type="search"
                    className={landingSelectSearchInput}
                    placeholder="Search countries"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                <div className={landingSelectList}>
                  {allowClear ? (
                    <button
                      type="button"
                      role="option"
                      aria-selected={!selected}
                      className={landingSelectOption}
                      onClick={() => {
                        onChange(null)
                        setOpen(false)
                        setQuery('')
                      }}
                    >
                      <span className={landingSelectOptionLeading} aria-hidden="true">
                        <Globe size={18} strokeWidth={1.75} absoluteStrokeWidth />
                      </span>
                      <span className={landingSelectOptionCopy}>
                        <span className={cn(landingSelectOptionName, !selected && landingSelectOptionNameSelected)}>
                          Not set
                        </span>
                      </span>
                      {!selected ? (
                        <Check className={landingSelectCheck} size={16} strokeWidth={2.25} absoluteStrokeWidth />
                      ) : null}
                    </button>
                  ) : null}

                  {countries.length === 0 ? (
                    <p className={landingSelectEmpty}>No countries found</p>
                  ) : (
                    countries.map((item) => {
                      const isSelected = item.iso === value
                      const available = isEnabled(item.iso)
                      return (
                        <button
                          key={item.iso}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={!available}
                          disabled={!available}
                          className={cn(landingSelectOption, !available && landingSelectOptionUnavailable)}
                          onClick={() => {
                            if (!available) return
                            onChange(item.iso)
                            setOpen(false)
                            setQuery('')
                          }}
                        >
                          <span className={landingSelectOptionLeading} aria-hidden="true">
                            <CountryFlag iso={item.iso} size={20} />
                          </span>
                          <span className={landingSelectOptionCopy}>
                            <span
                              className={cn(
                                landingSelectOptionName,
                                isSelected && landingSelectOptionNameSelected,
                              )}
                            >
                              {item.name}
                            </span>
                            <span className={landingSelectOptionCode}>
                              {available ? item.iso : 'Coming soon'}
                            </span>
                          </span>
                          {isSelected ? (
                            <Check className={landingSelectCheck} size={16} strokeWidth={2.25} absoluteStrokeWidth />
                          ) : null}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
