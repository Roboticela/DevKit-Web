import type { InputHTMLAttributes, ReactNode } from 'react'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Body } from './Text'

export function Checkbox({
  label,
  checked,
  className,
  ...rest
}: {
  label?: ReactNode
  checked?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-3 font-sans',
        rest.disabled && 'cursor-not-allowed opacity-55',
        className,
      )}
    >
      <span className="relative inline-flex size-5 shrink-0">
        <input
          type="checkbox"
          className="peer absolute inset-0 z-[1] m-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
          {...rest}
          {...(checked === undefined ? {} : { checked })}
        />
        <span
          className={cn(
            'pointer-events-none inline-flex size-5 items-center justify-center rounded-[6px] border border-border-default bg-bg-elevated',
            'transition-colors duration-150',
            EASE,
            'peer-focus-visible:border-brand-primary peer-focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            'peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-checked:[&_svg]:opacity-100',
            'dark:bg-bg-secondary',
          )}
        >
          <DkTaskCompleteCheckmark
            size={12}
            strokeWidth={2.5}
            absoluteStrokeWidth
            className="text-white opacity-0"
            aria-hidden
          />
        </span>
      </span>
      {label ? (
        <Body size="sm" as="span" tone="primary">
          {label}
        </Body>
      ) : null}
    </label>
  )
}
