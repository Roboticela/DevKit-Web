'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { brand } from '@/lib/devkit'
import { BrandLogo } from './BrandLogo'
import { Body, Caption } from './Text'

type LoadingScreenProps = {
  status?: string
  delayedStatus?: string
  delayMs?: number
  embedded?: boolean
}

export function LoadingScreen({
  status = 'Setting things up…',
  delayedStatus = 'This is taking longer than usual…',
  delayMs = 5000,
  embedded = false,
}: LoadingScreenProps) {
  const [delayed, setDelayed] = useState(false)
  const [visibleLabel, setVisibleLabel] = useState(true)
  const [label, setLabel] = useState(status)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisibleLabel(false)
      window.setTimeout(() => {
        setDelayed(true)
        setLabel(delayedStatus)
        setVisibleLabel(true)
      }, 200)
    }, delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, delayedStatus, status])

  return (
    <div
      className={cn(
        'box-border flex w-full select-none items-center justify-center font-sans pointer-events-none',
        embedded
          ? 'h-full min-h-0 flex-1 bg-transparent'
          : 'min-h-dvh bg-bg-primary text-text-primary',
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={brand.name}
    >
      <div className="flex flex-col items-center animate-loading-in motion-reduce:animate-none">
        <BrandLogo
          className={cn(
            'block size-14 object-contain',
            embedded ? 'text-text-on-brand' : 'text-text-primary',
          )}
          size={56}
          alt=""
        />
        <div
          className={cn(
            'mt-8 size-5 rounded-[980px] border-2 border-border-default border-t-brand-primary animate-btn-spin motion-reduce:animate-none motion-reduce:opacity-85',
            'dark:border-border-strong dark:border-t-brand-primary',
          )}
          aria-hidden="true"
        />
        {delayed ? (
          <Caption
            align="center"
            className={cn(
              'mt-6 max-w-[280px] transition-opacity duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
              visibleLabel ? 'opacity-100' : 'opacity-0',
            )}
          >
            {label}
          </Caption>
        ) : (
          <Body
            size="sm"
            align="center"
            tone="tertiary"
            className={cn(
              'mt-6 max-w-[280px] transition-opacity duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
              visibleLabel ? 'opacity-100' : 'opacity-0',
            )}
          >
            {label}
          </Body>
        )}
      </div>
    </div>
  )
}
