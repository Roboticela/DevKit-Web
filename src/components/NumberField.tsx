'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { DkAddPlusCreate, DkChevronCaretDown, DkChevronCaretUp, DkSubtractMinusRemove } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type NumberFieldVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'
export type NumberFieldSize = 'sm' | 'md' | 'lg'
export type NumberFieldPreview = 'hover' | 'focus'
export type NumberFieldStepper = 'stack' | 'split'
export type NumberFieldUnit = 'none' | 'percent' | 'currency' | 'degree' | 'px'
export type NumberFieldAlign = 'start' | 'center' | 'end'
export type NumberFieldWidth = 'fit' | 'fill'

export const NUMBER_FIELD_VARIANTS: NumberFieldVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const NUMBER_FIELD_SIZES: NumberFieldSize[] = ['sm', 'md', 'lg']
export const NUMBER_FIELD_UNITS: NumberFieldUnit[] = ['none', 'percent', 'currency', 'degree', 'px']
export const NUMBER_FIELD_STEPPERS: NumberFieldStepper[] = ['stack', 'split']
export const NUMBER_FIELD_WIDTHS: NumberFieldWidth[] = ['fit', 'fill']
export const NUMBER_FIELD_ALIGNS: NumberFieldAlign[] = ['start', 'center', 'end']

export const NUMBER_FIELD_WIDTH_LABEL: Record<NumberFieldWidth, string> = {
  fit: 'Fit',
  fill: 'Fill',
}

export const NUMBER_FIELD_ALIGN_LABEL: Record<NumberFieldAlign, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
}

/** Max field width in px before the digits clip. Fit grows up to this. */
export const NUMBER_FIELD_FIT_MAX: Record<NumberFieldVariant, Record<NumberFieldSize, number>> = {
  outline: { sm: 152, md: 184, lg: 208 },
  subtle: { sm: 152, md: 184, lg: 208 },
  ghost: { sm: 136, md: 160, lg: 184 },
  underline: { sm: 192, md: 256, lg: 288 },
  pill: { sm: 160, md: 192, lg: 224 },
}

export const NUMBER_FIELD_VARIANT_LABEL: Record<NumberFieldVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

export const NUMBER_FIELD_UNIT_LABEL: Record<NumberFieldUnit, string> = {
  none: 'None',
  percent: 'Percent',
  currency: 'Currency',
  degree: 'Degree',
  px: 'Pixels',
}

const UNIT_MARK: Record<NumberFieldUnit, { prefix: string; suffix: string }> = {
  none: { prefix: '', suffix: '' },
  percent: { prefix: '', suffix: '%' },
  currency: { prefix: '$', suffix: '' },
  degree: { prefix: '', suffix: '°' },
  px: { prefix: '', suffix: 'px' },
}

const sizes: Record<
  NumberFieldSize,
  { field: string; pad: string; radius: string; stack: string; split: string; glyph: number; splitGlyph: number }
> = {
  sm: {
    field: 'h-9 text-[15px]',
    pad: 'px-3',
    radius: 'rounded-[10px]',
    stack: 'w-7',
    split: 'size-7',
    glyph: 12,
    splitGlyph: 14,
  },
  md: {
    field: 'h-11 text-[17px]',
    pad: 'px-4',
    radius: 'rounded-[12px]',
    stack: 'w-8',
    split: 'size-8',
    glyph: 14,
    splitGlyph: 16,
  },
  lg: {
    field: 'h-[50px] text-[17px]',
    pad: 'px-4',
    radius: 'rounded-[12px]',
    stack: 'w-9',
    split: 'size-9',
    glyph: 16,
    splitGlyph: 18,
  },
}

const chrome: Record<
  NumberFieldVariant,
  { rest: string; hover: string; focus: string; radius?: string }
> = {
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: 'focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    focus:
      'focus-within:bg-bg-elevated dark:focus-within:bg-bg-secondary focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    focus:
      'focus-within:bg-bg-elevated dark:focus-within:bg-bg-secondary focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  },
  underline: {
    rest: 'rounded-none border-0 border-b border-border-default bg-transparent',
    hover: 'hover:border-border-strong',
    focus: 'focus-within:border-brand-primary',
    radius: 'rounded-none',
  },
  pill: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: 'focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    radius: 'rounded-[980px]',
  },
}

