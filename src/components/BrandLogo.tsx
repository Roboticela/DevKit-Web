import type { HTMLAttributes } from 'react'
import { DkDevKitBrandLogo } from '@/icons'
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
    <DkDevKitBrandLogo
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
