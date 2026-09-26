'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export type DockRunningIndicatorProps = {
  /** Whether the app has an open window. Fades in/out over 150ms — never an instant pop. */
  visible?: boolean
  /** Open window count. More than one renders a slightly larger 5px dot instead of stacking dots. */
  windows?: number
  className?: string
}

/**
 * Running Indicator — the small dot beneath a Dock Icon showing the app has
 * an open window. Brand accent instead of macOS's plain white.
 *
 * When the icon is magnified, the indicator counter-scales against the
 * engine's --dock-scale variable, so it stays exactly 4px (5px for multiple
 * windows) and 4px below the icon's live bottom edge at any size.
 */
export function DockRunningIndicator({
  visible = true,
  windows = 1,
  className,
}: DockRunningIndicatorProps) {
  const size = windows > 1 ? 5 : 4
  return (
    <span
      aria-hidden
      className={cn('block rounded-full bg-[#3B9EFF] transition-opacity duration-150', className)}
      style={
        {
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          // Counter the Magnification Engine's scale — the origin sits on the
          // icon's bottom edge (4px above the dot), so the 4px gap and the
          // dot's size hold at any magnification.
          transform: 'scale(calc(1 / var(--dock-scale, 1)))',
          transformOrigin: 'center -4px',
        } as CSSProperties
      }
    />
  )
}
