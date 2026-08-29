'use client'

import type { ReactNode } from 'react'
import { Copy, ExternalLink, Grid3x3, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'
import { IconAction } from './CodeBlock'

export function DocsDemoPanel({
  children,
  fadeKey,
  grid = false,
  onCopy,
  onPlayground,
  onReset,
  onToggleGrid,
  controls,
  className,
}: {
  children: ReactNode
  fadeKey?: string
  grid?: boolean
  onCopy?: () => void
  onPlayground?: () => void
  onReset?: () => void
  onToggleGrid?: () => void
  controls?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-t-2xl border border-border-default bg-bg-secondary', className)}>
      <div className={cn('relative flex min-h-[240px] items-center justify-center p-8', grid && 'docs-demo-grid')}>
        <div className="absolute top-3 right-3 z-[1] flex items-center gap-0.5">
          <IconAction label="Copy code" onClick={onCopy}>
            <Copy size={14} strokeWidth={1.75} absoluteStrokeWidth />
          </IconAction>
          <IconAction label="Open in playground" onClick={onPlayground}>
            <ExternalLink size={14} strokeWidth={1.75} absoluteStrokeWidth />
          </IconAction>
          <IconAction label="Reset" onClick={onReset}>
            <RotateCcw size={14} strokeWidth={1.75} absoluteStrokeWidth />
          </IconAction>
          <IconAction label="Toggle grid" onClick={onToggleGrid}>
            <Grid3x3 size={14} strokeWidth={1.75} absoluteStrokeWidth />
          </IconAction>
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
