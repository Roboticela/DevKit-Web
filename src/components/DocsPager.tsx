import Link from 'next/link'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Label } from './Text'

export function DocsPager({
  prev,
  next,
  className,
}: {
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
  className?: string
}) {
  return (
    <nav
      aria-label="Adjacent components"
      className={cn('flex items-center justify-between gap-4 border-t border-border-default pt-6', className)}
    >
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            'text-sm font-medium text-text-secondary no-underline',
            'transition-colors duration-150',
            EASE,
            'hover:text-brand-primary',
          )}
        >
          <Label as="span" tone="secondary" className="transition-colors duration-150 hover:text-brand-primary">
            ← {prev.label}
          </Label>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            'text-sm font-medium text-text-secondary no-underline',
            'transition-colors duration-150',
            EASE,
            'hover:text-brand-primary',
          )}
        >
          <Label as="span" tone="secondary" className="transition-colors duration-150 hover:text-brand-primary">
            {next.label} →
          </Label>
        </Link>
      ) : null}
    </nav>
  )
}
