'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { cn } from './cn'
import { landingEase, landingReveal, landingRevealCopy, landingRevealScene, landingRevealSceneFlush } from './landing'
import { useLandingMotion } from './HomeShell'

function useInView<T extends HTMLElement>(once = false) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const [sceneOn, setSceneOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reveal = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.08
        if (visible) setInView(true)
        else if (!once) setInView(false)
      },
      { threshold: [0, 0.08, 0.12, 0.22, 0.4, 0.6], rootMargin: '42% 0px' },
    )
    const scene = new IntersectionObserver(
      ([entry]) => {
        setSceneOn(entry.isIntersecting && entry.intersectionRatio >= 0.1)
      },
      { threshold: [0, 0.1, 0.2, 0.4], rootMargin: '0px' },
    )
    reveal.observe(el)
    scene.observe(el)
    return () => {
      reveal.disconnect()
      scene.disconnect()
    }
  }, [once])

  return { ref, inView, sceneOn }
}

export function RevealSection({
  className,
  scene,
  sceneClassName,
  copyClassName,
  once,
  fade = true,
  flushScene = false,
  children,
  ...rest
}: {
  className?: string
  sceneClassName?: string
  copyClassName?: string
  scene?: (active: boolean) => ReactNode
  once?: boolean
  fade?: boolean
  flushScene?: boolean
  children: ReactNode
} & Omit<ComponentProps<'section'>, 'children' | 'className'>) {
  const { ref, inView, sceneOn } = useInView<HTMLElement>(once)
  const { reduced } = useLandingMotion()
  const fadeCopy = fade && !reduced
  const fadeScene = fade && !reduced

  return (
    <section ref={ref} className={cn(landingReveal, className)} {...rest}>
      {scene ? (
        <div
          className={cn(
            flushScene ? landingRevealSceneFlush : landingRevealScene,
            fadeScene && 'opacity-0',
            fadeScene && inView && `opacity-100 transition-opacity duration-200 ${landingEase}`,
            fadeScene && !inView && `opacity-0 transition-opacity duration-300 ${landingEase}`,
            !fadeScene && 'opacity-100',
            sceneClassName,
          )}
          aria-hidden="true"
        >
          {scene(sceneOn)}
        </div>
      ) : null}
      <div
        className={cn(
          landingRevealCopy,
          fadeCopy && 'opacity-0',
          fadeCopy && inView && `opacity-100 transition-opacity delay-100 duration-300 ${landingEase}`,
          fadeCopy && !inView && `opacity-0 transition-opacity duration-300 ${landingEase}`,
          !fadeCopy && 'opacity-100',
          copyClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
