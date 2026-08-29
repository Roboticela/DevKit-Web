import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ButtonDocs } from '@/components/ButtonDocs'
import { DocsShell } from '@/components/DocsShell'
import { FoundationDocs } from '@/components/FoundationDocs'
import { KitComponentDocs } from '@/components/KitComponentDocs'
import { TextDocs } from '@/components/TextDocs'
import {
  BUTTON_TOC,
  COMPONENT_ALIASES,
  DOCS_ITEMS,
  DOCS_NAV,
  findDocContext,
  FOUNDATION_IDS,
  FOUNDATION_TOC,
  KIT_TOC,
  TEXT_TOC,
} from '@/lib/docs-catalog'

export function generateStaticParams() {
  return [
    ...DOCS_ITEMS.map((item) => ({ slug: item.id })),
    ...Object.keys(COMPONENT_ALIASES).map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: raw } = await params
  const slug = COMPONENT_ALIASES[raw] ?? raw
  const item = DOCS_ITEMS.find((entry) => entry.id === slug)
  if (!item) return { title: 'Not found' }
  return {
    title: `${item.label} — DevKit Components`,
    description: item.description ?? `${item.label} in the DevKit component library.`,
  }
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: raw } = await params
  if (COMPONENT_ALIASES[raw]) redirect(`/components/${COMPONENT_ALIASES[raw]}`)

  const ctx = findDocContext(DOCS_NAV, raw)
  if (!ctx) notFound()

  if (raw === 'button') {
    return (
      <DocsShell activeId="button" toc={BUTTON_TOC}>
        <ButtonDocs />
      </DocsShell>
    )
  }

  if (raw === 'text') {
    return (
      <DocsShell activeId="text" toc={TEXT_TOC}>
        <TextDocs />
      </DocsShell>
    )
  }

  if (FOUNDATION_IDS.has(raw)) {
    return (
      <DocsShell activeId={raw} toc={FOUNDATION_TOC}>
        <FoundationDocs slug={raw} />
      </DocsShell>
    )
  }

  return (
    <DocsShell activeId={raw} toc={KIT_TOC}>
      <KitComponentDocs slug={raw} />
    </DocsShell>
  )
}
