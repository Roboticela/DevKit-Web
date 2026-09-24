import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AnchorDocs } from '@/components/AnchorDocs'
import { ButtonDocs } from '@/components/ButtonDocs'
import { CursorsDocs } from '@/components/CursorsDocs'
import { DocsPrimitivesDocs } from '@/components/DocsPrimitivesDocs'
import { FlagsDocs } from '@/components/FlagsDocs'
import { FoundationDocs } from '@/components/FoundationDocs'
import { IconsDocs } from '@/components/IconsDocs'
import { KitComponentDocs } from '@/components/KitComponentDocs'
import { TextDocs } from '@/components/TextDocs'
import {
  COMPONENT_ALIASES,
  DOCS_ITEMS,
  DOCS_NAV,
  DOCS_PRIMITIVE_IDS,
  findDocContext,
  FOUNDATION_IDS,
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

  if (raw === 'button') return <ButtonDocs />
  if (raw === 'anchor') return <AnchorDocs />
  if (raw === 'text') return <TextDocs />
  if (raw === 'icons') return <IconsDocs />
  if (raw === 'cursors') return <CursorsDocs />
  if (raw === 'country-flag') return <FlagsDocs />
  if (FOUNDATION_IDS.has(raw)) return <FoundationDocs slug={raw} />
  if (DOCS_PRIMITIVE_IDS.has(raw)) return <DocsPrimitivesDocs slug={raw} />

  return <KitComponentDocs slug={raw} />
}
