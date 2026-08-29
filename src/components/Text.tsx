import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subhead'
  | 'content'
  | 'content-sm'
  | 'caption'
  | 'eyebrow'
  | 'label'

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'link'
  | 'danger'
  | 'success'
  | 'warning'
  | 'on-brand'

export type TextAlign = 'start' | 'center' | 'end'

const VARIANT_CLASS: Record<TextVariant, string> = {
  display:
    'm-0 font-semibold tracking-[-0.015em] leading-[1.05] text-[40px] min-[735px]:text-[80px]',
  h1: 'm-0 font-semibold tracking-[-0.015em] leading-[1.07] text-[32px] min-[735px]:text-[56px]',
  h2: 'm-0 font-semibold tracking-[-0.01em] leading-[1.1] text-[28px] min-[735px]:text-[40px]',
  h3: 'm-0 font-semibold tracking-[-0.005em] leading-[1.14] text-[21px] min-[735px]:text-[28px]',
  subhead: 'm-0 font-normal tracking-[0em] leading-[1.33] text-[19px] min-[735px]:text-[24px]',
  content: 'm-0 font-normal leading-[1.47] text-[17px] min-[735px]:text-[19px] min-[735px]:leading-[1.42]',
  'content-sm': 'm-0 font-normal leading-[1.47] text-[17px]',
  caption: 'm-0 font-normal leading-[1.33] text-[12px]',
  eyebrow: 'm-0 font-normal uppercase tracking-[0.05em] leading-[1.33] text-[12px]',
  label: 'm-0 font-medium leading-none text-[17px]',
}

const TONE_CLASS: Record<TextTone, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-tertiary',
  disabled: 'text-text-disabled',
  link: 'text-text-link',
  danger: 'text-danger',
  success: 'text-success',
  warning: 'text-warning',
  'on-brand': 'text-text-on-brand',
}

const ALIGN_CLASS: Record<TextAlign, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
}

const DEFAULT_TONE: Record<TextVariant, TextTone> = {
  display: 'primary',
  h1: 'primary',
  h2: 'primary',
  h3: 'primary',
  subhead: 'secondary',
  content: 'secondary',
  'content-sm': 'secondary',
  caption: 'tertiary',
  eyebrow: 'tertiary',
  label: 'primary',
}

const DEFAULT_AS: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subhead: 'p',
  content: 'p',
  'content-sm': 'p',
  caption: 'p',
  eyebrow: 'p',
  label: 'span',
}

export type TextProps = {
  variant?: TextVariant
  tone?: TextTone
  align?: TextAlign
  as?: ElementType
  className?: string
  htmlFor?: string
  children: ReactNode
} & HTMLAttributes<HTMLElement>

export function Text({
  variant = 'content',
  tone,
  align = 'start',
  as,
  className,
  children,
  ...rest
}: TextProps) {
  const Tag = as ?? DEFAULT_AS[variant]
  const color = tone ?? DEFAULT_TONE[variant]

  return (
    <Tag
      className={cn(
        'font-sans antialiased',
        VARIANT_CLASS[variant],
        TONE_CLASS[color],
        ALIGN_CLASS[align],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Heading({
  level = 1,
  ...rest
}: Omit<TextProps, 'variant'> & { level?: 1 | 2 | 3 | 'display' }) {
  const variant: TextVariant = level === 'display' ? 'display' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h1'
  return <Text variant={variant} {...rest} />
}

export function Subhead(props: Omit<TextProps, 'variant'>) {
  return <Text variant="subhead" {...props} />
}

export function Body({
  size = 'md',
  ...rest
}: Omit<TextProps, 'variant'> & { size?: 'md' | 'sm' }) {
  return <Text variant={size === 'sm' ? 'content-sm' : 'content'} {...rest} />
}

export const Content = Body

export function Caption(props: Omit<TextProps, 'variant'>) {
  return <Text variant="caption" {...props} />
}

export function Eyebrow(props: Omit<TextProps, 'variant'>) {
  return <Text variant="eyebrow" {...props} />
}

export function Label(props: Omit<TextProps, 'variant'>) {
  return <Text variant="label" {...props} />
}
