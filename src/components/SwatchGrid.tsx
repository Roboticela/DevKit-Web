import { Children, cloneElement, isValidElement, type MouseEventHandler, type ReactElement, type ReactNode } from 'react'
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
import { Swatch, type SwatchProps } from './Swatch'

export type SwatchGridVariant = StackVariant
export type SwatchGridSize = StackSize
export type SwatchGridTone = StackTone
export type SwatchGridPreview = StackPreview
export type SwatchGridColumns = 1 | 2 | 3 | 4 | 6
export type SwatchGridAlign = 'stretch' | 'start'
export type SwatchGridWidths = 'equal' | 'fit' | 'mixed'
export type SwatchGridGap = 'sm' | 'md' | 'lg'

export const SWATCH_GRID_VARIANTS = STACK_VARIANTS
export const SWATCH_GRID_SIZES = STACK_SIZES
export const SWATCH_GRID_TONES = STACK_TONES
export const SWATCH_GRID_COLUMNS: SwatchGridColumns[] = [1, 2, 3, 4, 6]
export const SWATCH_GRID_ALIGNS: SwatchGridAlign[] = ['stretch', 'start']
export const SWATCH_GRID_WIDTHS: SwatchGridWidths[] = ['equal', 'fit', 'mixed']
export const SWATCH_GRID_GAPS: SwatchGridGap[] = ['sm', 'md', 'lg']

export const SWATCH_GRID_VARIANT_LABEL = STACK_VARIANT_LABEL
export const SWATCH_GRID_SIZE_LABEL = STACK_SIZE_LABEL
export const SWATCH_GRID_TONE_LABEL = STACK_TONE_LABEL
export const SWATCH_GRID_COLUMN_LABEL: Record<SwatchGridColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  6: 'Six',
}
export const SWATCH_GRID_ALIGN_LABEL: Record<SwatchGridAlign, string> = {
  stretch: 'Equal height',
  start: 'Unequal height',
}
export const SWATCH_GRID_WIDTH_LABEL: Record<SwatchGridWidths, string> = {
  equal: 'Equal width',
  fit: 'Unequal width',
  mixed: 'Mixed width',
}
export const SWATCH_GRID_GAP_LABEL: Record<SwatchGridGap, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export type SwatchGridProps = {
  tokens?: string[]
  children?: ReactNode
  named?: boolean
  variant?: SwatchGridVariant
  size?: SwatchGridSize
  tone?: SwatchGridTone
  columns?: SwatchGridColumns
  align?: SwatchGridAlign
  widths?: SwatchGridWidths
  gap?: SwatchGridGap
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: SwatchGridPreview
  onDark?: boolean
  className?: string
}

const columnClass: Record<SwatchGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-4',
  6: 'grid-cols-state-compact',
}

const mixedClass: Record<SwatchGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)]',
  3: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]',
  6: 'grid-cols-state-compact',
}

const gapClass: Record<SwatchGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

function isSwatchElement(node: unknown): node is ReactElement<SwatchProps> {
  return isValidElement(node) && node.type === Swatch
}

function mapSwatchGridItems(children: ReactNode, align: SwatchGridAlign, widths: SwatchGridWidths) {
  return Children.map(children, (child, index) => {
    if (!isSwatchElement(child)) return child
    const hug = widths === 'fit' || (widths === 'mixed' && index === 0)
    return cloneElement(child, {
      fullHeight: align === 'stretch' ? true : child.props.fullHeight,
      fullWidth: hug ? false : child.props.fullWidth,
      className: cn(widths === 'mixed' && index > 0 && 'min-w-0 min-[735px]:flex-1', child.props.className),
    })
  })
}

export function SwatchGrid({
  tokens,
  children,
  named = true,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  columns = 4,
  align = 'stretch',
  widths = 'equal',
  gap = 'md',
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
}: SwatchGridProps) {
  const fromTokens = (tokens ?? []).map((token) => (
    <Swatch key={token} token={token} size={size} named={named} onDark={onDark} />
  ))
  const items = mapSwatchGridItems([...fromTokens, ...Children.toArray(children)], align, widths)
  const packed = widths === 'fit'
  const mixed = widths === 'mixed'

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
          packed ? 'flex flex-wrap' : 'grid',
          !packed && (mixed ? mixedClass[columns] : columnClass[columns]),
          packed && align === 'stretch' && 'items-stretch',
          packed && align === 'start' && 'items-start',
          !packed && align === 'stretch' && 'items-stretch [&>*]:h-full',
          !packed && align === 'start' && 'items-start',
          gapClass[gap],
          'w-full min-w-0',
        )}
      >
        {items}
      </div>
    </Stack>
  )
}

SwatchGrid.displayName = 'SwatchGrid'
