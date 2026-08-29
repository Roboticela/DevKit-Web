'use client'

/* eslint-disable react-hooks/set-state-in-effect */

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE, FIELD_SURFACE, FOCUS_VISIBLE_RING, OPEN_RING } from '@/lib/styles'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

export type DateValue = string | null
export type DateRange = { start: DateValue; end: DateValue }

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

function DayButton({
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
  const rangeBar = inRange

  return (
    <button
      type="button"
      role="gridcell"
      className={cn(
        'relative inline-flex h-9 min-w-0 w-full cursor-pointer items-center justify-center border-0 p-0 font-sans text-sm font-normal text-text-primary',
        'transition-colors duration-150',
        EASE,
        !rangeBar && 'rounded-full',
        !inMonth && !rangeBar && 'text-text-tertiary opacity-40',
        disabledDay && 'cursor-default text-text-tertiary',
        disabledDay && !rangeBar && 'opacity-25',
        rangeBar && 'bg-[var(--brand-primary-range)] text-text-primary',
        rangeStartEdge && !rangeEndEdge && 'rounded-l-[18px]',
        rangeEndEdge && !rangeStartEdge && 'rounded-r-[18px]',
        rangeStartEdge && rangeEndEdge && 'rounded-[18px]',
        inRange && !rangeStartEdge && !rangeEndEdge && 'rounded-none',
      )}
      disabled={disabledDay}
      aria-selected={isSelected}
      aria-label={date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}
      onClick={onSelect}
    >
      <span
        className={cn(
          'relative z-[1] inline-flex size-9 items-center justify-center rounded-full',
          !disabledDay && !isSelected && !rangeBar && 'hover:bg-bg-hover',
          isToday && !isSelected && 'text-brand-primary shadow-[inset_0_0_0_1px_var(--brand-primary)]',
          isSelected && 'bg-brand-primary font-medium text-white',
          inRange && !isSelected && 'font-medium text-text-primary',
          pulse && 'animate-date-picker-select',
        )}
      >
        {date.getDate()}
      </span>
    </button>
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
    triggerWidth = 240,
  } = props

  const isRange = props.mode === 'range'
  const selectedSingle = !isRange ? parseISODate(props.value) : null
  const rangeStart = isRange ? parseISODate(props.rangeValue.start) : null
  const minDate = parseISODate(min)
  const maxDate = parseISODate(max ?? toISODate(startOfDay(new Date())))

  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'calendar' | 'months' | 'years'>('calendar')
  const [viewMonth, setViewMonth] = useState(() =>
    clampMonth(selectedSingle || rangeStart || startOfDay(new Date()), minDate, maxDate),
  )
  const [fadeKey, setFadeKey] = useState(0)
  const [pulseDay, setPulseDay] = useState<string | null>(null)
  const [draftRange, setDraftRange] = useState<DateRange>(
    isRange ? props.rangeValue : { start: null, end: null },
  )
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({})
  const [isMobile, setIsMobile] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const today = startOfDay(new Date())
  const displayText = isRange
    ? formatRangeDisplay(props.rangeValue)
    : formatDisplayDate(props.value)
  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 734px)')
    const sync = () => setIsMobile(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useLayoutEffect(() => {
    if (!open || isMobile) {
      setPopoverStyle({})
      return
    }
    function place() {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const width = 320
      const gap = 8
      const left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12)
      let top = rect.bottom + gap
      const estimatedHeight = 420
      if (top + estimatedHeight > window.innerHeight - 12) {
        top = Math.max(12, rect.top - estimatedHeight - gap)
      }
      setPopoverStyle({ position: 'fixed', top, left, right: 'auto', bottom: 'auto', width })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, isMobile, view])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    if (isMobile) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open, isMobile])

  useEffect(() => {
    if (!open) return
    const anchor = selectedSingle || rangeStart || parseISODate(draftRange.start) || today
    setViewMonth(clampMonth(anchor, minDate, maxDate))
    setView('calendar')
    if (isRange) setDraftRange(props.rangeValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

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
      setOpen(false)
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
    setOpen(false)
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
    setOpen(false)
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

  const triggerStyle = {
    '--date-picker-trigger-width':
      typeof triggerWidth === 'number' ? `${triggerWidth}px` : triggerWidth,
  } as CSSProperties

  return (
    <div
      className={cn(
        'relative w-full max-[734px]:w-full font-sans',
        'w-[min(100%,var(--date-picker-trigger-width))]',
        className,
      )}
      ref={rootRef}
      style={triggerStyle}
    >
      <button
        type="button"
        className={cn(
          'flex h-11 w-full cursor-pointer items-center gap-3 rounded-[12px] border px-4 text-left font-sans text-[15px] font-normal',
          FIELD_SURFACE,
          'transition-[border-color,box-shadow] duration-150',
          EASE,
          FOCUS_VISIBLE_RING,
          open && OPEN_RING,
          'disabled:cursor-not-allowed disabled:opacity-55',
        )}
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="inline-flex shrink-0 text-text-tertiary" aria-hidden="true">
          <Calendar size={18} strokeWidth={1.75} absoluteStrokeWidth />
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap',
            !displayText && 'text-text-tertiary',
          )}
        >
          {displayText || placeholder}
        </span>
        <span
          className={cn(
            'ml-auto inline-flex shrink-0 text-text-tertiary transition-transform duration-200',
            EASE,
            open && 'rotate-180',
          )}
          aria-hidden="true"
        >
          <ChevronDown size={14} strokeWidth={2} absoluteStrokeWidth />
        </span>
      </button>

      {open
        ? createPortal(
            <div className={cn('font-sans', isMobile && 'max-[734px]:block')}>
              <button
                type="button"
                className={cn(
                  'fixed inset-0 z-[45] hidden border-0 bg-black/40',
                  isMobile && 'block animate-date-picker-scrim',
                )}
                aria-label="Close date picker"
                onClick={() => setOpen(false)}
              />
              <div
                className={cn(
                  'z-50 w-80 origin-top-left rounded-2xl border border-border-default bg-bg-elevated p-5 text-text-primary dark:bg-bg-secondary',
                  'animate-date-picker-in',
                  isMobile &&
                    'fixed right-0 bottom-0 left-0 w-full max-w-none origin-bottom rounded-t-[20px] rounded-b-none px-5 pt-3 pb-7 animate-date-picker-sheet',
                )}
                id={listId}
                role="dialog"
                aria-label={label}
                ref={popoverRef}
                style={isMobile ? undefined : popoverStyle}
              >
                <div
                  className={cn(
                    'mx-auto mt-1 mb-4 hidden h-1 w-9 rounded-[980px] bg-border-default',
                    isMobile && 'block',
                  )}
                  aria-hidden="true"
                />

                <div className="mb-4 flex h-8 items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-text-tertiary transition-colors duration-150 hover:bg-bg-hover disabled:cursor-default disabled:opacity-35"
                    aria-label={`Previous ${navLabel}`}
                    disabled={!canPrev}
                    onClick={() => shiftMonth(-1)}
                  >
                    <ChevronLeft size={16} strokeWidth={2} absoluteStrokeWidth />
                  </button>

                  {view === 'calendar' ? (
                    <div className="inline-flex min-w-0 items-center gap-1.5">
                      <button
                        type="button"
                        className="cursor-pointer rounded-lg border-0 bg-transparent px-2 py-1 font-sans text-base font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-150 hover:bg-bg-hover"
                        onClick={() => setView('months')}
                      >
                        {MONTHS_LONG[viewMonth.getMonth()]}
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer rounded-lg border-0 bg-transparent px-2 py-1 font-sans text-base font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-150 hover:bg-bg-hover"
                        onClick={() => setView('years')}
                      >
                        {viewMonth.getFullYear()}
                      </button>
                    </div>
                  ) : view === 'months' ? (
                    <button
                      type="button"
                      className="cursor-pointer rounded-lg border-0 bg-transparent px-2 py-1 font-sans text-base font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-150 hover:bg-bg-hover"
                      onClick={() => setView('years')}
                    >
                      {viewMonth.getFullYear()}
                    </button>
                  ) : (
                    <span className="cursor-default rounded-lg px-2 py-1 font-sans text-base font-semibold tracking-[-0.01em] text-text-primary">
                      {decadeStart}–{decadeStart + 11}
                    </span>
                  )}

                  <button
                    type="button"
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-text-tertiary transition-colors duration-150 hover:bg-bg-hover disabled:cursor-default disabled:opacity-35"
                    aria-label={`Next ${navLabel}`}
                    disabled={!canNext}
                    onClick={() => shiftMonth(1)}
                  >
                    <ChevronRight size={16} strokeWidth={2} absoluteStrokeWidth />
                  </button>
                </div>

                <div className="animate-date-picker-crossfade" key={`${view}-${fadeKey}`}>
                  {view === 'calendar' ? (
                    <>
                      <div
                        className="mb-1 grid h-8 grid-cols-7 items-center"
                        aria-hidden="true"
                      >
                        {WEEKDAYS.map((day, index) => (
                          <span
                            key={`${day}-${index}`}
                            className="text-center text-xs font-medium text-text-tertiary"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                      <div
                        className="grid w-full grid-cols-7"
                        role="grid"
                        aria-label={`${MONTHS_LONG[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`}
                      >
                        {days.map(({ date, inMonth }) => {
                          const iso = toISODate(date)
                          return (
                            <DayButton
                              key={iso}
                              date={date}
                              inMonth={inMonth}
                              disabledDay={isDisabledDate(date, minDate, maxDate)}
                              isToday={sameDay(date, today)}
                              isSelected={
                                (!isRange && selectedSingle && sameDay(date, selectedSingle)) ||
                                (isRange &&
                                  Boolean(
                                    (activeStart && sameDay(date, activeStart)) ||
                                      (activeEnd && sameDay(date, activeEnd)),
                                  ))
                              }
                              inRange={
                                isRange &&
                                Boolean(activeStart && activeEnd) &&
                                isInRangeInclusive(date, activeStart, activeEnd)
                              }
                              rangeStartEdge={Boolean(
                                isRange &&
                                  activeStart &&
                                  activeEnd &&
                                  sameDay(date, activeStart),
                              )}
                              rangeEndEdge={Boolean(
                                isRange &&
                                  activeStart &&
                                  activeEnd &&
                                  sameDay(date, activeEnd),
                              )}
                              pulse={pulseDay === iso}
                              onSelect={() => selectDay(date)}
                            />
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div
                      className="grid min-h-[248px] grid-cols-3 content-center gap-2"
                      role="listbox"
                      aria-label={view === 'months' ? 'Choose month' : 'Choose year'}
                    >
                      {(view === 'months' ? MONTHS_SHORT : years).map((item, index) => {
                        const selected =
                          view === 'months'
                            ? index === viewMonth.getMonth()
                            : item === viewMonth.getFullYear()
                        const monthStart =
                          view === 'months'
                            ? new Date(viewMonth.getFullYear(), index, 1, 12)
                            : null
                        const monthEnd =
                          view === 'months'
                            ? new Date(viewMonth.getFullYear(), index + 1, 0, 12)
                            : null
                        const itemDisabled =
                          view === 'months'
                            ? Boolean(
                                (minDate && monthEnd && monthEnd < startOfDay(minDate)) ||
                                  (maxDate && monthStart && monthStart > startOfDay(maxDate)),
                              )
                            : Number(item) < minYear || Number(item) > maxYear

                        return (
                          <button
                            key={String(item)}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={cn(
                              'h-11 cursor-pointer rounded-[12px] border-0 bg-transparent font-sans text-[15px] font-normal text-text-primary',
                              'transition-colors duration-150',
                              EASE,
                              'hover:bg-bg-hover disabled:cursor-default disabled:opacity-25',
                              selected && 'bg-brand-primary font-medium text-white hover:bg-brand-primary',
                            )}
                            disabled={itemDisabled}
                            onClick={() => {
                              if (view === 'months') {
                                crossfadeMonth(
                                  new Date(viewMonth.getFullYear(), index, 1, 12),
                                )
                                setView('calendar')
                              } else {
                                crossfadeMonth(
                                  new Date(Number(item), viewMonth.getMonth(), 1, 12),
                                )
                                setView('months')
                              }
                            }}
                          >
                            {item}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-default pt-4">
                  <button
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0 font-sans text-sm font-normal text-brand-primary no-underline hover:underline"
                    onClick={selectToday}
                  >
                    Today
                  </button>
                  <div className="ml-auto inline-flex items-center gap-3">
                    <button
                      type="button"
                      className="cursor-pointer border-0 bg-transparent p-0 font-sans text-sm font-normal text-text-tertiary no-underline hover:underline"
                      onClick={clearSelection}
                    >
                      Clear
                    </button>
                    {isRange ? (
                      <button
                        type="button"
                        className="h-9 cursor-pointer rounded-[980px] border-0 bg-brand-primary px-4 font-sans text-sm font-medium text-white disabled:cursor-default disabled:opacity-45"
                        onClick={commitRange}
                        disabled={!draftRange.start}
                      >
                        Done
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
