'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'
import { IconButton } from './IconButton'
import { DkCloseDismissCancel } from '@/icons'

export const NOTIFICATION_AUTO_DISMISS = 5000

export type NotificationBannerProps = {
  /** App name, shown small and uppercase. */
  app: string
  title: string
  body?: string
  timestamp?: string
  /** 32px app icon, squircle artwork preferred. */
  icon?: ReactNode
  /** Called on manual dismiss and when the 5s auto-dismiss elapses. */
  onDismiss?: () => void
  className?: string
}

/**
 * Notification Banner — icon, text, timestamp, and dismiss on a panel-weight
 * Glass Surface. Slides in with the reserved spring ease, auto-dismisses
 * after 5s, and pauses while hovered.
 */
export function NotificationBanner({
  app,
  title,
  body,
  timestamp,
  icon,
  onDismiss,
  className,
}: NotificationBannerProps) {
  const [entered, setEntered] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Auto-dismiss 5s, paused on hover
  useEffect(() => {
    if (!onDismiss) return undefined
    timerRef.current = window.setTimeout(onDismiss, NOTIFICATION_AUTO_DISMISS)
    return () => window.clearTimeout(timerRef.current)
  }, [onDismiss])

  const pause = () => window.clearTimeout(timerRef.current)
  const resume = () => {
    if (onDismiss) {
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(onDismiss, NOTIFICATION_AUTO_DISMISS)
    }
  }

  return (
    <div onMouseEnter={pause} onMouseLeave={resume} className={cn('group w-[320px]', className)}>
      <GlassSurface
        weight="panel"
        className={cn(
          'flex gap-3 rounded-[var(--radius-lg)] p-3',
          'transition-[opacity,transform] motion-reduce:transition-none',
          entered ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0',
        )}
        style={{
          // One of the two reserved spring moments system-wide
          transitionDuration: 'var(--duration-slow)',
          transitionTimingFunction: 'var(--ease-spring)',
        }}
      >
        {icon ? (
          <span aria-hidden className="size-8 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-text-tertiary">
              {app}
            </span>
            {timestamp ? (
              <span className="shrink-0 text-[11px] text-text-tertiary">{timestamp}</span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-[14px] font-semibold text-text-primary">{title}</span>
          {body ? (
            <span className="mt-0.5 line-clamp-2 block text-[13px] text-text-secondary">{body}</span>
          ) : null}
        </span>
        {onDismiss ? (
          <span className="shrink-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
            <IconButton label="Dismiss" size="sm" variant="ghost" onClick={onDismiss}>
              <DkCloseDismissCancel size={14} strokeWidth={2} absoluteStrokeWidth aria-hidden />
            </IconButton>
          </span>
        ) : null}
      </GlassSurface>
    </div>
  )
}
