'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { BUTTON_TOC, DOCS_NAV, type DocsNavSection, type DocsTocItem } from '@/lib/docs-catalog'
import { DocsFooter } from './DocsFooter'
import { DocsNav } from './DocsNav'
import { DocsSidebar } from './DocsSidebar'
import { DocsToc } from './DocsToc'

export function DocsShell({
  activeId,
  toc = BUTTON_TOC,
  activeTab = 'Components',
  sections = DOCS_NAV,
  contentWidth = 760,
  sidebarFooter,
  children,
}: {
  activeId: string
  toc?: DocsTocItem[]
  activeTab?: 'Docs' | 'Components' | 'Pages' | 'Sections' | 'Guides'
  sections?: DocsNavSection[]
  contentWidth?: 760 | 900
  sidebarFooter?: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <div className="min-h-full bg-bg-primary">
      <DocsNav
        active={activeTab}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((open) => !open)}
      />

      <div className="mx-auto flex w-full max-w-[1440px]">
        <aside className="sticky top-[52px] hidden h-[calc(100vh-52px)] w-[240px] shrink-0 overflow-y-auto border-r border-border-default min-[1024px]:block">
          <DocsSidebar activeId={activeId} sections={sections} footer={sidebarFooter} />
        </aside>

        {menuOpen ? (
          <div className="fixed inset-x-0 top-[52px] bottom-0 z-[180] min-[1024px]:hidden">
            <button
              type="button"
              className="absolute inset-0 border-0 bg-bg-overlay"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            />
            <aside className="relative h-full w-[min(240px,84vw)] overflow-y-auto border-r border-border-default bg-bg-primary">
              <DocsSidebar
                activeId={activeId}
                sections={sections}
                footer={sidebarFooter}
                onNavigate={() => setMenuOpen(false)}
              />
            </aside>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div
            className={
              contentWidth === 900
                ? 'mx-auto max-w-[900px] px-[22px] py-10 min-[735px]:px-10 min-[735px]:py-12'
                : 'mx-auto max-w-[760px] px-[22px] py-10 min-[735px]:px-10 min-[735px]:py-12'
            }
          >
            {children}
          </div>
        </div>

        <aside className="sticky top-[52px] hidden h-[calc(100vh-52px)] w-[200px] shrink-0 overflow-y-auto min-[1280px]:block">
          <DocsToc items={toc} />
        </aside>
      </div>

      <DocsFooter />
    </div>
  )
}
