'use client'

import {
  createContext,
  useContext,
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { DkChevronCaretRight, DkTaskCompleteCheckmark } from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Loader } from './Loader'
import { Body, Caption } from './Text'

export type SettingsRowVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type SettingsRowSize = 'sm' | 'md' | 'lg'
export type SettingsRowLayout = 'control' | 'navigation' | 'value' | 'selection' | 'action'
export type SettingsRowTone = 'default' | 'brand' | 'danger'
export type SettingsRowIconTone = 'brand' | 'teal' | 'success' | 'warning' | 'danger' | 'muted'
export type SettingsRowPreview = 'hover' | 'focus' | 'active'

export const SETTINGS_ROW_VARIANTS: SettingsRowVariant[] = [
  'fill',
  'subtle',
  'outline',
  'ghost',
  'pill',
]
export const SETTINGS_ROW_SIZES: SettingsRowSize[] = ['sm', 'md', 'lg']
export const SETTINGS_ROW_LAYOUTS: SettingsRowLayout[] = [
  'control',
  'navigation',
  'value',
  'selection',
  'action',
]
export const SETTINGS_ROW_TONES: SettingsRowTone[] = ['default', 'brand', 'danger']
export const SETTINGS_ROW_ICON_TONES: SettingsRowIconTone[] = [
  'brand',
  'teal',
  'success',
  'warning',
  'danger',
  'muted',
]

export const SETTINGS_ROW_VARIANT_LABEL: Record<SettingsRowVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SETTINGS_ROW_SIZE_LABEL: Record<SettingsRowSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const SETTINGS_ROW_LAYOUT_LABEL: Record<SettingsRowLayout, string> = {
  control: 'Control',
  navigation: 'Navigation',
  value: 'Value',
  selection: 'Selection',
  action: 'Action',
}

export const SETTINGS_ROW_TONE_LABEL: Record<SettingsRowTone, string> = {
  default: 'Default',
  brand: 'Brand',
  danger: 'Danger',
}

export const SETTINGS_ROW_ICON_TONE_LABEL: Record<SettingsRowIconTone, string> = {
  brand: 'Brand',
  teal: 'Teal',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  muted: 'Muted',
}

type GroupValue = {
  variant: SettingsRowVariant
  size: SettingsRowSize
}

const SettingsGroupContext = createContext<GroupValue | null>(null)

type Metric = {
  pad: string
  padL: string
  minH: string
  gap: string
  title: string
  chevron: number
  mark: string
  loader: number
}

const DENSITY: Record<SettingsRowSize, Metric> = {
  sm: {
    pad: 'px-3',
    padL: 'pl-3',
    minH: 'min-h-11',
    gap: 'gap-2.5',
    title: 'text-[15px] leading-[1.3] tracking-[-0.016em]',
    chevron: 14,
    mark: 'size-[26px] rounded-[6px] [&_svg]:size-3.5',
    loader: 14,
  },
  md: {
    pad: 'px-4',
    padL: 'pl-4',
    minH: 'min-h-[52px]',
    gap: 'gap-3',
    title: 'text-[17px] leading-[1.3] tracking-[-0.022em]',
    chevron: 16,
    mark: 'size-[29px] rounded-[7px] [&_svg]:size-4',
    loader: 16,
  },
  lg: {
    pad: 'px-5',
    padL: 'pl-5',
    minH: 'min-h-16',
    gap: 'gap-3.5',
    title: 'text-[17px] leading-[1.3] tracking-[-0.022em] min-[735px]:text-[19px]',
    chevron: 18,
    mark: 'size-8 rounded-[8px] [&_svg]:size-[18px]',
    loader: 18,
  },
}

const TITLE_TONE: Record<SettingsRowTone, string> = {
  default: 'text-text-primary',
  brand: 'text-brand-primary',
  danger: 'text-danger',
}

const MARK_PAINT: Record<SettingsRowIconTone, string> = {
  brand: 'bg-brand-primary text-text-on-brand',
  teal: 'bg-accent-teal text-text-on-brand',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-text-on-brand',
  muted: 'bg-text-tertiary text-text-on-brand',
}

