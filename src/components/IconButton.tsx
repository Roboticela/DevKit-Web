'use client'

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import {
  DkTaskCompleteCheckmark,
  DkCloseDismissCancel
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Loader } from './Loader'

export type IconButtonVariant = 'ghost' | 'subtle' | 'outline' | 'primary' | 'danger'
export type IconButtonSize = 'sm' | 'md'
export type IconButtonStatus = 'idle' | 'loading' | 'success' | 'error'

const variants: Record<IconButtonVariant, string> = {
  ghost: cn(
    'border-0 bg-transparent text-text-primary',
    'hover:bg-bg-hover',
    'focus-visible:bg-bg-hover',
  ),
  subtle: cn(
    'border-0 bg-bg-secondary text-text-primary',
    'hover:bg-bg-hover',
    'focus-visible:bg-bg-hover',
  ),
  outline: cn(
    'border border-border-default bg-transparent text-text-primary',
    'hover:bg-bg-hover',
    'focus-visible:border-border-focus',
  ),
  primary: cn(
    'border-0 bg-brand-primary text-text-on-brand',
    'hover:bg-brand-primary-hover',
    'focus-visible:bg-brand-primary-hover',
  ),
  danger: cn(
    'border-0 bg-danger text-text-on-brand',
    'hover:bg-danger-hover',
    'focus-visible:bg-danger-hover',
  ),
}

export function IconButton({
  label,
  badge,
  size = 'md',
  variant = 'ghost',
  loading = false,
  status: statusProp,
  onAction,
  successMs = 1600,
  className,
  disabled,
  onClick,
  title,
  children,
  ...rest
}: {
  label: string
  badge?: number | string
  size?: IconButtonSize
  variant?: IconButtonVariant
  loading?: boolean
  status?: IconButtonStatus
  onAction?: () => void | Promise<void>
  successMs?: number
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const [inner, setInner] = useState<IconButtonStatus>('idle')
  const resetRef = useRef<number>(0)
  const status: IconButtonStatus = statusProp ?? (loading ? 'loading' : inner)
  const count = typeof badge === 'number' ? badge : Number(badge)
  const showBadge = badge !== undefined && badge !== 0 && badge !== '0'
  const compact = size === 'sm'
  const overlay = status !== 'idle'
  const light = variant === 'primary' || variant === 'danger'
  const mark = compact ? 16 : 18
  const busy = status === 'loading'

  useEffect(() => {
    return () => window.clearTimeout(resetRef.current)
  }, [])

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (event.defaultPrevented || !onAction || disabled || statusProp || status !== 'idle') return

    window.clearTimeout(resetRef.current)
    setInner('loading')
    try {
      await onAction()
      setInner('success')
    } catch {
      setInner('error')
    }
    resetRef.current = window.setTimeout(() => setInner('idle'), successMs)
  }

  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full',
        'transition-colors duration-150',
        EASE,
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-55',
        compact ? 'size-8' : 'size-11',
        variants[variant],
        className,
      )}
      {...rest}
      title={title ?? label}
      aria-label={label}
      aria-busy={busy || undefined}
      disabled={disabled || busy}
      onClick={handleClick}
    >
      <span className={cn('inline-flex items-center justify-center', overlay && 'invisible')}>
        {children}
      </span>
      {busy ? (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <Loader decorative size={compact ? 14 : 16} onDark={light} />
        </span>
      ) : null}
      {status === 'success' ? (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <DkTaskCompleteCheckmark
            size={mark}
            strokeWidth={2}
            absoluteStrokeWidth
            className={light ? undefined : 'text-success'}
            aria-hidden
          />
        </span>
      ) : null}
      {status === 'error' ? (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <DkCloseDismissCancel
            size={mark}
            strokeWidth={2}
            absoluteStrokeWidth
            className={light ? undefined : 'text-danger'}
            aria-hidden
          />
        </span>
      ) : null}
      {showBadge ? (
        <span className="absolute top-0.5 right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[980px] bg-danger px-1 text-[10px] font-medium leading-none text-white">
          {typeof count === 'number' && count > 9 ? '9+' : badge}
        </span>
      ) : null}
    </button>
  )
}
