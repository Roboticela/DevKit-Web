'use client'

import { useMemo } from 'react'
import {
  DkGlobeWorldEarth
} from '@/icons'
import { COUNTRIES, sortedCountriesForSearch } from '@/lib/countries'
import { Select, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'
import { CountryFlag } from './CountryFlag'

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
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
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
  variant,
  size,
}: CountrySelectProps) {
  const flag = compact ? 16 : 18
  const enabledSet = useMemo(
    () => (enabledIsos ? new Set(enabledIsos.map((iso) => iso.toUpperCase())) : null),
    [enabledIsos],
  )
  const isEnabled = (iso: string) => !enabledSet || enabledSet.has(iso.toUpperCase())

  const options = useMemo(
    () =>
      sortedCountriesForSearch('').map((country) => {
        const available = isEnabled(country.iso)
        return {
          value: country.iso,
          label: country.name,
          icon: <CountryFlag iso={country.iso} size={compact ? 16 : 20} />,
          leadingFit: 'flag' as const,
          meta: available ? country.iso : 'Coming soon',
          keywords: country.dial,
          disabled: !available,
        }
      }),
    [compact, enabledSet],
  )

  return (
    <Select
      value={value ?? ''}
      onChange={(next) => onChange(next || null)}
      options={options}
      searchable
      searchPlaceholder="Search countries"
      placeholder={placeholder}
      ariaLabel={label}
      icon={<DkGlobeWorldEarth size={flag} strokeWidth={1.75} absoluteStrokeWidth />}
      allowClear={allowClear}
      clearLabel="Not set"
      emptyMessage="No countries found"
      disabled={disabled}
      compact={compact}
      variant={variant}
      size={size}
      className={className}
    />
  )
}
