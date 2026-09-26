'use client'

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { DockDivider } from './DockDivider'
import { DockTooltip } from './DockTooltip'

/** Hover delay before the Icon Tooltip appears — avoids flicker on fast sweeps. */
export const DOCK_TOOLTIP_DELAY = 400

export const DOCK_MAGNIFICATION_DEFAULTS = {
  baseSize: 56,
  maxSize: 96,
  influenceRadius: 140,
} as const

export const DOCK_MAGNIFICATION_LEVELS = ['low', 'medium', 'high'] as const
export type DockMagnificationLevel = (typeof DOCK_MAGNIFICATION_LEVELS)[number]

export const DOCK_MAGNIFICATION_LEVEL_LABEL: Record<DockMagnificationLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

/** Peak icon size per magnification level. */
export const DOCK_MAGNIFICATION_LEVEL_MAX: Record<DockMagnificationLevel, number> = {
  low: 72,
  medium: 96,
  high: 128,
}

/**
 * Cursor-proximity magnification for one icon. Gaussian-like falloff —
 * an organic ripple rather than a sharp triangular peak.
 */
export function getMagnification(
  cursorX: number,
  iconCenterX: number,
  baseSize: number = DOCK_MAGNIFICATION_DEFAULTS.baseSize,
  maxSize: number = DOCK_MAGNIFICATION_DEFAULTS.maxSize,
  influenceRadius: number = DOCK_MAGNIFICATION_DEFAULTS.influenceRadius,
): number {
  const distance = Math.abs(cursorX - iconCenterX)
  if (distance > influenceRadius) return baseSize
  const t = 1 - distance / influenceRadius
  const eased = Math.pow(t, 1.8) // steeper falloff near the peak
  return baseSize + (maxSize - baseSize) * eased
}

/** Slight overshoot-settle when the pointer leaves — the reserved spring token. */
const RESET_EASE = 'var(--ease-spring)'

export type DockMagnifierProps = {
  /** The DockIcon tiles. Sizes are computed per child, in order. */
  children: ReactNode
  /** Magnification strength, low to high. Sets the peak size unless maxSize overrides it. */
  level?: DockMagnificationLevel
  /** Resting icon size in px. */
  baseSize?: number
  /** Peak size in px at the cursor. Overrides the level's peak. */
  maxSize?: number
  /** Horizontal reach of the magnification field in px. */
  influenceRadius?: number
  className?: string
}

/**
 * Magnification Engine — the Dock's signature interaction. Wraps the Dock
 * Icons inside a Dock shell and grows them as the pointer approaches.
 *
 * Icons scale with GPU-accelerated `transform: scale()` from their bottom
 * edge (never width/height, so there is no reflow) and rise ABOVE the shell —
 * the shell never changes height. The shell's WIDTH animates wider as icons
 * magnify, neighbors shift outward to prevent overlap, and everything
 * settles back on mouse leave.
 */
