'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { DOCS_NAV, type DocsNavSection } from '@/lib/docs-catalog'

function SidebarSection({
  section,
  activeId,
  onNavigate,
}: {
  section: DocsNavSection
  activeId: string
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="mb-4">
      <button
        type="button"
        className={cn(
          'flex h-8 w-full cursor-pointer items-center justify-between border-0 bg-transparent px-2 text-left',
          'font-sans text-base font-semibold text-text-primary',
        )}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {section.label}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          absoluteStrokeWidth
          className={cn(
            'text-text-tertiary transition-transform duration-200',
            EASE,
            open ? 'rotate-0' : '-rotate-90',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200',
          EASE,
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          {section.items.map((item) => {
            const active = item.id === activeId
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'relative flex h-8 items-center gap-2 rounded-[8px] pr-2 pl-3 text-[13px] font-normal no-underline',
                  'transition-colors duration-200',
                  EASE,
                  active
                    ? 'bg-bg-tertiary text-text-primary'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary',
                )}
              >
                {active ? (
                  <span
                    className="absolute top-1 bottom-1 left-0 w-0.5 rounded-[980px] bg-brand-primary"
                    aria-hidden
                  />
                ) : null}
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.isNew ? (
                  <span className="rounded-[980px] bg-success-subtle px-1.5 py-0.5 text-[10px] font-medium leading-none text-success">
                    New
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function DocsSidebar({
  activeId,
  className,
  onNavigate,
  sections = DOCS_NAV,
  footer,
}: {
  activeId: string
  className?: string
  onNavigate?: () => void
  sections?: DocsNavSection[]
  footer?: ReactNode
}) {
  return (
    <nav aria-label="Documentation" className={cn('flex h-full flex-col px-3 pt-6 pb-8', className)}>
      <div className="min-h-0 flex-1">
        {sections.map((section) => (
          <SidebarSection
            key={section.id}
            section={section}
            activeId={activeId}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      {footer}
    </nav>
  )
}
