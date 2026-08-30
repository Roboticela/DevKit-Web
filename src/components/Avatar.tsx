/* eslint-disable @next/next/no-img-element */

'use client'

import { Children, isValidElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'

export type AvatarVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type AvatarStatus = 'none' | 'online' | 'away' | 'busy' | 'offline'
export type AvatarShape = 'circle' | 'rounded'

export const AVATAR_VARIANTS: AvatarVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const AVATAR_SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const AVATAR_TONES: AvatarTone[] = ['default', 'brand', 'success', 'warning', 'danger']
export const AVATAR_STATUSES: AvatarStatus[] = ['none', 'online', 'away', 'busy', 'offline']
export const AVATAR_SHAPES: AvatarShape[] = ['circle', 'rounded']

export const AVATAR_VARIANT_LABEL: Record<AvatarVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const AVATAR_SIZE_LABEL: Record<AvatarSize, string> = {
  xs: 'Extra small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra large',
}

export const AVATAR_TONE_LABEL: Record<AvatarTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export const AVATAR_STATUS_LABEL: Record<AvatarStatus, string> = {
  none: 'None',
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
}

export const AVATAR_SHAPE_LABEL: Record<AvatarShape, string> = {
  circle: 'Circle',
  rounded: 'Rounded',
}

const SIZES: Record<
  AvatarSize,
  { box: string; type: string; logo: number; icon: number; dot: string; radius: string; overlap: string }
> = {
  xs: {
    box: 'size-5',
    type: 'text-[8px]',
    logo: 10,
    icon: 10,
    dot: 'size-1.5',
    radius: 'rounded-[6px]',
    overlap: '-ml-1.5',
  },
  sm: {
    box: 'size-6',
    type: 'text-[10px]',
    logo: 12,
    icon: 12,
    dot: 'size-1.5',
    radius: 'rounded-[8px]',
    overlap: '-ml-2',
  },
  md: {
    box: 'size-8',
    type: 'text-[11px]',
    logo: 14,
    icon: 14,
    dot: 'size-2',
    radius: 'rounded-[10px]',
    overlap: '-ml-2.5',
  },
  lg: {
    box: 'size-11',
    type: 'text-[15px]',
    logo: 18,
    icon: 18,
    dot: 'size-2.5',
    radius: 'rounded-[12px]',
    overlap: '-ml-3',
  },
  xl: {
    box: 'size-[112px]',
    type: 'text-[32px]',
    logo: 40,
    icon: 40,
    dot: 'size-4',
    radius: 'rounded-[18px]',
    overlap: '-ml-8',
  },
}

const STATUS_DOT: Record<Exclude<AvatarStatus, 'none'>, string> = {
  online: 'bg-success',
  away: 'bg-warning',
  busy: 'bg-danger',
  offline: 'bg-text-disabled',
}

function wellChrome(variant: AvatarVariant, tone: AvatarTone): string {
  const paint: Record<AvatarTone, { fill: string; ink: string }> = {
    default: { fill: 'bg-bg-secondary text-text-primary dark:bg-bg-tertiary', ink: 'text-text-primary' },
    brand: { fill: 'bg-brand-primary-subtle text-brand-primary', ink: 'text-brand-primary' },
    success: { fill: 'bg-success-subtle text-success', ink: 'text-success' },
    warning: { fill: 'bg-warning-subtle text-warning', ink: 'text-warning' },
    danger: { fill: 'bg-danger-subtle text-danger', ink: 'text-danger' },
  }
  const { fill, ink } = paint[tone]
  const chrome: Record<AvatarVariant, string> = {
    fill: cn('border border-border-default', fill),
    subtle: cn('border border-transparent', fill),
    outline: cn('border border-border-default bg-transparent', ink),
    ghost: cn('border border-transparent bg-transparent', ink),
    pill: cn('border border-transparent', fill),
  }
  return chrome[variant]
}

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
  icon,
  faceLabel,
  size = 'md',
  variant = 'fill',
  tone = 'default',
  status = 'none',
  shape = 'circle',
  loading = false,
  disabled = false,
  className,
}: {
  src?: string | null
  name?: string
  icon?: ReactNode
  faceLabel?: string
  size?: AvatarSize
  variant?: AvatarVariant
  tone?: AvatarTone
  status?: AvatarStatus
  shape?: AvatarShape
  loading?: boolean
  disabled?: boolean
  className?: string
}) {
  const face = faceLabel ?? initialsFromName(name)
  const metric = SIZES[size]
  const radius = shape === 'circle' ? 'rounded-full' : metric.radius
  const accessibleName =
    name && status !== 'none' ? `${name}, ${AVATAR_STATUS_LABEL[status].toLowerCase()}` : name

  return (
    <span
      className={cn('relative inline-flex shrink-0', metric.box, disabled && 'opacity-55')}
      aria-hidden={!accessibleName}
      aria-label={accessibleName}
      aria-busy={loading || undefined}
    >
      <span
        className={cn(
          'inline-flex size-full items-center justify-center overflow-hidden font-medium',
          radius,
          loading ? 'animate-pulse border border-transparent bg-bg-tertiary' : wellChrome(variant, tone),
          className,
        )}
      >
        {loading ? null : src ? (
          <img src={src} alt="" className="size-full object-cover" />
        ) : icon ? (
          <span className="inline-flex items-center justify-center [&_svg]:size-[1em]" style={{ fontSize: metric.icon }}>
            {icon}
          </span>
        ) : face ? (
          face
        ) : (
          <BrandLogo size={metric.logo} alt="" />
        )}
      </span>
      {status !== 'none' && !loading ? (
        <span
          className={cn(
            'absolute right-0 bottom-0 box-border rounded-full border-2 border-bg-primary',
            metric.dot,
            STATUS_DOT[status],
          )}
          aria-hidden
        />
      ) : null}
    </span>
  )
}

export function AvatarGroup({
  children,
  max = 3,
  size = 'md',
  className,
}: {
  children: ReactNode
  max?: number
  size?: AvatarSize
  className?: string
}) {
  const items = Children.toArray(children).filter(isValidElement)
  const shown = items.slice(0, max)
  const extra = items.length - shown.length
  const metric = SIZES[size]

  return (
    <span className={cn('inline-flex items-center', className)} role="list">
      {shown.map((child, index) => (
        <span
          key={index}
          role="listitem"
          className={cn(index > 0 && metric.overlap, 'inline-flex rounded-full bg-bg-primary p-0.5')}
        >
          {child}
        </span>
      ))}
      {extra > 0 ? (
        <span role="listitem" className={cn(metric.overlap, 'inline-flex rounded-full bg-bg-primary p-0.5')}>
          <Avatar name={`${extra} more`} faceLabel={`+${extra}`} size={size} variant="subtle" />
        </span>
      ) : null}
    </span>
  )
}
