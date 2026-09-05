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
import { Body, Caption } from './Text'

export type RuleCardVariant = StackVariant
export type RuleCardSize = StackSize
export type RuleCardTone = StackTone
export type RuleCardPreview = StackPreview

export const RULE_CARD_VARIANTS = STACK_VARIANTS
export const RULE_CARD_SIZES = STACK_SIZES
export const RULE_CARD_TONES = STACK_TONES

export const RULE_CARD_VARIANT_LABEL = STACK_VARIANT_LABEL
export const RULE_CARD_SIZE_LABEL = STACK_SIZE_LABEL
export const RULE_CARD_TONE_LABEL = STACK_TONE_LABEL

export const RULE_CARD_TITLE: Record<RuleCardTone, string> = {
  default: 'Rule',
  brand: 'Brand',
  success: 'Do',
  warning: 'Warning',
  danger: 'Don’t',
}

export type RuleCardProps = {
  title?: string
  items?: string[]
  named?: boolean
  variant?: RuleCardVariant
  size?: RuleCardSize
  tone?: RuleCardTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: RuleCardPreview
  onDark?: boolean
  className?: string
}

const titleTone: Record<RuleCardTone, string> = {
  default: 'text-text-primary',
  brand: 'text-brand-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

const titleToneDark: Record<RuleCardTone, string> = {
  default: '!text-white',
  brand: '!text-[#3b9eff]',
  success: '!text-[#30d158]',
  warning: '!text-[#ff9f0a]',
  danger: '!text-[#ff453a]',
}

const dotTone: Record<RuleCardTone, string> = {
  default: 'bg-text-primary',
  brand: 'bg-brand-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

const dotToneDark: Record<RuleCardTone, string> = {
  default: 'bg-white',
  brand: 'bg-[#3b9eff]',
  success: 'bg-[#30d158]',
  warning: 'bg-[#ff9f0a]',
  danger: 'bg-[#ff453a]',
}

export function RuleCard({
  title,
  items,
  named = true,
  variant = 'subtle',
  size = 'md',
  tone = 'success',
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
}: RuleCardProps) {
  const heading = title ?? RULE_CARD_TITLE[tone]
  const rules = items ?? []

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
      {named && heading ? (
        <Caption as="p" className={cn('font-medium', onDark ? titleToneDark[tone] : titleTone[tone])}>
          {heading}
        </Caption>
      ) : null}
      {rules.length ? (
        <ul className={cn('m-0 flex list-none flex-col gap-3 p-0', named && heading && 'mt-3')}>
          {rules.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className={cn(
                  'mt-[9px] size-1.5 shrink-0 rounded-full',
                  onDark ? dotToneDark[tone] : dotTone[tone],
                )}
                aria-hidden
              />
              <Body size="sm" className={onDark ? '!text-[#a1a1a6]' : undefined}>
                {item}
              </Body>
            </li>
          ))}
        </ul>
      ) : null}
    </Stack>
  )
}

RuleCard.displayName = 'RuleCard'
