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
import { StateCard, type StateCardProps } from './StateCard'

export type StateGridVariant = StackVariant
export type StateGridSize = StackSize
export type StateGridTone = StackTone
export type StateGridPreview = StackPreview
export type StateGridColumns = 1 | 2 | 3 | 4 | 6
export type StateGridAlign = 'stretch' | 'start'
export type StateGridWidths = 'equal' | 'fit' | 'mixed'
export type StateGridGap = 'sm' | 'md' | 'lg'

export const STATE_GRID_VARIANTS = STACK_VARIANTS
export const STATE_GRID_SIZES = STACK_SIZES
export const STATE_GRID_TONES = STACK_TONES
export const STATE_GRID_COLUMNS: StateGridColumns[] = [1, 2, 3, 4, 6]
export const STATE_GRID_ALIGNS: StateGridAlign[] = ['stretch', 'start']
export const STATE_GRID_WIDTHS: StateGridWidths[] = ['equal', 'fit', 'mixed']
export const STATE_GRID_GAPS: StateGridGap[] = ['sm', 'md', 'lg']

export const STATE_GRID_VARIANT_LABEL = STACK_VARIANT_LABEL
export const STATE_GRID_SIZE_LABEL = STACK_SIZE_LABEL
export const STATE_GRID_TONE_LABEL = STACK_TONE_LABEL
export const STATE_GRID_COLUMN_LABEL: Record<StateGridColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  6: 'Six',
}
export const STATE_GRID_ALIGN_LABEL: Record<StateGridAlign, string> = {
  stretch: 'Equal height',
  start: 'Unequal height',
}
export const STATE_GRID_WIDTH_LABEL: Record<StateGridWidths, string> = {
  equal: 'Equal width',
  fit: 'Unequal width',
  mixed: 'Mixed width',
}
export const STATE_GRID_GAP_LABEL: Record<StateGridGap, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export type StateGridProps = {
  children?: ReactNode
  variant?: StateGridVariant
  size?: StateGridSize
  tone?: StateGridTone
  columns?: StateGridColumns
  align?: StateGridAlign
  widths?: StateGridWidths
  gap?: StateGridGap
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: StateGridPreview
  onDark?: boolean
  className?: string
}

const columnClass: Record<StateGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-4',
  6: 'grid-cols-state-compact',
}

const mixedClass: Record<StateGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)]',
  3: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]',
  6: 'grid-cols-state-compact',
}

const gapClass: Record<StateGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

function isStateCardElement(node: unknown): node is ReactElement<StateCardProps> {
  return isValidElement(node) && node.type === StateCard
}

function mapStateGridItems(children: ReactNode, align: StateGridAlign, widths: StateGridWidths) {
  return Children.map(children, (child, index) => {
    if (!isStateCardElement(child)) return child
    const hug = widths === 'fit' || (widths === 'mixed' && index === 0)
    return cloneElement(child, {
      fullHeight: align === 'stretch' ? true : child.props.fullHeight,
      fullWidth: hug ? false : child.props.fullWidth,
      className: cn(widths === 'mixed' && index > 0 && 'min-w-0 min-[735px]:flex-1', child.props.className),
    })
  })
}

export function StateGrid({
  children,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  columns = 3,
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
}: StateGridProps) {
  const items = mapStateGridItems(children, align, widths)
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

StateGrid.displayName = 'StateGrid'
