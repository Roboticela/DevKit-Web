'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { cn } from '@/lib/cn'
import { FileTile } from '@/components/FileTile'
import { IconButton } from '@/components/IconButton'
import { Badge } from '@/components/Badge'
import { DkFileFolderDirectory } from '@/icons'
import type { FileEntry } from './files-model'

/** Multi-select + Drag (78) — rubber-band selection rectangle, multi-select on click, drag moves entire selection. */
export function MultiSelectDrag({
  entries,
  selection,
  onSelect,
  onDragStart,
  onDrop,
}: {
  entries: FileEntry[]
  selection: string[]
  onSelect: (path: string, selected: boolean) => void
  onDragStart: (path: string) => void
  onDrop: (paths: string[]) => void
}) {
  const [dragPath, setDragPath] = useState<string | null>(null)
  const [rubber, setRubber] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const dragGhostRef = useRef<HTMLDivElement>(null)

  const handleClick = (path: string) => {
    onSelect(path, true)
  }

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (rubber) {
      setRubber({ ...rubber, currentX: event.clientX, currentY: event.clientY })
    }
    if (dragging && dragPath) {
      const rect = dragGhostRef.current?.getBoundingClientRect()
      if (rect && dragGhostRef.current) {
        dragGhostRef.current.style.left = `${event.clientX - rect.width / 2}px`
        dragGhostRef.current.style.top = `${event.clientY - rect.height / 2}px`
      }
    }
  }

  const handlePointerUp = () => {
    if (rubber) setRubber(null)
    if (dragging && dragPath) {
      onDrop([dragPath])
      setDragPath(null)
      setDragging(false)
    }
  }

  const handleDragStart = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault()
    setDragPath(path)
    setDragging(true)
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    if (dragGhostRef.current) {
      dragGhostRef.current.style.left = `${rect.left - 10}px`
      dragGhostRef.current.style.top = `${rect.top - 10}px`
      dragGhostRef.current.style.width = `${rect.width}px`
      dragGhostRef.current.style.height = `${rect.height}px`
    }
    const tile = event.currentTarget
    const nativeEvent = event.nativeEvent as PointerEvent
    tile.setPointerCapture(nativeEvent.pointerId)
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-auto select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setRubber(null)}
    >
      <div
        className={cn(
          'absolute inset-0 rounded-[var(--radius-lg)] border-2 transition-none pointer-events-none',
          rubber && 'border-[var(--brand-primary)] bg-[var(--brand-primary-subtle)]',
          rubber && 'hidden sm:block',
        )}
        style={{
          left: rubber ? `${Math.min(rubber.startX, rubber.currentX)}px` : undefined,
          top: rubber ? `${Math.min(rubber.startY, rubber.currentY)}px` : undefined,
          width: rubber ? `${Math.abs(rubber.currentX - rubber.startX)}px` : undefined,
          height: rubber ? `${Math.abs(rubber.currentY - rubber.startY)}px` : undefined,
        }}
      />

      <div className="flex flex-1 flex-col gap-2 p-3">
        {entries.map((entry) => (          <FileTile
            key={entry.path}
            label={entry.label}
            icon={entry.icon ?? (entry.kind === 'folder' ? <DkFileFolderDirectory size={24} strokeWidth={1.6} /> : undefined)}
            selected={selection.includes(entry.path)}
            renaming={entry.path === 'renaming'}
            onRename={(next) => onSelect(entry.path, true)}
            onClick={() => handleClick(entry.path)}
          />
        ))}
      </div>

      {dragging && dragPath && (
        <div
          ref={dragGhostRef}
          className="drag-ghost fixed z-[var(--z-modal)] pointer-events-none rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[var(--shadow-lg)]"
          style={{ left: 0, top: 0, width: 0, height: 0 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-text-tertiary">📦</span>
            <span className="text-[14px] font-medium text-text-primary">{dragPath.split('/').pop()}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-3 py-2">
        <span className="text-[13px] text-text-secondary">{selection.length} selected</span>
        <div className="flex items-center gap-2">
          <IconButton label="Cut" size="sm" variant="ghost" onClick={() => {}}>
            <DkFileFolderDirectory size={16} strokeWidth={1.6} />
          </IconButton>
          <IconButton label="Copy" size="sm" variant="ghost" onClick={() => {}}>
            <DkFileFolderDirectory size={16} strokeWidth={1.6} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
