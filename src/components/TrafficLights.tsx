'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TrafficLightAction = 'close' | 'minimize' | 'maximize'

export type TrafficLightsProps = {
  /** When false the dots mute to the border token — the window is in the background. */
  focused?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  className?: string
}

/* The one deliberate exception to token-only colors — macOS recognition. */
const lights: Record<TrafficLightAction, { color: string; label: string; glyph: ReactNode }> = {
  close: {
    color: '#FF5F57',
    label: 'Close',
    glyph: (
      <svg viewBox="0 0 12 12" className="size-[7px]" aria-hidden>
        <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  minimize: {
    color: '#FEBC2E',
    label: 'Minimize',
    glyph: (
      <svg viewBox="0 0 12 12" className="size-[7px]" aria-hidden>
        <path d="M2.5 6h7" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  maximize: {
    color: '#28C840',
    label: 'Maximize',
    glyph: (
      <svg viewBox="0 0 12 12" className="size-[7px]" aria-hidden>
        <path d="M3 6.6L6.6 3M5.4 9L9 5.4" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
}

const handlers = (action: TrafficLightAction, props: TrafficLightsProps) =>
  action === 'close' ? props.onClose : action === 'minimize' ? props.onMinimize : props.onMaximize

/**
 * Traffic-Light Control Set — the 3-dot close / minimize / maximize
 * cluster in a window's title bar. Glyphs appear when the group is
 * hovered; all three mute to gray when the window loses focus.
 */
export function TrafficLights({ focused = true, className, ...props }: TrafficLightsProps) {
  return (
    <span className={cn('group inline-flex items-center gap-2', className)}>
      {(Object.keys(lights) as TrafficLightAction[]).map((action) => {
        const light = lights[action]
        const onClick = handlers(action, props)
        return (
          <button
            key={action}
            type="button"
            aria-label={light.label}
            onClick={onClick}
            style={{ background: focused ? light.color : 'var(--border-default)' }}
            className={cn(
              'flex size-3 items-center justify-center rounded-full',
              'cursor-[var(--cursor-pointer)] transition-colors duration-150',
              !focused && 'pointer-events-none',
            )}
          >
            <span className="opacity-0 transition-opacity duration-100 group-hover:opacity-100">
              {focused ? light.glyph : null}
            </span>
          </button>
        )
      })}
    </span>
  )
}
