'use client'

import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import {
  DkSubtractMinusRemove,
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Body } from './Text'

export type CheckboxVariant = 'outline' | 'subtle' | 'ghost'
export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxTone = 'brand' | 'danger'
export type CheckboxPreview = 'hover' | 'focus' | 'active'

export const CHECKBOX_VARIANTS: CheckboxVariant[] = ['outline', 'subtle', 'ghost']
export const CHECKBOX_SIZES: CheckboxSize[] = ['sm', 'md', 'lg']
export const CHECKBOX_TONES: CheckboxTone[] = ['brand', 'danger']

const boxes: Record<CheckboxSize, { box: string; icon: number; radius: string }> = {
  sm: { box: 'size-4', icon: 10, radius: 'rounded-[8px]' },
  md: { box: 'size-5', icon: 12, radius: 'rounded-[8px]' },
  lg: { box: 'size-6', icon: 14, radius: 'rounded-[8px]' },
}

const chrome: Record<
  CheckboxVariant,
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

const fill: Record<CheckboxTone, { on: string; hover: string; forcedHover: string; active: string }> = {
  brand: {
    on: 'border-brand-primary bg-brand-primary',
    hover: 'peer-hover:border-brand-primary-hover peer-hover:bg-brand-primary-hover',
    forcedHover: 'border-brand-primary-hover bg-brand-primary-hover',
    active: 'border-brand-primary-active bg-brand-primary-active',
  },
  danger: {
    on: 'border-danger bg-danger',
    hover: 'peer-hover:border-danger-hover peer-hover:bg-danger-hover',
    forcedHover: 'border-danger-hover bg-danger-hover',
    active: 'border-danger-hover bg-danger-hover',
  },
}

export function Checkbox({
  label,
  checked,
  indeterminate = false,
  invalid = false,
  variant = 'outline',
  size = 'md',
  tone = 'brand',
  preview,
  className,
  disabled,
  defaultChecked,
  onChange,
  ...rest
}: {
  label?: ReactNode
  checked?: boolean
  indeterminate?: boolean
  invalid?: boolean
  variant?: CheckboxVariant
  size?: CheckboxSize
  tone?: CheckboxTone
  preview?: CheckboxPreview
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uncontrolled, setUncontrolled] = useState(Boolean(defaultChecked))
  const isOn = checked ?? uncontrolled
  const mixed = indeterminate
  const filled = mixed || isOn
  const metric = boxes[size]
  const look = chrome[variant]
  const onFill = fill[tone]
  const error = invalid && !disabled

  useEffect(() => {
    const input = inputRef.current
    if (input) input.indeterminate = mixed
  }, [mixed, isOn])

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
          ref={inputRef}
          type="checkbox"
          className="peer absolute inset-0 z-[1] m-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
          {...rest}
          {...(checked === undefined ? {} : { checked })}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-checked={mixed ? 'mixed' : isOn}
          onChange={(event) => {
            if (checked === undefined) setUncontrolled(event.target.checked)
            onChange?.(event)
          }}
        />
        <span
          className={cn(
            'pointer-events-none relative inline-flex items-center justify-center border',
            'transition-[background-color,border-color,box-shadow] duration-150',
            EASE,
            metric.box,
            metric.radius,
            filled && !error && onFill.on,
            filled && !error && !preview && !disabled && onFill.hover,
            !filled && !error && look.rest,
            !filled && !error && !preview && !disabled && look.hover,
            error && (filled ? 'border-danger bg-danger' : 'border-danger bg-bg-elevated dark:bg-bg-secondary'),
            !preview &&
              !disabled &&
              !error &&
              'peer-focus-visible:border-brand-primary peer-focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            !preview &&
              !disabled &&
              error &&
              'peer-focus-visible:border-danger peer-focus-visible:shadow-[0_0_0_2px_var(--danger-focus-ring)]',
            preview === 'hover' && !filled && !error && look.forcedHover,
            preview === 'hover' && filled && !error && onFill.forcedHover,
            preview === 'focus' &&
              !error &&
              'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            preview === 'focus' && error && 'border-danger shadow-[0_0_0_2px_var(--danger-focus-ring)]',
            preview === 'active' && !filled && !error && look.active,
            preview === 'active' && filled && !error && onFill.active,
          )}
        >
          <DkTaskCompleteCheckmark
            size={metric.icon}
            strokeWidth={2.5}
            absoluteStrokeWidth
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-on-brand',
              filled && !mixed ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden
          />
          <DkSubtractMinusRemove
            size={metric.icon}
            strokeWidth={2.5}
            absoluteStrokeWidth
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-on-brand',
              mixed ? 'opacity-100' : 'opacity-0',
            )}
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

export function CheckboxGroup({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div role="group" aria-label={label} className={cn('flex flex-col', className)}>
      {children}
    </div>
  )
}
