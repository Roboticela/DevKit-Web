'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Card, type CardSize } from '@/components/Card'
import { ListRow } from '@/components/ListRow'
import { IconButton } from '@/components/IconButton'
import { Badge } from '@/components/Badge'
import { Modal } from '@/components/Modal'
import { TextField } from '@/components/TextField'
import { Checkbox } from '@/components/Checkbox'
import { Avatar } from '@/components/Avatar'
import { Divider } from '@/components/Divider'
import { SwatchPicker } from '@/components/SwatchPicker'
import { DkFileFolderDirectory, DkFolderDirectory, DkFileFolderDirectoryOpened, DkShareExportForward, DkPencilWriteEdit, DkCloseDismissCancel } from '@/icons'
import type { FileEntry, FileSystemPath } from './files-model'

/** File Detail / Info Panel (75) — Card container + metadata List Rows. */
export function FileDetailPanel({
  entry,
  onRename,
  onClose,
}: {
  entry: FileEntry
  onRename: (path: string, next: string) => void
  onClose: () => void
}) {
  const tags = entry.tags ?? ['work', 'documents']
  const shared = entry.shared ?? []

  return (
    <Card variant="fill" size="lg" className="overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <span className="flex size-14 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bg-secondary)]">
          {entry.icon ?? (entry.kind === 'folder' ? <DkFolderDirectory size={28} strokeWidth={1.6} /> : <DkFileFolderDirectoryOpened size={28} strokeWidth={1.6} />)}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[19px] font-semibold text-text-primary">{entry.label}</h2>
          <p className="text-[13px] text-text-secondary">{entry.kind === 'folder' ? 'Folder' : 'File'}</p>
        </div>          <IconButton label="Rename" size="sm" variant="ghost" onClick={() => onRename(entry.path, entry.label)}>
          <DkPencilWriteEdit size={16} strokeWidth={1.6} />
        </IconButton>
      </div>
      <Divider />
      <div className="divide-y divide-[var(--border-subtle)]">
        <ListRow
          title="Size"
          value={entry.kind === 'folder' ? 'Folder' : '1.2 MB'}
          leading={<span className="shrink-0">{entry.kind === 'folder' ? <DkFolderDirectory size={16} strokeWidth={1.6} /> : <DkFileFolderDirectory size={16} strokeWidth={1.6} />}</span>}
        />
        <ListRow
          title="Kind"
          value={entry.kind}
          leading={<span className="shrink-0">{entry.kind === 'folder' ? <DkFolderDirectory size={16} strokeWidth={1.6} /> : <DkFileFolderDirectoryOpened size={16} strokeWidth={1.6} />}</span>}
        />
        <ListRow
          title="Created"
          value={entry.created ?? '—'}
          leading={<span className="shrink-0">{<DkFileFolderDirectory size={16} strokeWidth={1.6} />}</span>}
        />
        <ListRow
          title="Modified"
          value={entry.modified}
          leading={<span className="shrink-0">{<DkFileFolderDirectory size={16} strokeWidth={1.6} />}</span>}
        />
        <ListRow
          title="Location"
          value={entry.path}
          leading={<span className="shrink-0">{<DkFileFolderDirectory size={16} strokeWidth={1.6} />}</span>}
        />
        <div className="flex flex-col gap-2 p-3">
          <div className="text-[13px] font-medium text-text-secondary">Tags</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tagItem) => (
              <Badge key={tagItem} size="sm">{tagItem}</Badge>
            ))}
          </div>
        </div>
        {shared.length > 0 && (
          <div className="flex flex-col gap-2 p-3">
            <div className="text-[13px] font-medium text-text-secondary">Shared With</div>
            <div className="flex flex-col gap-2">
              {shared.map((person) => (
                <ListRow
                  key={person.id}
                  title={person.name}
                  leading={<Avatar name={person.name} size="sm" />}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

/** Quick Look Preview (76) — full-screen modal, Glass Surface + Thumbnail Tile at large size. */
export function QuickLookPreview({
  entry,
  files,
  onClose,
}: {
  entry: FileEntry
  files: FileEntry[]
  onClose: () => void
}) {
  return (
    <Modal
      open
      onClose={onClose}
      variant="alert"
      size="sm"
      title={entry.label}
      className="rounded-[20px]"
    >
      <div className="flex h-0 flex-1 flex-col overflow-hidden">
        <div className="relative flex-1">
          <ThumbnailPreviewTile entry={entry} />
          <div className="absolute inset-0 flex flex-col justify-between bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-white">{entry.label}</span>
              <IconButton label="Close" size="sm" variant="subtle" onClick={onClose}>
                <DkCloseDismissCancel size={16} strokeWidth={1.6} />
              </IconButton>
            </div>
            <div className="flex justify-between text-[13px] text-white/70">
              <span>(entry.kind === 'folder' ? 'Folder' : 'File')</span>
              <span>{entry.modified}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 border-t border-[var(--border-subtle)] p-3">
          <IconButton label="Open" size="sm" variant="primary">
            <span className="text-[13px] text-text-on-brand">Open</span>
          </IconButton>            <IconButton label="Share" size="sm" variant="ghost">
            <DkShareExportForward size={16} strokeWidth={1.6} />
          </IconButton>
        </div>
      </div>
    </Modal>
  )
}

function ThumbnailPreviewTile({ entry }: { entry: FileEntry }) {
  return (
    <div className="aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)]">
      <img
        src="https://picsum.photos/1200/800"
        alt={entry.label}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  )
}

/** Rename-in-place (77) — inline Text Field overlay on a File Tile. */
export function RenameInPlace({
  label,
  onCommit,
  onCancel,
}: {
  label: string
  onCommit: (next: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(label)
  const [focused, setFocused] = useState(true)

  const commit = () => {
    const next = value.trim()
    if (next) onCommit(next)
    else onCancel()
  }

  return (
    <div className="relative">
      <input
        ref={undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') onCancel()
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-[var(--radius-sm)] border border-[var(--border-focus)] bg-[var(--bg-elevated)] px-1 py-0 text-center text-[11px] text-text-primary outline-none"
        autoFocus
      />
      {value && (          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-text-tertiary">
          <DkCloseDismissCancel size={12} strokeWidth={2} />
        </span>
      )}
    </div>
  )
}
