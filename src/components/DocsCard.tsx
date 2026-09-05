'use client'

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  Card,
  CARD_GRID_ALIGNS,
  CARD_GRID_ALIGN_LABEL,
  CARD_GRID_GAPS,
  CARD_GRID_GAP_LABEL,
  CARD_GRID_WIDTHS,
  CARD_GRID_WIDTH_LABEL,
  CARD_SIZES,
  CARD_SIZE_LABEL,
  CARD_TONES,
  CARD_TONE_LABEL,
  CARD_VARIANTS,
  CARD_VARIANT_LABEL,
  type CardGridAlign,
  type CardGridGap,
  type CardGridWidths,
  type CardPreview,
  type CardProps,
  type CardSize,
  type CardTone,
  type CardVariant,
} from './Card'
import { TokenGroup } from './TokenGroup'
import { RuleCard } from './RuleCard'
import { InlineCode } from './InlineCode'
import { Caption, Label } from './Text'
import { PREVIEW_INSET, usePreviewMode } from './PreviewMode'

export type DocsCardVariant = CardVariant
export type DocsCardSize = CardSize
export type DocsCardTone = CardTone
export type DocsCardPreview = CardPreview
export type DocsCardProps = CardProps & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const DOCS_CARD_VARIANTS = CARD_VARIANTS
export const DOCS_CARD_SIZES = CARD_SIZES
export const DOCS_CARD_TONES = CARD_TONES
export const DOCS_CARD_VARIANT_LABEL = CARD_VARIANT_LABEL
export const DOCS_CARD_SIZE_LABEL = CARD_SIZE_LABEL
export const DOCS_CARD_TONE_LABEL = CARD_TONE_LABEL

function sizeFromPadding(padding: 'none' | 'sm' | 'md' | 'lg'): CardSize {
  if (padding === 'sm') return 'sm'
  if (padding === 'lg') return 'lg'
  return 'md'
}

export function DocsCard({
  variant = 'subtle',
  size,
  padding = 'md',
  className,
  children,
  ...rest
}: DocsCardProps) {
  return (
    <Card variant={variant} size={size ?? sizeFromPadding(padding)} className={className} {...rest}>
      {className && children != null ? <div className={className}>{children}</div> : children}
    </Card>
  )
}

DocsCard.displayName = 'DocsCard'

export function DocsStack({
  children,
  gap = 6,
  className,
}: {
  children: ReactNode
  gap?: 3 | 4 | 6 | 8 | 10
  className?: string
}) {
  const gaps = { 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10' } as const
  return <div className={cn('flex flex-col', gaps[gap], className)}>{children}</div>
}

export type DocsCardGridColumns = 1 | 2 | 3 | 4 | 6
export type DocsCardGridAlign = CardGridAlign
export type DocsCardGridWidths = CardGridWidths
export type DocsCardGridGap = CardGridGap

export const DOCS_CARD_GRID_COLUMNS: DocsCardGridColumns[] = [1, 2, 3, 4, 6]
export const DOCS_CARD_GRID_ALIGNS = CARD_GRID_ALIGNS
export const DOCS_CARD_GRID_WIDTHS = CARD_GRID_WIDTHS
export const DOCS_CARD_GRID_GAPS = CARD_GRID_GAPS

export const DOCS_CARD_GRID_COLUMN_LABEL: Record<DocsCardGridColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  6: 'Six',
}

export const DOCS_CARD_GRID_ALIGN_LABEL = CARD_GRID_ALIGN_LABEL
export const DOCS_CARD_GRID_WIDTH_LABEL = CARD_GRID_WIDTH_LABEL
export const DOCS_CARD_GRID_GAP_LABEL = CARD_GRID_GAP_LABEL

const docsColumnClass: Record<DocsCardGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-2 min-[735px]:grid-cols-4',
  6: 'grid-cols-state-compact',
}

const docsMixedClass: Record<DocsCardGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)]',
  3: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]',
  4: 'grid-cols-2 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]',
  6: 'grid-cols-state-compact',
}

const docsGapClass: Record<DocsCardGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

function isDocsCardElement(node: unknown): node is ReactElement<DocsCardProps> {
  return isValidElement(node) && node.type === DocsCard
}

