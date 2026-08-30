'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'
import { Loader } from './Loader'
import { Progress } from './Progress'
import { Body, Caption } from './Text'

export type LoadingScreenVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type LoadingScreenSize = 'sm' | 'md' | 'lg'
export type LoadingScreenIndicator = 'spinner' | 'bar' | 'none'
export type LoadingScreenPreview = 'initial' | 'delayed'

export const LOADING_SCREEN_VARIANTS: LoadingScreenVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const LOADING_SCREEN_SIZES: LoadingScreenSize[] = ['sm', 'md', 'lg']
export const LOADING_SCREEN_INDICATORS: LoadingScreenIndicator[] = ['spinner', 'bar', 'none']

export const LOADING_SCREEN_VARIANT_LABEL: Record<LoadingScreenVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const LOADING_SCREEN_SIZE_LABEL: Record<LoadingScreenSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const LOADING_SCREEN_INDICATOR_LABEL: Record<LoadingScreenIndicator, string> = {
  spinner: 'Spinner',
  bar: 'Bar',
  none: 'None',
}

const sizes: Record<
  LoadingScreenSize,
  { box: string; logo: number; bar: string; min: string }
> = {
  sm: { box: 'px-4 py-8', logo: 40, bar: 'w-[112px]', min: 'min-h-[140px]' },
  md: { box: 'px-6 py-12', logo: 56, bar: 'w-[128px]', min: 'min-h-[200px]' },
  lg: { box: 'px-8 py-16', logo: 72, bar: 'w-[160px]', min: 'min-h-[260px]' },
}

function trackChrome(variant: LoadingScreenVariant, onDark: boolean, embedded: boolean): string {
  const rest = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-secondary'
  const page = onDark ? 'bg-black' : 'bg-bg-primary'
  const chrome: Record<LoadingScreenVariant, string> = {
    fill: embedded ? (onDark ? 'bg-black' : 'bg-transparent') : page,
    subtle: rest,
    outline: cn('border bg-transparent', onDark ? 'border-[#48484a]' : 'border-border-default'),
    ghost: 'bg-transparent',
    pill: rest,
  }
  return chrome[variant]
}

export function LoadingScreen({
  status = 'Setting things up…',
  delayedStatus = 'This is taking longer than usual…',
  delayMs = 5000,
  embedded = false,
  variant = 'fill',
  size = 'md',
  indicator = 'spinner',
  preview,
  showLogo = true,
  showStatus = true,
  onDark = false,
  className,
}: {
  status?: string
  delayedStatus?: string
  delayMs?: number
  embedded?: boolean
  variant?: LoadingScreenVariant
  size?: LoadingScreenSize
  indicator?: LoadingScreenIndicator
  preview?: LoadingScreenPreview
  showLogo?: boolean
  showStatus?: boolean
  onDark?: boolean
  className?: string
}) {
  const [delayed, setDelayed] = useState(preview === 'delayed')
  const [visibleLabel, setVisibleLabel] = useState(true)
  const [label, setLabel] = useState(preview === 'delayed' ? delayedStatus : status)

  useEffect(() => {
    if (preview === 'initial') {
      setDelayed(false)
      setLabel(status)
      setVisibleLabel(true)
      return
    }
    if (preview === 'delayed') {
      setDelayed(true)
      setLabel(delayedStatus)
      setVisibleLabel(true)
      return
    }

    setDelayed(false)
    setLabel(status)
    setVisibleLabel(true)
    const timer = window.setTimeout(() => {
      setVisibleLabel(false)
      window.setTimeout(() => {
        setDelayed(true)
        setLabel(delayedStatus)
        setVisibleLabel(true)
      }, 200)
    }, delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, delayedStatus, preview, status])

  const metric = sizes[size]
  const caption = delayed ? delayedStatus : status
  const named = showStatus && caption ? caption : 'Loading'

  return (
    <div
      className={cn(
        'box-border flex w-full select-none items-center justify-center font-sans pointer-events-none',
        metric.box,
        embedded ? cn('h-full w-full flex-1', metric.min) : 'min-h-dvh',
        variant === 'pill' && embedded ? 'rounded-[24px]' : embedded ? 'rounded-[18px]' : null,
        trackChrome(variant, onDark, embedded),
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={named}
    >
      <div className="flex flex-col items-center animate-loading-in motion-reduce:animate-none">
        {showLogo ? (
          <BrandLogo
            className="block object-contain"
            size={metric.logo}
            alt=""
          />
        ) : null}
        {indicator === 'spinner' ? (
          <Loader
            size={size}
            onDark={onDark}
            decorative
            className={showLogo ? 'mt-8' : undefined}
          />
        ) : null}
        {indicator === 'bar' ? (
          <Progress
            className={cn(showLogo ? 'mt-8' : null, metric.bar)}
            indeterminate
            onDark={onDark}
            variant={variant === 'ghost' ? 'ghost' : variant === 'pill' ? 'pill' : 'fill'}
          />
        ) : null}
        {showStatus ? (
          delayed ? (
            <Caption
              align="center"
              className={cn(
                'mt-6 max-w-[280px] transition-opacity duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
                visibleLabel ? 'opacity-100' : 'opacity-0',
                onDark && '!text-[#a1a1a6]',
              )}
            >
              {label}
            </Caption>
          ) : (
            <Body
              size="sm"
              align="center"
              tone={onDark ? undefined : 'tertiary'}
              className={cn(
                'mt-6 max-w-[280px] transition-opacity duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
                visibleLabel ? 'opacity-100' : 'opacity-0',
                onDark && '!text-[#a1a1a6]',
              )}
            >
              {label}
            </Body>
          )
        ) : null}
      </div>
    </div>
  )
}
