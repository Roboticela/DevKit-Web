'use client'

import { useState, type ChangeEvent, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { EASE, FIELD_INVALID, FIELD_VALID, FOCUS_RING, OPEN_RING } from '@/lib/styles'
import { Caption } from './Text'

export type TextareaVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'well' | 'composer'
export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaPreview = 'hover' | 'focus'

export const TEXTAREA_VARIANTS: TextareaVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'well',
  'composer',
]
export const TEXTAREA_SIZES: TextareaSize[] = ['sm', 'md', 'lg']

const sizes: Record<
  TextareaSize,
  { field: string; icon: string; pad: string; padIcon: string; padCount: string; min: string }
> = {
  sm: {
    field: 'text-[15px] leading-[1.47]',
    icon: 'top-2.5 left-3',
    pad: 'px-3 py-2.5',
    padIcon: 'pl-9',
    padCount: 'pb-8',
    min: 'min-h-[88px]',
  },
  md: {
    field: 'text-[17px] leading-[1.42]',
    icon: 'top-3.5 left-4',
    pad: 'px-4 py-3',
    padIcon: 'pl-11',
    padCount: 'pb-9',
    min: 'min-h-[120px]',
  },
  lg: {
    field: 'text-[17px] leading-[1.42]',
    icon: 'top-4 left-4',
    pad: 'px-5 py-4',
    padIcon: 'pl-12',
    padCount: 'pb-10',
    min: 'min-h-[180px]',
  },
}

const wellPad: Record<TextareaSize, { pad: string; icon: string; padIcon: string }> = {
  sm: { pad: 'px-4 py-3', icon: 'top-3 left-4', padIcon: 'pl-10' },
  md: { pad: 'px-6 py-5', icon: 'top-5 left-6', padIcon: 'pl-14' },
  lg: { pad: 'px-6 py-6', icon: 'top-6 left-6', padIcon: 'pl-14' },
}

const chrome: Record<
  TextareaVariant,
  { rest: string; hover: string; focus: string; radius: string; autofill: string }
> = {
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: FOCUS_RING,
    radius: 'rounded-[12px]',
    autofill: '[--field-autofill-bg:var(--bg-elevated)] dark:[--field-autofill-bg:var(--bg-secondary)]',
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
    radius: 'rounded-[12px]',
    autofill: '[--field-autofill-bg:var(--bg-tertiary)]',
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
    radius: 'rounded-[12px]',
    autofill: '[--field-autofill-bg:var(--bg-primary)]',
  },
  underline: {
    rest: 'rounded-none border-0 border-b border-border-default bg-transparent',
    hover: 'hover:border-border-strong',
    focus: 'outline-none focus:border-brand-primary',
    radius: 'rounded-none',
    autofill: '[--field-autofill-bg:var(--bg-primary)]',
  },
  well: {
    rest: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    hover: 'hover:bg-bg-tertiary dark:hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
    radius: 'rounded-[18px]',
    autofill: '[--field-autofill-bg:var(--bg-secondary)] dark:[--field-autofill-bg:var(--bg-tertiary)]',
  },
  composer: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: '',
    radius: 'rounded-[18px]',
    autofill: '[--field-autofill-bg:var(--bg-elevated)] dark:[--field-autofill-bg:var(--bg-secondary)]',
  },
}

const forcedHover: Record<TextareaVariant, string> = {
  outline: 'border-border-strong',
  subtle: 'bg-bg-hover',
  ghost: 'bg-bg-hover',
  underline: 'border-border-strong',
  well: 'bg-bg-tertiary dark:bg-bg-hover',
  composer: 'border-border-strong',
}

const forcedFocus: Record<TextareaVariant, string> = {
  outline: OPEN_RING,
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  underline: 'border-brand-primary',
  well: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  composer: OPEN_RING,
}

function countTone(length: number, max?: number) {
  if (max == null) return 'tertiary' as const
  if (length >= max) return 'danger' as const
  if (length >= max * 0.8) return 'warning' as const
  return 'tertiary' as const
}

