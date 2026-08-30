import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export type FieldLabelSize = 'sm' | 'md' | 'lg'
export type FieldLabelTone = 'default' | 'danger' | 'success' | 'warning' | 'disabled'
export type FieldHintTone = 'default' | 'ok' | 'error' | 'warning' | 'success' | 'danger'
export type FormFieldLayout = 'stacked' | 'inline'

export const FIELD_LABEL_SIZES: FieldLabelSize[] = ['sm', 'md', 'lg']
export const FIELD_LABEL_TONES: FieldLabelTone[] = ['default', 'danger', 'success', 'warning', 'disabled']
export const FIELD_HINT_TONES: FieldHintTone[] = ['default', 'ok', 'error', 'warning']
export const FORM_FIELD_LAYOUTS: FormFieldLayout[] = ['stacked', 'inline']

const labelSize: Record<FieldLabelSize, string> = {
  sm: 'mb-1.5 text-[15px]',
  md: 'mb-2 text-[17px]',
  lg: 'mb-2.5 text-[19px]',
}

const labelTone: Record<FieldLabelTone, string> = {
  default: 'text-text-secondary',
  danger: 'text-danger',
  success: 'text-success',
  warning: 'text-warning',
  disabled: 'text-text-disabled',
}

const hintTone: Record<'default' | 'ok' | 'error' | 'warning', 'tertiary' | 'success' | 'danger' | 'warning'> = {
  default: 'tertiary',
  ok: 'success',
  error: 'danger',
  warning: 'warning',
}

function resolveLabelTone({
  tone,
  invalid,
  valid,
  disabled,
}: {
  tone?: FieldLabelTone
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
}): FieldLabelTone {
  if (disabled || tone === 'disabled') return 'disabled'
  if (invalid || tone === 'danger') return 'danger'
  if (valid || tone === 'success') return 'success'
  if (tone === 'warning') return 'warning'
  return 'default'
}

function resolveHintTone(tone: FieldHintTone = 'default'): 'default' | 'ok' | 'error' | 'warning' {
  if (tone === 'success') return 'ok'
  if (tone === 'danger') return 'error'
  return tone
}

export function FieldLabel({
  optional = false,
  required = false,
  size = 'md',
  tone,
  invalid = false,
  valid = false,
  disabled = false,
  visuallyHidden = false,
  children,
  className,
  htmlFor,
}: {
  optional?: boolean
  required?: boolean
  size?: FieldLabelSize
  tone?: FieldLabelTone
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  visuallyHidden?: boolean
  children: ReactNode
  className?: string
  htmlFor?: string
}) {
  const color = resolveLabelTone({ tone, invalid, valid, disabled })
  const showRequired = required && !optional
  const Tag = htmlFor ? 'label' : 'span'

  return (
    <Tag
      {...(htmlFor ? { htmlFor } : {})}
      className={cn(
        'inline-flex items-baseline font-sans font-medium leading-none antialiased',
        labelSize[size],
        labelTone[color],
        visuallyHidden && 'sr-only',
        className,
      )}
    >
      {children}
      {showRequired ? (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      ) : null}
      {optional ? (
        <Caption as="span" className="ml-1 font-normal" tone={color === 'disabled' ? 'disabled' : 'tertiary'}>
          Optional
        </Caption>
      ) : null}
    </Tag>
  )
}

export function FieldHint({
  tone = 'default',
  size = 'md',
  children,
  className,
}: {
  tone?: FieldHintTone
  size?: FieldLabelSize
  children: ReactNode
  className?: string
}) {
  const resolved = resolveHintTone(tone)

  return (
    <Caption
      className={cn(
        size === 'sm' && 'mt-1',
        size === 'md' && 'mt-1.5',
        size === 'lg' && 'mt-2',
        resolved === 'ok' && 'text-success',
        resolved === 'error' && 'text-danger',
        resolved === 'warning' && 'text-warning',
        className,
      )}
      tone={hintTone[resolved]}
    >
      {children}
    </Caption>
  )
}

export function FormField({
  label,
  optional,
  required,
  hint,
  hintTone,
  htmlFor,
  size,
  tone,
  invalid,
  valid,
  disabled,
  layout = 'stacked',
  children,
  className,
}: {
  label?: ReactNode
  optional?: boolean
  required?: boolean
  hint?: ReactNode
  hintTone?: FieldHintTone
  htmlFor?: string
  size?: FieldLabelSize
  tone?: FieldLabelTone
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  layout?: FormFieldLayout
  children: ReactNode
  className?: string
}) {
  const labelNode = label ? (
    <FieldLabel
      htmlFor={htmlFor}
      optional={optional}
      required={required}
      size={size}
      tone={tone}
      invalid={invalid}
      valid={valid}
      disabled={disabled}
      className={layout === 'inline' ? 'mb-0 min-[735px]:pt-3' : undefined}
    >
      {label}
    </FieldLabel>
  ) : null

  const hintNode = hint ? (
    <FieldHint tone={hintTone} size={size}>
      {hint}
    </FieldHint>
  ) : null

  if (layout === 'inline') {
    return (
      <div
        className={cn(
          'flex flex-col gap-1 min-[735px]:flex-row min-[735px]:items-start min-[735px]:gap-4',
          className,
        )}
      >
        {labelNode ? (
          <div className="shrink-0 min-[735px]:w-[140px] min-[735px]:max-w-[40%]">{labelNode}</div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          {children}
          {hintNode}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {labelNode}
      {children}
      {hintNode}
    </div>
  )
}

export function FieldRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 min-[735px]:grid-cols-2', className)}>{children}</div>
  )
}
