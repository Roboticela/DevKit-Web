'use client'

import {
  DkCrescentMoonNightAppearance,
  DkRadiantSunDaylightAppearance
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useTheme, type Theme } from '@/lib/theme'
import { IconButton } from './IconButton'

export type ThemeIconToggleVariant =
  | 'ghost'
  | 'subtle'
  | 'outline'
  | 'pair'
  | 'segmented'
  | 'split'
export type ThemeIconToggleSize = 'sm' | 'md'

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
  const icon = compact ? 14 : 16

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
          <DkRadiantSunDaylightAppearance size={compact ? 15 : 16} strokeWidth={1.6} absoluteStrokeWidth />
        ) : (
          <DkCrescentMoonNightAppearance size={compact ? 15 : 16} strokeWidth={1.6} absoluteStrokeWidth />
        )}
      </IconButton>
    )
  }

  if (variant === 'split') {
    return (
      <div
        role="radiogroup"
        aria-label="Appearance"
        className={cn('inline-flex items-center', disabled && 'opacity-55', className)}
      >
        <ModeIcon
          mode="light"
          active={theme === 'light'}
          disabled={disabled}
          iconSize={compact ? 15 : 16}
          onSelect={() => setTheme('light')}
          className={compact ? 'size-8 rounded-[8px]' : 'size-9 rounded-[10px]'}
        />
        <ModeIcon
          mode="dark"
          active={theme === 'dark'}
          disabled={disabled}
          iconSize={compact ? 15 : 16}
          onSelect={() => setTheme('dark')}
          className={compact ? 'size-8 rounded-[8px]' : 'size-9 rounded-[10px]'}
        />
      </div>
    )
  }

  const pill = variant === 'pair'
  const cell = compact ? 'size-7' : 'size-8'

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className={cn(
        'relative isolate inline-grid grid-cols-2 p-0.5',
        pill
          ? 'rounded-full bg-bg-secondary'
          : 'rounded-[8px] border border-border-default bg-bg-secondary',
        disabled && 'opacity-55',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-0.5 left-0.5 z-0 aspect-square',
          'bg-bg-elevated dark:bg-bg-tertiary',
          'transition-transform duration-300',
          EASE,
          'motion-reduce:transition-none',
          cell,
          pill ? 'rounded-full' : 'rounded-[6px]',
          theme === 'dark' && 'translate-x-full',
        )}
      />
      <ModeIcon
        mode="light"
        active={theme === 'light'}
        disabled={disabled}
        iconSize={icon}
        onSelect={() => setTheme('light')}
        className={cn('relative z-[1]', cell, pill ? 'rounded-full' : 'rounded-[6px]')}
      />
      <ModeIcon
        mode="dark"
        active={theme === 'dark'}
        disabled={disabled}
        iconSize={icon}
        onSelect={() => setTheme('dark')}
        className={cn('relative z-[1]', cell, pill ? 'rounded-full' : 'rounded-[6px]')}
      />
    </div>
  )
}

function ModeIcon({
  mode,
  active,
  disabled,
  iconSize,
  onSelect,
  className,
}: {
  mode: Theme
  active: boolean
  disabled: boolean
  iconSize: number
  onSelect: () => void
  className?: string
}) {
  const Icon = mode === 'light' ? DkRadiantSunDaylightAppearance : DkCrescentMoonNightAppearance

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={mode === 'light' ? 'Light mode' : 'Dark mode'}
      disabled={disabled}
      onClick={() => {
        if (!disabled && !active) onSelect()
      }}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center border-0 bg-transparent',
        'transition-colors duration-150',
        EASE,
        'focus-visible:outline-none focus-visible:text-text-primary',
        'disabled:cursor-not-allowed',
        active ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
        className,
      )}
    >
      <Icon size={iconSize} strokeWidth={1.6} absoluteStrokeWidth aria-hidden="true" />
    </button>
  )
}
