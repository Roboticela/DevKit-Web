'use client'

import {
  DkMagnifyingGlassFind
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'
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
      <IconButton
        label={placeholder}
        size="sm"
        className={cn('text-text-tertiary hover:text-text-primary', className)}
        onClick={onClick}
      >
        <DkMagnifyingGlassFind size={16} strokeWidth={1.75} absoluteStrokeWidth />
      </IconButton>
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
      <DkMagnifyingGlassFind size={14} strokeWidth={1.75} absoluteStrokeWidth className="shrink-0 text-text-tertiary" />
      <span className="min-w-0 flex-1 truncate text-[13px] font-normal text-text-tertiary">
        {placeholder}
      </span>
      <Kbd>⌘K</Kbd>
    </button>
  )
}
