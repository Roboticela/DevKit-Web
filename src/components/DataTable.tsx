import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DataColumn<T> = {
  key: string
  header: string
  className?: string
  hideOnMobile?: boolean
  render?: (row: T) => ReactNode
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  empty,
  className,
}: {
  columns: DataColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  empty?: ReactNode
  className?: string
}) {
  if (data.length === 0 && empty) return <>{empty}</>

  return (
    <div
      className={cn(
        'overflow-x-auto rounded-[18px] border border-border-default bg-bg-elevated dark:bg-bg-secondary',
        className,
      )}
    >
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-subtle">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-5 py-3 text-[12px] font-medium tracking-[0.02em] text-text-tertiary uppercase',
                  column.hideOnMobile && 'max-[734px]:hidden',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-border-subtle last:border-b-0 hover:bg-bg-hover"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-5 py-4 text-[15px] leading-[1.4] text-text-primary',
                    column.hideOnMobile && 'max-[734px]:hidden',
                    column.className,
                  )}
                >
                  {column.render
                    ? column.render(row)
                    : String((row as Record<string, unknown>)[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
