import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ComponentPreviewPage } from '@/components/ComponentPreviewPage'
import { COMPONENT_ALIASES, DOCS_ITEMS, PREVIEW_EXCLUDED_IDS } from '@/lib/docs-catalog'

export function generateStaticParams() {
  return [
    ...DOCS_ITEMS.filter((item) => !PREVIEW_EXCLUDED_IDS.has(item.id)).map((item) => ({ slug: item.id })),
    ...Object.keys(COMPONENT_ALIASES)
      .filter((slug) => !PREVIEW_EXCLUDED_IDS.has(COMPONENT_ALIASES[slug]))
      .map((slug) => ({ slug })),
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
  if (!item || PREVIEW_EXCLUDED_IDS.has(slug)) return { title: 'Not found' }
  return {
    title: `${item.label} — Preview`,
    description: `Full-page preview of ${item.label} with every documented state.`,
  }
}

export default async function ComponentPreviewRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: raw } = await params
  if (COMPONENT_ALIASES[raw]) redirect(`/preview/${COMPONENT_ALIASES[raw]}`)
  const item = DOCS_ITEMS.find((entry) => entry.id === raw)
  if (!item || PREVIEW_EXCLUDED_IDS.has(raw)) notFound()
  return <ComponentPreviewPage slug={raw} />
}
