'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  DkNavigationMenuBars,
  DkShoppingBagPurchase,
  DkCloseDismissCancel,
} from '@/icons'
import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'
import { CommandPalette, CommandSearch, type CommandItem } from './CommandPalette'
import { IconButton } from './IconButton'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#reels', label: 'Reels' },
  { href: '#support', label: 'Support' },
] as const

const ICON = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const SEARCH_ITEMS: CommandItem[] = [
  { id: 'store', label: 'Find a Store', group: 'Quick Links', kind: 'link', href: '#products' },
  { id: 'products', label: 'Products', group: 'Quick Links', kind: 'link', href: '#products' },
  { id: 'services', label: 'Services', group: 'Quick Links', kind: 'link', href: '#services' },
  { id: 'reels', label: 'Reels', group: 'Quick Links', kind: 'link', href: '#reels' },
  { id: 'support', label: 'Support', group: 'Quick Links', kind: 'link', href: '#support' },
  {
    id: 'accessories',
    label: 'Accessories',
    group: 'Suggested',
    href: '#products',
    description: 'Cases, cables, and more',
  },
  {
    id: 'airpods',
    label: 'AirPods',
    group: 'Suggested',
    href: '#products',
    description: 'Wireless audio',
  },
]

export function SiteNav({ active = 'Products' }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  function openSearch() {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  return (
    <nav className="sticky top-0 z-[200] font-sans antialiased">
      <div
        className={cn(
          'relative z-[3] h-11 overflow-visible',
          menuOpen
            ? 'bg-bg-elevated dark:bg-bg-primary'
            : 'bg-[color-mix(in_srgb,var(--bg-primary)_72%,transparent)] backdrop-blur-[20px] backdrop-saturate-[180%]',
        )}
      >
        <div className="mx-auto flex h-11 w-full max-w-[1024px] items-center justify-between px-[22px]">
          <ul className="m-0 hidden h-11 w-full list-none items-center justify-between gap-8 p-0 min-[735px]:flex">
            <li className="flex h-11 shrink-0 items-center">
              <Link
                href="/"
                className="inline-flex h-11 items-center text-text-primary no-underline leading-none"
              >
                <BrandLogo variant="text" size={20} />
              </Link>
            </li>
            {LINKS.map((link) => (
              <li key={link.label} className="flex h-11 shrink-0 items-center">
                <a
                  href={link.href}
                  className={cn(
                    'inline-flex h-11 items-center whitespace-nowrap text-xs font-normal leading-none no-underline transition-colors duration-300 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
                    active === link.label
                      ? 'text-text-primary'
                      : 'text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)] hover:text-brand-primary',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex h-11 shrink-0 items-center">
              <CommandSearch icon placeholder="Search" onClick={openSearch} active={searchOpen} />
            </li>
            <li className="flex h-11 shrink-0 items-center">
              <IconButton label="Bag">
                <DkShoppingBagPurchase {...ICON} />
              </IconButton>
            </li>
            <li className="flex h-11 shrink-0 items-center">
              <ThemeToggle compact />
            </li>
          </ul>

          <div className="flex h-11 w-full items-center justify-between min-[735px]:hidden">
            <Link href="/" className="inline-flex items-center text-text-primary no-underline">
              <BrandLogo variant="text" size={20} />
            </Link>
            <div className="flex items-center">
              <CommandSearch icon placeholder="Search" onClick={openSearch} active={searchOpen} />
              <IconButton
                label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((current) => !current)}
              >
                {menuOpen ? <DkCloseDismissCancel {...ICON} /> : <DkNavigationMenuBars {...ICON} />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-b border-border-default bg-bg-elevated px-[22px] py-4 min-[735px]:hidden dark:bg-bg-primary">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex h-11 items-center text-[17px] text-text-primary no-underline"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle compact className="mt-2" />
          </div>
        </div>
      ) : null}

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        variant="nav"
        items={SEARCH_ITEMS}
        placeholder="Search"
        onSelect={(item) => {
          if (item.href?.startsWith('#')) {
            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />
    </nav>
  )
}
