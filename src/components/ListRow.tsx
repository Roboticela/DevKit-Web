import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Caption } from './Text'

export function ListGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-border-default bg-bg-elevated dark:bg-bg-secondary',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TextAction({
  children,
  danger = false,
  className,
  ...rest
}: {
  children: ReactNode
  danger?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer border-0 bg-transparent p-0 font-sans text-sm font-normal leading-none no-underline',
        danger ? 'text-danger' : 'text-brand-primary',
        'hover:underline disabled:cursor-not-allowed disabled:opacity-45 disabled:no-underline',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ListRow({
  title,
  meta,
  leading,
  trailing,
  className,
}: {
  title: ReactNode
  meta?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-b border-border-default px-4 py-3.5 last:border-b-0',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <div className="flex min-w-0 flex-col gap-0.5">
          <Body size="sm" as="span" tone="primary" className="truncate leading-[1.3]">
            {title}
          </Body>
          {meta ? (
            <Caption as="span">{meta}</Caption>
          ) : null}
        </div>
      </div>
      {trailing ? (
        <div className="inline-flex shrink-0 items-center gap-3">{trailing}</div>
      ) : null}
    </div>
  )
}
