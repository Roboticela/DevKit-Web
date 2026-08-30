'use client'

import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import {
  DkChevronCaretRight,
  DkMoreOptionsEllipsis
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { useAnchoredMenu } from '@/lib/useAnchoredMenu'
import { SelectList, SelectMenu, SelectOption } from './SelectMenu'

export type BreadcrumbVariant = 'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'
export type BreadcrumbSize = 'sm' | 'md' | 'lg'
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot'
export type BreadcrumbPreview = 'hover' | 'focus' | 'active'

export const BREADCRUMB_VARIANTS: BreadcrumbVariant[] = [
  'ghost',
  'subtle',
  'outline',
  'fill',
  'pill',
]
export const BREADCRUMB_SIZES: BreadcrumbSize[] = ['sm', 'md', 'lg']
export const BREADCRUMB_SEPARATORS: BreadcrumbSeparator[] = ['chevron', 'slash', 'dot']

export const BREADCRUMB_VARIANT_LABEL: Record<BreadcrumbVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  fill: 'Fill',
  pill: 'Pill',
}

export const BREADCRUMB_SIZE_LABEL: Record<BreadcrumbSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const BREADCRUMB_SEPARATOR_LABEL: Record<BreadcrumbSeparator, string> = {
  chevron: 'Chevron',
  slash: 'Slash',
  dot: 'Dot',
}

export type BreadcrumbItem = {
  label: string
  href?: string
  onClick?: () => void
  icon?: ReactNode
  iconOnly?: boolean
  disabled?: boolean
}

type Slot =
  | { type: 'crumb'; item: BreadcrumbItem; index: number }
  | { type: 'ellipsis'; hidden: { item: BreadcrumbItem; index: number }[] }

const sizes: Record<
  BreadcrumbSize,
  {
    text: string
    icon: string
    sep: number
    ghost: string
    chip: string
    track: string
    radius: string
    trackRadius: string
  }
> = {
  sm: {
    text: 'text-[12px] leading-none tracking-[0em]',
    icon: '[&_svg]:size-3',
    sep: 12,
    ghost: 'h-6 gap-1 px-1',
    chip: 'h-6 gap-1 px-1.5',
    track: 'px-1 py-0.5',
    radius: 'rounded-[8px]',
    trackRadius: 'rounded-[10px]',
  },
  md: {
    text: 'text-[13px] leading-none tracking-[-0.01em]',
    icon: '[&_svg]:size-3.5',
    sep: 14,
    ghost: 'h-7 gap-1 px-1',
    chip: 'h-7 gap-1.5 px-2',
    track: 'px-1.5 py-1',
    radius: 'rounded-[10px]',
    trackRadius: 'rounded-[12px]',
  },
  lg: {
    text: 'text-[15px] leading-none tracking-[-0.01em]',
    icon: '[&_svg]:size-4',
    sep: 16,
    ghost: 'h-8 gap-1.5 px-1.5',
    chip: 'h-8 gap-1.5 px-2.5',
    track: 'px-2 py-1',
    radius: 'rounded-[12px]',
    trackRadius: 'rounded-[14px]',
  },
}

const tracks: Record<BreadcrumbVariant, string> = {
  ghost: '',
  subtle: 'bg-bg-secondary',
  outline: 'border border-border-default bg-transparent',
  fill: 'bg-bg-tertiary',
  pill: 'bg-bg-secondary',
}

function trailSlots(items: BreadcrumbItem[], maxItems?: number): Slot[] {
  if (!maxItems || maxItems < 3 || items.length <= maxItems) {
    return items.map((item, index) => ({ type: 'crumb', item, index }))
  }
  const lastCount = maxItems - 2
  const hidden = items.slice(1, items.length - lastCount)
  const tail = items.slice(items.length - lastCount)
  return [
    { type: 'crumb', item: items[0], index: 0 },
    { type: 'ellipsis', hidden: hidden.map((item, offset) => ({ item, index: offset + 1 })) },
    ...tail.map((item, offset) => ({
      type: 'crumb' as const,
      item,
      index: items.length - lastCount + offset,
    })),
  ]
}

