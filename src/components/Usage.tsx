import { type MouseEventHandler, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'
import { RuleCard } from './RuleCard'
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
import { Body, Caption, Label } from './Text'

export type UsageVariant = StackVariant
export type UsageSize = StackSize
export type UsageTone = StackTone
export type UsagePreview = StackPreview
export type UsageGap = StackGap
export type UsageLayout = 'split' | 'stack'
export type UsagePrinciple = { title: string; body: string }

export const USAGE_VARIANTS = STACK_VARIANTS
export const USAGE_SIZES = STACK_SIZES
export const USAGE_TONES = STACK_TONES
export const USAGE_GAPS = STACK_GAPS
export const USAGE_LAYOUTS: UsageLayout[] = ['stack', 'split']

export const USAGE_VARIANT_LABEL = STACK_VARIANT_LABEL
export const USAGE_SIZE_LABEL = STACK_SIZE_LABEL
export const USAGE_TONE_LABEL = STACK_TONE_LABEL
export const USAGE_GAP_LABEL = STACK_GAP_LABEL
export const USAGE_LAYOUT_LABEL: Record<UsageLayout, string> = {
  split: 'Split',
  stack: 'Stack',
}

export type UsageProps = {
  children?: ReactNode
  prose?: ReactNode
  principles?: UsagePrinciple[]
  doItems?: string[]
  dontItems?: string[]
  title?: string
  eyebrow?: string
  variant?: UsageVariant
  size?: UsageSize
  tone?: UsageTone
  gap?: UsageGap
  layout?: UsageLayout
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: UsagePreview
  onDark?: boolean
  className?: string
}

function PrincipleCard({
  index,
  title,
  body,
  onDark,
}: {
  index: number
  title: string
  body: string
  onDark?: boolean
}) {
  return (
    <Card size="sm" variant="subtle" onDark={onDark} fullWidth>
      <div className="flex w-full min-w-0 items-start gap-4">
        <Caption
          as="span"
          className={cn('shrink-0 tabular-nums', onDark ? '!text-[#3b9eff]' : 'text-brand-primary')}
        >
          {String(index).padStart(2, '0')}
        </Caption>
        <div className="min-w-0 flex-1">
          <Label as="p" className={onDark ? '!text-white' : undefined}>
            {title}
          </Label>
          <Body size="sm" className={cn('mt-1', onDark && '!text-[#a1a1a6]')}>
            {body}
          </Body>
        </div>
      </div>
    </Card>
  )
}

export function Usage({
  children,
  prose,
  principles,
  doItems,
  dontItems,
  title,
  eyebrow,
  variant = 'ghost',
  size = 'md',
  tone = 'default',
  gap = 'lg',
  layout = 'stack',
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
}: UsageProps) {
  const stacked = layout === 'stack'
  const heading =
    eyebrow || title ? (
      <div className="flex w-full min-w-0 flex-col gap-1">
        {eyebrow ? (
          <Caption
            as="span"
            tone={onDark ? undefined : 'tertiary'}
            className={cn('uppercase tracking-[0.05em]', onDark && '!text-[#98989d]')}
          >
            {eyebrow}
          </Caption>
        ) : null}
        {title ? (
          <Label as="p" className={onDark ? '!text-white' : undefined}>
            {title}
          </Label>
        ) : null}
      </div>
    ) : null

  const copy =
    prose != null ? (
      <div className="flex w-full min-w-0 flex-col gap-3">
        {typeof prose === 'string' ? (
          <Body className={onDark ? '!text-[#a1a1a6]' : undefined}>{prose}</Body>
        ) : (
          prose
        )}
      </div>
    ) : null

  const rules = principles?.length ? (
    <div
      className={cn(
        'grid w-full grid-cols-1 gap-3',
        !stacked && 'min-[1069px]:grid-cols-3',
      )}
    >
      {principles.map((item, index) => (
        <PrincipleCard
          key={item.title}
          index={index + 1}
          title={item.title}
          body={item.body}
          onDark={onDark}
        />
      ))}
    </div>
  ) : null

  const pair = doItems?.length || dontItems?.length ? (
    <div className={cn('grid w-full grid-cols-1 gap-3', !stacked && 'min-[1069px]:grid-cols-2')}>
      {doItems?.length ? <RuleCard tone="success" title="Do" items={doItems} onDark={onDark} size="sm" /> : null}
      {dontItems?.length ? <RuleCard tone="danger" title="Don’t" items={dontItems} onDark={onDark} size="sm" /> : null}
    </div>
  ) : null

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
      {copy}
      {rules}
      {pair}
      {children}
    </Stack>
  )
}

Usage.displayName = 'Usage'
