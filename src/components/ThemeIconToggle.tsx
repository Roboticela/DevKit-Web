'use client'

import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useTheme } from '@/lib/theme'

export type ThemeIconToggleVariant = 'ghost' | 'subtle' | 'outline'
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
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={disabled}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center text-text-secondary',
        'transition-colors duration-150',
        EASE,
        'hover:text-text-primary',
        'focus-visible:outline-none focus-visible:bg-bg-hover focus-visible:text-text-primary',
        'disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-transparent',
        size === 'sm' ? 'size-8 rounded-[8px]' : 'size-9 rounded-[10px]',
        variant === 'ghost' && 'border-0 bg-transparent hover:bg-bg-hover',
        variant === 'subtle' && 'border-0 bg-bg-secondary hover:bg-bg-hover',
        variant === 'outline' && 'border border-border-default bg-transparent hover:bg-bg-hover',
        className,
      )}
    >
      {dark ? (
        <Sun size={size === 'sm' ? 15 : 16} strokeWidth={1.6} absoluteStrokeWidth />
      ) : (
        <Moon size={size === 'sm' ? 15 : 16} strokeWidth={1.6} absoluteStrokeWidth />
      )}
    </button>
  )
}
