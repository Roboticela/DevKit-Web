import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CursorPackPlaygroundDocs } from '@/components/CursorPackPlaygroundDocs'
import { AVAILABLE_CURSOR_PACKS } from '@/lib/robocursors-data'

export function generateStaticParams() {
  return AVAILABLE_CURSOR_PACKS.map((pack) => ({ pack: pack.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pack: string }>
}): Promise<Metadata> {
  const { pack } = await params
  const packMeta = AVAILABLE_CURSOR_PACKS.find((p) => p.id === pack)
  if (!packMeta) return { title: 'Cursor Pack Not Found' }
  return {
    title: `${packMeta.name} Studio — DevKit Cursors`,
    description: `Interactive testing playground and code export for ${packMeta.name}.`,
  }
}

export default async function CursorPackPage({
  params,
}: {
  params: Promise<{ pack: string }>
}) {
  const { pack } = await params
  const packMeta = AVAILABLE_CURSOR_PACKS.find((p) => p.id === pack)
  if (!packMeta) notFound()

  return <CursorPackPlaygroundDocs packId={pack} />
}
