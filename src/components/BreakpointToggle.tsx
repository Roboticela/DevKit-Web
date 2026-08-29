'use client'

import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type PreviewBreakpoint = 'desktop' | 'tablet' | 'mobile'

export const PREVIEW_WIDTH: Record<PreviewBreakpoint, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
}

const OPTIONS: Array<{
  id: PreviewBreakpoint
  label: string
  icon: typeof Monitor
}> = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
]

export function BreakpointToggle({
  value,
  onChange,
  className,
}: {
  value: PreviewBreakpoint
  onChange: (value: PreviewBreakpoint) => void
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Preview breakpoint"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {OPTIONS.map((option) => {
        const selected = option.id === value
        const Icon = option.icon
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} ${PREVIEW_WIDTH[option.id]}px`}
            title={`${option.label} (${PREVIEW_WIDTH[option.id]}px)`}
            onClick={() => onChange(option.id)}
            className={cn(
              'inline-flex size-9 cursor-pointer items-center justify-center rounded-[8px] border-0',
              'transition-colors duration-150',
              EASE,
              selected
                ? 'bg-brand-primary text-text-on-brand'
                : 'bg-transparent text-text-tertiary hover:bg-bg-hover hover:text-text-primary',
            )}
          >
            <Icon size={16} strokeWidth={1.75} absoluteStrokeWidth />
          </button>
        )
      })}
    </div>
  )
}
