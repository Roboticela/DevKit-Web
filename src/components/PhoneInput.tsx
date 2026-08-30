'use client'

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  DkChevronCaretDown
} from '@/icons'
import { cn } from '@/lib/cn'
import {
  caretFromDigitCount,
  composePhoneValue,
  formatNationalNumber,
  formatPhoneDisplay,
  getCountryByIso,
  nationalDigitLimit,
  parsePhoneValue,
  sortedCountriesForSearch,
  type Country,
} from '@/lib/countries'
import { AUTH_FIELD_SURFACE, EASE, FOCUS_RING, FOCUS_VISIBLE_RING, OPEN_RING } from '@/lib/styles'
import { CountryFlag } from './CountryFlag'
import { Select } from './Dropdown'

type PhoneInputProps = {
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  className?: string
}

export function PhoneInput({
  value,
  onChange,
  disabled = false,
  label = 'Phone number',
  placeholder = 'Phone number',
  className = '',
}: PhoneInputProps) {
  const parsed = useMemo(() => parsePhoneValue(value), [value])
  const [country, setCountry] = useState<Country>(parsed.country)
  const [national, setNational] = useState(parsed.national.replace(/\D/g, ''))
  const inputRef = useRef<HTMLInputElement>(null)
  const caretDigitsRef = useRef<number | null>(null)
  const display = formatNationalNumber(national, country.iso)

  const options = useMemo(
    () =>
      sortedCountriesForSearch('').map((item) => ({
        value: item.iso,
        label: item.name,
        icon: <CountryFlag iso={item.iso} size={20} />,
        leadingFit: 'flag' as const,
        meta: (
          <span className="text-[13px] font-normal tabular-nums text-text-tertiary">
            +{item.dial}
          </span>
        ),
        keywords: `${item.iso} ${item.dial} +${item.dial}`,
      })),
    [],
  )

  useEffect(() => {
    const next = parsePhoneValue(value, country.iso)
    setCountry(next.country)
    setNational(next.national.replace(/\D/g, ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useLayoutEffect(() => {
    if (caretDigitsRef.current == null) return
    const input = inputRef.current
    if (!input) return
    const caret = caretFromDigitCount(display, caretDigitsRef.current)
    input.setSelectionRange(caret, caret)
    caretDigitsRef.current = null
  }, [display])

  function emit(nextCountry: Country, nextNational: string, caretDigits?: number) {
    const digits = nextNational.replace(/\D/g, '').slice(0, nationalDigitLimit(nextCountry.iso))
    if (caretDigits != null) caretDigitsRef.current = Math.min(caretDigits, digits.length)
    setCountry(nextCountry)
    setNational(digits)
    onChange(composePhoneValue(nextCountry.dial, digits))
  }

  function handleNumberChange(raw: string, caret: number) {
    const digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length
    emit(country, raw, digitsBefore)
  }

  function handleNumberKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Backspace') return
    const input = event.currentTarget
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0
    if (start !== end || start === 0) return
    const before = input.value[start - 1]
    if (!before || /\d/.test(before)) return
    event.preventDefault()
    const digitsBefore = input.value.slice(0, start).replace(/\D/g, '').length
    const digits = national.replace(/\D/g, '')
    emit(country, digits.slice(0, Math.max(0, digitsBefore - 1)) + digits.slice(digitsBefore), digitsBefore - 1)
  }

  return (
    <Select
      value={country.iso}
      options={options}
      onChange={(iso) => emit(getCountryByIso(iso), national)}
      searchable
      searchPlaceholder="Search countries"
      emptyMessage="No countries found"
      ariaLabel="Country code"
      disabled={disabled}
      matchWidth
      menuFrom="root"
      menuClassName="origin-top-left"
      className={className}
      renderTrigger={({ ref, open, listId, toggle }) => (
        <button
          type="button"
          className={cn(
            'inline-flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-[12px] border px-3 font-sans text-[15px] font-normal',
            AUTH_FIELD_SURFACE,
            'transition-[border-color,box-shadow] duration-150',
            EASE,
            FOCUS_VISIBLE_RING,
            open && OPEN_RING,
            'disabled:cursor-not-allowed disabled:opacity-55',
          )}
          ref={ref}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label="Country code"
          disabled={disabled}
          onClick={toggle}
        >
          <span className="inline-flex h-4 w-[22px] items-center justify-center overflow-hidden rounded-[3px]">
            <CountryFlag iso={country.iso} size={18} className="h-4 w-[22px] rounded-[3px]" />
          </span>
          <span className="tabular-nums">+{country.dial}</span>
          <span
            className={cn(
              'inline-flex text-text-tertiary transition-transform duration-200',
              EASE,
              open && 'rotate-180',
            )}
            aria-hidden="true"
          >
            <DkChevronCaretDown size={14} strokeWidth={2} absoluteStrokeWidth />
          </span>
        </button>
      )}
    >
      <input
        ref={inputRef}
        type="tel"
        name="phone"
        className={cn(
          'h-11 min-w-0 flex-1 rounded-[12px] border px-4 font-sans text-[15px] font-normal caret-text-primary',
          AUTH_FIELD_SURFACE,
          'placeholder:text-text-tertiary',
          'transition-[border-color,box-shadow] duration-150',
          EASE,
          FOCUS_RING,
          'disabled:opacity-55',
        )}
        autoComplete="tel-national"
        inputMode="tel"
        placeholder={placeholder}
        aria-label={label}
        value={display}
        disabled={disabled}
        onChange={(event) => {
          handleNumberChange(event.target.value, event.target.selectionStart ?? event.target.value.length)
        }}
        onKeyDown={handleNumberKeyDown}
      />
    </Select>
  )
}

export { getCountryByIso, formatPhoneDisplay }
