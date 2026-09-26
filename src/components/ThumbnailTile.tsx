'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Skeleton } from './Skeleton'

export type ThumbnailTileProps = {
  /** Preview image. When omitted the tile stays in its loading skeleton. */
  src?: string
  alt?: string
  /** Overlay badge, bottom-right — a file-type or duration label. */
  badge?: ReactNode
  /** Force the skeleton loading state. */
  loading?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Thumbnail Preview Tile — image/video/doc preview with a Skeleton loading
 * state and an overlay Badge slot. Used by gallery grids and preview panes.
 */
export function ThumbnailTile({ src, alt = '', badge, loading = false, onClick, className }: ThumbnailTileProps) {
  const [loaded, setLoaded] = useState(false)
  const showSkeleton = loading || (src != null && !loaded) || src == null

  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)]',
        onClick && 'cursor-[var(--cursor-pointer)]',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => event.key === 'Enter' && onClick() : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn('size-full object-cover transition-opacity duration-200', loaded ? 'opacity-100' : 'opacity-0')}
          draggable={false}
        />
      ) : null}
      {showSkeleton ? (
        <Skeleton shape="rect" variant="subtle" className="absolute inset-0 size-full rounded-none" />
      ) : null}
      {badge && !showSkeleton ? (
        <span className="absolute bottom-2 right-2">{badge}</span>
      ) : null}
    </div>
  )
}
