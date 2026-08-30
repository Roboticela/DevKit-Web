import { cn } from '@/lib/cn'
import { Anchor } from './Anchor'

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
        <Anchor href={prev.href} size="md">
          ← {prev.label}
        </Anchor>
      ) : (
        <span />
      )}
      {next ? (
        <Anchor href={next.href} size="md">
          {next.label} →
        </Anchor>
      ) : null}
    </nav>
  )
}
