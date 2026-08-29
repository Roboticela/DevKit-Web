'use client'

import {
  DkDesktopComputerDisplayScreen,
  DkHandheldMobilePhone,
  DkHandheldTabletDevice
} from '@/icons'
import { SegmentedControl } from './SegmentedControl'

export type PreviewBreakpoint = 'desktop' | 'tablet' | 'mobile'

export const PREVIEW_WIDTH: Record<PreviewBreakpoint, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
}

const GLYPH = { size: 16, strokeWidth: 1.75, absoluteStrokeWidth: true } as const

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
    <SegmentedControl
      aria-label="Preview breakpoint"
      content="icon"
      size="sm"
      variant="subtle"
      className={className}
      value={value}
      onChange={onChange}
      options={[
        {
          value: 'desktop',
          label: `Desktop ${PREVIEW_WIDTH.desktop}px`,
          icon: <DkDesktopComputerDisplayScreen {...GLYPH} />,
        },
        {
          value: 'tablet',
          label: `Tablet ${PREVIEW_WIDTH.tablet}px`,
          icon: <DkHandheldTabletDevice {...GLYPH} />,
        },
        {
          value: 'mobile',
          label: `Mobile ${PREVIEW_WIDTH.mobile}px`,
          icon: <DkHandheldMobilePhone {...GLYPH} />,
        },
      ]}
    />
  )
}
