import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export function IconButton({
  label,
  badge,
  size = 'md',
  className,
  children,
  ...rest
}: {
  label: string
  badge?: number | string
  size?: 'sm' | 'md'
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const count = typeof badge === 'number' ? badge : Number(badge)
  const showBadge = badge !== undefined && badge !== 0 && badge !== '0'

  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-text-primary',
        'transition-colors duration-150',
        EASE,
        'hover:bg-bg-hover',
        'focus-visible:outline-none focus-visible:bg-bg-hover',
        'disabled:cursor-not-allowed disabled:opacity-45',
        size === 'sm' ? 'size-8' : 'size-11',
        className,
      )}
      {...rest}
    >
      {children}
      {showBadge ? (
        <span className="absolute top-0.5 right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[980px] bg-danger px-1 text-[10px] font-medium leading-none text-white">
          {typeof count === 'number' && count > 9 ? '9+' : badge}
        </span>
      ) : null}
    </button>
  )
}
