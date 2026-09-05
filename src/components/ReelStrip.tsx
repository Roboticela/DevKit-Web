'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Flag,
  Heart,
  Link2,
  Maximize2,
  MessageCircle,
  MoreHorizontal,
  Music,
  Pause,
  Play,
  Send,
  Settings2,
  Share,
  ThumbsDown,
  UserRoundX,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type Reel = {
  id: string
  handle: string
  caption: string
  tags: string
  audio: string
  image: string
  avatar: string
  video?: string
  to: string
  views: number
  likes: number
  comments: number
  shares: number
}

type ReelQuality = 'auto' | '1080p' | '720p' | '480p'
type MenuPanel = 'main' | 'quality'

const QUALITY_OPTIONS: { id: ReelQuality; label: string }[] = [
  { id: 'auto', label: 'Auto' },
  { id: '1080p', label: '1080p' },
  { id: '720p', label: '720p' },
  { id: '480p', label: '480p' },
]

const REEL_EASE = 'ease-[cubic-bezier(0.28,0.11,0.32,1)]' as const

const REEL_SPARKS = [
  { sx: '-54px', sy: '-48px', rot: '-28deg', delay: '40ms' },
  { sx: '58px', sy: '-42px', rot: '22deg', delay: '70ms' },
  { sx: '-62px', sy: '18px', rot: '-14deg', delay: '100ms' },
  { sx: '64px', sy: '22px', rot: '18deg', delay: '55ms' },
  { sx: '-18px', sy: '-68px', rot: '-8deg', delay: '120ms' },
  { sx: '22px', sy: '64px', rot: '12deg', delay: '85ms' },
  { sx: '-72px', sy: '-12px', rot: '-34deg', delay: '150ms' },
  { sx: '74px', sy: '-8px', rot: '30deg', delay: '135ms' },
] as const

function reelSparkStyle(spark: (typeof REEL_SPARKS)[number]): CSSProperties {
  return {
    '--sx': spark.sx,
    '--sy': spark.sy,
    '--rot': spark.rot,
    animationDelay: spark.delay,
  } as CSSProperties
}

function reelMoreBtn(opts?: { active?: boolean; danger?: boolean; back?: boolean }) {
  return cn(
    'flex min-h-10 w-full cursor-pointer items-center gap-3 rounded-[10px] border-0 bg-transparent px-3 text-left text-[15px] font-normal leading-[1.2] tracking-[-0.01em] text-inherit [font-family:inherit]',
    `transition-[background] duration-150 ${REEL_EASE}`,
    'active:bg-[rgb(255_255_255/0.18)]',
    'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus',
    '[&>span:not([data-reel-meta])]:min-w-0 [&>span:not([data-reel-meta])]:flex-1',
    opts?.danger
      ? 'text-danger hover:bg-[rgb(255_59_48/0.14)] [&>svg:first-child]:size-4 [&>svg:first-child]:shrink-0 [&>svg:first-child]:text-danger [&_svg]:text-danger'
      : 'hover:bg-[rgb(255_255_255/0.12)] [&>svg:first-child]:size-4 [&>svg:first-child]:shrink-0 [&>svg:first-child]:text-[rgb(255_255_255/0.92)]',
    opts?.active && 'bg-[rgb(255_255_255/0.08)]',
    opts?.back && 'font-semibold',
  )
}

function reelRailIcon(opts?: {
  popping?: boolean
  liked?: boolean
  saved?: boolean
  commentsOpen?: boolean
  tintOnActive?: boolean
}) {
  return cn(
    'grid size-[52px] place-items-center rounded-[980px] border border-[rgb(255_255_255/0.22)] bg-[rgb(0_0_0/0.42)]',
    `transition-[background,border-color,color] duration-200 ${REEL_EASE}`,
    'group-hover/rail:border-[rgb(255_255_255/0.4)] group-hover/rail:bg-[rgb(0_0_0/0.58)]',
    'group-active/rail:bg-[rgb(0_0_0/0.68)]',
    'group-focus-visible/rail:outline-2 group-focus-visible/rail:outline-offset-2 group-focus-visible/rail:outline-border-focus',
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none',
    opts?.liked ? 'text-danger' : opts?.saved || opts?.commentsOpen ? 'text-brand-primary' : 'text-white',
    opts?.tintOnActive && 'group-active/rail:text-brand-primary',
    opts?.popping && 'animate-reel-rail-pop',
  )
}

