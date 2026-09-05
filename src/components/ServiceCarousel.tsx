'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import Link from 'next/link'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CATALOG, type CatalogIcon } from '@/lib/landing-catalog'
import { cn } from '@/lib/cn'
import { landingBtnPrimary, landingFocus } from '@/lib/landing'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type ServiceSlide = {
  slug: string
  category: string
  label: string
  description: string
  href: string
  icon: CatalogIcon
  images: string[]
}

export const SERVICE_CAROUSEL_SLIDES: ServiceSlide[] = [
  {
    slug: 'sign-in',
    category: 'Access',
    label: 'Sign in',
    description: CATALOG.services.items[0].description,
    href: '/services/sign-in',
    icon: 'signin',
    images: ['/products/cell-hub.png', '/products/cell-tag.png', '/products/cell-cam.png'],
  },
  {
    slug: 'recovery',
    category: 'Security',
    label: 'Recovery',
    description: CATALOG.services.items[1].description,
    href: '/services/recovery',
    icon: 'recovery',
    images: ['/products/cell-power.png', '/products/cell-plug.png', '/products/cell-light.png'],
  },
  {
    slug: 'sync',
    category: 'Software',
    label: 'Sync',
    description: CATALOG.services.items[2].description,
    href: '/services/sync',
    icon: 'sync',
    images: ['/products/cell-speaker.png', '/products/cell-hub.png', '/products/cell-tag.png'],
  },
  {
    slug: 'help',
    category: 'Support',
    label: 'Help',
    description: CATALOG.support.items[0].description,
    href: '/support/help',
    icon: 'help',
    images: ['/products/cell-cam.png', '/products/cell-light.png', '/products/cell-speaker.png'],
  },
  {
    slug: 'security',
    category: 'Security',
    label: 'Security',
    description: CATALOG.support.items[2].description,
    href: '/support/security',
    icon: 'security',
    images: ['/products/cell-tag.png', '/products/cell-power.png', '/products/cell-plug.png'],
  },
  {
    slug: 'account',
    category: 'Account',
    label: 'Account',
    description: CATALOG.support.items[1].description,
    href: '/support/account',
    icon: 'account',
    images: ['/products/cell-hub.png', '/products/cell-cam.png', '/products/cell-light.png'],
  },
]

const COPIES = 3
const AUTO_MS = 4200
const MOVE_MS = 380
const DRAG_PX = 48
const WHEEL_PX = 36
const EASE = 'cubic-bezier(0.28, 0.11, 0.32, 1)'

function wheelPx(event: WheelEvent, axis: 'x' | 'y') {
  const raw = axis === 'x' ? event.deltaX : event.deltaY
  if (event.deltaMode === 1) return raw * 16
  if (event.deltaMode === 2) return raw * window.innerHeight
  return raw
}

function CardShots({ images, frame }: { images: string[]; frame: number }) {
  useEffect(() => {
    images.forEach((src) => {
      const preload = new Image()
      preload.src = src
    })
  }, [images])

  return (
    <div className="absolute inset-0 size-full">
      {images.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            'absolute inset-0 size-full object-cover object-center opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:transition-none',
            index === frame && 'opacity-100',
          )}
          draggable={false}
        />
      ))}
    </div>
  )
}

