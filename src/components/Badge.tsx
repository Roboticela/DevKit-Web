import { cn } from '@/lib/cn'

type BadgeTone = 'primary' | 'verified' | 'unverified' | 'neutral' | 'muted'

const tones: Record<BadgeTone, string> = {
  primary: 'bg-brand-primary-subtle text-brand-primary',
  verified: 'bg-success-subtle text-success',
  unverified: 'bg-warning-subtle text-warning',
  neutral: 'bg-brand-primary-subtle text-brand-primary',
  muted: 'bg-bg-tertiary text-text-secondary',
}

export function Badge({
  children,
  tone = 'primary',
  className,
}: {
  children: React.ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-[980px] px-2 py-1 text-[11px] font-medium leading-none',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
