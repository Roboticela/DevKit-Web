'use client'

import {
  DkClipboardCopyDuplicate
} from '@/icons'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'

function highlightLine(line: string) {
  const tokens = line.split(
    /(\/\/.*|'[^']*'|"[^"]*"|`[^`]*`|\b(?:import|from|export|const|return|function|true|false|undefined)\b)/g,
  )

  return tokens.map((token, index) => {
    if (!token) return null
    if (token.startsWith('//')) {
      return (
        <span key={index} className="text-text-tertiary">
          {token}
        </span>
      )
    }
    if (/^['"`]/.test(token)) {
      return (
        <span key={index} className="text-accent-teal">
          {token}
        </span>
      )
    }
    if (/^(import|from|export|const|return|function|true|false|undefined)$/.test(token)) {
      return (
        <span key={index} className="text-brand-primary">
          {token}
        </span>
      )
    }
    return <span key={index}>{token}</span>
  })
}

export function CodeBlock({
  code,
  fadeKey,
  className,
}: {
  code: string
  fadeKey?: string
  className?: string
}) {
  const lines = code.replace(/\n$/, '').split('\n')

  return (
    <div className={cn('bg-black text-[#f5f5f7]', className)}>
      <div className="flex h-9 items-center justify-end px-2.5">
        <IconButton
          label="Copy code"
          size="sm"
          className="text-[#f5f5f7] hover:bg-[rgba(255,255,255,0.08)]"
          onAction={() => navigator.clipboard.writeText(code)}
        >
          <DkClipboardCopyDuplicate size={14} strokeWidth={1.75} absoluteStrokeWidth />
        </IconButton>
      </div>
      <pre
        key={fadeKey}
        className="m-0 overflow-x-hidden px-5 pb-5 font-mono text-[13px] leading-[1.6] animate-docs-crossfade motion-reduce:animate-none"
      >
        <code className="grid">
          {lines.map((line, index) => (
            <span key={index} className="flex min-h-[1.6em]">
              <span className="w-8 shrink-0 select-none pr-4 text-right text-white/30">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 whitespace-pre-wrap [overflow-wrap:anywhere]">
                {highlightLine(line)}
                {line === '' ? '\n' : null}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export function CodePanel({
  code,
  fadeKey,
}: {
  code: string
  fadeKey?: string
}) {
  return (
    <div className="overflow-hidden rounded-b-2xl border border-t-0 border-border-default">
      <CodeBlock code={code} fadeKey={fadeKey} />
    </div>
  )
}

export function copyCode(code: string): Promise<void> {
  return navigator.clipboard.writeText(code)
}
