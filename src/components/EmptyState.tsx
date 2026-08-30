import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Heading, Label } from './Text'

export type EmptyStateVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type EmptyStateSize = 'sm' | 'md' | 'lg'
export type EmptyStateTone = 'default' | 'success' | 'warning' | 'danger'
export type EmptyStateAlign = 'center' | 'start'

export const EMPTY_STATE_VARIANTS: EmptyStateVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const EMPTY_STATE_SIZES: EmptyStateSize[] = ['sm', 'md', 'lg']
export const EMPTY_STATE_TONES: EmptyStateTone[] = ['default', 'success', 'warning', 'danger']
export const EMPTY_STATE_ALIGNS: EmptyStateAlign[] = ['center', 'start']

export const EMPTY_STATE_VARIANT_LABEL: Record<EmptyStateVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const EMPTY_STATE_SIZE_LABEL: Record<EmptyStateSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const EMPTY_STATE_TONE_LABEL: Record<EmptyStateTone, string> = {
  default: 'Default',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

const sizes: Record<
  EmptyStateSize,
  { box: string; icon: string; well: string; action: string; body: 'md' | 'sm' }
> = {
  sm: {
    box: 'px-4 py-8',
    icon: '[&_svg]:size-6',
    well: 'size-11',
    action: 'mt-5 max-w-[200px]',
    body: 'sm',
  },
  md: {
    box: 'px-6 py-12',
    icon: '[&_svg]:size-8',
    well: 'size-14',
    action: 'mt-6 max-w-[240px]',
    body: 'sm',
  },
  lg: {
    box: 'px-8 py-16',
    icon: '[&_svg]:size-12',
    well: 'size-16',
    action: 'mt-8 max-w-[240px]',
    body: 'md',
  },
}

function trackChrome(variant: EmptyStateVariant, onDark: boolean): string {
  const rest = onDark ? 'bg-[#2c2c2e]' : 'bg-bg-secondary'
  const chrome: Record<EmptyStateVariant, string> = {
    fill: 'bg-transparent',
    subtle: rest,
    outline: cn('border bg-transparent', onDark ? 'border-[#48484a]' : 'border-border-default'),
    ghost: 'bg-transparent',
    pill: rest,
  }
  return chrome[variant]
}

function iconWell(variant: EmptyStateVariant, onDark: boolean): string | null {
  if (variant === 'fill' || variant === 'ghost') return null
  if (variant === 'outline') {
    return cn('border', onDark ? 'border-[#48484a]' : 'border-border-default')
  }
  return onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary'
}

const iconTone: Record<EmptyStateTone, { rest: string; dark: string }> = {
  default: { rest: 'text-text-tertiary', dark: 'text-[#a1a1a6]' },
  success: { rest: 'text-success', dark: 'text-success' },
  warning: { rest: 'text-warning', dark: 'text-warning' },
  danger: { rest: 'text-danger', dark: 'text-danger' },
}

export function EmptyState({
  icon,
  title,
  body,
  action,
  secondary,
  variant = 'fill',
  size = 'md',
  tone = 'default',
  align = 'center',
  onDark = false,
  className,
}: {
  icon?: ReactNode
  title: string
  body?: ReactNode
  action?: ReactNode
  secondary?: ReactNode
  variant?: EmptyStateVariant
  size?: EmptyStateSize
  tone?: EmptyStateTone
  align?: EmptyStateAlign
  onDark?: boolean
  className?: string
}) {
  const titleId = useId()
  const metric = sizes[size]
  const well = iconWell(variant, onDark)
  const paint = iconTone[tone]
  const centered = align === 'center'

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      className={cn(
        'flex w-full flex-col',
        metric.box,
        centered ? 'items-center text-center' : 'items-start text-start',
        variant === 'pill' ? 'rounded-[24px]' : 'rounded-[18px]',
        trackChrome(variant, onDark),
        className,
      )}
    >
      {icon ? (
        <div
          className={cn(
            'mb-4 inline-flex shrink-0 items-center justify-center',
            metric.icon,
            onDark ? paint.dark : paint.rest,
            well ? cn(metric.well, 'rounded-full', well) : null,
          )}
        >
          {icon}
        </div>
      ) : null}
      {size === 'sm' ? (
        <Label
          id={titleId}
          as="h2"
          align={centered ? 'center' : 'start'}
          tone={onDark ? undefined : 'primary'}
          className={onDark ? '!text-white' : undefined}
        >
          {title}
        </Label>
      ) : (
        <Heading
          id={titleId}
          level={3}
          align={centered ? 'center' : 'start'}
          tone={onDark ? undefined : 'primary'}
          className={onDark ? '!text-white' : undefined}
        >
          {title}
        </Heading>
      )}
      {body ? (
        <Body
          size={metric.body}
          align={centered ? 'center' : 'start'}
          tone={onDark ? undefined : 'secondary'}
          className={cn('mt-2 max-w-[360px]', onDark && '!text-[#a1a1a6]')}
        >
          {body}
        </Body>
      ) : null}
      {action || secondary ? (
        <div
          className={cn(
            'flex w-full flex-col gap-3',
            metric.action,
            centered ? 'items-stretch' : 'items-start',
          )}
        >
          {action}
          {secondary}
        </div>
      ) : null}
    </div>
  )
}
