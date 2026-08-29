'use client'

import {
  DkChevronCaretLeft,
  DkChevronCaretRight
} from '@/icons'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { IconButton } from './IconButton'

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
      <IconButton
        label="Previous page"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <DkChevronCaretLeft size={16} strokeWidth={2} absoluteStrokeWidth />
      </IconButton>
      {pages.map((item) => (
        <Button
          key={item}
          variant={item === page ? 'primary' : 'ghost'}
          size="sm"
          fullWidth={false}
          aria-current={item === page ? 'page' : undefined}
          className="min-w-9 px-0"
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
      <IconButton
        label="Next page"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <DkChevronCaretRight size={16} strokeWidth={2} absoluteStrokeWidth />
      </IconButton>
    </nav>
  )
}
