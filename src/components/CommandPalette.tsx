'use client'

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { useIsClient } from '@/lib/useIsClient'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import {
  DkCloseDismissCancel,
  DkMagnifyingGlassFind,
  DkUiComponentModules,
} from '@/icons'
import { cn } from '@/lib/cn'
import { searchDocs } from '@/lib/docs-catalog'
import { Anchor } from './Anchor'
import { EmptyPopup } from './EmptyPopup'
import { IconButton } from './IconButton'
import { Kbd } from './Kbd'
import { Loader } from './Loader'
import {
  NavSearch,
  NAV_SEARCH_SIZES,
  NAV_SEARCH_SIZE_LABEL,
  NAV_SEARCH_VARIANTS,
  NAV_SEARCH_VARIANT_LABEL,
  type NavSearchSize,
  type NavSearchVariant,
} from './NavSearch'
import { Caption } from './Text'

export type CommandPaletteVariant = 'spotlight' | 'command' | 'nav' | 'sheet'
export type CommandPaletteSize = 'sm' | 'md' | 'lg'
export type CommandSearchVariant = NavSearchVariant | 'fill'
export type CommandSearchSize = NavSearchSize
export type CommandItemKind = 'item' | 'link'

export type CommandItem = {
  id: string
  label: string
  description?: string
  group?: string
  meta?: string
  href?: string
  shortcut?: string
  icon?: ReactNode
  disabled?: boolean
  keywords?: string[]
  kind?: CommandItemKind
}

export type CommandGroup = {
  id?: string
  label: string
  items: CommandItem[]
}

export const COMMAND_PALETTE_VARIANTS: CommandPaletteVariant[] = ['spotlight', 'command', 'nav', 'sheet']
export const COMMAND_PALETTE_SIZES: CommandPaletteSize[] = ['sm', 'md', 'lg']
export const COMMAND_SEARCH_VARIANTS: NavSearchVariant[] = NAV_SEARCH_VARIANTS
export const COMMAND_SEARCH_SIZES: CommandSearchSize[] = NAV_SEARCH_SIZES

export const COMMAND_PALETTE_VARIANT_LABEL: Record<CommandPaletteVariant, string> = {
  spotlight: 'Spotlight',
  command: 'Command',
  nav: 'Nav',
  sheet: 'Sheet',
}

export const COMMAND_PALETTE_SIZE_LABEL: Record<CommandPaletteSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const COMMAND_SEARCH_VARIANT_LABEL: Record<NavSearchVariant, string> = NAV_SEARCH_VARIANT_LABEL
export const COMMAND_SEARCH_SIZE_LABEL: Record<CommandSearchSize, string> = NAV_SEARCH_SIZE_LABEL

const GLASS = cn(
  'border border-border-default',
  'bg-[color-mix(in_srgb,var(--bg-elevated)_86%,transparent)]',
  'backdrop-blur-[40px] backdrop-saturate-[180%]',
  'dark:bg-[color-mix(in_srgb,var(--bg-secondary)_88%,transparent)]',
)

const PANEL_WIDTH: Record<CommandPaletteSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[680px]',
}

const NAV_WIDTH: Record<CommandPaletteSize, string> = {
  sm: 'max-w-[560px]',
  md: 'max-w-[692px]',
  lg: 'max-w-[980px]',
}

export function groupCommandItems(items: CommandItem[]): CommandGroup[] {
  const order: string[] = []
  const map = new Map<string, CommandItem[]>()
  for (const item of items) {
    const key = item.group ?? 'Results'
    if (!map.has(key)) {
      order.push(key)
      map.set(key, [])
    }
    map.get(key)!.push(item)
  }
  return order.map((label) => ({ label, items: map.get(label) ?? [] }))
}

function matchesItem(item: CommandItem, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const hay = [item.label, item.description, item.meta, item.group, item.shortcut, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return q.split(/\s+/).every((term) => hay.includes(term))
}

function docsGroups(query: string): CommandGroup[] {
  return searchDocs(query).map((group) => ({
    label: group.group,
    items: group.items.map((item) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      group: group.group,
      meta: item.searchGroup,
      href: item.href,
      icon: <DkUiComponentModules size={16} strokeWidth={1.75} absoluteStrokeWidth />,
      keywords: [item.id],
    })),
  }))
}

