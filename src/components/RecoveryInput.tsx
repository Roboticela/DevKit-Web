'use client'

import {
  Fragment,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { DkClipboardCopyDuplicate, DkDownloadArrowSave, DkTaskCompleteCheckmark } from '@/icons'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import { EASE, FIELD_INVALID, FIELD_VALID, FOCUS_RING, OPEN_RING } from '@/lib/styles'
import { Button } from './Button'
import { FieldHint, FieldLabel } from './FieldLabel'

export type RecoveryInputVariant = 'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'
export type RecoveryInputSize = 'sm' | 'md' | 'lg'
export type RecoveryInputPreview = 'hover' | 'focus'
export type RecoveryInputMode = 'field' | 'groups'

export const RECOVERY_INPUT_VARIANTS: RecoveryInputVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const RECOVERY_INPUT_SIZES: RecoveryInputSize[] = ['sm', 'md', 'lg']
export const RECOVERY_INPUT_MODES: RecoveryInputMode[] = ['field', 'groups']

export function sanitizeRecoveryCode(raw: string, length?: number) {
  const chars = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  return length == null ? chars : chars.slice(0, length)
}

export function formatRecoveryCode(raw: string, groupSize = 4, length?: number) {
  const chars = sanitizeRecoveryCode(raw, length)
  if (!chars) return ''
  const size = Math.max(1, groupSize)
  const groups: string[] = []
  for (let index = 0; index < chars.length; index += size) {
    groups.push(chars.slice(index, index + size))
  }
  return groups.join('-')
}

export function recoveryPlaceholder(length = 8, groupSize = 4) {
  return formatRecoveryCode('X'.repeat(length), groupSize, length)
}

function caretFromCharCount(display: string, count: number) {
  if (count <= 0) return 0
  let seen = 0
  for (let index = 0; index < display.length; index++) {
    if (/[A-Z0-9]/i.test(display[index] ?? '')) {
      seen += 1
      if (seen >= count) return index + 1
    }
  }
  return display.length
}

function groupCount(length: number, groupSize: number) {
  return Math.ceil(length / Math.max(1, groupSize))
}

function groupCapacity(index: number, length: number, groupSize: number) {
  const remaining = length - index * groupSize
  return Math.max(0, Math.min(groupSize, remaining))
}

function splitGroups(raw: string, length: number, groupSize: number) {
  const chars = sanitizeRecoveryCode(raw, length)
  const count = groupCount(length, groupSize)
  return Array.from({ length: count }, (_, index) => {
    const start = index * groupSize
    return chars.slice(start, start + groupCapacity(index, length, groupSize))
  })
}

const sizes: Record<
  RecoveryInputSize,
  { field: string; group: string; type: string; radius: string; gap: string }
> = {
  sm: {
    field: 'h-11 text-[15px] tracking-[0.08em]',
    group: 'h-11 min-w-[4.75rem] px-2',
    type: 'text-[15px] tracking-[0.08em]',
    radius: 'rounded-[10px]',
    gap: 'gap-1.5',
  },
  md: {
    field: 'h-12 text-xl tracking-[0.1em]',
    group: 'h-12 min-w-[5.5rem] px-2.5',
    type: 'text-xl tracking-[0.1em]',
    radius: 'rounded-[12px]',
    gap: 'gap-2',
  },
  lg: {
    field: 'h-14 text-2xl tracking-[0.12em]',
    group: 'h-14 min-w-[6.5rem] px-3',
    type: 'text-2xl tracking-[0.12em]',
    radius: 'rounded-[12px]',
    gap: 'gap-2.5',
  },
}

const chrome: Record<
  RecoveryInputVariant,
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

const forcedHover: Record<RecoveryInputVariant, string> = {
  outline: 'border-border-strong',
  subtle: 'bg-bg-hover',
  ghost: 'bg-bg-hover',
  underline: 'border-border-strong',
  pill: 'border-border-strong',
}

const forcedFocus: Record<RecoveryInputVariant, string> = {
  outline: OPEN_RING,
  subtle: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  ghost: cn('bg-bg-elevated dark:bg-bg-secondary', OPEN_RING),
  underline: 'border-brand-primary',
  pill: OPEN_RING,
}

const listChrome: Record<'outline' | 'subtle' | 'ghost', string> = {
  outline: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
  subtle: 'border border-transparent bg-bg-tertiary',
  ghost: 'border border-transparent bg-transparent',
}

function fieldClass(
  variant: RecoveryInputVariant,
  invalid: boolean,
  valid: boolean,
  preview?: RecoveryInputPreview,
  previewFocus = preview === 'focus',
) {
  const look = chrome[variant]
  return cn(
    look.rest,
    !invalid && !valid && !preview && look.hover,
    !invalid && !valid && preview !== 'focus' ? look.focus : null,
    preview === 'hover' && !invalid && !valid && forcedHover[variant],
    previewFocus && !invalid && !valid && forcedFocus[variant],
    invalid && FIELD_INVALID,
    valid && FIELD_VALID,
  )
}

export function RecoveryInput({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  invalid = false,
  valid = false,
  error = false,
  shaking = false,
  masked = false,
  variant = 'outline',
  size = 'md',
  mode = 'field',
  length = 8,
  groupSize = 4,
  preview,
  label = 'Recovery code',
  placeholder,
  hint,
  name,
  id,
  className,
  onComplete,
}: {
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  valid?: boolean
  error?: boolean
  shaking?: boolean
  masked?: boolean
  variant?: RecoveryInputVariant
  size?: RecoveryInputSize
  mode?: RecoveryInputMode
  length?: number
  groupSize?: number
  preview?: RecoveryInputPreview
  label?: ReactNode
  placeholder?: string
  hint?: ReactNode
  name?: string
  id?: string
  className?: string
  onComplete?: (code: string) => void
}) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const isError = (error || invalid) && !disabled
  const isOk = valid && !isError && !disabled
  const hintTone = isError ? 'error' : isOk ? 'ok' : 'default'
  const display = formatRecoveryCode(value, groupSize, length)
  const empty = placeholder ?? recoveryPlaceholder(length, groupSize)

  return (
    <div className={cn('w-full text-left', className)}>
      {label ? (
        <FieldLabel
          htmlFor={mode === 'field' ? fieldId : undefined}
          size="sm"
          invalid={isError}
          valid={isOk}
          disabled={disabled}
        >
          {label}
        </FieldLabel>
      ) : null}
      {mode === 'groups' ? (
        <RecoveryGroups
          value={value}
          onChange={onChange}
          length={length}
          groupSize={groupSize}
          variant={variant}
          size={size}
          preview={preview}
          disabled={disabled}
          readOnly={readOnly}
          invalid={isError}
          valid={isOk}
          shaking={shaking}
          masked={masked}
          name={name}
          onComplete={onComplete}
        />
      ) : (
        <RecoveryField
          id={fieldId}
          name={name}
          value={display}
          placeholder={empty}
          length={length}
          groupSize={groupSize}
          variant={variant}
          size={size}
          preview={preview}
          disabled={disabled}
          readOnly={readOnly}
          invalid={isError}
          valid={isOk}
          shaking={shaking}
          masked={masked}
          onChange={onChange}
          onComplete={onComplete}
        />
      )}
      {hint ? <FieldHint tone={hintTone}>{hint}</FieldHint> : null}
    </div>
  )
}

