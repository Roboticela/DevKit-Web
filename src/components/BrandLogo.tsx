/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from 'react'
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
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>

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
  const src = variant === 'icon' ? brand.iconSrc : brand.logoSrc
  const title = primary ?? (variant === 'lockup' ? brand.companyName : brand.name)
  const subtitle = secondary ?? brand.name
  const label =
    alt ?? (variant === 'lockup' ? `${title} ${subtitle}` : variant === 'text' ? title : brand.name)

  const mark = (
    <img
      className={cn('block object-contain', variant === 'mark' || variant === 'icon' ? className : 'shrink-0')}
      src={src}
      alt={variant === 'mark' || variant === 'icon' ? label : ''}
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      {...rest}
    />
  )

  if (variant === 'mark' || variant === 'icon') {
    return mark
  }

  return (
    <span className={cn('inline-flex items-center gap-2 text-text-primary', className)}>
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