const forcedHover: Record<NumberFieldVariant, string> = {
  outline: 'border-border-strong',
  subtle: 'bg-bg-hover',
  ghost: 'bg-bg-hover',
  underline: 'border-border-strong',
  pill: 'border-border-strong',
}

const forcedFocus: Record<NumberFieldVariant, string> = {
  outline: 'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  subtle:
    'border-brand-primary bg-bg-elevated dark:bg-bg-secondary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  ghost:
    'border-brand-primary bg-bg-elevated dark:bg-bg-secondary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  underline: 'border-brand-primary',
  pill: 'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
}

function decimalsOf(step: number) {
  const text = String(step)
  return text.includes('.') ? (text.split('.')[1] ?? '').length : 0
}

function snap(value: number, min: number | undefined, max: number | undefined, step: number) {
  let next = value
  if (step > 0 && Number.isFinite(step)) {
    const origin = min ?? 0
    next = origin + Math.round((value - origin) / step) * step
    next = Number(next.toFixed(decimalsOf(step)))
  }
  if (min != null) next = Math.max(min, next)
  if (max != null) next = Math.min(max, next)
  return next
}

function formatNumber(value: number | null, step: number) {
  if (value == null || !Number.isFinite(value)) return ''
  return value.toFixed(decimalsOf(step))
}

function parseDraft(raw: string): { kind: 'empty' | 'partial' | 'number'; value: number | null } {
  const text = raw.trim().replace(/,/g, '')
  if (text === '') return { kind: 'empty', value: null }
  if (text === '-' || text === '.' || text === '-.') return { kind: 'partial', value: null }
  const next = Number(text)
  if (!Number.isFinite(next)) return { kind: 'partial', value: null }
  return { kind: 'number', value: next }
}

export type NumberFieldProps = {
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  unit?: NumberFieldUnit
  prefix?: string
  suffix?: string
  stepper?: NumberFieldStepper
  align?: NumberFieldAlign
  variant?: NumberFieldVariant
  size?: NumberFieldSize
  preview?: NumberFieldPreview
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  readOnly?: boolean
  compact?: boolean
  width?: NumberFieldWidth
  placeholder?: string
  name?: string
  id?: string
  'aria-label'?: string
  ariaLabel?: string
  className?: string
}

