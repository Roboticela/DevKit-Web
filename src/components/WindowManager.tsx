'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { resolveResizeHandle, type ResizeEdge, type WindowBodyContainerProps } from './WindowBodyContainer'

/**
 * Resize handles composited into the Window Body Container title bar and
 * bottom-right corner. Hit zones are large but the cursor swaps to the
 * correct resize axis the instant the pointer enters.
 */

const EDGE_HIT = 6
const CORNER_SIZE = 10

export function WindowResizeHandles({
  dimension,
  onResizeStart,
  className,
}: {
  dimension: 'width' | 'height'
  onResizeStart: (edge: 'left' | 'right' | 'top' | 'bottom', event: React.PointerEvent) => void
  className?: string
}) {
  const [active, setActive] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null)

  const style = useMemo(() => {
    if (dimension === 'width') {
      return {
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        cursor: 'ew-resize',
      }
    }
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      cursor: 'ns-resize',
    }
  }, [dimension])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (active) {
        onResizeStart?.(active, event as unknown as React.PointerEvent)
      }
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [active, onResizeStart])

  return (
    <>
      <div className="resize-edge-left absolute right-0 top-0 h-[calc(100%-8px)] w-1 border-l border-[var(--border-subtle)] cursor-ew-resize" />
      {dimension === 'width' ? (
        <div className="resize-edge-right absolute left-0 bottom-0 h-[calc(100%-8px)] w-1 border-l border-[var(--border-subtle)] cursor-ew-resize" />
      ) : (
        <div className="resize-edge-bottom absolute left-0 top-0 w-[calc(100%-8px)] h-1 border-t border-[var(--border-subtle)] cursor-ns-resize" />
      )}
      <div
        className={cn(
          'absolute z-10 block h-1 w-1 rounded-full bg-background-50 shadow-sm cursor-ew-resize',
          active === 'left' && 'bg-brand-primary',
          active === 'right' && 'bg-brand-primary',
          className,
        )}
        style={{ transform: 'translateY(-50%)', ...style, cursor: 'ew-resize' }}
        onPointerDown={(event) => {
          event.preventDefault()
          const handle = active === 'left' ? 'left' : 'right'
          onResizeStart?.(handle, event)
          setActive(handle)
        }}
      />
    </>
  )
}

const CORNER_EDGE: Record<string, ResizeEdge> = {
  'tl': 'top-left',
  'tr': 'top-right',
  'bl': 'bottom-left',
  'br': 'bottom-right',
}

const CORNER_CURSOR: Record<string, string> = {
  'tl': 'nwse-resize',
  'tr': 'nesw-resize',
  'bl': 'nesw-resize',
  'br': 'nwse-resize',
}

export function CornerResizers({
  onResizeStart,
  className,
}: {
  onResizeStart: (edge: ResizeEdge, event: React.PointerEvent) => void
  className?: string
}) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (active) {
        onResizeStart?.(CORNER_EDGE[active], event as unknown as React.PointerEvent)
      }
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [active, onResizeStart])

  return (
    <>
      <div className="resize-corner absolute right-0 bottom-0 size-10 border-t border-r border-[var(--border-subtle)] cursor-nwse-resize" />
      <div
        className={cn(
          'absolute right-0 bottom-0 size-10 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] cursor-nwse-resize',
          active && 'bg-brand-primary',
        )}
        style={{ top: '100%', left: '100%', cursor: 'nwse-resize' }}
        onPointerDown={(event) => {
          event.preventDefault()
          setActive('br')
          onResizeStart?.('bottom-right', event)
        }}
      >
        <div className="flex size-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bg-secondary)]" />
      </div>
    </>
  )
}

const EDGE_CURSORS: Record<ResizeEdge, string> = {
  top: 'ns-resize',
  bottom: 'ns-resize',
  left: 'ew-resize',
  right: 'ew-resize',
  'top-left': 'nwse-resize',
  'top-right': 'nesw-resize',
  'bottom-left': 'nesw-resize',
  'bottom-right': 'nwse-resize',
  empty: '',
}

export function WindowResizeHandleZone({
  onResizeStart,
  edge,
  className,
}: {
  onResizeStart: (edge: ResizeEdge, event: React.PointerEvent) => void
  edge: ResizeEdge
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  function onPointerDown(event: React.PointerEvent) {
    event.preventDefault()
    onResizeStart?.(edge, event)
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-20 block cursor-resize',
        edge === 'top' && 'top-0 left-0 right-0 h-3',
        edge === 'bottom' && 'bottom-0 left-0 right-0 h-3',
        edge === 'left' && 'left-0 top-0 bottom-0 w-3',
        edge === 'right' && 'right-0 top-0 bottom-0 w-3',
        edge === 'top-left' && 'top-0 left-0 h-6 w-6',
        edge === 'top-right' && 'top-0 right-0 h-6 w-6',
        edge === 'bottom-left' && 'bottom-0 left-0 h-6 w-6',
        edge === 'bottom-right' && 'bottom-0 right-0 h-6 w-6',
        className,
      )}
      style={{ cursor: EDGE_CURSORS[edge] }}
      onPointerDown={onPointerDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    />
  )
}
