'use client'

import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react'
import { cn } from '@/lib/cn'
import { AUTH_FIELD_SURFACE, EASE, FIELD_INVALID } from '@/lib/styles'

type OtpBoxesProps = {
  length?: number
  value: string[]
  onChange: (next: string[]) => void
  error?: boolean
  shaking?: boolean
  disabled?: boolean
  onComplete?: (code: string) => void
}

export function OtpBoxes({
  length = 6,
  value,
  onChange,
  error = false,
  shaking = false,
  disabled = false,
  onComplete,
}: OtpBoxesProps) {
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

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
        'flex w-full justify-center gap-2',
        shaking && 'animate-otp-shake',
      )}
      role="group"
      aria-label="Verification code"
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node
          }}
          className={cn(
            'h-14 w-12 shrink-0 basis-12 rounded-[12px] border text-center font-mono text-2xl font-medium leading-none caret-brand-primary',
            'max-[420px]:h-[52px] max-[420px]:w-11 max-[420px]:basis-11 max-[420px]:text-[22px]',
            AUTH_FIELD_SURFACE,
            'transition-[border-color,box-shadow,transform] duration-150',
            EASE,
            error
              ? FIELD_INVALID
              : 'outline-none focus:border-brand-primary focus:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
            pulseIndex === index && 'animate-otp-pulse',
          )}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          name={`otp-${index}`}
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={error || undefined}
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