const reelClass = {
  strip: 'relative z-[3] m-0 w-full max-w-full overflow-hidden p-0',
  navs: 'mb-[18px] flex justify-center gap-3',
  nav: cn(
    'grid size-11 cursor-pointer place-items-center rounded-[980px] border border-[rgb(255_255_255/0.14)] bg-[rgb(255_255_255/0.08)] p-0 text-[rgb(255_255_255/0.72)]',
    `transition-[background,border-color,color,transform] duration-[250ms] ${REEL_EASE}`,
    'hover:-translate-y-px hover:border-[rgb(255_255_255/0.28)] hover:bg-[rgb(255_255_255/0.14)] hover:text-white',
    'active:scale-[0.94]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'motion-reduce:transform-none motion-reduce:transition-none',
  ),
  navNext: cn(
    'grid size-11 cursor-pointer place-items-center rounded-[980px] border border-[rgb(255_255_255/0.28)] bg-[rgb(255_255_255/0.14)] p-0 text-white',
    `transition-[background,border-color,color,transform] duration-[250ms] ${REEL_EASE}`,
    'hover:-translate-y-px',
    'active:scale-[0.94]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'motion-reduce:transform-none motion-reduce:transition-none',
  ),
  viewport: cn(
    'relative w-full cursor-grab overflow-visible touch-pan-y select-none',
    '[&_a]:cursor-pointer [&_button]:cursor-pointer',
    'data-[dragging=true]:cursor-grabbing',
  ),
  stage: 'group/stage absolute top-0 left-1/2 origin-top',
  card: cn(
    'absolute bg-black will-change-[left,top,width,height]',
    'group-data-[live=true]/stage:[transition:left_0.85s_cubic-bezier(0.32,0.72,0.18,1),top_0.85s_cubic-bezier(0.32,0.72,0.18,1),width_0.85s_cubic-bezier(0.32,0.72,0.18,1),height_0.85s_cubic-bezier(0.32,0.72,0.18,1),border-radius_0.85s,filter_0.85s]',
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none',
  ),
  clip: 'absolute inset-0 animate-reel-card-in overflow-hidden [border-radius:inherit] motion-reduce:animate-none motion-reduce:transform-none',
  hit: cn(
    'group/hit absolute inset-0 cursor-pointer overflow-hidden border-0 bg-black p-0 text-white touch-pan-y [border-radius:inherit]',
    'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-border-focus',
  ),
  poster: 'pointer-events-none absolute inset-0 size-full object-cover',
  video: 'pointer-events-none absolute inset-0 size-full object-cover',
  fx: 'pointer-events-none absolute z-[6] size-0',
  fxMain: cn(
    'absolute top-0 left-0 grid animate-reel-fx-main place-items-center [transform:translate(-50%,-50%)]',
    'motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100',
  ),
  fxRing: cn(
    'absolute top-0 left-0 size-7 animate-reel-fx-ring rounded-[980px] border-2 border-current opacity-85 [transform:translate(-50%,-50%)_scale(0.3)]',
    'motion-reduce:animate-none motion-reduce:transform-none',
  ),
  fxRingLate: cn(
    'absolute top-0 left-0 size-7 animate-reel-fx-ring rounded-[980px] border-2 border-current opacity-45 delay-[90ms] [transform:translate(-50%,-50%)_scale(0.3)]',
    'motion-reduce:animate-none motion-reduce:transform-none',
  ),
  fxSpark: cn(
    'absolute top-0 left-0 grid animate-reel-fx-spark place-items-center [transform:translate(-50%,-50%)]',
    'motion-reduce:animate-none motion-reduce:transform-none',
  ),
  shade: 'pointer-events-none absolute inset-0 bg-[rgb(0_0_0/0.18)]',
  shadeHero: 'pointer-events-none absolute inset-0 bg-[rgb(0_0_0/0.28)]',
  play: cn(
    'pointer-events-none absolute top-1/2 left-1/2 inline-flex size-[52px] items-center justify-center rounded-[980px] border border-[rgb(255_255_255/0.22)] bg-[rgb(0_0_0/0.42)] text-white',
    `transition-[opacity,transform,background,border-color] duration-[420ms] ${REEL_EASE}`,
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100',
  ),
  playShown: '[transform:translate(-50%,-50%)_scale(1)] opacity-100',
  playHidden:
    'pointer-events-none [transform:translate(-50%,-50%)_scale(0.86)] opacity-0 motion-reduce:opacity-100 motion-reduce:transform-none',
  playHover:
    'group-hover/hit:border-[rgb(255_255_255/0.4)] group-hover/hit:bg-[rgb(0_0_0/0.58)] group-active/hit:bg-[rgb(0_0_0/0.68)]',
  playIcons: 'relative grid size-[22px] place-items-center',
  playIcon: cn(
    'col-start-1 row-start-1 scale-[0.82] opacity-0',
    `transition-[opacity,transform] duration-[280ms] ${REEL_EASE}`,
    'motion-reduce:transition-none',
  ),
  playIconOn: cn(
    'col-start-1 row-start-1 scale-100 opacity-100',
    `transition-[opacity,transform] duration-[280ms] ${REEL_EASE}`,
    'motion-reduce:transition-none',
  ),
  views: cn(
    'pointer-events-none absolute bottom-[9px] left-[9px] z-[2] inline-flex items-center justify-center gap-[5px] rounded-[980px] bg-[rgb(0_0_0/0.42)] px-2 py-[3px] text-[10.5px] leading-none font-semibold text-white',
    `transition-opacity duration-[400ms] ${REEL_EASE}`,
  ),
  hero: cn(
    'pointer-events-none absolute inset-0 z-[3] text-white opacity-0',
    `transition-opacity duration-[400ms] ${REEL_EASE}`,
  ),
  heroOn: cn(
    'pointer-events-none absolute inset-0 z-[3] text-white opacity-100 delay-[280ms]',
    `transition-opacity duration-[400ms] ${REEL_EASE}`,
  ),
  volume: cn(
    'group/vol pointer-events-auto absolute top-3 left-3 z-[5] flex h-9 w-9 items-center overflow-hidden rounded-[980px] border border-[rgb(255_255_255/0.18)] bg-[rgb(0_0_0/0.52)] text-white',
    `transition-[width,padding] duration-300 ${REEL_EASE}`,
    'hover:w-[148px] hover:pr-3 focus-within:w-[148px] focus-within:pr-3',
  ),
  volumeToggle: cn(
    'grid size-9 flex-none cursor-pointer place-items-center rounded-[980px] border-0 bg-transparent p-0 text-inherit',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
  ),
  volumeSlider: cn(
    'pointer-events-none m-0 flex w-[88px] flex-none items-center opacity-0',
    `transition-opacity duration-200 ${REEL_EASE}`,
    'group-hover/vol:pointer-events-auto group-hover/vol:opacity-100 group-focus-within/vol:pointer-events-auto group-focus-within/vol:opacity-100',
  ),
  volumeRange: cn(
    'm-0 h-1 w-full cursor-pointer appearance-none rounded-[980px] bg-[rgb(255_255_255/0.28)]',
    '[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[980px] [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer',
    '[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-[980px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer',
    '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-[980px] [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-[rgb(255_255_255/0.28)]',
  ),
  actions: 'pointer-events-auto absolute top-3 right-3 z-[5] flex items-center gap-2',
  action: cn(
    'grid size-9 cursor-pointer place-items-center rounded-[980px] border border-[rgb(255_255_255/0.18)] bg-[rgb(0_0_0/0.52)] p-0 text-white',
    `transition-[background,border-color,color] duration-[220ms] ${REEL_EASE}`,
    'hover:border-[rgb(255_255_255/0.3)] hover:bg-[rgb(0_0_0/0.68)]',
    'active:bg-[rgb(0_0_0/0.78)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'motion-reduce:transition-none',
  ),
  more: 'relative',
  moreMenu: cn(
    'fixed top-0 right-0 z-[110] flex max-h-[min(70vh,420px)] min-w-[236px] max-w-[min(280px,calc(100vw-32px))] origin-top-right flex-col gap-0.5 overflow-y-auto rounded-[14px] border border-[rgb(255_255_255/0.12)] bg-[rgb(44_44_46/0.97)] p-1.5 text-white will-change-[opacity,transform] [scrollbar-width:thin]',
    `transition-[opacity,transform] duration-[320ms] ${REEL_EASE}`,
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none',
  ),
  moreGroup: 'flex flex-col gap-0.5',
  moreSep: 'mx-2 my-1 h-px bg-[rgb(255_255_255/0.12)]',
  moreCheck: 'grid size-4 shrink-0 place-items-center text-[rgb(255_255_255/0.92)]',
  moreMeta: 'ml-auto inline-flex shrink-0 items-center gap-0.5 text-[13px] font-normal tracking-normal text-[rgb(255_255_255/0.48)]',
  rail: 'pointer-events-auto absolute right-[14px] bottom-[156px] z-[5] flex flex-col items-center gap-[18px]',
  railBtn: 'group/rail pointer-events-auto flex cursor-pointer flex-col items-center gap-1.5 border-0 bg-transparent p-0 text-xs leading-none font-semibold tracking-[-0.01em] text-white',
  caption: 'absolute right-0 bottom-0 left-0 bg-[rgb(0_0_0/0.55)] px-4 pt-[14px] pb-4',
  handle: 'mb-[7px] flex items-center gap-2 text-[12.5px] font-semibold',
  avatar: 'size-[26px] rounded-[980px] border border-[rgb(255_255_255/0.3)] object-cover',
  verified: 'shrink-0 text-brand-primary',
  line: 'm-0 text-[11.5px] leading-[1.45] text-white',
  tags: 'm-0 text-[11.5px] leading-[1.45] text-[rgb(255_255_255/0.68)]',
  audio: 'mt-2 mb-0 flex items-center gap-1.5 text-[10.5px] text-[rgb(255_255_255/0.68)]',
  viewer: cn(
    'fixed inset-0 z-[100] grid place-items-center p-6',
    `transition-opacity duration-[420ms] ${REEL_EASE}`,
    'max-[900px]:place-items-stretch max-[900px]:p-0',
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none motion-reduce:opacity-100',
  ),
  viewerBackdrop: cn(
    'absolute inset-0 cursor-pointer border-0 bg-[rgb(0_0_0/0.72)]',
    `transition-opacity duration-[420ms] ${REEL_EASE}`,
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none motion-reduce:opacity-100',
  ),
  viewerShell: cn(
    'relative z-[1] grid w-max max-h-[min(88dvh,820px)] items-stretch overflow-hidden rounded-[22px] border border-[rgb(255_255_255/0.12)] bg-[#111113] will-change-[opacity,transform,grid-template-columns]',
    `transition-[grid-template-columns,opacity,transform] duration-[420ms] ${REEL_EASE}`,
    'max-[900px]:max-h-dvh max-[900px]:w-full max-[900px]:grid-cols-1 max-[900px]:rounded-none max-[900px]:border-0 max-[900px]:[transition-property:grid-template-rows,opacity,transform]',
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none',
  ),
  viewerPanel: cn(
    'relative aspect-[9/16] w-[min(42vw,420px)] max-h-[min(88dvh,820px)] max-w-full',
    'max-[900px]:aspect-auto max-[900px]:h-[min(58dvh,560px)] max-[900px]:w-full max-[900px]:max-h-none',
  ),
  viewerMedia: 'relative size-full overflow-hidden bg-black text-white',
  viewerHit: cn(
    'group/hit absolute inset-0 cursor-pointer border-0 bg-black p-0 text-white',
    'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-border-focus',
  ),
  viewerComments: cn(
    'min-w-0 overflow-hidden border-l border-l-transparent',
    `transition-[opacity,border-color] duration-[320ms] ${REEL_EASE}`,
    'max-[900px]:border-t max-[900px]:border-l-0',
    'motion-reduce:transform-none motion-reduce:transition-none motion-reduce:animate-none',
  ),
  viewerCommentsClip: 'h-full min-w-0 overflow-hidden',
  viewerCommentsBody: cn(
    'flex h-full w-[min(42vw,360px)] max-h-[min(88dvh,820px)] flex-col bg-[#1c1c1e] text-white',
    'max-[900px]:w-full max-[900px]:max-h-[42dvh]',
  ),
  viewerCommentsHead: 'flex items-start justify-between gap-3 border-b border-[rgb(255_255_255/0.08)] px-4 pt-[18px] pb-[14px]',
  viewerCommentsTitle: 'm-0 text-[17px] font-semibold tracking-[-0.01em]',
  viewerCommentsLede: 'mt-1 mb-0 text-[13px] text-[rgb(255_255_255/0.55)]',
  viewerCommentsList: 'flex-1 overflow-y-auto px-4 py-3 [scrollbar-width:thin]',
  viewerComment: 'flex gap-2.5 border-b border-[rgb(255_255_255/0.06)] py-3 last:border-b-0',
  viewerCommentBody: 'min-w-0',
  viewerCommentMeta:
    'mb-1 flex items-baseline gap-2 [&_strong]:text-[13px] [&_strong]:font-semibold [&_span]:text-[12px] [&_span]:text-[rgb(255_255_255/0.45)]',
  viewerCommentText: 'm-0 text-[14px] leading-[1.4] text-[rgb(255_255_255/0.9)]',
  viewerCommentLikes: 'mt-1.5 inline-block text-[12px] text-[rgb(255_255_255/0.45)]',
  viewerComposer: 'flex items-center gap-2.5 border-t border-[rgb(255_255_255/0.08)] px-4 pt-3 pb-4',
  viewerComposerInput: cn(
    'h-10 min-w-0 flex-1 rounded-[10px] border border-[rgb(255_255_255/0.12)] bg-[rgb(255_255_255/0.06)] px-3 text-[14px] text-white [font:inherit]',
    'placeholder:text-[rgb(255_255_255/0.4)]',
    'focus:border-border-focus focus:outline-none',
  ),
  viewerComposerBtn: cn(
    'h-10 flex-none cursor-pointer rounded-[10px] border-0 bg-brand-primary px-3.5 text-[14px] font-semibold text-text-on-brand [font:inherit]',
    'disabled:cursor-default disabled:opacity-40',
  ),
  uiHidden: `pointer-events-none opacity-0 transition-[opacity,transform] duration-[280ms] ${REEL_EASE}`,
} as const

type BurstFx = {
  id: number
  kind: 'like' | 'save'
  x: number
  y: number
}

function ReelBurstFx({ burst }: { burst: BurstFx }) {
  return (
    <span
      className={cn(reelClass.fx, burst.kind === 'like' ? 'text-[#ff3b30]' : 'text-brand-primary')}
      style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
      aria-hidden="true"
    >
      <span className={reelClass.fxRing} />
      <span className={reelClass.fxRingLate} />
      <span className={reelClass.fxMain}>
        {burst.kind === 'like' ? (
          <Heart size={92} strokeWidth={0} fill="currentColor" />
        ) : (
          <Bookmark size={86} strokeWidth={0} fill="currentColor" />
        )}
      </span>
      {REEL_SPARKS.map((spark, index) => (
        <span key={index} className={reelClass.fxSpark} style={reelSparkStyle(spark)}>
          {burst.kind === 'like' ? (
            <Heart size={index % 2 === 0 ? 18 : 14} strokeWidth={0} fill="currentColor" />
          ) : (
            <Bookmark size={index % 2 === 0 ? 16 : 12} strokeWidth={0} fill="currentColor" />
          )}
        </span>
      ))}
    </span>
  )
}

