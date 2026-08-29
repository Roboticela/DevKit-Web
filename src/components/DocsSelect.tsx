'use client'

import { Dropdown, type DropdownOption } from './Dropdown'

export type DocsSelectOption<T extends string> = DropdownOption<T>

export function DocsSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label?: string
  value: T
  options: DocsSelectOption<T>[]
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <Dropdown
      compact
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      className={className}
    />
  )
}
