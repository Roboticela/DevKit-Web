import Link from 'next/link'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption, Label } from './Text'

export type RelatedCardProps = {
  href?: string
  title: string
  description: string
  fullWidth?: boolean
  fullHeight?: boolean
  className?: string
}

export function RelatedCard({
  href,
  title,
  description,
  fullWidth = true,
  fullHeight = false,
  className,
}: RelatedCardProps) {
  const chrome = cn(
    'block rounded-xl bg-bg-secondary p-4 no-underline',
    'transition-colors duration-150',
    EASE,
    href && 'hover:bg-bg-hover',
    fullWidth && 'w-full min-w-0',
    fullHeight && 'h-full',
    className,
  )

  const inner = (
    <>
      <Label as="p">{title}</Label>
      <Caption tone="secondary" className="mt-1">
        {description}
      </Caption>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={chrome}>
        {inner}
      </Link>
    )
  }

  return <div className={chrome}>{inner}</div>
}

RelatedCard.displayName = 'RelatedCard'
