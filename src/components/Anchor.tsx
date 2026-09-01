import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import {
  DkArrowUpRightLaunch,
  DkChevronCaretLeft,
  DkChevronCaretRight,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type AnchorVariant = 'inline' | 'subtle' | 'underline' | 'plain' | 'standalone' | 'arrow'
export type AnchorSize = 'inherit' | 'sm' | 'md' | 'lg'
export type AnchorTone = 'brand' | 'danger'
export type AnchorPreview = 'hover' | 'focus' | 'active' | 'visited'
export type AnchorArrow = 'end' | 'start'

export const ANCHOR_VARIANTS: AnchorVariant[] = [
  'inline',
  'subtle',
  'underline',
  'plain',
  'standalone',
  'arrow',
]
export const ANCHOR_SIZES: AnchorSize[] = ['inherit', 'sm', 'md', 'lg']
export const ANCHOR_TONES: AnchorTone[] = ['brand', 'danger']
export const ANCHOR_ARROWS: AnchorArrow[] = ['end', 'start']

export const ANCHOR_VARIANT_LABEL: Record<AnchorVariant, string> = {
  inline: 'Inline',
  subtle: 'Subtle',
  underline: 'Underline',
  plain: 'Plain',
  standalone: 'Standalone',
  arrow: 'Arrow',
}

export const ANCHOR_SIZE_LABEL: Record<AnchorSize, string> = {
  inherit: 'Inherit',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const ANCHOR_TONE_LABEL: Record<AnchorTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

export const ANCHOR_ARROW_LABEL: Record<AnchorArrow, string> = {
  end: 'End',
  start: 'Start',
}

const sizes: Record<AnchorSize, string> = {
  inherit: '',
  sm: 'text-[12px] leading-[1.33]',
  md: 'text-[17px] leading-[1.47]',
  lg: 'text-[17px] leading-[1.42] min-[735px]:text-[19px]',
}

const ICON_PX: Record<AnchorSize, number> = {
  inherit: 12,
  sm: 11,
  md: 13,
  lg: 15,
}

const ARROW_CIRCLE: Record<AnchorSize, string> = {
  inherit: 'size-[1.35em]',
  sm: 'size-[18px]',
  md: 'size-6',
  lg: 'size-7',
}

const ARROW_ICON: Record<AnchorSize, number> = {
  inherit: 11,
  sm: 10,
  md: 12,
  lg: 14,
}

const ink: Record<
  AnchorTone,
  { rest: string; hover: string; hoverOn: string; active: string; activeOn: string; visited: string }
> = {
  brand: {
    rest: 'text-text-link',
    hover: 'text-brand-primary-hover',
    hoverOn: 'hover:text-brand-primary-hover',
    active: 'text-brand-primary-active',
    activeOn: 'active:text-brand-primary-active',
    visited: 'text-brand-primary-active',
  },
  danger: {
    rest: 'text-danger',
    hover: 'text-danger-hover',
    hoverOn: 'hover:text-danger-hover',
    active: 'text-danger-hover',
    activeOn: 'active:text-danger-hover',
    visited: 'text-danger-hover',
  },
}

const UNDERLINE = 'underline decoration-[0.065em] underline-offset-[0.18em]'
const MOTION = cn('transition-transform duration-300 motion-reduce:transition-none', EASE)

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href)
}

function showLaunch(href: string, external: boolean | 'auto', target?: string) {
  if (external === false) return false
  if (external === true) return true
  return isExternalHref(href) || target === '_blank'
}

function ArrowMark({
  side,
  size,
  launch,
  filled,
  disabled,
}: {
  side: AnchorArrow
  size: AnchorSize
  launch: boolean
  filled: boolean
  disabled: boolean
}) {
  const Glyph = launch ? DkArrowUpRightLaunch : side === 'start' ? DkChevronCaretLeft : DkChevronCaretRight
  const glyph = (
    <Glyph size={ARROW_ICON[size]} strokeWidth={2.2} absoluteStrokeWidth className="shrink-0" aria-hidden />
  )
  const onBrand =
    disabled
      ? 'text-current'
      : filled
        ? 'text-text-on-brand'
        : 'text-current group-hover:text-text-on-brand group-focus-visible:text-text-on-brand group-active:text-text-on-brand'
  const circle = cn(
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-current',
    ARROW_CIRCLE[size],
    disabled
      ? 'bg-transparent'
      : filled
        ? 'bg-current'
        : cn(
            'bg-transparent transition-colors duration-300 motion-reduce:transition-none',
            EASE,
            'group-hover:bg-current group-focus-visible:bg-current group-active:bg-current',
          ),
  )

  if (launch || disabled) {
    return (
      <span className={circle}>
        <span className={cn('inline-flex', onBrand)}>{glyph}</span>
      </span>
    )
  }

  const restOut =
    side === 'start'
      ? 'group-hover:-translate-x-full group-focus-visible:-translate-x-full group-active:-translate-x-full'
      : 'group-hover:translate-x-full group-focus-visible:translate-x-full group-active:translate-x-full'
  const restIn =
    side === 'start'
      ? 'translate-x-full group-hover:translate-x-0 group-focus-visible:translate-x-0 group-active:translate-x-0'
      : '-translate-x-full group-hover:translate-x-0 group-focus-visible:translate-x-0 group-active:translate-x-0'
  const previewOut = side === 'start' ? '-translate-x-full' : 'translate-x-full'

  return (
    <span className={circle}>
      <span
        className={cn(
          'inline-flex size-full items-center justify-center',
          onBrand,
          MOTION,
          filled ? previewOut : restOut,
        )}
      >
        {glyph}
      </span>
      <span
        className={cn(
          'absolute inset-0 inline-flex items-center justify-center',
          onBrand,
          MOTION,
          filled ? 'translate-x-0' : restIn,
        )}
      >
        {glyph}
      </span>
    </span>
  )
}

