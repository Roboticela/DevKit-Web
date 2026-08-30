'use client'

import { useMemo } from 'react'
import {
  DkFoldedMapTerritoryMapPinLocation,
  DkLandmarkClassicalBuilding,
  DkOfficeBuildingStructureAlternate,
} from '@/icons'
import {
  sortedCitiesForSearch,
  sortedCountiesForSearch,
  sortedSubdivisionsForSearch,
  subdivisionNoun,
  type City,
  type County,
  type Subdivision,
} from '@/lib/places'
import { Select, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'

export { cityDisplayName, countyDisplayName, stateDisplayName, subdivisionNoun } from '@/lib/places'

type SharedProps = {
  value: string | null
  onChange: (next: string | null) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  className?: string
  allowClear?: boolean
  compact?: boolean
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
}

function glyph(compact: boolean) {
  return { size: compact ? 16 : 18, strokeWidth: 1.75, absoluteStrokeWidth: true } as const
}

export function StateSelect({
  value,
  onChange,
  country = null,
  items,
  disabled = false,
  label,
  placeholder,
  className,
  allowClear = true,
  compact = false,
  variant,
  size,
}: SharedProps & {
  country?: string | null
  items?: Subdivision[]
}) {
  const noun = subdivisionNoun(country)
  const options = useMemo(() => {
    const icon = <DkLandmarkClassicalBuilding {...glyph(compact)} />
    const source = items
      ? items.filter((item) => !country || item.country === country.toUpperCase())
      : sortedSubdivisionsForSearch('', country)
    return source.map((item) => ({
      value: item.id,
      label: item.name,
      icon,
      meta: country ? item.code : item.country,
    }))
  }, [compact, country, items])

  return (
    <Select
      value={value ?? ''}
      onChange={(next) => onChange(next || null)}
      options={options}
      searchable
      searchPlaceholder={`Search ${noun.toLowerCase()}s`}
      placeholder={placeholder ?? `Select a ${noun.toLowerCase()}`}
      ariaLabel={label ?? noun}
      icon={<DkLandmarkClassicalBuilding {...glyph(compact)} />}
      allowClear={allowClear}
      emptyMessage={country ? `No ${noun.toLowerCase()}s for this country` : `No ${noun.toLowerCase()}s found`}
      disabled={disabled}
      compact={compact}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export function CountySelect({
  value,
  onChange,
  state = null,
  items,
  disabled = false,
  label = 'County',
  placeholder = 'Select a county',
  className,
  allowClear = true,
  compact = false,
  variant,
  size,
}: SharedProps & {
  state?: string | null
  items?: County[]
}) {
  const options = useMemo(() => {
    const icon = <DkFoldedMapTerritoryMapPinLocation {...glyph(compact)} />
    const source = items
      ? items.filter((item) => !state || item.subdivision === state)
      : sortedCountiesForSearch('', state)
    return source.map((item) => ({
      value: item.id,
      label: item.name,
      icon,
      meta: item.subdivision,
    }))
  }, [compact, items, state])

  return (
    <Select
      value={value ?? ''}
      onChange={(next) => onChange(next || null)}
      options={options}
      searchable
      searchPlaceholder="Search counties"
      placeholder={placeholder}
      ariaLabel={label}
      icon={<DkFoldedMapTerritoryMapPinLocation {...glyph(compact)} />}
      allowClear={allowClear}
      emptyMessage={state ? 'No counties for this state' : 'No counties found'}
      disabled={disabled}
      compact={compact}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export function CitySelect({
  value,
  onChange,
  country = null,
  state = null,
  county = null,
  items,
  disabled = false,
  label = 'City',
  placeholder = 'Select a city',
  className,
  allowClear = true,
  compact = false,
  variant,
  size,
}: SharedProps & {
  country?: string | null
  state?: string | null
  county?: string | null
  items?: City[]
}) {
  const options = useMemo(() => {
    const icon = <DkOfficeBuildingStructureAlternate {...glyph(compact)} />
    const source = items
      ? items.filter((item) => {
          if (county) return item.county === county
          if (state) return item.subdivision === state
          if (country) return item.country === country.toUpperCase()
          return true
        })
      : sortedCitiesForSearch('', { country, subdivision: state, county })
    return source.map((item) => ({
      value: item.id,
      label: item.name,
      icon,
      meta: item.subdivision,
    }))
  }, [compact, country, county, items, state])

  return (
    <Select
      value={value ?? ''}
      onChange={(next) => onChange(next || null)}
      options={options}
      searchable
      searchPlaceholder="Search cities"
      placeholder={placeholder}
      ariaLabel={label}
      icon={<DkOfficeBuildingStructureAlternate {...glyph(compact)} />}
      allowClear={allowClear}
      emptyMessage={county || state || country ? 'No cities for this place' : 'No cities found'}
      disabled={disabled}
      compact={compact}
      variant={variant}
      size={size}
      className={className}
    />
  )
}
