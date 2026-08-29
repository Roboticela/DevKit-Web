'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Kbd } from './Kbd'

export function DocsSearchTrigger({
  onClick,
  className,
  compact = false,
  placeholder = 'Search documentation…',
}: {
  onClick: () => void
  className?: string
  compact?: boolean
  placeholder?: string
}) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={placeholder}
        className={cn(
          'inline-flex size-9 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-text-tertiary',
          'hover:bg-bg-hover hover:text-text-primary',
          className,
        )}
      >
        <Search size={16} strokeWidth={1.75} absoluteStrokeWidth />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-9 w-[240px] cursor-pointer items-center gap-2 rounded-[10px] border border-border-default bg-bg-tertiary px-3',
        'text-left font-sans',
        className,
      )}
    >
      <Search size={14} strokeWidth={1.75} absoluteStrokeWidth className="shrink-0 text-text-tertiary" />
      <span className="min-w-0 flex-1 truncate text-[13px] font-normal text-text-tertiary">
        {placeholder}
      </span>
      <Kbd>⌘K</Kbd>
    </button>
  )
}
