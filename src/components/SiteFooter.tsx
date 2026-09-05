'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Check, ChevronDown } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { LandingCountrySelect } from './LandingCountrySelect'
import { LandingLanguageSelect } from './LandingLanguageSelect'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import { landingEase, landingFocus } from '@/lib/landing'
import { mergeContent } from '@/lib/merge-content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const AVAILABLE_COUNTRY_ISOS = ['PK'] as const

function useCompactFooter() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 734px)')
    const onChange = () => setCompact(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return compact
}

type FooterLink = {
  label: string
  to: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

const COLUMNS: FooterColumn[] = [
  {
    title: 'Store',
    links: [
      { label: 'Roboticela Store', to: '/products' },
      { label: 'All Products', to: '/products#categories' },
      { label: 'New Arrivals', to: '/products#new' },
      { label: 'Studio', to: '/products/studio' },
      { label: 'Device Kit', to: '/products/device-kit' },
      { label: 'Accessories', to: '/products/accessories' },
    ],
  },
  {
    title: 'Software',
    links: [
      { label: 'Roboticela Software', to: '/services' },
      { label: 'Pricing & Plans', to: '/products/studio' },
      { label: "What's New", to: '/reels' },
      { label: 'Sign in', to: '/services/sign-in' },
      { label: 'Recovery', to: '/services/recovery' },
      { label: 'Sync', to: '/services/sync' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/#idea' },
      { label: 'Our Story', to: '/#building' },
      { label: 'Why Trust Us', to: '/#trust' },
      { label: 'Investors', to: '/#trust' },
      { label: 'Watch Us Build', to: '/reels' },
      { label: 'Get In Touch', to: '/#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Reels', to: '/reels' },
      { label: 'Product Reels', to: '/reels/products' },
      { label: 'Service Reels', to: '/reels/services' },
      { label: 'Documentation', to: '/support/help' },
      { label: 'Community', to: '/support/account' },
      { label: 'Newsletter', to: '#newsletter' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', to: '/support' },
      { label: 'Help Center', to: '/support/help' },
      { label: 'Account', to: '/support/account' },
      { label: 'Security', to: '/support/security' },
      { label: 'Report a Problem', to: '/support' },
      { label: 'Bag', to: '/bag' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/settings?section=privacy' },
      { label: 'Security', to: '/settings?section=security' },
      { label: 'Accessibility', to: '/support/security' },
      { label: 'Account Settings', to: '/settings' },
      { label: 'Support', to: '/support' },
      { label: 'Site Map', to: '/search' },
    ],
  },
]

const BOTTOM_LINKS: FooterLink[] = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Reels', to: '/reels' },
  { label: 'About', to: '/#idea' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Investors', to: '/#trust' },
]

const SOCIAL = [
  { label: 'X', href: '#', icon: 'x' as const },
  { label: 'Instagram', href: '#', icon: 'instagram' as const },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' as const },
  { label: 'YouTube', href: '#', icon: 'youtube' as const },
]

function XMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.72 10.16 21.2 3h-1.54l-5.62 6.22L9.54 3H3.2l6.8 9.54L3.2 21h1.54l5.94-6.58L14.46 21h6.34l-6.08-10.84Zm-2.1 2.33-.69-.95L5.3 4.16h2.36l4.42 6.1.69.95 5.76 7.95h-2.36l-4.55-6.67Z"
      />
    </svg>
  )
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        fill="currentColor"
        d="M8.2 10.1h2.1v7.2H8.2zm1.05-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM11.6 10.1h2.02v.98h.03c.28-.53.97-1.1 2-1.1 2.14 0 2.54 1.41 2.54 3.24v4.08h-2.1v-3.62c0-.86-.02-1.97-1.2-1.97-1.2 0-1.39.94-1.39 1.9v3.69h-2.1z"
      />
    </svg>
  )
}

function YoutubeMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path fill="currentColor" d="M10.4 9.4v5.2L15.2 12z" />
    </svg>
  )
}

function SocialIcon({ name }: { name: FooterSectionContent['social'][number]['icon'] }) {
  if (name === 'x') return <XMark />
  if (name === 'instagram') return <InstagramMark />
  if (name === 'linkedin') return <LinkedinMark />
  return <YoutubeMark />
}

export type FooterSectionContent = {
  brandName: string
  brandHref: string
  copyright: string
  newsletterTitle: string
  newsletterBody: string
  emailPlaceholder: string
  subscribeLabel: string
  subscribedLabel: string
  columns: FooterColumn[]
  bottomLinks: FooterLink[]
  social: { label: string; href: string; icon: 'x' | 'instagram' | 'linkedin' | 'youtube' }[]
}

