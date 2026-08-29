'use client'

import { useEffect, useState, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { PILL_BUTTON } from '@/lib/styles'
import { ButtonLabel } from './ButtonLabel'

export type ConfirmActionVariant = 'text' | 'ghost' | 'subtle' | 'outline' | 'solid'
export type ConfirmActionTone = 'danger' | 'brand' | 'neutral'
export type ConfirmActionSize = 'sm' | 'md' | 'lg'

export const CONFIRM_ACTION_VARIANTS: ConfirmActionVariant[] = [
  'text',
  'ghost',
  'subtle',
  'outline',
  'solid',
]
export const CONFIRM_ACTION_TONES: ConfirmActionTone[] = ['danger', 'brand', 'neutral']
export const CONFIRM_ACTION_SIZES: ConfirmActionSize[] = ['sm', 'md', 'lg']

const sizes: Record<ConfirmActionSize, string> = {
  sm: 'h-8 px-3.5 text-sm',
  md: 'h-11 px-[22px] text-[17px]',
  lg: 'h-[50px] px-6 text-[17px]',
}

const textIdle: Record<ConfirmActionTone, string> = {
  danger: 'text-danger hover:text-danger hover:underline',
  brand: 'text-brand-primary hover:text-brand-primary-hover hover:underline',
  neutral: 'text-text-secondary hover:text-text-primary hover:underline',
}

const ghostIdle: Record<ConfirmActionTone, string> = {
  danger: 'border-0 bg-transparent text-danger hover:bg-danger-subtle',
  brand: 'border-0 bg-transparent text-brand-primary hover:bg-brand-primary-subtle',
  neutral: 'border-0 bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
}

const subtleIdle: Record<ConfirmActionTone, string> = {
  danger: 'border-0 bg-danger-subtle text-danger hover:bg-danger/15',
  brand: 'border-0 bg-brand-primary-subtle text-brand-primary hover:bg-brand-primary/15',
  neutral: 'border-0 bg-bg-tertiary text-text-primary hover:bg-bg-hover',
}

const outlineIdle: Record<ConfirmActionTone, string> = {
  danger: 'border border-danger/35 bg-transparent text-danger hover:bg-danger-subtle',
  brand: 'border border-brand-primary/35 bg-transparent text-brand-primary hover:bg-brand-primary-subtle',
  neutral: 'border border-border-default bg-transparent text-text-primary hover:bg-bg-hover',
}

const fill: Record<ConfirmActionTone, string> = {
  danger: 'border-0 bg-danger text-text-on-brand hover:bg-danger-hover',
  brand: 'border-0 bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover',
  neutral: 'border border-border-default bg-bg-elevated text-text-primary hover:border-text-tertiary dark:border-border-strong dark:bg-bg-secondary',
}

function surfaceClass(
  variant: ConfirmActionVariant,
  tone: ConfirmActionTone,
  confirming: boolean,
  size: ConfirmActionSize,
) {
  const compact = variant === 'text' && !confirming
  if (compact) {
    return cn('h-auto px-2.5 py-1 font-normal', textIdle[tone])
  }

  const shape = sizes[size]
  if (confirming || variant === 'solid') return cn(shape, fill[tone])
  if (variant === 'ghost') return cn(shape, ghostIdle[tone])
  if (variant === 'subtle') return cn(shape, subtleIdle[tone])
  if (variant === 'outline') return cn(shape, outlineIdle[tone])
  return cn(shape, textIdle[tone])
}

export function ConfirmAction({
  onConfirm,
  label = 'Remove',
  confirmLabel = 'Confirm?',
  variant = 'text',
  tone = 'danger',
  size = 'sm',
  loading = false,
  loadingText,
  resetMs = 3000,
  className,
  disabled,
  onClick,
  ...rest
}: {
  onConfirm: () => void
  label?: string
  confirmLabel?: string
  variant?: ConfirmActionVariant
  tone?: ConfirmActionTone
  size?: ConfirmActionSize
  loading?: boolean
  loadingText?: string
  resetMs?: number
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onConfirm'>) {
  const [confirming, setConfirming] = useState(false)
  const filled = confirming || variant === 'solid'
  const light = filled && tone !== 'neutral'

  useEffect(() => {
    if (!confirming) return
    const timer = window.setTimeout(() => setConfirming(false), resetMs)
    return () => window.clearTimeout(timer)
  }, [confirming, resetMs])

  return (
    <button
      {...rest}
      type="button"
      className={cn(
        PILL_BUTTON,
        'w-auto focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-55',
        surfaceClass(variant, tone, confirming, size),
        className,
      )}
      disabled={disabled || loading}
      aria-pressed={confirming}
      aria-busy={loading || undefined}
      onClick={(event) => {
        event.stopPropagation()
        onClick?.(event)
        if (event.defaultPrevented || loading || disabled) return
        if (confirming) {
          onConfirm()
          setConfirming(false)
          return
        }
        setConfirming(true)
      }}
    >
      <ButtonLabel
        loading={loading}
        loadingText={loadingText ?? (label === 'Sign Out' ? 'Signing out…' : 'Removing…')}
        light={light}
      >
        {confirming ? confirmLabel : label}
      </ButtonLabel>
    </button>
  )
}
