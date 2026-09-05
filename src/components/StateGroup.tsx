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
import {
  StateGrid,
  STATE_GRID_ALIGNS,
  STATE_GRID_ALIGN_LABEL,
  STATE_GRID_COLUMNS,
  STATE_GRID_COLUMN_LABEL,
  STATE_GRID_WIDTHS,
  STATE_GRID_WIDTH_LABEL,
  type StateGridAlign,
  type StateGridColumns,
  type StateGridWidths,
} from './StateGrid'
import { Caption } from './Text'

export type StateGroupVariant = StackVariant
export type StateGroupSize = StackSize
export type StateGroupTone = StackTone
export type StateGroupPreview = StackPreview
export type StateGroupGap = StackGap
export type StateGroupColumns = StateGridColumns
export type StateGroupAlign = StateGridAlign
export type StateGroupWidths = StateGridWidths

export const STATE_GROUP_VARIANTS = STACK_VARIANTS
export const STATE_GROUP_SIZES = STACK_SIZES
export const STATE_GROUP_TONES = STACK_TONES
export const STATE_GROUP_GAPS = STACK_GAPS
export const STATE_GROUP_COLUMNS = STATE_GRID_COLUMNS
export const STATE_GROUP_ALIGNS = STATE_GRID_ALIGNS
export const STATE_GROUP_WIDTHS = STATE_GRID_WIDTHS

export const STATE_GROUP_VARIANT_LABEL = STACK_VARIANT_LABEL
export const STATE_GROUP_SIZE_LABEL = STACK_SIZE_LABEL
export const STATE_GROUP_TONE_LABEL = STACK_TONE_LABEL
export const STATE_GROUP_GAP_LABEL = STACK_GAP_LABEL
export const STATE_GROUP_COLUMN_LABEL = STATE_GRID_COLUMN_LABEL
export const STATE_GROUP_ALIGN_LABEL = STATE_GRID_ALIGN_LABEL
export const STATE_GROUP_WIDTH_LABEL = STATE_GRID_WIDTH_LABEL

export type StateGroupProps = {
  children?: ReactNode
  title?: string
  variant?: StateGroupVariant
  size?: StateGroupSize
  tone?: StateGroupTone
  gap?: StateGroupGap
  columns?: StateGroupColumns
  align?: StateGroupAlign
  widths?: StateGroupWidths
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: StateGroupPreview
  onDark?: boolean
  className?: string
}

export function StateGroup({
  children,
  title,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  gap = 'sm',
  columns,
  align = 'stretch',
  widths = 'equal',
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
}: StateGroupProps) {
  const caption = title ? (
    <Caption
      className={cn('font-medium', onDark && '!text-[#98989d]')}
      tone={onDark ? undefined : 'secondary'}
    >
      {title}
    </Caption>
  ) : null

  const body =
    children == null ? null : columns != null ? (
      <StateGrid columns={columns} align={align} widths={widths} onDark={onDark}>
        {children}
      </StateGrid>
    ) : (
      children
    )

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
      {caption}
      {body}
    </Stack>
  )
}

StateGroup.displayName = 'StateGroup'
