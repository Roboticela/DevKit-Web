'use client'

import {
  DkVisibilityEyeShown,
  DkVisibilityEyeHidden
} from '@/icons'
import { IconButton } from './IconButton'

export function PasswordReveal({
  visible,
  onToggle,
}: {
  visible: boolean
  onToggle: () => void
}) {
  return (
    <IconButton
      label={visible ? 'Hide password' : 'Show password'}
      size="sm"
      className="absolute top-1/2 right-2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
      onClick={onToggle}
    >
      {visible ? (
        <DkVisibilityEyeHidden size={18} strokeWidth={1.6} absoluteStrokeWidth />
      ) : (
        <DkVisibilityEyeShown size={18} strokeWidth={1.6} absoluteStrokeWidth />
      )}
    </IconButton>
  )
}
