'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type FileTileProps = {
  /** File or folder name. */
  label: string
  /** 48px folder/file glyph or thumbnail. */
  icon?: ReactNode
  selected?: boolean
  /** Replaces the label with an auto-focused, pre-selected inline field. */
  renaming?: boolean
  onRename?: (next: string) => void
  onClick?: () => void
  className?: string
}

/**
 * File/Folder Icon Tile — icon + label unit for a file manager's icon grid.
 * Selection highlights only the label pill (matching Finder), not the whole
 * tile, keeping the icon visually clean.
 */
export function FileTile({
  label,
  icon,
  selected = false,
  renaming = false,
  onRename,
  onClick,
  className,
}: FileTileProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (renaming) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [renaming])

  const commit = () => {
    const next = inputRef.current?.value.trim()
    if (next && next !== label) onRename?.(next)
    else onRename?.(label)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex w-[88px] flex-col items-center gap-1 rounded-[var(--radius-lg)] p-2',
        'cursor-[var(--cursor-pointer)] transition-colors duration-150',
        selected ? 'bg-[var(--brand-primary-subtle)]' : 'hover:bg-[var(--bg-hover)]',
        className,
      )}
    >
      <span aria-hidden className="flex size-12 items-center justify-center">
        {icon}
      </span>
      {renaming ? (
        <input
          ref={inputRef}
          defaultValue={label}
          aria-label="Rename"
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commit()
            if (event.key === 'Escape') onRename?.(label)
          }}
          onClick={(event) => event.stopPropagation()}
          className="w-full rounded-[var(--radius-sm)] border border-[var(--border-focus)] bg-[var(--bg-elevated)] px-1 py-0 text-center text-[11px] text-text-primary outline-none"
        />
      ) : (
        <span
          className={cn(
            'line-clamp-2 max-w-full break-words text-center text-[11px] leading-[1.3]',
            selected
              ? 'rounded-[var(--radius-sm)] bg-[var(--brand-primary)] px-1 text-[var(--text-on-brand)]'
              : 'text-text-primary',
          )}
        >
          {label}
        </span>
      )}
    </button>
  )
}
