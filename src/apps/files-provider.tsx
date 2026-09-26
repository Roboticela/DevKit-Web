'use client'

import { createContext, useContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { NavigationHistory } from './files-nav'
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
import { QuickLookPreview } from './files-detail'
import type { FileEntry, SortField, SortDirection } from './files-model'

export type FilesAppViewMode = 'icon' | 'list' | 'column' | 'gallery'

export type FilesAppContextValue = {
  state: FileEntry[]
  rootPath: string
  history: NavigationHistory
  viewMode: FilesAppViewMode
  setViewMode: (v: FilesAppViewMode) => void
  sort: { field: SortField; direction: SortDirection }
  setSort: (s: { field: SortField; direction: SortDirection }) => void
  selection: string[]
  setSelected: (paths: string[]) => void
  trash: FileEntry[]
  setTrash: (entries: FileEntry[]) => void
  tree: FileEntry[]
  selectedEntry: FileEntry | null
  onSelect: (path: string, selected: boolean) => void
  onBack: () => void
  onForward: () => void
  onRename: (path: string, next: string) => void
  onQuickLook: (entry: FileEntry) => void
  onTrash: (path: string) => void
  onEmptyTrash: () => void
}

export const FilesAppContext = createContext<FilesAppContextValue | null>(null)

export function FilesAppProvider({
  initialTree,
  rootPath = '/',
  children,
}: {
  initialTree: FileEntry[]
  rootPath?: string
  children: ReactNode
}) {
  const [history] = useState(() => new NavigationHistory(rootPath))
  const [viewMode, setViewMode] = useState<FilesAppViewMode>('icon')
  const [sort, setSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'name', direction: 'asc' })
  const [selection, setSelected] = useState<string[]>([])
  const [trash, setTrash] = useState<FileEntry[]>([])
  const [tree, setTree] = useState<FileEntry[]>(initialTree)
  const [selectedEntry, setSelectedEntry] = useState<FileEntry | null>(null)
  const [quickLook, setQuickLook] = useState<FileEntry | null>(null)

  const selectedPaths = useMemo(() => selection, [selection])
  const sortDirection = sort.direction

  const onSelect = useCallback(
    (path: string, selected: boolean) => {
      setSelected((prev) => {
        if (selected) {
          if (prev.includes(path)) return prev
          return [...prev, path]
        } else {
          return prev.filter((p) => p !== path)
        }
      })
    },
    [],
  )

  const onBack = useCallback(() => {
    const next = history.back()
    if (next && next !== rootPath) {
      setTree((prev) => {
        const entry = prev.find((e) => e.path === next)
        return entry?.children ?? prev
      })
      history.push(next)
    }
  }, [history, rootPath])

  const onForward = useCallback(() => {
    const next = history.forward()
    if (next && next !== rootPath) {
      setTree((prev) => {
        const entry = prev.find((e) => e.path === next)
        return entry?.children ?? prev
      })
    }
  }, [history, rootPath])

  const onRename = useCallback((path: string, next: string) => {
    setTree((prev) => prev.map((e) => (e.path === path ? { ...e, label: next } : e)))
    setSelected((prev) => prev.map((p) => (p === path ? next : p)))
  }, [])

  const onQuickLook = useCallback((entry: FileEntry) => {
    setQuickLook(entry)
  }, [])

  const onTrash = useCallback((path: string) => {
    setTree((prev) => prev.filter((e) => e.path !== path))
    setTrash((prev) => [...prev, { ...findEntry(prev, path) ?? { path, label: 'Unknown', kind: 'file', modified: new Date().toISOString() }, children: undefined }])
    setSelected((prev) => prev.filter((p) => p !== path))
  }, [])

  const onEmptyTrash = useCallback(() => {
    setTrash([])
  }, [])

  const value: FilesAppContextValue = {
    state: tree,
    rootPath,
    history,
    viewMode,
    setViewMode,
    sort,
    setSort,
    selection,
    setSelected,
    trash,
    setTrash,
    tree,
    selectedEntry,

    onSelect,
    onBack,
    onForward,
    onRename,
    onQuickLook,
    onTrash,
    onEmptyTrash,
  }

  return <FilesAppContext.Provider value={value}>{children}</FilesAppContext.Provider>
}

function findEntry(tree: FileEntry[], path: string): FileEntry | null {
  for (const entry of tree) {
    if (entry.path === path) return entry
    if (entry.children) {
      const hit = findEntry(entry.children, path)
      if (hit) return hit
    }
  }
  return null
}
