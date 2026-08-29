import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption, Label } from './Text'

export function SheetNav({
  title,
  subtitle,
  cancelLabel = 'Cancel',
  doneLabel = 'Done',
  onCancel,
  onDone,
  cancelDisabled,
  doneDisabled,
  className,
}: {
  title: string
  subtitle?: string
  cancelLabel?: string
  doneLabel?: ReactNode
  onCancel: () => void
  onDone?: () => void
  cancelDisabled?: boolean
  doneDisabled?: boolean
  className?: string
}) {
  return (
    <header
      className={cn(
        'grid min-h-[52px] shrink-0 grid-cols-[96px_minmax(0,1fr)_96px] items-center gap-2 px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2',
        'min-[735px]:grid-cols-[104px_1fr_104px] min-[735px]:px-6 min-[735px]:pt-4 min-[735px]:pb-3',
        className,
      )}
    >
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-2 pl-0 text-left font-sans text-[17px] font-normal leading-none text-brand-primary hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
        disabled={cancelDisabled}
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
      <div className="min-w-0 text-center">
        <Label as="p" align="center" className="text-white">
          {title}
        </Label>
        {subtitle ? (
          <Caption align="center" className="mt-0.5 hidden min-[735px]:block dark:text-[#a1a1a6]">
            {subtitle}
          </Caption>
        ) : null}
      </div>
      <button
        type="button"
        className="min-w-24 cursor-pointer justify-self-end border-0 bg-transparent p-2 pr-0 text-right font-sans text-[17px] font-semibold leading-none text-brand-primary hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
        disabled={doneDisabled}
        onClick={onDone}
      >
        {doneLabel}
      </button>
    </header>
  )
}
