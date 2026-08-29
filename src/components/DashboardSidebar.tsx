'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Badge } from './Badge'
import { Eyebrow, Label } from './Text'

export type SidebarItem = {
  id: string
  label: string
  icon: ReactNode
  badge?: string | number
  tone?: 'default' | 'danger'
}

export type SidebarSection = {
  label?: string
  items: SidebarItem[]
}

export function SidebarNavItem({
  item,
  active = false,
  onSelect,
}: {
  item: SidebarItem
  active?: boolean
  onSelect?: (id: string) => void
}) {
  const danger = item.tone === 'danger'

  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-3 text-left font-sans',
        'transition-colors duration-150',
        EASE,
        danger
          ? 'text-danger hover:bg-danger-subtle'
          : 'text-text-secondary hover:bg-black/[0.04] dark:text-text-tertiary dark:hover:bg-white/[0.04]',
        active && !danger && 'bg-bg-hover text-brand-primary dark:bg-bg-hover dark:text-brand-primary',
      )}
      aria-current={active ? 'page' : undefined}
      onClick={() => onSelect?.(item.id)}
    >
      <span className="inline-flex shrink-0 text-current">{item.icon}</span>
      <span className="min-w-0 flex-1 truncate">
        <Label as="span" className="block truncate text-inherit">
          {item.label}
        </Label>
      </span>
      {item.badge !== undefined ? (
        <Badge tone={danger ? 'unverified' : 'neutral'} className="px-1.5">
          {item.badge}
        </Badge>
      ) : null}
    </button>
  )
}

export function DashboardSidebar({
  sections,
  activeId,
  onSelect,
  footer,
  className,
}: {
  sections: SidebarSection[]
  activeId?: string
  onSelect?: (id: string) => void
  footer?: ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-[260px] shrink-0 flex-col border-r border-border-default bg-bg-elevated px-3 pt-6 pb-5',
        'dark:bg-bg-secondary',
        className,
      )}
    >
      <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto" aria-label="Dashboard">
        {sections.map((section, index) => (
          <div key={section.label ?? `section-${index}`} className="flex flex-col gap-1">
            {section.label ? (
              <Eyebrow className="px-3 pb-1">{section.label}</Eyebrow>
            ) : null}
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                active={activeId === item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </nav>
      {footer ? <div className="mt-4 shrink-0">{footer}</div> : null}
    </aside>
  )
}
