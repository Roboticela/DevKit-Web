/* eslint-disable @next/next/no-img-element */
import { countryFlagUrl } from './countries'
import { cn } from './cn'
export function CountryFlag({
  iso,
  size = 18,
  className = '',
  alt,
}: {
  iso: string
  size?: number
  className?: string
  alt?: string
}) {
  const code = iso.trim().toLowerCase()
  if (!code) return null

  return (
    <img
      className={cn('country-flag block object-cover', className)}
      src={countryFlagUrl(code, size <= 20 ? 40 : 80)}
      srcSet={`${countryFlagUrl(code, 40)} 1x, ${countryFlagUrl(code, 80)} 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
