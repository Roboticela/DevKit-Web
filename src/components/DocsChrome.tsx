'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { resolveDocsFrame } from '@/lib/docs-frame'
import { DocsShell } from './DocsShell'

export function DocsChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const frame = resolveDocsFrame(pathname)

  if (!frame) return children

  return (
    <DocsShell
      activeId={frame.activeId}
      toc={frame.toc}
      activeTab={frame.activeTab}
      sections={frame.sections}
      contentWidth={frame.contentWidth}
    >
      {children}
    </DocsShell>
  )
}
