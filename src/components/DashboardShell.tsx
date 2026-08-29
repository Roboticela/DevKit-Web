'use client'

import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DashboardNav } from './DashboardNav'
import { DashboardSidebar, type SidebarSection } from './DashboardSidebar'

export function DashboardShell({
  title,
  sections,
  activeId,
  onNavigate,
  footer,
  search,
  userName,
  userImage,
  onUserClick,
  navActions,
  brandHref,
  sidebarOpen,
  onSidebarOpenChange,
  children,
  className,
}: {
  title?: string
  sections: SidebarSection[]
  activeId?: string
  onNavigate?: (id: string) => void
  footer?: ReactNode
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }
  userName?: string
  userImage?: string | null
  onUserClick?: () => void
  navActions?: ReactNode
  brandHref?: string
  sidebarOpen: boolean
  onSidebarOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (!sidebarOpen) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onSidebarOpenChange(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen, onSidebarOpenChange])

  function go(id: string) {
    onNavigate?.(id)
    onSidebarOpenChange(false)
  }

  const sidebar = (
    <DashboardSidebar
      sections={sections}
      activeId={activeId}
      onSelect={go}
      footer={footer}
      className={cn(
        'max-[734px]:absolute max-[734px]:inset-y-0 max-[734px]:left-0 max-[734px]:z-50',
        'max-[734px]:transition-transform max-[734px]:duration-300',
        'max-[734px]:ease-[cubic-bezier(0.28,0.11,0.32,1)]',
        sidebarOpen ? 'max-[734px]:translate-x-0' : 'max-[734px]:-translate-x-full',
      )}
    />
  )

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col overflow-hidden bg-bg-secondary font-sans text-text-primary dark:bg-bg-primary',
        className,
      )}
    >
      <DashboardNav
        title={title}
        search={search}
        menuOpen={sidebarOpen}
        onMenuClick={() => onSidebarOpenChange(!sidebarOpen)}
        userName={userName}
        userImage={userImage}
        onUserClick={onUserClick}
        actions={navActions}
        brandHref={brandHref}
      />
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {sidebarOpen ? (
          <button
            type="button"
            className="absolute inset-0 z-40 border-0 bg-bg-overlay min-[735px]:hidden"
            aria-label="Close menu"
            onClick={() => onSidebarOpenChange(false)}
          />
        ) : null}
        {sidebar}
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
