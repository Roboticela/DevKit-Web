'use client'

import { useState } from 'react'
import Link from 'next/link'
import { brand } from '@/lib/devkit'
import { AVAILABLE_COUNTRY_ISOS, AVAILABLE_LANGUAGE_IDS } from '@/lib/languages'
import { BrandLogo } from './BrandLogo'
import { Button } from './Button'
import { CountrySelect } from './CountrySelect'
import { LanguageSelect } from './LanguageSelect'
import { Caption, Label } from './Text'

const COLUMNS = [
  {
    title: 'Store',
    links: ['Roboticela Store', 'All Products', 'New Arrivals', 'Studio', 'Device Kit', 'Accessories'],
  },
  {
    title: 'Software',
    links: ['Roboticela Software', 'Pricing & Plans', "What's New", 'Sign in', 'Recovery', 'Sync'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Story', 'Why Trust Us', 'Investors', 'Watch Us Build', 'Get In Touch'],
  },
  {
    title: 'Resources',
    links: ['Reels', 'Product Reels', 'Service Reels', 'Documentation', 'Community', 'Newsletter'],
  },
] as const

export function SiteFooter() {
  const [country, setCountry] = useState<string | null>('PK')
  const [language, setLanguage] = useState<string | null>('en-US')
  const [email, setEmail] = useState('')

  return (
    <footer className="max-w-full overflow-x-hidden border-t border-border-default bg-bg-primary font-sans text-text-secondary antialiased">
      <div className="mx-auto max-w-[1024px] px-[22px] pt-12 pb-8">
        <div className="mb-6 flex min-h-11 items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="inline-flex items-center text-inherit no-underline leading-none">
              <BrandLogo variant="text" size={18} />
            </Link>
            <Caption as="span">
              © {new Date().getFullYear()} {brand.companyName}
            </Caption>
          </div>
          <div className="flex shrink-0 flex-nowrap items-center justify-end gap-2">
            <LanguageSelect
              className="w-auto min-w-0 max-w-[280px] flex-[1_1_200px]"
              compact
              value={language}
              onChange={setLanguage}
              enabledIds={AVAILABLE_LANGUAGE_IDS}
            />
            <CountrySelect
              className="w-auto min-w-0 max-w-[280px] flex-[1_1_200px]"
              compact
              value={country}
              onChange={setCountry}
              enabledIsos={AVAILABLE_COUNTRY_ISOS}
              allowClear={false}
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-6 rounded-2xl border border-border-default bg-bg-tertiary p-6 max-[734px]:flex-col max-[734px]:items-start">
          <div>
            <Label as="h2">Stay in the loop</Label>
            <Caption tone="secondary" className="mt-1">
              Product notes, releases, and studio updates.
            </Caption>
          </div>
          <form
            className="relative flex shrink-0 items-center gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              className="h-10 w-60 rounded-[10px] border border-border-default bg-bg-primary px-3.5 font-sans text-sm font-normal text-text-primary placeholder:text-text-tertiary focus-visible:border-border-focus focus-visible:outline-none max-[734px]:w-full"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="submit" size="sm" fullWidth={false} className="h-10 px-5">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 min-[735px]:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <Caption as="h3" tone="primary" className="mb-3 font-semibold">
                {column.title}
              </Caption>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="text-text-secondary no-underline hover:underline">
                      <Caption as="span" tone="secondary">
                        {link}
                      </Caption>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-6">
          <Caption>Privacy · Terms · Sales Policy</Caption>
          <Caption>United States / English</Caption>
        </div>
      </div>
    </footer>
  )
}
