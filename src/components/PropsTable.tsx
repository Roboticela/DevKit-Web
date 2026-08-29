import { cn } from '@/lib/cn'

export type PropRow = {
  name: string
  type: string
  defaultValue: string
  description: string
  required?: string
}

export function PropsTable({ rows, className }: { rows: PropRow[]; className?: string }) {
  const showRequired = rows.some((row) => row.required !== undefined)
  const headings = showRequired
    ? ['Name', 'Type', 'Required', 'Default', 'Description']
    : ['Name', 'Type', 'Default', 'Description']

  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-border-default', className)}>
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr className="bg-bg-secondary">
            {headings.map((heading) => (
              <th
                key={heading}
                className="border-b border-border-subtle px-4 py-3 text-[13px] font-semibold text-text-secondary"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border-subtle last:border-b-0">
              <td className="px-4 py-3 align-top font-mono text-[13px] text-text-primary">{row.name}</td>
              <td className="px-4 py-3 align-top">
                <code className="rounded-[4px] bg-bg-tertiary px-1.5 py-0.5 font-mono text-[12px] text-text-secondary">
                  {row.type}
                </code>
              </td>
              {showRequired ? (
                <td className="px-4 py-3 align-top text-[13px] text-text-secondary">
                  {row.required ?? 'No'}
                </td>
              ) : null}
              <td className="px-4 py-3 align-top font-mono text-[13px] text-text-tertiary">{row.defaultValue}</td>
              <td className="px-4 py-3 align-top text-[13px] font-normal text-text-secondary">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
