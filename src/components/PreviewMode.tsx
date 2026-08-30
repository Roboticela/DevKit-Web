'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { cn } from '@/lib/cn'

const PreviewModeContext = createContext(false)

export const PREVIEW_INSET =
  'px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]'

export function PreviewMode({ children }: { children: ReactNode }) {
  return <PreviewModeContext.Provider value={true}>{children}</PreviewModeContext.Provider>
}

export function usePreviewMode() {
  return useContext(PreviewModeContext)
}

export function PreviewFrame({
  children,
  className,
  previewClassName,
}: {
  children: ReactNode
  className?: string
  previewClassName?: string
}) {
  const preview = usePreviewMode()
  if (preview) {
    return previewClassName ? <div className={previewClassName}>{children}</div> : children
  }
  return (
    <div className={cn('overflow-hidden rounded-[12px] border border-border-default', className)}>
      {children}
    </div>
  )
}
