import type { ReactNode } from 'react'
import {
  DkAlertCircleWarning,
  DkCloseDismissCancel,
  DkInformationCircleDetails,
  DkSuccessCircleCheckmark,
  DkWarningTriangleAlert,
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'
import { Caption, Label } from './Text'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
export type AlertVariant = 'subtle' | 'outline' | 'solid' | 'ghost'
export type AlertSize = 'sm' | 'md' | 'lg'

export const ALERT_TONES: AlertTone[] = ['info', 'success', 'warning', 'danger', 'neutral']
export const ALERT_VARIANTS: AlertVariant[] = ['subtle', 'outline', 'solid', 'ghost']
export const ALERT_SIZES: AlertSize[] = ['sm', 'md', 'lg']

const ICONS: Record<AlertTone, typeof DkInformationCircleDetails> = {
  info: DkInformationCircleDetails,
  success: DkSuccessCircleCheckmark,
  warning: DkWarningTriangleAlert,
  danger: DkAlertCircleWarning,
  neutral: DkInformationCircleDetails,
}

const ICON_COLOR: Record<AlertTone, string> = {
  info: 'text-brand-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  neutral: 'text-text-tertiary',
}

const chrome: Record<AlertVariant, Record<AlertTone, string>> = {
  subtle: {
    info: 'border border-transparent bg-brand-primary-subtle',
    success: 'border border-transparent bg-success-subtle',
    warning: 'border border-transparent bg-warning-subtle',
    danger: 'border border-transparent bg-danger-subtle',
    neutral: 'border border-transparent bg-bg-tertiary',
  },
  outline: {
    info: 'border border-brand-primary/30 bg-bg-elevated dark:bg-bg-secondary',
    success: 'border border-success/30 bg-bg-elevated dark:bg-bg-secondary',
    warning: 'border border-warning/30 bg-bg-elevated dark:bg-bg-secondary',
    danger: 'border border-border-danger bg-bg-elevated dark:bg-bg-secondary',
    neutral: 'border border-border-default bg-bg-elevated dark:bg-bg-secondary',
  },
  solid: {
    info: 'border border-transparent bg-brand-primary',
    success: 'border border-transparent bg-success',
    warning: 'border border-transparent bg-warning',
    danger: 'border border-transparent bg-danger',
    neutral: 'border border-transparent bg-bg-tertiary',
  },
  ghost: {
    info: 'border border-transparent bg-transparent',
    success: 'border border-transparent bg-transparent',
    warning: 'border border-transparent bg-transparent',
    danger: 'border border-transparent bg-transparent',
    neutral: 'border border-transparent bg-transparent',
  },
}

const sizes: Record<
  AlertSize,
  { box: string; icon: number; title: string; body: string; action: string }
> = {
  sm: {
    box: 'gap-2.5 rounded-[10px] px-3 py-2.5',
    icon: 16,
    title: 'text-[15px]',
    body: 'text-[12px]',
    action: 'mt-1.5',
  },
  md: {
    box: 'gap-3 rounded-[12px] px-4 py-3',
    icon: 18,
    title: 'text-[17px]',
    body: 'text-[13px]',
    action: 'mt-2',
  },
  lg: {
    box: 'gap-3.5 rounded-[14px] px-5 py-4',
    icon: 20,
    title: 'text-[17px]',
    body: 'text-[15px]',
    action: 'mt-2.5',
  },
}

export function Alert({
  tone = 'info',
  variant = 'subtle',
  size = 'md',
  title,
  children,
  icon,
  action,
  onDismiss,
  className,
}: {
  tone?: AlertTone
  variant?: AlertVariant
  size?: AlertSize
  title?: ReactNode
  children?: ReactNode
  icon?: ReactNode | false
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}) {
  const metric = sizes[size]
  const solid = variant === 'solid' && tone !== 'neutral'
  const Icon = ICONS[tone]
  const showIcon = icon !== false
  const assertive = tone === 'danger' || tone === 'warning'

  return (
    <div
      role={assertive ? 'alert' : 'status'}
      className={cn(
        'flex w-full items-start text-left',
        metric.box,
        chrome[variant][tone],
        className,
      )}
    >
      {showIcon ? (
        <span
          className={cn(
            'mt-0.5 inline-flex shrink-0',
            solid ? 'text-text-on-brand' : ICON_COLOR[tone],
          )}
        >
          {icon ?? (
            <Icon size={metric.icon} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
          )}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        {title ? (
          <Label
            as="p"
            tone={solid ? 'on-brand' : 'primary'}
            className={metric.title}
          >
            {title}
          </Label>
        ) : null}
        {children ? (
          <Caption
            as="div"
            tone={solid ? 'on-brand' : 'secondary'}
            className={cn(
              metric.body,
              title ? (size === 'sm' ? 'mt-0.5' : 'mt-1') : undefined,
              solid && 'opacity-85',
            )}
          >
            {children}
          </Caption>
        ) : null}
        {action ? <div className={metric.action}>{action}</div> : null}
      </div>
      {onDismiss ? (
        <IconButton
          label="Dismiss"
          size="sm"
          className={cn(
            '-mr-1 -mt-0.5',
            solid ? 'text-text-on-brand hover:bg-white/15' : 'text-text-tertiary',
          )}
          onClick={onDismiss}
        >
          <DkCloseDismissCancel size={size === 'sm' ? 14 : 16} strokeWidth={2} absoluteStrokeWidth />
        </IconButton>
      ) : null}
    </div>
  )
}
