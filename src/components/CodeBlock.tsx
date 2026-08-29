'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/styles'

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
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={cn('relative bg-black text-[#f5f5f7]', className)}>
      <pre
        key={fadeKey}
        className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-[1.6] animate-docs-crossfade motion-reduce:animate-none"
      >
        <code>
          {lines.map((line, index) => (
            <span key={index} className="flex min-h-[1.6em]">
              <span className="w-8 shrink-0 select-none pr-4 text-right text-white/30">
                {index + 1}
              </span>
              <span className="min-w-0 whitespace-pre">{highlightLine(line)}</span>
            </span>
          ))}
        </code>
      </pre>
      <button
        type="button"
        onClick={copy}
        title={copied ? 'Copied!' : 'Copy'}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className={cn(
          'absolute top-3 right-3 inline-flex size-8 cursor-pointer items-center justify-center rounded-[8px] border-0',
          'bg-[rgba(255,255,255,0.08)] text-[#f5f5f7]',
          'transition-colors duration-150',
          EASE,
          'hover:bg-[rgba(255,255,255,0.14)]',
        )}
      >
        {copied ? (
          <Check size={14} strokeWidth={2} absoluteStrokeWidth className="text-success" />
        ) : (
          <Copy size={14} strokeWidth={1.75} absoluteStrokeWidth />
        )}
      </button>
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

export function IconAction({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-8 cursor-pointer items-center justify-center rounded-[8px] border-0 bg-transparent text-text-tertiary',
        'transition-colors duration-150',
        EASE,
        'hover:bg-bg-hover hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}
