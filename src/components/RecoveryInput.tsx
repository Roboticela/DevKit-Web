import { cn } from '@/lib/cn'
import { AUTH_FIELD_SURFACE, FOCUS_RING } from '@/lib/styles'

export function RecoveryInput({
  value,
  onChange,
  disabled,
  label = 'Recovery code',
  className,
}: {
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  label?: string
  className?: string
}) {
  return (
    <label className={cn('block w-full text-left', className)}>
      <span className="mb-2 block text-left text-xs font-normal text-text-secondary">
        {label}
      </span>
      <input
        className={cn(
          'mb-2 h-12 w-full rounded-[12px] border px-4 text-center font-mono text-xl font-semibold tracking-[0.08em]',
          AUTH_FIELD_SURFACE,
          FOCUS_RING,
        )}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
    </label>
  )
}

export function RecoveryCodesList({ codes }: { codes: string[] }) {
  return (
    <ul className="my-3 mb-4 grid list-none grid-cols-2 gap-2 p-0">
      {codes.map((code) => (
        <li key={code}>
          <code className="block rounded-lg bg-bg-secondary px-2 py-2.5 text-center font-mono text-[13px] font-semibold tracking-[0.04em] text-text-primary">
            {code}
          </code>
        </li>
      ))}
    </ul>
  )
}
