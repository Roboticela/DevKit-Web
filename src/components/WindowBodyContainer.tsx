'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Window Body Container (49) — opaque elevated surface container.
 *
 * Composes: Window chrome region + scroll viewport + resize-handle hit
 * zones. Unfocused state dims the chrome and softens the shadow.
 */

export type WindowBodyContainerProps = {
  /** Live freshness of the client so other organisms can read window state. */
  windowId: string
  title: string
  focused?: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  onDragStart?: (event: React.PointerEvent) => void
  onResizeStart?: (edge: ResizeEdge, event: React.PointerEvent) => void
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export type ResizeEdge =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'empty'

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

const CORNER_ZONE = 10
const EDGE_ZONE = 6

/**
 * Resolve which resize handle a pointer event lands in (for the caller's
 * `onResizeStart`), plus a computed cursor for that zone. Returns
 * `['empty', undefined]` when the event is not over any handle.
 */
export function resolveResizeHandle(
  clientX: number,
  clientY: number,
  _bounds: DOMRect,
  edge?: ResizeEdge,
): [resizeEdge: ResizeEdge, cursor: string] {
  const { left, top, width, height } = _bounds
  const cx = clientX - left
  const cy = clientY - top
  const right = left + width
  const bottom = top + height
  const isLeft = cx <= EDGE_ZONE
  const isRight = cx >= width - EDGE_ZONE
  const isTop = cy <= EDGE_ZONE
  const isBottom = cy >= height - EDGE_ZONE
  if (edge) {
    switch (edge) {
      case 'top': return ['top', EDGE_CURSORS.top]
      case 'bottom': return ['bottom', EDGE_CURSORS.bottom]
      case 'left': return ['left', EDGE_CURSORS.left]
      case 'right': return ['right', EDGE_CURSORS.right]
      case 'top-left': return ['top-left', EDGE_CURSORS['top-left']]
      case 'top-right': return ['top-right', EDGE_CURSORS['top-right']]
      case 'bottom-left': return ['bottom-left', EDGE_CURSORS['bottom-left']]
      case 'bottom-right': return ['bottom-right', EDGE_CURSORS['bottom-right']]
    }
  }
  if (isLeft && isTop) return ['top-left', EDGE_CURSORS['top-left']]
  if (isRight && isTop) return ['top-right', EDGE_CURSORS['top-right']]
  if (isLeft && isBottom) return ['bottom-left', EDGE_CURSORS['bottom-left']]
  if (isRight && isBottom) return ['bottom-right', EDGE_CURSORS['bottom-right']]
  if (isTop) return ['top', EDGE_CURSORS.top]
  if (isBottom) return ['bottom', EDGE_CURSORS.bottom]
  if (isLeft) return ['left', EDGE_CURSORS.left]
  if (isRight) return ['right', EDGE_CURSORS.right]
  return ['empty', EDGE_CURSORS.empty]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Window Manager Behaviors (50) — engine. Lives outside the painted chrome
 * so it can be composed with any window body.
 */
export function useWindowManager() {
  const reduced = usePrefersReducedMotion()

  function snapToEdge(
    clientX: number,
    clientY: number,
    bounds: DOMRect,
    side: 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'none',
  ) {
    if (reduced) return side
    const edgeZone = 12
    const cornerZone = 28
    const cx = clientX - bounds.left
    const cy = clientY - bounds.top
    const right = bounds.width - edgeZone
    const bottom = bounds.height - edgeZone
    const isTop = cy <= edgeZone
    const isBottom = cy >= bounds.height - edgeZone
    const isEdge = Math.abs(cx) <= edgeZone || Math.abs(cx - bounds.width) <= edgeZone
    const isCorner = (Math.abs(cx) <= cornerZone || Math.abs(cx - bounds.width) <= cornerZone) &&
      (Math.abs(cy) <= cornerZone || Math.abs(cy - bounds.height) <= cornerZone)
    if (isCorner) {
      if (Math.abs(cx) <= cornerZone && Math.abs(cy) <= cornerZone) return 'top-left'
      if (Math.abs(cx - bounds.width) <= cornerZone && Math.abs(cy) <= cornerZone) return 'top-right'
      if (Math.abs(cx) <= cornerZone && Math.abs(cy - bounds.height) <= cornerZone) return 'bottom-left'
      if (Math.abs(cx - bounds.width) <= cornerZone && Math.abs(cy - bounds.height) <= cornerZone) return 'bottom-right'
    }
    if (isEdge) {
      if (isTop) return 'top'
      if (isBottom) return 'bottom'
      if (Math.abs(cx) <= edgeZone) return 'left'
      if (Math.abs(cx - bounds.width) <= edgeZone) return 'right'
    }
    return 'none'
  }

  return { snapToEdge, reduced }
}

export function WindowBodyContainer({
  windowId,
  title,
  focused = true,
  width = 480,
  height = 300,
  minWidth = 320,
  minHeight = 240,
  onDragStart,
  onResizeStart,
  children,
  className,
  style,
}: WindowBodyContainerProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      aria-describedby={undefined}
      className={cn(
        'absolute flex flex-col overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--border-subtle)] bg-[var(--bg-elevated)]',
        focused ? 'shadow-[var(--shadow-lg)]' : 'shadow-[var(--shadow-sm)] brightness-[0.88]',
        focused ? 'brightness-1' : 'brightness-0.88',
        'transition-[filter,box-shadow] duration-200 motion-reduce:transition-none',
        'window-window',
        className,
      )}
      style={{ width, height, minWidth, minHeight, ...style }}
    >
      <div
        onPointerDown={onDragStart}
        className="relative flex h-11 shrink-0 items-center border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 select-none"
      >
        <span
          className={cn(
            'pointer-events-none absolute inset-x-16 text-center text-[var(--text-window-title-size)] font-[var(--text-window-title-weight)] truncate',
            focused ? 'text-text-primary' : 'text-text-tertiary',
          )}
        >
          {title}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
