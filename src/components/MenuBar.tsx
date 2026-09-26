'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'

export type MenuBarMenu = { label: string; bold?: boolean; onClick?: () => void }

export type MenuBarProps = {
  /** Leading app name, rendered bold. */
  appName?: string
  menus?: MenuBarMenu[]
  /** Status icons for the trailing side (wifi, battery, …). */
  status?: ReactNode
  className?: string
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date: Date) {
  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

/**
 * Menu Bar — the 28px system bar across the top. Menu-bar-weight Glass
 * Surface, app menus on the left, status icons and a live clock on the
 * right. Persists across Spaces; not part of any sliding container.
 */
export function MenuBar({ appName = 'Finder', menus = [], status, className }: MenuBarProps) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <GlassSurface
      weight="menubar"
      rim={false}
      className={cn(
        'flex h-7 items-center gap-4 px-3 text-[var(--text-menubar-size)] font-[var(--text-menubar-weight)] text-text-primary',
        className,
      )}
    >
      <button type="button" className="font-semibold cursor-[var(--cursor-pointer)]">{appName}</button>
      {menus.map((menu) => (
        <button
          key={menu.label}
          type="button"
          onClick={menu.onClick}
          className={cn('cursor-[var(--cursor-pointer)]', menu.bold && 'font-semibold')}
        >
          {menu.label}
        </button>
      ))}
      <span className="ml-auto flex items-center gap-3">
        {status}
        <span className="tabular-nums">{formatDate(now)}&ensp;{formatTime(now)}</span>
      </span>
    </GlassSurface>
  )
}
