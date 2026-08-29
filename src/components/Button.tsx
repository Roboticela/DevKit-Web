import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PILL_BUTTON } from '@/lib/styles'
import { ButtonLabel } from './ButtonLabel'

export type ButtonVariant = 'primary' | 'secondary' | 'action' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  loadingText?: string
  leading?: ReactNode
  trailing?: ReactNode
  preview?: 'hover' | 'focus' | 'active'
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    'border-0 bg-brand-primary text-text-on-brand',
    'hover:bg-brand-primary-hover active:bg-brand-primary-active',
    'disabled:cursor-not-allowed disabled:opacity-55',
  ),
  secondary: cn(
    'border border-btn-secondary-border bg-btn-secondary-bg text-btn-secondary-text',
    'hover:border-brand-primary hover:bg-btn-secondary-hover-bg hover:text-text-on-brand',
    'disabled:cursor-not-allowed disabled:opacity-55',
  ),
  action: cn(
    'gap-2 border border-border-default bg-bg-elevated text-text-primary dark:border-border-strong dark:bg-bg-secondary',
    'hover:border-text-tertiary',
    'disabled:cursor-not-allowed disabled:opacity-55',
  ),
  ghost: cn(
    'border-0 bg-transparent font-normal text-text-tertiary',
    'hover:text-brand-primary',
    'disabled:cursor-not-allowed disabled:opacity-55',
  ),
  danger: cn(
    'border-0 bg-danger text-text-on-brand',
    'hover:bg-danger-hover',
    'disabled:cursor-not-allowed disabled:opacity-55',
  ),
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-sm',
  md: 'h-11 px-[22px] text-[17px]',
  lg: 'h-[50px] px-6 text-[17px]',
}

const forced: Record<string, Partial<Record<ButtonVariant, string>>> = {
  hover: {
    primary: 'bg-brand-primary-hover',
    secondary: 'border-brand-primary bg-btn-secondary-hover-bg text-text-on-brand',
    action: 'border-text-tertiary',
    ghost: 'text-brand-primary',
    danger: 'bg-danger-hover',
  },
  active: {
    primary: 'bg-brand-primary-active',
    secondary: 'border-brand-primary bg-btn-secondary-hover-bg text-text-on-brand',
    action: 'border-text-tertiary',
    ghost: 'text-brand-primary',
    danger: 'bg-danger-hover',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  loading = false,
  loadingText,
  leading,
  trailing,
  preview,
  className,
  disabled,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const light = variant === 'primary' || variant === 'danger'
  const forcedClass = preview ? forced[preview]?.[variant] : undefined

  return (
    <button
      type={type}
      className={cn(
        PILL_BUTTON,
        sizes[size],
        variants[variant],
        fullWidth ? 'w-full' : 'w-auto',
        forcedClass,
        preview === 'focus' &&
          'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <ButtonLabel loading={loading} loadingText={loadingText} light={light}>
        {loading ? null : leading}
        {children}
        {loading ? null : trailing}
      </ButtonLabel>
    </button>
  )
}
