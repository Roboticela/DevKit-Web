'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { ButtonLabel } from './ButtonLabel'

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
    <button
      type="button"
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center rounded-[980px] border-0 bg-transparent px-2.5 py-1 font-sans text-[13px] font-medium leading-[1.2] text-danger',
        'hover:underline disabled:cursor-wait disabled:opacity-70 disabled:no-underline',
        confirming && 'bg-danger text-white no-underline hover:no-underline',
        className,
      )}
      disabled={loading}
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
      <ButtonLabel
        loading={loading}
        loadingText={loadingText ?? (label === 'Sign Out' ? 'Signing out…' : 'Removing…')}
        light={confirming}
      >
        {confirming ? confirmLabel : label}
      </ButtonLabel>
    </button>
  )
}
