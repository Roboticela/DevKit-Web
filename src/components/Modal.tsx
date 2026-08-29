'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  DkCloseDismissCancel
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'
import { Body, Heading } from './Text'

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (!open) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[800] flex items-end justify-center p-0 min-[735px]:items-center min-[735px]:p-6">
      <button
        type="button"
        className="absolute inset-0 border-0 bg-bg-overlay"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'relative z-[1] w-full max-h-[min(92dvh,760px)] max-w-[440px] overflow-y-auto overscroll-contain rounded-t-[20px] border border-border-default bg-bg-elevated p-6',
          'dark:bg-bg-secondary',
          'min-[735px]:rounded-2xl min-[735px]:p-8',
          'animate-select-in motion-reduce:animate-none',
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <Heading level={3} as="h2" id="modal-title" className="min-w-0 break-all">
            {title}
          </Heading>
          <IconButton label="Close" size="sm" onClick={onClose}>
            <DkCloseDismissCancel size={16} strokeWidth={1.75} absoluteStrokeWidth />
          </IconButton>
        </div>
        <Body size="sm" as="div">
          {children}
        </Body>
        {footer ? <div className="mt-8 flex flex-col gap-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
