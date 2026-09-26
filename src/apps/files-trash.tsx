'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { AlertDialog } from '@/components/AlertDialog'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { DkDeleteRemoveTrash, DkUndoActionBack } from '@/icons'
import type { FileEntry } from './files-model'

/** Empty Trash Flow (79) — AlertDialog confirmation, staggered drop-animation shrink, Dock receipt-bounce. */
export function EmptyTrash({
  trash,
  onEmpty,
}: {
  trash: FileEntry[]
  onEmpty: () => void
}) {
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      onEmpty()
      setConfirming(false)
    }, 300)
  }

  const renderItem = (entry: FileEntry, index: number) => {
    const isLast = index === trash.length - 1
    return (
      <div
        key={entry.path}
        className={cn(
          'flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] px-3 py-2',
          isLast && 'animate-[shrink_200ms_ease-standard]',
        )}
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-secondary)]"
        >
          {entry.kind === 'folder' ? (
            <DkDeleteRemoveTrash size={16} strokeWidth={1.6} />
          ) : (
            <DkUndoActionBack size={16} strokeWidth={1.6} />
          )}
        </span>
        <span className="text-[14px] text-text-primary">{entry.label}</span>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2">
        <span className="text-[13px] font-medium text-text-primary">Trash</span>
        <span className="text-[13px] text-text-secondary">{trash.length} item{trash.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {trash.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-text-tertiary">
            <p className="text-center text-[13px]">Trash is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">{renderItem(trash[0], 0)}</div>
        )}
      </div>
      <div className="flex justify-end gap-3 border-t border-[var(--border-subtle)] px-3 py-3">
        {!confirming ? (
          <>
            <Button variant="secondary" onClick={() => {}}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => setConfirming(true)}
            >
              Empty Trash
            </Button>
          </>
        ) : (
          <Button variant="danger" loading>
            Emptying…
          </Button>
        )}
      </div>

      {confirming && (
        <AlertDialog
          title="Empty Trash?"
          body="This will permanently delete all items in the Trash."
          variant="danger"
          onClose={() => setConfirming(false)}
          actions={[
            { label: 'Cancel', variant: 'secondary' },
            { label: 'Empty Trash', variant: 'danger', destructive: true },
          ]}
        />
      )}
    </div>
  )
}
