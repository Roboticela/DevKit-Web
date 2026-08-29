'use client'

import type { ButtonHTMLAttributes } from 'react'
import { DkMoreOptionsEllipsis } from '@/icons'
import { Button } from './Button'

type OtherWaysButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function OtherWaysButton({
  className,
  children = 'Other ways to sign in',
  type = 'button',
  ...rest
}: OtherWaysButtonProps) {
  return (
    <Button
      type={type}
      variant="ghost"
      className={className}
      leading={<DkMoreOptionsEllipsis size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />}
      {...rest}
    >
      {children}
    </Button>
  )
}
