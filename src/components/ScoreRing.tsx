import type { ReactNode } from 'react'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export function ScoreRing({
  score,
  size = 72,
  stroke = 6,
  className,
}: {
  score: number
  size?: number
  stroke?: number
  className?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(100, score)) / 100
  const offset = circumference * (1 - progress)
  const complete = score >= 100

  return (
    <div className={cn('relative mx-auto', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-border-subtle"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={cn(
            'transition-[stroke-dashoffset] duration-[400ms] ease-[cubic-bezier(0.28,0.11,0.32,1)]',
            complete ? 'stroke-success' : 'stroke-brand-primary',
          )}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[20px] font-semibold leading-none text-text-primary">
        {score}%
      </span>
    </div>
  )
}

export function CheckItem({
  done = false,
  children,
  className,
}: {
  done?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-8 items-center gap-2', className)}>
      {done ? (
        <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <DkTaskCompleteCheckmark size={10} strokeWidth={3} absoluteStrokeWidth aria-hidden />
        </span>
      ) : (
        <span className="block size-4 shrink-0 rounded-full border-[1.5px] border-text-tertiary" />
      )}
      <Caption as="span" tone={done ? 'primary' : 'tertiary'}>
        {children}
      </Caption>
    </div>
  )
}
