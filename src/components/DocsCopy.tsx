import type { ReactNode } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { Badge } from './Badge'
import { Caption, Heading, Subhead } from './Text'

const META_GLYPH = { strokeWidth: 2.5, absoluteStrokeWidth: true } as const

export function DocsMetaBadges({
  status = 'Stable',
  platforms = ['Web', 'iOS', 'Android'],
  showStatus = true,
  className,
}: {
  status?: string
  platforms?: string[]
  showStatus?: boolean
  className?: string
}) {
  return (
    <div className={cn('mt-3 flex flex-wrap items-center gap-2', className)}>
      {showStatus ? (
        <Badge tone="verified" icon={<DkSuccessCircleCheckmark {...META_GLYPH} />}>
          {status}
        </Badge>
      ) : null}
      {platforms.map((platform) => (
        <Badge key={platform} tone="neutral">
          {platform}
        </Badge>
      ))}
    </div>
  )
}

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
