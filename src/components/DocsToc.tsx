'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import type { DocsTocItem } from '@/lib/docs-catalog'
import { Caption } from './Text'

export function DocsToc({
  items,
  className,
}: {
  items: DocsTocItem[]
  className?: string
}) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))

    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target.id
        if (id) setActive(id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className={cn('px-2 pt-6', className)}>
      <Caption className="mb-3 font-medium">On This Page</Caption>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item) => {
          const selected = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'relative block border-l-2 py-0.5 pl-3 text-xs font-normal no-underline',
                  'transition-colors duration-200',
                  EASE,
                  selected
                    ? 'border-brand-primary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary',
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