function groupChrome(variant: SettingsRowVariant) {
  const base = 'm-0 flex list-none flex-col p-0'
  const inset = 'overflow-hidden rounded-[12px] min-[735px]:rounded-[18px]'
  const chrome: Record<SettingsRowVariant, string> = {
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
  variant: SettingsRowVariant
  grouped: boolean
  selected: boolean
  disabled: boolean
  tappable: boolean
  preview?: SettingsRowPreview
  tone: SettingsRowTone
}) {
  const danger = tone === 'danger'
  const liveHover = tappable && !preview && !selected
  const hoverPreview = preview === 'hover' && !selected
  const pressPreview = preview === 'active' && !selected
  const focusPreview = preview === 'focus'

  return cn(
    'w-full border-0 bg-transparent text-left font-sans',
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
      'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary',
    focusPreview && 'outline-2 outline-offset-[-2px] outline-brand-primary',
    disabled && 'cursor-not-allowed opacity-55',
  )
}

function resolveLayout({
  layout,
  control,
  value,
  selected,
  onClick,
  href,
}: {
  layout?: SettingsRowLayout
  control?: ReactNode
  value?: ReactNode
  selected?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  href?: string
}): SettingsRowLayout {
  if (layout) return layout
  if (selected !== undefined) return 'selection'
  if (control) return 'control'
  if (value !== undefined) return 'value'
  if (onClick || href) return 'navigation'
  return 'control'
}

