'use client'

import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { squirclePath } from './Squircle'
import { useDockLaunchBounce } from './DockLaunchBounce'
import { DockRunningIndicator } from './DockRunningIndicator'

export type DockIconProps = {
  /** The icon artwork, pre-masked to a squircle. Prefer DockAppIcon. */
  children: ReactNode
  /** Accessible name, announced instead of the glyph. */
  label: string
  /** Rest size in px — 56 at rest. Magnification (Component 3) scales from here. */
  size?: number
  /** Shows the Running Indicator beneath the icon. */
  active?: boolean
  /** Open window count — more than one renders a slightly larger dot. */
  windows?: number
  /** Play the Launch Bounce on click. One bounce per launch — re-clicks during it are ignored. */
  bounce?: boolean
  onClick?: () => void
  /**
   * Fires with the bounce's final settle frame — the moment to set active
   * so the Running Indicator fades in as the icon lands.
   */
  onLaunch?: () => void
  className?: string
}

/**
 * Dock Icon — the base icon tile inside the Dock shell, in its un-magnified
 * resting state. The tile applies no rounding of its own; it trusts the icon
 * asset's own squircle mask. Fully static at idle — all motion is driven by
 * hover physics, not the base icon.
 */
export function DockIcon({
  children,
  label,
  size = 56,
  active = false,
  windows = 1,
  bounce = true,
  onClick,
  onLaunch,
  className,
}: DockIconProps) {
  const { ref, launch } = useDockLaunchBounce<HTMLButtonElement>(onLaunch)

  const handleClick = () => {
    if (bounce) launch()
    else onLaunch?.()
    onClick?.()
  }

  return (
    <span className="relative flex flex-col items-center">
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={handleClick}
        // The bounce leaps from the Dock surface — same anchor as magnification
        style={{ width: size, height: size, transformOrigin: 'bottom center' }}
        className={cn(
          // The full tile is the click target — no dead padding inside the visual bounds
          'flex items-center justify-center',
          // Slight lift off the glass shell surface
          'shadow-[var(--shadow-icon)]',
          className,
        )}
      >
        {children}
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2">
        <DockRunningIndicator visible={active} windows={windows} />
      </span>
    </span>
  )
}

/** The squircle's top edge only, as an open arc — for the rim highlight. */
function squircleTopArc(size = 1024, n = 5, steps = 90): string {
  const a = size / 2
  const power = 2 / n
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    // 195° → 345°: the top edge, feathering out at the upper sides
    const t = ((195 + (150 * i) / steps) * Math.PI) / 180
    const cos = Math.cos(t)
    const sin = Math.sin(t)
    const x = a + a * Math.sign(cos) * Math.abs(cos) ** power
    const y = a + a * Math.sign(sin) * Math.abs(sin) ** power
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return points.join(' ')
}

const SQUIRCLE_56 = squirclePath(56)
const SQUIRCLE_TOP_ARC_56 = squircleTopArc(56)

export type DockAppIconProps = {
  /** Light end of the face gradient — the top-left, where the light source sits. */
  from: string
  /** Dark end of the face gradient — the bottom-right. */
  to: string
  /** The glyph, optically centered on the face. */
  children?: ReactNode
  /** Rendered size in px. Match the surrounding DockIcon size. */
  size?: number
  className?: string
}

/**
 * Squircle app icon artwork for a Dock Icon, built to the first-party Apple
 * quality bar: a true n=5 superellipse mask, a single top-left 45° light
 * source with a diagonal face gradient, a soft top rim highlight inside the
 * mask, and a down-right drop shadow giving the glyph its own depth.
 */
export function DockAppIcon({ from, to, children, size = 56, className }: DockAppIconProps) {
  const id = useId()
  return (
    <span
      aria-hidden
      className={cn('relative block text-white', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 56 56" width={size} height={size} className="block">
        <defs>
          {/* Face gradient — top-left lighter to bottom-right darker, 45° light */}
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
          {/* Soft top sheen, fading out by the upper third */}
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${id}-mask`}>
            <path d={SQUIRCLE_56} />
          </clipPath>
        </defs>
        <path d={SQUIRCLE_56} fill={`url(#${id}-face)`} />
        <g clipPath={`url(#${id}-mask)`}>
          <rect width="56" height="56" fill={`url(#${id}-sheen)`} />
          {/* 1–2px inner rim highlight along the top edge only */}
          <path
            d={SQUIRCLE_TOP_ARC_56}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
      {children ? (
        <span
          className="absolute inset-0 flex items-center justify-center"
          // Glyph depth — soft down-right shadow, matching the top-left light
          style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.18))' }}
        >
          {children}
        </span>
      ) : null}
    </span>
  )
}
