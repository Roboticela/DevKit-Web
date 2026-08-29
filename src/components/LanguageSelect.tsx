'use client'

import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  DkTaskCompleteCheckmark,
  DkTranslateLanguagesWorld
} from '@/icons'
import {
  AVAILABLE_LANGUAGE_IDS,
  languageDisplayName,
  sortedLanguagesForSearch,
} from '@/lib/languages'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectEmpty, SelectList, SelectMenu, SelectOption, SelectSearch } from './SelectMenu'
import { SelectTrigger } from './SelectTrigger'

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
}: LanguageSelectProps) {
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
  const languages = useMemo(() => sortedLanguagesForSearch(query), [query])
  const selectedLabel = value ? languageDisplayName(value) : null
  const enabledSet = useMemo(
    () => (enabledIds ? new Set(enabledIds) : null),
    [enabledIds],
  )
  const isEnabled = (id: string) => !enabledSet || enabledSet.has(id)

  return (
    <div className={cn('relative w-full font-sans', className)} ref={rootRef}>
      <SelectTrigger
        ref={triggerRef}
        open={open}
        className={compact ? 'h-9 gap-2 rounded-[10px] px-3 text-[13px]' : undefined}
        leading={<DkTranslateLanguagesWorld size={compact ? 16 : 18} strokeWidth={1.75} absoluteStrokeWidth />}
        placeholder={!selectedLabel}
        chevronSize={compact ? 14 : 16}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        {selectedLabel ?? placeholder}
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
                placeholder="Search languages"
              />
              <SelectList>
                {languages.length === 0 ? (
                  <SelectEmpty>No languages found</SelectEmpty>
                ) : (
                  languages.map((item) => {
                    const isSelected = item.id === value
                    const available = isEnabled(item.id)
                    return (
                      <SelectOption
                        key={item.id}
                        selected={isSelected}
                        unavailable={!available}
                        leading={
                          <DkTranslateLanguagesWorld size={18} strokeWidth={1.75} absoluteStrokeWidth />
                        }
                        name={item.name}
                        meta={available ? item.id : 'Coming soon'}
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
                          onChange(item.id)
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
