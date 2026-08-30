'use client'

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react'
import { useIsClient } from '@/lib/useIsClient'
import { createPortal } from 'react-dom'
import {
  DkAlertCircleWarning,
  DkCloseDismissCancel,
  DkInformationCircleDetails,
  DkSuccessCircleCheckmark,
  DkWarningTriangleAlert,
} from '@/icons'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { Loader } from './Loader'

export type ModalVariant = 'dialog' | 'alert' | 'sheet' | 'action'
export type ModalSize = 'sm' | 'md' | 'lg' | 'full'
export type ModalTone = 'default' | 'danger' | 'success' | 'warning'
export type ModalActionTone = 'primary' | 'danger' | 'cancel' | 'default'

export type ModalAction = {
  label: string
  onClick?: () => void
  tone?: ModalActionTone
  loading?: boolean
  loadingText?: string
  disabled?: boolean
}

export const MODAL_VARIANTS: ModalVariant[] = ['dialog', 'alert', 'sheet', 'action']
export const MODAL_SIZES: ModalSize[] = ['sm', 'md', 'lg', 'full']
export const MODAL_TONES: ModalTone[] = ['default', 'danger', 'success', 'warning']

export const MODAL_VARIANT_LABEL: Record<ModalVariant, string> = {
  dialog: 'Dialog',
  alert: 'Alert',
  sheet: 'Sheet',
  action: 'Action',
}

export const MODAL_SIZE_LABEL: Record<ModalSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  full: 'Full',
}

export const MODAL_TONE_LABEL: Record<ModalTone, string> = {
  default: 'Default',
  danger: 'Danger',
  success: 'Success',
  warning: 'Warning',
}

const TONE_ICON = {
  default: DkInformationCircleDetails,
  danger: DkAlertCircleWarning,
  success: DkSuccessCircleCheckmark,
  warning: DkWarningTriangleAlert,
} as const

const TONE_ICON_CHROME: Record<ModalTone, string> = {
  default: 'bg-brand-primary-subtle text-brand-primary',
  danger: 'bg-danger-subtle text-danger',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
}

const DIALOG_WIDTH: Record<ModalSize, string> = {
  sm: 'min-[735px]:max-w-[360px]',
  md: 'min-[735px]:max-w-[440px]',
  lg: 'min-[735px]:max-w-[560px]',
  full: 'min-[735px]:max-w-[720px]',
}

const ALERT_WIDTH: Record<ModalSize, string> = {
  sm: 'max-w-[270px]',
  md: 'max-w-[320px]',
  lg: 'max-w-[380px]',
  full: 'max-w-[420px]',
}

const SHEET_WIDTH: Record<ModalSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[560px]',
  full: 'max-w-[720px]',
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const SURFACE = cn(
  'border border-border-default',
  'bg-[color-mix(in_srgb,var(--bg-elevated)_86%,transparent)]',
  'backdrop-blur-[40px] backdrop-saturate-[180%]',
  'dark:bg-[color-mix(in_srgb,var(--bg-secondary)_88%,transparent)]',
)

function listFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (node) => !node.hasAttribute('disabled') && node.getAttribute('aria-hidden') !== 'true',
  )
}

function resolveIcon(icon: boolean | ReactNode | undefined, tone: ModalTone): ReactNode {
  if (icon === false || icon == null) return null
  if (icon === true) {
    const Glyph = TONE_ICON[tone]
    return <Glyph size={28} strokeWidth={1.75} absoluteStrokeWidth />
  }
  return icon
}

