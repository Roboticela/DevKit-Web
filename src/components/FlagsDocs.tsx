'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  DkClipboardCopyDuplicate,
  DkMagnifyingGlassFind,
  DkTaskCompleteCheckmark,
} from '@/icons'
import { COUNTRIES, type Country } from '@/lib/countries'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_RING } from '@/lib/styles'
import { Button } from './Button'
import { CodeBlock } from './CodeBlock'
import { CountryFlag } from './CountryFlag'
import { DocsPager } from './DocsPager'
import { Modal } from './Modal'
import { PropsTable, type PropRow } from './PropsTable'

const PAGE_SIZE = 96
const SIZES = [16, 24, 32, 40] as const
const FLAGS = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name))

type CodeView = 'usage' | 'name' | 'iso' | 'jsx'

const PROPS: PropRow[] = [
  {
    name: 'iso',
    type: 'string',
    defaultValue: '—',
    required: 'Yes',
    description: 'ISO 3166-1 alpha-2 country code.',
  },
  {
    name: 'size',
    type: 'number',
    defaultValue: '18',
    description: 'Rendered width in pixels. Height follows the 4:3 flag ratio.',
  },
  {
    name: 'alt',
    type: 'string',
    defaultValue: "''",
    description: 'Accessible label. Pass the country name when the flag is not paired with text.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: "''",
    description: 'Extra classes on the image.',
  },
]

function importSnippet() {
  return `import { CountryFlag } from '@/components'`
}

function jsxSnippet(iso: string, size = 24) {
  return `<CountryFlag iso="${iso}" size={${size}} />`
}

function usageSnippet(iso: string) {
  return `${importSnippet()}\n\n${jsxSnippet(iso)}`
}

function snippetsFor(country: Country) {
  return {
    name: country.name,
    iso: country.iso,
    jsx: jsxSnippet(country.iso),
    usage: usageSnippet(country.iso),
  }
}

