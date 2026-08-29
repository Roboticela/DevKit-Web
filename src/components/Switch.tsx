'use client'

import { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ButtonSpinner } from './ButtonLabel'
import { Caption, Label } from './Text'

export type SwitchVariant = 'primary' | 'subtle' | 'outline' | 'ghost' | 'danger'
export type SwitchSize = 'sm' | 'md' | 'lg'

export const SWITCH_VARIANTS: SwitchVariant[] = ['primary', 'subtle', 'outline', 'ghost', 'danger']
export const SWITCH_SIZES: SwitchSize[] = ['sm', 'md', 'lg']

const tracks: Record<SwitchVariant, { off: string; on: string }> = {
  primary: {
    off: 'bg-border-default dark:bg-bg-active',
    on: 'bg-brand-primary',
  },
  subtle: {
    off: 'bg-bg-tertiary',
    on: 'bg-brand-primary',
  },
  outline: {
    off: 'bg-transparent outline outline-1 outline-border-default',
    on: 'bg-brand-primary outline outline-1 outline-brand-primary',
  },
  ghost: {
    off: 'bg-transparent',
    on: 'bg-brand-primary',
  },
  danger: {
    off: 'bg-border-default dark:bg-bg-active',
    on: 'bg-danger',
  },
}

const sizes: Record<SwitchSize, { track: string; thumb: string; travel: number }> = {
  sm: {
    track: 'h-[26px] w-11',
    thumb: 'size-[22px]',
    travel: 18,
  },
  md: {
    track: 'h-[31px] w-[51px]',
    thumb: 'size-[27px]',
    travel: 20,
  },
  lg: {
    track: 'h-9 w-[60px]',
    thumb: 'size-8',
    travel: 24,
  },
}

const MOTION =
  'duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:duration-0 motion-reduce:transition-none'

export function Switch({
  checked,
  onChange,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
  className,
  label,
}: {
  checked: boolean
  onChange?: (next: boolean) => void
  disabled?: boolean
  loading?: boolean
  size?: SwitchSize
  variant?: SwitchVariant
  className?: string
  label?: string
}) {
  const skipClick = useRef(false)
  const [pressed, setPressed] = useState(false)
  const compact = size === 'sm'
  const metric = sizes[size]
  const track = tracks[variant]
  const interactive = !disabled && !loading

  function toggle() {
    if (!interactive) return
    onChange?.(!checked)
  }

  function release() {
    setPressed(false)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled || loading}
      onPointerDown={(event) => {
        if (!interactive || event.button !== 0) return
        skipClick.current = true
        setPressed(true)
        requestAnimationFrame(() => onChange?.(!checked))
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      onLostPointerCapture={release}
      onClick={() => {
        if (skipClick.current) {
          skipClick.current = false
          return
        }
        toggle()
      }}
      className={cn(
        'relative shrink-0 cursor-pointer rounded-[980px] border-0 bg-transparent p-0',
        'touch-manipulation [-webkit-tap-highlight-color:transparent]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        metric.track,
        disabled && !loading && 'cursor-not-allowed opacity-55',
        loading && 'cursor-wait opacity-100',
        className,
      )}
    >
      <span
        className={cn(
          'relative block size-full overflow-hidden rounded-[980px]',
          'transition-[background-color,outline-color]',
          MOTION,
          checked ? track.on : track.off,
        )}
      >
        <span
          className={cn(
            'absolute top-[2px] left-[2px] flex items-center justify-center rounded-full',
            'transition-[transform,background-color,outline-color]',
            MOTION,
            metric.thumb,
            variant === 'ghost' && !checked
              ? 'bg-bg-elevated outline outline-1 outline-border-default'
              : 'bg-white',
          )}
          style={{
            transform: `translate3d(${checked ? metric.travel : 0}px,0,0) scaleX(${pressed ? 1.18 : 1})`,
            transformOrigin: checked ? 'right center' : 'left center',
          }}
        >
          {loading ? <ButtonSpinner onWhite size={compact ? 12 : 14} /> : null}
        </span>
      </span>
    </button>
  )
}

export function SwitchGroup({
  children,
  className,
  label,
}: {
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex w-full flex-col divide-y divide-border-default', className)}
    >
      {children}
    </div>
  )
}

export function SwitchItem({
  title,
  description,
  checked,
  onChange,
  disabled,
  loading,
  size = 'md',
  variant = 'primary',
  className,
}: {
  title: string
  description?: string
  checked: boolean
  onChange?: (next: boolean) => void
  disabled?: boolean
  loading?: boolean
  size?: SwitchSize
  variant?: SwitchVariant
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-h-14 items-center justify-between gap-4 py-3',
        disabled || loading ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
      onClick={() => {
        if (disabled || loading) return
        onChange?.(!checked)
      }}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <Label as="span">{title}</Label>
        {description ? <Caption as="span">{description}</Caption> : null}
      </span>
      <span onClick={(event) => event.stopPropagation()}>
        <Switch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          loading={loading}
          size={size}
          variant={variant}
          label={title}
        />
      </span>
    </div>
  )
}
