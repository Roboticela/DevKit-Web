'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type DropItem = {
  /** Identifier passed to the onDrop callback. */
  id: string
  /** MIME/asset type this item may be dropped onto. */
  type: string
}

export type DropTarget = {
  id: string
  accepted: string[]
  children: ReactNode
  className?: string
}

const DropContext = createContext<{
  dragging: DropItem | null
  dragStart: { x: number; y: number }
  setDragging: (item: DropItem | null) => void
  setDragStart: (pos: { x: number; y: number }) => void
  targets: DropTarget[]
  onDragOver: (event: DragEvent, target: DropTarget) => void
  onDrop: (event: DragEvent, target: DropTarget) => void
} | null>(null)

/** Drag-and-Drop system (69) — global drag-ghost, valid/invalid drop zones, drop animation. */
export function DragAndDrop({
  items,
  onDrop,
  disabled = false,
  children,
  className,
}: {
  items: DropItem[]
  onDrop: (itemId: string, targetId: string) => void
  disabled?: boolean
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const [dragging, setDragging] = useState<DropItem | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activeTarget, setActiveTarget] = useState<string | null>(null)
  const [dropAnimation, setDropAnimation] = useState(false)
  const ghostRef = useRef<HTMLDivElement>(null)
  const targets = useMemo(() => {
    return (children as ReactNode[]).flatMap((child) => {
      if (typeof child === 'function') {
        const produced = (child as () => ReactNode[])?.() ?? []
        return produced
      }
      if (Array.isArray(child)) {
        return child.flatMap((c) => (typeof c === 'function' ? (c as () => ReactNode[])() : [c]))
      }
      return child === null || child === undefined ? [] : [child]
    })
  }, [children])

  const value = useMemo(() => {
    return {
      dragging,
      dragStart,
      setDragging,
      setDragStart,
      targets,
      onDragOver: (event: DragEvent, target: DropTarget) => {
        if (disabled || !dragging) return
        const valid = target.accepted.includes(dragging.type)
        setActiveTarget(valid ? target.id : null)
        event.preventDefault()
        const dt = event.dataTransfer
        if (dt) dt.dropEffect = valid ? 'move' : 'none'
      },
      onDrop: (event: DragEvent, target: DropTarget) => {
        if (disabled || !dragging) return
        event.preventDefault()
        setActiveTarget(null)
        onDrop(dragging.id, target.id)
        setDropAnimation(true)
        window.setTimeout(() => setDropAnimation(false), 250)
      },
    }
  }, [dragging, dragStart, disabled, targets, onDrop, setDragging, reduced, dropAnimation, setDropAnimation])

  const ghost = useMemo(() => {
    if (!dragging) return null
    return (
      <div
        ref={ghostRef}
        className={cn(
          'drag-ghost fixed z-[var(--z-modal)] pointer-events-none',
          'transition-transform duration-150 ease-out',
          dropAnimation ? 'scale-[0] opacity-0' : 'scale-105 opacity-80',
        )}
        style={{
          left: dragStart.x + 12,
          top: dragStart.y + 12,
        }}
      >
        <div className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[var(--shadow-lg)]">
          <span className="text-text-tertiary">📦</span>
          <span className="text-[14px] font-medium text-text-primary">{dragging.type}</span>
        </div>
      </div>
    )
  }, [dragging, dragStart, dropAnimation, reduced])

  return (
    <DropContext.Provider value={value}>
      <div className={cn('drag-and-drop', 'select-none', 'touch-none', className)}>
        {ghost}
        {children}
      </div>
    </DropContext.Provider>
  )
}

/** Registers a drop target whose highlight changes on valid/invalid drag-over. */
export function DropTarget({ id, accepted, children, className }: DropTarget) {
  const ctx = useContext(DropContext)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (!ctx) return
    const onDragOver = (event: DragEvent) => ctx.onDragOver(event, { id, accepted, children, className })
    const onDrop = (event: DragEvent) => ctx.onDrop(event, { id, accepted, children, className })
    const onDragLeave = (event: DragEvent) => {
      setValid(false)
    }
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)
    window.addEventListener('dragleave', onDragLeave)
    return () => {
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
      window.removeEventListener('dragleave', onDragLeave)
    }
  }, [ctx, id, accepted, children, className])

  return (
    <div
      className={cn(
        'drop-zone relative rounded-[var(--radius-md)] border transition-colors duration-150',
        valid ? 'drop-zone--valid' : 'drop-zone--invalid',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A widget corner handle used to trigger drag-and-drop resize. */
export function WidgetResizeHandle({ onDragStart, className }: { onDragStart: (event: React.PointerEvent) => void; className?: string }) {
  return (
    <div
      className={cn(
        'widget-resize-handle absolute right-0 bottom-0 z-10 size-4 rounded-[var(--radius-sm)] cursor-nwse-resize',
        'border border-[var(--border-subtle)] bg-[var(--bg-secondary)]',
        className,
      )}
      onPointerDown={(event) => {
        event.preventDefault()
        onDragStart(event)
      }}
    />
  )
}
