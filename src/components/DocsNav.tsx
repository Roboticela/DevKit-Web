'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  DkNavigationMenuBars,
  DkCloseDismissCancel,
  DkGithubOctocatBrandLogo,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { BrandLogo } from './BrandLogo'
import { CommandPalette } from './CommandPalette'
import { IconButton } from './IconButton'
import { DocsSearchTrigger } from './DocsSearchTrigger'
import { ThemeIconToggle } from './ThemeIconToggle'

const TABS = [
  { href: '/components/button', label: 'Docs' },
  { href: '/components/button', label: 'Components' },
  { href: '/sections/hero-section', label: 'Sections' },
  { href: '/pages/sign-in', label: 'Pages' },
  { href: '/components/button', label: 'Guides' },
] as const

export function DocsNav({
  active = 'Components',
  onMenu,
  menuOpen = false,
}: {
  active?: (typeof TABS)[number]['label']
  onMenu?: () => void
  menuOpen?: boolean
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-[200] h-[52px] border-b border-border-default bg-bg-secondary">
        <div className="relative flex h-full items-center gap-3 px-4 min-[735px]:px-6">
          <IconButton
            label={menuOpen ? 'Close navigation' : 'Open navigation'}
            size="sm"
            className="text-text-secondary min-[1024px]:hidden"
            onClick={onMenu}
          >
            {menuOpen ? (
              <DkCloseDismissCancel size={18} strokeWidth={1.75} absoluteStrokeWidth />
            ) : (
              <DkNavigationMenuBars size={18} strokeWidth={1.75} absoluteStrokeWidth />
            )}
          </IconButton>

          <Link href="/components/button" className="inline-flex items-center text-text-primary no-underline">
            <BrandLogo variant="lockup" size={20} />
          </Link>

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center min-[735px]:flex">
            <div className="pointer-events-auto">
              <DocsSearchTrigger onClick={() => setSearchOpen(true)} placeholder="Search documentation…" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1 min-[1068px]:gap-4">
            <nav className="hidden items-center gap-5 min-[1068px]:flex" aria-label="Docs">
              {TABS.map((tab) => {
                const selected = tab.label === active
                return (
                  <Link
                    key={tab.label}
                    href={tab.href}
                    className={cn(
                      'relative inline-flex h-[52px] items-center text-[13px] font-medium no-underline',
                      'transition-colors duration-200',
                      EASE,
                      selected ? 'text-text-primary' : 'text-text-tertiary hover:text-text-primary',
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        'absolute right-0 bottom-0 left-0 h-0.5 bg-brand-primary',
                        selected ? 'opacity-100' : 'opacity-0',
                      )}
                      aria-hidden
                    />
                  </Link>
                )
              })}
            </nav>
            <DocsSearchTrigger compact className="min-[735px]:hidden" onClick={() => setSearchOpen(true)} placeholder="Search documentation…" />
            <ThemeIconToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-[10px] text-text-secondary no-underline hover:bg-bg-hover hover:text-text-primary"
            >
              <DkGithubOctocatBrandLogo size={16} />
            </a>
          </div>
        </div>
      </header>
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
