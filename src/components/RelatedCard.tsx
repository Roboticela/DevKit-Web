import Link from 'next/link'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Caption, Label } from './Text'

export function RelatedCard({
  href,
  title,
  description,
  className,
}: {
  href: string
  title: string
  description: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-xl bg-bg-secondary p-4 no-underline',
        'transition-colors duration-150',
        EASE,
        'hover:bg-bg-hover',
        className,
      )}
    >
      <Label as="p">{title}</Label>
      <Caption tone="secondary" className="mt-1">
        {description}
      </Caption>
    </Link>
  )
}
