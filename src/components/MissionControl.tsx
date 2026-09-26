'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type WindowSnapshot = {
  id: string
  title: string
  bounds: { x: number; y: number; width: number; height: number }
  icon?: ReactNode
  zIndex: number
}

/** Mission Control / Exposé (51) — full-screen overview grid of every open window. */
export function MissionControl({
  windows,
  onSelect,
  onDismiss,
  className,
}: {
  windows: WindowSnapshot[]
  onSelect: (id: string) => void
  onDismiss: () => void
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    if (!reduced) {
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onDismiss?.()
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [reduced, onDismiss])

  // selectedIndex tracks which window is currently selected in the overview.
  const selectedIndex = useRef(-1)
  const cols = Math.max(1, Math.ceil(Math.sqrt(windows.length)))
  const rows = Math.max(1, Math.ceil(windows.length / cols))

  const thumbGrid = useMemo(() => {
    const cells: ReactNode[] = []
    const thumbW = 160
    const thumbH = 104
    const gap = 12
    const areaW = cols * (thumbW + gap) - gap
    const areaH = rows * (thumbH + gap) - gap
    const x0 = (window.innerWidth - areaW) / 2
    const y0 = (window.innerHeight - areaH) / 2

    for (let i = 0; i < windows.length; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      const x = x0 + col * (thumbW + gap)
      const y = y0 + row * (thumbH + gap)
      const window = windows[i]
      const isSelected = i === selectedIndex.current
      const transform = isSelected
        ? `scale(1) translate(0,0)`
        : `scale(0.4) translate(${x}px, ${y}px)`
      cells.push(
        <button
          key={window.id}
          type="button"
          onClick={() => onSelect(window.id)}
          onMouseEnter={() => setHovered(window.id)}
          onMouseLeave={() => setHovered(null)}
          aria-label={`Focus ${window.title}`}
          className={cn(
            'absolute rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated p-2 shadow-[var(--shadow-lg)] cursor-pointer transition-shadow duration-200',
            isSelected && 'scale-108 shadow-[var(--shadow-lg)] z-50',
            hovered !== null && !isSelected && 'scale-104',
            reduced && 'scale-100',
          )}
          style={{
            transform,
            transformOrigin: 'center center',
            opacity: isSelected ? 1 : 0.75,
          }}
        >
          {window.icon ? (
            <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-bg-tertiary">
              {window.icon}
            </span>
          ) : null}
          <span className="mt-1 truncate text-[12px] font-medium text-text-primary">{window.title}</span>
        </button>,
      )
    }
    return cells
  }, [windows, cols, rows, selectedIndex, hovered, reduced])

  // selectedIndex tracks the window currently selected in the overview.
  const [picked, setPicked] = useState<string | null>(null)

  const isTargetSelected = (id: string) => id === windows[selectedIndex.current]?.id

  const handleSelect = useCallback(
    (id: string) => {
      if (picked === id) return
      const target = windows.find((w) => w.id === id)
      if (!target) return
      selectedIndex.current = windows.findIndex((w) => w.id === id)
      setPicked(id)
      if (!target) return
      const focusX = target.bounds.x + target.bounds.width / 2
      const focusY = target.bounds.y + target.bounds.height / 2
      const anim = reduced || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      requestAnimationFrame(() => {
        const el = overlayRef.current
        if (!el) return
        el.style.cssText =
          `width:${target.bounds.width}px!important;height:${target.bounds.height}px!important;left:${target.bounds.x}px!important;top:${target.bounds.y}px!important;transform:scale(1)!important;transform-origin:0 0!important;opacity:1!important`
        if (!reduced) {
          setTimeout(() => {
            setPicked(null)
            onSelect(id)
          }, 180)
        } else {
          setPicked(null)
          onSelect(id)
        }
      })
    },
    [windows, picked, onSelect, reduced],
  )

  return (
    <div
      ref={overlayRef}
      className={cn('fixed inset-0 z-[var(--z-modal)] flex items-center justify-center', className)}
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)' }}
      onClick={onDismiss}
      role="dialog"
      aria-label="Mission Control"
      onKeyDown={(event) => event.key === 'Escape' && onDismiss?.()}
    >
      <div className="flex flex-row flex-wrap gap-3" style={{ width: `${cols * (160 + 12) - 12}px`, height: `${rows * (104 + 12) - 12}px` }}>
        {thumbGrid}
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
        <kbd className="h-6 w-14 rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-2 py-1 font-mono text-xs">Esc</kbd>
        <span className="text-xs">to focus a window</span>
      </div>
    </div>
  )
}
