'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'
import { Button } from './Button'
import { CodeBlock } from './CodeBlock'

export function CollapsibleCode({
  code,
  fadeKey,
  collapsedLines = 30,
}: {
  code: string
  fadeKey?: string
  collapsedLines?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')
  const extra = Math.max(0, lines.length - collapsedLines)

  return (
    <div className="overflow-hidden rounded-b-2xl border border-t-0 border-border-default">
      <div className="relative">
        <div
          className={cn(
            'overflow-hidden transition-[max-height] duration-300',
            EASE,
            expanded ? 'max-h-[2400px]' : 'max-h-[34rem]',
          )}
        >
          <CodeBlock code={code} fadeKey={fadeKey} className={!expanded && extra > 0 ? 'docs-code-mask' : undefined} />
        </div>
        {!expanded && extra > 0 ? (
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black from-25% to-transparent pt-16 pb-5">
            <Button
              variant="ghost"
              size="sm"
              fullWidth={false}
              className="h-auto px-0 text-brand-primary"
              onClick={() => setExpanded(true)}
            >
              Show {extra} more lines
            </Button>
          </div>
        ) : extra > 0 ? (
          <div className="flex justify-center border-t border-white/10 bg-black py-3">
            <Button
              variant="ghost"
              size="sm"
              fullWidth={false}
              className="h-auto px-0 text-brand-primary"
              onClick={() => setExpanded(false)}
            >
              Collapse source
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
