'use client'

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import {
  DkChevronCaretDown,
  DkMagnifyingGlassFind,
  DkPanelLeftwardClose,
  DkPanelLeftwardOpened,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_RING, OPEN_RING } from '@/lib/styles'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { BrandLogo } from './BrandLogo'
import { IconButton } from './IconButton'
import { Caption, Eyebrow } from './Text'

export type SidebarVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type SidebarSize = 'sm' | 'md' | 'lg'
export type SidebarItemPreview = 'hover' | 'focus' | 'active'

export const SIDEBAR_VARIANTS: SidebarVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const SIDEBAR_SIZES: SidebarSize[] = ['sm', 'md', 'lg']

export const SIDEBAR_VARIANT_LABEL: Record<SidebarVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SIDEBAR_SIZE_LABEL: Record<SidebarSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export type SidebarItem = {
  id: string
  label: string
  icon: ReactNode
  badge?: string | number
  tone?: 'default' | 'danger'
  disabled?: boolean
}

export type SidebarSection = {
  label?: string
  collapsible?: boolean
  defaultOpen?: boolean
  items: SidebarItem[]
}

export type SidebarAccount = {
  name: string
  src?: string | null
  detail?: string
  onClick?: () => void
}

export type SidebarBrand = {
  href?: string
  label?: string
}

type Density = {
  aside: string
  rail: string
  item: string
  itemPad: string
  itemType: string
  icon: number
  gap: string
  radius: string
  section: string
  mark: number
}

const DENSITY: Record<SidebarSize, Density> = {
  sm: {
    aside: 'w-[220px]',
    rail: 'w-16',
    item: 'h-8',
    itemPad: 'px-2.5',
    itemType: 'text-[12px] font-medium leading-none tracking-[-0.01em]',
    icon: 16,
    gap: 'gap-2',
    radius: 'rounded-[8px]',
    section: 'px-2.5',
    mark: 20,
  },
  md: {
    aside: 'w-[260px]',
    rail: 'w-[68px]',
    item: 'h-9',
    itemPad: 'px-3',
    itemType: 'text-[13px] font-medium leading-none tracking-[-0.01em]',
    icon: 18,
    gap: 'gap-2.5',
    radius: 'rounded-[10px]',
    section: 'px-3',
    mark: 22,
  },
  lg: {
    aside: 'w-[300px]',
    rail: 'w-[76px]',
    item: 'h-11',
    itemPad: 'px-3.5',
    itemType: 'text-[15px] font-medium leading-none tracking-[-0.01em]',
    icon: 20,
    gap: 'gap-3',
    radius: 'rounded-[12px]',
    section: 'px-3.5',
    mark: 24,
  },
}

const CHROME: Record<SidebarVariant, string> = {
  fill: 'border-r border-border-default bg-bg-secondary',
  subtle: 'border-r border-border-default bg-bg-elevated dark:bg-bg-secondary',
  outline: 'border-r border-border-default bg-transparent',
  ghost: 'bg-transparent',
  pill: cn(
    'my-2 ml-2 rounded-[18px] border border-border-default bg-bg-secondary',
    'max-[734px]:my-0 max-[734px]:ml-0 max-[734px]:h-full max-[734px]:rounded-none',
  ),
}

function sizedIcon(icon: ReactNode, size: number) {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number }>, { size })
  }
  return icon
}

function itemSurface({
  variant,
  active,
  danger,
  disabled,
  preview,
  collapsed,
  radius,
}: {
  variant: SidebarVariant
  active: boolean
  danger: boolean
  disabled: boolean
  preview?: SidebarItemPreview
  collapsed: boolean
  radius: string
}) {
  const pill = variant === 'pill' && !collapsed
  const shape = pill ? 'rounded-[980px]' : radius
  const selected = active && !danger && !disabled
  const hover = !disabled && !preview && !selected
  const focusPreview = preview === 'focus'
  const hoverPreview = preview === 'hover' && !selected && !danger
  const pressPreview = preview === 'active' && !selected && !danger

  return cn(
    shape,
    danger && 'text-danger',
    danger && hover && 'hover:bg-danger-subtle',
    danger && hoverPreview && 'bg-danger-subtle',
    !danger && !selected && 'text-text-secondary dark:text-text-tertiary',
    hover && !danger && 'hover:bg-bg-hover hover:text-text-primary',
    hoverPreview && 'bg-bg-hover text-text-primary',
    pressPreview && 'bg-bg-active text-text-primary',
    selected && 'bg-brand-primary-subtle text-brand-primary',
    disabled && 'cursor-not-allowed text-text-disabled opacity-55',
    focusPreview && OPEN_RING,
  )
}

