import { cn } from '@/lib/cn'

export function ButtonSpinner({
  light = false,
  onWhite = false,
  className,
  size = 16,
}: {
  light?: boolean
  onWhite?: boolean
  className?: string
  size?: number
}) {
  return (
    <span
      className={cn(
        'inline-block box-border shrink-0 rounded-[980px] border-2 animate-btn-spin motion-reduce:animate-none',
        onWhite
          ? 'border-black/15 border-t-brand-primary motion-reduce:opacity-85'
          : light
            ? 'border-white/35 border-t-white motion-reduce:border-t-white motion-reduce:opacity-85'
            : 'border-text-tertiary/35 border-t-text-primary dark:border-white/28 dark:border-t-white motion-reduce:border-t-brand-primary',
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}

export function ButtonLabel({
  loading,
  loadingText,
  light,
  children,
}: {
  loading?: boolean
  loadingText?: string
  light?: boolean
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      {loading ? <ButtonSpinner light={light} /> : null}
      <span className="inline-flex items-center justify-center gap-2">
        {loading && loadingText ? loadingText : children}
      </span>
    </span>
  )
}
