'use client'

import {
  DkCrescentMoonNightAppearance,
  DkRadiantSunDaylightAppearance
} from '@/icons'
import { cn } from '@/lib/cn'
import { useTheme, type Theme } from '@/lib/theme'
import { IconButton } from './IconButton'
import { SegmentedControl, type SegmentedVariant } from './SegmentedControl'

export type ThemeIconToggleVariant =
  | 'ghost'
  | 'subtle'
  | 'outline'
  | 'pair'
  | 'segmented'
  | 'split'
export type ThemeIconToggleSize = 'sm' | 'md'

const SEGMENTED_LOOK: Record<'pair' | 'segmented' | 'split', SegmentedVariant> = {
  pair: 'pill',
  segmented: 'outline',
  split: 'ghost',
}

const GLYPH = { strokeWidth: 1.6, absoluteStrokeWidth: true } as const

export function ThemeIconToggle({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className,
}: {
  variant?: ThemeIconToggleVariant
  size?: ThemeIconToggleSize
  disabled?: boolean
  className?: string
}) {
  const { theme, setTheme, toggleTheme } = useTheme()
  const compact = size === 'sm'
  const icon = compact ? 15 : 16

  if (variant === 'ghost' || variant === 'subtle' || variant === 'outline') {
    const dark = theme === 'dark'
    return (
      <IconButton
        label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        variant={variant}
        size="sm"
        disabled={disabled}
        className={cn('text-text-secondary hover:text-text-primary', className)}
        onClick={toggleTheme}
      >
        {dark ? (
          <DkRadiantSunDaylightAppearance size={icon} {...GLYPH} />
        ) : (
          <DkCrescentMoonNightAppearance size={icon} {...GLYPH} />
        )}
      </IconButton>
    )
  }

  return (
    <SegmentedControl
      aria-label="Appearance"
      content="icon"
      variant={SEGMENTED_LOOK[variant]}
      size={compact ? 'sm' : 'md'}
      disabled={disabled}
      className={className}
      value={theme}
      onChange={(next: Theme) => setTheme(next)}
      options={[
        {
          value: 'light',
          label: 'Light mode',
          icon: <DkRadiantSunDaylightAppearance size={icon} {...GLYPH} />,
        },
        {
          value: 'dark',
          label: 'Dark mode',
          icon: <DkCrescentMoonNightAppearance size={icon} {...GLYPH} />,
        },
      ]}
    />
  )
}
