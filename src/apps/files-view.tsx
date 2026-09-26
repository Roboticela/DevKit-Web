'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { FileTile } from '@/components/FileTile'
import { formatSize, type SortField, type SortDirection } from './files-model'
import { FileEntry } from './files-model'
import { ThumbnailTile } from '@/components/ThumbnailTile'
import { ListRow } from '@/components/ListRow'
import { IconButton } from '@/components/IconButton'
import { Badge } from '@/components/Badge'
import { Slider } from '@/components/Slider'
import {
  DkChevronCaretRight as ChevronRight,
  DkChevronCaretDown as ChevronDown,
  DkChevronCaretUp as ChevronUp,
  DkDashboardOverviewGrid as Grid,
  DkRowsThree as List,
  DkLayoutGrid,
  DkVisibilityEyeShown as Eye,
  DkCloseDismissCancel as X,
} from '@/icons'

/** Zoom state for Icon Grid View (74): slider drives --tile-size 64-128px. */
export function useIconGridZoom() {
  const [zoom, setZoom] = useState(80)
  return {
    zoom,
    setZoom,
    tileSize: `${zoom}px`,
  }
}

/** Icon Grid View (74) — CSS grid of File Tiles, zoom slider drives --tile-size. */
export function IconGridView({
  entries,
  selection,
  onSelect,
  onRename,
  onQuickLook,
  onSort,
  sort,
}: {
  entries: FileEntry[]
  selection: string[]
  onSelect: (path: string) => void
  onRename: (path: string, next: string) => void
  onQuickLook: (entry: FileEntry) => void
  onSort: (s: { field: SortField; direction: SortDirection }) => void
  sort: { field: SortField; direction: SortDirection }
}) {
  const { zoom, setZoom, tileSize } = useIconGridZoom()

  const sorted = useMemo(() => {
    return entries.sort((a, b) => {
      let cmp = 0
      switch (sort.field) {
        case 'name':
          cmp = a.label.localeCompare(b.label)
          break
        case 'size':
          cmp = (a.size ?? 0) - (b.size ?? 0)
          break
        case 'kind':
          cmp = a.kind.localeCompare(b.kind)
          break
        case 'modified':
          cmp = a.modified.localeCompare(b.modified)
          break
      }
      return sort.direction === 'asc' ? cmp : -cmp
    })
  }, [entries, sort])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2">
        <span className="text-[13px] font-medium text-text-primary">{sorted.length} items</span>
        <div className="flex items-center gap-2">
          <Slider
            value={zoom}
            min={64}
            max={128}
            step={8}
            variant="subtle"
            size="sm"
            onValueChange={setZoom}
            className="min-[735px]:flex"
          />
          <IconButton
            label="Sort"
            size="sm"
            variant="ghost"
            onClick={() => onSort({ field: 'name', direction: 'asc' })}
          >
            <ChevronDown size={16} strokeWidth={1.6} />
          </IconButton>
        </div>
      </div>
      <div
        className="flex-1 overflow-auto p-3"
        style={{ '--tile-size': tileSize, gap: 'var(--space-2)' } as React.CSSProperties}
      >
        <div
          className="grid auto-rows-[80px]"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(var(--tile-size), 1fr))` }}
        >
          {sorted.map((entry) => (
            <FileTile
              key={entry.path}
              label={entry.label}
              icon={entry.icon ?? (entry.kind === 'folder' ? <Grid size={24} strokeWidth={1.6} /> : undefined)}
              selected={selection.includes(entry.path)}
              renaming={entry.path === 'renaming'}
              onRename={(next) => onRename(entry.path, next)}
              onClick={() => onSelect(entry.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** List View (74) — fixed-header column layout with sortable headers. */
export function ListView({
  entries,
  selection,
  onSelect,
  onRename,
  onQuickLook,
  onSort,
  sort,
}: {
  entries: FileEntry[]
  selection: string[]
  onSelect: (path: string) => void
  onRename: (path: string, next: string) => void
  onQuickLook: (entry: FileEntry) => void
  onSort: (s: { field: SortField; direction: SortDirection }) => void
  sort: { field: SortField; direction: SortDirection }
}) {
  const [activeSort, setActiveSort] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  const sorted = useMemo(() => {
    return entries.sort((a, b) => {
      let cmp = 0
      switch (sort.field) {
        case 'name':
          cmp = a.label.localeCompare(b.label)
          break
        case 'size':
          cmp = (a.size ?? 0) - (b.size ?? 0)
          break
        case 'kind':
          cmp = a.kind.localeCompare(b.kind)
          break
        case 'modified':
          cmp = a.modified.localeCompare(b.modified)
          break
      }
      return sort.direction === 'asc' ? cmp : -cmp
    })
  }, [entries, sort])

  const sortState: Record<SortField, { label: string; direction: SortDirection }> = {
    name: { label: 'Name', direction: 'asc' },
    size: { label: 'Size', direction: 'asc' },
    kind: { label: 'Kind', direction: 'asc' },
    modified: { label: 'Date Modified', direction: 'asc' },
  }

  const handleHeader = (field: SortField) => {
    if (activeSort === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setActiveSort(field)
      setSortDir('asc')
      onSort({ field, direction: 'asc' })
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 overflow-auto">
        <div className="flex min-w-0 flex-1 flex-col border-r border-[var(--border-subtle)]" style={{ width: '240px' }}>
          <table className="w-full text-left">
            <thead className="sticky top-0 top-0 z-10 bg-[var(--bg-tertiary)]">
              <tr className="h-12 border-b border-[var(--border-subtle)]">
                {(['name', 'size', 'kind', 'modified'] as SortField[]).map((field) => (
                  <th
                    key={field}
                    className="px-3 py-0 text-[13px] font-medium text-text-secondary cursor-pointer select-none hover:text-text-primary"
                    onClick={() => handleHeader(field)}
                  >
                    <span className="flex items-center gap-1">
                      {field}
                      {activeSort === field && (
                        <span className="inline-flex">
                          {sortDir === 'asc' ? <ChevronUp size={12} strokeWidth={2} /> : <ChevronDown size={12} strokeWidth={2} />}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {sorted.map((entry) => (
                <ListRow
                  key={entry.path}
                  title={entry.label}                          value={entry.kind === 'folder' ? 'Folder' : formatSize(entry.size)}
                  leading={
                    <span className="shrink-0">
                      {entry.icon ?? (entry.kind === 'folder' ? <Grid size={16} strokeWidth={1.6} /> : undefined)}
                    </span>
                  }
                  onClick={() => onSelect(entry.path)}
                  selected={selection.includes(entry.path)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex min-w-0 flex-1 flex-col" style={{ width: 'calc(100% - 240px)' }}>
          <div className="h-12 border-b border-[var(--border-subtle)] px-3">
            <span className="text-[13px] font-medium text-text-primary">Details</span>
          </div>
          <div className="flex-1 overflow-auto p-3">
            {sorted[0] ? (
              <>
                <div className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)] p-3">
                  <span className="flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-secondary)]">
                    {sorted[0].icon ?? (sorted[0].kind === 'folder' ? <Grid size={24} strokeWidth={1.6} /> : undefined)}
                  </span>
                  <div>
                    <p className="text-[17px] font-medium text-text-primary">{sorted[0].label}</p>
                    <p className="text-[13px] text-text-secondary">{sorted[0].kind === 'folder' ? 'Folder' : formatSize(sorted[0].size)}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Kind</span>
                    <span className="text-text-primary">{sorted[0].kind}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Size</span>
                    <span className="text-text-primary">{formatSize(sorted[0].size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Modified</span>
                    <span className="text-text-primary">{sorted[0].modified}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="p-6 text-center text-[13px] text-text-tertiary">Select a file to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Column View (74) — Miller columns, cascading panes. */
export function ColumnView({
  entries,
  selection,
  onSelect,
  onRename,
  onQuickLook,
}: {
  entries: FileEntry[]
  selection: string[]
  onSelect: (path: string) => void
  onRename: (path: string, next: string) => void
  onQuickLook: (entry: FileEntry) => void
}) {
  const [expanded, setExpanded] = useState<string[]>(['/'])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const current = expanded[expanded.length - 1]
  const childEntries = current === '/' ? entries : entries.filter((e) => e.path.startsWith(current + '/'))

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 overflow-auto">
        {expanded.map((path, index) => (
          <div
            key={path}
            className="flex flex-col border-r border-[var(--border-subtle)]"
            style={{ width: index === expanded.length - 1 ? '240px' : '48px' }}
          >
            <div className="flex items-center gap-1 border-b border-[var(--border-subtle)] px-2 py-1">
              <span className="text-[12px] text-text-secondary">{path === '/' ? 'Home' : path.split('/').pop()}</span>
              {expanded.length < 4 && (
                <IconButton
                  label="Expand"
                  size="sm"
                  variant="ghost"
                  onClick={() => setExpanded([...expanded.slice(0, index + 1), ...expanded.slice(index + 1).filter((p) => p !== path)])}
                >
                  <ChevronDown size={12} strokeWidth={1.6} />
                </IconButton>
              )}
            </div>
            <div className="flex-1 overflow-auto py-2">
              {childEntries.map((entry) => {
                const child = entry.path.split('/')
                const isSelected = selectedPath === entry.path
                return (
                  <button
                    key={entry.path}
                    type="button"
                    onClick={() => {
                      if (entry.kind === 'folder') {
                        setExpanded((prev) => {
                          if (prev.includes(entry.path)) return prev.filter((p) => p !== entry.path)
                          if (prev.length === 1) return [...prev, entry.path]
                          return prev
                        })
                      } else {
                        setSelectedPath(entry.path)
                        onSelect(entry.path)
                      }
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 px-2 py-1 text-left text-[13px] text-text-primary hover:bg-[var(--bg-hover)]',
                      isSelected && 'bg-[var(--brand-primary-subtle)]',
                    )}
                  >
                    <span className="shrink-0">{entry.icon ?? (entry.kind === 'folder' ? <Grid size={14} strokeWidth={1.6} /> : undefined)}</span>
                    <span className="truncate flex-1">{entry.label}</span>
                    {entry.kind === 'file' && (
                      <IconButton
                        label="Quick Look"
                        size="sm"
                        variant="ghost"
                        onClick={(event) => {
                          event.stopPropagation()
                          onQuickLook(entry)
                        }}
                      >
                        <Eye size={12} strokeWidth={1.6} />
                      </IconButton>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Gallery View (74) — large preview + filmstrip, crossfades. */
export function GalleryView({
  entries,
  onSelect,
  onQuickLook,
}: {
  entries: FileEntry[]
  onSelect: (path: string) => void
  onQuickLook: (entry: FileEntry) => void
}) {
  const [selected, setSelected] = useState<FileEntry | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const largeRef = useRef<HTMLDivElement>(null)
  const filmstripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      const idx = entries.findIndex((e) => e.path === selected.path)
      if (idx >= 0) setActiveIndex(idx)
    }
  }, [selected, entries])

  useEffect(() => {
    if (selected) return
    if (entries.length === 0) return
    setSelected(entries[0])
  }, [entries])

  const handleFilmstripClick = (index: number) => {
    const entry = entries[index]
    if (!entry) return
    setSelected(entry)
    setActiveIndex(index)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <div
          ref={largeRef}
          className="gallery-large relative aspect-video overflow-hidden rounded-[var(--radius-xl)] bg-[var(--bg-tertiary)]"
        >
          {selected ? (
            <>
              <div className="absolute inset-0">
                <ThumbnailTile
                  src="https://picsum.photos/1200/800"
                  alt={selected.label}
                  className="h-full w-full"
                  loading={false}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="flex size-3 items-center justify-center rounded-full bg-white/20" />
                  <span className="text-[14px] font-medium">{selected.label}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => onSelect(selected.path)}
                    className="text-[13px] font-medium text-white/80 hover:text-white"
                  >
                    Open {selected.kind === 'folder' ? 'Folder' : 'File'}
                  </button>
                  <IconButton label="Close" size="sm" variant="subtle" onClick={() => setSelected(null)}>
                    <X size={16} strokeWidth={1.6} />
                  </IconButton>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[13px] text-text-tertiary">Select a file to preview</p>
            </div>
          )}
        </div>
        <div
          ref={filmstripRef}
          className="flex gap-2 overflow-x-auto px-3 pb-3"
        >
          {entries.map((entry, index) => (
            <ThumbnailTile
              key={entry.path}
              src="https://picsum.photos/1200/800"
              alt={entry.label}
              loading={false}
              onClick={() => handleFilmstripClick(index)}
              className={cn(
                'aspect-square cursor-pointer',
                activeIndex === index && 'ring-2 ring-brand-primary',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
