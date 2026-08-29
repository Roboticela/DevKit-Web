'use client'

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import {
  DkChevronCaretDown
} from '@/icons'
import { cn } from '@/lib/cn'
import { CONTROL_TRIGGER, EASE, OPEN_RING } from '@/lib/styles'

type SelectTriggerProps = {
  open?: boolean
  leading?: ReactNode
  placeholder?: boolean
  children: ReactNode
  chevronSize?: number
  ref?: Ref<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SelectTrigger({
  open = false,
  leading,
  placeholder = false,
  children,
  chevronSize = 16,
  className,
  ref,
  ...rest
}: SelectTriggerProps) {
  return (
    <button
      type="button"
      ref={ref}
      className={cn(CONTROL_TRIGGER, open && OPEN_RING, className)}
      {...rest}
    >
      {leading ? (
        <span className="inline-flex size-[22px] h-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] text-text-tertiary">
          {leading}
        </span>
      ) : null}
      <span
        className={cn(
          'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap',
          placeholder && 'text-text-tertiary',
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'inline-flex shrink-0 text-text-tertiary transition-transform duration-200',
          EASE,
          open && 'rotate-180',
        )}
        aria-hidden="true"
      >
        <DkChevronCaretDown size={chevronSize} strokeWidth={1.75} absoluteStrokeWidth />
      </span>
    </button>
  )
}
