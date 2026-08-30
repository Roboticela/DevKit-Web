'use client'

import { CommandSearch } from './CommandPalette'

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
  return (
    <CommandSearch
      onClick={onClick}
      variant={compact ? 'icon' : 'outline'}
      size="sm"
      icon={compact}
      placeholder={placeholder}
      shortcut={compact ? false : '⌘K'}
      className={className}
    />
  )
}