function RecoveryField({
  id,
  name,
  value,
  placeholder,
  length,
  groupSize,
  variant,
  size,
  preview,
  disabled,
  readOnly,
  invalid,
  valid,
  shaking,
  masked,
  onChange,
  onComplete,
}: {
  id: string
  name?: string
  value: string
  placeholder: string
  length: number
  groupSize: number
  variant: RecoveryInputVariant
  size: RecoveryInputSize
  preview?: RecoveryInputPreview
  disabled: boolean
  readOnly: boolean
  invalid: boolean
  valid: boolean
  shaking: boolean
  masked: boolean
  onChange: (next: string) => void
  onComplete?: (code: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const caretCharsRef = useRef<number | null>(null)
  const metric = sizes[size]
  const look = chrome[variant]
  const long = length > 12

  useLayoutEffect(() => {
    if (caretCharsRef.current == null) return
    const input = inputRef.current
    if (!input) return
    const caret = caretFromCharCount(value, caretCharsRef.current)
    input.setSelectionRange(caret, caret)
    caretCharsRef.current = null
  }, [value])

  function emit(nextRaw: string, caretChars?: number) {
    const next = formatRecoveryCode(nextRaw, groupSize, length)
    const chars = sanitizeRecoveryCode(next, length)
    if (caretChars != null) caretCharsRef.current = Math.min(caretChars, chars.length)
    onChange(next)
    if (chars.length === length) onComplete?.(next)
  }

  function handleChange(raw: string, caret: number) {
    const charsBefore = sanitizeRecoveryCode(raw.slice(0, caret), length).length
    emit(raw, charsBefore)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Backspace') return
    const input = event.currentTarget
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0
    if (start !== end || start === 0) return
    const before = input.value[start - 1]
    if (!before || /[A-Z0-9]/i.test(before)) return
    event.preventDefault()
    const chars = sanitizeRecoveryCode(input.value, length)
    const charsBefore = sanitizeRecoveryCode(input.value.slice(0, start), length).length
    emit(chars.slice(0, Math.max(0, charsBefore - 1)) + chars.slice(charsBefore), charsBefore - 1)
  }

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      className={cn(
        'w-full text-center font-mono font-semibold leading-none text-text-primary caret-brand-primary',
        'placeholder:font-medium placeholder:tracking-[0.08em] placeholder:text-text-tertiary',
        'transition-[border-color,background-color,box-shadow] duration-150',
        EASE,
        metric.field,
        long && 'text-[15px] tracking-[0.06em] min-[480px]:text-xl min-[480px]:tracking-[0.1em]',
        look.radius ?? metric.radius,
        fieldClass(variant, invalid, valid, preview),
        shaking && 'animate-otp-shake',
        'disabled:cursor-not-allowed disabled:opacity-55',
        'read-only:text-text-secondary',
        masked && '[-webkit-text-security:disc]',
      )}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete="off"
      autoCapitalize="characters"
      autoCorrect="off"
      spellCheck={false}
      inputMode="text"
      aria-invalid={invalid || undefined}
      onChange={(event) => {
        handleChange(event.target.value, event.target.selectionStart ?? event.target.value.length)
      }}
      onKeyDown={handleKeyDown}
    />
  )
}

function RecoveryGroups({
  value,
  onChange,
  length,
  groupSize,
  variant,
  size,
  preview,
  disabled,
  readOnly,
  invalid,
  valid,
  shaking,
  masked,
  name,
  onComplete,
}: {
  value: string
  onChange: (next: string) => void
  length: number
  groupSize: number
  variant: RecoveryInputVariant
  size: RecoveryInputSize
  preview?: RecoveryInputPreview
  disabled: boolean
  readOnly: boolean
  invalid: boolean
  valid: boolean
  shaking: boolean
  masked: boolean
  name?: string
  onComplete?: (code: string) => void
}) {
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const groups = splitGroups(value, length, groupSize)
  const metric = sizes[size]
  const look = chrome[variant]
  const emptyAt = groups.findIndex((group, index) => group.length < groupCapacity(index, length, groupSize))
  const previewFocusAt = preview === 'focus' ? (emptyAt === -1 ? 0 : emptyAt) : -1

  function emit(nextGroups: string[]) {
    const next = formatRecoveryCode(nextGroups.join(''), groupSize, length)
    onChange(next)
    if (sanitizeRecoveryCode(next, length).length === length) onComplete?.(next)
  }

  function focusIndex(index: number) {
    const next = Math.max(0, Math.min(groups.length - 1, index))
    inputsRef.current[next]?.focus()
    inputsRef.current[next]?.select()
  }

  function updateGroup(index: number, raw: string) {
    const capacity = groupCapacity(index, length, groupSize)
    const chars = sanitizeRecoveryCode(raw)
    const next = [...groups]
    next[index] = chars.slice(0, capacity)
    if (chars.length > capacity && index < groups.length - 1) {
      next[index + 1] = sanitizeRecoveryCode(
        chars.slice(capacity) + (next[index + 1] ?? ''),
        groupCapacity(index + 1, length, groupSize),
      )
    }
    emit(next)
    if (chars.length >= capacity) {
      setPulseIndex(index)
      window.setTimeout(
        () => setPulseIndex((current) => (current === index ? null : current)),
        150,
      )
      if (index < groups.length - 1) focusIndex(index + 1)
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      if (groups[index]) return
      event.preventDefault()
      if (index > 0) {
        const next = [...groups]
        next[index - 1] = (next[index - 1] ?? '').slice(0, -1)
        emit(next)
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
    const pasted = sanitizeRecoveryCode(event.clipboardData.getData('text'), length)
    if (!pasted) return
    emit(splitGroups(pasted, length, groupSize))
    const filled = Math.min(groupCount(pasted.length, groupSize), groups.length) - 1
    focusIndex(Math.max(0, filled))
  }

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-center',
        metric.gap,
        shaking && 'animate-otp-shake',
        disabled && 'opacity-55',
      )}
      role="group"
      aria-label="Recovery code"
      aria-invalid={invalid || undefined}
    >
      {groups.map((group, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <span
              className="hidden select-none font-mono text-[15px] font-medium text-text-tertiary min-[480px]:inline"
              aria-hidden="true"
            >
              -
            </span>
          ) : null}
          <input
            ref={(node) => {
              inputsRef.current[index] = node
            }}
            className={cn(
              'text-center font-mono font-semibold leading-none text-text-primary caret-brand-primary',
              'placeholder:font-medium placeholder:text-text-tertiary',
              'transition-[border-color,background-color,box-shadow,transform] duration-150',
              EASE,
              metric.group,
              metric.type,
              look.radius ?? metric.radius,
              fieldClass(variant, invalid, valid, preview, preview === 'focus' && previewFocusAt === index),
              pulseIndex === index && 'animate-otp-pulse',
              disabled && 'cursor-not-allowed',
              readOnly && 'text-text-secondary',
              masked && '[-webkit-text-security:disc]',
            )}
            type="text"
            name={index === 0 ? name : undefined}
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
            maxLength={groupCapacity(index, length, groupSize)}
            aria-label={`Group ${index + 1}`}
            aria-invalid={invalid || undefined}
            placeholder={'X'.repeat(groupCapacity(index, length, groupSize))}
            value={group}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(event) => updateGroup(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        </Fragment>
      ))}
    </div>
  )
}

