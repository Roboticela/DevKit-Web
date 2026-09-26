'use client'

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DockTone = 'light' | 'dark'
export type DockPosition = 'fixed' | 'relative'

export const DOCK_TONES: DockTone[] = ['light', 'dark']
export const DOCK_TONE_LABEL: Record<DockTone, string> = {
  light: 'Light',
  dark: 'Dark',
}

const toneStyles: Record<DockTone, string> = {
  light: 'bg-white/[0.12] border-white/15',
  dark: 'bg-black/[0.25] border-white/[0.08]',
}

export type DockProps = {
  children: ReactNode
  /** Glass tint. Light for bright wallpaper, dark for dark wallpaper. */
  tone?: DockTone
  /** Fixed floats 8px above the screen's bottom edge. Relative stays in flow for previews. */
  position?: DockPosition
  /** Accessible name for the dock landmark. */
  label?: string
  className?: string
  style?: CSSProperties
}

/**
 * The Dock's outer glass container — the floating translucent bar that holds
 * all icons. 70px at rest and grows to fit magnified icons. The backdrop
 * blur samples whatever is really behind it (wallpaper, windows).
 */
export function Dock({
  children,
  tone = 'dark',
  position = 'fixed',
  label = 'Dock',
  className,
  style,
}: DockProps) {
  return (
    <nav
      aria-label={label}
      className={cn(
        position === 'fixed' && 'fixed bottom-2 left-1/2 z-[var(--z-dock)] -translate-x-1/2',
        position === 'relative' && 'relative mx-auto w-fit',
      )}
    >
      <div
        style={style}
        className={cn(
          // Sizing — 70px at rest, auto-grows for magnified icons, fits content
          // 8px gap between adjacent icon tiles, 8px padding each side
          'flex min-h-[70px] w-auto min-w-[64px] items-end justify-center gap-2 p-2',
          // Material — tint layered under a real backdrop blur
          'backdrop-blur-[24px] backdrop-saturate-[1.8]',
          // Glass edge highlight, radius, floating shadow, top rim light
          'rounded-[20px] border',
          'shadow-[var(--shadow-dock),inset_0_1px_0_var(--glass-highlight)]',
          // Smooth shell resize — never a hard snap
          'transition-[width,height] duration-150 ease-out motion-reduce:transition-none',
          toneStyles[tone],
          className,
        )}
      >
        {children}
      </div>
    </nav>
  )
}

