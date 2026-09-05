import { Children, cloneElement, isValidElement, useId, type MouseEventHandler, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_VISIBLE_RING } from '@/lib/styles'
import { Body, Caption, Heading, Label } from './Text'

export type CardVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type CardSize = 'sm' | 'md' | 'lg'
export type CardTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type CardPreview = 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'

export const CARD_VARIANTS: CardVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const CARD_SIZES: CardSize[] = ['sm', 'md', 'lg']
export const CARD_TONES: CardTone[] = ['default', 'brand', 'success', 'warning', 'danger']

export const CARD_VARIANT_LABEL: Record<CardVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const CARD_SIZE_LABEL: Record<CardSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const CARD_TONE_LABEL: Record<CardTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export type CardProps = {
  title?: string
  description?: ReactNode
  eyebrow?: string
  icon?: ReactNode
  media?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  variant?: CardVariant
  size?: CardSize
  tone?: CardTone
  selected?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  preview?: CardPreview
  onDark?: boolean
  className?: string
}

const metrics: Record<
  CardSize,
  { box: string; icon: string; well: string; media: string; stack: string; body: 'md' | 'sm' }
> = {
  sm: {
    box: 'gap-2 p-4',
    icon: '[&_svg]:size-4',
    well: 'size-8 rounded-[10px]',
    media: 'h-28',
    stack: 'gap-1',
    body: 'sm',
  },
  md: {
    box: 'gap-3 p-5 min-[735px]:p-6',
    icon: '[&_svg]:size-[18px]',
    well: 'size-9 rounded-[10px] min-[735px]:size-10 min-[735px]:rounded-[12px]',
    media: 'h-36 min-[735px]:h-40',
    stack: 'gap-1.5',
    body: 'sm',
  },
  lg: {
    box: 'gap-3.5 p-6 min-[735px]:p-8',
    icon: '[&_svg]:size-5',
    well: 'size-11 rounded-[12px]',
    media: 'h-44 min-[735px]:h-52',
    stack: 'gap-2',
    body: 'md',
  },
}

const lightChrome: Record<CardVariant, Record<CardTone, string>> = {
  fill: {
    default: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
  },
  subtle: {
    default: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
  },
  outline: {
    default: 'border border-border-default bg-transparent',
    brand: 'border border-brand-primary/30 bg-transparent',
    success: 'border border-success/30 bg-transparent',
    warning: 'border border-warning/30 bg-transparent',
    danger: 'border border-border-danger bg-transparent',
  },
  ghost: {
    default: 'border border-transparent bg-transparent',
    brand: 'border border-transparent bg-transparent',
    success: 'border border-transparent bg-transparent',
    warning: 'border border-transparent bg-transparent',
    danger: 'border border-transparent bg-transparent',
  },
  pill: {
    default: 'border border-transparent bg-bg-secondary dark:bg-bg-tertiary',
    brand: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
  },
}

const darkChrome: Record<CardVariant, Record<CardTone, string>> = {
  fill: {
    default: 'border border-[#38383a] bg-[#1c1c1e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
  },
  subtle: {
    default: 'border border-transparent bg-[#2c2c2e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
  },
  outline: {
    default: 'border border-[#48484a] bg-transparent',
    brand: 'border border-[rgba(59,158,255,0.30)] bg-transparent',
    success: 'border border-[rgba(48,209,88,0.30)] bg-transparent',
    warning: 'border border-[rgba(255,159,10,0.30)] bg-transparent',
    danger: 'border border-[rgba(255,69,58,0.30)] bg-transparent',
  },
  ghost: {
    default: 'border border-transparent bg-transparent',
    brand: 'border border-transparent bg-transparent',
    success: 'border border-transparent bg-transparent',
    warning: 'border border-transparent bg-transparent',
    danger: 'border border-transparent bg-transparent',
  },
  pill: {
    default: 'border border-transparent bg-[#1c1c1e]',
    brand: 'border border-transparent bg-[rgba(59,158,255,0.15)]',
    success: 'border border-transparent bg-[rgba(48,209,88,0.15)]',
    warning: 'border border-transparent bg-[rgba(255,159,10,0.15)]',
    danger: 'border border-transparent bg-[rgba(255,69,58,0.10)]',
  },
}

const iconInk: Record<CardTone, { rest: string; dark: string }> = {
  default: { rest: 'text-text-secondary', dark: 'text-[#a1a1a6]' },
  brand: { rest: 'text-brand-primary', dark: 'text-[#3b9eff]' },
  success: { rest: 'text-success', dark: 'text-success' },
  warning: { rest: 'text-warning', dark: 'text-warning' },
  danger: { rest: 'text-danger', dark: 'text-danger' },
}

