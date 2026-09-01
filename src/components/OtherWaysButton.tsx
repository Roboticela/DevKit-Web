'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { DkChevronCaretLeft, DkMoreOptionsEllipsis } from '@/icons'
import { cn } from '@/lib/cn'
import { PILL_BUTTON } from '@/lib/styles'
import { Button } from './Button'
import { ButtonLabel } from './ButtonLabel'

type OtherWaysButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  href?: string
}

const ghostClasses = cn(
  PILL_BUTTON,
  'h-11 w-full px-[22px] text-[17px]',
  'border-0 bg-transparent font-normal text-text-tertiary',
  'hover:text-brand-primary',
)

export function OtherWaysButton({
  className,
  children,
  icon,
  href,
  type = 'button',
  disabled,
  ...rest
}: OtherWaysButtonProps) {
  const label = children ?? (href ? 'Back to Sign In' : 'Other ways to sign in')
  const leading =
    icon ??
    (href ? (
      <DkChevronCaretLeft size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
    ) : (
      <DkMoreOptionsEllipsis size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
    ))

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          ghostClasses,
          'whitespace-nowrap',
          disabled && 'pointer-events-none opacity-55',
          className,
        )}
        aria-disabled={disabled || undefined}
      >
        <ButtonLabel light={false}>
          {leading}
          {label}
        </ButtonLabel>
      </Link>
    )
  }

  return (
    <Button
      type={type}
      variant="ghost"
      className={cn('whitespace-nowrap', className)}
      leading={leading}
      disabled={disabled}
      {...rest}
    >
      {label}
    </Button>
  )
}
