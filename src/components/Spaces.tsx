'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type Space = {
  id: string
  label: string
  wallpaper?: 'static' | 'slideshow' | 'dynamic' | 'video' | 'ambient'
}

export type SpacesProps = {
  spaces: Space[]
  activeIndex: number
  onActivate: (index: number) => void
  children: ReactNode
  className?: string
  /** Optional horizontal drag to swipe between spaces (trackpad). */
  dragEnabled?: boolean
  onSwipeEnd?: (index: number) => void
}

/**
 * Spaces / Virtual Desktops (52) — a 100vw-wide stack of full-screen
 * spaces. Horizontal drag (trackpad) or keyboard shortcuts translate the
 * container. Space indicator dots persist on the desktop, not inside the
 * sliding container. Each space owns its own window set and wallpaper.
 */
export function Spaces({
  spaces,
  activeIndex,
  onActivate,
  children,
  className,
  dragEnabled = true,
  onSwipeEnd,
}: SpacesProps) {
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(0)

  const move = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(spaces.length - 1, next))
      onActivate(clamped)
    },
    [spaces.length, onActivate],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Ctrl+Tab' || event.key === 'Cmd+Tab') return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        move(activeIndex + 1)
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        move(activeIndex - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        move(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        move(spaces.length - 1)
      }
    },
    [activeIndex, spaces.length, move],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const dots = useMemo(() => {
    return spaces.map((space, index) => (
      <button
        key={space.id}
        type="button"
        onClick={() => move(index)}
        aria-label={`Space ${index + 1}: ${space.label}`}
        aria-current={index === activeIndex ? 'true' : undefined}
        className={cn(
          'relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-[width,bg,color] duration-200',
          index === activeIndex
            ? 'bg-brand-primary w-6'
            : 'bg-white/30 hover:bg-white/50',
        )}
      >
        {index === activeIndex && (
          <span className="absolute inset-x-0 h-0.5 rounded-[var(--radius-pill)] bg-brand-primary" />
        )}
      </button>
    ))
  }, [spaces, activeIndex, move])

  const onPointerDown = (event: React.PointerEvent) => {
    if (!dragEnabled) return
    setDragging(true)
    startX.current = event.clientX
  }

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragEnabled || !dragging) return
    const dx = event.clientX - startX.current
    setOffset(dx)
  }

  const onPointerUp = (event: React.PointerEvent) => {
    if (!dragEnabled) return
    setDragging(false)
    const dx = event.clientX - startX.current
    if (Math.abs(dx) > 40) {
      const next = dx > 0 ? activeIndex - 1 : activeIndex + 1
      if (next >= 0 && next < spaces.length) {
        onActivate(next)
        onSwipeEnd?.(next)
      } else {
        onSwipeEnd?.(activeIndex)
      }
    } else {
      setOffset(0)
      onSwipeEnd?.(activeIndex)
    }
  }

  const transform = reduced ? `translateX(-${activeIndex * 100}%)` : `translateX(-${activeIndex * 100}%)`

  return (
    <>
      <div
        ref={containerRef}
        className={cn('flex w-full overflow-hidden', className)}
        style={{
          width: '100vw',
          height: '100vh',
          transform,
          transition: reduced ? 'none' : 'transform var(--duration-slow) var(--ease-standard)',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {spaces.map((space, index) => (
          <div
            key={space.id}
            className="flex h-full w-full flex-shrink-0 relative"
            style={{ width: '100vw', height: '100vh' }}
          >
            {children}
          </div>
        ))}
      </div>
      <div className="pointer-events-none fixed right-4 bottom-4 flex flex-col gap-2">
        {dots}
      </div>
    </>
  )
}
