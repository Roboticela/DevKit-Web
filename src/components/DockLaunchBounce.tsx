'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 * Launch Bounce keyframes — plays once per launch, ~500ms total.
 * Transform origin stays bottom-center (the same anchor as magnification)
 * so the icon leaps up from the Dock surface, not from its middle.
 */
export const DOCK_LAUNCH_BOUNCE_KEYFRAMES: Keyframe[] = [
  { transform: 'scale(1) translateY(0)', offset: 0 },
  { transform: 'scale(1.15) translateY(-18px)', offset: 0.25 },
  { transform: 'scale(0.95) translateY(0)', offset: 0.5 },
  { transform: 'scale(1.08) translateY(-8px)', offset: 0.7 },
  { transform: 'scale(1) translateY(0)', offset: 1 },
]

export const DOCK_LAUNCH_BOUNCE_DURATION = 500

/** When the final settle frame begins — the Running Indicator fades in here. */
const SETTLE_AT = 425

/**
 * The bounce feedback that plays when a Dock Icon is clicked to launch.
 * Returns a ref for the element to animate and a launch() trigger.
 *
 * Only ONE bounce plays per launch — rapid re-clicking during an in-progress
 * bounce is ignored, letting the current animation finish. onSettle fires
 * with the bounce's final settle frame, which is where the Running
 * Indicator should fade in.
 */
export function useDockLaunchBounce<T extends HTMLElement>(onSettle?: () => void) {
  const ref = useRef<T | null>(null)
  const playingRef = useRef(false)
  const settleTimerRef = useRef(0)
  const onSettleRef = useRef(onSettle)

  useEffect(() => {
    onSettleRef.current = onSettle
  }, [onSettle])

  useEffect(() => {
    return () => {
      window.clearTimeout(settleTimerRef.current)
    }
  }, [])

  const launch = useCallback(() => {
    const element = ref.current
    if (!element) return
    // Never stack or restart an in-progress bounce
    if (playingRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onSettleRef.current?.()
      return
    }
    playingRef.current = true
    const animation = element.animate(DOCK_LAUNCH_BOUNCE_KEYFRAMES, {
      duration: DOCK_LAUNCH_BOUNCE_DURATION,
      easing: 'ease-out',
    })
    // Simultaneous with the bounce's final settle frame
    settleTimerRef.current = window.setTimeout(() => onSettleRef.current?.(), SETTLE_AT)
    animation.onfinish = () => {
      playingRef.current = false
    }
  }, [])

  return { ref, launch }
}
