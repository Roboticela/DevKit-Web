'use client'

import {
  DkCrescentMoonNightAppearance,
  DkRadiantSunDaylightAppearance
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useTheme, type Theme } from '@/lib/theme'
import { Caption } from './Text'
import './ThemeToggle.css'

export type ThemeToggleVariant = 'default' | 'compact' | 'labels' | 'icons' | 'switch'

export function ThemeToggle({
  variant = 'default',
  compact = false,
  disabled = false,
  className,
}: {
  variant?: ThemeToggleVariant
  compact?: boolean
  disabled?: boolean
  className?: string
}) {
  const { theme, setTheme, toggleTheme } = useTheme()
  const resolved: ThemeToggleVariant = compact ? 'compact' : variant
  const switchOnly = resolved === 'switch'
  const stacked = resolved === 'default'
  const showLabel = resolved !== 'icons' && !switchOnly
  const showIcon = resolved !== 'labels' && !switchOnly
  const compactSwitch = resolved !== 'default'

  function set(next: Theme) {
    if (disabled || theme === next) return
    setTheme(next)
  }

  return (
    <div
      className={cn(
        'items-center font-sans',
        switchOnly
          ? 'inline-flex'
          : stacked
            ? 'grid w-full grid-cols-[48px_minmax(0,1fr)_48px] gap-2.5 px-2 pt-1 pb-2'
            : 'grid w-auto grid-cols-[auto_minmax(52px,64px)_auto] gap-2',
        className,
      )}
      aria-label={switchOnly ? undefined : 'Appearance'}
    >
      {switchOnly ? null : (
        <ModeButton
          mode="light"
          active={theme === 'light'}
          stacked={stacked}
          showLabel={showLabel}
          showIcon={showIcon}
          disabled={disabled}
          onSelect={() => set('light')}
        />
      )}
      <div
        className={cn(
          'flex shrink-0 justify-center',
          stacked && 'min-w-0 w-full',
          switchOnly && 'contents',
        )}
      >
        <ThemeSwitch
          on={theme === 'dark'}
          compact={compactSwitch}
          stretch={stacked}
          disabled={disabled}
          onToggle={() => {
            if (!disabled) toggleTheme()
          }}
        />
      </div>
      {switchOnly ? null : (
        <ModeButton
          mode="dark"
          active={theme === 'dark'}
          stacked={stacked}
          showLabel={showLabel}
          showIcon={showIcon}
          disabled={disabled}
          onSelect={() => set('dark')}
        />
      )}
    </div>
  )
}

function ThemeSwitch({
  on,
  compact,
  stretch,
  disabled,
  onToggle,
}: {
  on: boolean
  compact: boolean
  stretch: boolean
  disabled: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Toggle dark mode"
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        'theme-toggle__switch',
        compact && 'theme-toggle__switch--compact',
        on && 'is-on',
        stretch ? 'w-full' : compact ? 'w-16' : 'w-[72px]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        disabled && 'cursor-not-allowed opacity-55',
      )}
    >
      <span className="theme-toggle__knob" aria-hidden />
    </button>
  )
}

function ModeButton({
  mode,
  active,
  stacked,
  showLabel,
  showIcon,
  disabled,
  onSelect,
}: {
  mode: Theme
  active: boolean
  stacked: boolean
  showLabel: boolean
  showIcon: boolean
  disabled: boolean
  onSelect: () => void
}) {
  const label = mode === 'light' ? 'Light' : 'Dark'
  const Icon = mode === 'light' ? DkRadiantSunDaylightAppearance : DkCrescentMoonNightAppearance

  return (
    <button
      type="button"
      className={cn(
        'flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 font-sans text-text-tertiary',
        'transition-colors duration-150',
        EASE,
        stacked
          ? 'min-w-0 flex-col gap-1'
          : 'h-11 shrink-0 flex-row gap-1 whitespace-nowrap',
        active && 'text-text-primary',
        disabled && 'cursor-not-allowed opacity-55',
      )}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={active}
      aria-label={`${label} mode`}
    >
      {showIcon ? (
        <Icon
          size={stacked ? 18 : 16}
          strokeWidth={1.5}
          absoluteStrokeWidth
          aria-hidden="true"
        />
      ) : null}
      {showLabel ? (
        <Caption as="span" tone={active ? 'primary' : 'tertiary'} className={stacked ? undefined : 'leading-none'}>
          {label}
        </Caption>
      ) : null}
    </button>
  )
}