function AlertActionButton({
  action,
  stacked,
}: {
  action: ModalAction
  stacked: boolean
}) {
  const tone = action.tone ?? 'default'
  const busy = Boolean(action.loading)
  const color =
    tone === 'danger'
      ? 'text-danger'
      : tone === 'cancel' || tone === 'primary'
        ? 'text-brand-primary'
        : 'text-brand-primary'
  const weight = tone === 'cancel' || tone === 'primary' ? 'font-semibold' : 'font-normal'

  return (
    <button
      type="button"
      className={cn(
        'relative flex min-h-11 w-full cursor-pointer items-center justify-center border-0 bg-transparent px-4 py-3',
        'text-[17px] leading-[1.2] tracking-[-0.01em]',
        EASE,
        'transition-colors duration-150',
        'hover:bg-bg-hover/80 active:bg-bg-active',
        'focus-visible:bg-bg-hover/80 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-55',
        stacked ? 'rounded-none' : 'min-[0px]:rounded-none',
        color,
        weight,
      )}
      disabled={action.disabled || busy}
      onClick={action.onClick}
    >
      <span className={cn('inline-flex items-center justify-center gap-2', busy && 'invisible')}>
        {action.label}
      </span>
      {busy ? (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <Loader decorative size="sm" />
          {action.loadingText ? (
            <span className="sr-only">{action.loadingText}</span>
          ) : null}
        </span>
      ) : null}
    </button>
  )
}

function DialogActions({ actions }: { actions: ModalAction[] }) {
  return (
    <div className="flex flex-col gap-3">
      {actions.map((action) => {
        const tone = action.tone ?? 'default'
        const variant =
          tone === 'danger' ? 'danger' : tone === 'primary' ? 'primary' : tone === 'cancel' ? 'ghost' : 'action'
        return (
          <Button
            key={action.label}
            variant={variant}
            loading={action.loading}
            loadingText={action.loadingText}
            disabled={action.disabled}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )
      })}
    </div>
  )
}

