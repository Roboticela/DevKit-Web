import { type MouseEventHandler, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  Stack,
  STACK_GAPS,
  STACK_GAP_LABEL,
  STACK_SIZES,
  STACK_SIZE_LABEL,
  STACK_TONES,
  STACK_TONE_LABEL,
  STACK_VARIANTS,
  STACK_VARIANT_LABEL,
  type StackGap,
  type StackPreview,
  type StackSize,
  type StackTone,
  type StackVariant,
} from './Stack'
import { Caption } from './Text'

export type StateCardVariant = StackVariant
export type StateCardSize = StackSize
export type StateCardTone = StackTone
export type StateCardPreview = StackPreview
export type StateCardGap = StackGap
export type StateCardAlign = 'center' | 'start' | 'stretch'

export const STATE_CARD_VARIANTS = STACK_VARIANTS
export const STATE_CARD_SIZES = STACK_SIZES
export const STATE_CARD_TONES = STACK_TONES
export const STATE_CARD_GAPS = STACK_GAPS
export const STATE_CARD_ALIGNS: StateCardAlign[] = ['center', 'start', 'stretch']

export const STATE_CARD_VARIANT_LABEL = STACK_VARIANT_LABEL
export const STATE_CARD_SIZE_LABEL = STACK_SIZE_LABEL
export const STATE_CARD_TONE_LABEL = STACK_TONE_LABEL
export const STATE_CARD_GAP_LABEL = STACK_GAP_LABEL
export const STATE_CARD_ALIGN_LABEL: Record<StateCardAlign, string> = {
  center: 'Center',
  start: 'Start',
  stretch: 'Stretch',
}

export type StateCardProps = {
  children?: ReactNode
  label?: string
  variant?: StateCardVariant
  size?: StateCardSize
  tone?: StateCardTone
  gap?: StateCardGap
  align?: StateCardAlign
  inert?: boolean
  wide?: boolean
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: StateCardPreview
  onDark?: boolean
  className?: string
}

const wellMin: Record<StateCardSize, string> = {
  sm: 'min-h-[72px]',
  md: 'min-h-[100px]',
  lg: 'min-h-[168px]',
}

export function StateCard({
  children,
  label,
  variant = 'subtle',
  size = 'md',
  tone = 'default',
  gap = 'sm',
  align = 'center',
  inert = false,
  wide = false,
  selected = false,
  loading = false,
  disabled = false,
  fullWidth = true,
  fullHeight = false,
  href,
  onClick,
  preview,
  onDark = false,
  className,
}: StateCardProps) {
  const sample =
    children == null ? null : align === 'stretch' ? (
      <div className={cn('w-full min-w-0', !wide && 'max-w-[320px]')}>{children}</div>
    ) : (
      <div className="min-w-0 max-w-full">{children}</div>
    )

  const well =
    sample == null ? null : (
      <div
        className={cn(
          'flex w-full min-w-0',
          wellMin[size],
          align === 'center' && 'items-center justify-center',
          align === 'start' && 'items-center justify-start',
          align === 'stretch' && 'items-center justify-center',
          inert && 'pointer-events-none',
        )}
      >
        {sample}
      </div>
    )

  const caption = label ? (
    <Caption
      align="center"
      className={cn('w-full', onDark && '!text-[#a1a1a6]')}
    >
      {label}
    </Caption>
  ) : null

  return (
    <Stack
      variant={variant}
      size={size}
      tone={tone}
      gap={gap}
      selected={selected}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      href={href}
      onClick={onClick}
      preview={preview}
      onDark={onDark}
      className={className}
    >
      {well}
      {caption}
    </Stack>
  )
}

StateCard.displayName = 'StateCard'