export function RecoveryCodesList({
  codes,
  variant = 'subtle',
  columns = 2,
  copyable = false,
  downloadable = false,
  downloadFilename = brand.recoveryCodesFilename,
  onCopy,
  onDownload,
  className,
}: {
  codes: string[]
  variant?: 'outline' | 'subtle' | 'ghost'
  columns?: 2 | 3 | 4
  copyable?: boolean
  downloadable?: boolean
  downloadFilename?: string
  onCopy?: () => void
  onDownload?: () => void
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const formatted = codes.map((code) => formatRecoveryCode(code) || code)
  const showActions = copyable || downloadable
  const compact = columns === 3 || columns === 4

  const columnGrid =
    columns === 4
      ? 'grid-cols-2 min-[400px]:grid-cols-4'
      : columns === 3
        ? 'grid-cols-3'
        : 'grid-cols-1 min-[420px]:grid-cols-2'

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formatted.join('\n'))
      setCopied(true)
      onCopy?.()
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function handleDownload() {
    if (downloading) return

    setDownloading(true)
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 350))
      const blob = new Blob([formatted.join('\n')], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = downloadFilename
      link.click()
      URL.revokeObjectURL(url)
      onDownload?.()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <ul className={cn('m-0 grid list-none gap-2 p-0', columnGrid)}>
        {formatted.map((code) => (
          <li key={code}>
            <code
              className={cn(
                'block rounded-[12px] text-center font-mono font-semibold text-text-primary',
                compact
                  ? 'px-2 py-2 text-[11px] tracking-[0.06em] min-[400px]:px-2.5 min-[400px]:text-[12px] min-[400px]:tracking-[0.07em]'
                  : 'px-3 py-2.5 text-[13px] tracking-[0.08em]',
                listChrome[variant],
              )}
            >
              {code}
            </code>
          </li>
        ))}
      </ul>
      {showActions ? (
        <div
          className={cn(
            'grid gap-2',
            copyable && downloadable ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {copyable ? (
            <Button
              variant="action"
              size="sm"
              type="button"
              aria-label={copied ? 'Copied' : 'Copy recovery codes'}
              leading={
                copied ? (
                  <DkTaskCompleteCheckmark size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden />
                ) : (
                  <DkClipboardCopyDuplicate size={16} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
                )
              }
              onClick={() => void handleCopy()}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          ) : null}
          {downloadable ? (
            <Button
              variant="action"
              size="sm"
              type="button"
              aria-label={downloading ? 'Downloading recovery codes' : 'Download recovery codes'}
              loading={downloading}
              loadingText="Downloading…"
              leading={
                <DkDownloadArrowSave size={16} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
              }
              onClick={() => void handleDownload()}
            >
              Download
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