type AnchorProps = {
  href?: string
  variant?: AnchorVariant
  size?: AnchorSize
  tone?: AnchorTone
  arrow?: AnchorArrow
  external?: boolean | 'auto'
  disabled?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  preview?: AnchorPreview
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export function Anchor({
  href,
  variant = 'inline',
  size = 'inherit',
  tone = 'brand',
  arrow,
  external = 'auto',
  disabled = false,
  leading,
  trailing,
  preview,
  className,
  children,
  target: targetProp,
  rel: relProp,
  type = 'button',
  ...rest
}: AnchorProps) {
  const asButton = href == null || href === ''
  const launch = href ? showLaunch(href, external, targetProp) : false
  const opensNew = !asButton && (targetProp === '_blank' || (external === true && targetProp !== '_self'))
  const target = targetProp ?? (opensNew ? '_blank' : undefined)
  const rel = relProp ?? (target === '_blank' ? 'noopener noreferrer' : undefined)
  const color = ink[tone]
  const icon = ICON_PX[size]
  const alwaysUnderline = variant === 'underline'
  const standalone = variant === 'standalone'
  const arrowSide = arrow ?? (variant === 'arrow' ? 'end' : undefined)
  const arrowed = arrowSide != null
  const filled = !disabled && (preview === 'hover' || preview === 'focus' || preview === 'active')
  const showChevron = standalone && !launch && !arrowed && trailing === undefined
  const mark =
    arrowed && trailing === undefined ? (
      <ArrowMark side={arrowSide} size={size} launch={launch} filled={filled} disabled={disabled} />
    ) : null
  const end =
    arrowed
      ? null
      : trailing !== undefined
        ? trailing
        : launch
          ? (
              <DkArrowUpRightLaunch
                size={icon}
                strokeWidth={2}
                absoluteStrokeWidth
                className="shrink-0 translate-y-[0.06em]"
                aria-hidden
              />
            )
          : showChevron
            ? (
                <DkChevronCaretRight
                  size={icon}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  className="shrink-0 translate-y-[0.05em]"
                  aria-hidden
                />
              )
            : null

  const forced =
    preview === 'hover'
      ? cn(color.hover, arrowed ? 'decoration-transparent' : 'decoration-current')
      : preview === 'focus'
        ? cn(
            color.hover,
            arrowed ? 'decoration-transparent' : 'decoration-current',
            'outline-2 outline-solid outline-offset-2 outline-brand-primary',
          )
        : preview === 'active'
          ? cn(color.active, arrowed ? 'decoration-transparent' : 'decoration-current')
          : preview === 'visited'
            ? cn(color.visited, alwaysUnderline ? 'decoration-current' : 'decoration-transparent')
            : undefined

  const classes = cn(
    'inline-flex max-w-full items-center font-sans',
    'rounded-[2px]',
    'transition-[color,text-decoration-color] duration-300',
    EASE,
    sizes[size],
    arrowed && 'group gap-2 font-medium',
    !arrowed && (standalone ? 'gap-1 font-medium' : 'gap-[0.2em] font-normal'),
    !arrowed && UNDERLINE,
    arrowed ? 'no-underline' : alwaysUnderline ? 'decoration-current' : 'decoration-transparent',
    asButton && 'border-0 bg-transparent p-0',
    disabled
      ? 'cursor-not-allowed text-text-disabled decoration-transparent'
      : cn(
          'cursor-pointer outline-none',
          variant === 'subtle' && !arrowed
            ? 'text-text-tertiary'
            : variant === 'plain' && !arrowed
              ? 'text-text-primary'
              : color.rest,
          color.hoverOn,
          !arrowed && 'hover:decoration-current',
          color.activeOn,
          !arrowed && 'focus-visible:decoration-current',
          'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        ),
    forced,
    className,
  )

  const content = (
    <>
      {leading}
      {arrowSide === 'start' ? mark : null}
      <span className={arrowed ? 'min-w-0 truncate' : undefined}>{children}</span>
      {arrowSide === 'end' ? mark : null}
      {end}
      {opensNew && !disabled ? <span className="sr-only"> (opens in a new window)</span> : null}
    </>
  )

  if (disabled) {
    return (
      <span role={asButton ? 'button' : 'link'} aria-disabled="true" className={classes}>
        {content}
      </span>
    )
  }

  if (asButton) {
    return (
      <button type={type} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    )
  }

  return (
    <Link href={href} target={target} rel={rel} className={classes} {...rest}>
      {content}
    </Link>
  )
}