export function NumberField({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  unit = 'none',
  prefix: prefixProp,
  suffix: suffixProp,
  stepper = 'stack',
  align,
  variant = 'outline',
  size = 'md',
  preview,
  invalid = false,
  valid = false,
  disabled = false,
  readOnly = false,
  compact,
  width,
  placeholder = '0',
  name,
  id,
  ariaLabel,
  className,
  'aria-label': ariaLabelAttr,
}: NumberFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const holdTimer = useRef(0)
  const holdPulse = useRef(0)
  const currentRef = useRef<number | null>(null)
  const [inner, setInner] = useState<number | null>(defaultValue)
  const controlled = valueProp !== undefined
  const current = controlled ? valueProp : inner
  currentRef.current = current
  const [draft, setDraft] = useState(() => formatNumber(current, step))
  const [focused, setFocused] = useState(false)

  const metric = sizes[size]
  const look = chrome[variant]
  const radius = look.radius ?? metric.radius
  const split = stepper === 'split'
  const fill = width === 'fill' || (width == null && compact === false)
  const fitMax = NUMBER_FIELD_FIT_MAX[variant][size]
  const textAlign = align ?? (split ? 'center' : 'start')
  const mark = UNIT_MARK[unit]
  const prefix = prefixProp ?? mark.prefix
  const suffix = suffixProp ?? mark.suffix
  const error = invalid && !disabled
  const ok = valid && !invalid && !disabled
  const locked = disabled || readOnly
  const atMin = min != null && current != null && current <= min
  const atMax = max != null && current != null && current >= max
  const named = ariaLabel ?? ariaLabelAttr

  useEffect(() => {
    if (!focused) setDraft(formatNumber(current, step))
  }, [current, focused, step])

  useEffect(() => {
    return () => {
      window.clearTimeout(holdTimer.current)
      window.clearInterval(holdPulse.current)
    }
  }, [])

  function emit(next: number | null) {
    if (!controlled) setInner(next)
    onValueChange?.(next)
  }

  function commit(next: number | null) {
    if (locked) return
    if (next == null) {
      emit(null)
      setDraft('')
      return
    }
    const snapped = snap(next, min, max, step)
    emit(snapped)
    setDraft(formatNumber(snapped, step))
  }

  function nudge(direction: 1 | -1) {
    if (locked) return
    const from = currentRef.current
    const base = from == null ? (min ?? 0) : from
    commit(base + direction * step)
  }

  function stopHold() {
    window.clearTimeout(holdTimer.current)
    window.clearInterval(holdPulse.current)
  }

  function startHold(direction: 1 | -1) {
    if (locked) return
    if (direction === -1 && atMin) return
    if (direction === 1 && atMax) return
    nudge(direction)
    holdTimer.current = window.setTimeout(() => {
      holdPulse.current = window.setInterval(() => {
        const now = currentRef.current
        if (direction === -1 && min != null && now != null && now <= min) {
          stopHold()
          return
        }
        if (direction === 1 && max != null && now != null && now >= max) {
          stopHold()
          return
        }
        nudge(direction)
      }, 60)
    }, 400)
  }

  function onPointerDown(direction: 1 | -1) {
    return (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault()
      startHold(direction)
    }
  }

  function focusInput(event: PointerEvent<HTMLDivElement>) {
    if (disabled) return
    const input = inputRef.current
    if (!input || event.target === input) return
    event.preventDefault()
    input.focus()
    const length = input.value.length
    const rect = input.getBoundingClientRect()
    if (event.clientX < rect.left) input.setSelectionRange(0, 0)
    else input.setSelectionRange(length, length)
  }

  function onChange(raw: string) {
    setDraft(raw)
    const parsed = parseDraft(raw)
    if (parsed.kind === 'empty') emit(null)
    if (parsed.kind === 'number') emit(parsed.value)
  }

  function onBlur() {
    setFocused(false)
    const parsed = parseDraft(draft)
    if (parsed.kind === 'number' && parsed.value != null) {
      commit(parsed.value)
      return
    }
    if (parsed.kind === 'empty') {
      commit(null)
      return
    }
    setDraft(formatNumber(current, step))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (locked) return
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      nudge(1)
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      nudge(-1)
    }
    if (event.key === 'PageUp') {
      event.preventDefault()
      commit((current ?? min ?? 0) + step * 10)
    }
    if (event.key === 'PageDown') {
      event.preventDefault()
      commit((current ?? min ?? 0) - step * 10)
    }
    if (event.key === 'Home' && min != null) {
      event.preventDefault()
      commit(min)
    }
    if (event.key === 'End' && max != null) {
      event.preventDefault()
      commit(max)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const parsed = parseDraft(draft)
      if (parsed.kind === 'number' && parsed.value != null) commit(parsed.value)
    }
  }

  const display = focused ? draft : formatNumber(current, step)
  const chars = Math.max(display.length, placeholder.length, 1)
  const glyph = { size: metric.glyph, strokeWidth: 2, absoluteStrokeWidth: true as const }
  const splitGlyph = { size: metric.splitGlyph, strokeWidth: 1.75, absoluteStrokeWidth: true as const }

  const stepperBtn = (direction: 1 | -1, stacked: boolean) => {
    const blocked = locked || (direction === -1 ? atMin : atMax)
    const label = direction === 1 ? 'Increase' : 'Decrease'
    return (
      <button
        type="button"
        tabIndex={-1}
        aria-label={label}
        disabled={blocked}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0',
          'text-text-tertiary',
          'transition-colors duration-150',
          EASE,
          'hover:text-text-primary',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'focus-visible:outline-none',
          stacked && 'min-h-0 flex-1',
          split && cn(metric.split, variant === 'pill' ? 'rounded-full' : 'rounded-[8px]'),
          split && !blocked && 'hover:bg-bg-hover',
        )}
        onPointerDown={onPointerDown(direction)}
        onPointerUp={stopHold}
        onPointerCancel={stopHold}
        onPointerLeave={stopHold}
      >
        {split ? (
          direction === 1 ? (
            <DkAddPlusCreate {...splitGlyph} />
          ) : (
            <DkSubtractMinusRemove {...splitGlyph} />
          )
        ) : direction === 1 ? (
          <DkChevronCaretUp {...glyph} />
        ) : (
          <DkChevronCaretDown {...glyph} />
        )}
      </button>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex items-stretch font-sans font-normal leading-none text-text-primary',
        fill
          ? 'transition-[border-color,background-color,box-shadow] duration-150'
          : 'transition-[border-color,background-color,box-shadow,width] duration-150',
        EASE,
        fill ? 'w-full' : 'w-max max-w-full',
        metric.field,
        radius,
        look.rest,
        !error && !preview && !disabled && look.hover,
        !error && !ok && preview !== 'focus' && !disabled ? look.focus : null,
        preview === 'hover' && !error && !ok && forcedHover[variant],
        preview === 'focus' && !error && !ok && forcedFocus[variant],
        error &&
          (variant === 'underline'
            ? 'border-danger focus-within:border-danger'
            : 'border-danger focus-within:border-danger focus-within:shadow-[0_0_0_2px_var(--danger-focus-ring)]'),
        ok &&
          (variant === 'underline'
            ? 'border-success focus-within:border-success'
            : 'border-success focus-within:border-success focus-within:shadow-[0_0_0_2px_var(--success-focus-ring)]'),
        disabled && 'cursor-not-allowed opacity-55',
        !disabled && 'cursor-text',
        className,
      )}
      style={fill ? undefined : { maxWidth: `min(100%, ${fitMax}px)` }}
    >
      {split ? (
        <div
          className={cn(
            'flex cursor-pointer items-center',
            variant === 'underline' ? 'pl-0' : 'pl-1',
            variant === 'pill' && 'pl-1.5',
          )}
        >
          {stepperBtn(-1, false)}
        </div>
      ) : null}

      <div
        className={cn(
          'flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden',
          metric.pad,
          split && 'px-1',
          textAlign === 'center' && 'justify-center',
          textAlign === 'end' && 'justify-end',
          textAlign === 'start' && 'justify-start',
          disabled ? 'cursor-not-allowed' : 'cursor-text',
        )}
        onPointerDown={focusInput}
      >
        {prefix ? (
          <span className="pointer-events-none shrink-0 select-none text-text-tertiary tabular-nums">{prefix}</span>
        ) : null}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          role="spinbutton"
          inputMode={step < 1 || (min != null && min < 0) ? 'decimal' : 'numeric'}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label={named}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current ?? undefined}
          aria-valuetext={
            current == null ? undefined : `${prefix}${formatNumber(current, step)}${suffix}`
          }
          aria-invalid={error || undefined}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={display}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className={cn(
            'm-0 min-w-[1.5ch] max-w-full border-0 bg-transparent p-0 font-sans tabular-nums text-text-primary caret-text-primary',
            'overflow-hidden placeholder:text-text-tertiary',
            'outline-none',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            textAlign === 'center' && 'text-center',
            textAlign === 'end' && 'text-end',
            readOnly && 'text-text-secondary',
            disabled ? 'cursor-not-allowed' : 'cursor-text',
          )}
          style={{ width: `${chars + 0.8}ch` }}
        />
        {suffix ? (
          <span className="pointer-events-none shrink-0 select-none text-text-tertiary">{suffix}</span>
        ) : null}
      </div>

      {split ? (
        <div
          className={cn(
            'flex items-center cursor-pointer',
            variant === 'underline' ? 'pr-0' : 'pr-1',
            variant === 'pill' && 'pr-1.5',
          )}
        >
          {stepperBtn(1, false)}
        </div>
      ) : (
        <div
          className={cn(
            'flex shrink-0 cursor-pointer flex-col',
            metric.stack,
            'divide-y divide-border-subtle',
            variant !== 'underline' && variant !== 'ghost' && 'border-l border-border-subtle',
            variant === 'pill' && 'overflow-hidden rounded-r-[980px]',
          )}
        >
          {stepperBtn(1, true)}
          {stepperBtn(-1, true)}
        </div>
      )}
    </div>
  )
}
