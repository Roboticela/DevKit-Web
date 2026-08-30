import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export type DividerVariant = 'solid' | 'subtle' | 'dashed' | 'dotted' | 'fade'
export type DividerSize = 'sm' | 'md' | 'lg'
export type DividerTone = 'default' | 'brand' | 'success' | 'warning' | 'danger'
export type DividerAlign = 'start' | 'center' | 'end'
export type DividerOrientation = 'horizontal' | 'vertical'

export const DIVIDER_VARIANTS: DividerVariant[] = ['solid', 'subtle', 'dashed', 'dotted', 'fade']
export const DIVIDER_SIZES: DividerSize[] = ['sm', 'md', 'lg']
export const DIVIDER_TONES: DividerTone[] = ['default', 'brand', 'success', 'warning', 'danger']
export const DIVIDER_ALIGNS: DividerAlign[] = ['start', 'center', 'end']
export const DIVIDER_ORIENTATIONS: DividerOrientation[] = ['horizontal', 'vertical']

export const DIVIDER_VARIANT_LABEL: Record<DividerVariant, string> = {
  solid: 'Solid',
  subtle: 'Subtle',
  dashed: 'Dashed',
  dotted: 'Dotted',
  fade: 'Fade',
}

export const DIVIDER_SIZE_LABEL: Record<DividerSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const DIVIDER_TONE_LABEL: Record<DividerTone, string> = {
  default: 'Default',
  brand: 'Brand',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
}

export const DIVIDER_ALIGN_LABEL: Record<DividerAlign, string> = {
  start: 'Start',
  center: 'Center',
  end: 'End',
}

export const DIVIDER_ORIENTATION_LABEL: Record<DividerOrientation, string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}

const TONE_PAINT: Record<DividerTone, { fill: string; css: string; quiet: string; cssQuiet: string }> = {
  default: {
    fill: 'bg-border-default',
    css: 'var(--border-default)',
    quiet: 'bg-border-subtle',
    cssQuiet: 'var(--border-subtle)',
  },
  brand: {
    fill: 'bg-brand-primary',
    css: 'var(--brand-primary)',
    quiet: 'bg-brand-primary/40',
    cssQuiet: 'color-mix(in srgb, var(--brand-primary) 40%, transparent)',
  },
  success: {
    fill: 'bg-success',
    css: 'var(--success)',
    quiet: 'bg-success/40',
    cssQuiet: 'color-mix(in srgb, var(--success) 40%, transparent)',
  },
  warning: {
    fill: 'bg-warning',
    css: 'var(--warning)',
    quiet: 'bg-warning/40',
    cssQuiet: 'color-mix(in srgb, var(--warning) 40%, transparent)',
  },
  danger: {
    fill: 'bg-danger',
    css: 'var(--danger)',
    quiet: 'bg-danger/40',
    cssQuiet: 'color-mix(in srgb, var(--danger) 40%, transparent)',
  },
}

