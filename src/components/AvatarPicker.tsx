'use client'

import { useImperativeHandle, useRef, type ChangeEvent, type Ref } from 'react'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Avatar } from './Avatar'

export type AvatarPickerHandle = {
  open: () => void
}

export function AvatarPicker({
  src,
  name,
  onFile,
  onEdit,
  disabled = false,
  accept = 'image/jpeg,image/png,image/webp,image/gif',
  className,
  ref,
}: {
  src?: string | null
  name?: string
  onFile: (file: File) => void
  onEdit?: () => void
  disabled?: boolean
  accept?: string
  className?: string
  ref?: Ref<AvatarPickerHandle>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasPhoto = Boolean(src)

  useImperativeHandle(ref, () => ({
    open: () => inputRef.current?.click(),
  }))

  function openPicker() {
    if (disabled) return
    if (hasPhoto && onEdit) {
      onEdit()
      return
    }
    inputRef.current?.click()
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) onFile(file)
  }

  return (
    <div className={cn('relative size-[112px]', className)}>
      <Avatar src={src} name={name} size="xl" />
      <button
        type="button"
        className={cn(
          'absolute -right-0.5 -bottom-0.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-brand-primary p-0 text-white',
          'outline-[3px] outline-solid outline-[var(--bg-primary)]',
          'hover:bg-brand-primary-hover active:bg-brand-primary-active',
          'disabled:cursor-not-allowed disabled:opacity-55',
        )}
        aria-label={hasPhoto ? 'Edit photo' : 'Add photo'}
        disabled={disabled}
        onClick={openPicker}
      >
        <Camera size={14} strokeWidth={1.5} absoluteStrokeWidth color="#ffffff" aria-hidden />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
    </div>
  )
}