function crumbChrome(
  variant: BreadcrumbVariant,
  current: boolean,
  disabled: boolean,
  preview?: BreadcrumbPreview,
) {
  if (disabled) return 'text-text-disabled'
  if (current) {
    if (variant === 'fill') return 'bg-bg-primary font-medium text-text-primary'
    if (variant === 'pill') return 'bg-bg-tertiary font-medium text-text-primary'
    return 'font-medium text-text-primary'
  }

  const rest = 'text-text-tertiary'
  const hover = cn(
    variant === 'ghost' ? 'text-brand-primary' : 'bg-bg-hover text-brand-primary',
  )
  const active = cn(
    variant === 'ghost' ? 'text-brand-primary' : 'bg-bg-active text-brand-primary',
  )

  if (preview === 'hover') return hover
  if (preview === 'active') return active
  if (preview === 'focus') {
    return cn(hover, 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]')
  }

  return cn(
    rest,
    variant === 'ghost'
      ? 'hover:text-brand-primary'
      : 'hover:bg-bg-hover hover:text-brand-primary',
    variant === 'ghost'
      ? 'active:text-brand-primary'
      : 'active:bg-bg-active active:text-brand-primary',
  )
}

function CrumbLabel({
  item,
  size,
}: {
  item: BreadcrumbItem
  size: BreadcrumbSize
}) {
  const metric = sizes[size]
  return (
    <>
      {item.icon ? (
        <span className={cn('inline-flex shrink-0 items-center justify-center', metric.icon)} aria-hidden>
          {item.icon}
        </span>
      ) : null}
      {item.iconOnly ? <span className="sr-only">{item.label}</span> : <span className="truncate">{item.label}</span>}
    </>
  )
}

function Crumb({
  item,
  current,
  variant,
  size,
  preview,
}: {
  item: BreadcrumbItem
  current: boolean
  variant: BreadcrumbVariant
  size: BreadcrumbSize
  preview?: BreadcrumbPreview
}) {
  const metric = sizes[size]
  const disabled = Boolean(item.disabled)
  const interactive = !current && !disabled && Boolean(item.href || item.onClick)
  const chip = variant !== 'ghost'
  const className = cn(
    'inline-flex max-w-[12rem] min-[735px]:max-w-[16rem] items-center font-sans transition-[color,background-color,box-shadow] duration-150',
    EASE,
    metric.text,
    chip ? metric.chip : metric.ghost,
    variant === 'pill' ? 'rounded-[980px]' : metric.radius,
    crumbChrome(variant, current, disabled, preview),
    interactive && 'cursor-pointer',
    disabled && 'cursor-not-allowed',
    !interactive && !disabled && 'cursor-default',
    'outline-none',
    !preview &&
      interactive &&
      'focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
  )

  const content = <CrumbLabel item={item} size={size} />

  if (item.href && interactive) {
    return (
      <a href={item.href} onClick={item.onClick} className={className}>
        {content}
      </a>
    )
  }

  if (interactive) {
    return (
      <button type="button" onClick={item.onClick} className={className}>
        {content}
      </button>
    )
  }

  return (
    <span className={className} aria-current={current ? 'page' : undefined}>
      {content}
    </span>
  )
}

function Separator({
  kind,
  size,
}: {
  kind: BreadcrumbSeparator
  size: BreadcrumbSize
}) {
  const metric = sizes[size]
  if (kind === 'slash') {
    return (
      <span
        className={cn('select-none font-sans text-text-tertiary', metric.text)}
        aria-hidden
      >
        /
      </span>
    )
  }
  if (kind === 'dot') {
    return (
      <span
        className={cn('select-none font-sans text-text-tertiary', metric.text)}
        aria-hidden
      >
        ·
      </span>
    )
  }
  return (
    <DkChevronCaretRight
      size={metric.sep}
      strokeWidth={1.75}
      absoluteStrokeWidth
      className="shrink-0 text-text-tertiary"
      aria-hidden
    />
  )
}