export function ServiceCarousel({
  slides = SERVICE_CAROUSEL_SLIDES,
  cta = 'Learn more',
}: {
  slides?: ServiceSlide[]
  cta?: string
}) {
  const COUNT = slides.length
  const TRACK = useMemo(
    () =>
      Array.from({ length: COUNT * COPIES }, (_, index) => ({
        ...slides[index % COUNT],
        key: `${slides[index % COUNT].slug}-${index}`,
        logical: index % COUNT,
      })),
    [COUNT, slides],
  )
  const reduced = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const posRef = useRef(0)
  const physRef = useRef(COUNT)
  const committed = useRef(0)
  const activeRef = useRef(0)
  const animRef = useRef(0)
  const movingRef = useRef(false)
  const moveGenRef = useRef(0)
  const moveOriginRef = useRef<'user' | 'auto' | null>(null)
  const destRef = useRef(COUNT)
  const hoverRef = useRef(false)
  const lastUserRef = useRef(0)
  const wheelCoolRef = useRef(0)
  const autoTimerRef = useRef(0)
  const stopMoveRef = useRef<(() => void) | null>(null)
  const scrollToPhysicalRef = useRef<(physical: number, origin: 'user' | 'auto') => void>(() => {})
  const dragRef = useRef({
    down: false,
    dragging: false,
    startX: 0,
    startY: 0,
    startPos: 0,
    lastX: 0,
  })
  const [active, setActive] = useState(0)
  const [frames, setFrames] = useState(() => slides.map(() => 0))

  const bumpFrame = useCallback((slideIndex: number) => {
    setFrames((current) => {
      const next = [...current]
      next[slideIndex] = (next[slideIndex] + 1) % slides[slideIndex].images.length
      return next
    })
  }, [slides])

  const applyX = useCallback((next: number, mode: 'animate' | 'jump' = 'jump') => {
    const track = trackRef.current
    posRef.current = next
    if (!track) return
    track.style.transition = mode === 'animate' && !reduced ? `transform ${MOVE_MS}ms ${EASE}` : 'none'
    track.style.transform = `translate3d(${next}px, 0, 0)`
    if (mode === 'jump') void track.offsetWidth
  }, [reduced])

  const setWidth = useCallback(() => {
    const a = cardRefs.current[COUNT]
    const b = cardRefs.current[COUNT * 2]
    if (!a || !b) return 0
    return b.offsetLeft - a.offsetLeft
  }, [])

  const loopShift = useCallback(() => {
    const width = setWidth()
    if (!width) return
    if (physRef.current < COUNT) {
      applyX(posRef.current - width, 'jump')
      physRef.current += COUNT
    } else if (physRef.current >= COUNT * 2) {
      applyX(posRef.current + width, 'jump')
      physRef.current -= COUNT
    }
  }, [applyX, setWidth])

  const paintPose = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const mid = stage.getBoundingClientRect().left + stage.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      const span = card.offsetWidth + 20
      const dist = (rect.left + rect.width / 2 - mid) / span
      const u = Math.min(1, Math.abs(dist))
      const fall = u * u * (3 - 2 * u)
      card.style.transform = `scale(${1 - 0.085 * fall})`
      card.style.opacity = String(1 - 0.42 * fall)
      const abs = Math.abs(dist)
      if (abs < bestDist) {
        bestDist = abs
        best = index % COUNT
      }
    })
    if (best !== activeRef.current) {
      activeRef.current = best
      setActive(best)
    }
  }, [])

  const commit = useCallback(
    (index: number) => {
      const logical = ((index % COUNT) + COUNT) % COUNT
      if (logical === committed.current) {
        activeRef.current = logical
        setActive(logical)
        return
      }
      bumpFrame(committed.current)
      committed.current = logical
      activeRef.current = logical
      setActive(logical)
    },
    [bumpFrame],
  )

  const centerOf = useCallback(
    (physical: number) => {
      const stage = stageRef.current
      const card = cardRefs.current[physical]
      if (!stage || !card) return posRef.current
      const stageMid = stage.clientWidth / 2
      const cardMid = card.offsetLeft + card.offsetWidth / 2
      return stageMid - cardMid
    },
    [],
  )

  const readTrackX = useCallback(() => {
    const track = trackRef.current
    if (!track) return posRef.current
    const raw = getComputedStyle(track).transform
    if (!raw || raw === 'none') return posRef.current
    return new DOMMatrix(raw).m41
  }, [])

  const clearAuto = useCallback(() => {
    window.clearTimeout(autoTimerRef.current)
    autoTimerRef.current = 0
  }, [])

  const scheduleAuto = useCallback(() => {
    window.clearTimeout(autoTimerRef.current)
    autoTimerRef.current = 0
    if (reduced || hoverRef.current || dragRef.current.down) return
    autoTimerRef.current = window.setTimeout(() => {
      autoTimerRef.current = 0
      if (hoverRef.current || dragRef.current.down || movingRef.current) return
      if (performance.now() - lastUserRef.current < AUTO_MS) {
        scheduleAuto()
        return
      }
      scrollToPhysicalRef.current(physRef.current + 1, 'auto')
    }, AUTO_MS)
  }, [reduced])

  const finishMove = useCallback(
    (physical: number, gen: number) => {
      if (gen !== moveGenRef.current) return
      moveGenRef.current += 1
      movingRef.current = false
      moveOriginRef.current = null
      cancelAnimationFrame(animRef.current)
      physRef.current = physical
      loopShift()
      destRef.current = physRef.current
      paintPose()
      commit(physical)
      scheduleAuto()
    },
    [loopShift, paintPose, commit, scheduleAuto],
  )

  const scrollToPhysical = useCallback(
    (physical: number, origin: 'user' | 'auto') => {
      if (origin === 'auto' && (hoverRef.current || dragRef.current.down || performance.now() - lastUserRef.current < AUTO_MS)) {
        scheduleAuto()
        return
      }
      const gen = ++moveGenRef.current
      stopMoveRef.current?.()
      stopMoveRef.current = null
      if (movingRef.current) applyX(readTrackX(), 'jump')
      destRef.current = physical
      const dest = centerOf(physical)
      if (reduced || Math.abs(dest - posRef.current) < 1) {
        applyX(dest, 'jump')
        finishMove(physical, gen)
        return
      }
      const track = trackRef.current
      cancelAnimationFrame(animRef.current)
      movingRef.current = true
      moveOriginRef.current = origin
      applyX(dest, 'animate')
      const pose = () => {
        paintPose()
        if (movingRef.current && gen === moveGenRef.current) animRef.current = requestAnimationFrame(pose)
      }
      animRef.current = requestAnimationFrame(pose)
      const done = (event?: Event) => {
        if (gen !== moveGenRef.current) return
        if (event && event.target !== track) return
        stopMoveRef.current = null
        track?.removeEventListener('transitionend', done)
        window.clearTimeout(fallback)
        finishMove(physical, gen)
      }
      const fallback = window.setTimeout(() => done(), MOVE_MS + 80)
      track?.addEventListener('transitionend', done)
      stopMoveRef.current = () => {
        track?.removeEventListener('transitionend', done)
        window.clearTimeout(fallback)
        cancelAnimationFrame(animRef.current)
      }
    },
    [reduced, applyX, paintPose, finishMove, centerOf, readTrackX, scheduleAuto],
  )

  scrollToPhysicalRef.current = scrollToPhysical

  const stepBy = useCallback(
    (dir: 1 | -1) => {
      lastUserRef.current = performance.now()
      clearAuto()
      const next = physRef.current + dir
      if (movingRef.current && destRef.current === next) {
        moveOriginRef.current = 'user'
        return
      }
      if (movingRef.current && moveOriginRef.current === 'user') return
      scrollToPhysical(next, 'user')
    },
    [clearAuto, scrollToPhysical],
  )

  const go = useCallback(
    (nextLogical: number) => {
      lastUserRef.current = performance.now()
      clearAuto()
      const logical = ((nextLogical % COUNT) + COUNT) % COUNT
      let delta = logical - (physRef.current % COUNT)
      if (delta > COUNT / 2) delta -= COUNT
      if (delta < -COUNT / 2) delta += COUNT
      if (!delta) return
      scrollToPhysical(physRef.current + delta, 'user')
    },
    [clearAuto, scrollToPhysical],
  )

  const setFrame = (slideIndex: number, frame: number) => {
    setFrames((current) => {
      const next = [...current]
      next[slideIndex] = frame
      return next
    })
  }

  useEffect(() => {
    applyX(centerOf(COUNT))
    paintPose()
  }, [applyX, centerOf, paintPose])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let accum = 0

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return
      const dx = wheelPx(event, 'x')
      const dy = wheelPx(event, 'y')
      const sideways = event.shiftKey || Math.abs(dx) > Math.abs(dy)
      if (!sideways) return
      event.preventDefault()
      if (movingRef.current && moveOriginRef.current === 'user') return
      if (performance.now() < wheelCoolRef.current) return
      accum += event.shiftKey && Math.abs(dy) >= Math.abs(dx) ? dy : dx
      if (Math.abs(accum) < WHEEL_PX) return
      const dir = accum > 0 ? 1 : -1
      accum = 0
      wheelCoolRef.current = performance.now() + MOVE_MS + 160
      stepBy(dir)
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    const resize = new ResizeObserver(() => {
      applyX(centerOf(physRef.current), 'jump')
      paintPose()
    })
    resize.observe(stage)
    return () => {
      stage.removeEventListener('wheel', onWheel)
      resize.disconnect()
    }
  }, [applyX, centerOf, paintPose, stepBy])

  useEffect(() => {
    scheduleAuto()
    return () => window.clearTimeout(autoTimerRef.current)
  }, [scheduleAuto])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button')) return
    lastUserRef.current = performance.now()
    clearAuto()
    if (movingRef.current && moveOriginRef.current === 'auto') {
      stopMoveRef.current?.()
      stopMoveRef.current = null
      moveGenRef.current += 1
      applyX(centerOf(physRef.current), 'jump')
      movingRef.current = false
      moveOriginRef.current = null
      destRef.current = physRef.current
      paintPose()
      commit(physRef.current)
    }
    dragRef.current = {
      down: true,
      dragging: false,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      startPos: posRef.current,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.down) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    if (!drag.dragging) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.down = false
        if (!hoverRef.current) scheduleAuto()
        return
      }
      drag.dragging = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    drag.lastX = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.down) return
    const wasDragging = drag.dragging
    const dx = drag.lastX - drag.startX
    drag.down = false
    drag.dragging = false
    if (!wasDragging) {
      if (!hoverRef.current) scheduleAuto()
      return
    }
    event.currentTarget.releasePointerCapture(event.pointerId)
    if (dx <= -DRAG_PX) stepBy(1)
    else if (dx >= DRAG_PX) stepBy(-1)
    else if (!hoverRef.current) scheduleAuto()
  }

  return (
    <div
      className="ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-hidden select-none [--svc-gap:16px] [--svc-w:min(86vw,860px)] min-[735px]:[--svc-gap:20px] min-[735px]:[--svc-w:min(70vw,860px)]"
      onMouseEnter={() => {
        hoverRef.current = true
        clearAuto()
      }}
      onMouseLeave={() => {
        hoverRef.current = false
        if (!dragRef.current.down) scheduleAuto()
      }}
    >
      <div
        ref={stageRef}
        className="h-[calc(var(--svc-w)*0.72)] cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-[var(--svc-gap)] px-[calc((100vw-var(--svc-w))/2)] will-change-transform motion-reduce:transition-none"
        >
          {TRACK.map((slide, index) => {
            const isActive = slide.logical === active
            const frame = frames[slide.logical]
            return (
              <article
                key={slide.key}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="relative flex h-full w-[var(--svc-w)] flex-none origin-center flex-col justify-between overflow-hidden rounded-[18px] border border-border-default bg-bg-elevated opacity-50 will-change-[transform,opacity] scale-[0.92] motion-reduce:transition-none"
                onClick={() => {
                  if (!isActive && Math.abs(dragRef.current.lastX - dragRef.current.startX) < 8) {
                    go(slide.logical)
                  }
                }}
              >
                <header className="relative z-[2] flex min-h-14 flex-none items-center justify-between gap-3 bg-bg-elevated px-[18px] pt-4 pb-3 min-[735px]:min-h-16 min-[735px]:px-6 min-[735px]:pt-5 min-[735px]:pb-3.5">
                  <h3 className="m-0 text-[21px] font-semibold tracking-[-0.005em] leading-[1.14] text-text-primary min-[735px]:text-[28px]">
                    {slide.label}
                  </h3>
                  <span
                    className="grid size-9 flex-none place-items-center rounded-xl bg-brand-primary-subtle text-brand-primary min-[735px]:size-10"
                    aria-hidden="true"
                  >
                    <CategoryIcon name={slide.icon} size="md" />
                  </span>
                </header>
                <div className="absolute inset-0 z-0 overflow-hidden bg-bg-tertiary">
                  <CardShots images={slide.images} frame={frame} />
                  <div
                    className={cn(
                      'absolute right-0 bottom-3.5 left-0 z-[3] flex items-center justify-center gap-2',
                      isActive ? 'pointer-events-auto' : 'pointer-events-none',
                    )}
                    role="tablist"
                    aria-label={`${slide.label} images`}
                  >
                    {slide.images.map((_, shot) => (
                      <button
                        key={shot}
                        type="button"
                        role="tab"
                        aria-selected={shot === frame}
                        aria-label={`Image ${shot + 1}`}
                        className={cn(
                          'size-[7px] cursor-pointer rounded-full border-0 bg-white/40 p-0',
                          'transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
                          landingFocus,
                          shot === frame && 'scale-[1.35] bg-white',
                          'motion-reduce:transition-none',
                        )}
                        tabIndex={isActive ? 0 : -1}
                        onClick={(event) => {
                          event.stopPropagation()
                          setFrame(slide.logical, shot)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative z-[2] flex flex-none items-center gap-4 bg-bg-elevated px-[18px] pt-4 pb-[18px] min-[735px]:gap-5 min-[735px]:px-6 min-[735px]:pt-[18px] min-[735px]:pb-[22px]">
                  {isActive ? (
                    <Link
                      className={cn(landingBtnPrimary, 'h-11 flex-none px-[18px] text-[15px]')}
                      href={slide.href}
                    >
                      {cta}
                    </Link>
                  ) : (
                    <span
                      className={cn(landingBtnPrimary, 'pointer-events-none h-11 flex-none px-[18px] text-[15px]')}
                      aria-hidden="true"
                    >
                      {cta}
                    </span>
                  )}
                  <p className="m-0 min-w-0 text-sm font-normal leading-[1.4] text-text-secondary min-[735px]:text-[15px]">
                    <span className="mb-0.5 block text-[12px] font-semibold uppercase tracking-[0.12em] leading-[1.33] text-brand-primary">
                      {slide.category}
                    </span>
                    {slide.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="Services">
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={slide.label}
            className={cn(
              'size-2 cursor-pointer rounded-full border-0 bg-border-default p-0',
              'transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.28,0.11,0.32,1)]',
              landingFocus,
              index === active && 'scale-[1.35] bg-brand-primary',
              'motion-reduce:transition-none',
            )}
            onClick={() => go(index)}
          />
        ))}
      </div>
    </div>
  )
}
