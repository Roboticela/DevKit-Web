'use client'

import { useState, type ReactNode } from 'react'
import { adjacentDocs, DOCS_ITEMS, findDocContext, DOCS_NAV } from '@/lib/docs-catalog'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption } from './Text'

export function KitDocArticle({
  slug,
  title,
  description,
  demo,
  code,
  states,
  statesContent,
  props,
  fadeKey,
  wide = false,
}: {
  slug: string
  title: string
  description: string
  demo: ReactNode
  code: string
  states?: { label: string; node: ReactNode }[]
  statesContent?: ReactNode
  props: PropRow[]
  fadeKey?: string
  wide?: boolean
}) {
  const [replay, setReplay] = useState(0)
  const ctx = findDocContext(DOCS_NAV, slug)
  const related = (ctx?.section.items ?? []).filter((item) => item.id !== slug).slice(0, 3)
  const pager = adjacentDocs(DOCS_ITEMS, slug)
  const demoKey = `${fadeKey ?? slug}-${replay}`

  return (
    <article>
      <DocsHeader
        crumb={`Components / ${ctx?.section.label ?? 'Library'} / ${title}`}
        title={title}
        description={description}
      />

      <section id="live-demo" className="mt-8 scroll-mt-20 animate-docs-demo-in motion-reduce:animate-none">
        <DocsDemoPanel
          fadeKey={demoKey}
          onCopy={() => navigator.clipboard.writeText(code)}
          onReplay={() => setReplay((current) => current + 1)}
        >
          <div className={wide ? 'w-full' : 'w-full max-w-[460px]'}>{demo}</div>
        </DocsDemoPanel>
        <div id="code" className="scroll-mt-20">
          <CodePanel code={code} fadeKey={fadeKey} />
        </div>
      </section>

      {statesContent || states?.length ? (
        <section id="states" className="mt-12 scroll-mt-20">
          <DocsSectionTitle>States</DocsSectionTitle>
          {statesContent ?? (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
              {states!.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="flex min-h-[100px] items-center justify-center rounded-xl bg-bg-secondary px-4 py-6">
                    {item.node}
                  </div>
                  <Caption align="center">{item.label}</Caption>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={props} />
      </section>

      {related.length ? (
        <section className="mt-12">
          <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
          <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
            {related.map((item) => (
              <RelatedCard
                key={item.id}
                href={item.href}
                title={item.label}
                description={item.description ?? item.searchGroup}
              />
            ))}
          </div>
        </section>
      ) : null}

      <DocsPager className="mt-12" {...pager} />
    </article>
  )
}
