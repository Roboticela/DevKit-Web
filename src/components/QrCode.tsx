'use client'

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import QRCode from 'qrcode'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import {
  encodeQrContent,
  type QrContent,
} from '@/lib/qr-content'
import { Caption } from './Text'

export type QrCodeVariant = 'outline' | 'subtle' | 'ghost' | 'embedded' | 'branded'
export type QrCodeSize = 'sm' | 'md' | 'lg'
export type QrCodeLogo = false | 'brand' | string | ReactNode

export const QR_CODE_VARIANTS: QrCodeVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'embedded',
  'branded',
]
export const QR_CODE_SIZES: QrCodeSize[] = ['sm', 'md', 'lg']

const PIXEL_SIZE: Record<QrCodeSize, number> = {
  sm: 140,
  md: 180,
  lg: 220,
}

const FRAME_SIZE: Record<QrCodeSize, string> = {
  sm: 'size-[140px]',
  md: 'size-[180px]',
  lg: 'size-[220px]',
}

const LOGO_PIXEL: Record<QrCodeSize, number> = {
  sm: 28,
  md: 36,
  lg: 44,
}

const LOGO_BADGE: Record<QrCodeSize, string> = {
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-14',
}

const chrome: Record<QrCodeVariant, string> = {
  outline: 'border border-border-default bg-bg-elevated p-3 dark:bg-bg-secondary',
  subtle: 'border border-transparent bg-bg-tertiary p-3',
  ghost: 'border border-transparent bg-transparent p-2',
  embedded: 'border border-transparent bg-transparent p-0',
  branded: 'border border-brand-primary/30 bg-brand-primary-subtle p-3',
}

export {
  buildEmailQrValue,
  buildGeoQrValue,
  buildPhoneQrValue,
  buildSmsQrValue,
  buildTextQrValue,
  buildTotpAuthUri,
  buildUrlQrValue,
  buildWifiQrValue,
  encodeQrContent,
  QR_CONTENT_KINDS,
} from '@/lib/qr-content'
export type { QrContent, QrContentKind } from '@/lib/qr-content'

function resolveEncodedValue(value?: string, content?: QrContent) {
  if (content) return encodeQrContent(content)
  return value?.trim() ?? ''
}

function resolveLogo(logo: QrCodeLogo): QrCodeLogo | false {
  return logo === false ? false : logo
}

function QrLogoBadge({
  logo,
  size,
}: {
  logo: Exclude<QrCodeLogo, false>
  size: QrCodeSize
}) {
  const px = LOGO_PIXEL[size]

  if (logo === 'brand') {
    return (
      <img
        src={brand.iconSrc}
        alt=""
        width={px}
        height={px}
        className="block size-full object-contain"
        decoding="async"
      />
    )
  }

  if (typeof logo === 'string') {
    return (
      <img
        src={logo}
        alt=""
        width={px}
        height={px}
        className="block size-full object-contain"
        decoding="async"
      />
    )
  }

  return <>{logo}</>
}

export function QrCode({
  value,
  content,
  alt = 'QR code',
  size = 'md',
  variant = 'outline',
  logo = 'brand',
  loading = false,
  error = false,
  expired = false,
  disabled = false,
  errorMessage = 'Could not load QR code',
  expiredMessage = 'Expired',
  className,
}: {
  value?: string
  content?: QrContent
  alt?: string
  size?: QrCodeSize
  variant?: QrCodeVariant
  logo?: QrCodeLogo
  loading?: boolean
  error?: boolean
  expired?: boolean
  disabled?: boolean
  errorMessage?: string
  expiredMessage?: string
  className?: string
}) {
  const pixelSize = PIXEL_SIZE[size]
  const encodedValue = useMemo(() => resolveEncodedValue(value, content), [value, content])
  const activeLogo = resolveLogo(logo)
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState(false)

  const showError = error || generateError || (!loading && !encodedValue)
  const showLoading = loading || (!showError && !dataUrl)

  useEffect(() => {
    if (loading || error) {
      setDataUrl(null)
      setGenerateError(false)
      return
    }

    if (!encodedValue) {
      setDataUrl(null)
      setGenerateError(true)
      return
    }

    let cancelled = false
    setGenerateError(false)
    setDataUrl(null)

    void QRCode.toDataURL(encodedValue, {
      width: pixelSize,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
      errorCorrectionLevel: activeLogo ? 'H' : 'M',
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) setGenerateError(true)
      })

    return () => {
      cancelled = true
    }
  }, [encodedValue, loading, error, pixelSize, activeLogo])

  const frameClassName = useMemo(
    () =>
      cn(
        'flex w-full flex-col items-center gap-2',
        !className && 'mt-6',
        disabled && 'opacity-50',
        className,
      ),
    [className, disabled],
  )

  const matrixRadius = variant === 'embedded' ? 'rounded-[12px]' : 'rounded-[8px]'

  if (showError) {
    return (
      <div className={frameClassName} aria-disabled={disabled || undefined}>
        <div
          className={cn(
            'flex items-center justify-center rounded-[12px] border border-border-danger bg-bg-tertiary',
            FRAME_SIZE[size],
            chrome[variant],
          )}
          role="img"
          aria-label={alt}
        >
          <Caption align="center" className="max-w-[120px] px-3 text-danger">
            {errorMessage}
          </Caption>
        </div>
      </div>
    )
  }

  if (showLoading) {
    return (
      <div className={frameClassName} aria-disabled={disabled || undefined}>
        <div
          className={cn('overflow-hidden rounded-[12px]', chrome[variant])}
          aria-busy="true"
          aria-label="Loading QR code"
        >
          <div className={cn('animate-pulse bg-white', matrixRadius, FRAME_SIZE[size])} />
        </div>
      </div>
    )
  }

  return (
    <div className={frameClassName} aria-disabled={disabled || undefined}>
      <div className={cn('overflow-hidden rounded-[12px]', chrome[variant])}>
        <div className={cn('relative', FRAME_SIZE[size])}>
          <img
            className={cn(
              'block bg-white',
              matrixRadius,
              FRAME_SIZE[size],
              expired && 'opacity-40',
            )}
            src={dataUrl ?? undefined}
            alt={alt}
            width={pixelSize}
            height={pixelSize}
            decoding="async"
          />

          {activeLogo ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  'flex items-center justify-center rounded-[8px] bg-white',
                  LOGO_BADGE[size],
                )}
              >
                <QrLogoBadge logo={activeLogo} size={size} />
              </div>
            </div>
          ) : null}

          {expired ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-[8px] bg-bg-overlay/20">
              <Caption className="rounded-[8px] bg-bg-elevated px-3 py-1.5 text-text-primary">
                {expiredMessage}
              </Caption>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