export function FlagsDocs() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)
  const [selected, setSelected] = useState<Country | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [codeView, setCodeView] = useState<CodeView>('usage')

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '')
    if (!q) return FLAGS
    return FLAGS.filter(
      (country) =>
        country.name.toLowerCase().includes(q) ||
        country.iso.toLowerCase().includes(q) ||
        country.dial.includes(q),
    )
  }, [query])

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = matches.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selectedSnippets = selected ? snippetsFor(selected) : null
  const shownCode = selectedSnippets?.[codeView] || selectedSnippets?.usage || ''

  useEffect(() => {
    setPage(1)
  }, [query])

  function openFlag(country: Country) {
    setSelected(country)
    setDetailOpen(true)
    setCodeView('usage')
    setCopied(null)
  }

  async function copyText(view: CodeView, value: string) {
    await navigator.clipboard.writeText(value)
    setCodeView(view)
    setCopied(view)
    window.setTimeout(() => setCopied((current) => (current === view ? null : current)), 1600)
  }

  const from = matches.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const to = Math.min(currentPage * PAGE_SIZE, matches.length)
  const actions: { id: CodeView; label: string; value: string }[] = selectedSnippets
    ? [
        { id: 'name', label: 'Copy name', value: selectedSnippets.name },
        { id: 'iso', label: 'Copy ISO', value: selectedSnippets.iso },
        { id: 'jsx', label: 'Copy JSX', value: selectedSnippets.jsx },
        { id: 'usage', label: 'Copy usage', value: selectedSnippets.usage },
      ]
    : []

  return (
    <article>
      <header id="overview" className="scroll-mt-20">
        <p className="m-0 text-xs text-text-tertiary">Components / Foundations / Country Flag</p>
        <h1 className="mt-2 mb-0 text-[32px] font-semibold tracking-[-0.015em] leading-[1.07] text-text-primary max-[734px]:text-[28px]">
          Country Flag
        </h1>
        <p className="mt-2 mb-0 max-w-[692px] text-base font-normal text-text-secondary">
          {FLAGS.length.toLocaleString()} flags. Search by country, ISO code, or dialing code, then click one to
          preview and copy.
        </p>
      </header>

      <section className="mt-8">
        <label className="relative block">
          <DkMagnifyingGlassFind
            size={15}
            strokeWidth={1.75}
            absoluteStrokeWidth
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search flags"
            className={cn(
              'h-11 w-full rounded-[12px] border border-border-default bg-bg-elevated px-10 font-sans text-[15px] text-text-primary',
              'placeholder:text-text-tertiary dark:bg-bg-secondary',
              FOCUS_RING,
            )}
          />
        </label>
        <p className="mt-3 mb-0 text-[13px] text-text-tertiary">
          {matches.length === 0
            ? 'No flags match.'
            : `Showing ${from.toLocaleString()}–${to.toLocaleString()} of ${matches.length.toLocaleString()}`}
        </p>

        {visible.length === 0 ? null : (
          <>
            <div className="mt-4 grid grid-cols-3 gap-2 min-[480px]:grid-cols-4 min-[735px]:grid-cols-6 min-[1069px]:grid-cols-8">
              {visible.map((country) => {
                const active = selected?.iso === country.iso
                return (
                  <button
                    key={country.iso}
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={detailOpen && active}
                    onClick={() => openFlag(country)}
                    className={cn(
                      'flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl bg-bg-secondary px-1.5 py-3 text-text-primary',
                      'transition-colors duration-150',
                      EASE,
                      'hover:bg-bg-tertiary',
                      active && 'bg-brand-primary-subtle text-brand-primary',
                    )}
                  >
                    <CountryFlag iso={country.iso} size={28} alt="" className="shrink-0 rounded-[3px]" />
                    <span className="max-w-full truncate text-center font-mono text-[10px] text-text-tertiary">
                      {country.iso}
                    </span>
                  </button>
                )
              })}
            </div>

            {pageCount > 1 ? (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth={false}
                  disabled={currentPage <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  Previous
                </Button>
                <span className="text-[13px] text-text-tertiary">
                  {currentPage} / {pageCount}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth={false}
                  disabled={currentPage >= pageCount}
                  onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                >
                  Next
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section id="usage" className="mt-12 scroll-mt-20">
        <h2 className="m-0 mb-3 text-xl font-semibold tracking-[-0.01em] text-text-primary">Usage</h2>
        <pre className="m-0 overflow-x-auto rounded-xl bg-bg-secondary p-4 font-mono text-[13px] leading-[1.6] text-text-primary">
          <code>{selected ? usageSnippet(selected.iso) : usageSnippet('US')}</code>
        </pre>
        <p className="mt-3 mb-0 text-[13px] text-text-tertiary">
          Click a flag to open its preview, actions, and copyable code.
        </p>
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <h2 className="m-0 mb-3 text-xl font-semibold tracking-[-0.01em] text-text-primary">Props</h2>
        <PropsTable rows={PROPS} />
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'country-flag')} />

      {selected ? (
        <Modal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          title={selected.name}
          className="max-w-[560px]"
        >
          <p className="m-0 text-[13px] text-text-tertiary">
            {selected.iso} · +{selected.dial}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex h-32 items-center justify-center rounded-xl bg-white">
              <CountryFlag iso={selected.iso} size={64} alt="" className="rounded-[4px]" />
            </div>
            <div className="flex h-32 items-center justify-center rounded-xl bg-black">
              <CountryFlag iso={selected.iso} size={64} alt="" className="rounded-[4px]" />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-center gap-6 rounded-xl bg-bg-secondary px-4 py-6 dark:bg-bg-tertiary">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2 text-text-primary">
                <CountryFlag iso={selected.iso} size={size} alt="" className="rounded-[3px]" />
                <span className="text-[11px] text-text-tertiary">{size}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
            {actions.map((action) => {
              const done = copied === action.id
              return (
                <Button
                  key={action.id}
                  variant="action"
                  size="sm"
                  aria-pressed={codeView === action.id}
                  leading={
                    done ? (
                      <DkTaskCompleteCheckmark size={14} strokeWidth={2} absoluteStrokeWidth className="text-success" />
                    ) : (
                      <DkClipboardCopyDuplicate size={14} strokeWidth={1.75} absoluteStrokeWidth />
                    )
                  }
                  onClick={() => void copyText(action.id, action.value)}
                >
                  {done ? 'Copied' : action.label}
                </Button>
              )
            })}
          </div>

          <p className="mt-6 mb-2 text-[12px] text-text-tertiary">
            {codeView === 'name'
              ? 'Country name'
              : codeView === 'iso'
                ? 'ISO code'
                : codeView === 'jsx'
                  ? 'JSX'
                  : 'Usage'}
          </p>
          <div className="overflow-hidden rounded-xl">
            <CodeBlock code={shownCode} fadeKey={`${selected.iso}-${codeView}`} />
          </div>
        </Modal>
      ) : null}
    </article>
  )
}
