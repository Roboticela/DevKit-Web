'use client'

import { useEffect, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react'
import type { ReactElement, ReactPortal } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'
import { IconButton } from './IconButton'
import { DkCloseDismissCancel } from '@/icons'
import { Button, type ButtonVariant } from './Button'

/**
 * Toast / Alert Dialog (68) — modal variant of Notification Banner. Centered
 * and blocking rather than corner-transient. Entrance: calm fade + scale
 * (no spring — spring is reserved for Notification Banner and Dock
 * magnification).
 */
export type AlertDialogAction = 'confirm' | 'cancel'

export type AlertDialogProps = {
  icon?: ReactNode
  title: string
  body?: string
  variant?: 'info' | 'danger' | 'success' | 'warning'
  onClose: () => void
  /** With-actions variant: two Buttons side by side. */
  actions?: { label: string; variant?: ButtonVariant; destructive?: boolean }[]
  className?: string
}

function iconFor(variant: AlertDialogProps['variant']): ReactNode {
  switch (variant) {
    case 'danger':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M12 9v4M12 17h.01" /><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
    case 'success':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    case 'warning':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg>
    default:
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
  }
}

export function AlertDialog({
  icon,
  title,
  body,
  variant = 'info',
  onClose,
  actions,
  className,
}: AlertDialogProps) {
  const [entered, setEntered] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  const backdrop = () => {
    timerRef.current = window.setTimeout(onClose, 0)
  }
  useEffect(backdrop, [onClose])

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <GlassSurface
        weight="modal"
        className={cn('w-[360px] rounded-[var(--radius-xl)] p-6 text-center', className)}
        onClick={(event: ReactMouseEvent) => event.stopPropagation()}
      >
          <div
            className={cn(
              'mx-auto flex size-12 items-center justify-center rounded-full',
              variant === 'danger' && 'bg-danger-subtle text-danger',
              variant === 'success' && 'bg-success-subtle text-success',
              variant === 'warning' && 'bg-warning-subtle text-warning',
              variant === 'info' && 'bg-brand-primary-subtle text-brand-primary',
            )}
          >
            {icon ?? iconFor(variant)}
          </div>
          <h2 className="alert-dialog-title text-[17px] font-[var(--text-window-title-weight)] text-text-primary">
            {title}
          </h2>
          {body ? (
            <p className="alert-dialog-body mt-2 text-[14px] text-text-secondary">{body}</p>
          ) : null}
          {actions && actions.length > 0 ? (
            <div className="alert-dialog-actions mt-6 flex gap-3">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.destructive ? 'danger' : action.variant ?? 'primary'}
                  fullWidth
                  onClick={onClose}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : (
            <div className="alert-dialog-actions mt-6 flex gap-3">
              <Button variant="secondary" fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={onClose}>
                Confirm
              </Button>
            </div>
          )}
        </GlassSurface>
    </div>
  )
}
