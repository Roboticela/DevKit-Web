'use client'

import { Eye, EyeOff } from 'lucide-react'

export function PasswordReveal({
  visible,
  onToggle,
}: {
  visible: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg border-0 bg-transparent p-0 text-text-tertiary hover:text-text-primary"
      onClick={onToggle}
      aria-label={visible ? 'Hide password' : 'Show password'}
    >
      {visible ? (
        <EyeOff size={18} strokeWidth={1.6} absoluteStrokeWidth />
      ) : (
        <Eye size={18} strokeWidth={1.6} absoluteStrokeWidth />
      )}
    </button>
  )
}
