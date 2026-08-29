import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { AUTH_FIELD_SURFACE, EASE, FIELD_INVALID, FOCUS_RING } from '@/lib/styles'

export function Textarea({
  invalid = false,
  className,
  ...rest
}: { invalid?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-[120px] w-full resize-y rounded-[12px] border px-4 py-3 font-sans text-[17px] font-normal leading-[1.42] caret-text-primary',
        AUTH_FIELD_SURFACE,
        'placeholder:text-text-tertiary',
        'transition-[border-color,box-shadow] duration-150',
        EASE,
        invalid ? FIELD_INVALID : FOCUS_RING,
        className,
      )}
      {...rest}
      aria-invalid={invalid || undefined}
    />
  )
}
