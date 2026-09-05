import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingSectionPreview } from '@/components/LandingSectionPreview'
import { SECTIONS_ITEMS } from '@/lib/sections-catalog'

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
    title: `${item.label} — DevKit`,
    description: item.description,
  }
}

export default async function LandingSectionPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!SECTIONS_ITEMS.some((item) => item.id === slug)) notFound()
  return <LandingSectionPreview slug={slug} />
}
