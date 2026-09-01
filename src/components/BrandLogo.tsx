import type { HTMLAttributes } from 'react'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'

export type BrandLogoVariant = 'mark' | 'icon' | 'text' | 'lockup'

type BrandLogoProps = {
  className?: string
  size?: number
  variant?: BrandLogoVariant
  alt?: string
  primary?: string
  secondary?: string
  labelClassName?: string
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

function DevKitSvg({
  size,
  className,
  title,
}: {
  size: number
  className?: string
  title?: string
}) {
  const labelled = Boolean(title)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('block', className)}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8L6 12L10 16"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8L18 12L14 16"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BrandLogo({
  className,
  size = 20,
  variant = 'mark',
  alt,
  primary,
  secondary,
  labelClassName,
  ...rest
}: BrandLogoProps) {
  const title = primary ?? (variant === 'lockup' ? brand.companyName : brand.name)
  const subtitle = secondary ?? brand.name
  const label =
    alt ?? (variant === 'lockup' ? `${title} ${subtitle}` : variant === 'text' ? title : brand.name)
  const decorative = variant === 'text' || variant === 'lockup' || alt === ''

  const mark = (
    <DevKitSvg
      className={variant === 'mark' || variant === 'icon' ? className : 'shrink-0'}
      size={size}
      title={decorative ? undefined : label}
    />
  )

  if (variant === 'mark' || variant === 'icon') {
    return (
      <span className="dk-brand-logo inline-flex" {...rest}>
        {mark}
      </span>
    )
  }

  return (
    <span className={cn('dk-brand-logo inline-flex items-center gap-2 text-text-primary', className)} {...rest}>
      {mark}
      <span
        className={cn(
          'whitespace-nowrap text-[13px] font-semibold leading-none tracking-[-0.01em]',
          labelClassName,
        )}
      >
        {variant === 'lockup' ? (
          <>
            {title} <span className="font-medium text-text-secondary">{subtitle}</span>
          </>
        ) : (
          title
        )}
      </span>
    </span>
  )
}
