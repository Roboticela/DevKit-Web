import { cn } from '@/lib/cn'
import { Caption, Heading } from './Text'

export function StatCard({
  label,
  value,
  delta,
  hint,
  className,
}: {
  label: string
  value: string
  delta?: { value: string; tone?: 'up' | 'down' | 'neutral' }
  hint?: string
  className?: string
}) {
  const tone = delta?.tone ?? 'neutral'

  return (
    <article
      className={cn(
        'rounded-[18px] border border-border-default bg-bg-elevated p-6 dark:bg-bg-secondary',
        'min-[735px]:p-8',
        className,
      )}
    >
      <Caption>{label}</Caption>
      <Heading level={3} as="p" className="mt-3">
        {value}
      </Heading>
      {delta || hint ? (
        <Caption as="p" tone="secondary" className="mt-2">
          {delta ? (
            <span
              className={cn(
                'font-medium',
                tone === 'up' && 'text-success',
                tone === 'down' && 'text-danger',
                tone === 'neutral' && 'text-text-secondary',
              )}
            >
              {delta.value}
            </span>
          ) : null}
          {delta && hint ? ' ' : null}
          {hint}
        </Caption>
      ) : null}
    </article>
  )
}
