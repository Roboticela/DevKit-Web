import Link from 'next/link'
import { cn } from '@/lib/cn'

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
        <Link
          key={item.label}
          href={item.href}
          className="rounded-[980px] bg-bg-tertiary px-2 py-1 text-[11px] font-medium text-text-secondary no-underline hover:text-text-primary"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
