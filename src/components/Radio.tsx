'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body } from './Text'

export type RadioVariant = 'outline' | 'subtle' | 'ghost'
export type RadioSize = 'sm' | 'md' | 'lg'
export type RadioTone = 'brand' | 'danger'
export type RadioPreview = 'hover' | 'focus' | 'active'

export const RADIO_VARIANTS: RadioVariant[] = ['outline', 'subtle', 'ghost']
export const RADIO_SIZES: RadioSize[] = ['sm', 'md', 'lg']
export const RADIO_TONES: RadioTone[] = ['brand', 'danger']

const MOTION =
  'duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:duration-0 motion-reduce:transition-none'

const metric: Record<RadioSize, { box: string; dot: string }> = {
  sm: { box: 'size-4', dot: 'size-1.5' },
  md: { box: 'size-5', dot: 'size-2.5' },
  lg: { box: 'size-6', dot: 'size-3' },
}

const chrome: Record<
  RadioVariant,
  { rest: string; hover: string; forcedHover: string; active: string }
> = {
  outline: {
    rest: 'border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'peer-hover:border-brand-primary',
    forcedHover: 'border-brand-primary',
    active: 'border-brand-primary bg-brand-primary-subtle',
  },
  subtle: {
    rest: 'border-transparent bg-bg-tertiary',
    hover: 'peer-hover:bg-bg-hover',
    forcedHover: 'bg-bg-hover',
    active: 'border-transparent bg-bg-active',
  },
  ghost: {
    rest: 'border-transparent bg-transparent',
    hover: 'peer-hover:border-border-default peer-hover:bg-bg-hover',
    forcedHover: 'border-border-default bg-bg-hover',
    active: 'border-border-default bg-bg-active',
  },
}

const selected: Record<
  RadioTone,
  { ring: string; peer: string; hover: string; forcedHover: string; active: string; dot: string }
> = {
  brand: {
    ring: 'border-brand-primary bg-bg-elevated dark:bg-bg-secondary',
    peer: 'peer-checked:border-brand-primary peer-checked:bg-bg-elevated dark:peer-checked:bg-bg-secondary',
    hover: 'peer-checked:peer-hover:border-brand-primary-hover',
    forcedHover: 'border-brand-primary-hover',
    active: 'border-brand-primary-active',
    dot: 'bg-brand-primary',
  },
  danger: {
    ring: 'border-danger bg-bg-elevated dark:bg-bg-secondary',
    peer: 'peer-checked:border-danger peer-checked:bg-bg-elevated dark:peer-checked:bg-bg-secondary',
    hover: 'peer-checked:peer-hover:border-danger-hover',
    forcedHover: 'border-danger-hover',
    active: 'border-danger-hover',
    dot: 'bg-danger',
  },
}

export function Radio({
  label,
  checked,
  invalid = false,
  variant = 'outline',
  size = 'md',
  tone = 'brand',
  preview,
  className,
  disabled,
  ...rest
}: {
  label?: ReactNode
  checked?: boolean
  invalid?: boolean
  variant?: RadioVariant
  size?: RadioSize
  tone?: RadioTone
  preview?: RadioPreview
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>) {
  const isOn = checked === true
  const look = chrome[variant]
  const onLook = selected[tone]
  const error = invalid && !disabled
  const box = metric[size]
  const pressed = preview === 'active'

  return (
    <label
      className={cn(
        'inline-flex min-h-11 cursor-pointer items-center gap-3 font-sans',
        disabled && 'cursor-not-allowed opacity-55',
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          type="radio"
          className="peer absolute inset-0 z-[1] m-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
          {...rest}
          {...(checked === undefined ? {} : { checked })}
          disabled={disabled}
          aria-invalid={error || undefined}
        />
        <span
          data-selected={isOn ? 'true' : undefined}
          className={cn(
            'pointer-events-none inline-flex items-center justify-center rounded-full border',
            'transition-[background-color,border-color,box-shadow,transform]',
            MOTION,
            box.box,
            '[&>span]:scale-0 data-[selected=true]:[&>span]:scale-100 peer-checked:[&>span]:scale-100',
            pressed && isOn && '[&>span]:scale-90',
            !isOn && !error && look.rest,
            !isOn && !error && !preview && !disabled && look.hover,
            !error && onLook.peer,
            !error && !preview && !disabled && onLook.hover,
            isOn && !error && onLook.ring,
            error && 'border-danger bg-bg-elevated dark:bg-bg-secondary',
            !preview &&
              !disabled &&
              !error &&
              'peer-focus-visible:border-brand-primary peer-focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            !preview &&
              !disabled &&
              error &&
              'peer-focus-visible:border-danger peer-focus-visible:shadow-[0_0_0_2px_var(--danger-focus-ring)]',
            preview === 'hover' && !isOn && !error && look.forcedHover,
            preview === 'hover' && isOn && !error && onLook.forcedHover,
            preview === 'focus' &&
              !error &&
              'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            preview === 'focus' && error && 'border-danger shadow-[0_0_0_2px_var(--danger-focus-ring)]',
            preview === 'active' && !isOn && !error && look.active,
            preview === 'active' && isOn && !error && onLook.active,
            !preview && !disabled && 'peer-active:scale-[0.96]',
            pressed && 'scale-[0.96]',
          )}
        >
          <span
            className={cn(
              'rounded-full origin-center transition-transform',
              MOTION,
              box.dot,
              error ? 'bg-danger' : onLook.dot,
            )}
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

export function RadioGroup({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('flex flex-col', className)}>
      {children}
    </div>
  )
}
