'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/cn'

/**
 * Backgrounds — every wallpaper type shares one interface: render inside a
 * relative container, drive pause()/resume() via the `playing` prop, and
 * unmount cleanly. Spaces can swap types without bespoke integration.
 */
export type BackgroundProps = {
  /** false pauses timers and video (lock screen, battery saver). */
  playing?: boolean
  className?: string
  style?: CSSProperties
}

export const WALLPAPER_FITS = ['fill', 'fit', 'stretch', 'center', 'tile'] as const
export type WallpaperFit = (typeof WALLPAPER_FITS)[number]

const fitStyles: Record<WallpaperFit, CSSProperties> = {
  fill: { backgroundSize: 'cover', backgroundPosition: 'center' },
  fit: { backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#000' },
  stretch: { backgroundSize: '100% 100%' },
  center: { backgroundSize: 'auto', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' },
  tile: { backgroundSize: 'auto', backgroundRepeat: 'repeat' },
}

/** 59. Static Wallpaper — a single image with fit modes. */
export function Wallpaper({
  src,
  fit = 'fill',
  className,
  style,
}: BackgroundProps & { src: string; fit?: WallpaperFit }) {
  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 z-[var(--z-desktop)]', className)}
      style={{ backgroundImage: `url(${src})`, ...fitStyles[fit], ...style }}
    />
  )
}

  const CROSSFADE_MS = 2000

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Two stacked layers alternate current/next so a crossfade never blanks. */
function CrossfadeLayers({ src, className }: { src: string; className?: string }) {
  const [shown, setShown] = useState(src)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    if (src === shown) return undefined
    setFading(true)
    const timer = window.setTimeout(() => {
      setShown(src)
      setFading(false)
    }, CROSSFADE_MS)
    return () => window.clearTimeout(timer)
  }, [src, shown])
  return (
    <>
      <div
        aria-hidden
        className={cn('absolute inset-0 bg-cover bg-center transition-opacity', className)}
        style={{ backgroundImage: `url(${shown})`, opacity: fading ? 0 : 1, transitionDuration: 'var(--duration-slow)' }}
      />
      {fading ? (
        <div
          aria-hidden
          className={cn('absolute inset-0 bg-cover bg-center transition-opacity', className)}
          style={{ backgroundImage: `url(${src})`, opacity: 1, transitionDuration: 'var(--duration-slow)' }}
        />
      ) : null}
    </>
  )
}

export type SlideshowWallpaperProps = BackgroundProps & {
  images: string[]
  /** ms between transitions. */
  interval?: number
  shuffle?: boolean
}

/** 60. Slideshow Background — crossfading image rotation. */
export function SlideshowWallpaper({
  images,
  interval = 30000,
  shuffle = false,
  playing = true,
  className,
}: SlideshowWallpaperProps) {
  const order = useMemo(() => {
    if (!shuffle) return images
    return [...images].sort(() => Math.random() - 0.5)
  }, [images, shuffle])
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!playing || reduced || order.length < 2) return undefined
    // Pauses while locked/idle: the interval is torn down with `playing`
    // and restarts fresh on resume — it never "catches up" missed frames.
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % order.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [playing, reduced, interval, order.length])

  return (
    <div aria-hidden className={cn('absolute inset-0 z-[var(--z-desktop)]', className)}>
      <CrossfadeLayers src={order[index]} />
    </div>
  )
}

export const TIME_PRESETS = ['dawn', 'day', 'dusk', 'night'] as const
export type TimePreset = (typeof TIME_PRESETS)[number]

/** 5–8 dawn, 8–17 day, 17–20 dusk, otherwise night. */
export function getTimeOfDayPreset(hour: number): TimePreset {
  if (hour >= 5 && hour < 8) return 'dawn'
  if (hour >= 8 && hour < 17) return 'day'
  if (hour >= 17 && hour < 20) return 'dusk'
  return 'night'
}

export type DynamicWallpaperProps = BackgroundProps & {
  /** One image (or gradient recipe) per time-of-day preset. */
  presets: Record<TimePreset, string>
}

/** 61. Dynamic Background — shifts with the system clock, checked every 5 minutes. */
export function DynamicWallpaper({ presets, playing = true, className }: DynamicWallpaperProps) {
  const [preset, setPreset] = useState<TimePreset>(() => getTimeOfDayPreset(new Date().getHours()))
  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setPreset(getTimeOfDayPreset(new Date().getHours()))
    }, 5 * 60 * 1000)
    return () => window.clearInterval(timer)
  }, [playing])
  return (
    <div aria-hidden className={cn('absolute inset-0 z-[var(--z-desktop)]', className)}>
      <CrossfadeLayers src={presets[preset]} />
    </div>
  )
}

export type VideoWallpaperProps = BackgroundProps & {
  src: string
  /** Still frame shown while buffering and in performance mode. */
  poster: string
  type?: string
}

/** 62. Video Background — looping muted video, poster fallback when paused. */
export function VideoWallpaper({ src, poster, type = 'video/mp4', playing = true, className }: VideoWallpaperProps) {
  return (
    <div aria-hidden className={cn('absolute inset-0 z-[var(--z-desktop)] overflow-hidden', className)}>
      {playing ? (
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline poster={poster}>
          <source src={src} type={type} />
        </video>
      ) : (
        // Performance mode: the poster frame as a static image, no decode cost
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }} />
      )}
    </div>
  )
}

/** 63. Live/Ambient Background — layered radial gradients drifting over a 90s loop, CSS-only. */
export function AmbientWallpaper({ playing = true, className }: BackgroundProps) {
  return (
    <div aria-hidden className={cn('absolute inset-0 z-[var(--z-desktop)] overflow-hidden bg-[var(--bg-primary)]', className)}>
      <style>{`
        @keyframes ambient-drift-a { 0%,100% { transform: translate(-4%, -2%) } 50% { transform: translate(4%, 3%) } }
        @keyframes ambient-drift-b { 0%,100% { transform: translate(3%, 4%) } 50% { transform: translate(-3%, -4%) } }
        @media (prefers-reduced-motion: reduce) { .ambient-layer { animation: none !important } }
      `}</style>
      <div
        className="ambient-layer absolute -inset-[10%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 25%, rgba(59,158,255,0.28), transparent 70%), radial-gradient(ellipse 55% 45% at 72% 68%, rgba(45,212,196,0.2), transparent 70%)',
          animation: playing ? 'ambient-drift-a 90s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="ambient-layer absolute -inset-[10%]"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 68% 30%, rgba(198,93,123,0.22), transparent 70%), radial-gradient(ellipse 45% 40% at 28% 75%, rgba(27,42,107,0.5), transparent 70%)',
          animation: playing ? 'ambient-drift-b 90s ease-in-out infinite reverse' : 'none',
        }}
      />
    </div>
  )
}
