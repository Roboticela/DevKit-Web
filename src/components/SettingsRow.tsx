import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption, Label } from './Text'

export function SettingsList({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

export function SettingsRow({
  label,
  description,
  danger = false,
  control,
  onClick,
  className,
}: {
  label: string
  description?: string
  danger?: boolean
  control: ReactNode
  onClick?: () => void
  className?: string
}) {
  const classes = cn(
    'flex min-h-16 w-full items-center justify-between gap-4 border-0 border-b border-border-default bg-transparent py-3 text-left font-sans text-inherit',
    onClick && 'cursor-pointer hover:[&_.dk-settings-row-label]:underline',
    className,
  )

  const body = (
    <>
      <span className="flex min-w-0 flex-col gap-0.5">
        <Label as="span" className={cn('dk-settings-row-label leading-[1.3]', danger && 'text-danger')}>
          {label}
        </Label>
        {description ? (
          <Caption as="span">{description}</Caption>
        ) : null}
      </span>
      <span className="inline-flex shrink-0 items-center text-text-tertiary">{control}</span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {body}
      </button>
    )
  }

  return <div className={classes}>{body}</div>
}
