'use client'

import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import {
  NumberField,
  NUMBER_FIELD_FIT_MAX,
  type NumberFieldAlign,
  type NumberFieldPreview,
  type NumberFieldSize,
  type NumberFieldStepper,
  type NumberFieldUnit,
  type NumberFieldVariant,
  type NumberFieldWidth,
} from './NumberField'
import { Caption } from './Text'

export type SliderVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type SliderSize = 'sm' | 'md' | 'lg'
export type SliderPreview = 'hover' | 'focus' | 'active'
export type SliderTone = 'default' | 'onDark'
export type SliderField = 'end' | 'start' | 'both'

export const SLIDER_VARIANTS: SliderVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const SLIDER_SIZES: SliderSize[] = ['sm', 'md', 'lg']
export const SLIDER_FIELDS: SliderField[] = ['end', 'start', 'both']

export const SLIDER_VARIANT_LABEL: Record<SliderVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SLIDER_FIELD_LABEL: Record<SliderField, string> = {
  end: 'Field end',
  start: 'Field start',
  both: 'Fields both',
}

const FIELD_CHROME: Record<SliderVariant, NumberFieldVariant> = {
  fill: 'outline',
  subtle: 'subtle',
  outline: 'outline',
  ghost: 'ghost',
  pill: 'pill',
}

const sizes: Record<SliderSize, { hit: number; track: number; thumb: number; pillTrack: number; pillThumb: number }> = {
  sm: { hit: 28, track: 4, thumb: 16, pillTrack: 10, pillThumb: 14 },
  md: { hit: 32, track: 6, thumb: 20, pillTrack: 12, pillThumb: 16 },
  lg: { hit: 36, track: 8, thumb: 24, pillTrack: 14, pillThumb: 18 },
}

type TrackLook = { track: string; fill: string; thumb: string; thumbBorder: string }

