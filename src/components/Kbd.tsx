import { cn } from '@/lib/cn'

export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center rounded-[4px] bg-bg-secondary px-1.5 py-0.5 font-sans text-[10px] font-medium leading-none text-text-tertiary',
        className,
      )}
    >
      {children}
    </kbd>
  )
}