export const FOOTER_SECTION_CONTENT: FooterSectionContent = {
  brandName: brand.name,
  brandHref: '/',
  copyright: `Copyright © ${new Date().getFullYear()} ${brand.companyName}. All rights reserved.`,
  newsletterTitle: 'Stay in the loop',
  newsletterBody: 'Get updates on new products and releases.',
  emailPlaceholder: 'Enter your email',
  subscribeLabel: 'Subscribe',
  subscribedLabel: 'Subscribed',
  columns: COLUMNS,
  bottomLinks: BOTTOM_LINKS,
  social: SOCIAL,
}

export function SiteFooter({
  content,
  className,
}: {
  content?: Partial<FooterSectionContent>
  className?: string
} = {}) {
  const copy = mergeContent(FOOTER_SECTION_CONTENT, content)
  const reduced = usePrefersReducedMotion()
  const compact = useCompactFooter()
  const footerRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(reduced)
  const [openCols, setOpenCols] = useState<string[]>([])
  const [language, setLanguage] = useState('en-US')
  const [country, setCountry] = useState('PK')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const el = footerRef.current
    if (!el || reduced) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  useEffect(() => {
    if (!subscribed) return
    const timer = window.setTimeout(() => setSubscribed(false), 3000)
    return () => window.clearTimeout(timer)
  }, [subscribed])

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  const toggleCol = (title: string) => {
    setOpenCols((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  return (
    <footer
      ref={footerRef}
      className={cn(
        'max-w-full overflow-x-hidden border-t border-border-default bg-bg-primary font-sans text-text-secondary antialiased',
        className,
      )}
    >
      <div className="mx-auto max-w-[1024px] px-[22px] pt-12 pb-8 min-[735px]:px-10 min-[1069px]:px-0 min-[1069px]:pt-12">
        <div className="mb-6 flex min-h-11 items-center justify-between gap-4 border-b border-border-subtle pb-6 max-[734px]:h-auto max-[734px]:flex-col max-[734px]:items-start">
          <div className="flex flex-wrap items-center gap-2 max-[734px]:flex-col max-[734px]:items-start max-[734px]:gap-1">
            <Link
              className="inline-flex items-center gap-2 leading-none text-inherit no-underline"
              href={copy.brandHref}
              aria-label={copy.brandName}
            >
              <BrandLogo variant="icon" size={18} alt="" />
              <span className="whitespace-nowrap text-[13px] font-semibold leading-[1.2] text-text-primary">
                {copy.brandName}
              </span>
            </Link>
            <span className="text-[12px] font-normal leading-[1.33] text-text-tertiary">{copy.copyright}</span>
          </div>
          <div className="flex shrink-0 flex-nowrap items-center justify-end gap-2 max-[734px]:w-full max-[734px]:justify-stretch">
            <LandingLanguageSelect
              value={language}
              onChange={setLanguage}
              label="Language"
              className="min-w-0 max-w-[280px] flex-[1_1_200px] [&>button]:h-9 max-[734px]:flex-1"
            />
            <LandingCountrySelect
              value={country}
              onChange={(next) => {
                if (next) setCountry(next)
              }}
              label="Country"
              allowClear={false}
              enabledIsos={AVAILABLE_COUNTRY_ISOS}
              className="min-w-0 max-w-[280px] flex-[1_1_200px] [&>button]:h-9 max-[734px]:flex-1"
            />
          </div>
        </div>

        <section
          className="mb-8 flex items-center justify-between gap-6 rounded-2xl border border-border-default bg-bg-tertiary p-6 max-[734px]:flex-col max-[734px]:items-stretch max-[734px]:gap-4"
          id="newsletter"
          aria-labelledby="site-footer-news-title"
        >
          <div>
            <h2 id="site-footer-news-title" className="m-0 text-[15px] font-semibold leading-[1.3] text-text-primary">
              {copy.newsletterTitle}
            </h2>
            <p className="mt-1 mb-0 text-[13px] font-normal leading-[1.4] text-text-secondary">{copy.newsletterBody}</p>
          </div>
          <form className="relative flex shrink-0 items-center gap-2 max-[734px]:flex-col max-[734px]:items-stretch" onSubmit={onSubscribe}>
            <label className="sr-only" htmlFor="site-footer-email">
              Email address
            </label>
            <input
              id="site-footer-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={subscribed}
              required
              className="h-10 w-[240px] rounded-[10px] border border-border-default bg-bg-primary px-3.5 font-sans text-sm font-normal text-text-primary placeholder:text-text-tertiary focus-visible:border-border-focus focus-visible:outline-none max-[734px]:w-full"
            />
            <button
              type="submit"
              className={cn(
                'grid h-10 place-items-center rounded-[980px] border-0 bg-brand-primary px-5 font-sans text-sm font-medium leading-none whitespace-nowrap text-text-on-brand',
                'transition-colors duration-150 hover:bg-brand-primary-hover disabled:cursor-default',
                landingFocus,
                subscribed && 'bg-transparent text-success hover:bg-transparent',
                'max-[734px]:w-full',
              )}
              disabled={subscribed}
              aria-label={subscribed ? copy.subscribedLabel : copy.subscribeLabel}
            >
              <span
                className={cn(
                  'col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5 transition-opacity duration-150',
                  subscribed && 'opacity-0',
                )}
              >
                {copy.subscribeLabel}
              </span>
              <span
                className={cn(
                  'col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5 text-success opacity-0 transition-opacity duration-150',
                  subscribed && 'opacity-100',
                )}
              >
                {copy.subscribedLabel} <Check size={14} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </button>
          </form>
        </section>

        <nav
          className="mb-8 grid grid-cols-2 gap-x-8 gap-y-0 min-[735px]:grid-cols-3 min-[735px]:gap-y-10 min-[1069px]:grid-cols-6"
          aria-label="Footer"
        >
          {copy.columns.map((column, index) => {
            const open = !compact || openCols.includes(column.title)
            const colId = `footer-col-${column.title.toLowerCase()}`
            return (
              <div
                key={column.title}
                className={cn(
                  'min-w-0 max-[734px]:border-b max-[734px]:border-border-subtle',
                  inView || reduced
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0',
                  inView && !reduced && `transition-[opacity,transform] duration-[400ms] ${landingEase}`,
                  reduced && 'translate-y-0 opacity-100',
                )}
                style={{ transitionDelay: inView && !reduced ? `${index * 40}ms` : undefined }}
              >
                {compact ? (
                  <button
                    type="button"
                    className="flex h-11 w-full items-center justify-between border-0 bg-transparent p-0 text-left font-sans text-[12px] font-semibold uppercase tracking-[0.02em] leading-none text-text-tertiary min-[735px]:mb-4 min-[735px]:h-auto min-[735px]:cursor-default"
                    aria-expanded={open}
                    aria-controls={colId}
                    onClick={() => toggleCol(column.title)}
                  >
                    {column.title}
                    <ChevronDown
                      className={cn(
                        'shrink-0 transition-transform duration-200 ease-out min-[735px]:hidden',
                        open && 'rotate-180',
                      )}
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <h3 className="m-0 mb-4 p-0 text-[12px] font-semibold uppercase tracking-[0.02em] leading-none text-text-tertiary">
                    {column.title}
                  </h3>
                )}
                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
                    open || !compact ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    !compact && 'opacity-100',
                  )}
                  id={colId}
                >
                  <ul className="m-0 flex flex-col gap-3 overflow-hidden p-0 pb-4 list-none min-[735px]:pb-0">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {link.to.startsWith('#') && !link.to.startsWith('/#') ? (
                          <a
                            className="text-[13px] font-normal leading-[1.3] text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary hover:underline"
                            href={link.to}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            className="text-[13px] font-normal leading-[1.3] text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary hover:underline"
                            href={link.to}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="flex flex-col items-center gap-4 border-t border-border-subtle pt-6 min-[735px]:flex-row min-[735px]:justify-between">
          <ul className="m-0 flex list-none items-center gap-5 p-0" aria-label="Social">
            {copy.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg text-text-tertiary transition-colors duration-150',
                    'hover:bg-bg-tertiary hover:text-brand-primary',
                    landingFocus,
                  )}
                >
                  <SocialIcon name={item.icon} />
                </a>
              </li>
            ))}
          </ul>
          <nav className="flex flex-wrap items-center justify-center min-[735px]:justify-end" aria-label="Quick links">
            {copy.bottomLinks.map((link) => (
              <Link
                key={link.label}
                className="text-[12px] font-normal leading-[1.33] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-primary hover:underline [&+&]:before:mx-2 [&+&]:before:inline-block [&+&]:before:h-2.5 [&+&]:before:w-px [&+&]:before:bg-border-default [&+&]:before:align-[-1px] [&+&]:before:content-['']"
                href={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
