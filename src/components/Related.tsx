import { Children, cloneElement, isValidElement, type MouseEventHandler, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { RelatedCard, type RelatedCardProps } from './RelatedCard'
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

export type RelatedVariant = StackVariant
export type RelatedSize = StackSize
export type RelatedTone = StackTone
export type RelatedPreview = StackPreview
export type RelatedColumns = 1 | 2 | 3 | 4 | 6
export type RelatedAlign = 'stretch' | 'start'
export type RelatedWidths = 'equal' | 'fit' | 'mixed'
export type RelatedGap = 'sm' | 'md' | 'lg'

export const RELATED_VARIANTS = STACK_VARIANTS
export const RELATED_SIZES = STACK_SIZES
export const RELATED_TONES = STACK_TONES
export const RELATED_COLUMNS: RelatedColumns[] = [1, 2, 3, 4, 6]
export const RELATED_ALIGNS: RelatedAlign[] = ['stretch', 'start']
export const RELATED_WIDTHS: RelatedWidths[] = ['equal', 'fit', 'mixed']
export const RELATED_GAPS: RelatedGap[] = ['sm', 'md', 'lg']

export const RELATED_VARIANT_LABEL = STACK_VARIANT_LABEL
export const RELATED_SIZE_LABEL = STACK_SIZE_LABEL
export const RELATED_TONE_LABEL = STACK_TONE_LABEL
export const RELATED_COLUMN_LABEL: Record<RelatedColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  6: 'Six',
}
export const RELATED_ALIGN_LABEL: Record<RelatedAlign, string> = {
  stretch: 'Equal height',
  start: 'Unequal height',
}
export const RELATED_WIDTH_LABEL: Record<RelatedWidths, string> = {
  equal: 'Equal width',
  fit: 'Unequal width',
  mixed: 'Mixed width',
}
export const RELATED_GAP_LABEL: Record<RelatedGap, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export type RelatedItem = {
  href: string
  title: string
  description: string
}

export type RelatedProps = {
  items?: RelatedItem[]
  children?: ReactNode
  variant?: RelatedVariant
  size?: RelatedSize
  tone?: RelatedTone
  columns?: RelatedColumns
  align?: RelatedAlign
  widths?: RelatedWidths
  gap?: RelatedGap
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: RelatedPreview
  onDark?: boolean
  className?: string
}

const columnClass: Record<RelatedColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-4',
  6: 'grid-cols-state-compact',
}

const mixedClass: Record<RelatedColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)]',
  3: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]',
  6: 'grid-cols-state-compact',
}

const gapClass: Record<RelatedGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

function isRelatedCardElement(node: unknown): node is ReactElement<RelatedCardProps> {
  return isValidElement(node) && node.type === RelatedCard
}

function mapRelatedItems(
  children: ReactNode,
  align: RelatedAlign,
  widths: RelatedWidths,
  pressable: boolean,
) {
  return Children.map(children, (child, index) => {
    if (!isRelatedCardElement(child)) return child
    const hug = widths === 'fit' || (widths === 'mixed' && index === 0)
    return cloneElement(child, {
      fullHeight: align === 'stretch' ? true : child.props.fullHeight,
      fullWidth: hug ? false : child.props.fullWidth,
      href: pressable ? undefined : child.props.href,
      className: cn(widths === 'mixed' && index > 0 && 'min-w-0 min-[735px]:flex-1', child.props.className),
    })
  })
}

export function Related({
  items,
  children,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  columns = 3,
  align = 'stretch',
  widths = 'equal',
  gap = 'sm',
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
}: RelatedProps) {
  const pressable = Boolean(href || onClick || preview)
  const fromItems = (items ?? []).map((item) => (
    <RelatedCard
      key={`${item.href}-${item.title}`}
      href={pressable ? undefined : item.href}
      title={item.title}
      description={item.description}
    />
  ))
  const mapped = mapRelatedItems([...fromItems, ...Children.toArray(children)], align, widths, pressable)
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
        {mapped}
      </div>
    </Stack>
  )
}

Related.displayName = 'Related'
