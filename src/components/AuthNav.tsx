'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { brand } from '@/lib/devkit'
import { Anchor } from './Anchor'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'

export function AuthNav({
  navLinkTo,
  navLinkLabel,
  brandHref = '/',
  contained = false,
  className,
}: {
  navLinkTo?: string
  navLinkLabel?: string
  brandHref?: string
  contained?: boolean
  className?: string
}) {
  return (
    <header
      className={cn(
        'z-[2] flex h-11 items-center justify-between bg-bg-primary px-[22px] font-sans antialiased',
        'min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]',
        contained ? 'relative' : 'fixed inset-x-0 top-0',
        className,
      )}
    >
      <Link
        className="inline-flex size-5 items-center justify-center text-text-primary leading-none"
        href={brandHref}
        aria-label={brand.name}
      >
        <BrandLogo variant="icon" size={18} alt="" />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle compact />
        {navLinkTo && navLinkLabel ? (
          <Anchor href={navLinkTo} size="sm" className="whitespace-nowrap leading-none">
            {navLinkLabel}
          </Anchor>
        ) : null}
      </div>
    </header>
  )
}
