'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'
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
    <div className="mt-4 flex w-full max-w-[420px] flex-col items-center gap-2">
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
        <button
          type="button"
          className={cn(
            'inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[980px] px-3.5 font-sans text-sm font-medium leading-none',
            dark
              ? 'border border-[#3a3a3c] bg-[#1c1c1e] text-brand-primary hover:border-brand-primary'
              : 'border border-border-default bg-transparent text-brand-primary hover:border-brand-primary dark:border-border-strong',
          )}
          onClick={() => void handleCopy()}
          aria-label={copied ? 'Copied' : 'Copy key'}
        >
          {copied ? (
            <Check size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden />
          ) : (
            <Copy size={16} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
          )}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  )
}
