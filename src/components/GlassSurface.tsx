'use client'

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const GLASS_WEIGHTS = ['menubar', 'panel', 'modal', 'tooltip'] as const
export type GlassWeight = (typeof GLASS_WEIGHTS)[number]

export const GLASS_WEIGHT_LABEL: Record<GlassWeight, string> = {
  menubar: 'Menu Bar',
  panel: 'Panel',
  modal: 'Modal',
  tooltip: 'Tooltip',
}

const weights: Record<GlassWeight, { surface: string; rimInset: string }> = {
  menubar: {
    surface:
      'rounded-none bg-[var(--glass-tint-menubar)] backdrop-blur-[var(--glass-blur-menubar)] shadow-[var(--shadow-sm)]',
    rimInset: 'before:left-0 before:right-0',
  },
  panel: {
    surface:
      'rounded-[var(--radius-xl)] bg-[var(--glass-tint-panel)] backdrop-blur-[var(--glass-blur-panel)] shadow-[var(--shadow-md)]',
    rimInset: 'before:left-[var(--radius-xl)] before:right-[var(--radius-xl)]',
  },
  modal: {
    surface:
      'rounded-[var(--radius-xl)] bg-[var(--glass-tint-modal)] backdrop-blur-[var(--glass-blur-modal)] shadow-[var(--shadow-modal)]',
    rimInset: 'before:left-[var(--radius-xl)] before:right-[var(--radius-xl)]',
  },
  tooltip: {
    surface:
      'rounded-[var(--radius-md)] bg-[var(--glass-tint-tooltip)] backdrop-blur-[var(--glass-blur-tooltip)] shadow-[var(--shadow-sm)]',
    rimInset: 'before:left-[var(--radius-md)] before:right-[var(--radius-md)]',
  },
}

export type GlassSurfaceProps = {
  /** The weight class — swap only tint/blur/shadow/radius, structure stays identical. */
  weight?: GlassWeight
  /** Show the inner top-edge rim highlight. */
  rim?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Glass Surface — the one reusable blur + tint + border + shadow recipe
 * every chrome surface inherits. Four weight classes, all from Layer 0
 * glass tokens; no component builds its own blur/tint combination.
 */
export function GlassSurface({
  weight = 'panel',
  rim = true,
  children,
  className,
  style,
}: GlassSurfaceProps) {
  const recipe = weights[weight]
  return (
    <div
      className={cn(
        'relative border border-[var(--glass-border)]',
        recipe.surface,
        rim &&
          "before:pointer-events-none before:absolute before:top-0 before:h-px before:bg-[var(--glass-highlight)] before:content-['']",
        rim && recipe.rimInset,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