const DOUBLE_TAP_MS = 280
const FX_BURST_MS = 1200
const UI_MOTION_MS = 420

type PlaybackSnapshot = {
  reelId: string
  time: number
  paused: boolean
}

function useAnimatedOpen(duration = UI_MOTION_MS) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const timerRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  const show = useCallback(() => {
    clearTimers()
    setMounted(true)
    // Two frames so the closed styles paint before opening — avoids a snap.
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = window.requestAnimationFrame(() => {
        setOpen(true)
        frameRef.current = null
      })
    })
  }, [clearTimers])

  const hide = useCallback(() => {
    clearTimers()
    setOpen(false)
    timerRef.current = window.setTimeout(() => {
      setMounted(false)
      timerRef.current = null
    }, duration)
  }, [clearTimers, duration])

  const toggle = useCallback(() => {
    if (open) hide()
    else show()
  }, [hide, open, show])

  useEffect(() => () => clearTimers(), [clearTimers])

  return { mounted, open, show, hide, toggle }
}

const STAGE_W = 1240
const STAGE_H = 700
const HERO_SLOT = 3
const SHIFT_MS = 430
const SETTLE_MS = 760
const AUTOPLAY_MS = 6600
const SWIPE_PX = 40
const WHEEL_STEP_PX = 40
const WHEEL_LOCK_MS = SETTLE_MS + 120

const SLOTS = [
  { x: 0, y: 195, w: 148, h: 410, radius: 16, rotate: -6, z: 4, dim: 0.8 },
  { x: 80, y: 140, w: 186, h: 490, radius: 17, rotate: -4.4, z: 5, dim: 0.88 },
  { x: 230, y: 88, w: 230, h: 520, radius: 18, rotate: -2.4, z: 7, dim: 0.94 },
  { x: 410, y: 8, w: 420, h: 680, radius: 22, rotate: 0, z: 12, dim: 1 },
  { x: 780, y: 88, w: 230, h: 520, radius: 18, rotate: 2.4, z: 7, dim: 0.94 },
  { x: 974, y: 140, w: 186, h: 490, radius: 17, rotate: 4.4, z: 5, dim: 0.88 },
  { x: 1092, y: 195, w: 148, h: 410, radius: 16, rotate: 6, z: 4, dim: 0.8 },
] as const