function Overflow({
  hidden,
  variant,
  size,
  preview,
}: {
  hidden: { item: BreadcrumbItem; index: number }[]
  variant: BreadcrumbVariant
  size: BreadcrumbSize
  preview?: BreadcrumbPreview
}) {
  const metric = sizes[size]
  const chip = variant !== 'ghost'
  const {
    open,
    setOpen,
    menuStyle,
    openUp,
    rootRef,
    triggerRef,
    menuRef,
    listId,
    close,
  } = useAnchoredMenu([hidden.length], {
    matchWidth: false,
    minWidth: 168,
    maxWidth: 240,
    estimatedHeight: Math.min(280, 16 + hidden.length * 44),
  })

  return (
    <span className="relative inline-flex" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Show more pages"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'inline-flex items-center justify-center font-sans transition-[color,background-color,box-shadow] duration-150',
          EASE,
          metric.text,
          chip ? metric.chip : metric.ghost,
          variant === 'pill' ? 'rounded-[980px]' : metric.radius,
          crumbChrome(variant, false, false, preview),
          'cursor-pointer outline-none',
          !preview && 'focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
          open && (variant === 'ghost' ? 'text-brand-primary' : 'bg-bg-hover text-brand-primary'),
        )}
      >
        <DkMoreOptionsEllipsis
          size={metric.sep}
          strokeWidth={2}
          absoluteStrokeWidth
          aria-hidden
        />
      </button>
      {open
        ? createPortal(
            <SelectMenu
              id={listId}
              label="More pages"
              openUp={openUp}
              style={menuStyle}
              menuRef={menuRef}
              className="z-[400] min-w-[168px]"
            >
              <SelectList>
                {hidden.map(({ item, index }) => (
                  <SelectOption
                    key={`${item.label}-${index}`}
                    name={item.label}
                    leading={
                      item.icon ? (
                        <span className="inline-flex [&_svg]:size-4">{item.icon}</span>
                      ) : undefined
                    }
                    disabled={item.disabled}
                    className="min-h-9 text-[13px]"
                    onClick={() => {
                      if (item.disabled) return
                      item.onClick?.()
                      close()
                    }}
                  />
                ))}
              </SelectList>
            </SelectMenu>,
            document.body,
          )
        : null}
    </span>
  )
}

export function Breadcrumbs({
  items,
  variant = 'ghost',
  size = 'md',
  separator = 'chevron',
  maxItems,
  preview,
  previewIndex = 0,
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
}: {
  items: BreadcrumbItem[]
  variant?: BreadcrumbVariant
  size?: BreadcrumbSize
  separator?: BreadcrumbSeparator
  maxItems?: number
  preview?: BreadcrumbPreview
  previewIndex?: number
  className?: string
  'aria-label'?: string
}) {
  if (items.length === 0) return null

  const metric = sizes[size]
  const trail = trailSlots(items, maxItems)
  const lastIndex = items.length - 1
  const pill = variant === 'pill'

  return (
    <nav aria-label={ariaLabel} className={cn('min-w-0', className)}>
      <ol
        className={cn(
          'm-0 flex list-none flex-wrap items-center p-0',
          tracks[variant],
          pill ? cn('rounded-[980px]', metric.track) : variant !== 'ghost' && cn(metric.trackRadius, metric.track),
        )}
      >
        {trail.map((slot, slotIndex) => {
          const previewHere =
            preview &&
            ((slot.type === 'crumb' && slot.index === previewIndex) ||
              (slot.type === 'ellipsis' && previewIndex < 0))
          return (
            <li
              key={slot.type === 'crumb' ? `${slot.item.label}-${slot.index}` : 'ellipsis'}
              className="inline-flex items-center"
            >
              {slotIndex > 0 ? (
                <span className="inline-flex items-center px-1">
                  <Separator kind={separator} size={size} />
                </span>
              ) : null}
              {slot.type === 'ellipsis' ? (
                <Overflow
                  hidden={slot.hidden}
                  variant={variant}
                  size={size}
                  preview={previewHere ? preview : undefined}
                />
              ) : (
                <Crumb
                  item={slot.item}
                  current={slot.index === lastIndex}
                  variant={variant}
                  size={size}
                  preview={previewHere ? preview : undefined}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
