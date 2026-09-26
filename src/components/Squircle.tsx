'use client'

import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Apple's continuity-corner squircle — a true superellipse, never a CSS
 * border-radius: |x/a|^n + |y/b|^n = 1 with Apple's exponent n = 5.
 * One definition, many consumers: Dock icons, desktop icons, app-store
 * thumbnails, squircle avatars. Never re-derive per component.
 */
export function squirclePath(size = 1024, n = 5, steps = 200): string {
  const a = size / 2
  const power = 2 / n
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const cos = Math.cos(t)
    const sin = Math.sin(t)
    const x = a + a * Math.sign(cos) * Math.abs(cos) ** power
    const y = a + a * Math.sign(sin) * Math.abs(sin) ** power
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return `${points.join(' ')} Z`
}

export const SQUIRCLE_N = 5

export type SquircleProps = {
  /** Rendered size in px. */
  size?: number
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Squircle Mask — clips any content to the n=5 superellipse via CSS
 * clip-path. Use it for app-icon-shaped surfaces that are not SVG.
 */
export function Squircle({ size = 56, children, className, style }: SquircleProps) {
  const path = useMemo(() => squirclePath(size), [size])
  return (
    <span
      className={cn('relative block overflow-hidden', className)}
      style={{ width: size, height: size, clipPath: `path("${path}")`, ...style }}
    >
      {children}
    </span>
  )
}