function formatCount(value: number) {
  if (value < 1000) return String(value)
  return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`
}

function isEditableTarget(node: EventTarget | null) {
  if (!(node instanceof HTMLElement)) return false
  if (node.isContentEditable) return true
  const tag = node.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

function nothingInteractiveFocused() {
  const active = document.activeElement
  if (!active || active === document.body || active === document.documentElement) return true
  if (isEditableTarget(active)) return false
  const tag = active.tagName
  if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    return false
  }
  const role = active.getAttribute('role')
  if (
    role === 'button' ||
    role === 'link' ||
    role === 'menuitem' ||
    role === 'menuitemcheckbox' ||
    role === 'menuitemradio' ||
    role === 'textbox' ||
    role === 'slider' ||
    role === 'combobox'
  ) {
    return false
  }
  return true
}

function isPlaybackToggleKey(event: KeyboardEvent) {
  return event.key === ' ' || event.key === 'Enter' || event.code === 'Space'
}

function orderWithHero(count: number, hero: number) {
  return Array.from({ length: count }, (_, slot) => (hero - HERO_SLOT + slot + count) % count)
}

function rotateOrder(order: number[], direction: 1 | -1) {
  if (direction > 0) return [...order.slice(1), order[0]]
  return [order[order.length - 1], ...order.slice(0, -1)]
}

type DemoComment = {
  id: string
  handle: string
  avatar: string
  text: string
  likes: number
  time: string
}

function demoCommentsFor(reel: Reel): DemoComment[] {
  return [
    {
      id: `${reel.id}-c1`,
      handle: '@nova.lens',
      avatar: reel.avatar,
      text: 'This shot is unreal. The lighting is perfect.',
      likes: 128,
      time: '2h',
    },
    {
      id: `${reel.id}-c2`,
      handle: '@pixel.trail',
      avatar: reel.avatar,
      text: 'Saving this for weekend inspiration.',
      likes: 64,
      time: '5h',
    },
    {
      id: `${reel.id}-c3`,
      handle: '@soft.focus',
      avatar: reel.avatar,
      text: `Love the vibe on ${reel.tags.split(' ')[0] ?? '#reels'}.`,
      likes: 41,
      time: '1d',
    },
    {
      id: `${reel.id}-c4`,
      handle: '@frame.finder',
      avatar: reel.avatar,
      text: 'Audio choice is so good with this scene.',
      likes: 27,
      time: '1d',
    },
  ]
}

function ReelViewer({
  reel,
  liked,
  saved,
  muted,
  volume,
  quality,
  uiHidden,
  reduced,
  startTime,
  startPaused,
  onClose,
  onLike,
  onForceLike,
  onSave,
  onShare,
  onToggleMute,
  onVolumeChange,
  onCopyLink,
  onDownload,
  onToggleUi,
  onDontRecommend,
  onHideCreator,
  onReport,
  onSelectQuality,
}: {
  reel: Reel
  liked: boolean
  saved: boolean
  muted: boolean
  volume: number
  quality: ReelQuality
  uiHidden: boolean
  reduced: boolean
  startTime: number
  startPaused: boolean
  onClose: (playback: PlaybackSnapshot) => void
  onLike: () => void
  onForceLike: () => void
  onSave: () => void
  onShare: () => void
  onToggleMute: () => void
  onVolumeChange: (value: number) => void
  onCopyLink: () => void
  onDownload: () => void
  onToggleUi: () => void
  onDontRecommend: () => void
  onHideCreator: () => void
  onReport: () => void
  onSelectQuality: (value: ReelQuality) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const moreBtnRef = useRef<HTMLButtonElement>(null)
  const hitRef = useRef<HTMLButtonElement>(null)
  const tapTimerRef = useRef<number | null>(null)
  const lastTapRef = useRef(0)
  const heartIdRef = useRef(0)
  const bootRef = useRef({ reelId: reel.id, time: startTime, paused: startPaused })
  const [paused, setPaused] = useState(startPaused)
  const [videoFailed, setVideoFailed] = useState(false)
  const [draft, setDraft] = useState('')
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comments, setComments] = useState(() => demoCommentsFor(reel))
  const [menuPanel, setMenuPanel] = useState<MenuPanel>('main')
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const [showPauseIcon, setShowPauseIcon] = useState(false)
  const [playChromeHidden, setPlayChromeHidden] = useState(false)
  const [bursts, setBursts] = useState<BurstFx[]>([])
  const [likePop, setLikePop] = useState(false)
  const [savePop, setSavePop] = useState(false)
  const {
    mounted: menuMounted,
    open: menuOpen,
    show: showMenu,
    hide: hideMenu,
  } = useAnimatedOpen()
  const { open: viewerOpen, show: showViewer, hide: hideViewer } = useAnimatedOpen()
  const silent = muted || volume <= 0
  const hasVideo = Boolean(reel.video) && !videoFailed && !reduced
  const playing = hasVideo && !paused
  const VolumeIcon = silent ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const qualityLabel = QUALITY_OPTIONS.find((option) => option.id === quality)?.label ?? 'Auto'

  const snapshotPlayback = useCallback((): PlaybackSnapshot => {
    const video = videoRef.current
    return {
      reelId: reel.id,
      time: video && Number.isFinite(video.currentTime) ? video.currentTime : bootRef.current.time,
      paused,
    }
  }, [paused, reel.id])

  const spawnBurst = useCallback((kind: 'like' | 'save', x?: number, y?: number) => {
    const id = ++heartIdRef.current
    const burst: BurstFx = {
      id,
      kind,
      x: x ?? 50,
      y: y ?? 46,
    }
    setBursts((current) => [...current, burst])
    if (kind === 'like') {
      setLikePop(true)
      window.setTimeout(() => setLikePop(false), 520)
    } else {
      setSavePop(true)
      window.setTimeout(() => setSavePop(false), 520)
    }
    window.setTimeout(() => {
      setBursts((current) => current.filter((item) => item.id !== id))
    }, FX_BURST_MS)
  }, [])

  useEffect(() => {
    showViewer()
  }, [showViewer])

  useEffect(() => {
    bootRef.current = { reelId: reel.id, time: startTime, paused: startPaused }
    setComments(demoCommentsFor(reel))
    setDraft('')
    setPaused(startPaused)
    setVideoFailed(false)
    setCommentsOpen(false)
    setBursts([])
    setShowPauseIcon(false)
    setPlayChromeHidden(false)
    hideMenu()
    setMenuPanel('main')
    if (uiHidden) return
    const openComments = window.setTimeout(() => setCommentsOpen(true), 120)
    return () => window.clearTimeout(openComments)
  }, [hideMenu, reel, startPaused, startTime, uiHidden])

  useEffect(() => {
    if (uiHidden) setCommentsOpen(false)
  }, [uiHidden])

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!hasVideo || reduced) {
      setShowPauseIcon(false)
      setPlayChromeHidden(false)
      return
    }

    if (!playing) {
      setShowPauseIcon(false)
      setPlayChromeHidden(false)
      return
    }

    setShowPauseIcon(false)
    setPlayChromeHidden(false)
    const toPause = window.setTimeout(() => setShowPauseIcon(true), 160)
    const hide = window.setTimeout(() => setPlayChromeHidden(true), 900)
    return () => {
      window.clearTimeout(toPause)
      window.clearTimeout(hide)
    }
  }, [hasVideo, playing, reduced])

  const pointFromEvent = (event: { clientX: number; clientY: number }) => {
    const node = hitRef.current
    if (!node) return { x: 50, y: 46 }
    const rect = node.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }
  }

  const handleHitClick = (event: MouseEvent<HTMLButtonElement>) => {
    const now = performance.now()
    const point = pointFromEvent(event)

    if (playing && now - lastTapRef.current < DOUBLE_TAP_MS) {
      if (tapTimerRef.current) {
        window.clearTimeout(tapTimerRef.current)
        tapTimerRef.current = null
      }
      lastTapRef.current = 0
      onForceLike()
      spawnBurst('like', point.x, point.y)
      return
    }

    lastTapRef.current = now

    if (playing) {
      if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current)
      tapTimerRef.current = window.setTimeout(() => {
        tapTimerRef.current = null
        setPaused(true)
      }, DOUBLE_TAP_MS)
      return
    }

    setPaused(false)
  }

  const handleRailLike = () => {
    if (!liked) spawnBurst('like', 50, 46)
    onLike()
  }

  const handleRailSave = () => {
    if (!saved) spawnBurst('save', 50, 46)
    onSave()
  }

  const requestClose = useCallback(() => {
    const video = videoRef.current
    if (video) video.pause()
    const playback = snapshotPlayback()
    hideMenu()
    hideViewer()
    window.setTimeout(() => onClose(playback), UI_MOTION_MS)
  }, [hideMenu, hideViewer, onClose, snapshotPlayback])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    }
    const scrollbarGap = Math.max(0, window.innerWidth - html.clientWidth)

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`
    }
    html.classList.add('reel-viewer-open')

    const blockBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        event.preventDefault()
        return
      }
      if (target.closest('[data-reel-scroll]')) {
        return
      }
      event.preventDefault()
    }

    window.addEventListener('wheel', blockBackgroundScroll, { passive: false })
    window.addEventListener('touchmove', blockBackgroundScroll, { passive: false })

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.width = previous.bodyWidth
      body.style.paddingRight = previous.bodyPaddingRight
      html.classList.remove('reel-viewer-open')
      window.removeEventListener('wheel', blockBackgroundScroll)
      window.removeEventListener('touchmove', blockBackgroundScroll)
      window.scrollTo(0, scrollY)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (menuOpen) {
          hideMenu()
          setMenuPanel('main')
        return
      }
        requestClose()
        return
      }

      if (menuOpen) return
      if (!isPlaybackToggleKey(event)) return
      if (isEditableTarget(event.target) || !nothingInteractiveFocused()) return

      event.preventDefault()
      setPaused((value) => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hideMenu, menuOpen, requestClose])

  useEffect(() => {
    if (!menuOpen) return
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('[data-reel-more], [data-reel-more-menu]')) return
      hideMenu()
      setMenuPanel('main')
    }
    window.addEventListener('pointerdown', onPointer)
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [hideMenu, menuOpen])

  useLayoutEffect(() => {
    if (!menuMounted) return
    const place = () => {
      const node = moreBtnRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 8,
        right: Math.max(12, window.innerWidth - rect.right),
      })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [menuMounted, menuPanel])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasVideo) return

    const boot = bootRef.current
    const applyBootTime = () => {
      if (!Number.isFinite(boot.time) || boot.time <= 0) return
      if (Math.abs(video.currentTime - boot.time) > 0.05) {
        try {
          video.currentTime = boot.time
        } catch {
          // Ignore seek errors before media is ready.
        }
      }
    }

    applyBootTime()
    video.addEventListener('loadedmetadata', applyBootTime)
    video.muted = silent
    video.volume = Math.max(0, Math.min(1, volume))
      video.playsInline = true
    if (paused) {
      video.pause()
      return () => {
        video.removeEventListener('loadedmetadata', applyBootTime)
        video.pause()
      }
    }
      void video.play().catch(() => undefined)
    return () => {
      video.removeEventListener('loadedmetadata', applyBootTime)
      video.pause()
    }
  }, [hasVideo, paused, reel.id, silent, volume])

  const postComment = () => {
    const text = draft.trim()
    if (!text) return
    setComments((current) => [
      {
        id: `${reel.id}-${Date.now()}`,
        handle: '@you',
        avatar: reel.avatar,
        text,
        likes: 0,
        time: 'now',
      },
      ...current,
    ])
    setDraft('')
  }

  const closeMenu = () => {
    hideMenu()
    setMenuPanel('main')
  }

  const menuPortal = menuMounted
    ? createPortal(
        <div
          className={cn(
            reelClass.moreMenu,
            menuOpen
              ? 'pointer-events-auto opacity-100 [transform:translate3d(0,0,0)] motion-reduce:opacity-100'
              : 'pointer-events-none opacity-0 [transform:translate3d(0,-10px,0)]',
          )}
          data-reel-more-menu=""
          data-reel-scroll=""
          role="menu"
          aria-label="Reel options"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          {menuPanel === 'quality' ? (
            <>
              <button type="button" className={reelMoreBtn({ back: true })} onClick={() => setMenuPanel('main')}>
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                <span>Quality</span>
      </button>
              <div className={reelClass.moreSep} role="separator" />
              {QUALITY_OPTIONS.map((option) => {
                const active = option.id === quality
          return (
                  <button
                    key={option.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    className={reelMoreBtn({ active })}
                    onClick={() => {
                      onSelectQuality(option.id)
                      setMenuPanel('main')
                    }}
                  >
                    <span className={reelClass.moreCheck} data-reel-meta="" aria-hidden="true">
                      {active ? <Check size={15} strokeWidth={2.2} /> : null}
                    </span>
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </>
          ) : (
            <>
              <div className={reelClass.moreGroup} role="group" aria-label="Share">
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    closeMenu()
                    onShare()
                  }}
                >
                  <Share size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    closeMenu()
                    onCopyLink()
                  }}
                >
                  <Link2 size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Copy Link</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    closeMenu()
                    onDownload()
                  }}
                >
                  <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    if (!saved) spawnBurst('save', 50, 46)
                    onSave()
                  }}
                >
                  <Bookmark
                    size={16}
                    strokeWidth={saved ? 0 : 1.75}
                    fill={saved ? 'currentColor' : 'none'}
                    aria-hidden="true"
                  />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Playback">
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={() => setMenuPanel('quality')}>
                  <Settings2 size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Quality</span>
                  <span className={reelClass.moreMeta} data-reel-meta="">
                    {qualityLabel}
                    <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitemcheckbox"
                  className={reelMoreBtn()}
                  aria-checked={uiHidden}
                  onClick={() => {
                    onToggleUi()
                    closeMenu()
                  }}
                >
                  {uiHidden ? (
                    <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <EyeOff size={16} strokeWidth={1.75} aria-hidden="true" />
                  )}
                  <span>{uiHidden ? 'Show UI' : 'Hide UI'}</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Feed">
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    closeMenu()
                    requestClose()
                    onDontRecommend()
                  }}
                >
                  <ThumbsDown size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Don&apos;t Recommend</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    closeMenu()
                    requestClose()
                    onHideCreator()
                  }}
                >
                  <UserRoundX size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Hide Creator</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Safety">
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn({ danger: true })}
                  onClick={() => {
                    closeMenu()
                    onReport()
                  }}
                >
                  <Flag size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Report</span>
                </button>
              </div>
            </>
          )}
        </div>,
        document.body,
      )
    : null

  return createPortal(
    <div
      className={cn(reelClass.viewer, viewerOpen ? 'opacity-100' : 'opacity-0')}
      role="dialog"
      aria-modal="true"
      aria-label="Reel viewer"
    >
      <button
        type="button"
        className={cn(reelClass.viewerBackdrop, viewerOpen ? 'opacity-100' : 'opacity-0')}
        aria-label="Close reel"
        onClick={requestClose}
      />
      <div
        className={cn(
          reelClass.viewerShell,
          commentsOpen && !uiHidden
            ? 'grid-cols-[auto_1fr] max-[900px]:grid-cols-1 max-[900px]:grid-rows-[auto_1fr] motion-reduce:grid-cols-[auto_1fr]'
            : 'grid-cols-[auto_0fr] max-[900px]:grid-rows-[auto_0fr] motion-reduce:grid-cols-[auto_0fr]',
          uiHidden ? 'max-w-[min(100%,420px)]' : 'max-w-[min(100%,980px)] max-[900px]:max-w-none',
          viewerOpen
            ? 'opacity-100 [transform:translate3d(0,0,0)] motion-reduce:opacity-100'
            : 'opacity-0 [transform:translate3d(0,18px,0)]',
        )}
      >
        <div className={reelClass.viewerPanel}>
          <div
            className={reelClass.viewerMedia}
          >
            <button
              ref={hitRef}
              type="button"
              className={reelClass.viewerHit}
              aria-label={playing ? `Pause ${reel.caption}` : `Play ${reel.caption}`}
              onClick={handleHitClick}
              onDoubleClick={(event) => event.preventDefault()}
            >
              <img className={reelClass.poster} src={reel.image} alt="" draggable={false} />
              {hasVideo ? (
                <video
                  ref={videoRef}
                  className={cn(
                    reelClass.video,
                    `transition-opacity duration-[280ms] ${REEL_EASE}`,
                    playing ? 'opacity-100' : 'opacity-0',
                  )}
                  muted={silent}
                  playsInline
                  loop
                  preload="auto"
                  onError={() => setVideoFailed(true)}
                >
                  <source src={reel.video} type="video/mp4" />
                </video>
              ) : null}
              <span className={reelClass.shade} aria-hidden="true" />
              {bursts.map((burst) => (
                <ReelBurstFx key={burst.id} burst={burst} />
              ))}
              <span
                className={cn(
                  reelClass.play,
                  'z-[2]',
                  playChromeHidden ? reelClass.playHidden : cn(reelClass.playShown, reelClass.playHover),
                )}
                aria-hidden="true"
              >
                <span className={reelClass.playIcons}>
                  <Play className={showPauseIcon ? reelClass.playIcon : reelClass.playIconOn} size={22} fill="currentColor" strokeWidth={0} />
                  <Pause className={showPauseIcon ? reelClass.playIconOn : reelClass.playIcon} size={22} fill="currentColor" strokeWidth={0} />
                </span>
              </span>
            </button>

            <div className={cn(reelClass.volume, uiHidden && reelClass.uiHidden)} data-reel-volume="">
              <button
                type="button"
                className={reelClass.volumeToggle}
                aria-label={silent ? 'Unmute' : 'Mute'}
                aria-pressed={!silent}
                onClick={onToggleMute}
              >
                <VolumeIcon size={16} strokeWidth={1.8} />
              </button>
              <label className={reelClass.volumeSlider}>
                <input
                  type="range"
                  className={reelClass.volumeRange}
                  min={0}
                  max={1}
                  step={0.01}
                  value={silent ? 0 : volume}
                  aria-label="Volume"
                  onChange={(event) => onVolumeChange(Number(event.target.value))}
                />
              </label>
              </div>

            <div className={reelClass.actions} data-reel-actions="">
              <button type="button" className={reelClass.action} aria-label="Close" onClick={requestClose}>
                <X size={16} strokeWidth={1.9} />
              </button>
              <div className={reelClass.more} data-reel-more="">
                <button
                  ref={moreBtnRef}
                  type="button"
                  className={reelClass.action}
                  aria-label="More options"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    if (menuOpen) {
                      hideMenu()
                      setMenuPanel('main')
                    } else {
                      showMenu()
                    }
                  }}
                >
                  <MoreHorizontal size={16} strokeWidth={1.9} />
                </button>
                {menuPortal}
              </div>
            </div>

            <div className={cn(reelClass.rail, uiHidden && reelClass.uiHidden)}>
              <button
                type="button"
                className={reelClass.railBtn}
                data-reel-rail-btn=""
                aria-label={liked ? 'Unlike' : 'Like'}
                aria-pressed={liked}
                onClick={handleRailLike}
              >
                <span className={reelRailIcon({ popping: likePop, liked })} aria-hidden="true">
                  <Heart size={26} strokeWidth={liked ? 0 : 1.9} fill={liked ? 'currentColor' : 'none'} />
                </span>
                <span>{formatCount(reel.likes + (liked ? 1 : 0))}</span>
              </button>
              <button
                type="button"
                className={reelClass.railBtn}
                data-reel-rail-btn=""
                aria-label={commentsOpen ? 'Hide comments' : 'Show comments'}
                aria-pressed={commentsOpen}
                onClick={() => setCommentsOpen((open) => !open)}
              >
                <span className={reelRailIcon({ commentsOpen, tintOnActive: true })} aria-hidden="true">
                  <MessageCircle size={26} strokeWidth={1.9} />
                </span>
                <span>{formatCount(reel.comments + comments.length)}</span>
              </button>
              <button
                type="button"
                className={reelClass.railBtn}
                data-reel-rail-btn=""
                aria-label="Share reel"
                onClick={onShare}
              >
                <span className={reelRailIcon({ tintOnActive: true })} aria-hidden="true">
                  <Send size={24} strokeWidth={1.9} />
                </span>
                <span>{formatCount(reel.shares)}</span>
              </button>
              <button
                type="button"
                className={reelClass.railBtn}
                data-reel-rail-btn=""
                aria-label={saved ? 'Remove save' : 'Save'}
                aria-pressed={saved}
                onClick={handleRailSave}
              >
                <span className={reelRailIcon({ popping: savePop, saved, tintOnActive: true })} aria-hidden="true">
                  <Bookmark size={25} strokeWidth={saved ? 0 : 1.9} fill={saved ? 'currentColor' : 'none'} />
                </span>
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            <div className={cn(reelClass.caption, uiHidden && reelClass.uiHidden)}>
              <div className={reelClass.handle}>
                <img className={reelClass.avatar} src={reel.avatar} alt="" />
                <span>{reel.handle}</span>
                <svg className={reelClass.verified} width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path
                    d="M8 12.5l2.6 2.6L16 9.5"
                    fill="none"
                    stroke="var(--text-on-brand)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={reelClass.line}>{reel.caption}</p>
              <p className={reelClass.tags}>{reel.tags}</p>
              <p className={reelClass.audio}>
                <Music size={11} strokeWidth={2} />
                {reel.audio}
              </p>
            </div>
          </div>
        </div>

        <aside
          className={cn(
            reelClass.viewerComments,
            commentsOpen && !uiHidden
              ? 'pointer-events-auto border-l-[rgb(255_255_255/0.08)] opacity-100 max-[900px]:border-t-[rgb(255_255_255/0.08)] motion-reduce:opacity-100'
              : 'pointer-events-none opacity-0 max-[900px]:border-t-transparent',
          )}
          aria-label="Comments"
          aria-hidden={!commentsOpen}
        >
          <div className={reelClass.viewerCommentsClip}>
            <div className={reelClass.viewerCommentsBody} data-reel-scroll="">
              <div className={reelClass.viewerCommentsHead}>
                <div>
                  <h3 className={reelClass.viewerCommentsTitle}>Comments</h3>
                  <p className={reelClass.viewerCommentsLede}>{formatCount(reel.comments + comments.length)} comments</p>
                </div>
              </div>

              <div className={reelClass.viewerCommentsList} data-reel-scroll="">
                {comments.map((comment) => (
                  <article key={comment.id} className={reelClass.viewerComment}>
                    <img className={reelClass.avatar} src={comment.avatar} alt="" />
                    <div className={reelClass.viewerCommentBody}>
                      <div className={reelClass.viewerCommentMeta}>
                        <strong>{comment.handle}</strong>
                        <span>{comment.time}</span>
                      </div>
                      <p className={reelClass.viewerCommentText}>{comment.text}</p>
                      <span className={reelClass.viewerCommentLikes}>{formatCount(comment.likes)} likes</span>
                    </div>
                  </article>
                ))}
              </div>

              <form
                className={reelClass.viewerComposer}
                onSubmit={(event) => {
                  event.preventDefault()
                  postComment()
                }}
              >
                <img className={reelClass.avatar} src={reel.avatar} alt="" />
                <input
                  type="text"
                  className={reelClass.viewerComposerInput}
                  value={draft}
                  placeholder="Add a comment..."
                  aria-label="Add a comment"
                  onChange={(event) => setDraft(event.target.value)}
                />
                <button type="submit" className={reelClass.viewerComposerBtn} disabled={!draft.trim()}>
                  Post
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>,
    document.body,
  )
}

