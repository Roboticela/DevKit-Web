'use client'

import { useState } from 'react'
import { DkTaskCompleteCheckmark, DkClipboardCopyDuplicate } from '@/icons'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Caption } from './Text'

export function TotpManualKey({
  secret,
  tone = 'light',
}: {
  secret: string
  tone?: 'dark' | 'light'
}) {
  const [copiedFor, setCopiedFor] = useState<string | null>(null)
  const copied = copiedFor === secret

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(secret)
      setCopiedFor(secret)
      window.setTimeout(() => setCopiedFor(null), 2000)
    } catch {
      setCopiedFor(null)
    }
  }

  const dark = tone === 'dark'

  return (
    <div className="mx-auto mt-4 flex w-full max-w-[420px] flex-col items-center gap-2">
      <Caption
        align="center"
        className={dark ? 'text-[#a1a1a6]' : undefined}
        tone={dark ? undefined : 'secondary'}
      >
        Or enter this key manually
      </Caption>
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        <code
          className={cn(
            'block max-w-full rounded-lg px-3 py-2.5 text-center font-mono text-[13px] font-semibold tracking-[0.04em] leading-[1.35] break-all',
            dark
              ? 'bg-[#1c1c1e] text-white'
              : 'bg-bg-secondary text-text-primary',
          )}
        >
          {secret}
        </code>
        <Button
          variant="action"
          size="sm"
          fullWidth={false}
          aria-label={copied ? 'Copied' : 'Copy key'}
          className={dark ? 'border-[#3a3a3c] bg-[#1c1c1e] text-brand-primary hover:border-brand-primary' : 'text-brand-primary hover:border-brand-primary'}
          leading={
            copied ? (
              <DkTaskCompleteCheckmark size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden />
            ) : (
              <DkClipboardCopyDuplicate size={16} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
            )
          }
          onClick={() => void handleCopy()}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  )
}