const LABEL_TONE: Record<DividerTone, 'secondary' | 'link' | 'success' | 'warning' | 'danger'> = {
  default: 'secondary',
  brand: 'link',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

const ICON_TONE: Record<DividerTone, string> = {
  default: 'text-text-tertiary',
  brand: 'text-brand-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

const SIZE_BOX: Record<
  DividerSize,
  { gap: string; type: string; padX: string; padY: string }
> = {
  sm: { gap: 'gap-3', type: 'text-[11px]', padX: 'my-4', padY: 'mx-2' },
  md: { gap: 'gap-4', type: 'text-[12px]', padX: 'my-6', padY: 'mx-3' },
  lg: { gap: 'gap-4', type: 'text-[13px]', padX: 'my-8', padY: 'mx-4' },
}

type FadeEdge = 'in' | 'out' | 'both'

function Rule({
  orientation,
  variant,
  size,
  tone,
  flex,
  fade,
}: {
  orientation: DividerOrientation
  variant: DividerVariant
  size: DividerSize
  tone: DividerTone
  flex: boolean
  fade?: FadeEdge
}) {
  const horizontal = orientation === 'horizontal'
  const paint = TONE_PAINT[tone]
  const quiet = variant === 'subtle'
  const css = quiet ? paint.cssQuiet : paint.css
  const fill = quiet ? paint.quiet : paint.fill
  const thick = size === 'lg' ? (horizontal ? 'h-0.5' : 'w-0.5') : horizontal ? 'h-px' : 'w-px'
  const grow = flex
    ? horizontal
      ? 'min-w-0 flex-1'
      : 'min-h-0 w-full flex-1'
    : horizontal
      ? 'w-full'
      : 'h-full min-h-4'
  const dir = horizontal ? 'to right' : 'to bottom'
  const edge = fade ?? (variant === 'fade' ? 'both' : undefined)

  if (variant === 'fade' || edge) {
    const image =
      edge === 'in'
        ? `linear-gradient(${dir}, transparent, ${css})`
        : edge === 'out'
          ? `linear-gradient(${dir}, ${css}, transparent)`
          : `linear-gradient(${dir}, transparent, ${css}, transparent)`
    return (
      <span
        className={cn('block', thick, grow)}
        style={{ backgroundImage: image }}
        aria-hidden
      />
    )
  }

  if (variant === 'dashed') {
    return (
      <span
        className={cn('block', thick, grow)}
        style={{
          backgroundImage: `repeating-linear-gradient(${dir}, ${css} 0 4px, transparent 4px 10px)`,
        }}
        aria-hidden
      />
    )
  }

  if (variant === 'dotted') {
    return (
      <span
        className={cn('block', horizontal ? 'h-[3px]' : 'w-[3px]', grow)}
        style={{
          backgroundImage: `radial-gradient(circle closest-side, ${css} 1.05px, transparent 1.15px)`,
          backgroundSize: horizontal ? '8px 3px' : '3px 8px',
          backgroundRepeat: horizontal ? 'repeat-x' : 'repeat-y',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
    )
  }

  return <span className={cn('block', thick, grow, fill)} aria-hidden />
}

export function Divider({
  children,
  icon,
  variant = 'solid',
  size = 'md',
  tone = 'default',
  align = 'center',
  orientation = 'horizontal',
  inset = false,
  flush = false,
  disabled = false,
  decorative,
  className,
}: {
  children?: ReactNode
  icon?: ReactNode
  variant?: DividerVariant
  size?: DividerSize
  tone?: DividerTone
  align?: DividerAlign
  orientation?: DividerOrientation
  inset?: boolean
  flush?: boolean
  disabled?: boolean
  decorative?: boolean
  className?: string
}) {
  const labeled = children != null && children !== false && children !== ''
  const hasMark = labeled || Boolean(icon)
  const horizontal = orientation === 'horizontal'
  const metric = SIZE_BOX[size]
  const isDecorative = decorative ?? !hasMark
  const name = typeof children === 'string' ? children : undefined

  return (
    <div
      className={cn(
        'flex',
        horizontal ? 'w-full items-center' : 'h-full min-h-5 flex-col items-center justify-center',
        hasMark && metric.gap,
        !flush && (horizontal ? metric.padX : metric.padY),
        horizontal && inset && 'ms-4',
        disabled && 'opacity-55',
        className,
      )}
      role={isDecorative ? undefined : 'separator'}
      aria-hidden={isDecorative || undefined}
      aria-orientation={isDecorative ? undefined : orientation}
      aria-label={isDecorative ? undefined : name}
      aria-disabled={disabled || undefined}
    >
      {!hasMark ? (
        <Rule orientation={orientation} variant={variant} size={size} tone={tone} flex={false} />
      ) : (
        <>
          {align !== 'start' ? (
            <Rule
              orientation={orientation}
              variant={variant}
              size={size}
              tone={tone}
              flex
              fade={variant === 'fade' ? 'in' : undefined}
            />
          ) : null}
          <span
            className={cn(
              'inline-flex shrink-0 items-center',
              horizontal ? 'max-w-[70%]' : 'max-h-[70%] flex-col',
              labeled && icon ? 'gap-1.5' : 'gap-0',
            )}
          >
            {icon ? (
              <span className={cn('inline-flex shrink-0', disabled ? 'text-text-disabled' : ICON_TONE[tone])}>
                {icon}
              </span>
            ) : null}
            {labeled ? (
              <Caption
                as="span"
                tone={disabled ? 'disabled' : LABEL_TONE[tone]}
                align="center"
                className={cn('min-w-0', metric.type)}
              >
                {children}
              </Caption>
            ) : null}
          </span>
          {align !== 'end' ? (
            <Rule
              orientation={orientation}
              variant={variant}
              size={size}
              tone={tone}
              flex
              fade={variant === 'fade' ? 'out' : undefined}
            />
          ) : null}
        </>
      )}
    </div>
  )
}