function mapDocsCardGridItems(children: ReactNode, align: DocsCardGridAlign, widths: DocsCardGridWidths) {
  return Children.map(children, (child, index) => {
    if (!isDocsCardElement(child)) return child
    const hug = widths === 'fit' || (widths === 'mixed' && index === 0)
    return cloneElement(child, {
      fullHeight: align === 'stretch' ? true : child.props.fullHeight,
      fullWidth: hug ? false : child.props.fullWidth,
      className: cn(widths === 'mixed' && index > 0 && 'min-w-0 min-[735px]:flex-1', child.props.className),
    })
  })
}

export function DocsCardGrid({
  children,
  columns = 3,
  align = 'stretch',
  widths = 'equal',
  gap = 'sm',
  className,
}: {
  children: ReactNode
  columns?: DocsCardGridColumns
  align?: DocsCardGridAlign
  widths?: DocsCardGridWidths
  gap?: DocsCardGridGap
  className?: string
}) {
  const items = mapDocsCardGridItems(children, align, widths)
  const packed = widths === 'fit'
  const mixed = widths === 'mixed'

  return (
    <div
      className={cn(
        packed ? 'flex flex-wrap' : 'grid',
        !packed && (mixed ? docsMixedClass[columns] : docsColumnClass[columns]),
        packed && align === 'stretch' && 'items-stretch',
        packed && align === 'start' && 'items-start',
        !packed && align === 'stretch' && 'items-stretch [&>*]:h-full',
        !packed && align === 'start' && 'items-start',
        docsGapClass[gap],
        className,
      )}
    >
      {items}
    </div>
  )
}

DocsCardGrid.displayName = 'DocsCardGrid'

export function DocsUsage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <DocsStack gap={6} className={className}>
      {children}
    </DocsStack>
  )
}

export function DocsTokenGroup({
  title,
  note,
  children,
}: {
  title?: string
  note?: string
  children: ReactNode
}) {
  return (
    <TokenGroup title={title} note={note}>
      {children}
    </TokenGroup>
  )
}

export function DocsStateCard({
  label,
  children,
  surface = 'secondary',
  inert = false,
  align = 'center',
  size = 'md',
  wide = false,
  className,
}: {
  label: string
  children: ReactNode
  surface?: 'secondary' | 'brand'
  inert?: boolean
  align?: 'center' | 'start' | 'stretch'
  size?: 'md' | 'lg'
  wide?: boolean
  className?: string
}) {
  const preview = usePreviewMode()
  const brand = surface === 'brand'

  const sample =
    preview && wide ? (
      <div className="w-full min-w-0">{children}</div>
    ) : align === 'stretch' && !preview ? (
      <div className={cn('w-full min-w-0', !wide && 'max-w-[320px]')}>{children}</div>
    ) : preview ? (
      children
    ) : (
      <div className="min-w-0 max-w-full">{children}</div>
    )

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-2',
        preview && (wide ? 'w-full' : 'w-fit max-w-none shrink-0'),
        !preview && 'w-full',
      )}
    >
      <div
        className={cn(
          preview && wide ? 'block w-full min-w-0' : 'flex min-w-0',
          preview
            ? cn(
                wide ? 'w-full' : 'w-fit min-h-11',
                brand && 'rounded-[12px] bg-brand-primary px-4 py-6',
              )
            : cn(
                'w-full rounded-[12px] px-4 py-6',
                size === 'lg' ? 'min-h-[168px]' : 'min-h-[100px]',
                brand ? 'bg-brand-primary' : 'bg-bg-secondary',
              ),
          !preview && align === 'center' && 'items-center justify-center',
          !preview && align === 'start' && 'items-center',
          !preview && align === 'stretch' && 'items-center justify-center',
          preview && !wide && 'items-center',
          inert && 'pointer-events-none',
          className,
        )}
      >
        {sample}
      </div>
      <Caption
        align={preview ? 'start' : 'center'}
        className={preview && wide ? PREVIEW_INSET : undefined}
      >
        {label}
      </Caption>
    </div>
  )
}

export function DocsStateGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 6
  className?: string
}) {
  const preview = usePreviewMode()
  if (preview) {
    return (
      <div className={cn('flex flex-wrap items-start gap-x-10 gap-y-8', PREVIEW_INSET, className)}>
        {children}
      </div>
    )
  }
  return (
    <DocsCardGrid columns={columns} className={cn('gap-4', className)}>
      {children}
    </DocsCardGrid>
  )
}

