'use client'

import { useState } from 'react'
import { DkClipboardCopyDuplicate, DkSourceCodeChevronsPair } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { BrowserChrome } from './BrowserChrome'
import { BreakpointToggle, PREVIEW_WIDTH, type PreviewBreakpoint } from './BreakpointToggle'
import { IconButton } from './IconButton'

export function ViewportPreview({
  src,
  url,
  fullHref,
  fadeKey,
  onCopy,
  onSource,
  className,
}: {
  src: string
  url: string
  fullHref: string
  fadeKey?: string
  onCopy?: () => void | Promise<void>
  onSource?: () => void
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const [breakpoint, setBreakpoint] = useState<PreviewBreakpoint>('desktop')
  const width = PREVIEW_WIDTH[breakpoint]

  return (
    <div
      className={cn(
        'overflow-hidden border border-border-default bg-bg-secondary animate-docs-demo-in motion-reduce:animate-none',
        'rounded-t-2xl',
        className,
      )}
    >
      <div className="flex h-9 items-center justify-between gap-3 border-b border-border-default bg-bg-secondary px-3">
        <p className="m-0 text-[13px] font-medium text-text-primary">Live Preview</p>
        <div className="flex items-center">
          {onCopy ? (
            <IconButton
              label="Copy code"
              size="sm"
              className="text-text-tertiary hover:text-text-primary"
              onAction={onCopy}
            >
              <DkClipboardCopyDuplicate size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
          {onSource ? (
            <IconButton
              label="View source"
              size="sm"
              className="text-text-tertiary hover:text-text-primary"
              onClick={onSource}
            >
              <DkSourceCodeChevronsPair size={14} strokeWidth={1.75} absoluteStrokeWidth />
            </IconButton>
          ) : null}
        </div>
      </div>
      <BrowserChrome url={url} href={fullHref} />
      <div className="flex h-[560px] justify-center overflow-x-auto overflow-y-hidden bg-bg-tertiary">
        <iframe
          key={fadeKey}
          title="Live page preview"
          src={src}
          className={cn(
            'h-full shrink-0 border-0 bg-bg-primary animate-docs-crossfade motion-reduce:animate-none',
            !reduced && `transition-[width] duration-300 ${EASE}`,
          )}
          style={{ width }}
        />
      </div>
      <div className="flex items-center justify-center border-t border-border-default bg-bg-tertiary p-4">
        <BreakpointToggle value={breakpoint} onChange={setBreakpoint} />
      </div>
    </div>
  )
}