type TextareaProps = {
  icon?: ReactNode
  invalid?: boolean
  valid?: boolean
  variant?: TextareaVariant
  size?: TextareaSize
  preview?: TextareaPreview
  hint?: ReactNode
  count?: boolean
  resize?: 'y' | 'none'
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>

export function Textarea({
  icon,
  invalid = false,
  valid = false,
  variant = 'outline',
  size = 'md',
  preview,
  hint,
  count,
  resize,
  className,
  disabled,
  value,
  defaultValue,
  onChange,
  maxLength,
  ...rest
}: TextareaProps) {
  const controlled = value !== undefined
  const [inner, setInner] = useState(String(defaultValue ?? ''))
  const text = controlled ? String(value) : inner
  const metric = sizes[size]
  const look = chrome[variant]
  const composer = variant === 'composer'
  const well = variant === 'well'
  const error = invalid && !disabled
  const ok = valid && !invalid && !disabled
  const showCount = Boolean(count || maxLength != null)
  const grow = resize ?? (composer || well ? 'none' : 'y')
  const pad = well ? wellPad[size] : { pad: metric.pad, icon: metric.icon, padIcon: metric.padIcon }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (!controlled) setInner(event.target.value)
    onChange?.(event)
  }

  const shell = cn(
    look.rest,
    look.radius,
    look.autofill,
    !error && !preview && look.hover,
    preview === 'hover' && !error && !ok && forcedHover[variant],
    preview === 'focus' && !error && !ok && forcedFocus[variant],
    error && FIELD_INVALID,
    ok && FIELD_VALID,
    disabled && 'opacity-55',
  )

  const field = (
    <textarea
      className={cn(
        'dk-field min-w-0 w-full font-sans font-normal text-text-primary caret-text-primary',
        'placeholder:text-text-tertiary',
        'transition-[border-color,background-color,box-shadow] duration-150',
        EASE,
        metric.field,
        metric.min,
        pad.pad,
        icon ? pad.padIcon : null,
        showCount && !composer ? metric.padCount : null,
        grow === 'none' ? 'resize-none' : 'resize-y',
        'disabled:cursor-not-allowed',
        'read-only:text-text-secondary',
        composer
          ? 'rounded-none border-0 bg-transparent outline-none focus:shadow-none'
          : cn(
              look.radius,
              look.rest,
              look.autofill,
              !error && !preview && look.hover,
              !error && !ok && preview !== 'focus' && !composer ? look.focus : null,
              preview === 'hover' && !error && !ok && forcedHover[variant],
              preview === 'focus' && !error && !ok && forcedFocus[variant],
              error && FIELD_INVALID,
              ok && FIELD_VALID,
            ),
        !composer && className,
      )}
      {...rest}
      value={controlled ? value : inner}
      maxLength={maxLength}
      disabled={disabled}
      onChange={handleChange}
      aria-invalid={error || undefined}
    />
  )

  const counter = showCount ? (
    <Caption
      as="span"
      tone={countTone(text.length, maxLength ?? undefined)}
      className={cn(
        'tabular-nums',
        composer ? 'm-0' : 'pointer-events-none absolute right-4 bottom-3 z-[1]',
        size === 'sm' && !composer && 'right-3 bottom-2',
        well && !composer && 'right-6 bottom-5',
      )}
    >
      {maxLength != null ? `${text.length} / ${maxLength}` : text.length}
    </Caption>
  ) : null

  return (
    <label className={cn('group relative block w-full', composer && className)}>
      {icon ? (
        <span
          className={cn(
            'pointer-events-none absolute z-[1] inline-flex text-text-tertiary',
            'transition-colors duration-150',
            EASE,
            pad.icon,
            'group-has-[:not(:placeholder-shown)]:text-text-primary',
            'group-hover:text-text-secondary',
            'group-focus-within:text-brand-primary',
            preview === 'hover' && 'text-text-secondary',
            preview === 'focus' && 'text-brand-primary',
            ok && 'text-success group-focus-within:text-success',
            error && 'text-danger group-focus-within:text-danger',
            disabled && 'text-text-disabled',
          )}
        >
          {icon}
        </span>
      ) : null}

      {composer ? (
        <span
          className={cn(
            'flex w-full flex-col overflow-hidden transition-[border-color,background-color,box-shadow] duration-150',
            EASE,
            shell,
            !error && !ok && preview !== 'focus' && 'group-focus-within:border-brand-primary group-focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            error && 'group-focus-within:border-danger group-focus-within:shadow-[0_0_0_2px_var(--danger-focus-ring)]',
            ok && 'group-focus-within:border-success group-focus-within:shadow-[0_0_0_2px_var(--success-focus-ring)]',
          )}
        >
          {field}
          <span className="flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-2.5">
            {hint ? (
              <Caption as="span" className="m-0 min-w-0">
                {hint}
              </Caption>
            ) : (
              <span />
            )}
            {counter}
          </span>
        </span>
      ) : (
        <>
          {field}
          {counter}
        </>
      )}
    </label>
  )
}
