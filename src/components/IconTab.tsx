import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export function IconTab({
  icon,
  label,
  active = false,
  tone = 'default',
  className,
  ...rest
}: {
  icon: ReactNode
  label: string
  active?: boolean
  tone?: 'default' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const danger = tone === 'danger'

  return (
    <button
      type="button"
      className={cn(
        'flex h-14 min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border-0 bg-transparent px-0.5 py-1.5 font-sans',
        'transition-colors duration-150',
        EASE,
        danger
          ? 'text-danger'
          : 'text-text-secondary dark:text-text-tertiary',
        active && !danger && 'bg-bg-hover text-brand-primary',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      <span className="inline-flex text-current">{icon}</span>
      <span className="max-w-full truncate text-[10px] font-medium leading-[1.2]">{label}</span>
    </button>
  )
}
