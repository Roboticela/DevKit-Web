import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Heading } from './Text'

export function EmptyState({
  icon,
  title,
  body,
  action,
  className,
}: {
  icon?: ReactNode
  title: string
  body?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center px-4 py-12 text-center', className)}>
      {icon ? <div className="mb-4 text-text-tertiary">{icon}</div> : null}
      <Heading level={3} align="center">
        {title}
      </Heading>
      {body ? (
        <Body size="sm" align="center" className="mt-2 max-w-[360px]">
          {body}
        </Body>
      ) : null}
      {action ? <div className="mt-6 w-full max-w-[240px]">{action}</div> : null}
    </div>
  )
}
