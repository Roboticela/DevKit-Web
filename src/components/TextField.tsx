import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { AUTH_FIELD_SURFACE, EASE, FIELD_INVALID, FOCUS_RING } from '@/lib/styles'

export function AuthField({
  icon,
  children,
  className,
}: {
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn('relative block w-full', className)}>
      {icon ? (
        <span className="pointer-events-none absolute top-1/2 left-4 inline-flex -translate-y-1/2 text-text-tertiary">
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
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  icon,
  trailing,
  invalid = false,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <AuthField icon={icon}>
      <input
        className={cn(
          'h-11 w-full rounded-[12px] border px-11 font-sans text-[17px] font-normal leading-none caret-text-primary',
          AUTH_FIELD_SURFACE,
          'placeholder:text-text-tertiary',
          'transition-[border-color,box-shadow] duration-150',
          EASE,
          invalid ? FIELD_INVALID : FOCUS_RING,
          trailing ? 'pr-11' : null,
          className,
        )}
        {...rest}
        aria-invalid={invalid || undefined}
      />
      {trailing}
    </AuthField>
  )
}
