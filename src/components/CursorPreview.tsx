'use client'

import { ROBOCURSORS_LIST, RoboCursorItem } from '@/lib/robocursors-data'
import { cn } from '@/lib/cn'

export function CursorPreview({
  cursorOrId,
  className,
  title,
}: {
  cursorOrId: RoboCursorItem | string
  className?: string
  title?: string
}) {
  const cursor =
    typeof cursorOrId === 'string'
      ? ROBOCURSORS_LIST.find((c) => c.id === cursorOrId || c.filename === cursorOrId)
      : cursorOrId

  if (!cursor) return null

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full pointer-events-none select-none',
        className,
      )}
      title={title ?? cursor.title}
      dangerouslySetInnerHTML={{ __html: cursor.svg }}
    />
  )
}