export function SettingsMark({
  children,
  tone = 'brand',
  size,
  className,
}: {
  children: ReactNode
  tone?: SettingsRowIconTone
  size?: SettingsRowSize
  className?: string
}) {
  const group = useContext(SettingsGroupContext)
  const metric = DENSITY[size ?? group?.size ?? 'md']

  return (
    <span
      aria-hidden
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

export function SettingsList({
  children,
  variant = 'fill',
  size = 'md',
  header,
  footer,
  className,
}: {
  children: ReactNode
  variant?: SettingsRowVariant
  size?: SettingsRowSize
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
      <SettingsGroupContext.Provider value={{ variant, size }}>
        <ul
          className={groupChrome(variant)}
          aria-label={typeof header === 'string' ? header : undefined}
        >
          {children}
        </ul>
      </SettingsGroupContext.Provider>
      {footer ? (
        <Caption as="div" className={cn(metric.pad, 'pt-2')}>
          {footer}
        </Caption>
      ) : null}
    </div>
  )
}

export function SettingsRow({
  label,
  description,
  value,
  control,
  icon,
  iconTone = 'brand',
  leading,
  badge,
  layout: layoutProp,
  variant: variantProp,
  size: sizeProp,
  tone: toneProp,
  danger = false,
  selected,
  disabled = false,
  loading = false,
  href,
  onClick,
  chevron,
  align = 'start',
  preview,
  className,
}: {
  label: ReactNode
  description?: ReactNode
  value?: ReactNode
  control?: ReactNode
  icon?: ReactNode
  iconTone?: SettingsRowIconTone
  leading?: ReactNode
  badge?: ReactNode
  layout?: SettingsRowLayout
  variant?: SettingsRowVariant
  size?: SettingsRowSize
  tone?: SettingsRowTone
  danger?: boolean
  selected?: boolean
  disabled?: boolean
  loading?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  chevron?: boolean
  align?: 'start' | 'center'
  preview?: SettingsRowPreview
  className?: string
}) {
  const group = useContext(SettingsGroupContext)
  const grouped = group !== null
  const variant = variantProp ?? group?.variant ?? 'fill'
  const size = sizeProp ?? group?.size ?? 'md'
  const metric = DENSITY[size]
  const tone = toneProp ?? (danger ? 'danger' : 'default')
  const layout = resolveLayout({
    layout: layoutProp,
    control,
    value,
    selected,
    onClick,
    href,
  })
  const inert = disabled || loading
  const nestedControl = layout === 'control' && Boolean(control)
  const interactive = Boolean((onClick || href) && !inert)
  const centered = layout === 'action' && align === 'center'
  const showCheck = layout === 'selection' && selected && !inert
  const showChevron =
    chevron === true ||
    (chevron !== false &&
      !inert &&
      !showCheck &&
      (layout === 'navigation' || (layout === 'value' && interactive)))
  const tappable =
    !inert && (interactive || chevron === true || Boolean(preview) || layout === 'selection')
  const mark =
    leading ??
    (icon ? <SettingsMark tone={iconTone}>{icon}</SettingsMark> : null)
  const labelText = typeof label === 'string' ? label : undefined

  const rowClass = cn(
    'dk-settings-row relative m-0 flex items-stretch p-0',
    metric.minH,
    metric.gap,
    rowSurface({
      variant,
      grouped,
      selected: Boolean(selected) && layout === 'selection',
      disabled: inert,
      tappable: tappable && !nestedControl,
      preview,
      tone,
    }),
    className,
  )

  const labelClass = cn(
    'truncate font-normal',
    metric.title,
    layout === 'action' || tone !== 'default' ? TITLE_TONE[tone] : 'text-text-primary',
  )

  const body = (
    <>
      {mark && !centered ? (
        <span className={cn('inline-flex shrink-0 items-center self-stretch', metric.padL)}>
          {mark}
        </span>
      ) : null}
      <span
        className={cn(
          'relative flex min-w-0 flex-1 items-center py-2.5',
          metric.gap,
          centered ? cn('justify-center', metric.pad) : 'justify-between',
          mark && !centered ? 'pr-4 min-[735px]:pr-5' : !centered ? metric.pad : null,
          size === 'lg' && 'py-3.5',
        )}
      >
        {centered ? (
          <span className={labelClass}>{label}</span>
        ) : (
          <>
            <span className="flex min-w-0 flex-col gap-0.5">
              <Body size="sm" as="span" tone="primary" className={labelClass}>
                {label}
              </Body>
              {description ? (
                <Caption as="span" className="truncate leading-[1.3]">
                  {description}
                </Caption>
              ) : null}
            </span>
            <span className="inline-flex shrink-0 items-center gap-2.5">
              {loading ? (
                <Loader decorative size={metric.loader} tone="brand" />
              ) : (
                <>
                  {badge}
                  {value !== undefined && layout !== 'control' ? (
                    <Body
                      size="sm"
                      as="span"
                      tone="tertiary"
                      className="max-w-[11rem] truncate text-end min-[735px]:max-w-[14rem]"
                    >
                      {value}
                    </Body>
                  ) : null}
                  {nestedControl ? (
                    <span
                      className="inline-flex shrink-0 items-center"
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      {control}
                    </span>
                  ) : null}
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
                </>
              )}
            </span>
          </>
        )}
        {grouped && variant !== 'pill' ? (
          <span
            aria-hidden
            className={cn(
              'dk-settings-sep pointer-events-none absolute right-0 bottom-0 h-px bg-border-subtle',
              mark ? 'left-0' : size === 'sm' ? 'left-3' : size === 'lg' ? 'left-5' : 'left-4',
            )}
          />
        ) : null}
      </span>
    </>
  )

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onClick?.(event as never)
  }

  const controlNode =
    href && !inert && !nestedControl ? (
      <Link href={href} className={rowClass} aria-label={labelText} onClick={onClick}>
        {body}
      </Link>
    ) : interactive && !nestedControl ? (
      <button
        type="button"
        className={cn(rowClass, 'appearance-none')}
        aria-label={labelText}
        aria-pressed={layout === 'selection' ? Boolean(selected) : undefined}
        aria-busy={loading || undefined}
        disabled={disabled}
        onClick={onClick}
      >
        {body}
      </button>
    ) : (
      <div
        className={rowClass}
        aria-label={nestedControl && interactive ? labelText : undefined}
        aria-disabled={inert || undefined}
        aria-busy={loading || undefined}
        tabIndex={nestedControl && interactive ? 0 : undefined}
        onClick={nestedControl && interactive ? onClick : undefined}
        onKeyDown={nestedControl && interactive ? onKey : undefined}
      >
        {body}
      </div>
    )

  if (!grouped) return controlNode

  return (
    <li
      className={cn(
        'relative list-none',
        variant === 'pill' && 'overflow-hidden rounded-[16px]',
        'last:[&_.dk-settings-sep]:hidden',
      )}
    >
      {controlNode}
    </li>
  )
}
