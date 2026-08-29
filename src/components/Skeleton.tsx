import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block animate-pulse rounded-[8px] bg-bg-tertiary dark:bg-bg-active',
        className,
      )}
      aria-hidden
    />
  )
}
