import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Caption } from './Text'

export function KeyValueRow({
  label,
  value,
  className,
}: {
  label: ReactNode
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex min-h-[52px] items-center justify-between gap-3 border-b border-border-default py-3.5', className)}>
      <Caption as="span">{label}</Caption>
      <Body size="sm" as="span" tone="primary" align="end">
        {value}
      </Body>
    </div>
  )
}