function looks(variant: SliderVariant, tone: SliderTone, invalid: boolean, valid: boolean): TrackLook {
  const fill = invalid ? 'bg-danger' : valid ? 'bg-success' : 'bg-brand-primary'
  const thumbFill = invalid ? 'bg-danger' : valid ? 'bg-success' : 'bg-brand-primary'
  const onDarkTrack = 'bg-[#3a3a3c]'
  const restTrack = tone === 'onDark' ? onDarkTrack : 'bg-bg-tertiary'

  const chrome: Record<SliderVariant, TrackLook> = {
    fill: {
      track: restTrack,
      fill,
      thumb: thumbFill,
      thumbBorder: 'border-0',
    },
    subtle: {
      track: restTrack,
      fill,
      thumb: tone === 'onDark' ? 'bg-white' : 'bg-bg-elevated dark:bg-bg-secondary',
      thumbBorder: 'border border-border-default',
    },
    outline: {
      track: cn('bg-transparent border', tone === 'onDark' ? 'border-[#48484a]' : 'border-border-default'),
      fill,
      thumb: thumbFill,
      thumbBorder: 'border-0',
    },
    ghost: {
      track: 'bg-transparent',
      fill: invalid ? 'bg-danger-subtle' : valid ? 'bg-success-subtle' : 'bg-brand-primary-subtle',
      thumb: thumbFill,
      thumbBorder: 'border-0',
    },
    pill: {
      track: restTrack,
      fill,
      thumb: tone === 'onDark' ? 'bg-white' : 'bg-bg-elevated dark:bg-bg-secondary',
      thumbBorder: 'border border-border-subtle',
    },
  }
  return chrome[variant]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function snap(value: number, min: number, max: number, step: number) {
  if (step <= 0) return clamp(value, min, max)
  const stepped = min + Math.round((value - min) / step) * step
  const decimals = (String(step).split('.')[1] ?? '').length
  return Number(clamp(stepped, min, max).toFixed(decimals))
}

function percent(value: number, min: number, max: number) {
  if (max === min) return 0
  return ((value - min) / (max - min)) * 100
}

type ThumbKey = 'value' | 'start' | 'end'

type SliderBase = {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
  variant?: SliderVariant
  size?: SliderSize
  tone?: SliderTone
  preview?: SliderPreview
  label?: ReactNode
  showValue?: boolean
  showEnds?: boolean
  marks?: boolean | number[]
  formatValue?: (value: number) => string
  field?: boolean | SliderField
  unit?: NumberFieldUnit
  prefix?: string
  suffix?: string
  fieldVariant?: NumberFieldVariant
  fieldSize?: NumberFieldSize
  fieldStepper?: NumberFieldStepper
  fieldAlign?: NumberFieldAlign
  fieldWidth?: NumberFieldWidth
  fieldCompact?: boolean
  fieldReadOnly?: boolean
  fieldPlaceholder?: string
  fieldName?: string
  fieldId?: string
  fieldPreview?: NumberFieldPreview
  fieldClassName?: string
  className?: string
  ariaLabel?: string
  'aria-label'?: string
}

type SingleSliderProps = SliderBase & {
  mode?: 'single'
  value: number
  onValueChange: (value: number) => void
}

type RangeSliderModeProps = SliderBase & {
  mode: 'range'
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}

export type SliderProps = SingleSliderProps | RangeSliderModeProps
export type RangeSliderProps = Omit<RangeSliderModeProps, 'mode'>

function isRange(props: SliderProps): props is RangeSliderModeProps {
  return props.mode === 'range'
}

function resolveField(field: boolean | SliderField | undefined, range: boolean): false | SliderField {
  if (!field) return false
  if (field === true) return range ? 'both' : 'end'
  if (field === 'both') return range ? 'both' : 'end'
  if (range && (field === 'start' || field === 'end')) return 'both'
  return field
}

export function Slider(props: SliderProps) {
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    invalid = false,
    valid = false,
    variant = 'fill',
    size = 'md',
    tone = 'default',
    preview,
    label,
    showValue = false,
    showEnds = false,
    marks,
    formatValue = (value) => String(value),
    field,
    unit = 'none',
    prefix,
    suffix,
    fieldVariant,
    fieldSize,
    fieldStepper = 'stack',
    fieldAlign,
    fieldWidth,
    fieldCompact,
    fieldReadOnly = false,
    fieldPlaceholder,
    fieldName,
    fieldId,
    fieldPreview: fieldPreviewProp,
    fieldClassName,
    className,
    ariaLabel,
  } = props
  const ariaName = ariaLabel ?? props['aria-label']

  const range = isRange(props)
  const start = range ? Math.min(props.value[0], props.value[1]) : props.value
  const end = range ? Math.max(props.value[0], props.value[1]) : props.value
  const rangeValue = range ? props.value : null
  const onSingleChange = range ? null : props.onValueChange
  const onRangeChange = range ? props.onValueChange : null

  const metric = sizes[size]
  const pill = variant === 'pill'
  const trackH = pill ? metric.pillTrack : metric.track
  const thumb = pill ? metric.pillThumb : metric.thumb
  const look = looks(variant, tone, invalid, valid && !invalid)
  const labelId = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const active = useRef<ThumbKey | null>(null)
  const [dragging, setDragging] = useState<ThumbKey | null>(null)
  const [focusThumb, setFocusThumb] = useState<ThumbKey | null>(null)
  const hovering = preview === 'hover'
  const focusing = preview === 'focus'

  const fillLeft = range ? percent(start, min, max) : 0
  const fillWidth = range ? percent(end, min, max) - percent(start, min, max) : percent(end, min, max)

  const markValues = useCallback((): number[] => {
    if (!marks) return []
    if (Array.isArray(marks)) return marks.filter((value) => value >= min && value <= max)
    const span = max - min
    if (step <= 0 || span / step > 12) return [min, max]
    const next: number[] = []
    for (let value = min; value <= max + step / 2; value += step) {
      next.push(snap(value, min, max, step))
    }
    return next
  }, [marks, max, min, step])

  const valueFromX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect || rect.width === 0) return min
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
      return snap(min + ratio * (max - min), min, max, step)
    },
    [max, min, step],
  )

  const commit = useCallback(
    (next: number, thumbKey: ThumbKey) => {
      if (disabled) return
      if (thumbKey === 'start' || thumbKey === 'end') {
        if (!onRangeChange || !rangeValue) return
        if (thumbKey === 'start') {
          onRangeChange([Math.min(next, rangeValue[1]), rangeValue[1]])
        } else {
          onRangeChange([rangeValue[0], Math.max(next, rangeValue[0])])
        }
        return
      }
      onSingleChange?.(next)
    },
    [disabled, onRangeChange, onSingleChange, rangeValue],
  )

  function pickThumb(next: number): ThumbKey {
    if (!range) return 'value'
    const toStart = Math.abs(next - start)
    const toEnd = Math.abs(next - end)
    if (start === end) return next < start ? 'start' : 'end'
    return toStart <= toEnd ? 'start' : 'end'
  }

  function resolveThumb(next: number, preferred: ThumbKey): ThumbKey {
    if (!range || start !== end) return preferred
    if (next < start) return 'start'
    if (next > start) return 'end'
    return preferred
  }

  function focusThumbButton(thumbKey: ThumbKey) {
    const node = trackRef.current?.querySelector<HTMLButtonElement>(`[data-thumb="${thumbKey}"]`)
    node?.focus({ preventScroll: true })
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (disabled) return
    event.preventDefault()
    const hit = (event.target as HTMLElement).closest('[data-thumb]')?.getAttribute('data-thumb') as ThumbKey | null
    const next = valueFromX(event.clientX)
    const thumbKey = resolveThumb(next, hit ?? pickThumb(next))
    active.current = thumbKey
    setDragging(thumbKey)
    commit(next, thumbKey)
    event.currentTarget.setPointerCapture(event.pointerId)
    setFocusThumb(thumbKey)
    focusThumbButton(thumbKey)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!active.current || disabled) return
    const next = valueFromX(event.clientX)
    const thumbKey = resolveThumb(next, active.current)
    active.current = thumbKey
    setDragging(thumbKey)
    commit(next, thumbKey)
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    active.current = null
    setDragging(null)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, thumbKey: ThumbKey) {
    if (disabled) return
    const current = thumbKey === 'start' ? start : end
    const jump = Math.max(step, (max - min) / 10)
    let next: number | null = null
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = current - (event.shiftKey ? jump : step)
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = current + (event.shiftKey ? jump : step)
    if (event.key === 'Home') next = min
    if (event.key === 'End') next = max
    if (event.key === 'PageDown') next = current - jump
    if (event.key === 'PageUp') next = current + jump
    if (next == null) return
    event.preventDefault()
    commit(snap(next, min, max, step), thumbKey)
  }

  const display = range ? `${formatValue(start)} – ${formatValue(end)}` : formatValue(end)
  const dark = tone === 'onDark'
  const hoverFill =
    hovering && !invalid && !valid && variant !== 'ghost'
      ? 'bg-brand-primary-hover'
      : look.fill
  const named = typeof label === 'string' ? label : ariaName
  const fieldLayout = resolveField(field, range)
  const showCaptionValue = showValue && !fieldLayout
  const fieldChrome = fieldVariant ?? FIELD_CHROME[variant]
  const fieldMetric = fieldSize ?? size
  const fieldFill = fieldWidth === 'fill' || (fieldWidth == null && fieldCompact === false)
  const fieldColumn = NUMBER_FIELD_FIT_MAX[fieldChrome][fieldMetric]
  const fieldPreview = fieldPreviewProp ?? (preview === 'hover' || preview === 'focus' ? preview : undefined)

  function onFieldChange(next: number | null, thumbKey: ThumbKey) {
    if (next == null) return
    commit(next, thumbKey)
  }

  function renderField(thumbKey: ThumbKey) {
    const value = thumbKey === 'start' ? start : end
    const fieldMin = thumbKey === 'start' ? min : range ? start : min
    const fieldMax = thumbKey === 'start' ? end : max
    const spinLabel = named
      ? thumbKey === 'start'
        ? `${named} minimum`
        : thumbKey === 'end'
          ? `${named} maximum`
          : named
      : thumbKey === 'start'
        ? 'Minimum'
        : thumbKey === 'end'
          ? 'Maximum'
          : 'Value'
    const fieldDomId = fieldId
      ? thumbKey === 'start'
        ? `${fieldId}-start`
        : thumbKey === 'end'
          ? `${fieldId}-end`
          : fieldId
      : undefined
    const fieldDomName = fieldName
      ? thumbKey === 'start'
        ? `${fieldName}Start`
        : thumbKey === 'end'
          ? `${fieldName}End`
          : fieldName
      : undefined
    return (
      <div
        className={fieldFill ? 'min-w-0' : 'w-max shrink-0'}
        style={
          fieldFill
            ? { flex: `0 1 ${fieldColumn}px`, width: fieldColumn, maxWidth: fieldColumn }
            : { maxWidth: fieldColumn }
        }
      >
        <NumberField
          width={fieldFill ? 'fill' : 'fit'}
          compact={fieldCompact}
          value={value}
          onValueChange={(next) => onFieldChange(next, thumbKey)}
          min={fieldMin}
          max={fieldMax}
          step={step}
          unit={unit}
          prefix={prefix}
          suffix={suffix}
          stepper={fieldStepper}
          align={fieldAlign}
          variant={fieldChrome}
          size={fieldMetric}
          invalid={invalid}
          valid={valid}
          disabled={disabled}
          readOnly={fieldReadOnly}
          placeholder={fieldPlaceholder}
          name={fieldDomName}
          id={fieldDomId}
          preview={fieldPreview}
          aria-label={spinLabel}
          className={fieldClassName}
        />
      </div>
    )
  }

  function renderThumb(thumbKey: ThumbKey, value: number, name: string) {
    const focused = focusing || focusThumb === thumbKey
    const pressed = preview === 'active' || dragging === thumbKey
    return (
      <button
        type="button"
        role="slider"
        data-thumb={thumbKey}
        aria-label={name}
        aria-labelledby={label && !ariaName && typeof label !== 'string' ? labelId : undefined}
        aria-orientation="horizontal"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatValue(value)}
        aria-invalid={invalid || undefined}
        aria-hidden={fieldLayout ? true : undefined}
        disabled={disabled}
        tabIndex={disabled || fieldLayout ? -1 : 0}
        className={cn(
          'absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center',
          'cursor-pointer border-0 bg-transparent p-0',
          'touch-none focus-visible:outline-none',
          dragging === thumbKey ? 'z-[2]' : 'z-[1]',
          disabled && 'cursor-not-allowed',
        )}
        style={{ left: `${percent(value, min, max)}%`, width: metric.hit, height: metric.hit }}
        onFocus={() => setFocusThumb(thumbKey)}
        onBlur={() => setFocusThumb((current) => (current === thumbKey ? null : current))}
        onKeyDown={(event) => onKeyDown(event, thumbKey)}
      >
        <span
          className={cn(
            'pointer-events-none block rounded-full',
            look.thumb,
            look.thumbBorder,
            'transition-[background-color,border-color,box-shadow,transform] duration-150',
            EASE,
            (focused || pressed) &&
              (invalid
                ? 'shadow-[0_0_0_2px_var(--danger-focus-ring)]'
                : 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]'),
            hovering && !disabled && 'scale-105',
            pressed && 'scale-110',
          )}
          style={{ width: thumb, height: thumb }}
        />
      </button>
    )
  }

  return (
    <div
      className={cn('flex min-w-0 w-full flex-col gap-2', className)}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-label={!label ? ariaName : undefined}
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
    >
      {label || showCaptionValue ? (
        <div className="flex items-baseline justify-between gap-3">
          {label ? (
            <Caption as="span" id={labelId} className={dark ? 'text-[#a1a1a6]' : undefined}>
              {label}
            </Caption>
          ) : (
            <span />
          )}
          {showCaptionValue ? (
            <Caption as="span" className={cn('tabular-nums', dark && 'text-[#a1a1a6]')}>
              {display}
            </Caption>
          ) : null}
        </div>
      ) : null}

      <div className={cn('flex w-full min-w-0 flex-nowrap items-center', fieldLayout && 'gap-3')}>
        {fieldLayout === 'start' || fieldLayout === 'both'
          ? renderField(range ? 'start' : 'value')
          : null}
        <div
          className="box-border min-w-12 flex-1"
          style={{ height: metric.hit, paddingInline: thumb / 2 }}
        >
          <div
            ref={trackRef}
            className={cn(
              'relative h-full w-full touch-none select-none',
              disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className={cn(
                'pointer-events-none absolute top-1/2 right-0 left-0 -translate-y-1/2 rounded-[980px]',
                look.track,
              )}
              style={{ height: trackH }}
            />
            <div
              className={cn(
                'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-[980px]',
                hoverFill,
                'transition-[background-color,width,left] duration-150',
                EASE,
              )}
              style={{ left: `${fillLeft}%`, width: `${fillWidth}%`, height: trackH }}
            />
            {markValues().map((mark) => (
              <span
                key={mark}
                className={cn(
                  'pointer-events-none absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full',
                  dark ? 'bg-[#636366]' : 'bg-border-strong',
                )}
                style={{ left: `${percent(mark, min, max)}%` }}
              />
            ))}
            {range
              ? renderThumb('start', start, named ? `${named} minimum` : 'Minimum')
              : null}
            {renderThumb(
              range ? 'end' : 'value',
              end,
              named ? (range ? `${named} maximum` : named) : range ? 'Maximum' : 'Value',
            )}
          </div>
        </div>
        {fieldLayout === 'end' || fieldLayout === 'both'
          ? renderField(range ? 'end' : 'value')
          : null}
      </div>

      {showEnds ? (
        <div className="flex justify-between">
          <Caption as="span" className={dark ? 'text-[#a1a1a6]' : undefined}>
            {formatValue(min)}
          </Caption>
          <Caption as="span" className={dark ? 'text-[#a1a1a6]' : undefined}>
            {formatValue(max)}
          </Caption>
        </div>
      ) : null}
    </div>
  )
}

export function RangeSlider(props: RangeSliderProps) {
  return <Slider mode="range" {...props} />
}
