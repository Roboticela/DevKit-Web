'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'
import { NotificationBanner } from './NotificationBanner'

export type Notification = {
  id: string
  app: string
  title: string
  body?: string
  timestamp?: string
  icon?: React.ReactNode
}

export { NotificationBanner }

/** Lock Screen (66) — blurred wallpaper backdrop, big clock, date, unlock gesture, notification previews. */
export type LockScreenProps = {
  /** Blurred wallpaper behind the lock UI. */
  backdropSrc: string
  /** Notifications previewed while locked. */
  notifications: Notification[]
  onUnlock: () => void
  /** Avoid re-rendering on every tick in dev if `date` is stable. */
  date?: Date
  className?: string
}

function formatClock(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function formatDate(date: Date) {
  return `${date.toLocaleDateString([], { weekday: 'long' })}, ${date.getDate()} ${date.toLocaleDateString([], { month: 'long' })} ${date.getFullYear()}`
}

export function LockScreen({
  backdropSrc,
  notifications = [],
  onUnlock,
  date,
  className,
}: LockScreenProps) {
  const [now, setNow] = useState(() => new Date())
  const mounted = useMemo(() => new Date(now), [now])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[var(--z-modal)] flex flex-col',
        className,
      )}
      onClick={onUnlock}
      role="dialog"
      aria-label="Lock screen"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${backdropSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <GlassSurface weight="modal" className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="lock-screen-backdrop absolute inset-0" style={{ backdropFilter: 'blur(40px) brightness(0.6)' }} />
          <span className="lock-clock text-center text-[96px] font-[var(--text-window-title-weight)] text-white">
            {formatClock(mounted)}
          </span>
          <span className="lock-date text-center text-[20px] font-normal text-white/85">{formatDate(mounted)}</span>
          {notifications.length > 0 ? (
            <div className="mt-4 flex max-h-[180px] flex-col gap-2 overflow-y-auto">
              {notifications.map((n) => (
                <NotificationBanner
                  key={n.id}
                  app={n.app}
                  title={n.title}
                  body={n.body}
                  timestamp={n.timestamp}
                  icon={n.icon}
                />
              ))}
            </div>
          ) : null}
          <div className="mt-2 text-center text-[14px] text-white/70">
            Tap anywhere or type to unlock
          </div>
        </GlassSurface>
      </div>
    </div>
  )
}
