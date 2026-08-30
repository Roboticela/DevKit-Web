'use client'

import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react'
import { cn } from '@/lib/cn'
import { EASE, FIELD_INVALID, FIELD_VALID, FOCUS_RING, OPEN_RING } from '@/lib/styles'

export type OtpBoxesVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'
export type OtpBoxesSize = 'sm' | 'md' | 'lg'
export type OtpBoxesPreview = 'hover' | 'focus'

export const OTP_BOXES_VARIANTS: OtpBoxesVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const OTP_BOXES_SIZES: OtpBoxesSize[] = ['sm', 'md', 'lg']

const sizes: Record<OtpBoxesSize, { box: string; type: string; radius: string; gap: string }> = {
  sm: {
    box: 'h-11 w-10 basis-10 max-[420px]:h-11 max-[420px]:w-9 max-[420px]:basis-9',
    type: 'text-xl max-[420px]:text-lg',
    radius: 'rounded-[8px]',
    gap: 'gap-1.5',
  },
  md: {
    box: 'h-14 w-12 basis-12 max-[420px]:h-[52px] max-[420px]:w-11 max-[420px]:basis-11',
    type: 'text-2xl max-[420px]:text-[22px]',
    radius: 'rounded-[12px]',
    gap: 'gap-2',
  },
  lg: {
    box: 'h-16 w-[52px] basis-[52px] max-[420px]:h-14 max-[420px]:w-12 max-[420px]:basis-12',
    type: 'text-[28px] max-[420px]:text-2xl',
    radius: 'rounded-[12px]',
    gap: 'gap-2.5',
  },
}

const chrome: Record<
  OtpBoxesVariant,
  { rest: string; hover: string; focus: string; radius?: string }
> = {
  outline: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: FOCUS_RING,
  },
  subtle: {
    rest: 'border border-transparent bg-bg-tertiary',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
  },
  ghost: {
    rest: 'border border-transparent bg-transparent',
    hover: 'hover:bg-bg-hover',
    focus: cn('focus:bg-bg-elevated dark:focus:bg-bg-secondary', FOCUS_RING),
  },
  underline: {
    rest: 'rounded-none border-0 border-b border-border-default bg-transparent',
    hover: 'hover:border-border-strong',
    focus: 'outline-none focus:border-brand-primary',
    radius: 'rounded-none',
  },
  pill: {
    rest: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    hover: 'hover:border-border-strong',
    focus: FOCUS_RING,
    radius: 'rounded-[980px]',
  },
}

const forcedHover: Record<OtpBoxesVariant, string> = {
  outline: 'border-border-strong',
  subtle: 'bg-bg-hover',
  ghost: 'bg-bg-hover',
  underline: 'border-border-strong',
  pill: 'border-border-strong',
}

const forcedFocus: Record<OtpBoxesVariant, string> = {
  outline: OPEN_RING,
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  underline: 'border-brand-primary',
  pill: OPEN_RING,
}

export function OtpBoxes({
  length = 6,
  value,
  onChange,
  error = false,
  invalid = false,
  valid = false,
  shaking = false,
  disabled = false,
  masked = false,
  split,
  variant = 'outline',
  size = 'md',
  preview,
  className,
  onComplete,
}: {
  length?: number
  value: string[]
  onChange: (next: string[]) => void
  error?: boolean
  invalid?: boolean
  valid?: boolean
  shaking?: boolean
  disabled?: boolean
  masked?: boolean
  split?: number
  variant?: OtpBoxesVariant
  size?: OtpBoxesSize
  preview?: OtpBoxesPreview
  className?: string
  onComplete?: (code: string) => void
}) {
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const isError = (error || invalid) && !disabled
  const isOk = valid && !isError && !disabled
  const look = chrome[variant]
  const metric = sizes[size]
  const emptyAt = value.findIndex((digit) => !digit)
  const previewFocusAt = preview === 'focus' ? (emptyAt === -1 ? 0 : emptyAt) : -1

  function focusIndex(index: number) {
    const next = Math.max(0, Math.min(length - 1, index))
    inputsRef.current[next]?.focus()
    inputsRef.current[next]?.select()
  }

  function updateDigit(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[index] = digit
    onChange(next)
    if (digit) {
      setPulseIndex(index)
      window.setTimeout(
        () => setPulseIndex((current) => (current === index ? null : current)),
        150,
      )
      if (index < length - 1) {
        focusIndex(index + 1)
      } else if (next.every(Boolean)) {
        onComplete?.(next.join(''))
      }
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (value[index]) {
        const next = [...value]
        next[index] = ''
        onChange(next)
        return
      }
      if (index > 0) {
        const next = [...value]
        next[index - 1] = ''
        onChange(next)
        focusIndex(index - 1)
      }
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusIndex(index - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusIndex(index + 1)
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    pasted.split('').forEach((digit, index) => {
      next[index] = digit
    })
    onChange(next)
    focusIndex(Math.min(pasted.length, length - 1))
    if (pasted.length === length) onComplete?.(pasted)
  }

  return (
    <div
      className={cn(
        'flex w-full justify-center',
        metric.gap,
        shaking && 'animate-otp-shake',
        disabled && 'opacity-55',
        className,
      )}
      role="group"
      aria-label="Verification code"
      aria-invalid={isError || undefined}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node
          }}
          className={cn(
            'shrink-0 text-center font-mono font-medium leading-none text-text-primary caret-brand-primary',
            'transition-[border-color,background-color,box-shadow,transform] duration-150',
            EASE,
            metric.box,
            metric.type,
            look.radius ?? metric.radius,
            look.rest,
            !isError && !isOk && !preview && look.hover,
            !isError && !isOk && preview !== 'focus' ? look.focus : null,
            preview === 'hover' && !isError && !isOk && forcedHover[variant],
            preview === 'focus' &&
              previewFocusAt === index &&
              !isError &&
              !isOk &&
              forcedFocus[variant],
            isError && FIELD_INVALID,
            isOk && FIELD_VALID,
            pulseIndex === index && 'animate-otp-pulse',
            split != null && index === split - 1 && 'mr-2 min-[480px]:mr-3',
            disabled && 'cursor-not-allowed',
            masked && '[-webkit-text-security:disc]',
          )}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          name={`otp-${index}`}
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={isError || undefined}
          value={value[index] ?? ''}
          disabled={disabled}
          onChange={(event) => updateDigit(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}