export function DocsStateGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const preview = usePreviewMode()
  return (
    <div>
      <Caption className={cn('mb-3 font-medium', preview && PREVIEW_INSET)} tone="secondary">
        {title}
      </Caption>
      {children}
    </div>
  )
}

export function DocsSwatch({ token }: { token: string }) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-border-default">
      <div className="h-16 border-b border-border-subtle" style={{ background: `var(--${token})` }} />
      <p className="m-0 truncate px-3 py-2 font-mono text-[11px] text-text-secondary">--{token}</p>
    </div>
  )
}

export function DocsSwatchGrid({ tokens }: { tokens: string[] }) {
  return (
    <DocsCardGrid columns={4}>
      {tokens.map((token) => (
        <DocsSwatch key={token} token={token} />
      ))}
    </DocsCardGrid>
  )
}

export function DocsContrastCard({
  fg,
  bg,
  label,
}: {
  fg: string
  bg: string
  label: string
}) {
  return (
    <div
      className="flex min-h-[88px] flex-col justify-between rounded-[18px] p-5"
      style={{ background: `var(--${bg})`, color: `var(--${fg})` }}
    >
      <p className="m-0 text-[19px] font-normal leading-[1.42]">The quick brown fox</p>
      <span className="mt-3 font-mono text-[12px] leading-[1.33] opacity-70">{label}</span>
    </div>
  )
}

export function DocsRadiusCard({
  value,
  label,
  use,
}: {
  value: number
  label: string
  use: string
}) {
  return (
    <DocsCard padding="sm" className="flex items-center gap-4">
      <div className="h-11 w-[72px] shrink-0 bg-bg-tertiary" style={{ borderRadius: value }} />
      <div className="min-w-0">
        <Label as="p">{label}</Label>
        <Caption className="mt-1 font-mono">{value}px</Caption>
        <Caption tone="secondary" className="mt-1">
          {use}
        </Caption>
      </div>
    </DocsCard>
  )
}

export function DocsScaleRow({
  value,
  bar,
  max = 1024,
  caption,
}: {
  value: number | string
  bar: number
  max?: number
  caption: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-10 shrink-0 font-mono text-[12px] text-text-tertiary">{value}</span>
      <div className="min-w-0 flex-1">
        <div
          className="h-3 max-w-full rounded-[4px] bg-brand-primary"
          style={{ width: `${Math.round((bar / max) * 100)}%` }}
        />
        <Caption tone="secondary" className="mt-1">
          {caption}
        </Caption>
      </div>
    </div>
  )
}

export function DocsMeasureRow({
  value,
  width,
  caption,
}: {
  value: number
  width: number
  caption: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-10 shrink-0 font-mono text-[12px] text-text-tertiary">{value}</span>
      <div className="h-3 rounded-[4px] bg-brand-primary" style={{ width }} />
      <Caption className="min-w-0 truncate">{caption}</Caption>
    </div>
  )
}

export function DocsTable({
  columns,
  rows,
  minWidth = '480px',
  monoColumns = [],
}: {
  columns: string[]
  rows: ReactNode[][]
  minWidth?: string
  monoColumns?: number[]
}) {
  return (
    <div className="overflow-x-auto rounded-[18px] border border-border-default">
      <table className="w-full border-collapse text-left text-[13px]" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-border-subtle bg-bg-secondary">
            {columns.map((column) => (
              <th key={column} className="px-4 py-2 font-medium text-text-secondary">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border-subtle last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    'px-4 py-3',
                    cellIndex === 0 ? 'text-text-primary' : 'text-text-secondary',
                    monoColumns.includes(cellIndex) && 'font-mono',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocsSnippet({ children }: { children: ReactNode }) {
  return (
    <pre className="m-0 overflow-x-auto rounded-[18px] bg-bg-secondary p-4 font-mono text-[13px] leading-[1.6] text-text-primary">
      <code>{children}</code>
    </pre>
  )
}

export function DocsRelated({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">{children}</div>
}

export function DocsRuleCard({
  tone,
  title,
  items,
}: {
  tone: 'success' | 'danger'
  title: string
  items: string[]
}) {
  return <RuleCard variant="subtle" size="sm" tone={tone} title={title} items={items} />
}

export function DocsInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>
}

export const StateCard = DocsStateCard
export const StateGrid = DocsStateGrid
export const StateGroup = DocsStateGroup
export const StateStack = DocsStack
