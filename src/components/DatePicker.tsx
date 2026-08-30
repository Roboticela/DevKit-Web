'use client'

import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DkCalendarDateSchedule,
  DkCalendarDateScheduleRange,
  DkChevronCaretLeft,
  DkChevronCaretRight,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { Anchor } from './Anchor'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { SelectMenu } from './SelectMenu'
import {
  SELECT_SIZES,
  SELECT_VARIANTS,
  SelectTrigger,
  type SelectTriggerSize,
  type SelectTriggerVariant,
} from './SelectTrigger'
import { Caption, Label } from './Text'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

const GLYPH: Record<SelectTriggerSize, { size: number; strokeWidth: number; absoluteStrokeWidth: true }> = {
  sm: { size: 16, strokeWidth: 1.75, absoluteStrokeWidth: true },
  md: { size: 18, strokeWidth: 1.75, absoluteStrokeWidth: true },
  lg: { size: 20, strokeWidth: 1.75, absoluteStrokeWidth: true },
}

export type DateValue = string | null
export type DateRange = { start: DateValue; end: DateValue }
export type DatePickerVariant = SelectTriggerVariant
export type DatePickerSize = SelectTriggerSize
export type DatePickerPreview = 'hover' | 'open'

export const DATE_PICKER_VARIANTS: DatePickerVariant[] = SELECT_VARIANTS
export const DATE_PICKER_SIZES: DatePickerSize[] = SELECT_SIZES

type SingleProps = {
  mode?: 'single'
  value: DateValue
  onChange: (next: DateValue) => void
  rangeValue?: never
  onRangeChange?: never
}

type RangeProps = {
  mode: 'range'
  value?: never
  onChange?: never
  rangeValue: DateRange
  onRangeChange: (next: DateRange) => void
}

type DatePickerProps = {
  label?: string
  placeholder?: string
  disabled?: boolean
  min?: string
  max?: string
  className?: string
  triggerWidth?: number | string
  variant?: DatePickerVariant
  size?: DatePickerSize
  compact?: boolean
  invalid?: boolean
  valid?: boolean
  preview?: DatePickerPreview
} & (SingleProps | RangeProps)

function parseISODate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDisplayDate(value: DateValue) {
  const date = parseISODate(value)
  if (!date) return null
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatRangeDisplay(range: DateRange) {
  const start = formatDisplayDate(range.start)
  const end = formatDisplayDate(range.end)
  if (start && end) return `${start} – ${end}`
  if (start) return `${start} –`
  return null
}

function clampMonth(date: Date, min?: Date | null, max?: Date | null) {
  let next = new Date(date.getFullYear(), date.getMonth(), 1, 12)
  if (min) {
    const minMonth = new Date(min.getFullYear(), min.getMonth(), 1, 12)
    if (next < minMonth) next = minMonth
  }
  if (max) {
    const maxMonth = new Date(max.getFullYear(), max.getMonth(), 1, 12)
    if (next > maxMonth) next = maxMonth
  }
  return next
}

function buildCalendarDays(viewMonth: Date) {
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstWeekday = new Date(year, month, 1, 12).getDay()
  const gridStart = new Date(year, month, 1 - firstWeekday, 12)
  const cells: { date: Date; inMonth: boolean }[] = []
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + i,
      12,
    )
    cells.push({ date, inMonth: date.getMonth() === month })
  }
  return cells
}

function isDisabledDate(date: Date, min?: Date | null, max?: Date | null) {
  if (min && date < startOfDay(min)) return true
  if (max && date > startOfDay(max)) return true
  return false
}

function isInRangeInclusive(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false
  const a = start <= end ? start : end
  const b = start <= end ? end : start
  return date >= a && date <= b
}

function DayCell({
  date,
  inMonth,
  disabledDay,
  isToday,
  isSelected,
  inRange,
  rangeStartEdge,
  rangeEndEdge,
  pulse,
  onSelect,
}: {
  date: Date
  inMonth: boolean
  disabledDay: boolean
  isToday: boolean
  isSelected: boolean
  inRange: boolean
  rangeStartEdge: boolean
  rangeEndEdge: boolean
  pulse: boolean
  onSelect: () => void
}) {
  const todayMark = isToday && !isSelected
  const rangeBar = inRange && !(rangeStartEdge && rangeEndEdge)

  return (
    <div className="relative flex items-center justify-center">
      {rangeBar ? (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 bg-brand-primary-range',
            rangeStartEdge && 'right-0 left-1/2',
            rangeEndEdge && 'left-0 right-1/2',
            !rangeStartEdge && !rangeEndEdge && 'inset-x-0',
          )}
        />
      ) : null}
      <IconButton
        label={date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
        size="sm"
        variant={isSelected ? 'primary' : 'ghost'}
        disabled={disabledDay}
        role="gridcell"
        aria-selected={isSelected || undefined}
        className={cn(
          'relative z-[1] text-sm font-normal tabular-nums',
          isSelected && 'font-medium',
          !inMonth && !isSelected && 'text-text-tertiary opacity-40',
          todayMark && 'font-medium text-brand-primary',
          pulse && 'animate-date-picker-select',
        )}
        onClick={onSelect}
      >
        {date.getDate()}
      </IconButton>
    </div>
  )
}