function iconWell(variant: CardVariant, tone: CardTone, onDark: boolean): string {
  const ink = onDark ? iconInk[tone].dark : iconInk[tone].rest
  if (variant === 'ghost') return ink
  if (variant === 'outline') {
    return cn('border', onDark ? 'border-[#48484a]' : 'border-border-default', ink)
  }
  return cn(onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active', ink)
}

function surfaceChrome(
  variant: CardVariant,
  tone: CardTone,
  onDark: boolean,
  preview?: CardPreview,
  picked?: boolean,
) {
  if (picked) {
    return onDark
      ? 'border border-[rgba(59,158,255,0.30)] bg-[rgba(59,158,255,0.15)]'
      : 'border border-brand-primary bg-brand-primary-subtle'
  }

  if (preview === 'focus') {
    if (onDark) {
      return variant === 'fill' || variant === 'subtle' || variant === 'pill'
        ? 'border border-brand-primary bg-[#1c1c1e]'
        : 'border border-brand-primary bg-transparent'
    }
    if (variant === 'fill') return 'border border-brand-primary bg-bg-elevated dark:bg-bg-secondary'
    if (variant === 'outline' || variant === 'ghost') return 'border border-brand-primary bg-transparent'
    return 'border border-brand-primary bg-bg-secondary dark:bg-bg-tertiary'
  }

  const rest = onDark ? darkChrome[variant][tone] : lightChrome[variant][tone]
  if (tone !== 'default') return rest

  if (onDark) {
    if (preview === 'hover') return 'border border-transparent bg-[#2c2c2e]'
    if (preview === 'active') return 'border border-transparent bg-[#3a3a3c]'
    return rest
  }

  if (variant === 'outline') {
    if (preview === 'hover' || preview === 'active') return 'border border-border-strong bg-transparent'
    return rest
  }

  if (preview === 'hover') {
    return variant === 'fill'
      ? 'border border-border-default bg-bg-hover dark:bg-bg-active'
      : 'border border-transparent bg-bg-hover dark:bg-bg-active'
  }
  if (preview === 'active') {
    return variant === 'fill'
      ? 'border border-border-default bg-bg-active'
      : 'border border-transparent bg-bg-active'
  }
  return rest
}

function Bone({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span
      data-dk-skeleton-bone
      className={cn(
        'inline-block rounded-[8px]',
        onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active',
        'animate-pulse motion-reduce:animate-none',
        className,
      )}
    />
  )
}

export function Card({
  title,
  description,
  eyebrow,
  icon,
  media,
  children,
  footer,
  variant = 'fill',
  size = 'md',
  tone = 'default',
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
}: CardProps) {
  const titleId = useId()
  const metric = metrics[size]
  const busy = loading || preview === 'loading'
  const inert = disabled || preview === 'disabled'
  const picked = selected || preview === 'selected'
  const interactive = !inert && !busy && !preview && Boolean(href || onClick)
  const named = Boolean(title)
  const radius = variant === 'pill' ? 'rounded-[24px]' : 'rounded-[18px]'
  const mediaRadius = variant === 'pill' ? 'rounded-t-[24px]' : 'rounded-t-[18px]'

  const frame = cn(
    'flex appearance-none flex-col overflow-hidden text-start font-sans text-inherit antialiased',
    fullWidth ? 'w-full min-w-0' : 'w-fit max-w-full',
    fullHeight && 'h-full',
    radius,
    surfaceChrome(variant, tone, onDark, preview, picked),
    'transition-colors duration-150',
    EASE,
    interactive && 'cursor-pointer no-underline',
    interactive && FOCUS_VISIBLE_RING,
    interactive &&
      tone === 'default' &&
      !onDark &&
      (variant === 'outline' ? 'hover:border-border-strong' : 'hover:bg-bg-hover dark:hover:bg-bg-active'),
    interactive && tone === 'default' && onDark && 'hover:bg-[#2c2c2e]',
    preview === 'focus' && 'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
    inert && 'opacity-55',
    inert && (href || onClick) && 'cursor-not-allowed',
    className,
  )

  const titleNode = named ? (
    size === 'sm' ? (
      <Label
        id={titleId}
        as={interactive ? 'p' : 'h3'}
        tone={onDark ? undefined : 'primary'}
        className={onDark ? '!text-white' : undefined}
      >
        {title}
      </Label>
    ) : (
      <Heading
        id={titleId}
        as={interactive ? 'p' : undefined}
        level={3}
        tone={onDark ? undefined : 'primary'}
        className={onDark ? '!text-white' : undefined}
      >
        {title}
      </Heading>
    )
  ) : null

  const inner = (
    <>
      {media ? (
        <span className={cn('block w-full overflow-hidden', metric.media, mediaRadius)}>
          {busy ? <Bone onDark={onDark} className="block h-full w-full rounded-none" /> : media}
        </span>
      ) : null}
      <span className={cn('flex w-full min-h-0 flex-1 flex-col', metric.box)}>
        {icon ? (
          <span
            className={cn(
              'mb-1 inline-flex shrink-0 items-center justify-center',
              metric.icon,
              metric.well,
              iconWell(variant, tone, onDark),
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className={cn('flex min-w-0 flex-col', metric.stack)}>
          {busy ? (
            <>
              <Bone onDark={onDark} className="h-3 w-16" />
              <Bone onDark={onDark} className={size === 'sm' ? 'h-4 w-36' : 'h-6 w-44'} />
              <Bone onDark={onDark} className="h-3 w-full max-w-[240px]" />
            </>
          ) : (
            <>
              {eyebrow ? (
                <Caption
                  as="span"
                  tone={onDark ? undefined : 'tertiary'}
                  className={cn('uppercase tracking-[0.05em]', onDark && '!text-[#98989d]')}
                >
                  {eyebrow}
                </Caption>
              ) : null}
              {titleNode}
              {description ? (
                <Body
                  size={metric.body}
                  tone={onDark ? undefined : 'secondary'}
                  className={onDark ? '!text-[#a1a1a6]' : undefined}
                >
                  {description}
                </Body>
              ) : null}
            </>
          )}
        </span>
        {children && !busy ? <span className="min-w-0">{children}</span> : null}
        {footer && !busy ? (
          <span className={cn('mt-auto flex flex-wrap items-center gap-3')}>{footer}</span>
        ) : null}
      </span>
    </>
  )

  const a11y = {
    'aria-labelledby': named ? titleId : undefined,
    'aria-busy': busy || undefined,
    'aria-disabled': inert || undefined,
    'aria-pressed': onClick && picked ? true : undefined,
    'aria-current': href && picked ? ('page' as const) : undefined,
  }

  if (href && interactive) {
    return (
      <a href={href} onClick={onClick} className={frame} {...a11y}>
        {inner}
      </a>
    )
  }

  if (onClick && interactive) {
    return (
      <button type="button" onClick={onClick} className={frame} {...a11y}>
        {inner}
      </button>
    )
  }

  return (
    <article className={frame} {...a11y}>
      {inner}
    </article>
  )
}

Card.displayName = 'Card'

export type CardGridColumns = 1 | 2 | 3 | 4
export type CardGridAlign = 'stretch' | 'start'
export type CardGridWidths = 'equal' | 'fit' | 'mixed'
export type CardGridGap = 'sm' | 'md' | 'lg'

export const CARD_GRID_COLUMNS: CardGridColumns[] = [1, 2, 3, 4]
export const CARD_GRID_ALIGNS: CardGridAlign[] = ['stretch', 'start']
export const CARD_GRID_WIDTHS: CardGridWidths[] = ['equal', 'fit', 'mixed']
export const CARD_GRID_GAPS: CardGridGap[] = ['sm', 'md', 'lg']

export const CARD_GRID_COLUMN_LABEL: Record<CardGridColumns, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
}

export const CARD_GRID_ALIGN_LABEL: Record<CardGridAlign, string> = {
  stretch: 'Equal height',
  start: 'Unequal height',
}

export const CARD_GRID_WIDTH_LABEL: Record<CardGridWidths, string> = {
  equal: 'Equal width',
  fit: 'Unequal width',
  mixed: 'Mixed width',
}

export const CARD_GRID_GAP_LABEL: Record<CardGridGap, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const columnClass: Record<CardGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-2',
  3: 'grid-cols-1 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-4',
}

const mixedClass: Record<CardGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)]',
  3: 'grid-cols-1 min-[735px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]',
  4: 'grid-cols-1 min-[480px]:grid-cols-2 min-[1069px]:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]',
}

