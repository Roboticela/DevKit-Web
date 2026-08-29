/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'

const SIZES = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-[11px]',
  lg: 'size-11 text-[15px]',
  xl: 'size-[112px] text-[32px]',
} as const

export function initialsFromName(name?: string) {
  if (!name) return ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: {
  src?: string | null
  name?: string
  size?: keyof typeof SIZES
  className?: string
}) {
  const initials = initialsFromName(name)
  const logoSize = size === 'xl' ? 40 : size === 'lg' ? 18 : size === 'md' ? 14 : 12

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-default bg-bg-secondary font-medium text-text-primary dark:bg-bg-tertiary',
        SIZES[size],
        className,
      )}
      aria-hidden={!name}
      aria-label={name}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : initials ? (
        initials
      ) : (
        <BrandLogo size={logoSize} alt="" />
      )}
    </span>
  )
}
