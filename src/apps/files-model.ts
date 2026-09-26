/**
 * Files app — shared domain model. Maps onto the primitive tiles
 * (FileTile, ThumbnailTile, ListRow, Card, IconButton) so every
 * File Manager screen composes without new atoms.
 */

export type FileSystemPath = {
  /** Absolute-ish display path, e.g. '/Users/alex/Documents'. */
  path: string
  /** Display label (last segment). */
  label: string
  /** 'folder' | 'file' */
  kind: 'folder' | 'file'
  /** File type icon name (short code), or null for generic file. */
  icon?: string | null
  /** File size in bytes (files only). */
  size?: number
  /** ISO timestamp. */
  modified: string
  /** Created ISO timestamp. */
  created?: string
  /** Tags for this item. */
  tags?: string[]
  /** Shared-with people (id, name). */
  shared?: { id: string; name: string }[]
  /** Whether the item is hidden. */
  hidden?: boolean
}

export type FileEntry = FileSystemPath & {
  /** Children, present only when kind === 'folder'. */
  children?: FileEntry[]
  /** Known extensions, e.g. ['pdf','png']. */
  extensions?: string[]
}

export type SortField = 'name' | 'size' | 'kind' | 'modified'
export type SortDirection = 'asc' | 'desc'

export type SortState = {
  field: SortField
  direction: SortDirection
}

export type FilesAppState = {
  /** Full tree of entries rooted at the current view. */
  tree: FileEntry[]
  /** Currently viewed folder path (root = '/'). */
  rootPath: string
  /** Current sort. */
  sort: SortState
  /** Selected entry paths (multi-select). */
  selection: string[]
  /** Quick Look / detail payload, or null. */
  preview: FileSystemPath | null
  /** Whether the rename overlay is open for a tile. */
  renaming: string | null
  /** Trash contents (files moved here). */
  trash: FileEntry[]
}

/** Collect every entry path in a tree (pre-order). */
export function collectPaths(tree: FileEntry[]): string[] {
  const paths: string[] = []
  for (const entry of tree) {
    paths.push(entry.path)
    if (entry.children) paths.push(...collectPaths(entry.children))
  }
  return paths
}

/** Get an entry by path, or null. */
export function findEntry(tree: FileEntry[], path: string): FileEntry | null {
  for (const entry of tree) {
    if (entry.path === path) return entry
    if (entry.children) {
      const hit = findEntry(entry.children, path)
      if (hit) return hit
    }
  }
  return null
}

/** Sort a flat list of entries by the current sort state. */
export function sortEntries(entries: FileEntry[], sort: SortState): FileEntry[] {
  return [...entries].sort((a, b) => {
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
}

/** Human-readable size. */
export function formatSize(bytes?: number): string {
  if (bytes == null) return '—'
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Number((bytes / Math.pow(1024, i)).toFixed(1))} ${units[i]}`
}

/** Extract a file extension without the dot, lowercased. */
export function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}
