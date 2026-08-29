'use client'

import type { ButtonHTMLAttributes } from 'react'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

type OtherWaysButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function OtherWaysButton({
  className,
  disabled,
  children = 'Other ways to sign in',
  type = 'button',
  ...rest
}: OtherWaysButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[980px] border-0 bg-transparent px-[22px] font-sans text-[17px] font-normal leading-none text-text-secondary',
        'transition-colors duration-150',
        EASE,
        'hover:text-brand-primary',
        'disabled:cursor-not-allowed disabled:opacity-55',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      <Ellipsis size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
      {children}
    </button>
  )
}
