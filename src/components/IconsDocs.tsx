'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  DkClipboardCopyDuplicate,
  DkMagnifyingGlassFind,
  DkTaskCompleteCheckmark,
} from '@/icons'
import { GlyphSvg } from '@/icons/create-glyph'
import { LucideSvg } from '@/icons/create-icon'
import { KIT_ICONS } from '@/icons/kit'
import catalog from '@/icons/catalog'
import { loadLucideData, PACK_LOADERS } from '@/icons/loaders'
import { renameIcon } from '@/icons/names'
import { describeIcon } from '@/icons/tags'
import { ICON_PACKS } from '@/icons/sets'
import type { CompactGlyph, IconNode } from '@/icons/types'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { cn } from '@/lib/cn'
import { EASE, FOCUS_RING } from '@/lib/styles'
import { Button } from './Button'
import { CodeBlock } from './CodeBlock'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsInlineCode, DocsSnippet, DocsUsage } from './DocsCard'
import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsPager } from './DocsPager'
import { Modal } from './Modal'
import { Body } from './Text'

const PAGE_SIZE = 96
const CATALOG = catalog as Record<string, string[]>

type IconEntry = { pack: string; key: string; name: string; tags: string[]; search: string }
type CodeView = 'usage' | 'name' | 'import' | 'jsx'

const ALL_ICONS: IconEntry[] = [
  ...KIT_ICONS.map((item) => ({ pack: 'kit', key: item.name, name: item.name })),
  ...ICON_PACKS.filter((pack) => pack.id !== 'kit').flatMap((pack) =>
    (CATALOG[pack.id] ?? []).map((key) => ({ pack: pack.id, key, name: renameIcon(pack.id, key) })),
  ),
].map((item) => {
  const meta = describeIcon(item.pack, item.key, item.name)
  return { ...item, ...meta }
})

function packLabel(pack: string) {
  return ICON_PACKS.find((item) => item.id === pack)?.label ?? pack
}

