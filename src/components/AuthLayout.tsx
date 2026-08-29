'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { brand } from '@/lib/devkit'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'
import { Body, Caption, Heading, Label, Subhead } from './Text'

export function AuthNav({
  navLinkTo,
  navLinkLabel,
}: {
  navLinkTo?: string
  navLinkLabel?: string
}) {
  return (
    <header className="fixed top-0 right-0 left-0 z-[2] flex h-11 items-center justify-between bg-bg-primary px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
      <Link
        className="inline-flex size-5 items-center justify-center text-text-primary leading-none"
        href="/"
        aria-label={brand.name}
      >
        <BrandLogo variant="icon" size={18} alt="" />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle compact />
        {navLinkTo && navLinkLabel ? (
          <Link
            className="whitespace-nowrap text-brand-primary no-underline hover:underline"
            href={navLinkTo}
          >
            <Caption as="span" tone="link">
              {navLinkLabel}
            </Caption>
          </Link>
        ) : null}
      </div>
    </header>
  )
}

export function AuthBrand({
  title,
  subhead,
  narrowSubhead = false,
  icon,
}: {
  title: string
  subhead: string
  narrowSubhead?: boolean
  icon?: ReactNode
}) {
  return (
    <>
      <div className="mb-6 flex justify-center text-text-primary">
        {icon ?? <BrandLogo className="block size-11 object-contain" size={44} alt="" />}
      </div>
      <Heading align="center">{title}</Heading>
      <Subhead
        align="center"
        className={cn('mt-2', narrowSubhead && 'mx-auto max-w-[360px]')}
      >
        {subhead}
      </Subhead>
    </>
  )
}

export function AuthLayout({
  navLinkTo,
  navLinkLabel,
  children,
  className,
}: {
  navLinkTo?: string
  navLinkLabel?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('box-border min-h-dvh bg-bg-primary font-sans text-text-primary', className)}>
      <AuthNav navLinkTo={navLinkTo} navLinkLabel={navLinkLabel} />
      <main className="flex min-h-dvh items-center justify-center px-[22px] pt-[108px] pb-12 min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
        <div className="w-full max-w-[460px] animate-auth-panel-in motion-reduce:animate-none">
          {children}
        </div>
      </main>
    </div>
  )
}

export function AuthSuccess({
  title,
  body,
  email,
  action,
  children,
}: {
  title: string
  body?: ReactNode
  email?: string
  action?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col items-center text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-[980px] bg-bg-secondary text-success dark:bg-[#1c1c1e]">
        {children ?? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <Heading align="center">{title}</Heading>
      {body ? (
        <Body size="sm" align="center" className="mx-auto mt-2 max-w-[360px]">
          {body}
        </Body>
      ) : null}
      {email ? (
        <Body size="sm" align="center" className="mt-4">
          Sent to{' '}
          <Label as="span" className="break-all">
            {email}
          </Label>
        </Body>
      ) : null}
      {action ? <div className="mt-8 w-full max-w-[320px]">{action}</div> : null}
    </div>
  )
}
