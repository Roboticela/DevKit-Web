'use client'

import { createPortal } from 'react-dom'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectList, SelectMenu, SelectOption } from './SelectMenu'
import { SelectTrigger } from './SelectTrigger'
import { Caption } from './Text'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
}

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled = false,
  compact = false,
  className,
}: {
  label?: string
  value: T
  options: DropdownOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
  compact?: boolean
  className?: string
}) {
  const {
    open,
    setOpen,
    menuStyle,
    openUp,
    rootRef,
    triggerRef,
    menuRef,
    listId,
    close,
  } = useAnchoredMenu([options.length], {
    minWidth: compact ? 148 : 220,
    maxWidth: compact ? 240 : 360,
    estimatedHeight: Math.min(360, 48 + options.length * (compact ? 36 : 44)),
  })

  const selected = options.find((option) => option.value === value)

  return (
    <div className={cn('flex min-w-[7.5rem] flex-col gap-1 font-sans', className)} ref={rootRef}>
      {label ? (
        <Caption as="span">{label}</Caption>
      ) : null}
      <SelectTrigger
        ref={triggerRef}
        open={open}
        chevronSize={compact ? 14 : 16}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        className={
          compact
            ? 'h-8 gap-2 rounded-[8px] px-2.5 pr-2 text-[13px]'
            : undefined
        }
        onClick={() => setOpen((current) => !current)}
      >
        {selected?.label ?? 'Select'}
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
              <SelectList>
                {options.map((option) => {
                  const isSelected = option.value === value
                  return (
                    <SelectOption
                      key={option.value}
                      selected={isSelected}
                      className={compact ? 'min-h-8 gap-2 px-2 text-[13px]' : undefined}
                      name={
                        <span className={isSelected ? 'text-brand-primary' : undefined}>
                          {option.label}
                        </span>
                      }
                      check={
                        isSelected ? (
                          <DkTaskCompleteCheckmark
                            className="shrink-0 text-brand-primary"
                            size={compact ? 14 : 16}
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
                })}
              </SelectList>
            </SelectMenu>,
            document.body,
          )
        : null}
    </div>
  )
}
