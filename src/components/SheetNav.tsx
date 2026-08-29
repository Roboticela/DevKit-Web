import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
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
      <Button
        variant="ghost"
        fullWidth={false}
        className="h-auto justify-self-start p-2 pl-0 text-brand-primary hover:underline"
        disabled={cancelDisabled}
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
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
      <Button
        variant="ghost"
        fullWidth={false}
        className="min-w-24 h-auto justify-self-end p-2 pr-0 font-semibold text-brand-primary hover:underline"
        disabled={doneDisabled}
        onClick={onDone}
      >
        {doneLabel}
      </Button>
    </header>
  )
}