export function SidebarNavItem({
  item,
  active = false,
  onSelect,
  size = 'md',
  variant = 'fill',
  collapsed = false,
  preview,
}: {
  item: SidebarItem
  active?: boolean
  onSelect?: (id: string) => void
  size?: SidebarSize
  variant?: SidebarVariant
  collapsed?: boolean
  preview?: SidebarItemPreview
}) {
  const density = DENSITY[size]
  const danger = item.tone === 'danger'
  const disabled = Boolean(item.disabled)
  const showBadge = item.badge !== undefined && item.badge !== 0 && item.badge !== '0'
  const count = typeof item.badge === 'number' ? item.badge : Number(item.badge)

  return (
    <button
      type="button"
      className={cn(
        'relative flex w-full cursor-pointer items-center border-0 bg-transparent text-left font-sans',
        'transition-colors duration-150',
        EASE,
        'focus-visible:outline-none',
        !preview && !disabled && 'focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
        density.item,
        collapsed ? 'justify-center px-0' : cn(density.itemPad, density.gap),
        itemSurface({
          variant,
          active,
          danger,
          disabled,
          preview,
          collapsed,
          radius: density.radius,
        }),
      )}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      title={collapsed ? item.label : undefined}
      onClick={() => {
        if (!disabled) onSelect?.(item.id)
      }}
    >
      <span
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center text-current',
          collapsed && cn('size-8', density.radius),
        )}
      >
        {sizedIcon(item.icon, density.icon)}
        {collapsed && showBadge ? (
          <span
            className={cn(
              'absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[980px] px-1 text-[9px] font-medium leading-none text-white',
              danger ? 'bg-danger' : 'bg-brand-primary',
            )}
          >
            {typeof count === 'number' && count > 9 ? '9+' : item.badge}
          </span>
        ) : null}
      </span>
      {collapsed ? null : (
        <>
          <span className={cn('min-w-0 flex-1 truncate', density.itemType)}>{item.label}</span>
          {showBadge ? (
            <Badge tone={danger ? 'unverified' : 'neutral'} className="px-1.5">
              {item.badge}
            </Badge>
          ) : null}
        </>
      )}
    </button>
  )
}

