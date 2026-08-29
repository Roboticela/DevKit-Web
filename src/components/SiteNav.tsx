'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#reels', label: 'Reels' },
  { href: '#support', label: 'Support' },
] as const

const ICON = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

export function SiteNav({ active = 'Products' }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border-0 bg-transparent text-text-primary"
                aria-label="Search"
              >
                <Search {...ICON} />
              </button>
            </li>
            <li className="flex h-11 shrink-0 items-center">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border-0 bg-transparent text-text-primary"
                aria-label="Bag"
              >
                <ShoppingBag {...ICON} />
              </button>
            </li>
            <li className="flex h-11 shrink-0 items-center">
              <ThemeToggle compact />
            </li>
          </ul>

          <div className="flex h-11 w-full items-center justify-between min-[735px]:hidden">
            <Link href="/" className="inline-flex items-center text-text-primary no-underline">
              <BrandLogo variant="text" size={20} />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border-0 bg-transparent text-text-primary"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X {...ICON} /> : <Menu {...ICON} />}
            </button>
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
    </nav>
  )
}
