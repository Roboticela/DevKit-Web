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
import { Body, Caption } from './Text'

export type TokenGroupVariant = StackVariant
export type TokenGroupSize = StackSize
export type TokenGroupTone = StackTone
export type TokenGroupPreview = StackPreview
export type TokenGroupGap = StackGap
export type TokenGroupColumns = 1 | 2 | 3 | 4

export const TOKEN_GROUP_VARIANTS = STACK_VARIANTS
export const TOKEN_GROUP_SIZES = STACK_SIZES
export const TOKEN_GROUP_TONES = STACK_TONES
export const TOKEN_GROUP_GAPS = STACK_GAPS
export const TOKEN_GROUP_COLUMNS: TokenGroupColumns[] = [1, 2, 3, 4]

export const TOKEN_GROUP_VARIANT_LABEL = STACK_VARIANT_LABEL
export const TOKEN_GROUP_SIZE_LABEL = STACK_SIZE_LABEL
export const TOKEN_GROUP_TONE_LABEL = STACK_TONE_LABEL
export const TOKEN_GROUP_GAP_LABEL = STACK_GAP_LABEL
export const TOKEN_GROUP_COLUMN_LABEL: Record<TokenGroupColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
}

export type TokenGroupProps = {
  children?: ReactNode
  title?: string
  note?: string
  variant?: TokenGroupVariant
  size?: TokenGroupSize
  tone?: TokenGroupTone
  gap?: TokenGroupGap
  columns?: TokenGroupColumns
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: TokenGroupPreview
  onDark?: boolean
  className?: string
}

const columnClass: Record<TokenGroupColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-4',
}

export function TokenGroup({
  children,
  title,
  note,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  gap = 'md',
  columns,
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
}: TokenGroupProps) {
  const heading =
    title || note ? (
      <div className="flex w-full min-w-0 flex-col gap-1">
        {title ? (
          <Caption as="h3" className={cn('font-medium', onDark && '!text-white')}>
            {title}
          </Caption>
        ) : null}
        {note ? (
          <Body size="sm" className={cn('max-w-[692px]', onDark && '!text-[#a1a1a6]')}>
            {note}
          </Body>
        ) : null}
      </div>
    ) : null

  const samples =
    children == null ? null : columns ? (
      <div className={cn('grid w-full min-w-0', columnClass[columns], 'gap-3')}>{children}</div>
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
      {heading}
      {samples}
    </Stack>
  )
}

TokenGroup.displayName = 'TokenGroup'
