import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption, Label } from './Text'

export function FieldLabel({
  optional,
  children,
  className,
  htmlFor,
}: {
  optional?: boolean
  children: ReactNode
  className?: string
  htmlFor?: string
}) {
  const content = (
    <>
      {children}
      {optional ? (
        <Caption as="span" className="ml-1 opacity-70">
          Optional
        </Caption>
      ) : null}
    </>
  )

  if (htmlFor) {
    return (
      <Label as="label" htmlFor={htmlFor} tone="secondary" className={cn('mb-2 inline-flex items-baseline', className)}>
        {content}
      </Label>
    )
  }

  return (
    <Label as="span" tone="secondary" className={cn('mb-2 inline-flex items-baseline', className)}>
      {content}
    </Label>
  )
}

export function FieldHint({
  tone = 'default',
  children,
  className,
}: {
  tone?: 'default' | 'ok' | 'error'
  children: ReactNode
  className?: string
}) {
  return (
    <Caption
      className={cn(
        'mt-1.5',
        tone === 'ok' && 'text-success',
        tone === 'error' && 'text-danger',
        className,
      )}
      tone={tone === 'ok' ? 'success' : tone === 'error' ? 'danger' : 'tertiary'}
    >
      {children}
    </Caption>
  )
}

export function FormField({
  label,
  optional,
  hint,
  hintTone,
  children,
  className,
}: {
  label?: ReactNode
  optional?: boolean
  hint?: ReactNode
  hintTone?: 'default' | 'ok' | 'error'
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label ? <FieldLabel optional={optional}>{label}</FieldLabel> : null}
      {children}
      {hint ? <FieldHint tone={hintTone}>{hint}</FieldHint> : null}
    </div>
  )
}

export function FieldRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 min-[735px]:grid-cols-2', className)}>{children}</div>
  )
}
