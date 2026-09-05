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
import { Caption } from './Text'

export type ScaleRowVariant = StackVariant
export type ScaleRowSize = StackSize
export type ScaleRowTone = StackTone
export type ScaleRowPreview = StackPreview

export const SCALE_ROW_VARIANTS = STACK_VARIANTS
export const SCALE_ROW_SIZES = STACK_SIZES
export const SCALE_ROW_TONES = STACK_TONES

export const SCALE_ROW_VARIANT_LABEL = STACK_VARIANT_LABEL
export const SCALE_ROW_SIZE_LABEL = STACK_SIZE_LABEL
export const SCALE_ROW_TONE_LABEL = STACK_TONE_LABEL

export const SCALE_ROW_WIDTHS = [
  { value: 692, caption: 'Single-column copy' },
  { value: 760, caption: 'Docs article' },
  { value: 900, caption: 'Wide docs' },
  { value: 980, caption: 'Text-focused marketing' },
  { value: 1024, caption: 'Wide sections' },
] as const

export const SCALE_ROW_SPACE = [
  { value: 4, caption: 'Icon padding, hairline gaps' },
  { value: 8, caption: 'Inline icon to label' },
  { value: 12, caption: 'Compact stacks' },
  { value: 16, caption: 'Field padding, mobile gutters' },
  { value: 24, caption: 'Desktop gutters, related blocks' },
  { value: 32, caption: 'Card padding' },
  { value: 48, caption: 'Grouped sections' },
  { value: 64, caption: 'Large section gaps' },
  { value: 96, caption: 'Marketing breathing room' },
  { value: 128, caption: 'Hero isolation' },
] as const

export type ScaleRowProps = {
  value?: number | string
  bar?: number
  max?: number
  width?: number
  caption?: string
  named?: boolean
  variant?: ScaleRowVariant
  size?: ScaleRowSize
  tone?: ScaleRowTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: ScaleRowPreview
  onDark?: boolean
  className?: string
}

const barH: Record<ScaleRowSize, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

const valueW: Record<ScaleRowSize, string> = {
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-12',
}

export function ScaleRow({
  value,
  bar,
  max = 1024,
  width,
  caption,
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
}: ScaleRowProps) {
  const percent = bar != null && max > 0 ? Math.round((bar / max) * 100) : 0
  const barStyle = width != null ? { width } : { width: `${percent}%` }

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
      {named && value != null ? (
        <span
          className={cn(
            'shrink-0 font-mono text-[12px] leading-[1.33]',
            valueW[size],
            onDark ? 'text-[#a1a1a6]' : 'text-text-tertiary',
          )}
        >
          {value}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <div
          className={cn('max-w-full rounded-[4px] bg-brand-primary', barH[size])}
          style={barStyle}
        />
        {named && caption ? (
          <Caption tone="secondary" className={cn('mt-1', onDark && '!text-[#a1a1a6]')}>
            {caption}
          </Caption>
        ) : null}
      </div>
    </Stack>
  )
}

ScaleRow.displayName = 'ScaleRow'
