import type { ReactNode } from 'react'
import { DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption, Label } from './Text'

export type VerificationMethodPreview = 'hover' | 'focus' | 'active'

export function VerificationMethodCard({
  selected = false,
  disabled = false,
  icon,
  title,
  subtitle,
  onClick,
  hint,
  preview,
}: {
  selected?: boolean
  disabled?: boolean
  icon: ReactNode
  title: string
  subtitle: string
  onClick?: () => void
  hint?: string
  preview?: VerificationMethodPreview
}) {
  const forced =
    preview === 'hover'
      ? selected
        ? 'border-brand-primary'
        : 'border-border-default dark:border-border-strong'
      : preview === 'focus'
        ? 'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]'
        : preview === 'active'
          ? selected
            ? 'border-brand-primary-active'
            : 'border-border-default bg-bg-active dark:border-border-strong'
          : undefined

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      title={hint}
      onClick={onClick}
      className={cn(
        'flex h-[72px] w-full cursor-pointer items-center gap-4 rounded-[14px] border-[1.5px] border-transparent bg-bg-secondary px-5 text-left text-text-primary',
        'transition-[border-color,background-color] duration-150 ease-linear',
        !preview && !disabled && 'hover:border-border-default dark:hover:border-border-strong',
        !preview && !disabled && 'focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)] focus-visible:outline-none',
        selected && !forced && 'border-brand-primary bg-bg-secondary',
        forced,
        disabled && 'cursor-not-allowed opacity-45 hover:border-transparent',
      )}
    >
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-white text-text-primary dark:bg-black dark:text-white"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
        <Label as="span" className="text-left">
          {title}
        </Label>
        <Caption as="span" className="w-full overflow-hidden text-left text-ellipsis whitespace-nowrap">
          {subtitle}
        </Caption>
      </span>
      <span
        className={cn(
          'relative inline-flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-[border-color,background-color,color] duration-150',
          EASE,
          selected
            ? 'border-brand-primary bg-brand-primary text-text-on-brand'
            : 'border-border-default bg-transparent text-text-on-brand dark:border-border-strong',
        )}
        aria-hidden
      >
        <DkTaskCompleteCheckmark
          size={12}
          strokeWidth={3}
          absoluteStrokeWidth
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150',
            selected ? 'opacity-100' : 'opacity-0',
          )}
        />
      </span>
    </button>
  )
}
