'use client'

import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { ButtonSpinner } from './ButtonLabel'

export function Switch({
  checked,
  onChange,
  disabled = false,
  loading = false,
  size = 'md',
  className,
  label,
}: {
  checked: boolean
  onChange?: (next: boolean) => void
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md'
  className?: string
  label?: string
}) {
  const compact = size === 'sm'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled || loading}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative shrink-0 cursor-pointer rounded-[980px] border-0 p-0',
        'bg-border-default dark:bg-bg-active',
        'transition-colors duration-200',
        EASE,
        checked && 'bg-brand-primary dark:bg-brand-primary',
        compact ? 'h-[26px] w-11' : 'h-[31px] w-[51px]',
        disabled && !loading && 'cursor-not-allowed opacity-55',
        loading && 'cursor-wait opacity-100',
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 flex items-center justify-center rounded-full bg-white',
          'transition-transform duration-200',
          EASE,
          compact ? 'size-[22px]' : 'size-[27px]',
          checked && (compact ? 'translate-x-[18px]' : 'translate-x-5'),
        )}
      >
        {loading ? <ButtonSpinner onWhite size={compact ? 12 : 14} /> : null}
      </span>
    </button>
  )
}
