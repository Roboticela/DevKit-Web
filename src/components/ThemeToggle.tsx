'use client'

import {
  DkCrescentMoonNightAppearance,
  DkRadiantSunDaylightAppearance
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useTheme, type Theme } from '@/lib/theme'
import { Caption } from './Text'

export type ThemeToggleVariant = 'default' | 'compact' | 'labels' | 'icons' | 'switch'

const MOTION =
  'duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:duration-0 motion-reduce:transition-none'

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
  const inset = compact ? 3 : 4
  const thumb = compact ? 22 : 26

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Toggle dark mode"
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-[980px] border-0 p-0',
        'bg-border-default dark:bg-bg-tertiary',
        'transition-[background-color]',
        MOTION,
        on && 'bg-brand-primary dark:bg-brand-primary',
        compact ? 'h-7 min-w-[52px]' : 'h-[34px] min-w-[72px]',
        stretch ? 'w-full' : compact ? 'w-16' : 'w-[72px]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        disabled && 'cursor-not-allowed opacity-55',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute rounded-full bg-white',
          'transition-[left]',
          MOTION,
          compact ? 'size-[22px]' : 'size-[26px]',
        )}
        style={{
          top: inset,
          left: on ? `calc(100% - ${thumb + inset}px)` : inset,
        }}
      />
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
      {showLabel ? <Caption as="span">{label}</Caption> : null}
    </button>
  )
}
