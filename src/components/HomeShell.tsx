'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { landingShell } from '@/lib/landing'

const LandingMotionContext = createContext({ reduced: false })

export function useLandingMotion() {
  return useContext(LandingMotionContext)
}

export function HomeShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <LandingMotionContext.Provider value={{ reduced }}>
      <div className={cn(landingShell, className)}>{children}</div>
    </LandingMotionContext.Provider>
  )
}
