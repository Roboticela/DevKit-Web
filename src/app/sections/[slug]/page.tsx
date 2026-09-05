import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsArticleStub } from '@/components/DocsArticleStub'
import { adjacentDocs, findDocContext } from '@/lib/docs-catalog'
import { SECTIONS_ITEMS, SECTIONS_NAV, findSectionMeta } from '@/lib/sections-catalog'

export function generateStaticParams() {
  return SECTIONS_ITEMS.map((item) => ({ slug: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = SECTIONS_ITEMS.find((entry) => entry.id === slug)
  if (!item) return { title: 'Not found' }
  return {
    title: `${item.label} — DevKit Sections`,
    description: item.description ?? `${item.label} marketing section template.`,
  }
}

export default async function SectionDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ctx = findDocContext(SECTIONS_NAV, slug)
  if (!ctx) notFound()

  const { prev, next } = adjacentDocs(SECTIONS_ITEMS, slug)
  const meta = findSectionMeta(slug)

  return (
    <DocsArticleStub
      eyebrow={`Sections / ${ctx.section.label} / ${ctx.item.label}`}
      title={ctx.item.label}
      description={ctx.item.description}
      prev={prev}
      next={next}
      sceneBleed={meta?.sceneBleed ?? false}
    />
  )
}
