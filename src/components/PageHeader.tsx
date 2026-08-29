import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Eyebrow, Heading } from './Text'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 min-[735px]:flex-row min-[735px]:items-end min-[735px]:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={3} as="h2" className={eyebrow ? 'mt-2' : undefined}>
          {title}
        </Heading>
        {description ? (
          <Body size="sm" className="mt-2 max-w-[692px]">
            {description}
          </Body>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
