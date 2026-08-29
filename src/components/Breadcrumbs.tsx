import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export type BreadcrumbItem = {
  label: string
  onClick?: () => void
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1', className)}>
      {items.map((item, index) => {
        const last = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
            {index > 0 ? (
              <ChevronRight
                size={14}
                strokeWidth={1.75}
                absoluteStrokeWidth
                className="text-text-tertiary"
                aria-hidden
              />
            ) : null}
            {last || !item.onClick ? (
              <Caption
                as="span"
                tone={last ? 'primary' : 'tertiary'}
                className={last ? 'font-medium' : undefined}
                aria-current={last ? 'page' : undefined}
              >
                {item.label}
              </Caption>
            ) : (
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 hover:text-brand-primary"
                onClick={item.onClick}
              >
                <Caption as="span">{item.label}</Caption>
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}
