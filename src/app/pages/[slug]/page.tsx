import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsArticleStub } from '@/components/DocsArticleStub'
import { DocsShell } from '@/components/DocsShell'
import { MaintenanceNote } from '@/components/MaintenanceNote'
import { SignInDocs } from '@/components/SignInDocs'
import { adjacentDocs, findDocContext } from '@/lib/docs-catalog'
import { PAGES_ITEMS, PAGES_NAV, SIGN_IN_TOC } from '@/lib/pages-catalog'

export function generateStaticParams() {
  return PAGES_ITEMS.map((item) => ({ slug: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = PAGES_ITEMS.find((entry) => entry.id === slug)
  if (!item) return { title: 'Not found' }
  return {
    title: `${item.label} — DevKit Pages`,
    description: item.description ?? `${item.label} page template.`,
  }
}

export default async function PageDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ctx = findDocContext(PAGES_NAV, slug)
  if (!ctx) notFound()

  if (slug === 'sign-in') {
    return (
      <DocsShell
        activeId="sign-in"
        activeTab="Pages"
        sections={PAGES_NAV}
        toc={SIGN_IN_TOC}
        contentWidth={900}
        sidebarFooter={<MaintenanceNote />}
      >
        <SignInDocs />
      </DocsShell>
    )
  }

  const { prev, next } = adjacentDocs(PAGES_ITEMS, slug)

  return (
    <DocsShell
      activeId={slug}
      activeTab="Pages"
      sections={PAGES_NAV}
      toc={[{ id: 'overview', label: 'Overview' }]}
      contentWidth={900}
      sidebarFooter={<MaintenanceNote />}
    >
      <DocsArticleStub
        eyebrow={`Pages / ${ctx.section.label} / ${ctx.item.label}`}
        title={ctx.item.label}
        prev={prev}
        next={next}
      />
    </DocsShell>
  )
}