function ReelCard({
  reel,
  slot,
  hero,
  reduced,
  liked,
  saved,
  muted,
  volume,
  quality,
  uiHidden,
  menuOpen,
  menuPanel,
  paused,
  delay,
  isClickSuppressed,
  onSelect,
  onLike,
  onForceLike,
  onShare,
  onToggleMute,
  onVolumeChange,
  onFullscreen,
  onOpenComments,
  onToggleMenu,
  onCopyLink,
  onDownload,
  onSave,
  onToggleUi,
  onDontRecommend,
  onHideCreator,
  onReport,
  onOpenQuality,
  onBackMenu,
  onSelectQuality,
  bindHeroVideo,
}: {
  reel: Reel
  slot: number
  hero: boolean
  reduced: boolean
  liked: boolean
  saved: boolean
  muted: boolean
  volume: number
  quality: ReelQuality
  uiHidden: boolean
  menuOpen: boolean
  menuPanel: MenuPanel
  paused: boolean
  delay: number
  isClickSuppressed: () => boolean
  onSelect: () => void
  onLike: () => void
  onForceLike: () => void
  onShare: () => void
  onToggleMute: () => void
  onVolumeChange: (value: number) => void
  onFullscreen: () => void
  onOpenComments: () => void
  onToggleMenu: () => void
  onCopyLink: () => void
  onDownload: () => void
  onSave: () => void
  onToggleUi: () => void
  onDontRecommend: () => void
  onHideCreator: () => void
  onReport: () => void
  onOpenQuality: () => void
  onBackMenu: () => void
  onSelectQuality: (value: ReelQuality) => void
  bindHeroVideo?: (node: HTMLVideoElement | null) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const moreBtnRef = useRef<HTMLButtonElement>(null)
  const hitRef = useRef<HTMLButtonElement>(null)
  const tapTimerRef = useRef<number | null>(null)
  const lastTapRef = useRef(0)
  const heartIdRef = useRef(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const [showPauseIcon, setShowPauseIcon] = useState(false)
  const [playChromeHidden, setPlayChromeHidden] = useState(false)
  const [bursts, setBursts] = useState<BurstFx[]>([])
  const [likePop, setLikePop] = useState(false)
  const [savePop, setSavePop] = useState(false)
  const {
    mounted: menuMounted,
    open: menuShown,
    show: showMenuAnim,
    hide: hideMenuAnim,
  } = useAnimatedOpen()
  const layout = SLOTS[slot] ?? SLOTS[HERO_SLOT]
  const hasVideo = Boolean(reel.video) && !videoFailed
  const playing = hero && hasVideo && !reduced && !paused
  const silent = muted || volume <= 0
  const qualityLabel = QUALITY_OPTIONS.find((option) => option.id === quality)?.label ?? 'Auto'

  const spawnBurst = useCallback((kind: 'like' | 'save', x?: number, y?: number) => {
    const id = ++heartIdRef.current
    const burst: BurstFx = {
      id,
      kind,
      x: x ?? 50,
      y: y ?? 46,
    }
    setBursts((current) => [...current, burst])
    if (kind === 'like') {
      setLikePop(true)
      window.setTimeout(() => setLikePop(false), 520)
    } else {
      setSavePop(true)
      window.setTimeout(() => setSavePop(false), 520)
    }
    window.setTimeout(() => {
      setBursts((current) => current.filter((item) => item.id !== id))
    }, FX_BURST_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!hasVideo || !video) return
    if (!hero || reduced) {
      video.pause()
      if (!hero) video.currentTime = 0
      return
    }
    video.muted = silent
    video.volume = Math.max(0, Math.min(1, volume))
    video.playsInline = true
    if (paused) {
      video.pause()
      return
    }
    void video.play().catch(() => {
      // Ignore autoplay/abort failures — keep the video element available.
    })
  }, [hasVideo, hero, paused, reduced, silent, volume])

  useEffect(() => {
    if (!hero || !hasVideo || reduced) {
      setShowPauseIcon(false)
      setPlayChromeHidden(false)
      return
    }

    if (!playing) {
      setShowPauseIcon(false)
      setPlayChromeHidden(false)
      return
    }

    setShowPauseIcon(false)
    setPlayChromeHidden(false)
    const toPause = window.setTimeout(() => setShowPauseIcon(true), 160)
    const hide = window.setTimeout(() => setPlayChromeHidden(true), 900)
    return () => {
      window.clearTimeout(toPause)
      window.clearTimeout(hide)
    }
  }, [hasVideo, hero, playing, reduced])

  useEffect(() => {
    if (menuOpen) showMenuAnim()
    else hideMenuAnim()
  }, [hideMenuAnim, menuOpen, showMenuAnim])

  useLayoutEffect(() => {
    if (!menuMounted) return
    const place = () => {
      const node = moreBtnRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 8,
        right: Math.max(12, window.innerWidth - rect.right),
      })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [menuMounted, menuPanel])

  const VolumeIcon = silent ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  const pointFromEvent = (event: { clientX: number; clientY: number }) => {
    const node = hitRef.current
    if (!node) return { x: 50, y: 46 }
    const rect = node.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }
  }

  const handleHitClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isClickSuppressed()) return
    if (!hero) {
      onSelect()
      return
    }

    const now = performance.now()
    const point = pointFromEvent(event)

    if (playing && now - lastTapRef.current < DOUBLE_TAP_MS) {
      if (tapTimerRef.current) {
        window.clearTimeout(tapTimerRef.current)
        tapTimerRef.current = null
      }
      lastTapRef.current = 0
      onForceLike()
      spawnBurst('like', point.x, point.y)
      return
    }

    lastTapRef.current = now

    if (playing) {
      if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current)
      tapTimerRef.current = window.setTimeout(() => {
        tapTimerRef.current = null
        if (!isClickSuppressed()) onSelect()
      }, DOUBLE_TAP_MS)
      return
    }

    onSelect()
  }

  const handleRailLike = () => {
    if (!liked) spawnBurst('like', 50, 46)
    onLike()
  }

  const handleRailSave = () => {
    if (!saved) spawnBurst('save', 50, 46)
    onSave()
  }

  const menu = menuMounted
    ? createPortal(
        <div
          className={cn(
            reelClass.moreMenu,
            menuShown
              ? 'pointer-events-auto opacity-100 [transform:translate3d(0,0,0)] motion-reduce:opacity-100'
              : 'pointer-events-none opacity-0 [transform:translate3d(0,-10px,0)]',
          )}
          data-reel-more-menu=""
          data-reel-scroll=""
          role="menu"
          aria-label="Reel options"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          {menuPanel === 'quality' ? (
            <>
              <button type="button" className={reelMoreBtn({ back: true })} onClick={onBackMenu}>
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                <span>Quality</span>
              </button>
              <div className={reelClass.moreSep} role="separator" />
              {QUALITY_OPTIONS.map((option) => {
                const active = option.id === quality
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    className={reelMoreBtn({ active })}
                    onClick={() => onSelectQuality(option.id)}
                  >
                    <span className={reelClass.moreCheck} data-reel-meta="" aria-hidden="true">
                      {active ? <Check size={15} strokeWidth={2.2} /> : null}
                    </span>
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </>
          ) : (
            <>
              <div className={reelClass.moreGroup} role="group" aria-label="Share">
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onShare}>
                  <Share size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Share</span>
                </button>
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onCopyLink}>
                  <Link2 size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Copy Link</span>
                </button>
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onDownload}>
                  <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={reelMoreBtn()}
                  onClick={() => {
                    if (!saved) spawnBurst('save', 50, 46)
                    onSave()
                  }}
                >
                  <Bookmark
                    size={16}
                    strokeWidth={saved ? 0 : 1.75}
                    fill={saved ? 'currentColor' : 'none'}
                    aria-hidden="true"
                  />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Playback">
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onOpenQuality}>
                  <Settings2 size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Quality</span>
                  <span className={reelClass.moreMeta} data-reel-meta="">
                    {qualityLabel}
                    <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitemcheckbox"
                  className={reelMoreBtn()}
                  aria-checked={uiHidden}
                  onClick={onToggleUi}
                >
                  {uiHidden ? (
                    <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <EyeOff size={16} strokeWidth={1.75} aria-hidden="true" />
                  )}
                  <span>{uiHidden ? 'Show UI' : 'Hide UI'}</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Feed">
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onDontRecommend}>
                  <ThumbsDown size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Don&apos;t Recommend</span>
                </button>
                <button type="button" role="menuitem" className={reelMoreBtn()} onClick={onHideCreator}>
                  <UserRoundX size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Hide Creator</span>
                </button>
              </div>
              <div className={reelClass.moreSep} role="separator" />
              <div className={reelClass.moreGroup} role="group" aria-label="Safety">
                <button type="button" role="menuitem" className={reelMoreBtn({ danger: true })} onClick={onReport}>
                  <Flag size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Report</span>
                </button>
              </div>
            </>
          )}
        </div>,
        document.body,
      )
    : null

  return (
    <article
      className={reelClass.card}
      style={{
        left: layout.x,
        top: layout.y,
        width: layout.w,
        height: layout.h,
        zIndex: menuOpen ? 40 : layout.z,
        borderRadius: layout.radius,
        transform: `rotate(${reduced ? 0 : layout.rotate}deg)`,
        filter: `brightness(${layout.dim}) saturate(${hero ? 1.03 : 0.96})`,
      }}
    >
      <div className={reelClass.clip} style={{ animationDelay: `${delay}s` }}>
      <button
        ref={hitRef}
        type="button"
        className={reelClass.hit}
        aria-label={
          hero
            ? playing
              ? `Pause ${reel.caption}`
              : `Play ${reel.caption}`
            : `Show ${reel.caption}`
        }
        onClick={handleHitClick}
        onDoubleClick={(event) => event.preventDefault()}
      >
        <img className={reelClass.poster} src={reel.image} alt="" draggable={false} />
        {hasVideo && !reduced ? (
          <video
            ref={(node) => {
              videoRef.current = node
              if (hero) bindHeroVideo?.(node)
            }}
            className={cn(
                    reelClass.video,
                    `transition-opacity duration-200 ${REEL_EASE}`,
                    playing ? 'opacity-100' : 'opacity-0',
                  )}
            muted={silent}
            playsInline
            loop
            preload={hero ? 'auto' : 'metadata'}
            onError={() => setVideoFailed(true)}
          >
            <source src={reel.video} type="video/mp4" />
          </video>
        ) : null}
        <span className={hero ? reelClass.shadeHero : reelClass.shade} aria-hidden="true" />
        {bursts.map((burst) => (
          <ReelBurstFx key={burst.id} burst={burst} />
        ))}
        <span
          className={cn(
            reelClass.play,
            hero ? 'z-[4]' : 'z-[2]',
            playChromeHidden ? reelClass.playHidden : cn(reelClass.playShown, reelClass.playHover),
          )}
          aria-hidden="true"
        >
          <span className={reelClass.playIcons}>
            <Play className={showPauseIcon ? reelClass.playIcon : reelClass.playIconOn} size={22} fill="currentColor" strokeWidth={0} />
            <Pause className={showPauseIcon ? reelClass.playIconOn : reelClass.playIcon} size={22} fill="currentColor" strokeWidth={0} />
          </span>
        </span>
        <span className={cn(reelClass.views, hero && 'opacity-0', uiHidden && reelClass.uiHidden)}>
          <Play size={8} fill="currentColor" strokeWidth={0} />
          {formatCount(reel.views)}
        </span>
      </button>

      <div className={cn(hero ? reelClass.heroOn : cn(reelClass.hero, '[&_*]:pointer-events-none'))} aria-hidden={!hero}>
        {hero ? (
          <div className={cn(reelClass.volume, uiHidden && reelClass.uiHidden)} data-reel-volume="">
            <button
              type="button"
              className={reelClass.volumeToggle}
              aria-label={silent ? 'Unmute' : 'Mute'}
              aria-pressed={!silent}
              onClick={onToggleMute}
            >
              <VolumeIcon size={16} strokeWidth={1.8} />
            </button>
            <label className={reelClass.volumeSlider}>
              <input
                type="range"
                className={reelClass.volumeRange}
                min={0}
                max={1}
                step={0.01}
                value={silent ? 0 : volume}
                aria-label="Volume"
                onChange={(event) => onVolumeChange(Number(event.target.value))}
              />
            </label>
          </div>
        ) : null}
        {hero ? (
          <div className={reelClass.actions} data-reel-actions="">
            <button
              type="button"
              className={reelClass.action}
              aria-label="Watch fullscreen"
              onClick={onFullscreen}
            >
              <Maximize2 size={15} strokeWidth={1.9} />
            </button>
            <div className={reelClass.more} data-reel-more="">
              <button
                ref={moreBtnRef}
                type="button"
                className={reelClass.action}
                aria-label="More options"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={onToggleMenu}
              >
                <MoreHorizontal size={16} strokeWidth={1.9} />
              </button>
              {menu}
            </div>
          </div>
        ) : null}
        {hero ? (
          <>
        <div className={cn(reelClass.rail, uiHidden && reelClass.uiHidden)}>
          <button
            type="button"
            className={reelClass.railBtn}
            data-reel-rail-btn=""
            aria-label={liked ? 'Unlike' : 'Like'}
            aria-pressed={liked}
            onClick={handleRailLike}
          >
            <span className={reelRailIcon({ popping: likePop, liked })} aria-hidden="true">
              <Heart size={26} strokeWidth={liked ? 0 : 1.9} fill={liked ? 'currentColor' : 'none'} />
            </span>
            <span>{formatCount(reel.likes + (liked ? 1 : 0))}</span>
          </button>
          <button
            type="button"
            className={reelClass.railBtn}
            data-reel-rail-btn=""
            aria-label="Open comments"
            onClick={onOpenComments}
          >
            <span className={reelRailIcon({ tintOnActive: true })} aria-hidden="true">
              <MessageCircle size={26} strokeWidth={1.9} />
            </span>
            <span>{formatCount(reel.comments)}</span>
          </button>
          <button
            type="button"
            className={reelClass.railBtn}
            data-reel-rail-btn=""
            aria-label="Share reel"
            onClick={onShare}
          >
            <span className={reelRailIcon({ tintOnActive: true })} aria-hidden="true">
              <Send size={24} strokeWidth={1.9} />
            </span>
            <span>{formatCount(reel.shares)}</span>
          </button>
          <button
            type="button"
            className={reelClass.railBtn}
            data-reel-rail-btn=""
            aria-label={saved ? 'Remove save' : 'Save'}
            aria-pressed={saved}
            onClick={handleRailSave}
          >
            <span className={reelRailIcon({ popping: savePop, saved, tintOnActive: true })} aria-hidden="true">
              <Bookmark size={25} strokeWidth={saved ? 0 : 1.9} fill={saved ? 'currentColor' : 'none'} />
            </span>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
        <div className={cn(reelClass.caption, uiHidden && reelClass.uiHidden)}>
          <div className={reelClass.handle}>
            <img className={reelClass.avatar} src={reel.avatar} alt="" />
            <span>{reel.handle}</span>
            <svg className={reelClass.verified} width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path
                d="M8 12.5l2.6 2.6L16 9.5"
                fill="none"
                stroke="var(--text-on-brand)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={reelClass.line}>{reel.caption}</p>
          <p className={reelClass.tags}>{reel.tags}</p>
          <p className={reelClass.audio}>
            <Music size={11} strokeWidth={2} />
            {reel.audio}
          </p>
        </div>
          </>
        ) : null}
      </div>
      </div>
    </article>
  )
}

