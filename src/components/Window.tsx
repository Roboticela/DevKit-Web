'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { TrafficLights } from './TrafficLights'

export type WindowProps = {
  title: string
  /** False mutes the chrome: gray dots, dimmed content, lighter shadow. */
  focused?: boolean
  width?: number
  height?: number
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  /** Title-bar drag region handler — the window manager moves the frame. */
  onDragStart?: (event: React.PointerEvent) => void
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Window — chrome plus body container. Opaque elevated surface, never glass:
 * windows are content containers; only system chrome floats on glass.
 * The title bar carries Traffic Lights, a centered 13px/500 title, and the
 * drag region. Content scrolls inside; unfocused windows dim and soften.
 */
export function Window({
  title,
  focused = true,
  width = 480,
  height = 300,
  onClose,
  onMinimize,
  onMaximize,
  onDragStart,
  children,
  className,
  style,
}: WindowProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className={cn(
        'absolute flex flex-col overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--border-subtle)] bg-[var(--bg-elevated)]',
        focused ? 'shadow-[var(--shadow-lg)]' : 'shadow-[var(--shadow-sm)] brightness-[0.88]',
        'transition-[filter,box-shadow] duration-200 motion-reduce:transition-none',
        className,
      )}
      style={{ width, height, ...style }}
    >
      <div
        onPointerDown={onDragStart}
        className="relative flex h-11 shrink-0 items-center bg-[var(--bg-secondary)] px-4"
      >
        <TrafficLights focused={focused} onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        <span
          className={cn(
            'pointer-events-none absolute inset-x-16 text-center text-[var(--text-window-title-size)] font-[var(--text-window-title-weight)]',
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
