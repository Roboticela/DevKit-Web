import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption, Heading, Subhead } from './Text'

export function DocsHeader({
  crumb,
  title,
  description,
  children,
  className,
}: {
  crumb: string
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <header
      id="overview"
      className={cn('scroll-mt-20 animate-docs-header-in motion-reduce:animate-none', className)}
    >
      <Caption>{crumb}</Caption>
      <Heading className="mt-2">{title}</Heading>
      {description ? <Subhead className="mt-2">{description}</Subhead> : null}
      {children}
    </header>
  )
}

export function DocsSectionTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Heading level={3} as="h2" className={cn('mb-4', className)}>
      {children}
    </Heading>
  )
}
