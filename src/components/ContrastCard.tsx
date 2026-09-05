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

export type ContrastCardVariant = StackVariant
export type ContrastCardSize = StackSize
export type ContrastCardTone = StackTone
export type ContrastCardPreview = StackPreview

export const CONTRAST_CARD_VARIANTS = STACK_VARIANTS
export const CONTRAST_CARD_SIZES = STACK_SIZES
export const CONTRAST_CARD_TONES = STACK_TONES

export const CONTRAST_CARD_VARIANT_LABEL = STACK_VARIANT_LABEL
export const CONTRAST_CARD_SIZE_LABEL = STACK_SIZE_LABEL
export const CONTRAST_CARD_TONE_LABEL = STACK_TONE_LABEL

export type ContrastCardProps = {
  fg?: string
  bg?: string
  label?: string
  sample?: string
  named?: boolean
  variant?: ContrastCardVariant
  size?: ContrastCardSize
  tone?: ContrastCardTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: ContrastCardPreview
  onDark?: boolean
  className?: string
}

const wellMin: Record<ContrastCardSize, string> = {
  sm: 'min-h-[72px]',
  md: 'min-h-[88px]',
  lg: 'min-h-[120px]',
}

const wellPad: Record<ContrastCardSize, string> = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function ContrastCard({
  fg,
  bg,
  label,
  sample = 'The quick brown fox',
  named = true,
  variant = 'ghost',
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
}: ContrastCardProps) {
  const ghost = variant === 'ghost'

  return (
    <Stack
      variant={variant}
      size={size}
      tone={tone}
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
          'flex w-full min-w-0 flex-col justify-between overflow-hidden',
          ghost ? 'rounded-[18px]' : 'rounded-[12px]',
          wellPad[size],
          wellMin[size],
          fullHeight && 'h-full flex-1',
        )}
        style={{
          background: bg ? `var(--${bg})` : undefined,
          color: fg ? `var(--${fg})` : undefined,
        }}
      >
        <p className="m-0 text-[19px] font-normal leading-[1.42]">{sample}</p>
        {named && label ? (
          <span className="mt-3 font-mono text-[12px] leading-[1.33] opacity-70">{label}</span>
        ) : null}
      </div>
    </Stack>
  )
}

ContrastCard.displayName = 'ContrastCard'