function SidebarSectionBlock({
  section,
  last,
  activeId,
  onSelect,
  size,
  variant,
  collapsed,
}: {
  section: SidebarSection
  last?: boolean
  activeId?: string
  onSelect?: (id: string) => void
  size: SidebarSize
  variant: SidebarVariant
  collapsed: boolean
}) {
  const density = DENSITY[size]
  const [open, setOpen] = useState(section.defaultOpen !== false)
  const headingId = useId()
  const canToggle = Boolean(section.collapsible && section.label && !collapsed)
  const visible = collapsed || !section.collapsible || open

  return (
    <div className="flex flex-col gap-1">
      {section.label && !collapsed ? (
        canToggle ? (
          <button
            type="button"
            className={cn(
              'flex h-8 w-full cursor-pointer items-center justify-between border-0 bg-transparent text-left',
              density.section,
            )}
            aria-expanded={open}
            aria-controls={headingId}
            onClick={() => setOpen((current) => !current)}
          >
            <Eyebrow as="span">{section.label}</Eyebrow>
            <DkChevronCaretDown
              size={12}
              strokeWidth={1.75}
              absoluteStrokeWidth
              className={cn(
                'text-text-tertiary transition-transform duration-200',
                EASE,
                open ? 'rotate-0' : '-rotate-90',
              )}
            />
          </button>
        ) : (
          <Eyebrow className={cn(density.section, 'pb-1')}>{section.label}</Eyebrow>
        )
      ) : null}
      <div
        id={canToggle ? headingId : undefined}
        className={cn(
          canToggle && 'grid transition-[grid-template-rows] duration-200',
          canToggle && EASE,
          canToggle && (visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'),
        )}
      >
        <div className={cn('flex flex-col gap-0.5', canToggle && 'overflow-hidden')}>
          {section.items.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              active={activeId === item.id}
              onSelect={onSelect}
              size={size}
              variant={variant}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
      {collapsed && !last ? (
        <div className="mx-auto mt-3 h-px w-6 bg-border-subtle" aria-hidden />
      ) : null}
    </div>
  )
}

function SidebarAccountRow({
  account,
  collapsed,
  size,
}: {
  account: SidebarAccount
  collapsed: boolean
  size: SidebarSize
}) {
  const density = DENSITY[size]
  const inner = (
    <>
      <Avatar name={account.name} src={account.src} size={size === 'sm' ? 'xs' : 'sm'} />
      {collapsed ? null : (
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-[13px] font-medium leading-tight text-text-primary">
            {account.name}
          </span>
          {account.detail ? (
            <Caption as="span" className="mt-0.5 block truncate">
              {account.detail}
            </Caption>
          ) : null}
        </span>
      )}
    </>
  )

  const classes = cn(
    'flex w-full items-center border-0 bg-transparent font-sans',
    'transition-colors duration-150',
    EASE,
    'focus-visible:outline-none focus-visible:bg-bg-hover',
    density.item,
    collapsed ? 'justify-center px-0' : cn(density.itemPad, 'gap-2.5'),
    density.radius,
    account.onClick
      ? 'cursor-pointer text-text-primary hover:bg-bg-hover'
      : 'cursor-default text-text-primary',
  )

  if (!account.onClick) {
    return (
      <div className={classes} title={collapsed ? account.name : undefined}>
        {inner}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      title={collapsed ? account.name : undefined}
      onClick={account.onClick}
    >
      {inner}
    </button>
  )
}

export function DashboardSidebar({
  sections,
  activeId,
  onSelect,
  footer,
  account,
  search,
  brand = true,
  header,
  variant = 'fill',
  size = 'md',
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = false,
  className,
}: {
  sections: SidebarSection[]
  activeId?: string
  onSelect?: (id: string) => void
  footer?: ReactNode
  account?: SidebarAccount
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }
  brand?: boolean | SidebarBrand
  header?: ReactNode
  variant?: SidebarVariant
  size?: SidebarSize
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  collapsible?: boolean
  className?: string
}) {
  const density = DENSITY[size]
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed)
  const [narrow, setNarrow] = useState(false)
  const collapsed = (collapsedProp ?? uncontrolled) && !narrow
  const brandConfig: SidebarBrand | null = brand
    ? brand === true
      ? {}
      : brand
    : null

  useEffect(() => {
    const media = window.matchMedia('(max-width: 734px)')
    function sync() {
      setNarrow(media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  function setCollapsed(next: boolean) {
    if (collapsedProp === undefined) setUncontrolled(next)
    onCollapsedChange?.(next)
  }

  const mark = (
    <BrandLogo
      variant={collapsed ? 'mark' : 'text'}
      size={density.mark}
      labelClassName={collapsed ? undefined : 'text-[15px]'}
    />
  )

  const brandNode = brandConfig?.href ? (
    <Link
      href={brandConfig.href}
      className={cn(
        'flex min-w-0 items-center text-text-primary no-underline',
        collapsed && 'justify-center',
      )}
      aria-label={brandConfig.label}
    >
      {mark}
    </Link>
  ) : (
    <span className={cn('flex min-w-0 items-center', collapsed && 'justify-center')}>{mark}</span>
  )

  const showHeader = header !== undefined || brandConfig || collapsible
  const showFoot = Boolean(account || footer)

  return (
    <aside
      className={cn(
        'flex min-h-0 shrink-0 flex-col overflow-hidden',
        'transition-[width] duration-300',
        EASE,
        variant === 'pill' ? 'h-[calc(100%-16px)]' : 'h-full',
        collapsed ? density.rail : density.aside,
        CHROME[variant],
        className,
      )}
    >
      {showHeader ? (
        <div
          className={cn(
            'flex h-[52px] shrink-0 items-center',
            collapsed ? 'justify-center px-1' : 'justify-between gap-2 px-3',
          )}
        >
          {header !== undefined ? header : brandConfig ? brandNode : <span />}
          {collapsible && !collapsed && !narrow ? (
            <IconButton
              label="Collapse sidebar"
              size="sm"
              aria-expanded
              onClick={() => setCollapsed(true)}
            >
              <DkPanelLeftwardClose size={16} strokeWidth={1.6} absoluteStrokeWidth />
            </IconButton>
          ) : null}
        </div>
      ) : null}

      {collapsible && collapsed && !narrow ? (
        <div className="flex shrink-0 justify-center pb-2">
          <IconButton
            label="Expand sidebar"
            size="sm"
            aria-expanded={false}
            onClick={() => setCollapsed(false)}
          >
            <DkPanelLeftwardOpened size={16} strokeWidth={1.6} absoluteStrokeWidth />
          </IconButton>
        </div>
      ) : null}

      {search && !collapsed ? (
        <div className="shrink-0 px-3 pb-3">
          <label
            className={cn(
              'flex h-8 w-full items-center gap-2 rounded-[10px] border border-transparent bg-bg-tertiary px-3 text-text-tertiary',
              'transition-[border-color,box-shadow] duration-150',
              EASE,
              FOCUS_RING,
            )}
          >
            <DkMagnifyingGlassFind size={15} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            <input
              type="search"
              value={search.value}
              onChange={(event) => search.onChange(event.target.value)}
              placeholder={search.placeholder ?? 'Search'}
              aria-label={search.placeholder ?? 'Search'}
              className="min-w-0 w-full border-0 bg-transparent font-sans text-[13px] font-normal leading-none text-text-primary outline-none placeholder:text-text-tertiary [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
        </div>
      ) : null}

      <nav
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 pb-3',
          !showHeader && 'pt-4',
        )}
        aria-label="Sidebar"
      >
        {sections.map((section, index) => (
          <SidebarSectionBlock
            key={section.label ?? `section-${index}`}
            section={section}
            last={index === sections.length - 1}
            activeId={activeId}
            onSelect={onSelect}
            size={size}
            variant={variant}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {showFoot ? (
        <div
          className={cn(
            'flex shrink-0 flex-col gap-1 border-t border-border-subtle py-3',
            collapsed ? 'items-center px-1' : 'px-2',
          )}
        >
          {account ? <SidebarAccountRow account={account} collapsed={collapsed} size={size} /> : null}
          {footer ? <div className={cn('shrink-0', collapsed && 'flex justify-center')}>{footer}</div> : null}
        </div>
      ) : null}
    </aside>
  )
}
