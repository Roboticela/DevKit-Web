'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card, type CardSize } from './Card'
import { DkCloudStorageWeather, DkAnalogClockTime, DkImagePhotoPicture } from '@/icons'
import { WidgetResizeHandle } from './DragAndDrop'

export type WidgetType = 'weather' | 'calendar' | 'clock' | 'notes' | 'photos'

export type WidgetSize = 'small' | 'medium' | 'large'

const SIZE_MAP: Record<WidgetSize, { width: number; height: number }> = {
  small: { width: 160, height: 160 },
  medium: { width: 340, height: 160 },
  large: { width: 340, height: 340 },
}

/** Widgets (70) — self-contained cards following the Card molecule, resizable to three fixed variants. */
export function Widgets() {
  const [widgets, setWidgets] = useState<Record<WidgetType, WidgetSize>>({
    weather: 'medium',
    calendar: 'small',
    clock: 'large',
    notes: 'medium',
    photos: 'small',
  })

  const change = useCallback(
    (widgetType: WidgetType, size: WidgetSize) => {
      setWidgets((prev) => ({ ...prev, [widgetType]: size }))
    },
    [],
  )

  const rendered = (
    <>
      <Widget widgetType="weather" size={widgets.weather} onSizeChange={(s) => change('weather', s)} />
      <Widget widgetType="calendar" size={widgets.calendar} onSizeChange={(s) => change('calendar', s)} />
      <Widget widgetType="clock" size={widgets.clock} onSizeChange={(s) => change('clock', s)} />
      <Widget widgetType="notes" size={widgets.notes} onSizeChange={(s) => change('notes', s)} />
      <Widget widgetType="photos" size={widgets.photos} onSizeChange={(s) => change('photos', s)} />
    </>
  )

  return <div className="widgets-grid grid grid-cols-2 gap-4">{rendered}</div>
}

function Widget({
  widgetType,
  size,
  onSizeChange,
}: {
  widgetType: WidgetType
  size: WidgetSize
  onSizeChange: (size: WidgetSize) => void
}) {
  return (
    <Card variant="fill" size={size as CardSize} tone="default" className="widget widget--[size] relative overflow-hidden">
      <WidgetBody widgetType={widgetType} />
      <WidgetResizeHandle
        onDragStart={(event) => {
          event.preventDefault()
          // Resize triggered at the parent via pointer capture to avoid
          // triggering a click on the card's own content
        }}
      />
    </Card>
  )
}

function WidgetBody({ widgetType }: { widgetType: WidgetType }) {
  switch (widgetType) {
    case 'weather':
      return <WidgetWeather />
    case 'calendar':
      return <WidgetCalendar />
    case 'clock':
      return <WidgetClock />
    case 'notes':
      return <WidgetNotes />
    case 'photos':
      return <WidgetPhotos />
  }
}

function WidgetWeather() {
  return (
    <div className="flex items-end justify-between gap-3 p-3">
      <div>
        <p className="text-[13px] font-medium text-text-secondary">Weather</p>
        <p className="mt-1 text-[22px] font-[var(--text-window-title-weight)] text-text-primary">72°</p>
      </div>
      <DkCloudStorageWeather size={28} strokeWidth={1.6} />
    </div>
  )
}

function WidgetCalendar() {
  const [today, setToday] = useState(new Date().getDate())
  return (
    <div className="flex flex-1 flex-col justify-center p-3">
      <span className="text-[32px] font-[var(--text-window-title-weight)] text-text-primary">{today}</span>
      <span className="mt-1 text-[13px] text-text-secondary">Today</span>
    </div>
  )
}

function WidgetClock() {
  const [now, setNow] = useState(new Date())
  useState(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  })
  return (
    <div className="flex flex-1 flex-col justify-center p-3">
      <span className="text-[32px] font-[var(--text-window-title-weight)] tracking-tight text-text-primary">
        {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <DkAnalogClockTime size={14} strokeWidth={1.6} className="ml-2" />
      <span className="mt-1 text-[13px] text-text-secondary">
        {now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
      </span>
    </div>
  )
}

function WidgetNotes() {
  const [note] = useState('Free your mind from device debt.')
  return (
    <div className="flex flex-1 flex-col justify-center p-3">
      <p className="text-[13px] text-text-secondary line-clamp-3">{note}</p>
      <button type="button" className="mt-2 text-[12px] font-medium text-brand-primary hover:underline">Edit</button>
    </div>
  )
}

function WidgetPhotos() {
  const [tick, setTick] = useState(0)
  useState(() => {
    const timer = window.setInterval(() => setTick((v) => (v + 1) % 12), 30000)
    return () => window.clearInterval(timer)
  })
  return (
    <div className="flex flex-1 flex-col justify-center p-3">
      <div className="flex gap-2">
        <div className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-bg-tertiary">
          <DkImagePhotoPicture size={20} strokeWidth={1.6} />
        </div>
        <span className="text-[13px] text-text-secondary">Album <span>03</span></span>
      </div>
      <button type="button" className="mt-2 text-[12px] font-medium text-brand-primary hover:underline">Play</button>
    </div>
  )
}
