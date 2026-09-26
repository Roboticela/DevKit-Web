'use client'

import { useContext } from 'react'
import { cn } from '@/lib/cn'
import { FilesSidebar } from './files-sidebar'
import { FilesToolbar } from './files-toolbar'
import {
  IconGridView,
  ListView,
  ColumnView,
  GalleryView,
} from './files-view'
import { MultiSelectDrag } from './files-multiselect'
import { EmptyTrash } from './files-trash'
import { FilesAppContext, type FilesAppViewMode } from './files-provider'
import type { FileEntry, SortField, SortDirection } from './files-model'

/** File Manager / "Files" (72–79) — composition of Sidebar, Toolbar, view modes, detail, Quick Look, rename, multi-select, Empty Trash. */
export function FilesShell({
  className,
  ...props
}: {
  className?: string
}) {
  const ctx = useContext(FilesAppContext)
  if (!ctx) throw new Error('FilesShell must be inside FilesAppProvider')

  return (
    <div className={cn('flex h-dvh flex-col overflow-hidden', className)}>
      <div className="flex flex-1 gap-0">
        <FilesSidebar
          favorites={[]}
          onFavoriteMove={() => {}}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <FilesToolbar
            path={ctx.rootPath}
            history={ctx.history}
            viewMode={ctx.viewMode}
            setViewMode={ctx.setViewMode}
            sort={ctx.sort}
            setSort={ctx.setSort}
            onBack={ctx.onBack}
            onForward={ctx.onForward}
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            {ctx.viewMode === 'icon' && (
              <IconGridView
                entries={ctx.tree}
                selection={ctx.selection}
                onSelect={(path) => ctx.onSelect(path, true)}
                onRename={(path, next) => ctx.onRename(path, next)}
                onQuickLook={(entry) => ctx.onQuickLook(entry)}
                onSort={ctx.setSort}
                sort={ctx.sort}
              />
            )}
            {ctx.viewMode === 'list' && (
              <ListView
                entries={ctx.tree}
                selection={ctx.selection}
                onSelect={(path) => ctx.onSelect(path, true)}
                onRename={(path, next) => ctx.onRename(path, next)}
                onQuickLook={(entry) => ctx.onQuickLook(entry)}
                onSort={ctx.setSort}
                sort={ctx.sort}
              />
            )}
            {ctx.viewMode === 'column' && (
              <ColumnView
                entries={ctx.tree}
                selection={ctx.selection}
                onSelect={(path) => ctx.onSelect(path, true)}
                onRename={(path, next) => ctx.onRename(path, next)}
                onQuickLook={(entry) => ctx.onQuickLook(entry)}
              />
            )}
            {ctx.viewMode === 'gallery' && (
              <GalleryView
                entries={ctx.tree}
                onSelect={(path) => ctx.onSelect(path, true)}
                onQuickLook={(entry) => ctx.onQuickLook(entry)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex border-t border-[var(--border-subtle)]">
        <div className="flex min-w-[220px] flex-1 flex-col border-r border-[var(--border-subtle)]">
          <MultiSelectDrag
            entries={ctx.tree}
            selection={ctx.selection}              onSelect={(path) => ctx.onSelect(path, true)}              onDragStart={() => {}}              onDrop={(paths) => ctx.onTrash(paths[0])}
          />
        </div>
        <div className="flex min-w-[320px] flex-1 flex-col">
          {ctx.selectedEntry ? (
            <>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2">
                <span className="text-[13px] font-medium text-text-primary">Details</span>
                <span className="text-[13px] text-text-tertiary">{ctx.selectedEntry.label}</span>
              </div>
              <div className="flex-1 overflow-auto p-3">
                <EmptyTrash trash={ctx.trash} onEmpty={ctx.onEmptyTrash} />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-text-tertiary">
              <p className="text-center text-[13px]">Select a file for details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
