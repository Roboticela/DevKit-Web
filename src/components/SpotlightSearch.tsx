'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'
import { DkMagnifyingGlassFind } from '@/icons'

export type SpotlightResult = {
  id: string
  title: string
  subtitle?: string
  icon?: ReactNode
  onSelect?: () => void
}

export type SpotlightSearchProps = {
  open?: boolean
  results?: SpotlightResult[]
  placeholder?: string
  onClose?: () => void
  className?: string
}

/**
 * Spotlight Search — modal-weight Glass Surface anchored 22% from the top,
 * a search-variant field, and live List Row results. Esc or a result
 * selection closes and returns focus.
 */
export function SpotlightSearch({
  open = true,
  results = [],
  placeholder = 'Spotlight Search',
  onClose,
  className,
}: SpotlightSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return results
    return results.filter(
      (item) => item.title.toLowerCase().includes(q) || item.subtitle?.toLowerCase().includes(q),
    )
  }, [query, results])

  if (!open) return null

  return (
    <div
      className={cn('absolute inset-0 z-[var(--z-spotlight)] flex justify-center bg-black/20', className)}
      onClick={onClose}
    >
      <GlassSurface
        weight="modal"
        className="mt-[22%] h-fit w-[560px] max-w-[92%] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-12 items-center gap-3 border-b border-[var(--glass-border-subtle)] px-4">
          <DkMagnifyingGlassFind size={18} strokeWidth={1.75} absoluteStrokeWidth className="text-text-tertiary" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Escape' && onClose?.()}
            placeholder={placeholder}
            aria-label={placeholder}
            className="w-full bg-transparent text-[17px] text-text-primary outline-none placeholder:text-text-tertiary"
          />
        </div>
        {query ? (
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-[13px] text-text-tertiary">No results for “{query}”</p>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect?.()
                    onClose?.()
                  }}
                  className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  {item.icon ? <span aria-hidden className="flex size-7 items-center justify-center">{item.icon}</span> : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{item.title}</span>
                    {item.subtitle ? (
                      <span className="block truncate text-[12px] opacity-70">{item.subtitle}</span>
                    ) : null}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : null}
      </GlassSurface>
    </div>
  )
}
