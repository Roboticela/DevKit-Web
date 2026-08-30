'use client'

import { useMemo } from 'react'
import {
  DkTranslateLanguagesWorld
} from '@/icons'
import {
  AVAILABLE_LANGUAGE_IDS,
  languageDisplayName,
  LANGUAGES,
} from '@/lib/languages'
import { Select, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'

export { languageDisplayName }

type LanguageSelectProps = {
  value: string | null
  onChange: (next: string) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  className?: string
  enabledIds?: readonly string[]
  compact?: boolean
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
}

export function LanguageSelect({
  value,
  onChange,
  disabled = false,
  label = 'Language',
  placeholder = 'Select a language',
  className = '',
  enabledIds = AVAILABLE_LANGUAGE_IDS,
  compact = false,
  variant,
  size,
}: LanguageSelectProps) {
  const mark = compact ? 16 : 18
  const enabledSet = useMemo(
    () => (enabledIds ? new Set(enabledIds) : null),
    [enabledIds],
  )

  const options = useMemo(() => {
    const icon = <DkTranslateLanguagesWorld size={mark} strokeWidth={1.75} absoluteStrokeWidth />
    const isEnabled = (id: string) => !enabledSet || enabledSet.has(id)
    return [...LANGUAGES]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((language) => {
        const available = isEnabled(language.id)
        return {
          value: language.id,
          label: language.name,
          icon,
          meta: available ? language.id : 'Coming soon',
          keywords: language.native,
          disabled: !available,
        }
      })
  }, [enabledSet, mark])

  return (
    <Select
      value={value ?? ''}
      onChange={(next) => {
        if (next) onChange(next)
      }}
      options={options}
      searchable
      searchPlaceholder="Search languages"
      placeholder={placeholder}
      ariaLabel={label}
      icon={<DkTranslateLanguagesWorld size={mark} strokeWidth={1.75} absoluteStrokeWidth />}
      emptyMessage="No languages found"
      disabled={disabled}
      compact={compact}
      variant={variant}
      size={size}
      className={className}
    />
  )
}