export function ReelStrip({ reels }: { reels: Reel[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)
  const lastActRef = useRef(Date.now())
  const wheelLockRef = useRef(0)
  const wheelAccumRef = useRef(0)
  const suppressClickRef = useRef(false)
  const gestureRef = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
  })
  const [order, setOrder] = useState(() => orderWithHero(reels.length, 0))
  const [scale, setScale] = useState(1)
  const [animate, setAnimate] = useState(false)
  const [liked, setLiked] = useState<Set<string>>(() => new Set())
  const [saved, setSaved] = useState<Set<string>>(() => new Set())
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [viewerBoot, setViewerBoot] = useState<PlaybackSnapshot>({ reelId: '', time: 0, paused: false })
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [quality, setQuality] = useState<ReelQuality>('auto')
  const [uiHidden, setUiHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPanel, setMenuPanel] = useState<MenuPanel>('main')
  const [heroPaused, setHeroPaused] = useState(true)
  const [autoRotateLocked, setAutoRotateLocked] = useState(false)
  const menuOpenRef = useRef(false)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const playbackByIdRef = useRef(new Map<string, PlaybackSnapshot>())
  const pendingRestoreRef = useRef<PlaybackSnapshot | null>(null)
  const reduced = usePrefersReducedMotion()
  const count = reels.length
  const heroIndex = order[HERO_SLOT] ?? 0

  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const id = reels[heroIndex]?.id
    const saved = id ? playbackByIdRef.current.get(id) : undefined
    setHeroPaused(saved?.paused ?? true)
    if (saved) pendingRestoreRef.current = saved
  }, [heroIndex, reels])

  useLayoutEffect(() => {
    if (viewerIndex !== null) return
    const pending = pendingRestoreRef.current
    if (!pending) return
    const heroReel = reels[heroIndex]
    if (!heroReel || heroReel.id !== pending.reelId) return
    const video = heroVideoRef.current
    if (!video) return

    const apply = () => {
      if (!Number.isFinite(pending.time)) {
        pendingRestoreRef.current = null
        return
      }
      try {
        if (Math.abs(video.currentTime - pending.time) > 0.05) {
          video.currentTime = pending.time
        }
      } catch {
        // Ignore seek errors before media is ready.
      }
      pendingRestoreRef.current = null
    }

    if (video.readyState >= 1) apply()
    else {
      video.addEventListener('loadedmetadata', apply, { once: true })
      video.addEventListener('loadeddata', apply, { once: true })
    }
  }, [heroIndex, reels, viewerIndex, heroPaused])

  const restorePlayback = useCallback(
    (playback: PlaybackSnapshot) => {
      playbackByIdRef.current.set(playback.reelId, playback)
      pendingRestoreRef.current = playback
      const heroReel = reels[heroIndex]
      if (heroReel?.id === playback.reelId) {
        setHeroPaused(playback.paused)
      }
    },
    [heroIndex, reels],
  )

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const fit = () => {
      const gutter = Math.max(16, viewport.clientWidth * 0.025)
      const width = window.innerWidth
      const isTablet = width >= 735 && width <= 1068
      const heightBudget = isTablet ? 0.55 : 0.8
      const widthScale = (viewport.clientWidth - gutter * 2) / STAGE_W
      const heightScale = (window.innerHeight * heightBudget) / STAGE_H
      let next = Math.max(0.28, Math.min(widthScale, heightScale))
      if (isTablet) next *= 0.88
      setScale(next)
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(viewport)
    window.addEventListener('resize', fit)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [])

  useEffect(() => {
    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [])

  const markAct = useCallback(() => {
    lastActRef.current = Date.now()
  }, [])

  const captureHeroPlayback = useCallback(() => {
    const heroReel = reels[heroIndex]
    const video = heroVideoRef.current
    if (!heroReel) return
    const time = video && Number.isFinite(video.currentTime) ? video.currentTime : 0
    const snapshot: PlaybackSnapshot = {
      reelId: heroReel.id,
      time,
      paused: heroPaused,
    }
    playbackByIdRef.current.set(heroReel.id, snapshot)
  }, [heroIndex, heroPaused, reels])

  const step = useCallback(
    (direction: 1 | -1, options?: { force?: boolean }) => {
      if ((!options?.force && menuOpenRef.current) || busyRef.current || count < 2) return false
      busyRef.current = true
      markAct()
      captureHeroPlayback()
      setMenuOpen(false)
      setMenuPanel('main')
      setOrder((current) => rotateOrder(current, direction))
      window.setTimeout(() => {
        busyRef.current = false
      }, SETTLE_MS)
      return true
    },
    [captureHeroPlayback, count, markAct],
  )

  const bringToHero = useCallback(
    (reelIndex: number) => {
      if (menuOpen) return
      const slot = order.indexOf(reelIndex)
      if (slot < 0 || slot === HERO_SLOT || busyRef.current) return
      const direction: 1 | -1 = slot > HERO_SLOT ? 1 : -1
      const steps = Math.abs(slot - HERO_SLOT)
      busyRef.current = true
      markAct()
      captureHeroPlayback()
      let taken = 0
      const run = () => {
        setOrder((current) => rotateOrder(current, direction))
        taken += 1
        if (taken < steps) window.setTimeout(run, SHIFT_MS)
        else {
          window.setTimeout(() => {
            busyRef.current = false
          }, SETTLE_MS)
        }
      }
      run()
    },
    [captureHeroPlayback, markAct, menuOpen, order],
  )

  useEffect(() => {
    if (reduced || viewerIndex !== null || menuOpen || autoRotateLocked) return
    const timer = window.setInterval(() => {
      if (document.hidden || Date.now() - lastActRef.current < AUTOPLAY_MS) return
      step(1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [autoRotateLocked, menuOpen, reduced, step, viewerIndex])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (viewerIndex !== null) return
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMenuPanel('main')
        return
      }
      if (menuOpen) return

      if (event.key === 'ArrowRight') {
        step(1)
        return
      }
      if (event.key === 'ArrowLeft') {
        step(-1)
        return
      }

      if (!isPlaybackToggleKey(event)) return
      if (isEditableTarget(event.target) || !nothingInteractiveFocused()) return
      if (reduced) return

      const heroReel = reels[heroIndex]
      if (!heroReel?.video) return

      event.preventDefault()
      markAct()
      setHeroPaused((value) => {
        if (value) setAutoRotateLocked(true)
        return !value
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [heroIndex, markAct, menuOpen, reduced, reels, step, viewerIndex])

  useEffect(() => {
    if (!menuOpen) return
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('[data-reel-more], [data-reel-more-menu]')) return
      setMenuOpen(false)
      setMenuPanel('main')
    }
    window.addEventListener('pointerdown', onPointer)
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setMenuPanel('main')
  }, [heroIndex])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || viewerIndex !== null) return

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return

      const dx = event.deltaX
      const dy = event.deltaY
      const horizontal = event.shiftKey || Math.abs(dx) > Math.abs(dy)
      if (!horizontal) return

      event.preventDefault()
      if (busyRef.current) return
      if (performance.now() < wheelLockRef.current) return

      const delta = event.shiftKey && Math.abs(dy) >= Math.abs(dx) ? dy : dx
      wheelAccumRef.current += delta
      if (Math.abs(wheelAccumRef.current) < WHEEL_STEP_PX) return

      const direction: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1
      wheelAccumRef.current = 0
      if (step(direction)) {
        wheelLockRef.current = performance.now() + WHEEL_LOCK_MS
      }
    }

    const gesture = gestureRef.current

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = event.target as HTMLElement
      // Card hits are buttons — still allow swipe on them. Only skip true controls.
      if (target.closest('[data-reel-rail-btn], [data-reel-nav], [data-reel-viewer-close], [data-reel-volume], [data-reel-actions]')) {
        return
      }

      gesture.active = true
      gesture.dragging = false
      gesture.pointerId = event.pointerId
      gesture.startX = event.clientX
      gesture.startY = event.clientY
      gesture.lastX = event.clientX
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!gesture.active || gesture.pointerId !== event.pointerId) return

      const dx = event.clientX - gesture.startX
      const dy = event.clientY - gesture.startY

      if (!gesture.dragging) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        if (Math.abs(dy) > Math.abs(dx)) {
          gesture.active = false
          gesture.pointerId = -1
          delete viewport.dataset.dragging
          return
        }
        gesture.dragging = true
        markAct()
        viewport.dataset.dragging = 'true'
        viewport.setPointerCapture(event.pointerId)
      }

      event.preventDefault()
      gesture.lastX = event.clientX
    }

    const onPointerUp = (event: PointerEvent) => {
      if (!gesture.active || gesture.pointerId !== event.pointerId) return

      const dx = gesture.lastX - gesture.startX
      const wasDragging = gesture.dragging
      gesture.active = false
      gesture.dragging = false
      gesture.pointerId = -1

      if (!wasDragging) return

      delete viewport.dataset.dragging
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 280)

      if (dx <= -SWIPE_PX) step(1)
      else if (dx >= SWIPE_PX) step(-1)
    }

    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove, { passive: false })
    viewport.addEventListener('pointerup', onPointerUp)
    viewport.addEventListener('pointercancel', onPointerUp)
    return () => {
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerUp)
    }
  }, [markAct, step, viewerIndex])

  const onShare = useCallback(
    async (reel: Reel) => {
      markAct()
      setMenuOpen(false)
      setMenuPanel('main')
      const url = `${window.location.origin}${reel.to}`
      try {
        if (navigator.share) {
          await navigator.share({ title: reel.caption, url })
          return
        }
      } catch {
        return
      }
      void navigator.clipboard?.writeText(url)
    },
    [markAct],
  )

  const onCopyLink = useCallback(
    async (reel: Reel) => {
      markAct()
      setMenuOpen(false)
      setMenuPanel('main')
      const url = `${window.location.origin}${reel.to}`
      try {
        await navigator.clipboard?.writeText(url)
      } catch {
        // Clipboard may be unavailable.
      }
    },
    [markAct],
  )

  const onDownload = useCallback(
    (reel: Reel) => {
      markAct()
      setMenuOpen(false)
      setMenuPanel('main')
      const href = reel.video || reel.image
      if (!href) return
      const link = document.createElement('a')
      link.href = href
      link.download = `${reel.id}.${reel.video ? 'mp4' : 'png'}`
      link.rel = 'noopener'
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    [markAct],
  )

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setMenuPanel('main')
  }, [])

  const openViewer = useCallback(
    (reelIndex: number) => {
      markAct()
      closeMenu()
      const target = reels[reelIndex]
      if (!target) return
      const heroReel = reels[heroIndex]
      const video = heroVideoRef.current
      const isHero = Boolean(heroReel && target.id === heroReel.id)
      const stored = playbackByIdRef.current.get(target.id)
      const time = isHero && video ? video.currentTime : (stored?.time ?? 0)
      const paused = isHero ? heroPaused : (stored?.paused ?? false)
      const boot: PlaybackSnapshot = {
        reelId: target.id,
        time: Number.isFinite(time) ? time : 0,
        paused,
      }
      playbackByIdRef.current.set(target.id, boot)
      setViewerBoot(boot)
      setHeroPaused(true)
      setViewerIndex(reelIndex)
    },
    [closeMenu, heroIndex, heroPaused, markAct, reels],
  )

  return (
    <div className={reelClass.strip}>
      <div className={reelClass.navs}>
        <button type="button" className={reelClass.nav} data-reel-nav="" aria-label="Previous reel" onClick={() => step(-1)}>
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type="button"
          className={reelClass.navNext}
          data-reel-nav=""
          aria-label="Next reel"
          onClick={() => step(1)}
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>

      <div className={reelClass.viewport} ref={viewportRef} style={{ height: STAGE_H * scale }}>
        <div
          className={reelClass.stage}
          data-live={animate && !reduced ? 'true' : undefined}
          style={{
            width: STAGE_W,
            height: STAGE_H,
            marginLeft: -STAGE_W / 2,
            transform: `scale(${scale})`,
          }}
        >
          {reels.map((reel, reelIndex) => {
            const slot = order.indexOf(reelIndex)
            if (slot < 0) return null
            const hero = slot === HERO_SLOT
            return (
              <ReelCard
                key={reel.id}
                reel={reel}
                slot={slot}
                hero={hero}
                reduced={reduced}
                liked={liked.has(reel.id)}
                saved={saved.has(reel.id)}
                muted={muted}
                volume={volume}
                quality={quality}
                uiHidden={uiHidden}
                menuOpen={hero && menuOpen}
                menuPanel={menuPanel}
                paused={heroPaused}
                delay={0.25 + reelIndex * 0.09}
                isClickSuppressed={() => suppressClickRef.current}
                onSelect={() => {
                  if (suppressClickRef.current) return
                  closeMenu()
                  if (hero) {
                    markAct()
                    if (reel.video && !reduced) {
                      if (heroPaused) setAutoRotateLocked(true)
                      setHeroPaused((value) => !value)
                    }
                    return
                  }
                  bringToHero(reelIndex)
                }}
                onLike={() => {
                  markAct()
                  setLiked((current) => {
                    const next = new Set(current)
                    if (next.has(reel.id)) next.delete(reel.id)
                    else next.add(reel.id)
                    return next
                  })
                }}
                onForceLike={() => {
                  markAct()
                  setLiked((current) => {
                    if (current.has(reel.id)) return current
                    const next = new Set(current)
                    next.add(reel.id)
                    return next
                  })
                }}
                onShare={() => {
                  void onShare(reel)
                }}
                onToggleMute={() => {
                  markAct()
                  setMuted((current) => {
                    if (current && volume <= 0) setVolume(0.5)
                    return !current
                  })
                }}
                onVolumeChange={(value) => {
                  markAct()
                  setVolume(value)
                  setMuted(value <= 0)
                }}
                onFullscreen={() => openViewer(reelIndex)}
                onOpenComments={() => openViewer(reelIndex)}
                bindHeroVideo={
                  hero
                    ? (node) => {
                        heroVideoRef.current = node
                      }
                    : undefined
                }
                onToggleMenu={() => {
                  markAct()
                  setMenuOpen((open) => {
                    if (open) setMenuPanel('main')
                    return !open
                  })
                }}
                onCopyLink={() => {
                  void onCopyLink(reel)
                }}
                onDownload={() => onDownload(reel)}
                onSave={() => {
                  markAct()
                  setSaved((current) => {
                    const next = new Set(current)
                    if (next.has(reel.id)) next.delete(reel.id)
                    else next.add(reel.id)
                    return next
                  })
                }}
                onToggleUi={() => {
                  markAct()
                  setUiHidden((hidden) => !hidden)
                  closeMenu()
                }}
                onDontRecommend={() => {
                  markAct()
                  closeMenu()
                  step(1, { force: true })
                }}
                onHideCreator={() => {
                  markAct()
                  closeMenu()
                  step(1, { force: true })
                }}
                onReport={() => {
                  markAct()
                  closeMenu()
                }}
                onOpenQuality={() => {
                  markAct()
                  setMenuPanel('quality')
                }}
                onBackMenu={() => {
                  markAct()
                  setMenuPanel('main')
                }}
                onSelectQuality={(value) => {
                  markAct()
                  setQuality(value)
                  setMenuPanel('main')
                }}
              />
            )
          })}
        </div>
      </div>

      {viewerIndex !== null && reels[viewerIndex] ? (
        <ReelViewer
          reel={reels[viewerIndex]}
          liked={liked.has(reels[viewerIndex].id)}
          saved={saved.has(reels[viewerIndex].id)}
          muted={muted}
          volume={volume}
          quality={quality}
          uiHidden={uiHidden}
          reduced={reduced}
          startTime={viewerBoot.reelId === reels[viewerIndex].id ? viewerBoot.time : 0}
          startPaused={viewerBoot.reelId === reels[viewerIndex].id ? viewerBoot.paused : false}
          onClose={(playback) => {
            restorePlayback(playback)
            setViewerIndex(null)
          }}
          onLike={() => {
            const id = reels[viewerIndex].id
            markAct()
            setLiked((current) => {
              const next = new Set(current)
              if (next.has(id)) next.delete(id)
              else next.add(id)
              return next
            })
          }}
          onForceLike={() => {
            const id = reels[viewerIndex].id
            markAct()
            setLiked((current) => {
              if (current.has(id)) return current
              const next = new Set(current)
              next.add(id)
              return next
            })
          }}
          onSave={() => {
            const id = reels[viewerIndex].id
            markAct()
            setSaved((current) => {
              const next = new Set(current)
              if (next.has(id)) next.delete(id)
              else next.add(id)
              return next
            })
          }}
          onShare={() => {
            void onShare(reels[viewerIndex])
          }}
          onToggleMute={() => {
            markAct()
            setMuted((current) => {
              if (current && volume <= 0) setVolume(0.5)
              return !current
            })
          }}
          onVolumeChange={(value) => {
            markAct()
            setVolume(value)
            setMuted(value <= 0)
          }}
          onCopyLink={() => {
            void onCopyLink(reels[viewerIndex])
          }}
          onDownload={() => onDownload(reels[viewerIndex])}
          onToggleUi={() => {
            markAct()
            setUiHidden((hidden) => !hidden)
          }}
          onDontRecommend={() => {
            markAct()
            step(1, { force: true })
          }}
          onHideCreator={() => {
            markAct()
            step(1, { force: true })
          }}
          onReport={() => {
            markAct()
          }}
          onSelectQuality={(value) => {
            markAct()
            setQuality(value)
          }}
        />
      ) : null}
    </div>
  )
}
