'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Body, Heading } from './Text'

export function ConfirmDialog({
  open,
  onClose,
  title,
  body,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  loading = false,
  loadingText = 'Working…',
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  body?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onConfirm: () => void
  loading?: boolean
  loadingText?: string
  className?: string
}) {
  useEffect(() => {
    if (!open) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && !loading) onClose()
    }

    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, loading, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-[22px]">
      <button
        type="button"
        className="absolute inset-0 border-0 bg-bg-overlay"
        aria-label="Close"
        disabled={loading}
        onClick={() => {
          if (!loading) onClose()
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className={cn(
          'relative z-[1] w-full max-w-[360px] rounded-[20px] border border-border-default bg-bg-elevated p-6 text-center',
          'dark:bg-bg-secondary',
          'animate-select-in motion-reduce:animate-none',
          className,
        )}
      >
        <Heading level={3} as="h2" id="confirm-dialog-title" align="center">
          {title}
        </Heading>
        {body ? (
          <Body size="sm" as="div" align="center" tone="tertiary" className="mt-2">
            {body}
          </Body>
        ) : null}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="action" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} loadingText={loadingText}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