const gapClass: Record<CardGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

function isCardElement(node: unknown): node is ReactElement<CardProps> {
  return isValidElement(node) && node.type === Card
}

function mapCardGridItems(children: ReactNode, align: CardGridAlign, widths: CardGridWidths) {
  return Children.map(children, (child, index) => {
    if (!isCardElement(child)) return child
    const hug = widths === 'fit' || (widths === 'mixed' && index === 0)
    return cloneElement(child, {
      fullHeight: align === 'stretch' ? true : child.props.fullHeight,
      fullWidth: hug ? false : child.props.fullWidth,
      className: cn(widths === 'mixed' && index > 0 && 'min-w-0 min-[735px]:flex-1', child.props.className),
    })
  })
}

export function CardGrid({
  children,
  columns = 3,
  align = 'stretch',
  widths = 'equal',
  gap = 'md',
  className,
}: {
  children: ReactNode
  columns?: CardGridColumns
  align?: CardGridAlign
  widths?: CardGridWidths
  gap?: CardGridGap
  className?: string
}) {
  const items = mapCardGridItems(children, align, widths)
  const packed = widths === 'fit'
  const mixed = widths === 'mixed'

  return (
    <div
      className={cn(
        packed ? 'flex flex-wrap' : 'grid',
        !packed && (mixed ? mixedClass[columns] : columnClass[columns]),
        packed && align === 'stretch' && 'items-stretch',
        packed && align === 'start' && 'items-start',
        !packed && align === 'stretch' && 'items-stretch [&>*]:h-full',
        !packed && align === 'start' && 'items-start',
        gapClass[gap],
        className,
      )}
    >
      {items}
    </div>
  )
}

CardGrid.displayName = 'CardGrid'
