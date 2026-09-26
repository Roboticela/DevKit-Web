'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { ListRow } from '@/components/ListRow'
import { IconButton } from '@/components/IconButton'
import { SegmentedControl, type SegmentedOption } from '@/components/SegmentedControl'
import { Slider } from '@/components/Slider'
import { Badge } from '@/components/Badge'
import {
  DkChevronCaretLeft as ChevronLeft,
  DkChevronCaretRight as ChevronRight,
  DkChevronCaretDown as ChevronDown,
  DkChevronCaretUp as ChevronUp,
  DkHomeHouse as Home,
  DkFolderDirectory as Folder,
  DkCloseDismissCancel as X,
  DkStarFavoriteRating as Star,
  DkVisibilityEyeShown as Eye,
  DkRowsThree as List,
  DkDashboardOverviewGrid as Grid,
  DkLayoutGrid as LayoutGrid,
} from '@/icons'
import { NavigationHistory } from './files-nav'
import type { SortField } from './files-model'
import { formatSize, type SortDirection } from './files-model'

const VIEW_MODES: SegmentedOption<'icon' | 'list' | 'column' | 'gallery'>[] = [
  { value: 'icon', label: 'Icon', icon: <Grid size={16} strokeWidth={1.6} /> },
  { value: 'list', label: 'List', icon: <List size={16} strokeWidth={1.6} /> },
  { value: 'column', label: 'Column', icon: <LayoutGrid size={16} strokeWidth={1.6} /> },
  { value: 'gallery', label: 'Gallery', icon: <Eye size={16} strokeWidth={1.6} /> },
]

/** Toolbar (73) — back/forward stack + view-mode segmented control + sort menu. */
export function FilesToolbar({
  path,
  history,
  viewMode,
  setViewMode,
  sort,
  setSort,
  onBack,
  onForward,
}: {
  path: string
  history: NavigationHistory
  viewMode: 'icon' | 'list' | 'column' | 'gallery'
  setViewMode: (v: 'icon' | 'list' | 'column' | 'gallery') => void
  sort: { field: SortField; direction: SortDirection }
  setSort: (s: { field: SortField; direction: SortDirection }) => void
  onBack: () => void
  onForward: () => void
}) {
  const canGoBack = history.canGoBack()
  const canGoForward = history.canGoForward()

  return (
    <div className="flex h-12 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3">
      <div className="flex items-center gap-1">
        <IconButton
          label="Back"
          size="sm"
          variant="ghost"
          disabled={!canGoBack}
          onClick={onBack}
        >
          <ChevronLeft size={16} strokeWidth={1.6} />
        </IconButton>
        <IconButton
          label="Forward"
          size="sm"
          variant="ghost"
          disabled={!canGoForward}
          onClick={onForward}
        >
          <ChevronRight size={16} strokeWidth={1.6} />
        </IconButton>
        <div className="h-6 w-px bg-[var(--border-subtle)]" />
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-[13px] text-text-primary hover:bg-[var(--bg-hover)]"
        >
          <Home size={14} strokeWidth={1.6} />
          <span className="truncate max-w-[12rem]">{path}</span>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <SegmentedControl
          value={viewMode}
          onChange={setViewMode}
          options={VIEW_MODES}
          content="icon"
          size="sm"
        />
        <div className="h-6 w-px bg-[var(--border-subtle)]" />
        <Slider
          value={1}
          min={1}
          max={3}
          step={1}
          variant="subtle"
          size="sm"
          className="hidden min-[735px]:flex"
          onValueChange={(v) => {}}
        />
        <IconButton label="Sort" size="sm" variant="ghost">
          <ChevronDown size={16} strokeWidth={1.6} />
        </IconButton>
        <Badge size="sm">{formatSize(1024 * 1024)}</Badge>
      </div>
    </div>
  )
}
