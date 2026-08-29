'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export function ConfirmAction({
  onConfirm,
  label = 'Remove',
  confirmLabel = 'Confirm?',
  loading = false,
  loadingText,
  className,
}: {
  onConfirm: () => void
  label?: string
  confirmLabel?: string
  loading?: boolean
  loadingText?: string
  className?: string
}) {
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    if (!confirming) return
    const timer = window.setTimeout(() => setConfirming(false), 3000)
    return () => window.clearTimeout(timer)
  }, [confirming])

  return (
    <Button
      type="button"
      variant={confirming ? 'danger' : 'ghost'}
      size="sm"
      fullWidth={false}
      loading={loading}
      loadingText={loadingText ?? (label === 'Sign Out' ? 'Signing out…' : 'Removing…')}
      className={cn(
        confirming ? undefined : 'h-auto px-2.5 py-1 text-danger hover:text-danger hover:underline',
        className,
      )}
      onClick={(event) => {
        event.stopPropagation()
        if (loading) return
        if (confirming) {
          onConfirm()
          setConfirming(false)
          return
        }
        setConfirming(true)
      }}
    >
      {confirming ? confirmLabel : label}
    </Button>
  )
}