export function CommandSearch({
  onClick,
  variant = 'outline',
  size = 'sm',
  placeholder = 'Search',
  shortcut = '⌘K',
  icon = false,
  disabled = false,
  active = false,
  fullWidth = false,
  className,
}: {
  onClick: () => void
  variant?: CommandSearchVariant
  size?: CommandSearchSize
  placeholder?: string
  shortcut?: string | false
  icon?: boolean
  disabled?: boolean
  active?: boolean
  fullWidth?: boolean
  className?: string
}) {
  const look: NavSearchVariant = icon ? 'icon' : variant === 'fill' ? 'outline' : variant
  const hint = shortcut === false ? undefined : shortcut

  return (
    <NavSearch
      value=""
      onChange={() => undefined}
      variant={look}
      size={size}
      placeholder={placeholder}
      shortcut={hint}
      disabled={disabled}
      active={active}
      onActivate={onClick}
      className={cn(fullWidth && 'w-full', className)}
    />
  )
}

function ItemRow({
  item,
  selected,
  variant,
  id,
  onSelect,
  onHover,
}: {
  item: CommandItem
  selected: boolean
  variant: CommandPaletteVariant
  id: string
  onSelect: () => void
  onHover: () => void
}) {
  const link = item.kind === 'link'

  if (link) {
    return (
      <Anchor
        id={id}
        role="option"
        aria-selected={selected}
        disabled={item.disabled}
        size="md"
        onMouseEnter={onHover}
        onClick={onSelect}
        className={cn(
          'w-full text-left',
          variant === 'nav' ? 'h-10 rounded-none px-0' : 'h-11 rounded-[10px] px-2.5',
          selected && 'opacity-80',
        )}
      >
        {item.label}
      </Anchor>
    )
  }

  const icon =
    item.icon ?? <DkMagnifyingGlassFind size={16} strokeWidth={1.75} absoluteStrokeWidth />

  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={selected}
      disabled={item.disabled}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 border-0 text-left',
        'rounded-[10px] px-2.5',
        variant === 'spotlight' ? 'min-h-12 py-1.5' : 'h-11',
        item.disabled && 'cursor-not-allowed opacity-48',
        selected ? 'bg-bg-hover' : 'bg-transparent',
      )}
    >
      {icon ? (
        <span
          className={cn(
            'inline-flex size-7 shrink-0 items-center justify-center text-text-tertiary',
            variant === 'spotlight' && 'size-8 rounded-[8px] bg-bg-tertiary dark:bg-bg-active',
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-sans text-[15px] font-normal leading-none text-text-primary">
          {item.label}
        </span>
        {item.description && variant !== 'command' ? (
          <Caption as="span" className="mt-0.5 block truncate">
            {item.description}
          </Caption>
        ) : null}
      </span>
      {item.shortcut ? <Kbd>{item.shortcut}</Kbd> : null}
      {!item.shortcut && item.meta && variant === 'command' ? (
        <Caption as="span" className="shrink-0">
          {item.meta}
        </Caption>
      ) : null}
    </button>
  )
}

function PaletteFooter() {
  return (
    <div className="flex flex-wrap items-center gap-3 px-3 py-3">
      <Caption as="span" className="inline-flex items-center gap-1">
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        Navigate
      </Caption>
      <Caption as="span" className="inline-flex items-center gap-1">
        <Kbd>↵</Kbd>
        Select
      </Caption>
      <Caption as="span" className="inline-flex items-center gap-1">
        <Kbd>Esc</Kbd>
        Close
      </Caption>
    </div>
  )
}

export function CommandPalette({
  open,
  onClose,
  items,
  groups,
  query: queryProp,
  defaultQuery = '',
  onQueryChange,
  onSelect,
  placeholder,
  variant = 'command',
  size = 'md',
  loading = false,
  emptyTitle,
  emptyBody,
  footer,
  showFooter,
  cancelLabel = 'Cancel',
  index: indexProp,
  embedded = false,
  className,
}: {
  open: boolean
  onClose: () => void
  items?: CommandItem[]
  groups?: CommandGroup[]
  query?: string
  defaultQuery?: string
  onQueryChange?: (value: string) => void
  onSelect?: (item: CommandItem) => void
  placeholder?: string
  variant?: CommandPaletteVariant
  size?: CommandPaletteSize
  loading?: boolean
  emptyTitle?: string
  emptyBody?: string
  footer?: ReactNode
  showFooter?: boolean
  cancelLabel?: string
  index?: number
  embedded?: boolean
  className?: string
}) {
  const router = useRouter()
  const uid = useId()
  const inputId = `${uid}-input`
  const listId = `${uid}-list`
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const isClient = useIsClient()
  const [innerQuery, setInnerQuery] = useState(defaultQuery)
  const [innerIndex, setInnerIndex] = useState(0)
  const prevOpenRef = useRef(open)
  const prevQueryRef = useRef(queryProp ?? defaultQuery)

  const usingDocs = !items && !groups
  const query = queryProp ?? innerQuery
  const hint = placeholder ?? (usingDocs ? 'Search documentation…' : 'Search')
  const keysVisible = showFooter ?? variant === 'command'

  const resolved = useMemo(() => {
    if (groups) return groups.filter((group) => group.items.length > 0)
    if (items) return groupCommandItems(items.filter((item) => matchesItem(item, query)))
    return docsGroups(query)
  }, [groups, items, query])

  const flat = useMemo(() => resolved.flatMap((group) => group.items), [resolved])
  const index = Math.min(indexProp ?? innerIndex, Math.max(flat.length - 1, 0))
  const activeId = flat[index] ? `${uid}-opt-${flat[index].id}` : undefined

  function setQuery(next: string) {
    if (queryProp === undefined) setInnerQuery(next)
    onQueryChange?.(next)
  }

  function setIndex(next: number | ((current: number) => number)) {
    if (indexProp !== undefined) return
    setInnerIndex(next)
  }

  useEffect(() => {
    const justOpened = open && !prevOpenRef.current
    prevOpenRef.current = open
    if (!open) return
    if (justOpened && queryProp === undefined) setInnerQuery(defaultQuery)
    if (justOpened && indexProp === undefined) setInnerIndex(0)
    if (!justOpened || embedded) return
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, defaultQuery, queryProp, indexProp, embedded])

  useEffect(() => {
    if (!open || indexProp !== undefined) return
    if (prevQueryRef.current === query) return
    prevQueryRef.current = query
    setInnerIndex(0)
  }, [query, open, indexProp])

  useEffect(() => {
    if (!open || embedded) return
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.isComposing) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setInnerIndex((current) => (flat.length ? (current + 1) % flat.length : 0))
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setInnerIndex((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
        return
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setInnerIndex(0)
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        setInnerIndex(flat.length ? flat.length - 1 : 0)
        return
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        const item = flat[indexProp ?? innerIndex]
        if (item) selectItem(item)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      restoreRef.current?.focus?.()
    }
  }, [open, embedded, flat, innerIndex, indexProp, onClose])

  useEffect(() => {
    if (!activeId) return
    document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  function selectItem(item: CommandItem) {
    if (item.disabled) return
    onClose()
    if (onSelect) {
      onSelect(item)
      return
    }
    if (item.href) router.push(item.href)
  }

  function onInputKey(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (!embedded) return
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIndex((current) => (flat.length ? (current + 1) % flat.length : 0))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIndex((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
    }
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      const item = flat[index]
      if (item) selectItem(item)
    }
  }

  if (!open) return null
  if (!embedded && !isClient) return null

  const emptyHeadline = emptyTitle ?? (query.trim() ? 'No results' : 'Start typing')
  const emptyCopy =
    emptyBody ??
    (query.trim()
      ? `Nothing matches ‘${query.trim()}’.`
      : variant === 'nav'
        ? 'Try a name, a page, or a product.'
        : 'Search commands, pages, and guides.')

  const searchField = (
    <div
      className={cn(
        'flex shrink-0 items-center gap-3',
        variant === 'nav'
          ? 'min-w-0 flex-1'
          : variant === 'spotlight'
            ? 'h-14 px-4'
            : 'h-[52px] px-4',
      )}
    >
      <DkMagnifyingGlassFind
        size={variant === 'nav' ? 20 : 18}
        strokeWidth={1.75}
        absoluteStrokeWidth
        className="shrink-0 text-text-tertiary"
      />
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onInputKey}
        placeholder={hint}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded
        aria-controls={listId}
        aria-activedescendant={activeId}
        className={cn(
          'h-full min-w-0 w-full border-0 bg-transparent font-sans text-text-primary outline-none placeholder:text-text-tertiary',
          '[&::-webkit-search-cancel-button]:hidden',
          variant === 'nav'
            ? 'text-[21px] font-normal leading-none tracking-[-0.022em] min-[735px]:text-[24px]'
            : variant === 'spotlight'
              ? 'text-[19px] font-normal leading-none tracking-[-0.015em]'
              : 'text-base',
        )}
      />
      {query ? (
        <IconButton
          label="Clear search"
          size="sm"
          className="text-text-tertiary hover:text-text-primary"
          onClick={() => {
            setQuery('')
            inputRef.current?.focus()
          }}
        >
          <DkCloseDismissCancel size={16} strokeWidth={1.75} absoluteStrokeWidth />
        </IconButton>
      ) : null}
    </div>
  )

  const results = (
    <div
      id={listId}
      role="listbox"
      aria-label="Search results"
      className={cn(
        'min-h-0 overflow-y-auto overscroll-contain',
        variant === 'nav' ? 'max-h-[min(480px,60vh)]' : 'max-h-[min(420px,50vh)]',
        variant !== 'nav' && 'border-t border-border-subtle',
      )}
    >
      {loading ? (
        <div className="flex min-h-[160px] items-center justify-center py-8">
          <Loader layout="inline" size="sm" label="Searching" />
        </div>
      ) : flat.length === 0 ? (
        <EmptyPopup
          surface="plain"
          size={variant === 'nav' ? 'md' : 'sm'}
          icon={<DkMagnifyingGlassFind strokeWidth={1.5} absoluteStrokeWidth />}
          title={emptyHeadline}
          body={emptyCopy}
        />
      ) : (
        resolved.map((group) => (
          <div
            key={group.id ?? group.label}
            className={cn(variant === 'nav' ? 'px-0 py-4 first:pt-2' : 'px-2 py-2')}
          >
            <Caption
              className={cn(
                'font-medium tracking-[0.02em]',
                variant === 'nav' ? 'pb-2' : 'px-2 pb-1',
              )}
            >
              {group.label}
            </Caption>
            <div className={cn(variant === 'nav' && group.items[0]?.kind === 'link' && 'flex flex-col')}>
              {group.items.map((item) => {
                const itemIndex = flat.findIndex((entry) => entry.id === item.id)
                return (
                  <ItemRow
                    key={item.id}
                    id={`${uid}-opt-${item.id}`}
                    item={item}
                    variant={variant}
                    selected={itemIndex === index}
                    onHover={() => setIndex(itemIndex)}
                    onSelect={() => selectItem(item)}
                  />
                )
              })}
            </div>
          </div>
        ))
      )}
    </div>
  )

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={embedded ? undefined : true}
      aria-labelledby={inputId}
      aria-busy={loading || undefined}
      className={cn(
        'relative z-[1] flex w-full flex-col overflow-hidden outline-none',
        variant === 'nav'
          ? 'h-full bg-bg-primary'
          : variant === 'sheet'
            ? cn(PANEL_WIDTH[size], 'w-[calc(100%-16px)] rounded-[18px]', GLASS)
            : cn('w-full', PANEL_WIDTH[size], 'rounded-[18px]', GLASS),
        !embedded &&
          (variant === 'sheet'
            ? 'animate-modal-sheet-in motion-reduce:animate-none'
            : variant === 'nav'
              ? 'animate-docs-nav-search-in motion-reduce:animate-none'
              : 'animate-docs-palette-in motion-reduce:animate-none'),
        className,
      )}
    >
      {variant === 'sheet' ? (
        <div className="flex justify-center pt-2" aria-hidden>
          <span className="h-1 w-9 rounded-[980px] bg-text-disabled" />
        </div>
      ) : null}

      {variant === 'nav' ? (
        <>
          <div className="border-b border-border-subtle">
            <div
              className={cn(
                'mx-auto flex h-11 w-full items-center gap-4 px-[22px]',
                NAV_WIDTH[size],
                'min-[735px]:h-[52px] min-[735px]:px-10',
              )}
            >
              {searchField}
              <Anchor size="md" onClick={onClose} className="h-11 shrink-0 px-1">
                {cancelLabel}
              </Anchor>
            </div>
          </div>
          <div
            className={cn(
              'mx-auto w-full px-[22px] pt-2 pb-8 min-[735px]:px-10',
              NAV_WIDTH[size],
            )}
          >
            {results}
          </div>
        </>
      ) : (
        <>
          {searchField}
          {results}
          {keysVisible ? (
            <div className="border-t border-border-default">
              {footer ?? <PaletteFooter />}
            </div>
          ) : footer ? (
            <div className="border-t border-border-default">{footer}</div>
          ) : null}
        </>
      )}
    </div>
  )

  const overlay = (
    <button
      type="button"
      className={cn(
        'absolute inset-0 border-0',
        variant === 'nav' ? 'bg-bg-primary' : 'bg-bg-overlay',
        !embedded && 'animate-modal-overlay-in motion-reduce:animate-none',
      )}
      aria-label="Close search"
      onClick={onClose}
    />
  )

  const frame = (
    <div
      className={cn(
        'flex',
        embedded
          ? cn(
              'relative w-full overflow-hidden rounded-[12px] bg-bg-tertiary',
              variant === 'nav'
                ? 'min-h-[320px] items-stretch'
                : variant === 'sheet'
                  ? 'min-h-[300px] items-end justify-center p-2'
                  : 'min-h-[280px] items-start justify-center px-3 pt-6 pb-3',
            )
          : cn(
              'fixed inset-0 z-[800]',
              variant === 'nav'
                ? 'items-stretch'
                : variant === 'sheet'
                  ? 'items-end justify-center p-2 pb-[max(8px,env(safe-area-inset-bottom))]'
                  : 'items-start justify-center px-4 pt-[12vh]',
            ),
      )}
    >
      {overlay}
      {variant === 'nav' ? (
        <div className="relative z-[1] flex h-full w-full flex-col">{panel}</div>
      ) : (
        panel
      )}
    </div>
  )

  if (embedded) return frame
  return createPortal(frame, document.body)
}