function SystemActions({
  actions,
  split,
  ruled = true,
}: {
  actions: ModalAction[]
  split: boolean
  ruled?: boolean
}) {
  const rule = ruled ? 'border-t border-black/10 dark:border-white/12' : undefined

  if (split && actions.length === 2) {
    return (
      <div className={cn('grid grid-cols-2', rule)}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className={index === 0 ? 'border-r border-black/10 dark:border-white/12' : undefined}
          >
            <AlertActionButton action={action} stacked={false} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', rule)}>
      {actions.map((action, index) => (
        <div
          key={action.label}
          className={index > 0 ? 'border-t border-black/10 dark:border-white/12' : undefined}
        >
          <AlertActionButton action={action} stacked />
        </div>
      ))}
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  actions,
  icon,
  variant = 'dialog',
  size = 'md',
  tone = 'default',
  showClose,
  showHandle,
  dismissible = true,
  loading = false,
  embedded = false,
  className,
}: {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  actions?: ModalAction[]
  icon?: boolean | ReactNode
  variant?: ModalVariant
  size?: ModalSize
  tone?: ModalTone
  showClose?: boolean
  showHandle?: boolean
  dismissible?: boolean
  loading?: boolean
  embedded?: boolean
  className?: string
}) {
  const uid = useId()
  const titleId = `${uid}-title`
  const descriptionId = `${uid}-description`
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const isClient = useIsClient()

  const closeVisible = showClose ?? (variant === 'dialog' || variant === 'sheet')
  const handleVisible = showHandle ?? variant === 'sheet'
  const canDismiss = dismissible && !loading
  const glyph = resolveIcon(icon, tone)

  const resolvedActions =
    actions ??
    (variant === 'alert' && !footer ? [{ label: 'OK', tone: 'primary' as const, onClick: onClose }] : undefined)

  const actionItems = resolvedActions ?? []
  const sheetCancel = variant === 'action' ? actionItems.filter((item) => item.tone === 'cancel') : []
  const sheetMain =
    variant === 'action' ? actionItems.filter((item) => item.tone !== 'cancel') : actionItems
  const alertActions = variant === 'alert' ? actionItems : []

  useEffect(() => {
    if (!open || embedded) return
    const panel = panelRef.current
    if (!panel) return

    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const first = listFocusable(panel)[0]
    ;(first ?? panel).focus()

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (!canDismiss) return
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = listFocusable(panel)
      if (items.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const start = items[0]
      const end = items[items.length - 1]
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault()
        end.focus()
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault()
        start.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      restoreRef.current?.focus?.()
    }
  }, [open, embedded, canDismiss, onClose])

  if (!open) return null
  if (!embedded && !isClient) return null

  const dialogWidth = cn('w-full', DIALOG_WIDTH[size])
  const sheetWidth = cn('w-[calc(100%-16px)]', SHEET_WIDTH[size])

  const panelClass = cn(
    'relative z-[1] flex w-full flex-col overflow-hidden',
    variant !== 'action' && SURFACE,
    variant === 'alert' && cn(ALERT_WIDTH[size], 'rounded-[14px]'),
    variant === 'dialog' &&
      cn(
        dialogWidth,
        'max-h-[min(92dvh,760px)] rounded-t-[20px] min-[735px]:rounded-[18px]',
      ),
    variant === 'sheet' &&
      cn(sheetWidth, 'max-h-[min(92dvh,760px)] rounded-[18px]'),
    variant === 'action' && cn(sheetWidth, 'gap-2 bg-transparent'),
    !embedded &&
      (variant === 'sheet' || variant === 'action'
        ? 'animate-modal-sheet-in motion-reduce:animate-none'
        : 'animate-modal-panel-in motion-reduce:animate-none'),
    variant !== 'action' && className,
  )

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={embedded ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={loading || undefined}
      tabIndex={-1}
      className={cn(panelClass, 'pointer-events-auto outline-none')}
    >
      {variant === 'action' ? (
        <div className={cn('flex w-full flex-col gap-2', className)}>
          <div className={cn('overflow-hidden rounded-[14px]', SURFACE)}>
            {title || description ? (
              <div className="px-4 py-3.5 text-center">
                {title ? (
                  <h2
                    id={titleId}
                    className="m-0 text-[13px] font-semibold leading-[1.3] tracking-[-0.01em] text-text-secondary"
                  >
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p
                    id={descriptionId}
                    className={cn(
                      'm-0 text-[13px] font-normal leading-[1.35] text-text-tertiary',
                      title ? 'mt-0.5' : undefined,
                    )}
                  >
                    {description}
                  </p>
                ) : null}
              </div>
            ) : null}
            {children ? (
              <div
                className={cn(
                  'px-4 pb-3 text-[13px] leading-[1.35] text-text-secondary',
                  title || description ? 'border-t border-black/10 pt-3 dark:border-white/12' : undefined,
                )}
              >
                {children}
              </div>
            ) : null}
            {sheetMain.length ? (
              <SystemActions
                actions={sheetMain}
                split={false}
                ruled={Boolean(title || description || children)}
              />
            ) : null}
          </div>
          {sheetCancel.length ? (
            <div className={cn('overflow-hidden rounded-[14px]', SURFACE)}>
              <SystemActions
                actions={sheetCancel.map((item) => ({ ...item, tone: item.tone ?? 'cancel' }))}
                split={false}
                ruled={false}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {variant === 'alert' ? (
        <>
          <div className="px-4 pb-4 pt-5 text-center">
            {glyph ? (
              <div
                className={cn(
                  'mx-auto mb-3 flex size-14 items-center justify-center rounded-full',
                  TONE_ICON_CHROME[tone],
                )}
              >
                {glyph}
              </div>
            ) : null}
            {title ? (
              <h2
                id={titleId}
                className="m-0 text-[17px] font-semibold leading-[1.24] tracking-[-0.022em] text-text-primary"
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                id={descriptionId}
                className={cn(
                  'm-0 text-[13px] font-normal leading-[1.38] text-text-secondary',
                  title ? 'mt-1' : undefined,
                )}
              >
                {description}
              </p>
            ) : null}
            {children ? (
              <div className="mt-3 text-[13px] leading-[1.38] text-text-secondary">{children}</div>
            ) : null}
          </div>
          {alertActions.length ? (
            <SystemActions actions={alertActions} split={alertActions.length === 2} />
          ) : null}
        </>
      ) : null}

      {variant === 'dialog' || variant === 'sheet' ? (
        <>
          {handleVisible || variant === 'dialog' ? (
            <div
              className={cn(
                'flex justify-center pt-2',
                variant === 'dialog' && !handleVisible && 'min-[735px]:hidden',
              )}
              aria-hidden
            >
              <span className="h-1 w-9 rounded-[980px] bg-text-disabled" />
            </div>
          ) : null}
          <div
            className={cn(
              'flex shrink-0 items-start gap-3 px-5',
              handleVisible || variant === 'dialog' ? 'pt-2 pb-3' : 'pt-5 pb-3',
              'min-[735px]:px-6',
              variant === 'dialog' && !handleVisible ? 'min-[735px]:pt-6' : 'min-[735px]:pt-3',
            )}
          >
            <div className="min-w-0 flex-1">
              {glyph ? (
                <div
                  className={cn(
                    'mb-3 flex size-12 items-center justify-center rounded-full',
                    TONE_ICON_CHROME[tone],
                  )}
                >
                  {glyph}
                </div>
              ) : null}
              {title ? (
                <h2
                  id={titleId}
                  className="m-0 min-w-0 text-[19px] font-semibold leading-[1.2] tracking-[-0.022em] break-words text-text-primary"
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p
                  id={descriptionId}
                  className={cn(
                    'm-0 text-[15px] leading-[1.4] text-text-secondary',
                    title ? 'mt-1' : undefined,
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
            {closeVisible ? (
              <IconButton
                label="Close"
                size="sm"
                variant="subtle"
                disabled={!canDismiss}
                onClick={onClose}
              >
                <DkCloseDismissCancel size={16} strokeWidth={1.75} absoluteStrokeWidth />
              </IconButton>
            ) : null}
          </div>
          {children ? (
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-2 min-[735px]:px-6">
              <div className="text-[15px] leading-[1.47] text-text-secondary">{children}</div>
            </div>
          ) : null}
          {footer || actionItems.length ? (
            <div
              className={cn(
                'shrink-0 px-5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]',
                'min-[735px]:px-6 min-[735px]:pb-6',
              )}
            >
              {footer ?? <DialogActions actions={actionItems} />}
            </div>
          ) : (
            <div className="h-2 min-[735px]:h-3" />
          )}
        </>
      ) : null}
    </div>
  )

  const overlay = (
    <div
      className={cn(
        'absolute inset-0 border-0 bg-bg-overlay',
        !embedded && 'animate-modal-overlay-in motion-reduce:animate-none',
        !canDismiss && 'pointer-events-none',
      )}
      aria-hidden
      onClick={() => {
        if (canDismiss) onClose()
      }}
    />
  )

  const frameClass = cn(
    'flex justify-center',
    embedded
      ? cn(
          'relative w-full overflow-hidden rounded-[12px] bg-bg-tertiary',
          variant === 'alert'
            ? 'min-h-[240px] items-center p-5'
            : variant === 'dialog'
              ? 'min-h-[280px] items-end p-0 min-[735px]:items-center min-[735px]:p-5'
              : 'min-h-[300px] items-end p-2',
        )
      : cn(
          'fixed inset-0 z-[800]',
          variant === 'alert'
            ? 'items-center p-5'
            : variant === 'dialog'
              ? 'items-end p-0 min-[735px]:items-center min-[735px]:p-6'
              : 'items-end p-2 pb-[max(8px,env(safe-area-inset-bottom))]',
        ),
  )

  const tree = (
    <div className={frameClass}>
      {overlay}
      {panel}
    </div>
  )

  if (embedded) return tree
  return createPortal(tree, document.body)
}
