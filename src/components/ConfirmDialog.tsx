'use client'

import type { ReactNode } from 'react'
import { Modal, type ModalAction, type ModalActionTone, type ModalTone, type ModalVariant } from './Modal'

export type ConfirmDialogVariant = 'alert' | 'dialog' | 'sheet' | 'action'
export type ConfirmDialogSize = 'sm' | 'md' | 'lg'
export type ConfirmDialogTone = 'danger' | 'brand' | 'warning' | 'success' | 'neutral'

export const CONFIRM_DIALOG_VARIANTS: ConfirmDialogVariant[] = ['alert', 'dialog', 'sheet', 'action']
export const CONFIRM_DIALOG_SIZES: ConfirmDialogSize[] = ['sm', 'md', 'lg']
export const CONFIRM_DIALOG_TONES: ConfirmDialogTone[] = [
  'danger',
  'brand',
  'warning',
  'success',
  'neutral',
]

export const CONFIRM_DIALOG_VARIANT_LABEL: Record<ConfirmDialogVariant, string> = {
  alert: 'Alert',
  dialog: 'Dialog',
  sheet: 'Sheet',
  action: 'Action',
}

export const CONFIRM_DIALOG_SIZE_LABEL: Record<ConfirmDialogSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const CONFIRM_DIALOG_TONE_LABEL: Record<ConfirmDialogTone, string> = {
  danger: 'Danger',
  brand: 'Brand',
  warning: 'Warning',
  success: 'Success',
  neutral: 'Neutral',
}

const MODAL_VARIANT: Record<ConfirmDialogVariant, ModalVariant> = {
  alert: 'alert',
  dialog: 'dialog',
  sheet: 'sheet',
  action: 'action',
}

const MODAL_TONE: Record<ConfirmDialogTone, ModalTone> = {
  danger: 'danger',
  brand: 'default',
  warning: 'warning',
  success: 'success',
  neutral: 'default',
}

function confirmTone(tone: ConfirmDialogTone): ModalActionTone {
  if (tone === 'danger') return 'danger'
  if (tone === 'neutral') return 'default'
  return 'primary'
}

export function ConfirmDialog({
  open,
  onClose,
  title,
  body,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  secondaryLabel,
  onSecondary,
  variant = 'alert',
  size = 'md',
  tone = 'danger',
  icon,
  showCancel = true,
  showClose = false,
  dismissible = true,
  loading = false,
  loadingText = 'Working…',
  confirmDisabled = false,
  embedded = false,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  body?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onConfirm: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  variant?: ConfirmDialogVariant
  size?: ConfirmDialogSize
  tone?: ConfirmDialogTone
  icon?: boolean | ReactNode
  showCancel?: boolean
  showClose?: boolean
  dismissible?: boolean
  loading?: boolean
  loadingText?: string
  confirmDisabled?: boolean
  embedded?: boolean
  className?: string
}) {
  const busy = loading
  const locked = !dismissible || busy
  const confirm: ModalAction = {
    label: confirmLabel,
    tone: confirmTone(tone),
    onClick: onConfirm,
    loading: busy,
    loadingText,
    disabled: confirmDisabled || busy,
  }
  const secondary: ModalAction | undefined = secondaryLabel
    ? {
        label: secondaryLabel,
        tone: tone === 'warning' ? 'danger' : 'default',
        onClick: onSecondary,
        disabled: busy,
      }
    : undefined
  const cancel: ModalAction | undefined = showCancel
    ? {
        label: cancelLabel,
        tone: 'cancel',
        onClick: onClose,
        disabled: busy,
      }
    : undefined

  const actions: ModalAction[] = (() => {
    if (variant === 'alert') {
      if (secondary && cancel) return [confirm, secondary, cancel]
      if (cancel) return [cancel, confirm]
      return [confirm]
    }
    return [confirm, ...(secondary ? [secondary] : []), ...(cancel ? [cancel] : [])]
  })()

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant={MODAL_VARIANT[variant]}
      size={size}
      tone={MODAL_TONE[tone]}
      title={title}
      description={body}
      icon={icon}
      showClose={showClose}
      dismissible={!locked}
      loading={busy}
      embedded={embedded}
      className={className}
      actions={actions}
    />
  )
}
