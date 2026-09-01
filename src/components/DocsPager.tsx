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
        <Anchor href={prev.href} variant="arrow" arrow="start" size="md" className="min-w-0 max-w-[min(100%,16rem)]">
          {prev.label}
        </Anchor>
      ) : (
        <span />
      )}
      {next ? (
        <Anchor href={next.href} variant="arrow" arrow="end" size="md" className="min-w-0 max-w-[min(100%,16rem)]">
          {next.label}
        </Anchor>
      ) : null}
    </nav>
  )
}
