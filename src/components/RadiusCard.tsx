import { type MouseEventHandler } from 'react'
import { cn } from '@/lib/cn'
import {
  Stack,
  STACK_SIZES,
  STACK_SIZE_LABEL,
  STACK_TONES,
  STACK_TONE_LABEL,
  STACK_VARIANTS,
  STACK_VARIANT_LABEL,
  type StackPreview,
  type StackSize,
  type StackTone,
  type StackVariant,
} from './Stack'
import { Caption, Label } from './Text'

export type RadiusCardVariant = StackVariant
export type RadiusCardSize = StackSize
export type RadiusCardTone = StackTone
export type RadiusCardPreview = StackPreview

export const RADIUS_CARD_VARIANTS = STACK_VARIANTS
export const RADIUS_CARD_SIZES = STACK_SIZES
export const RADIUS_CARD_TONES = STACK_TONES

export const RADIUS_CARD_VARIANT_LABEL = STACK_VARIANT_LABEL
export const RADIUS_CARD_SIZE_LABEL = STACK_SIZE_LABEL
export const RADIUS_CARD_TONE_LABEL = STACK_TONE_LABEL

export const RADIUS_CARD_SCALE = [8, 12, 18, 980] as const
export type RadiusCardValue = (typeof RADIUS_CARD_SCALE)[number]

export const RADIUS_CARD_VALUE_LABEL: Record<RadiusCardValue, string> = {
  8: 'Control',
  12: 'Card',
  18: 'Panel',
  980: 'Pill',
}

export const RADIUS_CARD_VALUE_USE: Record<RadiusCardValue, string> = {
  8: 'Text fields, compact menus, and 44px inputs.',
  12: 'Small cards, grouped lists, and docs panels.',
  18: 'Large cards, images, and dialogs.',
  980: 'Buttons, switches, and chip-like controls.',
}

export type RadiusCardProps = {
  value?: number
  label?: string
  use?: string
  named?: boolean
  variant?: RadiusCardVariant
  size?: RadiusCardSize
  tone?: RadiusCardTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: RadiusCardPreview
  onDark?: boolean
  className?: string
}

const sampleSize: Record<RadiusCardSize, string> = {
  sm: 'h-11 w-16',
  md: 'h-11 w-[72px]',
  lg: 'h-14 w-24',
}

export function RadiusCard({
  value,
  label,
  use,
  named = true,
  variant = 'subtle',
  size = 'md',
  tone = 'default',
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
}: RadiusCardProps) {
  const caption = named && (label || use || value != null)

  return (
    <Stack
      variant={variant}
      size={size}
      tone={tone}
      direction="horizontal"
      align="center"
      gap="md"
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
      <div
        className={cn(
          'shrink-0',
          sampleSize[size],
          onDark ? 'bg-[#2c2c2e]' : 'bg-bg-tertiary',
        )}
        style={value != null ? { borderRadius: value } : undefined}
      />
      {caption ? (
        <div className="min-w-0">
          {named && label ? (
            <Label as="p" className={cn(onDark && '!text-white')}>
              {label}
            </Label>
          ) : null}
          {named && value != null ? (
            <Caption className={cn('mt-1 font-mono', onDark && '!text-[#a1a1a6]')}>
              {value}px
            </Caption>
          ) : null}
          {named && use ? (
            <Caption tone="secondary" className={cn('mt-1', onDark && '!text-[#a1a1a6]')}>
              {use}
            </Caption>
          ) : null}
        </div>
      ) : null}
    </Stack>
  )
}

RadiusCard.displayName = 'RadiusCard'
