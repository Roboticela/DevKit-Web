'use client'

import {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { DkChevronCaretRight, DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Anchor } from './Anchor'
import { Caption } from './Text'

export type ListRowVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type ListRowSize = 'sm' | 'md' | 'lg'
export type ListRowTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type ListRowPreview = 'hover' | 'focus' | 'active'

export const LIST_ROW_VARIANTS: ListRowVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const LIST_ROW_SIZES: ListRowSize[] = ['sm', 'md', 'lg']
export const LIST_ROW_TONES: ListRowTone[] = ['default', 'brand', 'success', 'warning', 'danger']

export const LIST_ROW_VARIANT_LABEL: Record<ListRowVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const LIST_ROW_SIZE_LABEL: Record<ListRowSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const LIST_ROW_TONE_LABEL: Record<ListRowTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

type GroupValue = {
  variant: ListRowVariant
  size: ListRowSize
}

const ListGroupContext = createContext<GroupValue | null>(null)

const DENSITY: Record<
  ListRowSize,
  { pad: string; padL: string; minH: string; gap: string; title: string; chevron: number; mark: string }
> = {
  sm: {
    pad: 'px-3',
    padL: 'pl-3',
    minH: 'min-h-11',
    gap: 'gap-2.5',
    title: 'text-[15px] leading-[1.3]',
    chevron: 14,
    mark: 'size-6 rounded-[7px] [&_svg]:size-3.5',
  },
  md: {
    pad: 'px-4',
    padL: 'pl-4',
    minH: 'min-h-[52px]',
    gap: 'gap-3',
    title: 'text-[17px] leading-[1.3]',
    chevron: 16,
    mark: 'size-7 rounded-[8px] [&_svg]:size-4',
  },
  lg: {
    pad: 'px-5',
    padL: 'pl-5',
    minH: 'min-h-16',
    gap: 'gap-3.5',
    title: 'text-[17px] leading-[1.3] min-[735px]:text-[19px]',
    chevron: 18,
    mark: 'size-8 rounded-[10px] [&_svg]:size-[18px]',
  },
}

const TITLE_COLOR: Record<ListRowTone, string> = {
  default: 'text-text-primary',
  brand: 'text-text-link',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

const MARK_PAINT: Record<ListRowTone, string> = {
  default: 'bg-bg-tertiary text-text-primary',
  brand: 'bg-brand-primary text-text-on-brand',
  success: 'bg-success text-text-on-brand',
  warning: 'bg-warning text-text-on-brand',
  danger: 'bg-danger text-text-on-brand',
}

function groupChrome(variant: ListRowVariant) {
  const base = 'm-0 flex list-none flex-col p-0'
  const inset = 'overflow-hidden rounded-[12px] min-[735px]:rounded-[18px]'
  const chrome: Record<ListRowVariant, string> = {
    fill: cn(base, inset, 'border border-border-default bg-bg-elevated dark:bg-bg-secondary'),
    subtle: cn(base, inset, 'bg-bg-secondary dark:bg-bg-tertiary'),
    outline: cn(base, inset, 'border border-border-default bg-transparent'),
    ghost: base,
    pill: cn(base, 'gap-1 rounded-[24px] bg-bg-secondary p-1 dark:bg-bg-tertiary'),
  }
  return chrome[variant]
}

function rowSurface({
  variant,
  grouped,
  selected,
  disabled,
  tappable,
  preview,
  tone,
}: {
  variant: ListRowVariant
  grouped: boolean
  selected: boolean
  disabled: boolean
  tappable: boolean
  preview?: ListRowPreview
  tone: ListRowTone
}) {
  const danger = tone === 'danger'
  const liveHover = tappable && !preview && !selected
  const hoverPreview = preview === 'hover' && !selected
  const pressPreview = preview === 'active' && !selected
  const focusPreview = preview === 'focus'

  return cn(
    'w-full border-0 bg-transparent p-0 text-left font-sans text-inherit no-underline',
    'touch-manipulation [-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-150',
    EASE,
    grouped && variant === 'pill' && 'rounded-[16px]',
    !grouped && groupChrome(variant),
    !grouped && variant === 'pill' && 'p-0',
    selected && (danger ? 'bg-danger-subtle' : 'bg-brand-primary-subtle'),
    liveHover && (danger ? 'hover:bg-danger-subtle' : 'hover:bg-bg-hover'),
    hoverPreview && (danger ? 'bg-danger-subtle' : 'bg-bg-hover'),
    pressPreview && (danger ? 'bg-danger-subtle' : 'bg-bg-active'),
    tappable && !preview && 'cursor-pointer',
    tappable &&
      !preview &&
      'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    focusPreview && 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    disabled && 'cursor-not-allowed opacity-55',
  )
}

export function ListGroup({
  children,
  variant = 'fill',
  size = 'md',
  header,
  footer,
  className,
}: {
  children: ReactNode
  variant?: ListRowVariant
  size?: ListRowSize
  header?: ReactNode
  footer?: ReactNode
  className?: string
}) {
  const metric = DENSITY[size]

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {header ? (
        <Caption as="div" className={cn(metric.pad, 'pb-2')}>
          {header}
        </Caption>
      ) : null}
      <ListGroupContext.Provider value={{ variant, size }}>
        <ul className={groupChrome(variant)}>{children}</ul>
      </ListGroupContext.Provider>
      {footer ? (
        <Caption as="div" className={cn(metric.pad, 'pt-2')}>
          {footer}
        </Caption>
      ) : null}
    </div>
  )
}

export function ListMark({
  children,
  tone = 'brand',
  size,
  className,
}: {
  children: ReactNode
  tone?: ListRowTone
  size?: ListRowSize
  className?: string
}) {
  const group = useContext(ListGroupContext)
  const metric = DENSITY[size ?? group?.size ?? 'md']

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        metric.mark,
        MARK_PAINT[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TextAction({
  children,
  danger = false,
  className,
  ...rest
}: {
  children: ReactNode
  danger?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Anchor
      size="sm"
      tone={danger ? 'danger' : 'brand'}
      className={className}
      {...(rest as Omit<ComponentProps<typeof Anchor>, 'children'>)}
    >
      {children}
    </Anchor>
  )
}

export function ListRow({
  title,
  meta,
  value,
  leading,
  trailing,
  chevron,
  variant: variantProp,
  size: sizeProp,
  tone = 'default',
  selected = false,
  disabled = false,
  preview,
  href,
  onClick,
  className,
}: {
  title: ReactNode
  meta?: ReactNode
  value?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  chevron?: boolean
  variant?: ListRowVariant
  size?: ListRowSize
  tone?: ListRowTone
  selected?: boolean
  disabled?: boolean
  preview?: ListRowPreview
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
}) {
  const group = useContext(ListGroupContext)
  const grouped = group !== null
  const variant = variantProp ?? group?.variant ?? 'fill'
  const size = sizeProp ?? group?.size ?? 'md'
  const metric = DENSITY[size]
  const interactive = Boolean((onClick || href) && !disabled)
  const showCheck = selected && !disabled
  const showChevron = chevron === true || (chevron !== false && interactive && !showCheck)
  const tappable = !disabled && (interactive || chevron === true || Boolean(preview))

  const rowClass = cn(
    'relative flex items-stretch',
    metric.minH,
    metric.gap,
    rowSurface({
      variant,
      grouped,
      selected,
      disabled,
      tappable,
      preview,
      tone,
    }),
    className,
  )

  const body = (
    <>
      {leading ? (
        <span className={cn('inline-flex shrink-0 items-center self-stretch', metric.padL)}>
          {leading}
        </span>
      ) : null}
      <span
        className={cn(
          'relative flex min-w-0 flex-1 items-center justify-between py-2.5',
          metric.gap,
          leading ? 'pr-4 min-[735px]:pr-5' : metric.pad,
          size === 'lg' && 'py-3.5',
        )}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className={cn('m-0 truncate font-sans font-normal antialiased', metric.title, TITLE_COLOR[tone])}>
            {title}
          </span>
          {meta ? (
            <Caption as="span" className="truncate">
              {meta}
            </Caption>
          ) : null}
        </span>
        <span className="inline-flex shrink-0 items-center gap-2.5">
          {value ? (
            <span
              className={cn(
                'max-w-[11rem] truncate text-end font-sans font-normal antialiased text-text-tertiary min-[735px]:max-w-[14rem]',
                size === 'sm' ? 'text-[15px] leading-[1.3]' : 'text-[17px] leading-[1.3]',
              )}
            >
              {value}
            </span>
          ) : null}
          {trailing}
          {showCheck ? (
            <DkTaskCompleteCheckmark
              size={metric.chevron}
              strokeWidth={2.25}
              absoluteStrokeWidth
              className={tone === 'danger' ? 'text-danger' : 'text-brand-primary'}
              aria-hidden
            />
          ) : null}
          {showChevron ? (
            <DkChevronCaretRight
              size={metric.chevron}
              strokeWidth={2}
              absoluteStrokeWidth
              className="text-text-tertiary"
              aria-hidden
            />
          ) : null}
        </span>
        {grouped && variant !== 'pill' ? (
          <span
            aria-hidden
            className={cn(
              'dk-list-sep pointer-events-none absolute right-0 bottom-0 h-px bg-border-subtle',
              leading ? 'left-0' : size === 'sm' ? 'left-3' : size === 'lg' ? 'left-5' : 'left-4',
            )}
          />
        ) : null}
      </span>
    </>
  )

  const control = href && !disabled ? (
    <Link href={href} className={rowClass} aria-current={selected ? 'true' : undefined} onClick={onClick}>
      {body}
    </Link>
  ) : onClick && !disabled ? (
    <button
      type="button"
      className={rowClass}
      aria-current={selected ? 'true' : undefined}
      onClick={onClick}
    >
      {body}
    </button>
  ) : (
    <div
      className={rowClass}
      aria-current={selected ? 'true' : undefined}
      aria-disabled={disabled || undefined}
    >
      {body}
    </div>
  )

  if (!grouped) return control

  return (
    <li
      className={cn(
        'relative list-none',
        variant === 'pill' && 'rounded-[16px]',
        'last:[&_.dk-list-sep]:hidden',
      )}
    >
      {control}
    </li>
  )
}
