'use client'

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DockTooltipProps = {
  /** The icon's name. */
  children: ReactNode
  /** Drives entrance (fade + 4px upward slide, 150ms ease-out) and exit (fade only, 100ms). */
  shown?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Icon Tooltip — the name label that appears above a Dock Icon on hover.
 * Rendered and timed by the Magnification Engine so it tracks the icon's
 * live magnified position and only one is ever visible.
 */
export function DockTooltip({ children, shown = true, className, style }: DockTooltipProps) {
  return (
    <span
      role="tooltip"
      className={cn(
        'pointer-events-none absolute z-[var(--z-tooltip)] whitespace-nowrap rounded-[6px]',
        'border border-[var(--glass-border)] bg-[var(--glass-tint-tooltip)] backdrop-blur-[var(--glass-blur-tooltip)]',
        'px-2.5 py-1.5 text-[13px] font-medium text-white shadow-md',
        className,
      )}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: `translateX(-50%) translateY(${shown ? 0 : 4}px)`,
        // Faster out than in — tooltips disappear promptly
        transition: shown
          ? 'opacity 150ms ease-out, transform 150ms ease-out'
          : 'opacity 100ms ease-out, transform 100ms ease-out',
      }}
    >
      {children}
    </span>
  )
}
