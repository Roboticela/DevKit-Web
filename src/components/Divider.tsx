import { cn } from '@/lib/cn'
import { Caption } from './Text'

export function Divider({
  children = 'or',
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'my-6 flex items-center gap-4',
        className,
      )}
      role="separator"
      aria-label={typeof children === 'string' ? children : 'or'}
    >
      <span className="h-px flex-1 bg-border-default dark:bg-border-strong" />
      <Caption as="span" tone="secondary">
        {children}
      </Caption>
      <span className="h-px flex-1 bg-border-default dark:bg-border-strong" />
    </div>
  )
}
