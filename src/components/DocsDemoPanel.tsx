'use client'

import type { ReactNode } from 'react'
import {
  DkClipboardCopyDuplicate,
  DkLayoutGrid,
  DkMaximizeWindowExpandAlternate,
  DkPlayMediaTriangle,
  DkUndoActionBack,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { IconButton } from './IconButton'

const TOOL = 'text-text-tertiary hover:text-text-primary'

export function DocsDemoPanel({
  children,
  fadeKey,
  grid = false,
  previewHref,
  onCopy,
  onReplay,
  onReset,
  onToggleGrid,
  controls,
  className,
}: {
  children: ReactNode
  fadeKey?: string
  grid?: boolean
  previewHref?: string
  onCopy?: () => void | Promise<void>
  onReplay?: () => void
  onReset?: () => void
  onToggleGrid?: () => void
  controls?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-t-2xl border border-border-default bg-bg-secondary', className)}>
      <div className={cn('relative flex min-h-[240px] items-center justify-center p-8', grid && 'docs-demo-grid')}>
        <div className="absolute top-3 right-3 z-[1] flex items-center gap-0.5">
          {onCopy ? (
            <IconButton label="Copy code" size="sm" className={TOOL} onAction={onCopy}>
              <DkClipboardCopyDuplicate size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
          {onReplay ? (
            <IconButton label="Replay animation" size="sm" className={TOOL} onClick={onReplay}>
              <DkPlayMediaTriangle size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
          {onReset ? (
            <IconButton label="Reset" size="sm" className={TOOL} onClick={onReset}>
              <DkUndoActionBack size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
          {onToggleGrid ? (
            <IconButton label="Toggle grid" size="sm" className={TOOL} onClick={onToggleGrid}>
              <DkLayoutGrid size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
          {previewHref ? (
            <a
              href={previewHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open full screen"
              title="Open full screen"
              className={cn(
                'relative inline-flex size-8 shrink-0 items-center justify-center rounded-full',
                TOOL,
                'hover:bg-bg-hover',
                'transition-colors duration-150',
                EASE,
                'focus-visible:bg-bg-hover focus-visible:outline-none',
              )}
            >
              <DkMaximizeWindowExpandAlternate size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </a>
          ) : null}
        </div>
        <div
          key={fadeKey}
          className="flex w-full items-center justify-center animate-docs-crossfade motion-reduce:animate-none"
        >
          {children}
        </div>
      </div>
      {controls ? (
        <div className="flex flex-wrap items-end gap-3 border-t border-border-default bg-bg-tertiary p-4">
          {controls}
        </div>
      ) : null}
    </div>
  )
}
