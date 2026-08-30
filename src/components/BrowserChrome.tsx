import { cn } from '@/lib/cn'
import { Anchor } from './Anchor'

export function BrowserChrome({
  url,
  href,
  className,
}: {
  url: string
  href?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-9 items-center gap-3 border-b border-border-default bg-bg-tertiary px-3',
        className,
      )}
    >
      <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
        <span className="size-2 rounded-full bg-text-disabled" />
        <span className="size-2 rounded-full bg-text-disabled" />
        <span className="size-2 rounded-full bg-text-disabled" />
      </span>
      <span className="mx-auto flex h-6 w-[min(240px,46%)] items-center justify-center truncate rounded-[980px] bg-bg-primary px-3 text-xs text-text-tertiary">
        {url}
      </span>
      {href ? (
        <Anchor
          href={href}
          target="_blank"
          size="sm"
          className="shrink-0 max-[734px]:sr-only"
        >
          Open Full Preview
        </Anchor>
      ) : (
        <span className="w-8 shrink-0" />
      )}
    </div>
  )
}

export function BrowserChromeMini({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-7 items-center gap-1.5 border-b border-border-default bg-bg-tertiary px-2.5',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-text-disabled" aria-hidden />
      <span className="size-1.5 rounded-full bg-text-disabled" aria-hidden />
      <span className="size-1.5 rounded-full bg-text-disabled" aria-hidden />
    </div>
  )
}