export function DockMagnifier({
  children,
  level = 'medium',
  baseSize = DOCK_MAGNIFICATION_DEFAULTS.baseSize,
  maxSize,
  influenceRadius = DOCK_MAGNIFICATION_DEFAULTS.influenceRadius,
  className,
}: DockMagnifierProps) {
  const peakSize = maxSize ?? DOCK_MAGNIFICATION_LEVEL_MAX[level]
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([])
  const frameRef = useRef(0)
  const cursorXRef = useRef<number | null>(null)
  const [sizes, setSizes] = useState<number[]>([])
  const [leaving, setLeaving] = useState(false)
  // Icon Tooltip — one at a time, after a hover delay, tracking live position
  const [tipIndex, setTipIndex] = useState<number | null>(null)
  const [tipShown, setTipShown] = useState(false)
  const tipDelayRef = useRef(0)
  const tipExitRef = useRef(0)

  const items = Children.toArray(children)
  const count = items.length
  // Dividers are not icons — they never magnify and hold their size
  const dividers = items.map((child) => (child as ReactElement).type === DockDivider)
  const current = sizes.length === count ? sizes : Array<number>(count).fill(baseSize)
  const totalDelta = current.reduce((sum, size) => sum + (size - baseSize), 0)

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.clearTimeout(tipDelayRef.current)
      window.clearTimeout(tipExitRef.current)
    }
  }, [])

  // Only one tooltip at a time — a new hover cancels the old timer outright
  const scheduleTip = (index: number) => {
    window.clearTimeout(tipDelayRef.current)
    window.clearTimeout(tipExitRef.current)
    setTipShown(false)
    setTipIndex(null)
    tipDelayRef.current = window.setTimeout(() => {
      setTipIndex(index)
      requestAnimationFrame(() => setTipShown(true))
    }, DOCK_TOOLTIP_DELAY)
  }

  const hideTip = () => {
    window.clearTimeout(tipDelayRef.current)
    if (tipIndex != null) {
      setTipShown(false)
      window.clearTimeout(tipExitRef.current)
      tipExitRef.current = window.setTimeout(() => setTipIndex(null), 100)
    }
  }

  // Physics pass — runs once per animation frame, never raw event-per-pixel
  const measure = () => {
    frameRef.current = 0
    const container = containerRef.current
    const cursorX = cursorXRef.current
    if (!container || cursorX == null) return
    const containerLeft = container.getBoundingClientRect().left
    setSizes(
      items.map((_, index) => {
        if (dividers[index]) return baseSize
        const el = iconRefs.current[index]
        if (!el) return baseSize
        const centerX = containerLeft + el.offsetLeft + el.offsetWidth / 2
        return getMagnification(cursorX, centerX, baseSize, peakSize, influenceRadius)
      }),
    )
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    cursorXRef.current = event.clientX
    setLeaving(false)
    if (!frameRef.current) frameRef.current = requestAnimationFrame(measure)
  }

  const handleMouseLeave = () => {
    cursorXRef.current = null
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
    setLeaving(true)
    setSizes(Array<number>(count).fill(baseSize))
    hideTip()
  }

  // Secondary pass — distribute each icon's size delta as horizontal offset
  // so neighbors shift outward slightly and never overlap.
  const deltas = current.map((size) => size - baseSize)
  const offsets = current.map((_, index) => {
    let growLeft = 0
    let growRight = 0
    for (let j = 0; j < count; j++) {
      if (j < index) growLeft += deltas[j]
      else if (j > index) growRight += deltas[j]
    }
    return (growLeft - growRight) / 2
  })

  const iconTransition = leaving
    ? `transform 200ms ${RESET_EASE}`
    : 'transform 100ms ease-out'

  // Layout width at rest + the total magnification delta — the shell (which
  // hugs this row) animates wider as icons magnify, never taller.
  const GAP = 8
  const DIVIDER_WIDTH = 9 // 1px line + 4px margin each side
  const restWidth =
    items.reduce<number>((width, _, index) => width + (dividers[index] ? DIVIDER_WIDTH : baseSize), 0) +
    (count - 1) * GAP

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative flex items-end justify-center gap-2', className)}
      style={{
        width: restWidth + totalDelta,
        transition: 'width 150ms ease-out',
      }}
    >
      {items.map((child, index) =>
        dividers[index] ? (
          // Static — no transform, no magnification field
          <span key={(child as ReactElement).key ?? index} className="flex items-center self-stretch">
            {child}
          </span>
        ) : (
          <span
            key={(child as ReactElement).key ?? index}
            ref={(el) => {
              iconRefs.current[index] = el
            }}
            onMouseEnter={() => scheduleTip(index)}
            onMouseLeave={hideTip}
            className="block motion-reduce:transition-none!"
            style={
              {
                transform: `translateX(${offsets[index].toFixed(2)}px) scale(${(current[index] / baseSize).toFixed(4)})`,
                transformOrigin: 'bottom center',
                transition: iconTransition,
                // Exposed per frame so the Running Indicator can counter-scale
                // and hold its 4px size at any magnification.
                '--dock-scale': (current[index] / baseSize).toFixed(4),
              } as CSSProperties
            }
          >
            {child}
          </span>
        ),
      )}
      {tipIndex != null
        ? (() => {
            const label = (items[tipIndex] as ReactElement<{ label?: string }>).props?.label
            if (!label) return null
            // Centered above the icon's CURRENT magnified position — computed
            // from deterministic layout geometry, tracked live per frame.
            let center = 0
            for (let j = 0; j < tipIndex; j++) {
              center += (dividers[j] ? DIVIDER_WIDTH : baseSize) + GAP
            }
            center += baseSize / 2
            return (
              <DockTooltip
                shown={tipShown}
                style={{
                  left: center + offsets[tipIndex],
                  bottom: current[tipIndex] + 12,
                }}
              >
                {label}
              </DockTooltip>
            )
          })()
        : null}
    </div>
  )
}
