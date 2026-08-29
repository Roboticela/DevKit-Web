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
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full cursor-pointer overflow-hidden rounded-2xl border bg-bg-secondary p-0 text-left',
        'transition-colors duration-150',
        EASE,
        selected ? 'border-brand-primary' : 'border-border-default hover:border-border-strong',
      )}
    >
      <BrowserChromeMini />
      <div className="pointer-events-none relative h-[240px] overflow-hidden">{children}</div>
      <p className="m-0 border-t border-border-default px-3 py-2 text-center text-xs text-text-tertiary">
        {label}
      </p>
    </button>
  )
}
