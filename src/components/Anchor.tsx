import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { DkArrowUpRightLaunch, DkChevronCaretRight } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

export type AnchorVariant = 'inline' | 'subtle' | 'underline' | 'plain' | 'standalone'
export type AnchorSize = 'inherit' | 'sm' | 'md' | 'lg'
export type AnchorTone = 'brand' | 'danger'
export type AnchorPreview = 'hover' | 'focus' | 'active' | 'visited'

export const ANCHOR_VARIANTS: AnchorVariant[] = [
  'inline',
  'subtle',
  'underline',
  'plain',
  'standalone',
]
export const ANCHOR_SIZES: AnchorSize[] = ['inherit', 'sm', 'md', 'lg']
export const ANCHOR_TONES: AnchorTone[] = ['brand', 'danger']

export const ANCHOR_VARIANT_LABEL: Record<AnchorVariant, string> = {
  inline: 'Inline',
  subtle: 'Subtle',
  underline: 'Underline',
  plain: 'Plain',
  standalone: 'Standalone',
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

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href)
}

function showLaunch(href: string, external: boolean | 'auto', target?: string) {
  if (external === false) return false
  if (external === true) return true
  return isExternalHref(href) || target === '_blank'
}

type AnchorProps = {
  href?: string
  variant?: AnchorVariant
  size?: AnchorSize
  tone?: AnchorTone
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
  const showChevron = standalone && !launch && trailing === undefined
  const end =
    trailing !== undefined ? (
      trailing
    ) : launch ? (
      <DkArrowUpRightLaunch
        size={icon}
        strokeWidth={2}
        absoluteStrokeWidth
        className="shrink-0 translate-y-[0.06em]"
        aria-hidden
      />
    ) : showChevron ? (
      <DkChevronCaretRight
        size={icon}
        strokeWidth={2}
        absoluteStrokeWidth
        className="shrink-0 translate-y-[0.05em]"
        aria-hidden
      />
    ) : null

  const forced =
    preview === 'hover'
      ? cn(color.hover, 'decoration-current')
      : preview === 'focus'
        ? cn(
            color.hover,
            'decoration-current outline-2 outline-solid outline-offset-2 outline-brand-primary',
          )
        : preview === 'active'
          ? cn(color.active, 'decoration-current')
          : preview === 'visited'
            ? cn(color.visited, alwaysUnderline ? 'decoration-current' : 'decoration-transparent')
            : undefined

  const classes = cn(
    'inline-flex max-w-full items-center font-sans',
    'rounded-[2px]',
    'transition-[color,text-decoration-color] duration-300',
    EASE,
    sizes[size],
    standalone ? 'gap-1 font-medium' : 'gap-[0.2em] font-normal',
    UNDERLINE,
    alwaysUnderline ? 'decoration-current' : 'decoration-transparent',
    asButton && 'border-0 bg-transparent p-0',
    disabled
      ? 'cursor-not-allowed text-text-disabled decoration-transparent'
      : cn(
          'cursor-pointer outline-none',
          variant === 'subtle' ? 'text-text-tertiary' : variant === 'plain' ? 'text-text-primary' : color.rest,
          color.hoverOn,
          'hover:decoration-current',
          color.activeOn,
          'focus-visible:decoration-current',
          'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        ),
    forced,
    className,
  )

  const content = (
    <>
      {leading}
      <span>{children}</span>
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
