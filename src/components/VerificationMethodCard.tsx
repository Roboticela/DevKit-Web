import type { ReactNode } from 'react'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption, Label } from './Text'

export function VerificationMethodCard({
  selected = false,
  disabled = false,
  icon,
  title,
  subtitle,
  onClick,
}: {
  selected?: boolean
  disabled?: boolean
  icon: ReactNode
  title: string
  subtitle: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-[72px] w-full cursor-pointer items-center gap-4 rounded-[14px] border-[1.5px] border-transparent bg-bg-secondary px-5 text-left text-text-primary',
        'transition-[border-color,background-color] duration-150 ease-linear',
        'hover:border-border-default dark:hover:border-border-strong',
        selected && 'border-brand-primary bg-bg-secondary',
        disabled && 'cursor-not-allowed opacity-45 hover:border-transparent',
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-white text-text-primary dark:bg-black dark:text-white">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Label as="span">{title}</Label>
        <Caption as="span" className="overflow-hidden text-ellipsis whitespace-nowrap">
          {subtitle}
        </Caption>
      </span>
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-default bg-transparent transition-colors duration-150',
          EASE,
          selected && 'border-brand-primary bg-brand-primary',
        )}
        aria-hidden="true"
      >
        {selected ? (
          <DkTaskCompleteCheckmark
            size={12}
            strokeWidth={3}
            absoluteStrokeWidth
            className="text-text-on-brand"
          />
        ) : null}
      </span>
    </button>
  )
}
