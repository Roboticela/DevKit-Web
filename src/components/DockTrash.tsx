'use client'

import { useRef, useState, type DragEvent } from 'react'
import { cn } from '@/lib/cn'

export type DockTrashProps = {
  /** Whether the Trash has items — swaps the wastebasket artwork with a 200ms crossfade. */
  hasItems?: boolean
  /** Rest size in px — 56, like a normal Dock Icon. Participates in magnification. */
  size?: number
  /** Fires when an item is dropped in — set hasItems from here. */
  onDropItem?: () => void
  className?: string
}

/**
 * Trash Well — the Trash/Recently-Deleted icon anchored as the final item
 * in the Dock's right section, after the Dock Divider. Magnifies like a
 * normal icon. Empty shows an outline wastebasket; items show crumpled
 * paper inside. Dragging a file over it lights a red drop-target glow, and
 * a drop flies into the tile's center before the well compress-bounces.
 */
export function DockTrash({ hasItems = false, size = 56, onDropItem, className }: DockTrashProps) {
  const [dragOver, setDragOver] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ghostRef = useRef<HTMLSpanElement>(null)
  const bouncingRef = useRef(false)

  const receive = (clientX: number, clientY: number) => {
    const button = buttonRef.current
    // Compress-bounce on receipt — scale 1 → 0.9 → 1, 200ms
    if (button && !bouncingRef.current) {
      bouncingRef.current = true
      const bounce = button.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.9)', offset: 0.5 }, { transform: 'scale(1)' }],
        { duration: 200, easing: 'ease-out' },
      )
      bounce.onfinish = () => {
        bouncingRef.current = false
      }
    }
    // The dropped item scales to 0 while flying toward the tile's center
    const ghost = ghostRef.current
    if (button && ghost) {
      const rect = button.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      ghost.style.left = `${x - 8}px`
      ghost.style.top = `${y - 8}px`
      ghost.style.opacity = '1'
      const flight = ghost.animate(
        [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          {
            transform: `translate(${rect.width / 2 - x}px, ${rect.height / 2 - y}px) scale(0)`,
            opacity: 0.4,
          },
        ],
        { duration: 300, easing: 'ease-in' },
      )
      flight.onfinish = () => {
        ghost.style.opacity = '0'
      }
    }
    onDropItem?.()
  }

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDragOver(false)
    receive(event.clientX, event.clientY)
  }

  return (
    <span className="relative flex flex-col items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Trash"
        title="Trash"
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          width: size,
          height: size,
          transformOrigin: 'bottom center',
          transform: dragOver ? 'scale(1.15)' : 'scale(1)',
          boxShadow: dragOver
            ? '0 0 0 3px rgba(255,69,58,0.4), var(--shadow-icon)'
            : 'var(--shadow-icon)',
        }}
        className={cn(
          'flex items-center justify-center rounded-[16px] text-[#ececf2]',
          'transition-[transform,box-shadow] duration-150 ease-out motion-reduce:transition-none',
          dragOver && 'bg-[#FF453A]/10',
          className,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          width={Math.round(size * 0.64)}
          height={Math.round(size * 0.64)}
          aria-hidden
        >
          {/* Empty — outline-only wastebasket */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: hasItems ? 0 : 1, transition: 'opacity 200ms' }}
          >
            <path d="M5.5 7h13" />
            <path d="M9.7 7V5.6a1.4 1.4 0 0 1 1.4-1.4h1.8a1.4 1.4 0 0 1 1.4 1.4V7" />
            <path d="M7.2 7l.7 11.2a2 2 0 0 0 2 1.8h4.2a2 2 0 0 0 2-1.8L16.8 7" />
            <path d="M10.2 10.5v6M13.8 10.5v6" />
          </g>
          {/* Has items — crumpled paper visible inside */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: hasItems ? 1 : 0, transition: 'opacity 200ms' }}
          >
            <path d="M7.2 7l.7 11.2a2 2 0 0 0 2 1.8h4.2a2 2 0 0 0 2-1.8L16.8 7" />
            <path d="M5.5 7h13" />
            <path d="M8.2 6.6l1-2.2 2.6-.8 2 1.6 2.2-.4.8 2" fill="currentColor" fillOpacity={0.85} stroke="none" />
            <path d="M9.4 10.2l.5 6M12 10.2v6M14.6 10.2l-.5 6" />
            <path d="M8.1 12.4h7.8l-.4 5.6a1.7 1.7 0 0 1-1.7 1.5h-3.6a1.7 1.7 0 0 1-1.7-1.5z" fill="currentColor" fillOpacity={0.22} stroke="none" />
          </g>
        </svg>
      </button>
      {/* The dropped item's ghost — positioned and animated imperatively on drop */}
      <span
        ref={ghostRef}
        aria-hidden
        className="pointer-events-none absolute z-10 size-4 rounded-[4px] bg-[#e8e8ee] opacity-0 shadow-md"
      />
    </span>
  )
}
