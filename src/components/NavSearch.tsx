'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_RING } from '@/lib/styles'

export function NavSearch({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <label
      className={cn(
        'flex h-8 w-[120px] items-center gap-2 rounded-[980px] border border-transparent bg-bg-secondary px-3 text-text-tertiary',
        'min-[735px]:w-[180px]',
        'dark:bg-bg-secondary',
        'transition-[border-color,box-shadow] duration-150',
        EASE,
        FOCUS_RING,
        className,
      )}
    >
      <Search size={15} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 w-full border-0 bg-transparent font-sans text-[13px] font-normal leading-none text-text-primary outline-none placeholder:text-text-tertiary [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  )
}
