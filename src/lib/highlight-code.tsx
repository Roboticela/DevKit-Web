import type { ReactNode } from 'react'
import { cn } from './cn'

export type HighlightInk = 'default' | 'on-dark' | 'on-brand'

const TOKEN =
  /(\/\/[^\n]*|'[^']*'|"[^"]*"|`[^`]*`|--[a-zA-Z][\w-]*|@\/[\w/.-]*|\b(?:import|from|export|const|let|var|return|function|true|false|undefined|null|as|type|typeof|new|await)\b)/g

const KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'const',
  'let',
  'var',
  'return',
  'function',
  'true',
  'false',
  'undefined',
  'null',
  'as',
  'type',
  'typeof',
  'new',
  'await',
])

function kind(token: string) {
  if (token.startsWith('//')) return 'comment' as const
  if (/^['"`]/.test(token)) return 'string' as const
  if (KEYWORDS.has(token) || token.startsWith('--') || token.startsWith('@/')) return 'keyword' as const
  return 'plain' as const
}

const inkClass: Record<HighlightInk, Record<ReturnType<typeof kind>, string>> = {
  default: {
    comment: 'text-text-tertiary',
    string: 'text-accent-teal',
    keyword: 'text-brand-primary',
    plain: 'text-text-primary',
  },
  'on-dark': {
    comment: 'text-[#98989d]',
    string: 'text-[#2dd4c4]',
    keyword: 'text-[#3b9eff]',
    plain: 'text-[#f5f5f7]',
  },
  'on-brand': {
    comment: 'text-white/70',
    string: 'text-white',
    keyword: 'text-white',
    plain: 'text-text-on-brand',
  },
}

export function highlightCode(source: string, ink: HighlightInk = 'default'): ReactNode {
  if (!source) return null
  return source.split(TOKEN).map((token, index) => {
    if (!token) return null
    return (
      <span key={index} className={cn(inkClass[ink][kind(token)])}>
        {token}
      </span>
    )
  })
}
