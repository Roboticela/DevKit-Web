import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Caption, Label } from './Text'

export type EmptyPopupVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type EmptyPopupSize = 'sm' | 'md' | 'lg'
export type EmptyPopupTone = 'default' | 'success' | 'warning' | 'danger'
export type EmptyPopupSurface = 'plain' | 'panel'

export const EMPTY_POPUP_VARIANTS: EmptyPopupVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const EMPTY_POPUP_SIZES: EmptyPopupSize[] = ['sm', 'md', 'lg']
export const EMPTY_POPUP_TONES: EmptyPopupTone[] = ['default', 'success', 'warning', 'danger']
export const EMPTY_POPUP_SURFACES: EmptyPopupSurface[] = ['plain', 'panel']

export const EMPTY_POPUP_VARIANT_LABEL: Record<EmptyPopupVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const EMPTY_POPUP_SIZE_LABEL: Record<EmptyPopupSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const EMPTY_POPUP_TONE_LABEL: Record<EmptyPopupTone, string> = {
  default: 'Default',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export const EMPTY_POPUP_SURFACE_LABEL: Record<EmptyPopupSurface, string> = {
  plain: 'Plain',
  panel: 'Panel',
}

const sizes: Record<
  EmptyPopupSize,
  { box: string; icon: string; well: string; action: string; panel: string }
> = {
  sm: {
    box: 'px-3 py-5',
    icon: '[&_svg]:size-5',
    well: 'size-9',
    action: 'mt-3 max-w-[160px]',
    panel: 'w-full min-w-[200px] max-w-[240px]',
  },
  md: {
    box: 'px-4 py-8',
    icon: '[&_svg]:size-6',
    well: 'size-11',
    action: 'mt-4 max-w-[200px]',
    panel: 'w-full min-w-[240px] max-w-[320px]',
  },
  lg: {
    box: 'px-5 py-10',
    icon: '[&_svg]:size-8',
    well: 'size-14',
    action: 'mt-5 max-w-[220px]',
    panel: 'w-full min-w-[280px] max-w-[400px]',
  },
}

function panelChrome(variant: EmptyPopupVariant): string {
  const chrome: Record<EmptyPopupVariant, string> = {
    fill: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    subtle: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    outline: 'border border-border-default bg-transparent',
    ghost: 'border border-transparent bg-transparent',
    pill: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
  }
  return chrome[variant]
}

function iconWell(variant: EmptyPopupVariant, surface: EmptyPopupSurface): string | null {
  if (variant === 'fill' || variant === 'ghost') return null
  if (surface === 'panel' && variant === 'outline') {
    return 'border border-border-default'
  }
  if (variant === 'outline') return 'border border-border-default'
  return 'bg-bg-tertiary dark:bg-bg-active'
}

const iconTone: Record<EmptyPopupTone, string> = {
  default: 'text-text-tertiary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export function EmptyPopup({
  icon,
  title,
  body,
  action,
  secondary,
  variant = 'fill',
  size = 'md',
  tone = 'default',
  surface = 'panel',
  className,
}: {
  icon?: ReactNode
  title: string
  body?: ReactNode
  action?: ReactNode
  secondary?: ReactNode
  variant?: EmptyPopupVariant
  size?: EmptyPopupSize
  tone?: EmptyPopupTone
  surface?: EmptyPopupSurface
  className?: string
}) {
  const titleId = useId()
  const metric = sizes[size]
  const well = iconWell(variant, surface)
  const inner = (
    <div
      role="status"
      aria-labelledby={titleId}
      className={cn(
        'flex w-full flex-col items-center text-center',
        metric.box,
        surface === 'plain' && variant !== 'fill' && variant !== 'ghost'
          ? cn(variant === 'pill' ? 'rounded-[24px]' : 'rounded-[18px]', panelChrome(variant))
          : null,
      )}
    >
      {icon ? (
        <div
          className={cn(
            'mb-3 inline-flex shrink-0 items-center justify-center',
            metric.icon,
            iconTone[tone],
            well ? cn(metric.well, 'rounded-full', well) : null,
          )}
        >
          {icon}
        </div>
      ) : null}
      {size === 'sm' || surface === 'plain' ? (
        <Label id={titleId} as={surface === 'plain' ? 'span' : 'h2'} align="center" tone="primary">
          {title}
        </Label>
      ) : (
        <Body id={titleId} as="h2" size="sm" align="center" tone="primary" className="font-medium">
          {title}
        </Body>
      )}
      {body ? (
        <Caption as="p" align="center" className="mt-1 max-w-[240px]">
          {body}
        </Caption>
      ) : null}
      {action || secondary ? (
        <div className={cn('flex w-full flex-col items-stretch gap-2', metric.action)}>
          {action}
          {secondary}
        </div>
      ) : null}
    </div>
  )

  if (surface === 'plain') {
    return <div className={cn('w-full', className)}>{inner}</div>
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden',
        variant === 'pill' ? 'rounded-[24px]' : 'rounded-2xl',
        panelChrome(variant),
        metric.panel,
        className,
      )}
    >
      {inner}
    </div>
  )
}
