import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { DkChevronCaretDown } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import {
  Avatar,
  AVATAR_STATUS_LABEL,
  initialsFromName,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
  type AvatarTone,
  type AvatarVariant,
} from './Avatar'
import { Loader } from './Loader'

export type ProfileButtonVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type ProfileButtonSize = 'sm' | 'md' | 'lg'
export type ProfileButtonLayout = 'avatar' | 'labeled' | 'menu' | 'identity'
export type ProfileButtonPreview = 'hover' | 'focus' | 'active'

export const PROFILE_BUTTON_VARIANTS: ProfileButtonVariant[] = [
  'fill',
  'subtle',
  'outline',
  'ghost',
  'pill',
]
export const PROFILE_BUTTON_SIZES: ProfileButtonSize[] = ['sm', 'md', 'lg']
export const PROFILE_BUTTON_LAYOUTS: ProfileButtonLayout[] = ['avatar', 'labeled', 'menu', 'identity']

export const PROFILE_BUTTON_VARIANT_LABEL: Record<ProfileButtonVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const PROFILE_BUTTON_SIZE_LABEL: Record<ProfileButtonSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const PROFILE_BUTTON_LAYOUT_LABEL: Record<ProfileButtonLayout, string> = {
  avatar: 'Avatar',
  labeled: 'Labeled',
  menu: 'Menu',
  identity: 'Identity',
}

type Metric = {
  faceOnly: AvatarSize
  faceCopy: AvatarSize
  faceIdentity: AvatarSize
  avatar: string
  row: string
  identity: string
  name: string
  sub: string
  chevron: number
  loader: number
  squircle: string
  chip: string
}

const sizes: Record<ProfileButtonSize, Metric> = {
  sm: {
    faceOnly: 'md',
    faceCopy: 'sm',
    faceIdentity: 'md',
    avatar: 'p-0',
    row: 'h-8 gap-1.5 py-0 pl-1 pr-2',
    identity: 'min-h-11 gap-2 py-1.5 pl-1.5 pr-2.5',
    name: 'text-[13px] font-medium tracking-[-0.01em] leading-none',
    sub: 'text-[11px] font-normal leading-[1.2] tracking-[0]',
    chevron: 12,
    loader: 14,
    squircle: 'rounded-[10px]',
    chip: 'rounded-[10px]',
  },
  md: {
    faceOnly: 'lg',
    faceCopy: 'md',
    faceIdentity: 'lg',
    avatar: 'p-0',
    row: 'h-11 gap-2 py-0 pl-1 pr-2.5',
    identity: 'min-h-14 gap-2.5 py-2 pl-2 pr-3',
    name: 'text-[15px] font-medium tracking-[-0.01em] leading-none',
    sub: 'text-[12px] font-normal leading-[1.25] tracking-[0]',
    chevron: 14,
    loader: 16,
    squircle: 'rounded-[12px]',
    chip: 'rounded-[12px]',
  },
  lg: {
    faceOnly: 'lg',
    faceCopy: 'lg',
    faceIdentity: 'lg',
    avatar: 'p-[3px]',
    row: 'h-[50px] gap-2.5 py-0 pl-1 pr-3',
    identity: 'min-h-16 gap-3 py-2.5 pl-2.5 pr-3.5',
    name: 'text-[17px] font-medium tracking-[-0.015em] leading-none',
    sub: 'text-[13px] font-normal leading-[1.3] tracking-[0]',
    chevron: 16,
    loader: 18,
    squircle: 'rounded-[14px]',
    chip: 'rounded-[14px]',
  },
}

const COLOR_MOTION = cn('transition-colors duration-150', EASE)

function chromeOf(variant: ProfileButtonVariant) {
  const look: Record<
    ProfileButtonVariant,
    { rest: string; hover: string; hoverPreview: string; open: string; active: string }
  > = {
    fill: {
      rest: 'bg-bg-secondary ring-1 ring-inset ring-border-default',
      hover: 'hover:bg-bg-hover',
      hoverPreview: 'bg-bg-hover',
      open: 'bg-bg-hover ring-brand-primary',
      active: 'bg-bg-active',
    },
    subtle: {
      rest: 'bg-bg-tertiary ring-1 ring-inset ring-transparent',
      hover: 'hover:bg-bg-hover',
      hoverPreview: 'bg-bg-hover',
      open: 'bg-bg-hover',
      active: 'bg-bg-active',
    },
    outline: {
      rest: 'bg-transparent ring-1 ring-inset ring-border-default',
      hover: 'hover:bg-bg-hover hover:ring-border-strong',
      hoverPreview: 'bg-bg-hover ring-border-strong',
      open: 'bg-bg-hover ring-brand-primary',
      active: 'bg-bg-active',
    },
    ghost: {
      rest: 'bg-transparent ring-1 ring-inset ring-transparent',
      hover: 'hover:bg-bg-hover',
      hoverPreview: 'bg-bg-hover',
      open: 'bg-bg-hover',
      active: 'bg-bg-active',
    },
    pill: {
      rest: 'bg-bg-tertiary ring-1 ring-inset ring-transparent',
      hover: 'hover:bg-bg-hover',
      hoverPreview: 'bg-bg-hover',
      open: 'bg-bg-hover',
      active: 'bg-bg-active',
    },
  }
  return look[variant]
}

function radiusOf(
  layout: ProfileButtonLayout,
  variant: ProfileButtonVariant,
  shape: AvatarShape,
  metric: Metric,
) {
  if (layout === 'avatar') return shape === 'circle' ? 'rounded-full' : metric.squircle
  if (variant === 'pill') return 'rounded-[980px]'
  return metric.chip
}

