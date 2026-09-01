'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { BrowserChromeMini } from './BrowserChrome'

export function PageStateThumb({
  label,
  selected,
  onClick,
  children,
}: {
  label: string
  selected?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border bg-bg-secondary p-0 text-left',
        'transition-colors duration-150',
        EASE,
        selected ? 'border-brand-primary' : 'border-border-default hover:border-border-strong',
      )}
    >
      <BrowserChromeMini />
      <div className="pointer-events-none relative h-[240px] overflow-hidden" inert>
        {children}
      </div>
      <p className="m-0 border-t border-border-default px-3 py-2 text-center text-xs text-text-tertiary">
        {label}
      </p>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        aria-label={label}
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
      />
    </div>
  )
}
