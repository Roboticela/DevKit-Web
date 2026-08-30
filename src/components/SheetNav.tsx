import type { ReactNode } from 'react'
import { DkChevronCaretLeft, DkCloseDismissCancel } from '@/icons'
import { cn } from '@/lib/cn'
import { Anchor, type AnchorPreview } from './Anchor'
import { Loader } from './Loader'
import { Caption } from './Text'

export type SheetNavVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type SheetNavLayout = 'plain' | 'close' | 'back' | 'large' | 'prominent'
export type SheetNavSize = 'sm' | 'md' | 'lg'
export type SheetNavTone = 'brand' | 'danger'
export type SheetNavPreview = 'hover' | 'active' | 'disabled'

export const SHEET_NAV_VARIANTS: SheetNavVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const SHEET_NAV_LAYOUTS: SheetNavLayout[] = ['plain', 'close', 'back', 'large', 'prominent']
export const SHEET_NAV_SIZES: SheetNavSize[] = ['sm', 'md', 'lg']
export const SHEET_NAV_TONES: SheetNavTone[] = ['brand', 'danger']

export const SHEET_NAV_VARIANT_LABEL: Record<SheetNavVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SHEET_NAV_LAYOUT_LABEL: Record<SheetNavLayout, string> = {
  plain: 'Plain',
  close: 'Close',
  back: 'Back',
  large: 'Large',
  prominent: 'Prominent',
}

export const SHEET_NAV_SIZE_LABEL: Record<SheetNavSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const SHEET_NAV_TONE_LABEL: Record<SheetNavTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

const sizes: Record<
  SheetNavSize,
  {
    bar: string
    pad: string
    type: string
    done: string
    close: string
    chevron: number
    mark: number
    pill: string
    inset: string
    anchor: 'sm' | 'md' | 'lg'
  }
> = {
  sm: {
    bar: 'min-h-11',
    pad: 'px-3',
    type: 'text-[15px] tracking-[-0.01em]',
    done: 'h-7 px-3 text-[13px]',
    close: 'size-7',
    chevron: 20,
    mark: 13,
    pill: 'mx-2 mt-2 rounded-[12px]',
    inset: 'inset-x-14',
    anchor: 'md',
  },
  md: {
    bar: 'min-h-[52px]',
    pad: 'px-4 min-[735px]:px-5',
    type: 'text-[17px] tracking-[-0.01em]',
    done: 'h-8 px-3.5 text-[15px]',
    close: 'size-8',
    chevron: 22,
    mark: 14,
    pill: 'mx-2 mt-2 rounded-[14px]',
    inset: 'inset-x-16 min-[735px]:inset-x-[72px]',
    anchor: 'md',
  },
  lg: {
    bar: 'min-h-14',
    pad: 'px-4 min-[735px]:px-6',
    type: 'text-[17px] tracking-[-0.01em]',
    done: 'h-9 px-4 text-[17px]',
    close: 'size-9',
    chevron: 24,
    mark: 16,
    pill: 'mx-3 mt-3 rounded-[16px]',
    inset: 'inset-x-[72px] min-[735px]:inset-x-20',
    anchor: 'lg',
  },
}

function trackChrome(variant: SheetNavVariant, onDark: boolean, metric: (typeof sizes)[SheetNavSize]) {
  const line = onDark ? 'border-[#38383a]' : 'border-border-default'
  const faint = onDark ? 'border-[#2c2c2e]' : 'border-border-subtle'
  const chrome: Record<SheetNavVariant, string> = {
    fill: cn('bg-transparent border-b', faint),
    subtle: cn(onDark ? 'bg-[#1c1c1e]' : 'bg-bg-secondary', 'border-b', faint),
    outline: cn('bg-transparent border-b', line),
    ghost: 'bg-transparent',
    pill: cn(onDark ? 'bg-[#2c2c2e]' : 'bg-bg-tertiary', metric.pill),
  }
  return chrome[variant]
}

function inkPreview(preview?: SheetNavPreview): AnchorPreview | undefined {
  if (preview === 'hover' || preview === 'active') return preview
  return undefined
}

