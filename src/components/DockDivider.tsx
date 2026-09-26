'use client'

import { cn } from '@/lib/cn'
import type { DockTone } from './Dock'

export type DockDividerProps = {
  /** Glass tone of the surrounding Dock shell. */
  tone?: DockTone
  className?: string
}

/**
 * Dock Divider — the thin vertical line separating pinned apps from the
 * minimized-windows and Trash section. Not a clickable icon: it never
 * magnifies and keeps its size regardless of cursor proximity.
 */
export function DockDivider({ tone = 'dark', className }: DockDividerProps) {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      className={cn(
        // 1px line, 42px tall (60% of the shell's 70px resting height)
        'block w-px self-center rounded-full',
        // mx-1 + the row's 8px gap = 12px each side — more breathing room than
        // regular icons, signalling a semantic break rather than spacing
        'mx-1',
        tone === 'light' ? 'bg-white/20' : 'bg-white/[0.12]',
        className,
      )}
      style={{ height: 42 }}
    />
  )
}
