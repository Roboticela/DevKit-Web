'use client'

import {
  DkDesktopComputerDisplayScreen,
  DkHandheldMobilePhone,
  DkHandheldTabletDevice
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'

export type PreviewBreakpoint = 'desktop' | 'tablet' | 'mobile'

export const PREVIEW_WIDTH: Record<PreviewBreakpoint, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
}

const OPTIONS: Array<{
  id: PreviewBreakpoint
  label: string
  icon: typeof DkDesktopComputerDisplayScreen
}> = [
  { id: 'desktop', label: 'Desktop', icon: DkDesktopComputerDisplayScreen },
  { id: 'tablet', label: 'Tablet', icon: DkHandheldTabletDevice },
  { id: 'mobile', label: 'Mobile', icon: DkHandheldMobilePhone },
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
          <IconButton
            key={option.id}
            label={`${option.label} ${PREVIEW_WIDTH[option.id]}px`}
            title={`${option.label} (${PREVIEW_WIDTH[option.id]}px)`}
            size="sm"
            variant={selected ? 'primary' : 'ghost'}
            role="radio"
            aria-checked={selected}
            className={selected ? undefined : 'text-text-tertiary'}
            onClick={() => onChange(option.id)}
          >
            <Icon size={16} strokeWidth={1.75} absoluteStrokeWidth />
          </IconButton>
        )
      })}
    </div>
  )
}
