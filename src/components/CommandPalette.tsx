'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Component, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { searchDocs, type DocsNavItem } from '@/lib/docs-catalog'
import { Kbd } from './Kbd'

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const groups = useMemo(() => searchDocs(query), [query])
  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    setIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setIndex((current) => (flat.length ? (current + 1) % flat.length : 0))
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setIndex((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
        return
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        const item = flat[index]
        if (item) openItem(item)
      }
    }

    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, flat, index, onClose])

  function openItem(item: DocsNavItem) {
    onClose()
    router.push(item.href)
  }

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[900] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        className="absolute inset-0 border-0 bg-bg-overlay backdrop-blur-[8px]"
        aria-label="Close search"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={inputId}
        className={cn(
          'relative z-[1] flex w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-elevated',
          'animate-docs-palette-in motion-reduce:animate-none',
        )}
      >
        <div className="flex h-[52px] items-center gap-3 px-4">
          <Search size={18} strokeWidth={1.75} absoluteStrokeWidth className="shrink-0 text-text-tertiary" />
          <input
            id={inputId}
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documentation…"
            autoComplete="off"
            spellCheck={false}
            className="h-full w-full border-0 bg-transparent font-sans text-base text-text-primary outline-none placeholder:text-text-tertiary"
          />
        </div>

        <div className="max-h-[min(420px,50vh)] overflow-y-auto border-t border-border-subtle">
          {flat.length === 0 ? (
            <p className="m-0 px-4 py-10 text-center text-sm text-text-tertiary">
              No results found for &lsquo;{query}&rsquo;
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.group} className="px-2 py-2">
                <p className="m-0 px-2 pb-1 text-[11px] font-medium tracking-[0.02em] text-text-tertiary">
                  {group.group}
                </p>
                {group.items.map((item) => {
                  const itemIndex = flat.findIndex((entry) => entry.id === item.id)
                  const selected = itemIndex === index
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setIndex(itemIndex)}
                      onClick={() => openItem(item)}
                      className={cn(
                        'flex h-10 w-full cursor-pointer items-center gap-2 rounded-[8px] border-0 px-2 text-left',
                        selected ? 'bg-bg-hover' : 'bg-transparent',
                      )}
                    >
                      <span className="inline-flex size-4 shrink-0 items-center justify-center text-text-tertiary">
                        <Component size={16} strokeWidth={1.75} absoluteStrokeWidth />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
                        {item.label}
                      </span>
                      <span className="shrink-0 text-[11px] text-text-tertiary">{item.searchGroup}</span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border-default px-3 py-3 text-[11px] text-text-tertiary">
          <span className="inline-flex items-center gap-1">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            Navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <Kbd>↵</Kbd>
            Select
          </span>
          <span className="inline-flex items-center gap-1">
            <Kbd>Esc</Kbd>
            Close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
