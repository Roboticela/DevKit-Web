import { cn } from '@/lib/cn'
import { Caption } from './Text'

export function Progress({
  value,
  label,
  className,
}: {
  value: number
  label?: string
  className?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-4">
          <Caption as="span" tone="secondary">
            {label}
          </Caption>
          <Caption as="span" tone="primary">
            {Math.round(clamped)}%
          </Caption>
        </div>
      ) : (
        <span className="sr-only">{Math.round(clamped)} percent</span>
      )}
      <div
        className="h-1.5 overflow-hidden rounded-[980px] bg-bg-tertiary dark:bg-bg-active"
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-[980px] bg-brand-primary transition-[width] duration-300 ease-[cubic-bezier(0.28,0.11,0.32,1)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
