import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE, FIELD_INVALID, FIELD_VALID, FOCUS_RING, OPEN_RING } from '@/lib/styles'

export type TextFieldVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'
export type TextFieldSize = 'sm' | 'md' | 'lg'
export type TextFieldPreview = 'hover' | 'focus'

export const TEXT_FIELD_VARIANTS: TextFieldVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const TEXT_FIELD_SIZES: TextFieldSize[] = ['sm', 'md', 'lg']

const sizes: Record<
  TextFieldSize,
  { field: string; icon: string; pad: string; padIcon: string; padTrail: string; radius: string }
> = {
  sm: {
    field: 'h-9 text-[15px]',
    icon: 'left-3',
    pad: 'px-3',
    padIcon: 'pl-9',
    padTrail: 'pr-9',
    radius: 'rounded-[10px]',
  },
  md: {
    field: 'h-11 text-[17px]',
    icon: 'left-4',
    pad: 'px-4',
    padIcon: 'pl-11',
    padTrail: 'pr-11',
    radius: 'rounded-[12px]',
  },
  lg: {
    field: 'h-[50px] text-[17px]',
    icon: 'left-4',
    pad: 'px-4',
    padIcon: 'pl-12',
    padTrail: 'pr-12',
    radius: 'rounded-[12px]',
  },
}

const chrome: Record<
  TextFieldVariant,
  {
    rest: string
    hover: string
    focus: string
    autofill: string
    radius?: string
  }
> = {
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: FOCUS_RING,
    autofill: '[--field-autofill-bg:var(--bg-elevated)] dark:[--field-autofill-bg:var(--bg-secondary)]',
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
    autofill: '[--field-autofill-bg:var(--bg-tertiary)]',
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
    autofill: '[--field-autofill-bg:var(--bg-primary)]',
  },
  underline: {
    rest: 'rounded-none border-0 border-b border-border-default bg-transparent',
    hover: 'hover:border-border-strong',
    focus: 'outline-none focus:border-brand-primary',
    autofill: '[--field-autofill-bg:var(--bg-primary)]',
    radius: 'rounded-none',
  },
  pill: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: FOCUS_RING,
    autofill: '[--field-autofill-bg:var(--bg-elevated)] dark:[--field-autofill-bg:var(--bg-secondary)]',
    radius: 'rounded-[980px]',
  },
}

const forcedHover: Record<TextFieldVariant, string> = {
  outline: 'border-border-strong',
  subtle: 'bg-bg-hover',
  ghost: 'bg-bg-hover',
  underline: 'border-border-strong',
  pill: 'border-border-strong',
}

const forcedFocus: Record<TextFieldVariant, string> = {
  outline: OPEN_RING,
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  underline: 'border-brand-primary',
  pill: OPEN_RING,
}

export function AuthField({
  icon,
  children,
  className,
  iconClassName,
}: {
  icon?: ReactNode
  children: ReactNode
  className?: string
  iconClassName?: string
}) {
  return (
    <label className={cn('group relative block w-full', className)}>
      {icon ? (
        <span
          className={cn(
            'pointer-events-none absolute top-1/2 z-[1] inline-flex -translate-y-1/2 text-text-tertiary',
            'transition-colors duration-150',
            EASE,
            iconClassName,
          )}
        >
          {icon}
        </span>
      ) : null}
      {children}
    </label>
  )
}

type TextFieldProps = {
  icon?: ReactNode
  trailing?: ReactNode
  invalid?: boolean
  valid?: boolean
  variant?: TextFieldVariant
  size?: TextFieldSize
  preview?: TextFieldPreview
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export function TextField({
  icon,
  trailing,
  invalid = false,
  valid = false,
  variant = 'outline',
  size = 'md',
  preview,
  className,
  disabled,
  ...rest
}: TextFieldProps) {
  const metric = sizes[size]
  const look = chrome[variant]
  const error = invalid && !disabled
  const ok = valid && !invalid && !disabled
  const radius = look.radius ?? metric.radius

  return (
    <AuthField
      icon={icon}
      iconClassName={cn(
        metric.icon,
        'group-has-[:not(:placeholder-shown)]:text-text-primary',
        'group-hover:text-text-secondary',
        'group-focus-within:text-brand-primary',
        preview === 'hover' && 'text-text-secondary',
        preview === 'focus' && 'text-brand-primary',
        ok && 'text-success group-focus-within:text-success',
        error && 'text-danger group-focus-within:text-danger',
        disabled && 'text-text-disabled',
      )}
    >
      <input
        className={cn(
          'dk-field w-full font-sans font-normal leading-none text-text-primary caret-text-primary',
          'placeholder:text-text-tertiary',
          'transition-[border-color,background-color,box-shadow] duration-150',
          EASE,
          metric.field,
          radius,
          look.rest,
          look.autofill,
          icon ? metric.padIcon : metric.pad,
          trailing ? metric.padTrail : icon ? 'pr-4' : null,
          !error && !preview && look.hover,
          !error && !ok && preview !== 'focus' ? look.focus : null,
          preview === 'hover' && !error && !ok && forcedHover[variant],
          preview === 'focus' && !error && !ok && forcedFocus[variant],
          error && FIELD_INVALID,
          ok && FIELD_VALID,
          'disabled:cursor-not-allowed disabled:opacity-55',
          'read-only:text-text-secondary',
          className,
        )}
        {...rest}
        disabled={disabled}
        aria-invalid={error || undefined}
      />
      {trailing}
    </AuthField>
  )
}
