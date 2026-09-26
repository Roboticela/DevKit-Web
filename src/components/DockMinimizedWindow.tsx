'use client'

import { useRef } from 'react'
import { cn } from '@/lib/cn'

export const DOCK_GENIE_DURATION = 400
/** scaleY completes this many ms before scaleX — the liquid "pour". */
export const DOCK_GENIE_STAGGER = 80

export type DockMinimizedWindowProps = {
  /** Window title, used as the accessible name and tooltip. */
  label: string
  /**
   * Live-captured snapshot of the window's last frame at minimize time
   * (canvas/image capture), never a generic icon.
   */
  snapshot: string
  /** Fires when the genie restore completes — swap the tile for the real window. */
  onRestore?: () => void
  className?: string
}

/**
 * Minimized Window Tile — the live-thumbnail tile in the Dock's right
 * section for a minimized window. Smaller and non-square vs. app icons,
 * with a 6px radius, so it reads as a window snapshot, not an app.
 *
 * Click to restore plays the genie effect: the tile pours back out toward
 * its window with a warped scale — scaleY and scaleX animate on nested
 * elements with independent timing (scaleY finishes 80ms before scaleX),
 * 400ms ease-out total. Minimize-in is the reverse warp, down into the tile.
 */
export function DockMinimizedWindow({
  label,
  snapshot,
  onRestore,
  className,
}: DockMinimizedWindowProps) {
  // Nested elements give each axis its own animation clock
  const xAxisRef = useRef<HTMLSpanElement>(null)
  const yAxisRef = useRef<HTMLSpanElement>(null)
  const playingRef = useRef(false)

  const restore = () => {
    const xAxis = xAxisRef.current
    const yAxis = yAxisRef.current
    if (!xAxis || !yAxis || playingRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onRestore?.()
      return
    }
    playingRef.current = true
    // Vertical stretch leads — pours upward out of the Dock first
    const pourY = yAxis.animate(
      [
        { transform: 'scaleY(1)', opacity: 1 },
        { transform: 'scaleY(3.2)', opacity: 1, offset: 0.75 },
        { transform: 'scaleY(3.6)', opacity: 0, offset: 1 },
      ],
      { duration: DOCK_GENIE_DURATION - DOCK_GENIE_STAGGER, easing: 'ease-out', fill: 'forwards' },
    )
    // Horizontal stretch follows, completing 80ms after scaleY
    const pourX = xAxis.animate(
      [{ transform: 'scaleX(1)' }, { transform: 'scaleX(2.4)' }],
      { duration: DOCK_GENIE_DURATION, easing: 'ease-out', fill: 'forwards' },
    )
    pourX.onfinish = () => {
      // Reset silently so a future minimize starts clean
      pourY.cancel()
      pourX.cancel()
      playingRef.current = false
      onRestore?.()
    }
  }

  return (
    <span ref={xAxisRef} className="block" style={{ transformOrigin: 'bottom center' }}>
      <span ref={yAxisRef} className="block" style={{ transformOrigin: 'bottom center' }}>
        <button
          type="button"
          aria-label={`Restore ${label}`}
          onClick={restore}
          className={cn(
            // 48×40 — smaller and non-square vs. the 56px app icons
            'block overflow-hidden rounded-[6px] border border-white/15',
            'shadow-[var(--shadow-icon)]',
            className,
          )}
          style={{ width: 48, height: 40, transformOrigin: 'bottom center' }}
        >
          {/* The window's last live frame, captured at minimize time */}
          <span
            aria-hidden
            className="block size-full bg-cover bg-center"
            style={{ backgroundImage: `url(${snapshot})` }}
          />
        </button>
      </span>
    </span>
  )
}
