'use client'

import type { ReactNode } from 'react'
import { DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { AuthNav } from './AuthNav'
import { BrandLogo } from './BrandLogo'
import { Body, Heading, Label } from './Text'

export { AuthNav } from './AuthNav'

export function AuthFormCollapse({
  open,
  children,
  className,
}: {
  open: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:transition-none',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        className,
      )}
      aria-hidden={open ? undefined : true}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
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
        {icon ?? <BrandLogo className="block size-11" size={44} alt="" />}
      </div>
      <Heading
        align="center"
        className="!text-[32px] !leading-[1.1] !tracking-[-0.01em] min-[735px]:!text-[32px] min-[735px]:!leading-[1.1]"
      >
        {title}
      </Heading>
      <Body
        size="sm"
        align="center"
        className={cn('mt-2', narrowSubhead && 'mx-auto max-w-[360px]')}
      >
        {subhead}
      </Body>
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
        {children ?? <DkTaskCompleteCheckmark size={28} strokeWidth={2.2} aria-hidden />}
      </div>
      <Heading
        align="center"
        className="!text-[32px] !leading-[1.1] !tracking-[-0.01em] min-[735px]:!text-[32px] min-[735px]:!leading-[1.1]"
      >
        {title}
      </Heading>
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
