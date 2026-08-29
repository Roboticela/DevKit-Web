import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Body, Label } from './Text'

export function Callout({
  title = 'Accessibility',
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'rounded-xl border border-brand-primary/30 bg-brand-primary-subtle p-4',
        className,
      )}
    >
      <Label as="p" className="mb-2 inline-flex items-center gap-2">
        <Info size={16} strokeWidth={1.75} absoluteStrokeWidth className="text-brand-primary" />
        {title}
      </Label>
      <Body size="sm" as="div">
        {children}
      </Body>
    </aside>
  )
}