function padOf(layout: ProfileButtonLayout, metric: Metric) {
  if (layout === 'avatar') return metric.avatar
  if (layout === 'identity') return metric.identity
  return metric.row
}

function faceVariantOf(
  src: string | null | undefined,
  layout: ProfileButtonLayout,
  variant: ProfileButtonVariant,
): AvatarVariant {
  if (src) return 'ghost'
  if (layout === 'avatar' && variant !== 'ghost') return 'ghost'
  return 'subtle'
}

function profileName(name?: string, subtitle?: string, status?: AvatarStatus) {
  const who = name ? `${name} profile` : 'Profile'
  const bits = [who]
  if (subtitle) bits.push(subtitle)
  if (status && status !== 'none') bits.push(AVATAR_STATUS_LABEL[status].toLowerCase())
  return bits.join(', ')
}

function formatBadge(badge: number | string) {
  if (typeof badge === 'number') return badge > 9 ? '9+' : String(badge)
  return badge
}

export function ProfileButton({
  src,
  name,
  subtitle,
  icon,
  variant = 'fill',
  size = 'sm',
  layout = 'avatar',
  shape = 'circle',
  tone = 'default',
  status = 'none',
  badge,
  chevron,
  open = false,
  loading = false,
  disabled,
  preview,
  fullWidth = false,
  className,
  ...rest
}: {
  src?: string | null
  name?: string
  subtitle?: string
  icon?: ReactNode
  variant?: ProfileButtonVariant
  size?: ProfileButtonSize
  layout?: ProfileButtonLayout
  shape?: AvatarShape
  tone?: AvatarTone
  status?: AvatarStatus
  badge?: number | string
  chevron?: boolean
  open?: boolean
  loading?: boolean
  preview?: ProfileButtonPreview
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const metric = sizes[size]
  const look = chromeOf(variant)
  const copy = layout !== 'avatar'
  const showChevron = layout === 'menu' || chevron === true || (layout === 'identity' && chevron !== false)
  const menuTrigger = layout === 'menu' || layout === 'identity' || chevron || open
  const hover = preview === 'hover'
  const pressed = preview === 'active'
  const busy = loading
  const inert = Boolean(disabled) || busy
  const expanded = open && !inert
  const faceSize =
    layout === 'identity' ? metric.faceIdentity : copy ? metric.faceCopy : metric.faceOnly
  const showBadge = badge != null && badge !== 0 && badge !== '0'
  const label = name ?? 'Profile'
  const radius = radiusOf(layout, variant, shape, metric)
  const { 'aria-label': ariaLabel, ...buttonRest } = rest

  return (
    <button
      type="button"
      className={cn(
        'group relative inline-flex shrink-0 cursor-pointer items-center font-sans',
        COLOR_MOTION,
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        padOf(layout, metric),
        radius,
        look.rest,
        !inert && !expanded && look.hover,
        hover && !inert && !expanded && look.hoverPreview,
        expanded && look.open,
        pressed && !inert && look.active,
        preview === 'focus' && 'outline-2 outline-offset-2 outline-brand-primary',
        copy ? 'text-left' : 'justify-center',
        fullWidth && copy ? 'w-full' : 'w-auto',
        inert ? 'cursor-not-allowed opacity-55' : 'active:opacity-70',
        className,
      )}
      {...buttonRest}
      aria-label={ariaLabel ?? profileName(name, subtitle, status)}
      aria-haspopup={menuTrigger ? 'menu' : undefined}
      aria-expanded={menuTrigger ? expanded : undefined}
      aria-busy={busy || undefined}
      disabled={inert}
    >
      <span className="relative inline-flex shrink-0" aria-hidden>
        <span className={cn('relative inline-flex', busy && 'invisible')}>
          <Avatar
            src={src}
            name={name}
            icon={icon}
            faceLabel={src || icon ? undefined : initialsFromName(name) || undefined}
            size={faceSize}
            variant={faceVariantOf(src, layout, variant)}
            tone={tone}
            status={status}
            shape={shape}
          />
          {!inert ? (
            <span
              className={cn(
                'pointer-events-none absolute inset-0',
                shape === 'circle' ? 'rounded-full' : metric.squircle,
                COLOR_MOTION,
                'group-hover:bg-black/[0.06] dark:group-hover:bg-white/[0.08]',
                hover && 'bg-black/[0.06] dark:bg-white/[0.08]',
                pressed && 'bg-black/[0.10] dark:bg-white/[0.12]',
              )}
            />
          ) : null}
        </span>
        {busy ? (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Loader decorative size={metric.loader} />
          </span>
        ) : null}
        {showBadge && !busy ? (
          <span className="absolute -top-0.5 -right-0.5 z-[1] inline-flex h-4 min-w-4 items-center justify-center rounded-[980px] bg-danger px-1 text-[10px] font-medium leading-none text-white">
            {formatBadge(badge)}
          </span>
        ) : null}
      </span>

      {copy ? (
        <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
          <span className={cn('max-w-full truncate text-text-primary', metric.name)}>{label}</span>
          {layout === 'identity' && subtitle ? (
            <span className={cn('max-w-full truncate text-text-tertiary', metric.sub)}>{subtitle}</span>
          ) : null}
        </span>
      ) : null}

      {copy && showChevron ? (
        <span
          className={cn(
            'ml-auto inline-flex shrink-0 text-text-tertiary transition-transform duration-200',
            EASE,
            'motion-reduce:transition-none',
            expanded && 'rotate-180',
          )}
          aria-hidden
        >
          <DkChevronCaretDown size={metric.chevron} strokeWidth={1.75} absoluteStrokeWidth />
        </span>
      ) : null}
    </button>
  )
}
