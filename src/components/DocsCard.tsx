'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Body, Caption, Label } from './Text'
import { PREVIEW_INSET, usePreviewMode } from './PreviewMode'

export function DocsCard({
  children,
  className,
  padding = 'md',
}: {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}) {
  const preview = usePreviewMode()
  const pad =
    padding === 'none' || preview
      ? ''
      : padding === 'sm'
        ? 'p-4'
        : padding === 'lg'
          ? 'px-5 py-8 min-[735px]:px-8 min-[735px]:py-12'
          : 'p-6'
  return (
    <div className={cn(!preview && 'rounded-[18px] bg-bg-secondary', pad, className)}>
      {children}
    </div>
  )
}

export function DocsStack({
  children,
  gap = 6,
  className,
}: {
  children: ReactNode
  gap?: 3 | 4 | 6 | 8 | 10
  className?: string
}) {
  const gaps = {
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
  } as const
  return <div className={cn('flex flex-col', gaps[gap], className)}>{children}</div>
}

export function DocsCardGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 6
  className?: string
}) {
  const preview = usePreviewMode()
  const cols =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 min-[735px]:grid-cols-2'
        : columns === 4
          ? 'grid-cols-2 min-[735px]:grid-cols-4'
          : columns === 6
            ? 'grid-cols-2 min-[480px]:grid-cols-3 min-[1068px]:grid-cols-6'
            : 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3'
  if (preview) {
    return (
      <div className={cn('flex flex-wrap items-start gap-x-10 gap-y-8', PREVIEW_INSET, className)}>
        {children}
      </div>
    )
  }
  return <div className={cn('grid gap-3', cols, className)}>{children}</div>
}

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
    <div>
      {title ? (
        <Caption as="h3" className="mb-1 font-medium">
          {title}
        </Caption>
      ) : null}
      {note ? (
        <Body size="sm" className="mb-4 max-w-[692px]">
          {note}
        </Body>
      ) : null}
      {children}
    </div>
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

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        preview && (wide ? 'w-full' : 'w-fit max-w-none shrink-0'),
      )}
    >
      <div
        className={cn(
          'flex',
          preview
            ? cn(
                wide ? 'w-full' : 'w-fit min-h-11',
                brand && 'rounded-[12px] bg-brand-primary px-4 py-6',
              )
            : cn(
                'rounded-[12px] px-4 py-6',
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
        {align === 'stretch' && !preview ? (
          <div className={cn('w-full', !wide && 'max-w-[320px]')}>{children}</div>
        ) : (
          children
        )}
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

export function DocsPrincipleCard({
  index,
  title,
  body,
}: {
  index: number
  title: string
  body: string
}) {
  return (
    <DocsCard>
      <Caption as="span" className="tabular-nums text-brand-primary">
        {String(index).padStart(2, '0')}
      </Caption>
      <Label as="p" className="mt-3">
        {title}
      </Label>
      <Body size="sm" className="mt-2">
        {body}
      </Body>
    </DocsCard>
  )
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
  return (
    <DocsCard>
      <Caption as="p" className={cn('font-medium', tone === 'success' ? 'text-success' : 'text-danger')}>
        {title}
      </Caption>
      <ul className="mt-3 m-0 flex list-none flex-col gap-2.5 p-0">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className={cn(
                'mt-[9px] size-1.5 shrink-0 rounded-full',
                tone === 'success' ? 'bg-success' : 'bg-danger',
              )}
              aria-hidden
            />
            <Body size="sm">{item}</Body>
          </li>
        ))}
      </ul>
    </DocsCard>
  )
}

export function DocsInlineCode({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px]">{children}</code>
}