export function SheetNav({
  title,
  subtitle,
  cancelLabel = 'Cancel',
  doneLabel = 'Done',
  onCancel,
  onDone,
  cancelDisabled,
  doneDisabled,
  leading,
  trailing,
  variant = 'fill',
  layout = 'plain',
  size = 'md',
  tone = 'brand',
  loading = false,
  loadingText,
  onDark = false,
  preview,
  className,
}: {
  title: string
  subtitle?: string
  cancelLabel?: string
  doneLabel?: ReactNode
  onCancel: () => void
  onDone?: () => void
  cancelDisabled?: boolean
  doneDisabled?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  variant?: SheetNavVariant
  layout?: SheetNavLayout
  size?: SheetNavSize
  tone?: SheetNavTone
  loading?: boolean
  loadingText?: string
  onDark?: boolean
  preview?: SheetNavPreview
  className?: string
}) {
  const metric = sizes[size]
  const large = layout === 'large'
  const prominent = layout === 'prominent'
  const close = layout === 'close'
  const back = layout === 'back'
  const cancelOff = cancelDisabled || loading || preview === 'disabled'
  const doneDimmed = doneDisabled || preview === 'disabled'
  const showDone = trailing != null || onDone != null || doneLabel !== 'Done'
  const brand = tone === 'brand'
  const titleTone = onDark ? 'text-white' : 'text-text-primary'
  const subTone = onDark ? 'text-[#a1a1a6]' : 'text-text-tertiary'
  const resolvedCancel =
    close && cancelLabel === 'Cancel'
      ? 'Close'
      : back && cancelLabel === 'Cancel'
        ? 'Back'
        : cancelLabel
  const doneIsText = typeof doneLabel === 'string' || doneLabel == null
  const doneWord = typeof doneLabel === 'string' ? doneLabel : 'Done'
  const doneBody =
    loading && doneIsText ? (
      <span className="inline-flex items-center justify-center gap-1.5">
        <Loader decorative size={14} onDark={prominent} tone={brand ? 'brand' : 'danger'} />
        <span>{loadingText ?? doneWord}</span>
      </span>
    ) : (
      (doneLabel ?? 'Done')
    )
  const forced = inkPreview(preview)

  const leadingControl =
    leading ??
    (close ? (
      <Anchor
        variant="plain"
        size="inherit"
        disabled={cancelOff}
        preview={forced}
        aria-label={resolvedCancel}
        onClick={onCancel}
        className={cn(
          'relative z-[1] min-h-11 items-center justify-center no-underline',
          metric.close,
          'rounded-full decoration-transparent hover:decoration-transparent',
        )}
      >
        <span
          className={cn(
            'inline-flex size-full items-center justify-center rounded-full',
            onDark ? 'bg-[#3a3a3c] text-white' : 'bg-bg-tertiary',
          )}
        >
          <DkCloseDismissCancel size={metric.mark} strokeWidth={2.2} absoluteStrokeWidth aria-hidden />
        </span>
      </Anchor>
    ) : (
      <Anchor
        variant="inline"
        size={metric.anchor}
        tone="brand"
        disabled={cancelOff}
        preview={forced}
        onClick={onCancel}
        leading={
          back ? (
            <DkChevronCaretLeft
              size={metric.chevron}
              strokeWidth={2.2}
              absoluteStrokeWidth
              aria-hidden
              className="shrink-0 -ml-1"
            />
          ) : undefined
        }
        className="relative z-[1] min-h-11"
      >
        {resolvedCancel}
      </Anchor>
    ))

  const trailingControl =
    trailing ??
    (showDone ? (
      <Anchor
        variant={prominent ? 'plain' : 'standalone'}
        size={prominent ? 'inherit' : metric.anchor}
        tone={tone}
        trailing={prominent ? undefined : null}
        disabled={doneDimmed}
        preview={forced}
        aria-busy={loading || undefined}
        onClick={loading ? undefined : onDone}
        className={cn(
          'relative z-[1]',
          prominent
            ? cn(
                metric.done,
                'items-center justify-center rounded-[980px] font-medium decoration-transparent',
                'hover:decoration-transparent focus-visible:decoration-transparent',
                doneDimmed
                  ? brand
                    ? 'bg-brand-primary-disabled text-text-on-brand/70'
                    : 'bg-danger/40 text-text-on-brand/70'
                  : brand
                    ? cn(
                        'bg-brand-primary text-text-on-brand',
                        'hover:bg-brand-primary-hover hover:text-text-on-brand',
                        'active:bg-brand-primary-active active:text-text-on-brand',
                      )
                    : cn(
                        'bg-danger text-text-on-brand',
                        'hover:bg-danger-hover hover:text-text-on-brand',
                        'active:bg-danger-hover active:text-text-on-brand',
                      ),
              )
            : 'min-h-11 font-semibold',
        )}
      >
        {doneBody}
      </Anchor>
    ) : (
      <span className="inline-flex min-h-11 min-w-8" aria-hidden />
    ))

  return (
    <header
      className={cn(
        'flex w-full shrink-0 flex-col',
        trackChrome(variant, onDark, metric),
        className,
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-between gap-2',
          metric.bar,
          subtitle && !large && 'min-h-[60px]',
          metric.pad,
          'pt-[max(8px,env(safe-area-inset-top))]',
          large ? 'pb-1' : 'pb-1.5',
        )}
      >
        <div className="flex min-w-0 items-center justify-start">{leadingControl}</div>

        {large ? null : (
          <div
            className={cn(
              'pointer-events-none absolute flex min-w-0 flex-col items-center justify-center',
              metric.inset,
              'top-1/2 -translate-y-1/2',
            )}
          >
            <h2
              className={cn(
                'm-0 w-full truncate text-center font-semibold leading-[1.14]',
                metric.type,
                titleTone,
              )}
            >
              {title}
            </h2>
            {subtitle ? (
              <Caption align="center" className={cn('mt-0.5 w-full truncate', subTone)}>
                {subtitle}
              </Caption>
            ) : null}
          </div>
        )}

        <div className="flex min-w-0 items-center justify-end">{trailingControl}</div>
      </div>

      {large ? (
        <div className={cn(metric.pad, 'pb-3 pt-1 min-[735px]:pb-4')}>
          <h2
            className={cn(
              'm-0 truncate font-semibold tracking-[-0.01em] leading-[1.1]',
              'text-[28px] min-[735px]:text-[34px]',
              titleTone,
            )}
          >
            {title}
          </h2>
          {subtitle ? (
            <Caption className={cn('mt-1', subTone)}>{subtitle}</Caption>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