function labelTag(tag: string) {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

function importSnippet(pack: string, name: string) {
  if (pack === 'kit' || pack === 'lucide') {
    return `import { ${name} } from '@/icons'`
  }
  return `import ${pack} from '@/icons/${pack}'`
}

function jsxSnippet(pack: string, name: string, size = 24) {
  if (pack === 'kit' || pack === 'lucide') {
    return `<${name} size={${size}} />`
  }
  return `<${pack}.${name} size={${size}} />`
}

function usageSnippet(pack: string, name: string) {
  return `${importSnippet(pack, name)}\n\n${jsxSnippet(pack, name)}`
}

function snippetsFor(item: IconEntry) {
  return {
    name: item.name,
    import: importSnippet(item.pack, item.name),
    jsx: jsxSnippet(item.pack, item.name),
    usage: usageSnippet(item.pack, item.name),
  }
}

export function IconsDocs() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)
  const [selected, setSelected] = useState<IconEntry | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [codeView, setCodeView] = useState<CodeView>('usage')
  const [lucideData, setLucideData] = useState<Record<string, IconNode> | null>(null)
  const [glyphPacks, setGlyphPacks] = useState<Record<string, Record<string, CompactGlyph>>>({})

  const names = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return ALL_ICONS
    return ALL_ICONS.filter((item) => terms.every((term) => item.search.includes(term)))
  }, [query])

  const pageCount = Math.max(1, Math.ceil(names.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = names.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selectedSnippets = selected ? snippetsFor(selected) : null
  const shownCode = selectedSnippets?.[codeView] || selectedSnippets?.usage || ''

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    let active = true
    const targets = selected ? [...visible, selected] : visible
    const needLucide = targets.some((item) => item.pack === 'lucide')
    if (needLucide && !lucideData) {
      void loadLucideData().then((mod) => {
        if (active) setLucideData(mod.default)
      })
    }
    const needed = new Set(
      targets.map((item) => item.pack).filter((id) => id !== 'kit' && id !== 'lucide' && PACK_LOADERS[id]),
    )
    for (const id of needed) {
      if (glyphPacks[id]) continue
      void PACK_LOADERS[id]().then((mod) => {
        if (!active) return
        setGlyphPacks((current) => (current[id] ? current : { ...current, [id]: mod.default }))
      })
    }
    return () => {
      active = false
    }
  }, [visible, selected, lucideData, glyphPacks])

  function searchTag(tag: string) {
    setQuery(tag)
    setDetailOpen(false)
    setPage(1)
  }

  function openIcon(item: IconEntry) {
    setSelected(item)
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

  const from = names.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const to = Math.min(currentPage * PAGE_SIZE, names.length)
  const actions: { id: CodeView; label: string; value: string }[] = selectedSnippets
    ? [
        { id: 'name', label: 'Copy name', value: selectedSnippets.name },
        { id: 'import', label: 'Copy import', value: selectedSnippets.import },
        { id: 'jsx', label: 'Copy JSX', value: selectedSnippets.jsx },
        { id: 'usage', label: 'Copy usage', value: selectedSnippets.usage },
      ]
    : []

  return (
    <article>
      <DocsHeader
        crumb="Components / Foundations / Icons"
        title="Icons"
        description={`${ALL_ICONS.length.toLocaleString()} local icons you can search by name or meaning. Use these glyphs in buttons, fields, and empty states.`}
      />

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
          <DocsProse>
            <Body>
              Import from <DocsInlineCode>@/icons</DocsInlineCode>. Kit and Lucide icons are named{' '}
              <DocsInlineCode>Dk…</DocsInlineCode>. Size 18 sits in buttons and fields; 24 in empty
              states. Decorative icons next to visible text should be hidden from assistive tech.
            </Body>
          </DocsProse>
          <DocsPrinciples
            items={[
              { title: 'Meaning first', body: 'Search tags, not just filenames. Pick the glyph that matches the action.' },
              { title: 'One stroke', body: 'Use strokeWidth 1.75 and absoluteStrokeWidth in product chrome so icons match.' },
              { title: 'Named when alone', body: 'An icon without a visible label needs an accessible name on the control around it.' },
            ]}
          />
          <DocsDoDont
            doItems={[
              'Wrap a lone glyph in Icon Button and pass label.',
              'Keep icons currentColor so they follow text and theme.',
              'Use the same size in a row of actions.',
            ]}
            dontItems={[
              'Do not mix two icon packs in one toolbar.',
              'Do not use an icon as the only error signal.',
              'Do not scale below 16px for a primary action.',
            ]}
          />
          <DocsSnippet>
            {selected
              ? usageSnippet(selected.pack, selected.name)
              : `import { DkRoboticelaBrandLogo, DkTaskCompleteCheckmark, DkGithubOctocatBrandLogo } from '@/icons'\n\n<DkRoboticelaBrandLogo size={24} />\n<DkTaskCompleteCheckmark size={16} />\n<DkGithubOctocatBrandLogo size={18} />`}
          </DocsSnippet>
        </DocsUsage>
      </section>

      <section id="library" className="mt-10 scroll-mt-20">
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
            placeholder="Search name or meaning"
            className={cn(
              'h-11 w-full rounded-[12px] border border-border-default bg-bg-elevated px-10 font-sans text-[15px] text-text-primary',
              'placeholder:text-text-tertiary dark:bg-bg-secondary',
              FOCUS_RING,
            )}
          />
        </label>
        <p className="mt-3 mb-0 text-[13px] text-text-tertiary">
          {names.length === 0
            ? 'No icons match.'
            : `Showing ${from.toLocaleString()}–${to.toLocaleString()} of ${names.length.toLocaleString()}`}
        </p>

        {visible.length === 0 ? null : (
          <>
            <div className="mt-4 grid grid-cols-3 gap-2 min-[480px]:grid-cols-4 min-[735px]:grid-cols-6 min-[1069px]:grid-cols-8">
              {visible.map((item) => (
                <button
                  key={`${item.pack}-${item.name}`}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={detailOpen && selected?.name === item.name && selected.pack === item.pack}
                  onClick={() => openIcon(item)}
                  className={cn(
                    'flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-xl bg-bg-secondary px-1.5 py-3 text-text-primary',
                    'transition-colors duration-150',
                    EASE,
                    'hover:bg-bg-tertiary',
                    selected?.name === item.name &&
                      selected.pack === item.pack &&
                      'bg-brand-primary-subtle text-brand-primary',
                  )}
                >
                  <IconPreview
                    pack={item.pack}
                    name={item.name}
                    dataKey={item.key}
                    lucideData={lucideData}
                    glyphPacks={glyphPacks}
                  />
                  <span className="max-w-full truncate font-mono text-[10px] text-text-tertiary">{item.name}</span>
                  {item.tags.length > 0 ? (
                    <span className="flex max-w-full justify-center gap-1 overflow-hidden">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="max-w-[4.5rem] truncate rounded-[980px] bg-bg-tertiary px-1.5 py-0.5 text-[9px] leading-none text-text-tertiary"
                        >
                          {labelTag(tag)}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </button>
              ))}
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

      <section id="accessibility" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
        <A11ySection
          intro="An icon is a picture. The control around it has to speak."
          items={[
            'If the icon is decorative beside a visible label, pass aria-hidden on the glyph.',
            'If the icon is the only content, Icon Button (or a named link) supplies the accessible name.',
            'Do not encode state only in a glyph swap — keep a text name that matches the action.',
            'Keep contrast: icons inherit currentColor from text-primary or text-on-brand.',
            'Motion in loaders is CSS. Respect prefers-reduced-motion; the kit already does on spinners.',
          ]}
        />
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'icons')} />

      {selected ? (
        <Modal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          title={selected.name}
          className="max-w-[560px]"
        >
          <p className="m-0 text-[13px] text-text-tertiary">
            {packLabel(selected.pack)}
            {selected.key !== selected.name ? ` · ${selected.key}` : ''}
          </p>

          {selected.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.tags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => searchTag(tag)}
                  className={cn(
                    'rounded-[980px] border-0 bg-bg-tertiary px-2.5 py-1 text-[12px] font-medium leading-none text-text-secondary',
                    'transition-colors duration-150',
                    EASE,
                    'hover:bg-bg-hover hover:text-text-primary',
                  )}
                >
                  {labelTag(tag)}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex h-32 items-center justify-center rounded-xl bg-white text-[#1D1D1F]">
              <IconPreview
                pack={selected.pack}
                name={selected.name}
                dataKey={selected.key}
                lucideData={lucideData}
                glyphPacks={glyphPacks}
                size={64}
              />
            </div>
            <div className="flex h-32 items-center justify-center rounded-xl bg-black text-white">
              <IconPreview
                pack={selected.pack}
                name={selected.name}
                dataKey={selected.key}
                lucideData={lucideData}
                glyphPacks={glyphPacks}
                size={64}
              />
            </div>
          </div>

          <div className="mt-4 flex items-end justify-center gap-6 rounded-xl bg-bg-secondary px-4 py-6 dark:bg-bg-tertiary">
            {[16, 24, 32, 48].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2 text-text-primary">
                <IconPreview
                  pack={selected.pack}
                  name={selected.name}
                  dataKey={selected.key}
                  lucideData={lucideData}
                  glyphPacks={glyphPacks}
                  size={size}
                />
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
              ? 'Icon name'
              : codeView === 'import'
                ? 'Import'
                : codeView === 'jsx'
                  ? 'JSX'
                  : 'Usage'}
          </p>
          <div className="overflow-hidden rounded-xl">
            <CodeBlock code={shownCode} fadeKey={`${selected.pack}-${selected.name}-${codeView}`} />
          </div>
        </Modal>
      ) : null}
    </article>
  )
}

function IconPreview({
  pack,
  name,
  dataKey,
  lucideData,
  glyphPacks,
  size = 22,
  className,
}: {
  pack: string
  name: string
  dataKey: string
  lucideData: Record<string, IconNode> | null
  glyphPacks: Record<string, Record<string, CompactGlyph>>
  size?: number
  className?: string
}) {
  if (pack === 'kit') {
    const item = KIT_ICONS.find((entry) => entry.name === name)
    if (!item) return null
    const Icon = item.Icon
    return <Icon size={size} strokeWidth={1.75} absoluteStrokeWidth className={className} />
  }
  if (pack === 'lucide') {
    const node = lucideData?.[dataKey]
    if (!node) return <span className="shrink-0" style={{ width: size, height: size }} />
    return <LucideSvg node={node} size={size} strokeWidth={1.75} className={className} />
  }
  const glyph = glyphPacks[pack]?.[dataKey]
  if (!glyph) return <span className="shrink-0" style={{ width: size, height: size }} />
  return <GlyphSvg data={glyph} size={size} uid={`${pack}-${dataKey}-${size}`} className={className} />
}
