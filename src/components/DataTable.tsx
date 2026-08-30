'use client'

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import {
  DkChevronCaretDown,
  DkChevronCaretUp,
  DkChevronsUpwardDownward,
  DkSubtractMinusRemove,
  DkTaskCompleteCheckmark,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { EmptyState } from './EmptyState'
import { Skeleton } from './Skeleton'

export type DataTableVariant = 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
export type DataTableSize = 'sm' | 'md' | 'lg'
export type DataTableLayout = 'divided' | 'striped'
export type DataTableAlign = 'start' | 'center' | 'end'
export type DataTableSortDirection = 'asc' | 'desc'
export type DataTableSelection = boolean | 'single' | 'multiple'
export type DataTablePreview =
  | 'hover'
  | 'selected'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'empty'
  | 'editing'

export type DataTableEdit<T> = {
  row: T
  rowKey: string
  column: string
  value: string
  previous: string
}

export const DATA_TABLE_VARIANTS: DataTableVariant[] = ['fill', 'subtle', 'outline', 'ghost', 'pill']
export const DATA_TABLE_SIZES: DataTableSize[] = ['sm', 'md', 'lg']
export const DATA_TABLE_LAYOUTS: DataTableLayout[] = ['divided', 'striped']
export const DATA_TABLE_ALIGNS: DataTableAlign[] = ['start', 'center', 'end']

export const DATA_TABLE_VARIANT_LABEL: Record<DataTableVariant, string> = {
  fill: 'Fill',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const DATA_TABLE_SIZE_LABEL: Record<DataTableSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const DATA_TABLE_LAYOUT_LABEL: Record<DataTableLayout, string> = {
  divided: 'Divided',
  striped: 'Striped',
}

export const DATA_TABLE_ALIGN_LABEL: Record<DataTableAlign, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
}

export type DataColumn<T> = {
  key: string
  header: ReactNode
  className?: string
  hideOnMobile?: boolean
  align?: DataTableAlign
  numeric?: boolean
  sortable?: boolean
  sortValue?: (row: T) => string | number | boolean | Date | null | undefined
  width?: string | number
  render?: (row: T) => ReactNode
  editable?: boolean
  editValue?: (row: T) => string
}

type Metric = {
  cell: string
  head: string
  type: string
  headType: string
  check: string
  checkIcon: number
  skeleton: 'sm' | 'md' | 'lg'
  caption: string
  footer: string
}

const sizes: Record<DataTableSize, Metric> = {
  sm: {
    cell: 'px-3 py-2',
    head: 'px-3 py-2',
    type: 'text-[13px] leading-[1.35]',
    headType: 'text-[11px] tracking-[0.04em]',
    check: 'size-4 rounded-[7px]',
    checkIcon: 10,
    skeleton: 'sm',
    caption: 'px-3 py-2.5',
    footer: 'px-3 py-2.5',
  },
  md: {
    cell: 'px-5 py-3.5',
    head: 'px-5 py-3',
    type: 'text-[15px] leading-[1.4]',
    headType: 'text-[12px] tracking-[0.02em]',
    check: 'size-[18px] rounded-[8px]',
    checkIcon: 12,
    skeleton: 'md',
    caption: 'px-5 py-3',
    footer: 'px-5 py-3',
  },
  lg: {
    cell: 'px-6 py-4',
    head: 'px-6 py-3.5',
    type: 'text-[17px] leading-[1.4]',
    headType: 'text-[12px] tracking-[0.02em]',
    check: 'size-5 rounded-[8px]',
    checkIcon: 12,
    skeleton: 'lg',
    caption: 'px-6 py-3.5',
    footer: 'px-6 py-3.5',
  },
}

function frameChrome(variant: DataTableVariant) {
  const radius = variant === 'pill' ? 'rounded-[24px]' : variant === 'ghost' ? 'rounded-none' : 'rounded-[18px]'
  const surface: Record<DataTableVariant, string> = {
    fill: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
    subtle: 'border border-transparent bg-bg-secondary',
    outline: 'border border-border-default bg-transparent',
    ghost: 'border border-transparent bg-transparent',
    pill: 'border border-transparent bg-bg-secondary',
  }
  return cn(radius, variant !== 'ghost' && 'overflow-hidden', surface[variant])
}

function headSurface(variant: DataTableVariant) {
  const paint: Record<DataTableVariant, string> = {
    fill: 'bg-bg-secondary dark:bg-bg-tertiary',
    subtle: 'bg-bg-tertiary',
    outline: 'bg-transparent',
    ghost: 'bg-transparent',
    pill: 'bg-bg-tertiary',
  }
  return paint[variant]
}

function stickyHeadSurface(variant: DataTableVariant) {
  const paint: Record<DataTableVariant, string> = {
    fill: 'bg-bg-secondary dark:bg-bg-tertiary',
    subtle: 'bg-bg-tertiary',
    outline: 'bg-bg-primary',
    ghost: 'bg-bg-primary',
    pill: 'bg-bg-tertiary',
  }
  return paint[variant]
}

function alignClass(align: DataTableAlign) {
  if (align === 'center') return 'text-center'
  if (align === 'end') return 'text-end'
  return 'text-start'
}

function alignFlex(align: DataTableAlign) {
  if (align === 'center') return 'justify-center'
  if (align === 'end') return 'justify-end'
  return 'justify-start'
}

function compareValues(left: unknown, right: unknown) {
  if (left == null && right == null) return 0
  if (left == null) return 1
  if (right == null) return -1
  if (typeof left === 'number' && typeof right === 'number') return left - right
  if (typeof left === 'boolean' && typeof right === 'boolean') return Number(left) - Number(right)
  if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime()
  return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' })
}

function readValue<T>(row: T, column: DataColumn<T>) {
  if (column.sortValue) return column.sortValue(row)
  return (row as Record<string, unknown>)[column.key]
}

function TableSelect({
  checked,
  indeterminate = false,
  disabled,
  label,
  size,
  preview,
  onChange,
}: {
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  label: string
  size: DataTableSize
  preview?: DataTablePreview
  onChange?: (checked: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const metric = sizes[size]
  const filled = checked || indeterminate

  useEffect(() => {
    const input = inputRef.current
    if (input) input.indeterminate = indeterminate
  }, [indeterminate, checked])

  return (
    <label
      className={cn(
        'relative inline-flex cursor-pointer items-center justify-center',
        disabled && 'cursor-not-allowed opacity-55',
      )}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <span className="sr-only">{label}</span>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        className="peer absolute inset-0 z-[1] m-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span
        className={cn(
          'pointer-events-none relative inline-flex items-center justify-center border transition-[background-color,border-color] duration-150',
          EASE,
          metric.check,
          filled
            ? 'border-brand-primary bg-brand-primary text-text-on-brand'
            : 'border-border-default bg-bg-elevated dark:bg-bg-secondary',
          !disabled &&
            !preview &&
            'peer-hover:border-brand-primary peer-focus-visible:border-brand-primary peer-focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
          preview === 'focus' &&
            'border-brand-primary shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
        )}
      >
        {indeterminate ? (
          <DkSubtractMinusRemove size={metric.checkIcon} strokeWidth={2.5} absoluteStrokeWidth />
        ) : (
          <DkTaskCompleteCheckmark
            size={metric.checkIcon}
            strokeWidth={2.5}
            absoluteStrokeWidth
            className={checked ? 'opacity-100' : 'opacity-0'}
          />
        )}
      </span>
    </label>
  )
}

function isColumnEditable<T>(column: DataColumn<T>, tableEditable: boolean) {
  if (!tableEditable) return false
  if (column.editable === false) return false
  if (column.editable === true) return true
  return column.render == null
}

function cellText<T>(row: T, column: DataColumn<T>) {
  if (column.editValue) return String(column.editValue(row) ?? '')
  return String((row as Record<string, unknown>)[column.key] ?? '')
}

function CellEditor({
  initial,
  align,
  numeric,
  typeClass,
  label,
  preview = false,
  onCommit,
  onCancel,
}: {
  initial: string
  align: DataTableAlign
  numeric?: boolean
  typeClass: string
  label: string
  preview?: boolean
  onCommit: (value: string, move?: 'next' | 'prev' | 'down') => void
  onCancel: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [draft, setDraft] = useState(initial)
  const locked = useRef(false)

  useEffect(() => {
    if (preview) return
    const input = inputRef.current
    if (!input) return
    input.focus()
    input.select()
  }, [preview])

  function commit(move?: 'next' | 'prev' | 'down') {
    if (locked.current) return
    locked.current = true
    onCommit(draft, move)
  }

  return (
    <input
      ref={inputRef}
      value={draft}
      readOnly={preview}
      tabIndex={preview ? -1 : 0}
      aria-label={label}
      inputMode={numeric ? 'decimal' : undefined}
      autoComplete="off"
      spellCheck={false}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={() => commit()}
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation()
        if (event.key === 'Escape') {
          event.preventDefault()
          locked.current = true
          onCancel()
          return
        }
        if (event.key === 'Enter') {
          event.preventDefault()
          commit()
          return
        }
        if (event.key === 'Tab') {
          event.preventDefault()
          commit(event.shiftKey ? 'prev' : 'next')
        }
      }}
      className={cn(
        'm-0 w-full min-w-0 border-0 bg-transparent p-0 font-sans',
        typeClass,
        'text-text-primary caret-brand-primary outline-none',
        numeric && 'font-medium tabular-nums',
        alignClass(align),
      )}
    />
  )
}

function SortMark({ direction, active }: { direction: DataTableSortDirection | 'none'; active: boolean }) {
  const paint = active ? 'text-brand-primary' : 'text-text-tertiary'
  if (!active) {
    return <DkChevronsUpwardDownward size={12} strokeWidth={2} absoluteStrokeWidth className={paint} />
  }
  if (direction === 'desc') {
    return <DkChevronCaretDown size={12} strokeWidth={2.25} absoluteStrokeWidth className={paint} />
  }
  return <DkChevronCaretUp size={12} strokeWidth={2.25} absoluteStrokeWidth className={paint} />
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  empty,
  caption,
  actions,
  footer,
  variant = 'fill',
  size = 'md',
  layout = 'divided',
  selectable = false,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  isRowDisabled,
  onRowClick,
  loading = false,
  loadingRows = 4,
  stickyHeader = false,
  maxHeight,
  minWidth = '520px',
  editable = false,
  onEdit,
  preview,
  previewRow = 0,
  previewColumn,
  className,
  'aria-label': ariaLabel,
}: {
  columns: DataColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  empty?: ReactNode
  caption?: ReactNode
  actions?: ReactNode
  footer?: ReactNode
  variant?: DataTableVariant
  size?: DataTableSize
  layout?: DataTableLayout
  selectable?: DataTableSelection
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  sortKey?: string
  sortDirection?: DataTableSortDirection
  onSort?: (key: string, direction: DataTableSortDirection) => void
  isRowDisabled?: (row: T) => boolean
  onRowClick?: (row: T) => void
  loading?: boolean
  loadingRows?: number
  stickyHeader?: boolean
  maxHeight?: string
  minWidth?: string
  editable?: boolean
  onEdit?: (edit: DataTableEdit<T>) => void
  preview?: DataTablePreview
  previewRow?: number
  previewColumn?: string
  className?: string
  'aria-label'?: string
}) {
  const captionId = useId()
  const metric = sizes[size]
  const multiple = selectable === true || selectable === 'multiple'
  const single = selectable === 'single'
  const canSelect = multiple || single
  const showLoading = loading || preview === 'loading'
  const showEmpty = preview === 'empty' || (!showLoading && data.length === 0)
  const canEdit = editable && !showLoading && !showEmpty
  const liveEdit = canEdit && !preview
  const interactive =
    Boolean(canSelect || onRowClick || liveEdit) && !showLoading && !showEmpty && !preview

  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultSelectedKeys ?? [])
  const [innerSort, setInnerSort] = useState<{ key: string; direction: DataTableSortDirection } | null>(null)
  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const [activeColumn, setActiveColumn] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ row: string; column: string; seed?: string } | null>(null)
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({})

  const selected = selectedKeys ?? uncontrolled
  const activeSortKey = sortKey ?? innerSort?.key
  const activeSortDirection = sortDirection ?? innerSort?.direction ?? 'asc'
  const editColumns = columns.filter((column) => isColumnEditable(column, canEdit))

  const setSelected = (keys: string[]) => {
    if (selectedKeys === undefined) setUncontrolled(keys)
    onSelectionChange?.(keys)
  }

  const rows = useMemo(() => {
    if (showLoading || showEmpty || !activeSortKey) return data
    const column = columns.find((item) => item.key === activeSortKey)
    if (!column?.sortable) return data
    if (onSort && sortKey) return data
    const next = [...data]
    next.sort((left, right) => {
      const result = compareValues(readValue(left, column), readValue(right, column))
      return activeSortDirection === 'desc' ? -result : result
    })
    return next
  }, [activeSortDirection, activeSortKey, columns, data, onSort, showEmpty, showLoading, sortKey])

  const enabledKeys = rows
    .map((row) => rowKey(row))
    .filter((key, index) => !isRowDisabled?.(rows[index]))

  const selectedEnabled = selected.filter((key) => enabledKeys.includes(key))
  const allSelected = enabledKeys.length > 0 && selectedEnabled.length === enabledKeys.length
  const someSelected = selectedEnabled.length > 0 && !allSelected

  const name = typeof caption === 'string' ? caption : ariaLabel ?? 'Data table'
  const labelledBy = typeof caption === 'string' ? captionId : undefined
  const hasToolbar = caption != null || actions != null

  function resolveRow(row: T) {
    const patch = drafts[rowKey(row)]
    if (!patch) return row
    return { ...row, ...patch } as T
  }

  function startEdit(row: T, column: DataColumn<T>, seed?: string) {
    if (isRowDisabled?.(row) || !isColumnEditable(column, canEdit) || !liveEdit) return
    const key = rowKey(row)
    setFocusedKey(key)
    setActiveColumn(column.key)
    setEditing({ row: key, column: column.key, seed })
  }

  function applyEdit(row: T, column: DataColumn<T>, value: string) {
    const key = rowKey(row)
    const resolved = resolveRow(row)
    const previous = cellText(resolved, column)
    if (value === previous) return
    if (onEdit) {
      onEdit({ row: resolved, rowKey: key, column: column.key, value, previous })
      return
    }
    setDrafts((current) => ({
      ...current,
      [key]: { ...current[key], [column.key]: value },
    }))
  }

  function moveEdit(row: T, column: DataColumn<T>, dir: 'next' | 'prev' | 'down') {
    const cols = editColumns
    if (!cols.length) {
      setEditing(null)
      return
    }
    const rowIndex = rows.findIndex((item) => rowKey(item) === rowKey(row))
    const colIndex = cols.findIndex((item) => item.key === column.key)
    if (dir === 'down') {
      const nextRow = rows.slice(rowIndex + 1).find((item) => !isRowDisabled?.(item))
      if (!nextRow) {
        setEditing(null)
        return
      }
      startEdit(nextRow, cols[Math.max(0, colIndex)] ?? cols[0])
      return
    }
    const delta = dir === 'next' ? 1 : -1
    let nextCol = colIndex + delta
    let nextRowIndex = rowIndex
    if (nextCol >= cols.length) {
      nextCol = 0
      nextRowIndex += 1
    }
    if (nextCol < 0) {
      nextCol = cols.length - 1
      nextRowIndex -= 1
    }
    const nextRow = rows[nextRowIndex]
    if (!nextRow || isRowDisabled?.(nextRow)) {
      setEditing(null)
      setActiveColumn(column.key)
      return
    }
    startEdit(nextRow, cols[nextCol] ?? cols[0])
  }

  function toggleSort(key: string) {
    const nextDirection: DataTableSortDirection =
      activeSortKey === key && activeSortDirection === 'asc' ? 'desc' : 'asc'
    if (sortKey === undefined) setInnerSort({ key, direction: nextDirection })
    onSort?.(key, nextDirection)
  }

  function toggleKey(key: string, disabled: boolean) {
    if (disabled || !canSelect) return
    if (single) {
      setSelected(selected.includes(key) ? [] : [key])
      return
    }
    setSelected(selected.includes(key) ? selected.filter((item) => item !== key) : [...selected, key])
  }

  function toggleAll(checked: boolean) {
    if (!multiple) return
    setSelected(checked ? enabledKeys : [])
  }

  function handleRowKey(event: KeyboardEvent<HTMLTableRowElement>, row: T, disabled: boolean) {
    if (editing) return
    const key = rowKey(row)
    const index = enabledKeys.indexOf(key)
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!interactive) return
      event.preventDefault()
      const delta = event.key === 'ArrowDown' ? 1 : -1
      const next = enabledKeys[Math.max(0, Math.min(enabledKeys.length - 1, index + delta))]
      if (next) setFocusedKey(next)
      return
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!liveEdit || disabled || !editColumns.length) return
      event.preventDefault()
      const current = Math.max(0, editColumns.findIndex((item) => item.key === activeColumn))
      const delta = event.key === 'ArrowRight' ? 1 : -1
      const next = editColumns[Math.max(0, Math.min(editColumns.length - 1, current + delta))]
      if (next) setActiveColumn(next.key)
      return
    }
    if (event.key === 'Home' || event.key === 'End') {
      if (!interactive) return
      event.preventDefault()
      const next = event.key === 'Home' ? enabledKeys[0] : enabledKeys[enabledKeys.length - 1]
      if (next) setFocusedKey(next)
      return
    }
    if ((event.key === 'Enter' || event.key === 'F2') && liveEdit && !disabled) {
      event.preventDefault()
      const column =
        editColumns.find((item) => item.key === activeColumn) ?? editColumns[0]
      if (column) startEdit(row, column)
      return
    }
    if (
      liveEdit &&
      !disabled &&
      event.key.length === 1 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      event.key !== ' '
    ) {
      event.preventDefault()
      const column =
        editColumns.find((item) => item.key === activeColumn) ?? editColumns[0]
      if (column) startEdit(row, column, event.key)
      return
    }
    if (!interactive) return
    if (event.key === ' ') {
      event.preventDefault()
      if (canSelect) toggleKey(key, disabled)
      if (!disabled) onRowClick?.(row)
    }
  }

  const skeletonRows = Array.from({ length: Math.max(1, loadingRows) }, (_, index) => index)
  const previewIndex = Math.min(Math.max(0, previewRow), Math.max(0, rows.length - 1))

  return (
    <div
      role="region"
      aria-label={labelledBy ? undefined : name}
      aria-labelledby={labelledBy}
      aria-busy={showLoading || undefined}
      className={cn('w-full', frameChrome(variant), className)}
    >
      {hasToolbar ? (
        <div
          className={cn(
            'flex items-center justify-between gap-3 border-b border-border-subtle',
            metric.caption,
          )}
        >
          {typeof caption === 'string' ? (
            <p
              id={captionId}
              className="m-0 min-w-0 truncate text-[13px] font-medium leading-none text-text-primary min-[735px]:text-[15px]"
            >
              {caption}
            </p>
          ) : (
            <div className="min-w-0">{caption}</div>
          )}
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      <div
        className={cn(
          'overflow-x-auto',
          stickyHeader && 'overflow-y-auto',
        )}
        style={stickyHeader ? { maxHeight: maxHeight ?? '320px' } : undefined}
      >
        <table className="w-full border-separate border-spacing-0 text-left" style={{ minWidth }}>
          <thead>
            <tr>
              {canSelect ? (
                <th
                  className={cn(
                    metric.head,
                    'w-10 border-b border-border-subtle text-start font-medium',
                    headSurface(variant),
                    stickyHeader && cn('sticky top-0 z-[1]', stickyHeadSurface(variant)),
                  )}
                  scope="col"
                >
                  {multiple ? (
                    <TableSelect
                      checked={allSelected}
                      indeterminate={someSelected}
                      label="Select all"
                      size={size}
                      preview={preview}
                      onChange={toggleAll}
                    />
                  ) : (
                    <span className="sr-only">Select</span>
                  )}
                </th>
              ) : null}
              {columns.map((column) => {
                const align = column.numeric ? 'end' : (column.align ?? 'start')
                const sorted = activeSortKey === column.key
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      column.sortable
                        ? sorted
                          ? activeSortDirection === 'desc'
                            ? 'descending'
                            : 'ascending'
                          : 'none'
                        : undefined
                    }
                    style={column.width != null ? { width: column.width } : undefined}
                    className={cn(
                      metric.head,
                      metric.headType,
                      'border-b border-border-subtle font-medium text-text-tertiary uppercase',
                      alignClass(align),
                      headSurface(variant),
                      column.hideOnMobile && 'max-[734px]:hidden',
                      stickyHeader && cn('sticky top-0 z-[1]', stickyHeadSurface(variant)),
                      column.className,
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column.key)}
                        aria-label={
                          typeof column.header === 'string'
                            ? sorted
                              ? `${column.header}, ${activeSortDirection === 'desc' ? 'descending' : 'ascending'}`
                              : `Sort by ${column.header}`
                            : undefined
                        }
                        className={cn(
                          'inline-flex w-full items-center gap-1 bg-transparent p-0 font-medium uppercase',
                          metric.headType,
                          'text-text-tertiary transition-colors duration-150',
                          EASE,
                          alignFlex(align),
                          'hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-none',
                          sorted && 'text-text-secondary',
                          preview === 'hover' && sorted && 'text-text-secondary',
                        )}
                      >
                        <span className="truncate">{column.header}</span>
                        <SortMark direction={sorted ? activeSortDirection : 'none'} active={sorted} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {showLoading
              ? skeletonRows.map((index) => (
                  <tr
                    key={`loading-${index}`}
                    className={cn(
                      layout === 'striped' &&
                        index % 2 === 1 &&
                        '[&>td]:bg-bg-secondary dark:[&>td]:bg-bg-tertiary',
                    )}
                  >
                    {canSelect ? (
                      <td
                        className={cn(
                          metric.cell,
                          layout === 'divided' &&
                            index !== skeletonRows.length - 1 &&
                            'border-b border-border-subtle',
                        )}
                      >
                        <span className="block size-4 rounded-[7px] bg-bg-tertiary" />
                      </td>
                    ) : null}
                    {columns.map((column, columnIndex) => (
                      <td
                        key={column.key}
                        className={cn(
                          metric.cell,
                          layout === 'divided' &&
                            index !== skeletonRows.length - 1 &&
                            'border-b border-border-subtle',
                          column.hideOnMobile && 'max-[734px]:hidden',
                        )}
                      >
                        <Skeleton
                          size={metric.skeleton}
                          width={columnIndex % 3 === 0 ? '72%' : columnIndex % 3 === 1 ? '48%' : '56%'}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              : null}

            {showEmpty ? (
              <tr>
                <td
                  colSpan={columns.length + (canSelect ? 1 : 0)}
                  className="px-4 py-6 min-[735px]:px-6 min-[735px]:py-10"
                >
                  {empty ?? (
                    <EmptyState
                      size="sm"
                      title="No results"
                      body="Nothing to show yet."
                    />
                  )}
                </td>
              </tr>
            ) : null}

            {!showLoading && !showEmpty
              ? rows.map((row, index) => {
                  const key = rowKey(row)
                  const resolved = resolveRow(row)
                  const isPreviewRow = preview != null && index === previewIndex
                  const disabled = Boolean(isRowDisabled?.(row)) || (isPreviewRow && preview === 'disabled')
                  const chosen =
                    selected.includes(key) || (isPreviewRow && (preview === 'selected' || preview === 'active'))
                  const hovered = isPreviewRow && preview === 'hover'
                  const focused =
                    (interactive && focusedKey === key) || (isPreviewRow && preview === 'focus')
                  const pressed = isPreviewRow && preview === 'active'
                  const rowEditing = editing?.row === key
                  const tabIndex = interactive
                    ? focusedKey === key || (focusedKey == null && index === 0)
                      ? 0
                      : -1
                    : undefined
                  const previewEditKey =
                    preview === 'editing'
                      ? previewColumn && editColumns.some((item) => item.key === previewColumn)
                        ? previewColumn
                        : editColumns[0]?.key
                      : null

                  return (
                    <tr
                      key={key}
                      tabIndex={tabIndex}
                      aria-selected={canSelect ? chosen : undefined}
                      aria-disabled={disabled || undefined}
                      onClick={(event) => {
                        if (disabled || preview || event.detail > 1) return
                        if (canSelect) toggleKey(key, disabled)
                        onRowClick?.(row)
                      }}
                      onFocus={() => {
                        setFocusedKey(key)
                        if (liveEdit && !activeColumn && editColumns[0]) setActiveColumn(editColumns[0].key)
                      }}
                      onKeyDown={(event) => handleRowKey(event, row, disabled)}
                      className={cn(
                        'transition-colors duration-150',
                        EASE,
                        layout === 'striped' &&
                          !chosen &&
                          index % 2 === 1 &&
                          '[&>td]:bg-bg-secondary dark:[&>td]:bg-bg-tertiary',
                        interactive && !disabled && !liveEdit && 'cursor-pointer',
                        disabled && 'opacity-55',
                        chosen && '[&>td]:bg-brand-primary-subtle',
                        !chosen &&
                          !disabled &&
                          !preview &&
                          interactive &&
                          'hover:[&>td]:bg-bg-hover active:[&>td]:bg-bg-active',
                        !chosen &&
                          !disabled &&
                          !preview &&
                          !interactive &&
                          'hover:[&>td]:bg-bg-hover',
                        hovered && !chosen && '[&>td]:bg-bg-hover',
                        pressed && !chosen && '[&>td]:bg-bg-active',
                        focused &&
                          !liveEdit &&
                          preview !== 'editing' &&
                          'relative z-[1] shadow-[inset_0_0_0_2px_var(--brand-primary-focus-ring)]',
                      )}
                    >
                      {canSelect ? (
                        <td
                          className={cn(
                            metric.cell,
                            'w-10',
                            layout === 'divided' &&
                              index !== rows.length - 1 &&
                              'border-b border-border-subtle',
                          )}
                        >
                          <TableSelect
                            checked={chosen}
                            disabled={disabled}
                            label={`Select ${key}`}
                            size={size}
                            preview={isPreviewRow && preview === 'focus' ? 'focus' : undefined}
                            onChange={() => toggleKey(key, disabled)}
                          />
                        </td>
                      ) : null}
                      {columns.map((column) => {
                        const align = column.numeric ? 'end' : (column.align ?? 'start')
                        const columnEditable = isColumnEditable(column, canEdit)
                        const isEditing =
                          (rowEditing && editing?.column === column.key) ||
                          Boolean(isPreviewRow && preview === 'editing' && column.key === previewEditKey)
                        const isActiveCell =
                          liveEdit &&
                          columnEditable &&
                          focused &&
                          !rowEditing &&
                          (activeColumn ?? editColumns[0]?.key) === column.key
                        return (
                          <td
                            key={column.key}
                            onClick={() => {
                              if (columnEditable && !disabled) setActiveColumn(column.key)
                            }}
                            onDoubleClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()
                              if (disabled || !columnEditable) return
                              startEdit(row, column)
                            }}
                            className={cn(
                              metric.cell,
                              metric.type,
                              'text-text-primary',
                              alignClass(align),
                              column.numeric && 'font-medium tabular-nums',
                              layout === 'divided' &&
                                index !== rows.length - 1 &&
                                'border-b border-border-subtle',
                              column.hideOnMobile && 'max-[734px]:hidden',
                              liveEdit && columnEditable && !disabled && 'cursor-text',
                              (isEditing || isActiveCell) &&
                                'relative z-[1] shadow-[inset_0_0_0_2px_var(--brand-primary-focus-ring)]',
                              column.className,
                            )}
                          >
                            {isEditing ? (
                              <CellEditor
                                key={`${key}-${column.key}-${editing?.seed ?? 'open'}`}
                                initial={editing?.seed ?? cellText(resolved, column)}
                                align={align}
                                numeric={column.numeric}
                                typeClass={metric.type}
                                label={
                                  typeof column.header === 'string'
                                    ? `Edit ${column.header}`
                                    : 'Edit cell'
                                }
                                preview={preview === 'editing'}
                                onCommit={(value, move) => {
                                  applyEdit(row, column, value)
                                  setEditing(null)
                                  setActiveColumn(column.key)
                                  if (move) moveEdit(row, column, move)
                                }}
                                onCancel={() => {
                                  setEditing(null)
                                  setActiveColumn(column.key)
                                }}
                              />
                            ) : column.render ? (
                              column.render(resolved)
                            ) : (
                              cellText(resolved, column)
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>

      {footer && !showEmpty ? (
        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t border-border-subtle text-[12px] text-text-tertiary',
            metric.footer,
          )}
        >
          {footer}
        </div>
      ) : null}
    </div>
  )
}
