import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Badge } from './Badge'

export function BuiltWithChips({
  items,
  className,
}: {
  items: { label: string; href: string }[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="text-[11px] font-medium text-text-tertiary">Built With</span>
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="no-underline">
          <Badge tone="neutral">{item.label}</Badge>
        </Link>
      ))}
    </div>
  )
}
