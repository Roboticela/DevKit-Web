import { cn } from '@/lib/cn'

export type SkeletonVariant = 'subtle' | 'outline' | 'ghost' | 'pill'
export type SkeletonSize = 'sm' | 'md' | 'lg'
export type SkeletonShape = 'line' | 'heading' | 'circle' | 'rect' | 'square'
export type SkeletonMotion = 'shimmer' | 'pulse' | 'none'

export const SKELETON_VARIANTS: SkeletonVariant[] = ['subtle', 'outline', 'ghost', 'pill']
export const SKELETON_SIZES: SkeletonSize[] = ['sm', 'md', 'lg']
export const SKELETON_SHAPES: SkeletonShape[] = ['line', 'heading', 'circle', 'rect', 'square']
export const SKELETON_MOTIONS: SkeletonMotion[] = ['shimmer', 'pulse', 'none']

export const SKELETON_VARIANT_LABEL: Record<SkeletonVariant, string> = {
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  pill: 'Pill',
}

export const SKELETON_SIZE_LABEL: Record<SkeletonSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const SKELETON_SHAPE_LABEL: Record<SkeletonShape, string> = {
  line: 'Line',
  heading: 'Heading',
  circle: 'Circle',
  rect: 'Rect',
  square: 'Square',
}

export const SKELETON_MOTION_LABEL: Record<SkeletonMotion, string> = {
  shimmer: 'Shimmer',
  pulse: 'Pulse',
  none: 'Static',
}

const chrome: Record<SkeletonVariant, string> = {
  subtle: 'border border-transparent bg-bg-tertiary dark:bg-bg-active',
  outline: 'border border-border-default bg-transparent',
  ghost: 'border border-transparent bg-black/[0.06] dark:bg-white/[0.08]',
  pill: 'border border-transparent bg-bg-tertiary dark:bg-bg-active',
}

const radius: Record<SkeletonShape, Record<SkeletonSize, string>> = {
  line: { sm: 'rounded-[6px]', md: 'rounded-[8px]', lg: 'rounded-[8px]' },
  heading: { sm: 'rounded-[8px]', md: 'rounded-[10px]', lg: 'rounded-[10px]' },
  circle: { sm: 'rounded-full', md: 'rounded-full', lg: 'rounded-full' },
  rect: { sm: 'rounded-[12px]', md: 'rounded-[12px]', lg: 'rounded-[18px]' },
  square: { sm: 'rounded-[10px]', md: 'rounded-[12px]', lg: 'rounded-[12px]' },
}

const metric: Record<SkeletonShape, Record<SkeletonSize, string>> = {
  line: { sm: 'h-3 w-full', md: 'h-3.5 w-full', lg: 'h-4 w-full' },
  heading: { sm: 'h-5 w-[72%]', md: 'h-7 w-[68%]', lg: 'h-8 w-[64%]' },
  circle: { sm: 'size-6', md: 'size-8', lg: 'size-11' },
  rect: { sm: 'h-[88px] w-full', md: 'h-[120px] w-full', lg: 'h-[160px] w-full' },
  square: { sm: 'size-11', md: 'size-16', lg: 'size-20' },
}

const stackGap: Record<SkeletonSize, string> = {
  sm: 'gap-2',
  md: 'gap-2.5',
  lg: 'gap-3',
}

function lineWidth(index: number, count: number) {
  if (count <= 1) return undefined
  if (index === count - 1) return '62%'
  if (index === 0) return '100%'
  return '88%'
}

function Bone({
  variant,
  size,
  shape,
  motion,
  width,
  className,
}: {
  variant: SkeletonVariant
  size: SkeletonSize
  shape: SkeletonShape
  motion: SkeletonMotion
  width?: string | number
  className?: string
}) {
  const pill = variant === 'pill' && shape !== 'circle'
  const round = pill ? 'rounded-[980px]' : radius[shape][size]
  const inline = shape === 'circle' || shape === 'square'

  return (
    <span
      className={cn(
        'relative overflow-hidden',
        inline ? 'inline-block align-middle' : 'block',
        !className && metric[shape][size],
        round,
        chrome[variant],
        motion === 'pulse' && 'animate-skeleton-pulse',
        className,
      )}
      style={width != null ? { width } : undefined}
      aria-hidden
    >
      {motion === 'shimmer' ? (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden="true"
        >
          <span className="absolute inset-0 w-full animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/55 to-transparent dark:via-white/12" />
        </span>
      ) : null}
    </span>
  )
}

export function Skeleton({
  variant = 'subtle',
  size = 'md',
  shape = 'line',
  motion = 'shimmer',
  lines = 1,
  width,
  label,
  className,
}: {
  variant?: SkeletonVariant
  size?: SkeletonSize
  shape?: SkeletonShape
  motion?: SkeletonMotion
  lines?: number
  width?: string | number
  label?: string
  className?: string
}) {
  const count = shape === 'line' ? Math.max(1, Math.round(lines)) : 1
  const stack = count > 1

  const bones = Array.from({ length: count }, (_, index) => (
    <Bone
      key={index}
      variant={variant}
      size={size}
      shape={shape}
      motion={motion}
      width={stack ? lineWidth(index, count) : width}
      className={stack ? undefined : className}
    />
  ))

  if (!stack) {
    if (!label) return bones[0]
    return (
      <span role="status" aria-busy="true" aria-label={label}>
        {bones[0]}
      </span>
    )
  }

  return (
    <div
      className={cn('flex w-full flex-col', stackGap[size], className)}
      role={label ? 'status' : undefined}
      aria-busy={label ? true : undefined}
      aria-label={label}
    >
      {bones}
    </div>
  )
}