function NavLabel({
  children,
  onClick,
}: {
  children: string
  onClick?: () => void
}) {
  if (!onClick) {
    return (
      <Label as="span" className="px-2 py-1 text-base font-semibold tracking-[-0.01em]">
        {children}
      </Label>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      fullWidth={false}
      className="h-8 px-2 font-semibold tracking-[-0.01em] text-text-primary hover:bg-bg-hover hover:text-text-primary"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export function DatePicker(props: DatePickerProps) {
  const {
    label = 'Date',
    placeholder = 'Select a date',
    disabled = false,
    min = '1900-01-01',
    max,
    className = '',
    triggerWidth,
    variant = 'outline',
    compact = false,
    invalid = false,
    valid = false,
    preview,
  } = props

  const resolvedSize: DatePickerSize = props.size ?? (compact ? 'sm' : 'md')
  const isRange = props.mode === 'range'
  const selectedSingle = !isRange ? parseISODate(props.value) : null
  const rangeStart = isRange ? parseISODate(props.rangeValue.start) : null
  const minDate = parseISODate(min)
  const maxDate = parseISODate(max ?? toISODate(startOfDay(new Date())))

  const [view, setView] = useState<'calendar' | 'months' | 'years'>('calendar')
  const [viewMonth, setViewMonth] = useState(() =>
    clampMonth(selectedSingle || rangeStart || startOfDay(new Date()), minDate, maxDate),
  )
  const [fadeKey, setFadeKey] = useState(0)
  const [pulseDay, setPulseDay] = useState<string | null>(null)
  const [draftRange, setDraftRange] = useState<DateRange>(
    isRange ? props.rangeValue : { start: null, end: null },
  )

  const {
    open,
    setOpen,
    menuStyle,
    openUp,
    rootRef,
    triggerRef,
    menuRef,
    listId,
    close,
  } = useAnchoredMenu([view, fadeKey], {
    minWidth: 320,
    maxWidth: 360,
    estimatedHeight: 380,
    maxMenuHeight: 420,
  })

  const today = startOfDay(new Date())
  const displayText = isRange
    ? formatRangeDisplay(props.rangeValue)
    : formatDisplayDate(props.value)
  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])
  const CalendarIcon = isRange ? DkCalendarDateScheduleRange : DkCalendarDateSchedule
  const mark = GLYPH[resolvedSize]
  const name = label

  function openCalendar() {
    const anchor = selectedSingle || rangeStart || parseISODate(draftRange.start) || today
    setViewMonth(clampMonth(anchor, minDate, maxDate))
    setView('calendar')
    if (isRange) setDraftRange(props.rangeValue)
    setOpen(true)
  }

  function toggle() {
    if (disabled) return
    if (open) close()
    else openCalendar()
  }

  function crossfadeMonth(next: Date) {
    setViewMonth(clampMonth(next, minDate, maxDate))
    setFadeKey((value) => value + 1)
  }

  function shiftMonth(delta: number) {
    if (view === 'years') {
      crossfadeMonth(new Date(viewMonth.getFullYear() + delta * 12, viewMonth.getMonth(), 1, 12))
      return
    }
    if (view === 'months') {
      crossfadeMonth(new Date(viewMonth.getFullYear() + delta, viewMonth.getMonth(), 1, 12))
      return
    }
    crossfadeMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + delta, 1, 12))
  }

  function selectDay(date: Date) {
    if (isDisabledDate(date, minDate, maxDate)) return
    const iso = toISODate(date)
    setPulseDay(iso)
    window.setTimeout(() => setPulseDay((current) => (current === iso ? null : current)), 200)
    const inViewMonth =
      date.getMonth() === viewMonth.getMonth() && date.getFullYear() === viewMonth.getFullYear()
    if (!inViewMonth) {
      crossfadeMonth(new Date(date.getFullYear(), date.getMonth(), 1, 12))
    }
    if (!isRange) {
      props.onChange(iso)
      close()
      return
    }
    const start = parseISODate(draftRange.start)
    const end = parseISODate(draftRange.end)
    if (!start || (start && end)) {
      setDraftRange({ start: iso, end: null })
      return
    }
    if (date < start) {
      setDraftRange({ start: iso, end: toISODate(start) })
      return
    }
    setDraftRange({ start: toISODate(start), end: iso })
  }

  function selectToday() {
    if (isDisabledDate(today, minDate, maxDate)) return
    const iso = toISODate(today)
    crossfadeMonth(new Date(today.getFullYear(), today.getMonth(), 1, 12))
    setView('calendar')
    if (isRange) {
      setDraftRange({ start: iso, end: iso })
      return
    }
    props.onChange(iso)
    close()
  }

  function clearSelection() {
    if (isRange) {
      setDraftRange({ start: null, end: null })
      props.onRangeChange({ start: null, end: null })
      return
    }
    props.onChange(null)
  }

  function commitRange() {
    if (!isRange) return
    props.onRangeChange(draftRange)
    close()
  }

  const activeStart = isRange ? parseISODate(draftRange.start) : selectedSingle
  const activeEnd = isRange ? parseISODate(draftRange.end) : null
  const decadeStart = Math.floor(viewMonth.getFullYear() / 12) * 12
  const years = useMemo(
    () => Array.from({ length: 12 }, (_, index) => decadeStart + index),
    [decadeStart],
  )
  const minYear = minDate?.getFullYear() ?? 1900
  const maxYear = maxDate?.getFullYear() ?? today.getFullYear()
  const navLabel = view === 'years' ? 'decade' : view === 'months' ? 'year' : 'month'
  const canPrev =
    view === 'years'
      ? decadeStart > minYear
      : view === 'months'
        ? viewMonth.getFullYear() > minYear
        : !minDate ||
          new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1) >
            new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canNext =
    view === 'years'
      ? decadeStart + 11 < maxYear
      : view === 'months'
        ? viewMonth.getFullYear() < maxYear
        : !maxDate ||
          new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1) <
            new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
  const todayDisabled = isDisabledDate(today, minDate, maxDate)
  const hasValue = isRange
    ? Boolean(props.rangeValue.start || draftRange.start)
    : Boolean(props.value)

  const triggerStyle = triggerWidth
    ? ({
        width: typeof triggerWidth === 'number' ? `${triggerWidth}px` : triggerWidth,
        maxWidth: '100%',
      } as const)
    : undefined

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-1 font-sans',
        compact && 'min-w-[7.5rem]',
        className,
      )}
      ref={rootRef}
      style={triggerStyle}
    >
      <SelectTrigger
        ref={triggerRef}
        open={open}
        variant={variant}
        size={resolvedSize}
        leading={<CalendarIcon {...mark} />}
        placeholder={!displayText}
        invalid={invalid}
        valid={valid}
        preview={preview}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={name}
        disabled={disabled}
        onClick={toggle}
      >
        {displayText || placeholder}
      </SelectTrigger>

      {open
        ? createPortal(
            <SelectMenu
              id={listId}
              label={name}
              role="dialog"
              openUp={openUp}
              style={menuStyle}
              menuRef={menuRef}
              className="z-[400]"
            >
              <div className="flex items-center justify-between px-0.5">
                <IconButton
                  label={`Previous ${navLabel}`}
                  size="sm"
                  className="text-text-tertiary"
                  disabled={!canPrev}
                  onClick={() => shiftMonth(-1)}
                >
                  <DkChevronCaretLeft size={16} strokeWidth={2} absoluteStrokeWidth />
                </IconButton>

                {view === 'calendar' ? (
                  <div className="inline-flex min-w-0 items-center">
                    <NavLabel onClick={() => setView('months')}>
                      {MONTHS_LONG[viewMonth.getMonth()]}
                    </NavLabel>
                    <NavLabel onClick={() => setView('years')}>
                      {String(viewMonth.getFullYear())}
                    </NavLabel>
                  </div>
                ) : view === 'months' ? (
                  <NavLabel onClick={() => setView('years')}>
                    {String(viewMonth.getFullYear())}
                  </NavLabel>
                ) : (
                  <NavLabel>
                    {`${decadeStart}–${decadeStart + 11}`}
                  </NavLabel>
                )}

                <IconButton
                  label={`Next ${navLabel}`}
                  size="sm"
                  className="text-text-tertiary"
                  disabled={!canNext}
                  onClick={() => shiftMonth(1)}
                >
                  <DkChevronCaretRight size={16} strokeWidth={2} absoluteStrokeWidth />
                </IconButton>
              </div>

              <div className={cn('animate-date-picker-crossfade', EASE)} key={`${view}-${fadeKey}`}>
                {view === 'calendar' ? (
                  <>
                    <div className="grid h-8 grid-cols-7 items-center" aria-hidden="true">
                      {WEEKDAYS.map((day, index) => (
                        <Caption
                          key={`${day}-${index}`}
                          as="span"
                          align="center"
                          className="font-medium"
                        >
                          {day}
                        </Caption>
                      ))}
                    </div>
                    <div
                      className="grid w-full grid-cols-7"
                      role="grid"
                      aria-label={`${MONTHS_LONG[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`}
                    >
                      {Array.from({ length: 6 }, (_, week) => (
                        <div key={week} className="contents" role="row">
                          {days.slice(week * 7, week * 7 + 7).map(({ date, inMonth }) => {
                            const iso = toISODate(date)
                            return (
                              <DayCell
                                key={iso}
                                date={date}
                                inMonth={inMonth}
                                disabledDay={isDisabledDate(date, minDate, maxDate)}
                                isToday={sameDay(date, today)}
                                isSelected={Boolean(
                                  (!isRange && selectedSingle && sameDay(date, selectedSingle)) ||
                                    (isRange &&
                                      ((activeStart && sameDay(date, activeStart)) ||
                                        (activeEnd && sameDay(date, activeEnd)))),
                                )}
                                inRange={
                                  isRange &&
                                  Boolean(activeStart && activeEnd) &&
                                  isInRangeInclusive(date, activeStart, activeEnd)
                                }
                                rangeStartEdge={Boolean(
                                  isRange && activeStart && activeEnd && sameDay(date, activeStart),
                                )}
                                rangeEndEdge={Boolean(
                                  isRange && activeStart && activeEnd && sameDay(date, activeEnd),
                                )}
                                pulse={pulseDay === iso}
                                onSelect={() => selectDay(date)}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="grid min-h-[224px] grid-cols-3 content-center gap-1"
                    role="listbox"
                    aria-label={view === 'months' ? 'Choose month' : 'Choose year'}
                  >
                    {(view === 'months' ? MONTHS_SHORT : years).map((item, index) => {
                      const selected =
                        view === 'months'
                          ? index === viewMonth.getMonth()
                          : item === viewMonth.getFullYear()
                      const monthStart =
                        view === 'months' ? new Date(viewMonth.getFullYear(), index, 1, 12) : null
                      const monthEnd =
                        view === 'months' ? new Date(viewMonth.getFullYear(), index + 1, 0, 12) : null
                      const itemDisabled =
                        view === 'months'
                          ? Boolean(
                              (minDate && monthEnd && monthEnd < startOfDay(minDate)) ||
                                (maxDate && monthStart && monthStart > startOfDay(maxDate)),
                            )
                          : Number(item) < minYear || Number(item) > maxYear

                      return (
                        <Button
                          key={String(item)}
                          variant={selected ? 'primary' : 'ghost'}
                          size="sm"
                          role="option"
                          aria-selected={selected}
                          className={cn(
                            'h-11 rounded-[12px]',
                            !selected && 'text-text-primary hover:bg-bg-hover hover:text-text-primary',
                          )}
                          disabled={itemDisabled}
                          onClick={() => {
                            if (view === 'months') {
                              crossfadeMonth(new Date(viewMonth.getFullYear(), index, 1, 12))
                              setView('calendar')
                            } else {
                              crossfadeMonth(new Date(Number(item), viewMonth.getMonth(), 1, 12))
                              setView('months')
                            }
                          }}
                        >
                          {item}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-border-default pt-2.5">
                <Anchor size="sm" disabled={todayDisabled} onClick={selectToday}>
                  Today
                </Anchor>
                <div className="ml-auto inline-flex items-center gap-1">
                  <Anchor
                    variant="plain"
                    size="sm"
                    disabled={!hasValue}
                    onClick={clearSelection}
                  >
                    Clear
                  </Anchor>
                  {isRange ? (
                    <Button
                      size="sm"
                      fullWidth={false}
                      onClick={commitRange}
                      disabled={!draftRange.start}
                    >
                      Done
                    </Button>
                  ) : null}
                </div>
              </div>
            </SelectMenu>,
            document.body,
          )
        : null}
    </div>
  )
}
