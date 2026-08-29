import type { ReactNode } from 'react'
import {
  DkAlertCircleWarning,
  DkSuccessCircleCheckmark,
  DkInformationCircleDetails,
  DkWarningTriangleAlert,
  DkCloseDismissCancel
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'
import { Caption, Label } from './Text'

type AlertTone = 'info' | 'success' | 'warning' | 'danger'

const TONE: Record<
  AlertTone,
  { wrap: string; icon: typeof DkInformationCircleDetails }
> = {
  info: { wrap: 'bg-brand-primary-subtle text-text-primary', icon: DkInformationCircleDetails },
  success: { wrap: 'bg-success-subtle text-text-primary', icon: DkSuccessCircleCheckmark },
  warning: { wrap: 'bg-warning-subtle text-text-primary', icon: DkWarningTriangleAlert },
  danger: { wrap: 'bg-danger-subtle text-text-primary', icon: DkAlertCircleWarning },
}

const ICON_COLOR: Record<AlertTone, string> = {
  info: 'text-brand-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export function Alert({
  tone = 'info',
  title,
  children,
  onDismiss,
  className,
}: {
  tone?: AlertTone
  title?: string
  children?: ReactNode
  onDismiss?: () => void
  className?: string
}) {
  const Icon = TONE[tone].icon

  return (
    <div
      role="status"
      className={cn(
        'flex gap-3 rounded-[12px] px-4 py-3',
        TONE[tone].wrap,
        className,
      )}
    >
      <span className={cn('mt-0.5 inline-flex shrink-0', ICON_COLOR[tone])}>
        <Icon size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        {title ? <Label as="p">{title}</Label> : null}
        {children ? (
          <Caption as="div" tone="secondary" className={title ? 'mt-1' : undefined}>
            {children}
          </Caption>
        ) : null}
      </div>
      {onDismiss ? (
        <IconButton
          label="Dismiss"
          size="sm"
          className="text-text-tertiary hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
          onClick={onDismiss}
        >
          <DkCloseDismissCancel size={14} strokeWidth={2} absoluteStrokeWidth />
        </IconButton>
      ) : null}
    </div>
  )
}
