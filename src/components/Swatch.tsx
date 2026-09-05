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

export type SwatchVariant = StackVariant
export type SwatchSize = StackSize
export type SwatchTone = StackTone
export type SwatchPreview = StackPreview

export const SWATCH_VARIANTS = STACK_VARIANTS
export const SWATCH_SIZES = STACK_SIZES
export const SWATCH_TONES = STACK_TONES

export const SWATCH_VARIANT_LABEL = STACK_VARIANT_LABEL
export const SWATCH_SIZE_LABEL = STACK_SIZE_LABEL
export const SWATCH_TONE_LABEL = STACK_TONE_LABEL

export type SwatchProps = {
  token?: string
  name?: string
  named?: boolean
  variant?: SwatchVariant
  size?: SwatchSize
  tone?: SwatchTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: SwatchPreview
  onDark?: boolean
  className?: string
}

const chipH: Record<SwatchSize, string> = {
  sm: 'h-10',
  md: 'h-16',
  lg: 'h-24',
}

export function Swatch({
  token,
  name,
  named = true,
  variant = 'outline',
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
}: SwatchProps) {
  const caption = name ?? (token ? `--${token}` : undefined)
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
      className={cn(!ghost && '!p-0 overflow-hidden', className)}
    >
      <div
        className={cn(
          'flex w-full min-w-0 flex-col overflow-hidden',
          ghost && 'rounded-[12px] border',
          ghost && (onDark ? 'border-[#38383a]' : 'border-border-default'),
        )}
      >
        <div
          className={cn(
            'w-full',
            chipH[size],
            named && caption && (onDark ? 'border-b border-[#2c2c2e]' : 'border-b border-border-subtle'),
          )}
          style={token ? { background: `var(--${token})` } : undefined}
        />
        {named && caption ? (
          <p
            className={cn(
              'm-0 truncate px-3 py-2 font-mono text-[11px] leading-none',
              onDark ? 'text-[#a1a1a6]' : 'text-text-secondary',
            )}
          >
            {caption}
          </p>
        ) : null}
      </div>
    </Stack>
  )
}

Swatch.displayName = 'Swatch'
