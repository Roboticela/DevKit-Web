'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export function Pagination({
  page,
  pageCount,
  onChange,
  className,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
  className?: string
}) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      <button
        type="button"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-text-primary disabled:cursor-default disabled:opacity-35"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={16} strokeWidth={2} absoluteStrokeWidth />
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          aria-current={item === page ? 'page' : undefined}
          className={cn(
            'inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 font-sans text-sm font-medium',
            'transition-colors duration-150',
            EASE,
            item === page
              ? 'bg-brand-primary text-white'
              : 'bg-transparent text-text-secondary hover:bg-bg-hover',
          )}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-text-primary disabled:cursor-default disabled:opacity-35"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={16} strokeWidth={2} absoluteStrokeWidth />
      </button>
    </nav>
  )
}
