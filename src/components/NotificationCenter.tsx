'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
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

export type NotificationCenterProps = {
  notifications: Notification[]
  open: boolean
  onClose: () => void
  onDismiss?: (id: string) => void
  groupByApp?: boolean
  onAction?: (id: string, action: string) => void
}

export function NotificationCenter({
  notifications = [],
  open,
  onClose,
  onDismiss,
  groupByApp = true,
  onAction,
}: NotificationCenterProps) {
  const reduced = usePrefersReducedMotion()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [listOpen, setListOpen] = useState(false)

  useEffect(() => {
    if (open) setListOpen(true)
  }, [open])

  const grouped = useMemo(() => {
    if (!groupByApp) return { groups: [] as Array<[string, Notification[]]>, all: [] }
    const map = new Map<string, Notification[]>()
    for (const n of notifications) {
      const key = n.app || 'Other'
      const list = map.get(key) ?? []
      list.push(n)
      map.set(key, list)
    }
    return { groups: Array.from(map.entries()), all: [] }
  }, [notifications, groupByApp])

  const renderGroup = useCallback(
    (app: string, items: Notification[], index: number) => {
      const expanded = listOpen && items.length > 3
      const visible = expanded ? items : items.slice(0, 3)
      return (
        <div key={app} className="notification-group">
          <div className="notification-group-header">{app}</div>
          <div className="flex flex-col gap-2">
            {visible.map((n) => (
              <NotificationBanner
                key={n.id}
                app={n.app}
                title={n.title}
                body={n.body}
                timestamp={n.timestamp}
                icon={n.icon}
                onDismiss={() => onDismiss?.(n.id)}
              />
            ))}
            {items.length > 3 ? (
              <button
                type="button"
                onClick={() => setListOpen((v) => !v)}
                className="mt-1 flex w-full items-center gap-2 text-[13px] font-medium text-brand-primary hover:underline"
              >
                <span>{expanded ? 'Show less' : `3 more from ${app}`}</span>
              </button>
            ) : null}
          </div>
        </div>
      )
    },
    [listOpen, onDismiss, onAction],
  )

  if (!open) return null

  return (
    <>
      <div className="fixed right-0 top-0 bottom-0 z-[var(--z-notifications)]">
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setListOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
      <div
        className={cn(
          'fixed inset-0 z-[var(--z-notifications)]',
          'flex flex-col bg-[var(--bg-overlay)]',
        )}
        onClick={() => onClose()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setListOpen(false)}
            className="m-4 flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-text-secondary hover:text-text-primary"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex max-w-[420px] flex-1 flex-col overflow-hidden">
          <div className="flex h-11 items-center gap-3 border-b border-[var(--border-subtle)] px-4">
            <svg className="size-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="text-[17px] font-medium text-text-primary">Notifications</span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {notifications.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-text-tertiary">
                <p className="text-center text-[13px]">No notifications</p>
              </div>
            ) : (
              <>
                {grouped.groups.length === 0 ? (
                  notifications.map((n) => (
                    <NotificationBanner
                      key={n.id}
                      app={n.app}
                      title={n.title}
                      body={n.body}
                      timestamp={n.timestamp}
                      icon={n.icon}
                      onDismiss={() => onDismiss?.(n.id)}
                    />
                  ))
                ) : (
                  grouped.groups.map(([app, items]) => renderGroup(app, items, 0))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
